# Iteration 08 — Identity-mark focus tilt

Date: 2026-11-26

## Inspected

- Captured the header identity mark at rest, on hover, and with keyboard focus at 1440×900 and 390×844.
- Reviewed the existing hover rotation, global focus ring, fixed dimensions, and reduced-motion overrides.
- The mark rotated on hover but stayed at its resting angle for keyboard users.

## Research

- Codrops' [Tilt Hover Effects](https://tympanus.net/codrops/2016/11/23/tilt-hover-effects/) explores small tilt responses as tactile feedback.
- Awwwards' [Cards Tilt Hover](https://www.awwwards.com/inspiration/cards-tilt-hover-maria-joao-abrantes) reinforces tilt as a compact interaction cue.
- Original adaptation: mirror the existing 8° hover rotation on `:focus-visible` while retaining the current reduced-motion reset. No reference code, assets, or wording were copied.

## Changed

- `src/styles/playground.css:138` — added keyboard-focus parity to the identity-mark rotation.
- `tests/e2e/playground.spec.ts:112` — added settled-angle, natural keyboard navigation, focus-ring, blur, OS reduced-motion, and manual-toggle regressions.

## Council review

- Creative director + technical content strategist: approve. The shared 8° gesture is restrained. Explicit reduced-focus assertions were added after their minor note.
- Principal engineer + release reviewer: approve. No blocker or major findings. Settled-angle tolerances and explicit reduced-focus checks were added after their minor notes.
- Product + accessibility reviewer: approve. The inner-mark transform preserves the native link target and global focus ring. Focused OS/manual reduced-motion assertions were added after their minor note.

## Verified

- `npm run format && npm run verify` passed.
- Astro: 0 errors, 0 warnings, 0 hints.
- Vitest: 45 tests passed.
- Playwright: 187 passed, 8 expected skips across Chromium, Firefox, and WebKit, including Axe checks.
- Budgets: CSS 12,483 bytes gzip; TraceInspector JavaScript 73,196 bytes gzip; fonts 43,244 bytes; 0 third-party runtime requests.
- Fresh desktop/mobile rest, hover, focus, and route screenshots were inspected. The mark stays inside its fixed footprint and no layout shifts occur.
- Local screenshots are retained under `screenshots/baseline/` and `screenshots/after/` and ignored by Git.

## Release

- Committed as `a567f61` and pushed to `main`.
- Pages deployment run `45872449887` completed successfully.
- Live verification returned HTTP 200 with natural keyboard focus on the identity link and the expected 8° mark rotation.

## Next candidates

1. Give back links the same arrow-focus nudge as project arrow links if their markup shares the same component.
2. Revisit footer motion-toggle visual state only if real-device use exposes ambiguity.
