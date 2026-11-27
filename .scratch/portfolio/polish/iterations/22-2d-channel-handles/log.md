# Iteration 22 — 2D SignalToy handles

Date: 2026-11-27

## Inspected

- Captured the shipped pulse interaction at 1440×900 and 390×844 as the baseline.
- Reviewed the existing horizontal TX/RX drag, native ranges, pulse paths, reflection geometry, reset, keyboard behavior, and no-JavaScript fallback.
- The sketch responded only on X, while its direct/reflected geometry was already fully 2D.

## Research

- MDN's [Pointer Events](https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events) guide covers primary-pointer handling, pointer capture, cancellation, and `touch-action`.
- MDN's [Element.setPointerCapture](https://developer.mozilla.org/en-US/docs/Web/API/Element/setPointerCapture) documents drag capture and release behavior.
- Original adaptation: pointer-preserving 2D handles paired with native X/Y sliders, bounded separation, and collision-aware labels. No reference code, assets, or wording were copied.

## Changed

- `src/components/SignalToy.astro` — added native Transmitter/Receiver X/Y ranges, axis-specific keyboard help, a fixed legend fallback, and pointer-only SVG handles.
- `src/scripts/signal-toy.ts` — added Y movement, CTM-based pointer mapping, grab offsets, pointer-id filtering, 144-unit separation, exact reflection updates, label candidate scoring, path clearance, and legend fallback.
- `src/styles/playground.css` — added compact X/Y control layouts, 44px range targets, JS-gated grab behavior, and legend styling.
- `tests/e2e/playground.spec.ts` — added native-axis, pointer-offset, separation-boundary, touch, multi-touch, reset, range-sync, and exact geometry regressions.
- `tests/e2e/formatting.spec.ts` — added label/viewport/wall/node/hit-target/path clearance, close-position, fallback, resize, and no-JavaScript coverage.

## Council review

- Creative director: repeatedly rejected label/path collisions at close and boundary positions. Candidate placement gained node/hit-target/path costs, an 8-unit gap, 144-unit separation, and a fixed-legend fallback; final recheck approved.
- Principal engineer: flagged scalar ARIA, secondary-touch movement, off-center jumps, and weak boundary assertions. Native X/Y sliders, pointer identity/offset handling, and exact regressions were added; final recheck approved.
- Technical content strategist: requested exact reflected geometry assertions. The TX X 104→114 case now verifies direct 257, reflected 358, and bounce x 230.736; final recheck approved.
- Product/accessibility reviewer: flagged 2D scalar semantics, coincident targets, no-JS styling, and keyboard-help accuracy. Native controls, JS gating, separation, and axis-specific help resolved the findings; final recheck approved.
- Release reviewer: required a fresh screenshot set after the last source edits. All eleven captures were recaptured from the verified build and reinspected; final recheck approved.

## Verified

- `npm run verify` passed: Prettier, Astro 0 errors/warnings/hints, Vitest 45/45, HTML validation, budgets, and Playwright 256 passed with 14 expected skips.
- Focused browser checks passed: 35 playground/control tests and 9 SignalToy formatting tests across Chromium, Firefox, and WebKit.
- Budgets: CSS 13,543 bytes gzip; TraceInspector JavaScript 73,344 bytes gzip; SignalToy JavaScript 3,530 bytes gzip; fonts 43,244 bytes; largest inline script 2,460 bytes gzip; 0 third-party runtime requests.
- Fresh desktop, mobile, 320px/200%, near-horizontal, near-vertical, boundary, and legend-fallback screenshots were inspected under `screenshots/after/`.

## Release

- Committed as `415231d` and pushed to `main`.
- Pages deployment run `45933206118` completed successfully.
- Live verification returned HTTP 200, Transmitter Y moving from 104 to 114 with the SVG handle synchronized, a completed pulse, updated 268/358 unit readouts, and no page errors.

## Next candidates

1. Let the Chronos-DSP case-study stage controls reuse the same transmit/arrival language only if the hero 2D instrument remains stable in production.
2. Keep the next larger interaction bounded to one project surface rather than expanding the site-wide motion system.
