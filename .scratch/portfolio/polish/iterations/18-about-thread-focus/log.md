# Iteration 18 — About-thread focus detent

Date: 2026-11-27

## Inspected

- Captured the first about-thread card at rest, on hover, and with keyboard focus at 1440×900 and 390×844.
- Reviewed the existing 3 px hover press, hard-shadow contraction, focus ring, target geometry, and reduced-motion reset.
- Hover produced a tactile detent but keyboard focus kept the resting shadow and position.

## Research

- Codrops' [Tilt Hover Effects](https://tympanus.net/codrops/2016/11/23/tilt-hover-effects/) explores small tilt responses as card feedback.
- Awwwards' [Cards Tilt Hover](https://www.awwwards.com/inspiration/cards-tilt-hover-maria-joao-abrantes) reinforces tilt as a compact interaction cue.
- Original adaptation: mirror the existing about-thread hover detent on `:focus-visible`, preserving its 180 ms transform/shadow transition and reduced-motion reset. No reference code, assets, or wording were copied.

## Changed

- `src/styles/playground.css:1409` — added keyboard-focus parity with the existing about-thread hover press.
- `tests/e2e/playground.spec.ts` — added rendered-transform, shadow, focus-ring, hover/rest, blur, and reduced-motion regressions.

## Council review

- Creative director + technical content strategist: approve. The shared detent is restrained and coherent. The exact six-step native Tab path replaced programmatic focus after their minor note.
- Principal engineer + release reviewer: approve. No blocker or major findings. Native Tab reachability and the manual reduced-motion path are now asserted.
- Product + accessibility reviewer: approve. The global focus ring, stable target, and supplemental transform/shadow remain intact; natural Tab traversal is now covered.

## Verified

- `npm run format && npm run verify` passed.
- Astro: 0 errors, 0 warnings, 0 hints.
- Vitest: 45 tests passed.
- Playwright: 214 passed, 8 expected skips across Chromium, Firefox, and WebKit, including Axe checks.
- Budgets: CSS 12,815 bytes gzip; TraceInspector JavaScript 73,196 bytes gzip; fonts 43,244 bytes; 0 third-party runtime requests.
- Fresh desktop/mobile rest, hover, focus, and route screenshots were inspected. The detent is clear, the focus ring remains visible, and card geometry does not shift.
- Local screenshots are retained under `screenshots/baseline/` and `screenshots/after/` and ignored by Git.

## Loop decision

The final hover-only audit found no remaining meaningful interactive parity gap: legacy hero-strip selectors have no current markup, and project-card hover states already use `:focus-within`. Stop here rather than add decorative churn.

## Next candidates

1. Final audit: remaining hover-only rules are unused legacy selectors or already have focus-within parity; stop rather than add churn.
2. Revisit contact-copy confirmation only if real-device testing exposes a rough corner.
