# Iteration 13 — Secondary-button focus state

Date: 2026-11-27

## Inspected

- Captured the home secondary “About me” button at rest, on hover, and with keyboard focus at 1440×900 and 390×844.
- Reviewed its lilac hover background, magnetic transform, focus ring, target size, and reduced-motion reset.
- Hover changed the background to lilac but keyboard focus kept the paper color.

## Research

- Codrops' [Subtle Click Feedback Effects](https://tympanus.net/codrops/2015/02/11/subtle-click-feedback-effects/) treats compact control feedback as acknowledgment of an action.
- Awwwards' [Button & Card Interaction](https://www.awwwards.com/inspiration/button-card-interaction-oz-studio) reinforces state changes attached directly to controls.
- Original adaptation: mirror the existing lilac hover background on `:focus-visible` without changing the magnetic transform or button semantics. No reference code, assets, or wording were copied.

## Changed

- `src/styles/playground.css:300` — added secondary-button keyboard-focus parity with the existing lilac hover state.
- `tests/e2e/playground.spec.ts` — added natural keyboard focus, background color, focus-ring, blur, hover/rest, and reduced-motion regressions.

## Council review

- Creative director + technical content strategist: approve. The lilac focus state is restrained and coherent. Reduced-focus assertions were added after their minor note.
- Principal engineer + release reviewer: approve. No blocker or major findings. The rule is paint-only and preserves magnetic composition; reduced-focus coverage was added after their minor note.
- Product + accessibility reviewer: approve with no findings. Paint-only focus parity preserves tab order, magnetic hit stability, touch behavior, target size, contrast, and the global focus ring.

## Verified

- `npm run format && npm run verify` passed.
- Astro: 0 errors, 0 warnings, 0 hints.
- Vitest: 45 tests passed.
- Playwright: 199 passed, 8 expected skips across Chromium, Firefox, and WebKit, including Axe checks.
- Budgets: CSS 12,697 bytes gzip; TraceInspector JavaScript 73,196 bytes gzip; fonts 43,244 bytes; 0 third-party runtime requests.
- Fresh desktop/mobile rest, hover, focus, and route screenshots were inspected. The lilac state is clear, the focus ring remains visible, and no layout shifts occur.
- Local screenshots are retained under `screenshots/baseline/` and `screenshots/after/` and ignored by Git.

## Next candidates

1. Audit remaining control-only hover states (SignalToy reset, TraceInspector controls) for keyboard parity.
2. Revisit contact-copy confirmation only if real-device testing exposes a rough corner.
