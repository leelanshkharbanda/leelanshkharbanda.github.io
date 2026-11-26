# Iteration 21 — SignalToy channel pulse

Date: 2026-11-27

## Inspected

- Captured Home and Work at 1440×900 and 390×844 before changing the interaction layer.
- Reviewed the existing SignalToy drag handles, range controls, reset behavior, readout tick, dither field, custom cursor, and route transitions.
- The hero sketch already explained direct and reflected path lengths, but it had no deliberate transmit action or arrival feedback.

## Research

- Codrops' [Animate Anything Along an SVG Path](https://tympanus.net/codrops/2022/01/19/animate-anything-along-an-svg-path/) describes path-following motion with `getPointAtLength()`.
- MDN's [SVGGeometryElement.getPointAtLength](https://developer.mozilla.org/en-US/docs/Web/API/SVGGeometryElement/getPointAtLength) and [Window.requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame) document the underlying browser APIs.
- Original adaptation: two lightweight SVG pulse trails whose travel time scales with the portfolio's own direct/reflected path lengths, followed by a receiver acknowledgment. No reference code, assets, or wording were copied.

## Changed

- `src/components/SignalToy.astro` — added direct/reflected pulse trails, a receiver ring, a native Send pulse button, an instrument-state label, larger transparent handle targets, and neutral no-JavaScript copy.
- `src/pages/index.astro` — changed the static sticker from an interaction instruction to “channel sketch.”
- `src/scripts/signal-toy.ts` — added linear path-length timing, image-source reflection geometry, arrival/readout coordination, restart/cancellation lifecycle, visibility/resize/motion handling, pointer focus, and polite status updates.
- `src/styles/playground.css` — added pulse/ring styling, 44px controls, responsive action stacking, narrow readout reflow, and reduced-motion suppression.
- `scripts/check-budgets.mjs` — added a separately reported 6 KB gzip SignalToy budget.
- `tests/e2e/playground.spec.ts` — added keyboard/touch/reduced-motion, timing, cancellation, restart, hit-target, 200% text, tab-order, and acknowledgment regressions.
- `tests/e2e/formatting.spec.ts` — extended no-JavaScript coverage for the hidden controls, inactive pulses, and static path note.

## Council review

- Creative director: initially rejected for a tab-order regression, clamped timing, and an overwritten reflected-arrival state. The tests, linear timing, and 720 ms arrival hold were fixed; final recheck approved.
- Principal engineer: initially flagged stale status, unbudgeted SignalToy JavaScript, and missing lifecycle coverage. Cancellation, budget reporting, and restart/resize/motion tests were added; final recheck approved.
- Technical content strategist: initially rejected the millisecond announcement and midpoint reflection. Arrival copy no longer implies measurement, and the bounce now uses the reflected receiver image; final recheck approved.
- Product/accessibility reviewer: initially rejected sub-44px targets and 320px/200% button overlap. Targets, ranges, action layout, pointer focus, stale status, and no-JS copy were fixed. A second pass found edge overlap in the hit-test; limits moved inward and real `elementFromPoint` coverage was added. Final recheck approved.

## Verified

- `npm run check` and `npm run build` pass with 0 Astro errors, warnings, and hints; all 45 Vitest tests pass.
- Focused browser checks pass: 30 playground/control tests and 9 SignalToy formatting tests across Chromium, Firefox, and WebKit.
- `npm run verify` passed: Prettier, Astro 0 errors/warnings/hints, Vitest 45/45, HTML validation, budgets, and Playwright 252 passed with 12 expected skips.
- Budgets: CSS 13,433 bytes gzip; TraceInspector JavaScript 73,344 bytes gzip; SignalToy JavaScript 2,509 bytes gzip; fonts 43,244 bytes; largest inline script 2,460 bytes gzip; 0 third-party runtime requests.
- Fresh rest, mid-pulse, reflected-arrival, received, desktop, touch-mobile, and 320px/200% screenshots were inspected under `screenshots/after/`.
- Release reviewer approved the complete diff, regression coverage, budget reporting, and fresh browser evidence.

## Next candidates

1. Give the Chronos-DSP case-study stage controls a matching transmit/arrival acknowledgment only if the hero pulse remains stable in production.
2. Keep the next larger interaction bounded to one project surface rather than adding another site-wide animation system.
