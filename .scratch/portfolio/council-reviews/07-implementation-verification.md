# Implementation Verification Summary

Date: 2026-11-25

## Automated verification

- `npm run check`: 0 errors, 0 warnings, 0 hints.
- `npm test`: 40 tests passed across content, curation, site facts, and deterministic signal-model suites.
- `npm run build`: 13 static pages generated successfully.
- `npx html-validate dist`: 0 errors.
- `npx playwright test`: 55 passed, 2 skipped. The skipped cases are Clipboard API permission flows in Firefox and WebKit; the same flow passes in Chromium and the visible `mailto:` fallback is covered in all browsers.
- External evidence links: 29 unique project links checked; all returned HTTP 200.

## Browser coverage

- Chromium, Firefox, and WebKit passed navigation, direct project routes, metadata, 320 px reflow, no-JS content, reduced motion, keyboard skip link, 404 behavior, Trace Inspector controls, and Axe scans.
- Manual screenshots were captured for home, Chronos-DSP, and résumé at desktop and mobile widths.
- No console errors or page errors were observed on the captured routes.

## Lighthouse mobile

| Route | Performance | Accessibility | Best practices | SEO | LCP | CLS | Transfer |
|---|---:|---:|---:|---:|---:|---:|---:|
| Home | 100 | 100 | 100 | 100 | 0.8 s | 0 | 58 KiB |
| Work | 100 | 100 | 100 | 100 | 0.8 s | 0.035 | 60 KiB |
| Chronos-DSP | 100 | 100 | 100 | 100 | 0.8 s | 0 | 62 KiB |
| Résumé | 100 | 100 | 100 | 100 | 0.8 s | 0 | 53 KiB |

These are lab results, not field Core Web Vitals.

## Asset budgets

- Initial CSS: 6,802 bytes gzip.
- Trace Inspector chunk: 4,419 bytes gzip.
- React client runtime: 65,821 bytes gzip; loaded only on the Chronos route when visible.
- Self-hosted fonts: 43,244 bytes total.
- No third-party runtime requests.

## Résumé print

- `/resume/` prints to one A4 page and one Letter page.
- The print preview is readable in black and white.
- Test PDFs are untagged and are not published; the HTML résumé is the accessible deliverable.

## Known verification limits

- Real iOS Safari and Android Chrome devices were not available.
- NVDA, VoiceOver, and TalkBack sessions were not run; Axe and accessibility-tree checks are not a substitute.
- Field LCP/INP/CLS remain unmeasured until deployment and real traffic exist.
- The production host, custom domain, caching, compression, and security headers are not configured or deployed.
