# Council Review 20: Engineering Scope Final

Date: 2026-11-26  
Code-completion verdict: **PASS WITH NOTES**  
Publication readiness: **HOLD — implementation is locally verified, but release acceptance is incomplete.**

## Scope ruling

The authorized outcome was autonomous local implementation. Deployment, pushing, CI changes, real-device lab access, and field analytics were not requested. The project map explicitly excludes publishing/deployment during this build, and Council Decision 04 reserves hosted behavior for deployment acceptance. Missing external infrastructure or evidence therefore does not retroactively become a code-completion blocker.

## Fresh verification

A new local `npm run verify` completed with exit code 0:

- Prettier passed; Astro reported 0 errors, warnings, and hints.
- 46 unit tests passed; the static build produced 13 pages.
- Aggregate CSS, inspector, font, inline-JavaScript, and third-party budgets passed.
- HTML validation passed.
- Playwright passed 77 tests across Chromium, Firefox, and WebKit, with 4 documented expected capability skips and no failures.

Review 18’s print Major is resolved: A4/Letter generation has a one-page assertion, with independent prior `pdfinfo` confirmation. No current-content engineering Blocker or unresolved code-defect Major remains.

## Remaining-item disposition

- **CI workflow and retained artifacts:** external publication gate. Local enforcement exists; remote enforcement was outside scope.
- **Real iOS/Android, Edge, assistive-technology, bfcache, orientation, and safe-area checks:** external manual/device publication gates, not evidence of a known implementation defect.
- **Complete per-route JavaScript, critical-path, transfer/request, project-media, and long-task evidence:** release-acceptance gap. Current aggregate budgets and prior Lighthouse lab results are useful but do not prove every Release 04 budget. This limits publication certification, not local code completion.
- **Hosted headers, compression, caching, deep links, and 404 behavior:** post-deployment gates. GitHub Pages does not activate `_headers`.
- **Field Core Web Vitals:** follow-up measurement, not a launch prerequisite under Decision 04; no analytics package is required.

## Final ruling

**PASS WITH NOTES for code completion:** the requested implementation is complete and its local verification suite passes. The carried Major is reclassified as unmet release evidence, not an open implementation defect.

**HOLD for publication:** do not claim public-release sign-off until an authorized release effort supplies CI/artifact retention, the required manual/device matrix, remaining lab/resource evidence, and post-deployment hosting checks. No deployment, push, or CI change was performed.
