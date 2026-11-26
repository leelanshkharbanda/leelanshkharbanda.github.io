# Iteration 07 — Arrow-link focus nudge

Date: 2026-11-26

## Inspected

- Captured the Chronos-DSP “Read more” arrow link at rest, on hover, and with keyboard focus at 1440×900 and 390×844.
- Reviewed the existing 4 px hover nudge, focus ring, hit target, and reduced-motion behavior.
- Hover moved the arrow but keyboard focus did not, so pointer and keyboard users received different feedback.

## Research

- Codrops' [Simple CSS Line Hover Animations for Links](https://tympanus.net/codrops/2021/02/10/simple-css-line-hover-animations-for-links/) treats small link motion as a compact micro-interaction.
- Awwwards' [CTA with micro-interaction](https://www.awwwards.com/inspiration/cta-with-micro-interaction-s11-system) reinforces arrow movement tied directly to a link state.
- Original adaptation: mirror the existing 4 px hover nudge on `:focus-visible` and remove the transform for OS/manual reduced motion. No reference code, assets, or wording were copied.

## Changed

- `src/styles/global.css:404` — added keyboard-focus parity to the existing arrow nudge.
- `src/styles/playground.css` — suppressed arrow movement under both reduced-motion paths.
- `tests/e2e/playground.spec.ts:112` — added hover, natural keyboard navigation, focus-ring, blur, OS reduced-motion, and manual-toggle regressions.
- `tests/e2e/folio-nav.spec.ts` — stabilized the existing Firefox scroll-tracking check by disabling smooth scroll for its programmatic positioning.

## Council review

- Creative director + technical content strategist: approve. The nudge is restrained focus parity. Natural Tab/link navigation and reduced-focus assertions were added after their minor note.
- Principal engineer + release reviewer: approve. No blocker or major findings. The same natural-navigation and reduced-focus gaps were addressed.
- Product + accessibility reviewer: approve. The span-only transform preserves the hit target and global focus ring; touch behavior is unchanged. Natural link navigation and focus-ring assertions were added after their minor note.

## Verified

- `npm run format && npm run verify` passed.
- Astro: 0 errors, 0 warnings, 0 hints.
- Vitest: 45 tests passed.
- Playwright: 184 passed, 8 expected skips across Chromium, Firefox, and WebKit, including Axe checks.
- Budgets: CSS 12,477 bytes gzip; TraceInspector JavaScript 73,196 bytes gzip; fonts 43,244 bytes; 0 third-party runtime requests.
- Fresh desktop/mobile rest, hover, focus, and route screenshots were inspected. The arrow stays inside the link and no layout shifts occur.
- Local screenshots are retained under `screenshots/baseline/` and `screenshots/after/` and ignored by Git.

## Next candidates

1. Give the identity mark the same rotation on keyboard focus that it already has on hover.
2. Revisit back-link arrow parity only if the identity-mark pass reveals a consistent focus-state pattern.
