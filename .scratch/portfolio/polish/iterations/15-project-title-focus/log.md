# Iteration 15 — Project-title focus color

Date: 2026-11-27

## Inspected

- Captured the Chronos-DSP project title at rest, on hover, and with keyboard focus at 1440×900 and 390×844.
- Reviewed the exact native Tab path, card focus behavior, signal-color contrast, underline, and reduced-motion handling.
- Hover added signal color and an underline, but keyboard focus kept the ink title without an underline.

## Research

- Codrops' [Simple CSS Line Hover Animations for Links](https://tympanus.net/codrops/2021/02/10/simple-css-line-hover-animations-for-links/) treats small link-state color/motion as compact feedback.
- Awwwards' [Text Animation — Hover Effect](https://www.awwwards.com/inspiration/text-animation-hover-effect) reinforces text-state feedback attached directly to interaction.
- Original adaptation: mirror the existing project-title hover color and underline on `:focus-visible`, with a 160 ms color transition and reduced-motion suppression. No reference code, assets, or wording were copied.

## Changed

- `src/styles/playground.css:845` — added project-title keyboard-focus parity with the existing hover color/underline.
- `tests/e2e/playground.spec.ts:254` — added exact native Tab-order, color, underline, focus-ring, blur, hover/rest, and reduced-motion regressions.

## Council review

- Creative director + technical content strategist: approve. The signal color/underline pairing is restrained. Default-duration and unhovered reduced-focus assertions were added after their minor note.
- Principal engineer + release reviewer: approve. No blocker or major findings. The test now uses the adjacent comparison link instead of nine unrelated Tab stops, moves the pointer away for reduced focus, and asserts focus color.
- Product + accessibility reviewer: approve with no findings. Focus reuses the hover contrast/underline without geometry changes; native pointer/touch behavior and the global focus ring remain intact.

## Verified

- `npm run format && npm run verify` passed.
- Astro: 0 errors, 0 warnings, 0 hints.
- Vitest: 45 tests passed.
- Playwright: 205 passed, 8 expected skips across Chromium, Firefox, and WebKit, including Axe checks.
- Budgets: CSS 12,762 bytes gzip; TraceInspector JavaScript 73,196 bytes gzip; fonts 43,244 bytes; 0 third-party runtime requests.
- Fresh desktop/mobile rest, hover, focus, and route screenshots were inspected. The signal color/underline is clear, the focus ring remains visible, and no layout shifts occur.
- Local screenshots are retained under `screenshots/baseline/` and `screenshots/after/` and ignored by Git.

## Next candidates

1. Audit the remaining project-strip and next-project hover treatments for keyboard parity.
2. Revisit contact-copy confirmation only if real-device testing exposes a rough corner.
