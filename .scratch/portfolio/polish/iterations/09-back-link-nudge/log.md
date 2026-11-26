# Iteration 09 — Back-link arrow nudge

Date: 2026-11-26

## Inspected

- Captured case-study and résumé back links at rest, on hover, and with keyboard focus at 1440×900 and 390×844.
- Reviewed native link semantics, focus ring, target size, directional consistency, and reduced-motion behavior.
- The back arrow was plain text and stayed static while forward arrow links already had tactile feedback.

## Research

- Codrops' [Simple CSS Line Hover Animations for Links](https://tympanus.net/codrops/2021/02/10/simple-css-line-hover-animations-for-links/) treats small link motion as a compact micro-interaction.
- Awwwards' [CTA with micro-interaction](https://www.awwwards.com/inspiration/cta-with-micro-interaction-s11-system) reinforces arrow movement tied directly to link state.
- Original adaptation: a 3 px left nudge on hover and `:focus-visible`, with the arrow marked decorative and movement removed under reduced motion. No reference code, assets, or wording were copied.

## Changed

- `src/pages/work/[...slug].astro:44` and `src/pages/resume.astro:17` — wrapped the back arrows in `aria-hidden` spans.
- `src/styles/global.css` — added the directional hover/focus nudge.
- `src/styles/playground.css` — suppressed back-arrow movement under OS/manual reduced motion.
- `tests/e2e/playground.spec.ts:199` — added case-study/résumé hover, natural keyboard focus, focus-ring, blur, and reduced-motion regressions.

## Council review

- Creative director + technical content strategist: approve with no findings. The directional nudge is restrained and the decorative glyph preserves clean link names.
- Product + accessibility reviewer: approve. Native Tab order, 44 px targets, focus rings, and reduced-motion behavior remain intact. A focused manual-toggle assertion was added after their minor note.
- Principal engineer + release reviewer: approve. No blocker or major findings. The arrow selector is scoped, hover is capability-gated for fine pointers, and the test now asserts the exact six-step native Tab path.

## Verified

- `npm run format && npm run verify` passed.
- Astro: 0 errors, 0 warnings, 0 hints.
- Vitest: 45 tests passed.
- Playwright: 190 passed, 8 expected skips across Chromium, Firefox, and WebKit, including Axe checks.
- Budgets: CSS 12,560 bytes gzip; TraceInspector JavaScript 73,196 bytes gzip; fonts 43,244 bytes; 0 third-party runtime requests.
- Fresh desktop/mobile case-study and résumé rest, hover, focus, and route screenshots were inspected. No label clipping, overlap, or layout shift was introduced.
- Local screenshots are retained under `screenshots/baseline/` and `screenshots/after/` and ignored by Git.

## Release

- Committed as `d0464be` and pushed to `main`.
- Pages deployment run `45874639738` completed successfully.
- Live verification returned HTTP 200 with natural keyboard focus on the back link and the expected -3 px arrow nudge.

## Next candidates

1. Review the footer motion toggle's visual state now that its accessible semantics are corrected.
2. Revisit contact-copy confirmation only if real-device testing exposes a rough corner.
