'use strict';

// The site has no package.json, so there is nothing for a dependency scanner to
// read — but it does have third-party dependencies. They are just not packages:
// Google Analytics executes in the visitor's session with full DOM access, and
// StaticForms receives everything typed into the contact forms. Nothing else in
// this repo would notice a fourth party being added.
//
// So this test does two jobs:
//
//   1. Fails when the site references an origin that is not on the allowlist,
//      which is how a chat widget or a font CDN gets noticed at review time
//      rather than after it ships.
//   2. Fails when the allowlist and the Content-Security-Policy disagree. The
//      CSP is what actually enforces this in the browser; a policy that quietly
//      drifts out of sync with reality either blocks something real or permits
//      something we thought we had removed.
//
// Run with: node --test tests/external-origins.test.js

const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.join(__dirname, '..');
const PAGES = ['index.html', 'privacy.html', 'requirements.html', 'requisitos.html', 'thanks.html'];
const SCRIPTS = ['assets/js/main.js', 'assets/js/main.min.js', 'sw.js', 'assets/videos/player.html'];

// Origins the browser is allowed to fetch from, or send data to. Adding one
// here also requires adding it to the CSP in every page — the last test checks
// that you did.
const RESOURCE_ORIGINS = new Set([
  'https://accuvideo.acornjuice.com', // self
  'https://www.googletagmanager.com', // GA4 tag
  'https://www.google-analytics.com', // GA4 collect beacon
  'https://api.staticforms.dev',      // contact / subscribe / contact-us forms
]);

// Origins that only ever appear as link targets or in JSON-LD metadata. These
// never load anything, so a compromise there is not ours.
const LINK_ORIGINS = new Set([
  'https://schema.org',
  'https://www.acornjuice.com',
  'https://acornjuice.com',
  'https://github.com',
  'https://www.linkedin.com',
  'https://es.linkedin.com',
  'https://www.producthunt.com',
  'https://www.aepd.es',
  'https://vimeo.com',
  'https://www.artstation.com',
  // Stripe Payment Links (25 of them, live mode). The visitor is sent there
  // with window.open(..., '_blank', 'noopener'), so this is a top-level
  // navigation and not a subresource: no CSP directive governs it, and none
  // should. It is listed here so the payment processor is at least visible in
  // the inventory — it is the most business-critical third party the site has.
  'https://buy.stripe.com',
  // Referenced only in a developer comment explaining where to regenerate the
  // links above.
  'https://dashboard.stripe.com',
  // Named in the privacy policy's list of processors, as prose.
  'https://staticforms.dev',
]);

// Contexts where the browser actually fetches, or where data leaves.
const LOADING_PATTERNS = [
  /\bsrc\s*=\s*["']?(https:\/\/[^"'\s>]+)/gi,
  /\.src\s*=\s*["`'](https:\/\/[^"`']+)/gi,
  /\baction\s*=\s*["']?(https:\/\/[^"'\s>]+)/gi,
  /<link\b[^>]*\bhref\s*=\s*["']?(https:\/\/[^"'\s>]+)/gi,
  /\bfetch\s*\(\s*["`'](https:\/\/[^"`']+)/gi,
  /\bnew\s+Worker\s*\(\s*["`'](https:\/\/[^"`']+)/gi,
  /\bimportScripts\s*\(\s*["`'](https:\/\/[^"`']+)/gi,
  /@import\s+(?:url\()?["']?(https:\/\/[^"')\s]+)/gi,
  /\burl\(\s*["']?(https:\/\/[^"')\s]+)/gi,
];

const ANY_ORIGIN = /https:\/\/[A-Za-z0-9.-]+/g;

function originOf(url) {
  const m = /^https:\/\/[A-Za-z0-9.-]+/.exec(url);
  return m ? m[0] : null;
}

function readIfPresent(rel) {
  const full = path.join(ROOT, rel);
  return fs.existsSync(full) ? fs.readFileSync(full, 'utf8') : null;
}

/** @returns {Map<string, 'resource'|'link'>} */
function scanOrigins(files) {
  const found = new Map();
  for (const rel of files) {
    const text = readIfPresent(rel);
    if (text === null) continue;

    const loading = new Set();
    for (const pattern of LOADING_PATTERNS) {
      pattern.lastIndex = 0;
      let m;
      while ((m = pattern.exec(text)) !== null) {
        const origin = originOf(m[1]);
        if (origin) loading.add(origin);
      }
    }
    for (const raw of text.match(ANY_ORIGIN) || []) {
      // "resource" wins over "link": if an origin is fetched anywhere, it is a
      // resource origin everywhere.
      if (loading.has(raw) || found.get(raw) === 'resource') {
        found.set(raw, 'resource');
      } else if (!found.has(raw)) {
        found.set(raw, 'link');
      }
    }
  }
  return found;
}

function cspOf(page) {
  const text = fs.readFileSync(path.join(ROOT, page), 'utf8');
  // The policy itself contains single quotes ('self', 'unsafe-inline'), so the
  // attribute delimiter has to be captured and matched back, not guessed.
  const tag = /<meta\b[^>]*http-equiv=(["'])Content-Security-Policy\1[^>]*>/i.exec(text);
  if (!tag) return null;
  const content = /\bcontent=(["'])([\s\S]*?)\1/i.exec(tag[0]);
  return content ? content[2] : null;
}

test('every external origin in the site is on the allowlist', () => {
  const found = scanOrigins([...PAGES, ...SCRIPTS]);
  const unapproved = [];
  for (const [origin, kind] of found) {
    const ok = kind === 'resource'
      ? RESOURCE_ORIGINS.has(origin)
      : RESOURCE_ORIGINS.has(origin) || LINK_ORIGINS.has(origin);
    if (!ok) unapproved.push(`${origin} (${kind})`);
  }
  assert.deepStrictEqual(
    unapproved,
    [],
    `Unapproved external origins. If intentional, add each to RESOURCE_ORIGINS or ` +
      `LINK_ORIGINS in this file AND to the CSP in all ${PAGES.length} pages:\n  ` +
      unapproved.join('\n  '),
  );
});

test('every page declares a Content-Security-Policy', () => {
  for (const page of PAGES) {
    assert.ok(cspOf(page), `${page} has no Content-Security-Policy meta tag`);
  }
});

test('the CSP is identical across pages', () => {
  // Divergence means one page silently permits something the others do not,
  // and nobody would notice until it is abused.
  const policies = new Map(PAGES.map((p) => [p, cspOf(p)]));
  const reference = policies.get(PAGES[0]);
  for (const [page, policy] of policies) {
    assert.strictEqual(policy, reference, `${page} has a different CSP than ${PAGES[0]}`);
  }
});

test('the CSP constrains where data can go', () => {
  // script-src is the directive people remember. These two are the ones that
  // stop a compromised third-party script from exfiltrating form data.
  const csp = cspOf(PAGES[0]);
  for (const directive of ['connect-src', 'form-action', 'base-uri', 'object-src']) {
    assert.ok(csp.includes(directive), `CSP is missing ${directive}`);
  }
  assert.ok(
    /form-action[^;]*https:\/\/api\.staticforms\.dev/.test(csp),
    'form-action must name the StaticForms endpoint, or the forms break',
  );
});

test('the CSP covers every resource-loading origin the site uses', () => {
  const csp = cspOf(PAGES[0]);
  const found = scanOrigins([...PAGES, ...SCRIPTS]);
  const missing = [];
  for (const [origin, kind] of found) {
    if (kind !== 'resource') continue;
    if (origin === 'https://accuvideo.acornjuice.com') continue; // covered by 'self'
    if (!csp.includes(origin)) missing.push(origin);
  }
  assert.deepStrictEqual(
    missing,
    [],
    `These origins are loaded by the site but absent from the CSP, so the browser ` +
      `will block them:\n  ` + missing.join('\n  '),
  );
});
