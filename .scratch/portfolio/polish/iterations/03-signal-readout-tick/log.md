# Iteration 03 — SignalToy readout tick

Date: 2026-11-26

## Inspected

- Captured SignalToy at rest and after keyboard, pointer, and reset input at 1440×900 and 390×844.
- Reviewed direct/reflected path readouts, TX/RX handles, range controls, reset feedback, touch drag, and reduced-motion behavior.
- The values and SVG paths updated correctly but the numeric feedback changed without acknowledgment, especially during drag.

## Research

- Codrops' [Joffrey Spitzer portfolio case study](https://tympanus.net/codrops/2026/02/18/joffrey-spitzer-portfolio-a-minimalist-astro-gsap-build-with-reveals-flip-transitions-and-subtle-motion/) describes a stepped counter interaction as a small piece of portfolio feedback.
- Stéphanie Walter's [CSS animation guidance](https://stephaniewalter.design/blog/enhancing-user-experience-with-css-animations/) describes animation as acknowledgment for input and change blindness, with 100–300 ms recommended for small user-initiated feedback.
- Original adaptation: a 160 ms, 2 px transform-only tick on the two numeric readouts. Values update immediately; opacity, contrast, layout, and diagram geometry do not change. No reference code, assets, or wording were copied.

## Changed

- `src/scripts/signal-toy.ts:53` — added an input-only, requestAnimationFrame-coalesced readout tick for drag, keyboard, range, and reset changes.
- `src/styles/playground.css:559` — added the short transform tick and kept the readout text fully opaque.
- `tests/e2e/playground.spec.ts:96` — added keyboard, initial-state, OS reduced-motion, manual-toggle, and touch regressions.

## Council review

- Creative director + technical content strategist: approved the restrained telemetry feel after explicit reduced-motion opt-outs and replay/range/reset/echo coverage were added.
- Principal engineer + release reviewer: approved after the persistent-class test gap was replaced with real `getAnimations()` replay checks and reduced-motion work was skipped before scheduling.
- Product + accessibility reviewer: approved after `animationend`/`animationcancel` cleanup and a re-enable regression were added.
- Focused recheck caught a TypeScript narrowing issue and a vacuous reduced-motion keypress; both were fixed, and `astro check` returned 0 errors, warnings, and hints.

## Verified

- `npm run format && npm run verify` passed.
- Astro: 0 errors, 0 warnings, 0 hints.
- Vitest: 45 tests passed.
- Playwright: 168 passed, 6 expected skips across Chromium, Firefox, and WebKit, including Axe checks.
- Budgets: CSS 12,283 bytes gzip; TraceInspector JavaScript 73,196 bytes gzip; fonts 43,244 bytes; 0 third-party runtime requests.
- Fresh desktop/mobile route, rest, mid-tick, settled, pointer, and reset screenshots were inspected. No clipping, overlap, layout shift, or contrast change was introduced.
- Local screenshots are retained under `screenshots/baseline/` and `screenshots/after/` and ignored by Git.

## Release

- Committed as `97bfc94` and pushed to `main`.
- Pages deployment run `45859793494` completed successfully.
- Live verification returned HTTP 200, a working readout tick to 257 units, class cleanup after settling, and no animation under reduced motion.

## Next candidates

1. Refine the work-index jump controls so the active project reads more clearly on both pointer and keyboard navigation.
2. Give the project preview sticker a matching keyboard-focus tilt so focus and hover feel like the same physical state.
