# Iteration 01 — Primary pill detent

Date: 2026-11-26

## Inspected

- Ran the Astro preview at `http://127.0.0.1:4321/`.
- Captured viewport and full-page screenshots at 1440×900 and 390×844 for `/`, `/work/`, `/about/`, `/resume/`, and `/work/chronos-dsp/`.
- Reviewed project cards, navigation, SignalToy, TraceInspector, focus states, mobile spacing, diagram bounds, and the footer motion control.
- Found the primary pill's hover shadow contracted from 4 px to 2 px while the pill itself stayed put. The result read as a shadow change rather than a physical settle.

## Research

- Codrops' [Animated Buttons with CSS3](https://tympanus.net/codrops/2011/11/07/animated-buttons-with-css3/) describes shadow movement as the cue for lift and press state.
- Awwwards' [button micro-interaction examples](https://www.awwwards.com/inspiration/button-micro-interaction-edifis) and [Buttons — Micro Interaction](https://www.awwwards.com/inspiration/buttons-micro-interaction) reinforced direct, state-linked feedback over decorative motion.
- Original adaptation: keep the existing hard-shadow silhouette, settle the pill exactly into the smaller shadow, then press it flat. No reference code, assets, or wording were copied.

## Changed

- `src/styles/playground.css:215` — added a 2 px hover/keyboard-focus settle and a 4 px `:active` press with a 70 ms press-in. Existing magnetic offsets compose with the detent.
- `tests/e2e/playground.spec.ts:14` — added rendered-transform, magnetic-offset, shadow, timing, keyboard-focus, and reduced-motion regressions.

## Council review

- Creative director + technical content strategist: approve. The 2 px shadow/settle match is restrained and preserves the visual identity and project evidence. Their minor test gap was addressed with transform and timing assertions.
- Principal engineer + release reviewer: approve. No blocker or major findings. Their minor magnetic-composition test gap was addressed with a nonzero offset and rendered-transform assertion.
- Product + accessibility reviewer: approve. No blocker or major findings. Focus outline, target dimensions, hit-area behavior, and both reduced-motion paths remain intact. Their minor focus/reduced-motion test gaps were addressed with outline and focus/active assertions.

## Verified

- `npm run format && npm run verify` passed three times; the final run includes the strengthened transform, timing, focus-outline, and reduced-motion assertions.
- Astro: 0 errors, 0 warnings, 0 hints.
- Vitest: 45 tests passed.
- Playwright: 159 passed, 6 expected skips across Chromium, Firefox, and WebKit, including Axe checks.
- Budgets: CSS 12,130 bytes gzip; TraceInspector JavaScript 73,196 bytes gzip; fonts 43,244 bytes; 0 third-party runtime requests.
- Fresh desktop/mobile screenshots were inspected for all five required routes. No clipping, overlap, diagram cutoff, or contrast regression was observed.
- Local screenshots are retained under `screenshots/baseline/` and `screenshots/after/` and ignored by Git.

## Release

- Committed as `8f907fd` and pushed to `main`.
- Pages deployment run `45851131602` completed successfully.
- Live verification returned HTTP 200 with the expected 0 px rest and 2 px hover detent.

## Next candidates

1. Give TraceInspector stage changes a short coordinated settle across the active row, SVG node, and readout so the mechanism handoff feels connected.
2. Add a brief readout tick to SignalToy when drag or keyboard input changes the path lengths, with reduced-motion and touch behavior covered.
