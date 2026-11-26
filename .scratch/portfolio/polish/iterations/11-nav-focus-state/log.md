# Iteration 11 — Navigation focus state

Date: 2026-11-27

## Inspected

- Captured desktop and mobile navigation links at rest, on hover, and with keyboard focus, including the Projects current-page state.
- Reviewed natural Tab/link navigation, `aria-current`, focus rings, target sizes, and reduced-motion behavior.
- Hover used a yellow pill, but desktop keyboard focus stayed transparent and current-page styling could override hover.

## Research

- Codrops' [Simple CSS Line Hover Animations for Links](https://tympanus.net/codrops/2021/02/10/simple-css-line-hover-animations-for-links/) treats small link-state motion/color as compact feedback.
- Awwwards' [CTA with micro-interaction](https://www.awwwards.com/inspiration/cta-with-micro-interaction-s11-system) reinforces control state tied directly to interaction.
- Original adaptation: match the existing yellow hover pill on keyboard focus, keep `aria-current` authoritative, and capability-gate pointer hover. No reference code, assets, or wording were copied.

## Changed

- `src/styles/playground.css:162` — added nav color transitions, focus parity, current-page hover/focus treatment, and explicit reduced-motion suppression.
- `tests/e2e/playground.spec.ts:158` — added desktop/mobile current-page hover, natural keyboard focus, focus-ring, `aria-current`, OS reduced-motion, and manual-toggle regressions.

## Council review

- Creative director + technical content strategist: initially rejected for current-page hover specificity and explicit reduced-motion coverage. The hover order was fixed, nav links were added to both override lists, and the focused recheck found no blocker/major remaining.
- Principal engineer + release reviewer: initially rejected for the same hover blocker and missing mobile/reduced coverage. Current-page hover, mobile current-page tests, and OS/manual transition assertions were added; the focused recheck found no blocker/major remaining.
- Product + accessibility reviewer: approve with no findings. Keyboard order, `aria-current`, contrast, target geometry, and the global focus ring remain intact.

## Verified

- `npm run format && npm run verify` passed.
- Astro: 0 errors, 0 warnings, 0 hints.
- Vitest: 45 tests passed.
- Playwright: 193 passed, 8 expected skips across Chromium, Firefox, and WebKit, including Axe checks.
- Budgets: CSS 12,638 bytes gzip; TraceInspector JavaScript 73,196 bytes gzip; fonts 43,244 bytes; 0 third-party runtime requests.
- Fresh desktop/mobile rest, hover, focus, current-page, and route screenshots were inspected. The yellow state is clear and no layout shifts occur.
- Local screenshots are retained under `screenshots/baseline/` and `screenshots/after/` and ignored by Git.

## Next candidates

1. Audit quiet links and footer links for the same hover/focus color parity.
2. Revisit contact-copy confirmation only if real-device testing exposes a rough corner.
