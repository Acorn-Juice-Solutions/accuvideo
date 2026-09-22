'use strict';

// applyLang() writes dictionary values straight into innerHTML and silently skips any key
// it cannot find, so a typo or a string added to one language only degrades quietly: the
// page keeps whatever hardcoded English is in the markup. These tests make that loud.
//
// Run with: node --test tests/i18n.test.js

const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.join(__dirname, '..');
const MAIN_JS = path.join(ROOT, 'assets', 'js', 'main.js');

function loadDictionaries() {
  globalThis.sessionStorage = { getItem: () => null, setItem() {}, removeItem() {} };
  globalThis.window = {};
  globalThis.document = { addEventListener() {}, documentElement: { lang: 'en' } };
  delete require.cache[require.resolve(MAIN_JS)];
  return require(MAIN_JS).i18n;
}

function keysUsedIn(file) {
  const text = fs.readFileSync(path.join(ROOT, file), 'utf8');
  return [...new Set([...text.matchAll(/data-i18n="([^"]+)"/g)].map((m) => m[1]))];
}

const i18n = loadDictionaries();

test('both dictionaries exist', () => {
  assert.ok(i18n && i18n.en && i18n.es, 'expected an en and an es dictionary');
});

test('every key the thanks page uses is translated in both languages', () => {
  const keys = keysUsedIn('thanks.html');
  assert.ok(keys.length > 0, 'no data-i18n keys found in thanks.html');
  for (const key of keys) {
    assert.ok(i18n.en[key] !== undefined, 'missing English string: ' + key);
    assert.ok(i18n.es[key] !== undefined, 'missing Spanish string: ' + key);
  }
});

test('the thanks page points visitors at the company site, in both languages', () => {
  for (const lang of ['en', 'es']) {
    const value = i18n[lang]['thanks.discover'];
    assert.ok(value, 'missing thanks.discover in ' + lang);
    assert.match(value, /href="https:\/\/www\.acornjuice\.com"/, lang);
  }
  assert.match(i18n.es['thanks.discover'], /Descubre más sobre nosotros/);
  assert.match(i18n.en['thanks.discover'], /Discover more about us/);
});

test('the thanks page markup carries the sentence, for a visitor whose JS never loads', () => {
  const html = fs.readFileSync(path.join(ROOT, 'thanks.html'), 'utf8');
  assert.match(html, /data-i18n="thanks\.discover"/);
  assert.match(html, /https:\/\/www\.acornjuice\.com/);
});
