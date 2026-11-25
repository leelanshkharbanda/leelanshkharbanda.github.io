# Council Review 18: Engineering Final

Date: 2026-11-26  
Verdict: **HOLD — requested local implementation checks pass, but one carried Major from Review 14 remains open.** No current-content engineering Blocker was found.

## Verified

- Fresh `npm run verify` exited 0: Prettier passed; Astro reported 0 errors/warnings/hints; 46 unit tests passed; 13 static pages built; budgets passed; HTML validation passed; Playwright reported **77 passed, 4 expected skips** across Chromium, Firefox, and WebKit.
- `tests/e2e/portfolio.spec.ts:317-327` generates A4 and Letter PDFs, loads each with `pdf-lib`, and asserts `getPageCount() === 1`; it does not rely on file size. Independent `pdfinfo` checks on the fresh artifacts also report **Pages: 1** for both formats. Review 14's print Major is resolved.
- `package.json:19` includes `node scripts/check-budgets.mjs`, `npx html-validate dist`, and `npx playwright test` in `verify`; `build` includes type checks and unit tests.
- `package.json:7-9` constrains Node to `>=24.0.0 <25`, i.e. 24.x only.
- `SITE_URL` drives `astro.config.mjs:5-12`, the E2E production-origin assertion (`portfolio.spec.ts:16-17,205-220`), and the budget hostname comparison (`scripts/check-budgets.mjs:9-10,60-61`). The GitHub Pages URL is now only the shared default, not an independent test/budget allowlist.
- `src/data/project-schema.ts:58` defaults omitted `draft` to `true`; `tests/unit/project-schema.test.ts:27-34` verifies the default and explicit publication. `tests/unit/project-publishing.test.ts` verifies missing/draft curated entries fail closed.
- Review 14's origin, publishing, static-ledger, React-weight, inline-JavaScript, identity, and Node-hygiene findings are resolved locally.

## Exact remaining finding

**Major — required CI, manual/device, and complete performance-gate evidence remains incomplete (carried from Review 14).**

1. No `.github/workflows/*` exists, so the now-complete local `verify` gate is not enforced by CI with retained artifacts.
2. Review 12, lines 51-53, still records real iOS/Android devices, Edge, NVDA, VoiceOver, TalkBack, bfcache, orientation/safe-area behavior, and hosted response headers as untested. These are required by Review 04, lines 305-314.
3. `scripts/check-budgets.mjs` enforces aggregate CSS, inspector, font, inline-script, and third-party limits only. Per-route initial/cumulative JavaScript, critical-path resources, request/transfer limits, same-origin request counts, project-media limits, and >200 ms long-task gates remain lab-only, contrary to Review 04, lines 236-251, and Review 14's carried Major.

**Deployment acceptance remains separate:** GitHub Pages does not activate `_headers`; hosted caching, compression, security headers, deep links, and 404 behavior must be checked after deployment.

Therefore, “no prior engineering Major remains” cannot yet be certified. Close the carried Major with CI/manual/performance evidence or an explicit authorized scope waiver before public-release sign-off.
