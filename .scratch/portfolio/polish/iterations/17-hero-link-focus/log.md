# Iteration 17 — Featured-comparison focus state

Date: 2026-11-27

## Inspected

- Captured the first featured-comparison card at rest, on hover, and with keyboard focus at 1440×900 and 390×844.
- Reviewed natural keyboard movement from SignalToy reset, card geometry, yellow hover contrast, focus ring, and reduced-motion handling.
- Hover changed the card to yellow but keyboard focus kept the paper background.

## Research

- Codrops' [Simple CSS Line Hover Animations for Links](https://tympanus.net/codrops/2021/02/10/simple-css-line-hover-animations-for-links/) treats small link-state color/motion as compact feedback.
- Awwwards' [Animated Cards with Hover Interaction](https://www.awwwards.com/inspiration/animated-cards-with-hover-interaction-redgevity-master) reinforces card-state feedback attached directly to interaction.
- Original adaptation: mirror the existing comparison-card yellow hover on `:focus-visible`, with a 160 ms background transition and reduced-motion suppression. No reference code, assets, or wording were copied.

## Changed

- `src/styles/playground.css:681` — added featured-comparison keyboard-focus parity with the existing yellow hover state.
- `tests/e2e/playground.spec.ts` — added natural keyboard focus, background color, focus-ring, hover/rest, blur, normal timing, OS reduced-motion, and manual-toggle regressions.

## Council review

- Creative director + technical content strategist: approve with no findings. The yellow focus treatment is restrained, coherent, and leaves copy/layout unchanged.
- Product + accessibility reviewer: approve with no findings. Keyboard focus matches hover, the inherited focus ring and padded target remain intact, and both reduced-motion paths disable the transition.
- Principal engineer + release reviewer: approve. No blocker or major findings. The focused comparison card now raises above its siblings so the full focus ring is not overpainted; position/z-index assertions were added after their minor note.

## Verified

- `npm run format && npm run verify` passed.
- Astro: 0 errors, 0 warnings, 0 hints.
- Vitest: 45 tests passed.
- Playwright: 211 passed, 8 expected skips across Chromium, Firefox, and WebKit, including Axe checks.
- Budgets: CSS 12,810 bytes gzip; TraceInspector JavaScript 73,196 bytes gzip; fonts 43,244 bytes; 0 third-party runtime requests.
- Fresh desktop/mobile rest, hover, focus, and route screenshots were inspected. The yellow state is clear, the focus ring remains visible, and card geometry does not shift.
- Local screenshots are retained under `screenshots/baseline/` and `screenshots/after/` and ignored by Git.

## Release

- Committed as `8206512` and pushed to `main`.
- Pages deployment run `45888711297` completed successfully.
- Live verification returned HTTP 200 with natural keyboard focus, yellow background, and z-index 1 above sibling cards.

## Next candidates

1. Do a final hover-only selector audit; stop if remaining treatments are intentional or non-interactive.
2. Revisit contact-copy confirmation only if real-device testing exposes a rough corner.
