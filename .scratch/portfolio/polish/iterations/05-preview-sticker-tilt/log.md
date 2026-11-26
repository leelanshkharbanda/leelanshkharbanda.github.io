# Iteration 05 — Preview-sticker tilt

Date: 2026-11-26

## Inspected

- Captured the Chronos-DSP preview sticker at rest, on card hover, and with keyboard focus at 1440×900 and 390×844.
- Reviewed the existing card tilt, diagram-stage lift, focus ring, sticker containment, and reduced-motion overrides.
- The sticker stayed flat while the rest of the card responded, so the small paper label felt disconnected from the card’s physical state.

## Research

- Codrops' [Tilt Hover Effects](https://tympanus.net/codrops/2016/11/23/tilt-hover-effects/) explores small tilt responses as card feedback.
- Awwwards' [Cards Tilt Hover](https://www.awwwards.com/inspiration/cards-tilt-hover-maria-joao-abrantes) example reinforces tilt as a compact card micro-interaction.
- Original adaptation: a 2° right-corner tilt with a 1 px lift on hover and `:focus-within`. The effect is transform-only and decorative; no reference code, assets, or wording were copied.

## Changed

- `src/styles/playground.css:929` — added the restrained sticker tilt and matched hover/keyboard-focus states.
- `tests/e2e/playground.spec.ts:14` — added settled-angle, two-axis containment, focus parity, OS reduced-motion, and manual-toggle regressions.

## Council review

- Creative director + technical content strategist: approve. The movement reads as a small paper lift. Their minor containment concern was addressed with settled-angle and horizontal/vertical bounds assertions.
- Product + accessibility reviewer: approve. The decorative `aria-hidden` motion is subtle and reflow-free. Manual-toggle coverage was added after their minor note; touch remains native and unaffected.
- Principal engineer + release reviewer: approve. No blocker or major findings. Complete transform/origin checks and narrow-width/200%-text containment coverage were added after their minor note.

## Verified

- `npm run format && npm run verify` passed.
- Astro: 0 errors, 0 warnings, 0 hints.
- Vitest: 45 tests passed.
- Playwright: 177 passed, 6 expected skips across Chromium, Firefox, and WebKit, including Axe checks.
- Budgets: CSS 12,410 bytes gzip; TraceInspector JavaScript 73,196 bytes gzip; fonts 43,244 bytes; 0 third-party runtime requests.
- Fresh desktop/mobile route, rest, hover, and focus screenshots were inspected. The sticker stays inside its stage bar and the diagram remains fully visible.
- Local screenshots are retained under `screenshots/baseline/` and `screenshots/after/` and ignored by Git.

## Next candidates

1. Add a compact press detent to the mobile Menu summary so touch activation feels as deliberate as the hard-shadow styling.
2. Revisit contact-copy confirmation timing only if real-device use exposes a rough corner.
