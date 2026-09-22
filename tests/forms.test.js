'use strict';

// Regression tests for the form-delivery tracking bug: `thanks.html` fired `form_submit`
// (and with it the Google Ads conversion) for the mere fact of being loaded with a
// `?form=` parameter, so a crawler hitting the URL — or a submission silently dropped by
// the anti-bot traps — counted as a conversion while nothing reached Static Forms.
//
// Run with: node --test tests/
//
// `assets/js/main.js` is a browser IIFE, but at evaluation time it only touches
// `document.addEventListener` and `window`, so a two-field stub is enough to load it.

const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');

const MAIN_JS = path.join(__dirname, '..', 'assets', 'js', 'main.js');
const THANKS_HTML = path.join(__dirname, '..', 'thanks.html');

// --- harness ---------------------------------------------------------------

// A sessionStorage stub. `failOn` makes the named methods throw, the way Safari's private
// mode and storage-blocking extensions do.
function makeStorage(failOn) {
  const store = new Map();
  const guard = (name) => {
    if (failOn && failOn.includes(name)) throw new Error('storage disabled');
  };
  return {
    store,
    getItem(k) { guard('getItem'); return store.has(k) ? store.get(k) : null; },
    setItem(k, v) { guard('setItem'); store.set(k, String(v)); },
    removeItem(k) { guard('removeItem'); store.delete(k); },
  };
}

function makeResponse(status, body) {
  return {
    ok: status >= 200 && status < 300,
    status,
    text: async () => {
      if (body instanceof Error) throw body;
      return body;
    },
  };
}

// Loads a fresh copy of main.js against the given stubs.
function loadMain(options) {
  const opts = options || {};
  const storage = opts.storage || makeStorage();
  globalThis.sessionStorage = storage;
  globalThis.window = {};
  // `documentElement.lang` is what tt() reads to pick a dictionary.
  globalThis.document = {
    addEventListener() {},
    documentElement: { lang: opts.lang || 'en' },
  };
  if (opts.fetch) globalThis.fetch = opts.fetch;
  delete require.cache[require.resolve(MAIN_JS)];
  const api = require(MAIN_JS);
  return { api, storage, window: globalThis.window };
}

// --- delivery token --------------------------------------------------------

test('a delivered submission round-trips through the token', () => {
  const { api } = loadMain();
  assert.strictEqual(api.markFormDelivered('trial'), true);
  assert.strictEqual(api.consumeFormDelivery(), 'trial');
});

test('the token is single use, so reloading the thanks page cannot double count', () => {
  const { api } = loadMain();
  api.markFormDelivered('contactus');
  assert.strictEqual(api.consumeFormDelivery(), 'contactus');
  assert.strictEqual(api.consumeFormDelivery(), null);
});

test('no token means no conversion (the bug: a bare visit to thanks.html)', () => {
  const { api } = loadMain();
  assert.strictEqual(api.consumeFormDelivery(), null);
});

test('an unknown form name is never written', () => {
  const { api, storage } = loadMain();
  assert.strictEqual(api.markFormDelivered('../evil'), false);
  assert.strictEqual(storage.store.size, 0);
});

test('a forged token with an unknown form name is rejected', () => {
  const { api, storage } = loadMain();
  storage.setItem(api.DELIVERY_TOKEN_KEY, JSON.stringify({ form: 'evil', at: Date.now() }));
  assert.strictEqual(api.consumeFormDelivery(), null);
});

test('an expired token is rejected', () => {
  const { api, storage } = loadMain();
  const stale = Date.now() - api.DELIVERY_TOKEN_TTL_MS - 1;
  storage.setItem(api.DELIVERY_TOKEN_KEY, JSON.stringify({ form: 'trial', at: stale }));
  assert.strictEqual(api.consumeFormDelivery(), null);
});

test('a future-dated token is rejected', () => {
  const { api, storage } = loadMain();
  storage.setItem(api.DELIVERY_TOKEN_KEY, JSON.stringify({ form: 'trial', at: Date.now() + 60000 }));
  assert.strictEqual(api.consumeFormDelivery(), null);
});

test('a malformed token is rejected and cleared, not left to wedge the slot', () => {
  const { api, storage } = loadMain();
  storage.setItem(api.DELIVERY_TOKEN_KEY, '{not json');
  assert.strictEqual(api.consumeFormDelivery(), null);
  assert.strictEqual(storage.store.has(api.DELIVERY_TOKEN_KEY), false);
});

test('a non-object token payload is rejected', () => {
  const { api, storage } = loadMain();
  storage.setItem(api.DELIVERY_TOKEN_KEY, '"trial"');
  assert.strictEqual(api.consumeFormDelivery(), null);
});

test('a token with a non-numeric timestamp is rejected', () => {
  const { api, storage } = loadMain();
  storage.setItem(api.DELIVERY_TOKEN_KEY, JSON.stringify({ form: 'trial', at: 'now' }));
  assert.strictEqual(api.consumeFormDelivery(), null);
});

test('unavailable storage loses the conversion but never throws', () => {
  const write = loadMain({ storage: makeStorage(['setItem']) });
  assert.strictEqual(write.api.markFormDelivered('trial'), false);

  const read = loadMain({ storage: makeStorage(['getItem']) });
  assert.strictEqual(read.api.consumeFormDelivery(), null);
});

test('main.js exposes the consumer for the inline script in thanks.html', () => {
  const { window } = loadMain();
  assert.strictEqual(typeof window.AccuVideo.consumeFormDelivery, 'function');
});

// --- Static Forms response handling ----------------------------------------

test('a 200 with success:true is a delivery', async () => {
  const { api } = loadMain({ fetch: async () => makeResponse(200, '{"success":true}') });
  assert.strictEqual(await api.postToStaticForms({ apiKey: 'k' }), true);
});

test('a 200 with success:false is NOT a delivery', async () => {
  // The original bug: only `res.ok` was checked, so a submission Static Forms rejected
  // (bad apiKey, spam filter) sent the user to the thanks page and fired a conversion.
  const { api } = loadMain({
    fetch: async () => makeResponse(200, '{"success":false,"message":"Invalid apiKey"}'),
  });
  assert.strictEqual(await api.postToStaticForms({ apiKey: 'bad' }), false);
});

test('a 200 carrying an error string is NOT a delivery', async () => {
  const { api } = loadMain({ fetch: async () => makeResponse(200, '{"error":"spam detected"}') });
  assert.strictEqual(await api.postToStaticForms({ apiKey: 'k' }), false);
});

test('a 200 with ok:false is NOT a delivery', async () => {
  const { api } = loadMain({ fetch: async () => makeResponse(200, '{"ok":false}') });
  assert.strictEqual(await api.postToStaticForms({ apiKey: 'k' }), false);
});

test('a non-JSON 2xx is taken at its word', async () => {
  const { api } = loadMain({ fetch: async () => makeResponse(200, 'OK') });
  assert.strictEqual(await api.postToStaticForms({ apiKey: 'k' }), true);
});

test('an empty 2xx body is taken at its word', async () => {
  const { api } = loadMain({ fetch: async () => makeResponse(204, '') });
  assert.strictEqual(await api.postToStaticForms({ apiKey: 'k' }), true);
});

test('a 2xx whose body cannot be read is taken at its word', async () => {
  const { api } = loadMain({ fetch: async () => makeResponse(200, new Error('stream error')) });
  assert.strictEqual(await api.postToStaticForms({ apiKey: 'k' }), true);
});

test('a 5xx is NOT a delivery', async () => {
  const { api } = loadMain({ fetch: async () => makeResponse(500, 'nope') });
  assert.strictEqual(await api.postToStaticForms({ apiKey: 'k' }), false);
});

test('a failed request rejects, so the caller can show the network error', async () => {
  const { api } = loadMain({ fetch: async () => { throw new TypeError('Failed to fetch'); } });
  await assert.rejects(() => api.postToStaticForms({ apiKey: 'k' }), /Failed to fetch/);
});

test('fields are sent urlencoded, with null and undefined flattened to empty', async () => {
  let seen = null;
  const { api } = loadMain({
    fetch: async (url, init) => { seen = { url, init }; return makeResponse(200, '{"success":true}'); },
  });
  await api.postToStaticForms({ apiKey: 'k', email: 'a@b.c', name: null, message: undefined });
  assert.match(seen.url, /^https:\/\/api\.staticforms\.dev\/submit$/);
  assert.strictEqual(seen.init.method, 'POST');
  const body = seen.init.body;
  assert.strictEqual(body.get('apiKey'), 'k');
  assert.strictEqual(body.get('email'), 'a@b.c');
  assert.strictEqual(body.get('name'), '');
  assert.strictEqual(body.get('message'), '');
});

test('keepalive is opt-in, so the contact form is not capped at 64KB', async () => {
  const calls = [];
  const { api } = loadMain({
    fetch: async (url, init) => { calls.push(init.keepalive); return makeResponse(200, '{"success":true}'); },
  });
  await api.postToStaticForms({ apiKey: 'k' });
  await api.postToStaticForms({ apiKey: 'k' }, { keepalive: true });
  assert.deepStrictEqual(calls, [false, true]);
});

// --- trapped submissions ----------------------------------------------------

// Records every way a trapped submission could leak a signal that Google Ads might
// count: a request, an event, or a navigation to the thanks page.
function watchForSignals() {
  const seen = { fetch: 0, gtag: 0, navigations: 0 };
  globalThis.fetch = async () => { seen.fetch += 1; return makeResponse(200, '{"success":true}'); };
  globalThis.gtag = () => { seen.gtag += 1; };
  globalThis.window.location = { assign: () => { seen.navigations += 1; } };
  return seen;
}

test('a trapped submission sends nothing, tracks nothing and goes nowhere', () => {
  const { api } = loadMain();
  const seen = watchForSignals();
  const form = { reset() { this.wasReset = true; }, wasReset: false };
  const status = { textContent: '', className: '' };

  api.fakeFormSuccess(form, status, 'contact.status.success');

  assert.deepStrictEqual(seen, { fetch: 0, gtag: 0, navigations: 0 });
  assert.strictEqual(form.wasReset, true);
});

test('a trapped submission is shown the ordinary success message', () => {
  const { api } = loadMain();
  const status = { textContent: '', className: '' };
  api.fakeFormSuccess(null, status, 'contact.status.success');
  assert.strictEqual(status.className, 'contact-form-status success');
  assert.match(status.textContent, /Request sent/);
});

test('the fake success message is translated, not a raw i18n key', () => {
  const { api } = loadMain({ lang: 'es' });
  const status = { textContent: '', className: '' };
  api.fakeFormSuccess(null, status, 'contactus.status.success');
  assert.match(status.textContent, /Mensaje enviado/);
});

test('faking success survives a missing status element', () => {
  const { api } = loadMain();
  assert.doesNotThrow(() => api.fakeFormSuccess(null, null, 'contact.status.success'));
});

// --- source invariants ------------------------------------------------------
// These guard the shape of the fix in code paths that would need a full DOM to drive.

test('the anti-bot traps fake success without recording a delivery', () => {
  // Comment lines are dropped first: the comment marking the traps names
  // markFormDelivered() to explain why it is absent, which would fool the scan.
  const src = fs.readFileSync(MAIN_JS, 'utf8').replace(/^[ \t]*\/\/.*$/gm, '');
  const needle = "window.location.assign('thanks.html?form=";
  const tracked = [];
  const untracked = [];
  for (let i = src.indexOf(needle); i !== -1; i = src.indexOf(needle, i + 1)) {
    const preceding = src.slice(Math.max(0, i - 200), i);
    (preceding.includes('markFormDelivered(') ? tracked : untracked).push(i);
  }
  // The thanks page fires a page_view of its own, and a Google Ads conversion can be
  // built on that page_view rather than on the `form_submit` event — which is how bot
  // submissions kept converting even once the event was gated on a real delivery. So
  // nothing may navigate there without a confirmed delivery: two exits, both tracked
  // (trial and contact us). The subscribe flow goes to Stripe, not to the thanks page.
  assert.strictEqual(untracked.length, 0, 'a dropped submission must not reach thanks.html');
  assert.strictEqual(tracked.length, 2, 'expected 2 confirmed-delivery exits to thanks.html');
});

test('thanks.html tracks the delivery token, never the ?form= parameter', () => {
  const html = fs.readFileSync(THANKS_HTML, 'utf8');
  assert.ok(
    !/gtag\('event', 'form_submit', \{ form_name: form \}\)/.test(html),
    'thanks.html must not fire form_submit straight from the query parameter'
  );
  assert.ok(
    html.includes('consumeFormDelivery()'),
    'thanks.html must gate form_submit on the delivery token'
  );
});

test('the honeypot is not named after a field autofill likes to fill', () => {
  const { api } = loadMain();
  assert.ok(!/website|homepage|"url"/i.test(api.HONEYPOT_SELECTOR), api.HONEYPOT_SELECTOR);
  const idx = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
  assert.strictEqual(idx.includes('name="website"'), false);
  // The selector must still match the markup, or every submission trips the trap.
  const field = api.HONEYPOT_SELECTOR.replace('input[name="', '').replace('"]', '');
  assert.strictEqual((idx.match(new RegExp('name="' + field + '"', 'g')) || []).length, 3);
});
