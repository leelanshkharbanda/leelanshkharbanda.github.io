# Post-Fix Verification Summary

Date: 2026-11-25

## Automated gates

- `npm run verify`: passed formatting, Astro type checks, 46 unit tests, static build, bundle-budget enforcement, HTML validation, and the complete Playwright suite.
- `npx html-validate dist`: 0 errors.
- `npx playwright test`: 77 passed, 4 skipped. Skips are Clipboard permission success in Firefox/WebKit and PDF generation in Firefox/WebKit; denied-Clipboard fallback passes in all three, and PDF generation/page-count checks pass in Chromium.
- External project evidence links previously checked: 29 unique URLs, all HTTP 200; no URLs changed during the correction pass.

## New regression coverage

- Every indexable route reflows at 320 CSS px.
- Every route tolerates 200% root text and WCAG text-spacing overrides at 320 px.
- Forced-colors behavior is verified where the browser exposes `forced-color-adjust`; WebKit retains visible content and diagrams.
- No-JS Chronos includes the static visual and a four-stage static ledger.
- Aborted JavaScript chunks and failed fonts preserve content and navigation.
- Denied Clipboard and Storage APIs fail safely.
- Live reduced-motion preference changes apply without reload.
- 404 responses omit canonical and `og:url`.
- A4 and Letter PDFs are generated in Chromium; `pdf-lib` assertions and separate `pdfinfo` checks confirm exactly one page each.

## Lighthouse mobile

| Route | Performance | Accessibility | Best practices | SEO | LCP | CLS | Transfer |
|---|---:|---:|---:|---:|---:|---:|---:|
| Home | 100 | 100 | 100 | 100 | 0.8 s | 0 | 58 KiB |
| Work | 100 | 100 | 100 | 100 | 0.8 s | 0.035 | 61 KiB |
| Chronos-DSP | 100 | 100 | 100 | 100 | 0.8 s | 0 | 63 KiB |
| Résumé | 100 | 100 | 100 | 100 | 0.8 s | 0 | 53 KiB |

These remain lab results, not field Core Web Vitals.

## Enforced asset budgets

- CSS: 6,980 bytes gzip.
- Trace Inspector and shared React chunks: 73,263 bytes gzip.
- Fonts: 43,244 bytes total.
- Maximum inline executable JavaScript: 2,274 bytes gzip.
- Third-party runtime requests: 0.

## Publishing and hosting

- Drafts default to true; curated missing or draft entries fail the build.
- `npm run build` now includes type checks and unit tests.
- `SITE_URL` is the single production-origin setting; GitHub Pages is the documented default.
- `_headers` and `.nojekyll` are included for compatible static hosting.
- No deployment or push was performed.

## Remaining external verification limits

Real iOS/Android devices, Edge, NVDA, VoiceOver, TalkBack, bfcache, orientation/safe-area behavior, and hosted response headers remain untested. The HTML résumé is the accessible deliverable; test PDFs remain unpublished and untagged.
