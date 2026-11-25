# Council Review 14: Engineering Re-review

Date: 2026-11-25  
Verdict: **HOLD.** Local automated implementation passes, but a new Major print regression blocks release; the carried manual/CI verification gate also remains open. No current-content Blocker was found.

## Verification performed

- `npm run verify` passed Prettier, Astro checks (0 errors/warnings/hints), 43 unit tests, static build, and budgets: CSS **6,964 B gzip**, inspector **73,263 B gzip**, fonts **43,244 B**, maximum inline executable JavaScript **2,274 B gzip**, third-party runtime requests **0**.
- `npx playwright test`: **74 passed, 4 expected skips** across Chromium, Firefox, and WebKit. `npx html-validate dist`: clean.
- Build contains 13 pages, 12 sitemap URLs, robots, `_headers`, and `.nojekyll`. `public/` and `dist/` contain no `.DS_Store` or symlinks.

## New Major — release-blocking

**The résumé no longer meets the one-page print contract.** `tests/e2e/portfolio.spec.ts:272-279` generates A4/Letter PDFs but asserts only that each file exceeds 10,000 bytes. Direct `pdfinfo` checks on the fresh artifacts report **Pages: 2** for both formats; Toolkit and Leadership spill onto page two. This contradicts Review 12’s one-page claim and Review 04’s print gate. The HTML résumé remains the accessible deliverable and the PDFs are unpublished, so this is Major rather than Blocker. Fix the print layout without reducing legibility, add a real page-count assertion, and rerun both formats.

## Carried Major — partially resolved

**Required failure/accessibility verification is still incomplete.** Expanded tests now cover all-route reflow/text spacing, forced colors, no-JS home/Chronos/résumé, aborted chunks, failed fonts, denied Clipboard/Storage, live reduced-motion changes, and PDF generation. However, `verify` does not run Playwright or HTML validation, no CI workflow exists, no-JS coverage is not every route, and the required real-device/screen-reader matrix remains undone. `scripts/check-budgets.mjs` enforces CSS, inspector, font, inline-script, and third-party limits only; initial/cumulative route JavaScript, request/transfer, critical-path, and long-task gates remain lab-only. Complete these checks before public release.

## Prior finding disposition

- **Major 2 — origin/hosting:** Resolved locally for the decided GitHub Pages default. `SITE_URL` validates HTTPS, normalizes to an origin, and drives canonicals, robots, sitemap, and social metadata. Hosted headers, compression, caching, and 404 behavior remain deployment acceptance checks; `_headers` is not active on GitHub Pages.
- **Major 3 — publishing:** Resolved. Drafts default true; `build` runs type/unit checks; `requireProjectEntries` rejects length mismatches, missing entries, and drafts on home, Work, and résumé. Minor test gap: no integration fixture proves an uncurated draft is absent from routes and sitemap.
- **Minor — static ledger:** Resolved with a native four-stage table containing per-stage metrics.
- **Minor — React weight:** Resolved conditionally: React remains limited to the approved stateful island, with rationale in the architecture decision and an enforced 75 KB gate. It still consumes 97.7% of that allowance.
- **Minor — inline JavaScript:** Resolved by accounting and disclosure; the bounded global motion enhancement is measured, not omitted.
- **Minor — identity drift:** Resolved; identity/contact use `site`, and origin uses `Astro.site`.
- **Minor — release hygiene:** Partially resolved. Public assets are clean, but `engines.node: >=24.0.0` permits untested Node 25+ rather than constraining the approved 24 line. `tests/.DS_Store` remains locally but is ignored and unshipped.

## New Minor

`SITE_URL` is not fully single-sourced: the metadata test and budget allowlist hardcode `leelanshkharbanda.github.io` (`portfolio.spec.ts:172-175`; `check-budgets.mjs:59`). The default release passes, but a custom-domain release will fail or misclassify same-origin assets. Derive both from `SITE_URL`; this becomes release-blocking if the origin changes.
