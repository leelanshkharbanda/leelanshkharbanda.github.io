# Iteration 04 — Work-index active indicator

Date: 2026-11-26

## Inspected

- Captured the work-index jump controls at rest, hover, keyboard-active, and next-keyboard-focus states at 1440×900 and 390×844.
- Reviewed active `aria-current` updates, arrow-key navigation, focus outlines, responsive wrapping, and reduced-motion behavior.
- The active project had green fill and a hard shadow but no compact non-color shape cue. A first flex-space implementation made the desktop row wrap, so the indicator was moved into the existing pill padding.

## Research

- Awwwards' [Scroll Triggered Micro-Interactions](https://www.awwwards.com/inspiration/scroll-triggered-micro-interactions) example illustrates navigation state changing in response to scroll.
- Codrops' [Corentin Bernadou portfolio case study](https://tympanus.net/codrops/2026/03/05/inside-corentin-bernadous-portfolio-swiss-inspired-layouts-webgl-geometry-and-thoughtful-motion/) highlights navigation switcher micro-interactions as part of a restrained portfolio system.
- Original adaptation: a 6 px ink dot tied to `aria-current`, with matching yellow hover/focus feedback. The dot is absolutely positioned inside reserved padding, so pill widths and the desktop single-row layout remain stable. No reference code, assets, or wording were copied.

## Changed

- `src/styles/dithering.css:46` — added the compact active dot, paint-only transitions, and pointer/keyboard hover parity without changing link semantics.
- `tests/e2e/folio-nav.spec.ts:34` — added dot geometry, active-state, width-stability, hover/focus, reduced-motion, and 390 px wrapping regressions.

## Council review

- Creative director + technical content strategist: approve. The dot is restrained and clarifies position; shape/circularity assertions were added after their minor note.
- Principal engineer + release reviewer: approve. No blocker or major findings. Width-stability, hover, narrow wrapping, and link-transition reduced-motion assertions were added after their minor note.
- Product + accessibility reviewer: approve. The dot supplements `aria-current`, retains strong contrast and native keyboard/touch behavior, and leaves the global focus ring intact. Shape and narrow-viewport assertions were added after their minor note.

## Verified

- `npm run format && npm run verify` passed.
- Astro: 0 errors, 0 warnings, 0 hints.
- Vitest: 45 tests passed.
- Playwright: 171 passed, 6 expected skips across Chromium, Firefox, and WebKit, including Axe checks.
- Budgets: CSS 12,385 bytes gzip; TraceInspector JavaScript 73,196 bytes gzip; fonts 43,244 bytes; 0 third-party runtime requests.
- Fresh desktop/mobile route, rest, hover, keyboard-active, and next-focus screenshots were inspected. The desktop jump row remains on one line, mobile wrapping stays inside the viewport, and no label or dot overlap was introduced.
- Local screenshots are retained under `screenshots/baseline/` and `screenshots/after/` and ignored by Git.

## Next candidates

1. Give the project preview sticker a matching keyboard-focus tilt so focus and hover read as the same physical state.
2. Revisit mobile navigation press feedback only if real-device testing exposes a rough corner; avoid adding motion for its own sake.
