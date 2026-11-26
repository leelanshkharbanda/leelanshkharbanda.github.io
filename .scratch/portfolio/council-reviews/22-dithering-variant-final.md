# Dithering variant final council review

**Verdict: PASS.** No Blocker, Major, or Minor finding remains.

## Scope

`variant/dithering-field`, branched from the verified copy/clipping release on `main`. The variant adds one enhancement layer and no new sections, project details, or copy.

## Implementation

- A bounded Canvas 2D field uses a 4×4 Bayer threshold, a low-resolution grid capped at 240×160, and a roughly 30 fps frame throttle.
- The hero and project diagrams share a cursor-local dither lens. The diagram treatment is a decorative pseudo-element gated by `.has-dither-motion`; all labels and evidence remain DOM text.
- Fine-pointer, reduced-motion, Save Data, hidden-tab, and pagehide paths stop animation. Runtime Save Data changes are rechecked in the frame loop.
- The canvas is `aria-hidden`, out of flow, and pointer-transparent. The static content remains usable without JavaScript.

## Council corrections

- Runtime Save Data changes now stop the loop immediately, with a dedicated Playwright regression.
- Project diagrams gained the same cursor-local lens as the hero, replacing the earlier uniform-lattice-only response.

## Evidence

- Fresh 390 px and 1440 px captures showed the field as texture rather than a competing foreground; the final diagram capture confirmed a restrained local lens.
- Final `npm run verify` passed: formatting, Astro diagnostics with 0 errors/warnings/hints, 46 unit tests, 13 static pages, budgets, HTML validation, and 105 Playwright tests across Chromium, Firefox, and WebKit with 6 expected skips.
- CSS is 11,628 bytes gzip; third-party runtime requests remain zero.
- Independent final creative and engineering/accessibility reviews both returned PASS with no remaining findings.
