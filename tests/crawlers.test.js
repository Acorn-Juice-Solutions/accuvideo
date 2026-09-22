'use strict';

// The thanks page is the one page whose mere load is a business signal: it fires a
// page_view that a Google Ads conversion can be built on. Keeping crawlers off it is
// therefore not an SEO detail but a billing one, so the guardrails are pinned here.
//
// Run with: node --test tests/crawlers.test.js

const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.join(__dirname, '..');
const read = (file) => fs.readFileSync(path.join(ROOT, file), 'utf8');

test('robots.txt keeps crawlers off the thanks page', () => {
  const robots = read('robots.txt');
  const rules = robots
    .split(/\r?\n/)
    .filter((line) => !line.trim().startsWith('#'))
    .join('\n');
  assert.match(rules, /^Disallow:\s*\/thanks\.html\s*$/m);
});

test('the thanks page is not advertised in the sitemap', () => {
  assert.ok(!read('sitemap.xml').includes('thanks'), 'thanks.html must stay out of the sitemap');
});

test('the thanks page still carries a noindex, for crawlers that ignore robots.txt', () => {
  assert.match(read('thanks.html'), /<meta name="robots" content="[^"]*noindex/);
});

test('no page links to the thanks page, so it stays undiscoverable', () => {
  for (const file of fs.readdirSync(ROOT).filter((f) => f.endsWith('.html'))) {
    const links = [...read(file).matchAll(/href="([^"]*thanks\.html[^"]*)"/g)];
    assert.deepStrictEqual(links.map((m) => m[1]), [], file + ' links to the thanks page');
  }
});
