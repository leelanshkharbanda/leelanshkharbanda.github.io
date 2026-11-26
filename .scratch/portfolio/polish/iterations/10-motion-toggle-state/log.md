# Iteration 10 — Motion-toggle visual state

Date: 2026-11-26

## Inspected

- Captured the footer motion toggle at rest, after manual reduction, and with keyboard focus at 1440×900 and 390×844.
- Reviewed the corrected Reduce/Enable action labels, absence of `aria-pressed`, focus ring, stored preference, and OS-preference interaction.
- The reduced state changed the label but kept the same muted text/underline color, so the visual state was weaker than the semantic state.

## Research

- Codrops' [Subtle Click Feedback Effects](https://tympanus.net/codrops/2015/02/11/subtle-click-feedback-effects/) treats compact control feedback as acknowledgment of an action.
- Awwwards' [UI Animation and Microinteractions](https://www.awwwards.com/awwwards/collections/animation/) collection reinforces state feedback attached directly to controls.
- Original adaptation: use the existing lime accent for the manual reduced state while keeping the action label authoritative and avoiding a toggle-button role. No reference code, assets, or wording were copied.

## Changed

- `src/styles/global.css:1120` — added a 160 ms color transition and lime text/underline state for `html[data-motion='reduced']`.
- `tests/e2e/playground.spec.ts:401` — added color-state assertions while preserving the action-name and no-`aria-pressed` checks.

## Council review

- Creative director + technical content strategist: approve. The lime text/underline state is restrained and explicit. Inherited underline-color assertions were added after their minor note.
- Principal engineer + release reviewer: approve with no findings. Specificity, storage/OS coordination, and transition suppression are sound.
- Product + accessibility reviewer: approve with no findings. Green is supplemental to the action label, contrast is strong, and the footer focus ring remains intact.

## Verified

- `npm run format && npm run verify` passed.
- Astro: 0 errors, 0 warnings, 0 hints.
- Vitest: 45 tests passed.
- Playwright: 190 passed, 8 expected skips across Chromium, Firefox, and WebKit, including Axe checks.
- Budgets: CSS 12,596 bytes gzip; TraceInspector JavaScript 73,196 bytes gzip; fonts 43,244 bytes; 0 third-party runtime requests.
- Fresh desktop/mobile rest, reduced, focused, and route screenshots were inspected. The lime state is clear, the focus ring remains visible, and no layout shifts occur.
- Local screenshots are retained under `screenshots/baseline/` and `screenshots/after/` and ignored by Git.

## Next candidates

1. Revisit contact-copy confirmation timing only if real-device testing exposes a rough corner.
2. Audit remaining hover-only states for keyboard parity before adding any new motion.
