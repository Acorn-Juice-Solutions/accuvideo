'use strict';

// The service worker serves non-navigation requests cache-first and never revalidates,
// so the `?v=` query string is the only thing that evicts an old asset. Two ways that
// silently rots, both of which had already happened:
//
//   - a page is left behind on an old `?v=`, so some visitors keep the stale asset;
//   - sw.js precaches a version no page requests any more, so it downloads dead files
//     and the real bundle is only cached lazily on first hit.
//
// Run with: node --test tests/cache-busting.test.js

const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.join(__dirname, '..');
const VERSIONED = /(assets\/[^"'\s?]+)\?v=(\d+)/g;

function versionsIn(file) {
  const text = fs.readFileSync(path.join(ROOT, file), 'utf8');
  const found = new Map(); // asset path -> Set of versions
  for (const match of text.matchAll(VERSIONED)) {
    const asset = match[1].replace(/^\/+/, '');
    if (!found.has(asset)) found.set(asset, new Set());
    found.get(asset).add(match[2]);
  }
  return found;
}

const HTML_PAGES = fs.readdirSync(ROOT).filter((f) => f.endsWith('.html'));

test('every page requests one single version of each asset', () => {
  assert.ok(HTML_PAGES.length > 0, 'no HTML pages found');
  for (const page of HTML_PAGES) {
    for (const [asset, versions] of versionsIn(page)) {
      assert.strictEqual(
        versions.size, 1,
        page + ' requests ' + asset + ' at several versions: ' + [...versions].join(', ')
      );
    }
  }
});

test('all pages agree on the same version of a shared asset', () => {
  const agreed = new Map(); // asset -> { version, page }
  for (const page of HTML_PAGES) {
    for (const [asset, versions] of versionsIn(page)) {
      const version = [...versions][0];
      const previous = agreed.get(asset);
      if (!previous) {
        agreed.set(asset, { version, page });
        continue;
      }
      assert.strictEqual(
        version, previous.version,
        asset + ' is v=' + version + ' in ' + page +
        ' but v=' + previous.version + ' in ' + previous.page
      );
    }
  }
});

test('the service worker precaches the versions the pages actually request', () => {
  const live = new Map();
  for (const page of HTML_PAGES) {
    for (const [asset, versions] of versionsIn(page)) live.set(asset, [...versions][0]);
  }
  const precached = versionsIn('sw.js');
  assert.ok(precached.size > 0, 'sw.js precaches no versioned asset');
  for (const [asset, versions] of precached) {
    const expected = live.get(asset);
    assert.ok(expected, 'sw.js precaches ' + asset + ', which no page requests');
    assert.deepStrictEqual(
      [...versions], [expected],
      'sw.js precaches ' + asset + ' at v=' + [...versions].join(', ') +
      ' but the pages request v=' + expected
    );
  }
});

test('the cache name is bumped whenever a precached version changes', () => {
  // `activate` deletes every cache whose key differs from CACHE_NAME, so the name is the
  // only lever that drops what returning visitors already hold. This test does not know
  // the "right" value; it pins the pair so that changing one without the other is loud.
  const sw = fs.readFileSync(path.join(ROOT, 'sw.js'), 'utf8');
  const name = sw.match(/const CACHE_NAME = '([^']+)'/);
  assert.ok(name, 'CACHE_NAME not found in sw.js');
  assert.strictEqual(name[1], 'accuvideo-v50');
  assert.ok(sw.includes("'/assets/js/main.min.js?v=48'"), 'bundle version changed: bump CACHE_NAME');
});
