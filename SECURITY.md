# Security policy

## Reporting a vulnerability

Email **iosune@acornjuice.com** with the details. Please **do not** open a public GitHub
issue for anything that could affect visitors or customers in the wild.

Include:

- The page URL and what you did.
- What you observed and what you expected.
- Whether you consider the finding remotely exploitable, and by whom.

Acknowledgement within **72 hours**. A first assessment (accepted / clarifying questions /
declined) within **7 days**. This is a static site, so most accepted fixes ship within a day.

Vulnerabilities in the **AccuVideo desktop application** are a different matter — report
those the same way, but say so explicitly, because they follow the product's coordinated
disclosure timeline rather than this site's.

## Scope

This repository is the marketing site at <https://accuvideo.acornjuice.com>: hand-written
HTML, CSS and vanilla JavaScript, published to GitHub Pages with no build step and no
backend.

In scope: anything in this repository, the published pages, the Content-Security-Policy, the
service worker, and how the site integrates the third parties below.

Out of scope: vulnerabilities in GitHub Pages, Stripe, Google or StaticForms themselves —
report those to their owners. A *misconfiguration on our side* of any of those integrations
is very much in scope.

## Third-party services this site relies on

No dependency scanner sees these, because they are not packages. They are dependencies
regardless: they execute in a visitor's session, receive their data, or take their money.

| Service | Origin | Role | Data |
| :--- | :--- | :--- | :--- |
| Stripe | `buy.stripe.com` | 25 live Payment Links for subscriptions, opened in a new tab | Payment details, handled entirely by Stripe |
| StaticForms | `api.staticforms.dev` | Delivers the contact, subscribe and trial-request forms | Name, email, hardware ID, message |
| Google Analytics 4 | `www.googletagmanager.com`, `*.google-analytics.com` | Usage analytics | Pseudonymised usage data |

The allowlist is enforced in two places that have to agree: `tests/external-origins.test.js`
fails the build if a page references an origin approved in neither, and the
`Content-Security-Policy` in every page enforces it in the browser. The test also asserts
that the CSP is byte-identical across all five pages, so one page cannot quietly permit more
than the others.

Payment Links are a top-level navigation (`window.open(..., '_blank', 'noopener')`), not a
subresource, so no CSP directive governs them and none should. They are listed here because
an inventory that omits the payment processor is not an inventory.

## Supply chain

- The site has no runtime package dependencies. `main.js` is hand-written with no libraries,
  no CDN, and no vendored third-party code.
- The one build-time dependency, `rjsmin` (used by `.minify_main.py` to produce
  `main.min.js`), is pinned and hash-verified in `requirements-tools.txt`.
- Every GitHub Action is pinned to a commit SHA rather than a mutable tag.
- `.github/workflows/supply-chain.yml` runs on every push and daily: it runs the test suite
  (which `pages.yml` never did), scans for secrets, audits the workflows, and fails the build
  on any dependency carrying an OSV `MAL-` advisory.

## Known, accepted exposure

`assets/js/main.js` contains a **StaticForms client key** in plain text. This is publishable
by design — it identifies the form owner from browser-side JavaScript and cannot be kept
secret — and it grants no access to anything we hold. It is recorded in `.gitleaksignore`
with the reasoning, pinned to an exact line.

It is not risk-free: anyone can copy it and submit forms against our quota. If that starts
happening, the key gets rotated in the StaticForms dashboard.

## Service worker

`sw.js` caches same-origin assets and explicitly ignores every cross-origin request. It is
persistent code with full network interception on our origin, so changes to it get the same
scrutiny as changes to the CSP.
