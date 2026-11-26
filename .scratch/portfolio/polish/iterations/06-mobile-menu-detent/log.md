# Iteration 06 — Mobile Menu detent

Date: 2026-11-26

## Inspected

- Captured the mobile Menu summary at rest, while pressed, with keyboard focus, and open at 390×844.
- Reviewed native `details`/`summary` behavior, focus outline, touch activation, target size, and reduced-motion overrides.
- The hard-shadow pill looked tactile but stayed visually unchanged during press and open states.

## Research

- Codrops' [Subtle Click Feedback Effects](https://tympanus.net/codrops/2015/02/11/subtle-click-feedback-effects/) treats click/touch acknowledgment as a compact feedback layer.
- Awwwards' [UI Animation and Microinteractions](https://www.awwwards.com/awwwards/collections/animation/) collection reinforces state feedback tied directly to controls.
- Original adaptation: a 2 px press into the existing hard shadow, with yellow active/focus/open color. Touch release is acknowledged by the open state; no reference code, assets, or wording were copied.

## Changed

- `src/styles/playground.css:182` — added the mobile Menu press detent, open/focus color, and reduced-motion neutralization.
- `tests/e2e/playground.spec.ts` — added pointer, keyboard, touch-open, OS reduced-motion, and manual-toggle regressions; also stabilized an existing primary-pill shadow assertion exposed by the full suite.

## Council review

- Creative director + technical content strategist: visual direction approved. Their touch-context URL concern was not reproducible: the existing fixture pattern and a direct targeted run both pass. A visibility assertion was added during touch contact after their minor note.
- Principal engineer + release reviewer: approve. No blocker or major findings. Retrying shadow verification and Space-key activation coverage were added after their minor notes.
- Product + accessibility reviewer: approve with no findings. Native disclosure semantics, 44 px target height, visible focus, touch open state, and both reduced-motion paths remain intact.

## Verified

- `npm run format && npm run verify` passed.
- Astro: 0 errors, 0 warnings, 0 hints.
- Vitest: 45 tests passed.
- Playwright: 181 passed, 8 expected skips across Chromium, Firefox, and WebKit, including Axe checks.
- Budgets: CSS 12,466 bytes gzip; TraceInspector JavaScript 73,196 bytes gzip; fonts 43,244 bytes; 0 third-party runtime requests.
- Fresh mobile rest, active, focus, open, and route screenshots were inspected. The focus ring remains visible and the menu stays within the viewport.
- Local screenshots are retained under `screenshots/baseline/` and `screenshots/after/` and ignored by Git.

## Next candidates

1. Give arrow links the same 4 px nudge on keyboard focus that they already have on hover.
2. Revisit identity-mark focus rotation only if the arrow-link pass exposes a broader focus-parity gap.
