# Iteration 16 — Next-project focus color

Date: 2026-11-27

## Inspected

- Captured the Chronos-DSP next-project link at rest, on hover, and with keyboard focus at 1440×900 and 390×844.
- Reviewed the large link target, coral hover accent, focus ring, natural Tab order from case content, and reduced-motion handling.
- Hover changed the title to coral but keyboard focus kept the paper color.

## Research

- Codrops' [Simple CSS Line Hover Animations for Links](https://tympanus.net/codrops/2021/02/10/simple-css-line-hover-animations-for-links/) treats small link-state color/motion as compact feedback.
- Awwwards' [Text Animation — Hover Effect](https://www.awwwards.com/inspiration/text-animation-hover-effect) reinforces text-state feedback attached directly to interaction.
- Original adaptation: mirror the existing next-project coral hover on `:focus-visible`, with a 160 ms color transition and reduced-motion suppression. No reference code, assets, or wording were copied.

## Changed

- `src/styles/global.css:1936` — added next-project keyboard-focus parity with the existing coral hover state.
- `src/styles/playground.css` — suppressed the color transition under OS/manual reduced motion.
- `tests/e2e/playground.spec.ts` — added natural keyboard focus, color, focus-ring, hover/rest, blur, and reduced-motion regressions.

## Council review

- Creative director + technical content strategist: approve. The coral focus pairing is restrained and coherent. Normal 160 ms timing coverage was added after their minor note.
- Principal engineer + release reviewer: approve. No blocker or major findings. Normal 160 ms and manual-toggle transition assertions were added after their minor note.
- Product + accessibility reviewer: approve with no findings. Native focus order, large-target geometry, coral contrast, the paper-gapped focus ring, and touch layout remain intact.

## Verified

- `npm run format && npm run verify` passed.
- Astro: 0 errors, 0 warnings, 0 hints.
- Vitest: 45 tests passed.
- Playwright: 208 passed, 8 expected skips across Chromium, Firefox, and WebKit, including Axe checks.
- Budgets: CSS 12,788 bytes gzip; TraceInspector JavaScript 73,196 bytes gzip; fonts 43,244 bytes; 0 third-party runtime requests.
- Fresh desktop/mobile rest, hover, focus, and route screenshots were inspected. The coral state is clear, the focus ring remains visible, and the large target does not shift.
- Local screenshots are retained under `screenshots/baseline/` and `screenshots/after/` and ignored by Git.

## Release

- Committed as `fda8eb3` and pushed to `main`.
- Pages deployment run `45887465727` completed successfully.
- Live verification returned HTTP 200 with natural keyboard focus on the next-project link and the expected coral color.

## Next candidates

1. Audit the remaining hero project-strip/comparison hover treatments for keyboard parity.
2. Revisit contact-copy confirmation only if real-device testing exposes a rough corner.
