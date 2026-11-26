# Wide-layout dither breakpoint final council review

**Verdict: PASS.** No Blocker, Major, or Minor finding remains.

## Finding and fix

- The dither field disappeared at 1101px, exactly when the hero switched to its wide two-column layout and the Work section entered the viewport.
- Prose surfaces used `box-shadow: 0 0 0 100vmax` to bleed paper into the gutters. That vertical shadow painted backward over the hero and hid the canvas.
- Prose surfaces now use positioned stacking contexts with horizontal-only `::before` bleed. The hero keeps its dither field at wide sizes while prose remains on stable paper.
- Print media hides the canvas, paper backgrounds, and pseudo-surfaces.

## Regression evidence

- A screenshot-difference test compares the wide hero with the dither layer visible and hidden at 1101 and 1440 px. It failed before the fix and passes in Chromium, Firefox, and WebKit.
- The print regression now directly asserts that the résumé pseudo-surface is `display: none`.
- Existing prose-readability, no-JS, reflow, accessibility, and interaction tests remain green.
- A fresh 1440 px capture shows the Bayer field across the hero without seams, clipping, or horizontal overflow.

## Verification

- Final `npm run verify` passed: formatting, Astro diagnostics with 0 errors/warnings/hints, 46 unit tests, 13 static pages, budgets, HTML validation, and 126 Playwright tests across Chromium, Firefox, and WebKit with 6 expected skips.
- CSS is 11,895 bytes gzip; third-party runtime requests remain zero.
- Independent visual and engineering/accessibility reviewers both passed with no remaining findings.
