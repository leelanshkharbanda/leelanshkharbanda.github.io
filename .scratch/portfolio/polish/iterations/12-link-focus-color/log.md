# Iteration 12 — Quiet/footer link focus color

Date: 2026-11-27

## Inspected

- Captured project quiet links and footer links at rest, on hover, and with keyboard focus at 1440×900 and 390×844.
- Reviewed natural keyboard movement from adjacent links, accent contrast, focus rings, and reduced-motion behavior.
- Hover changed the accent color but keyboard focus kept the resting color.

## Research

- Codrops' [Simple CSS Line Hover Animations for Links](https://tympanus.net/codrops/2021/02/10/simple-css-line-hover-animations-for-links/) treats small link-state color/motion as compact feedback.
- Awwwards' [CTA with micro-interaction](https://www.awwwards.com/inspiration/cta-with-micro-interaction-s11-system) reinforces control state tied directly to interaction.
- Original adaptation: mirror the existing quiet-link and footer-link hover accents on `:focus-visible`, with a 160 ms color transition and reduced-motion suppression. No reference code, assets, or wording were copied.

## Changed

- `src/styles/playground.css` — added quiet-link and footer-link focus color parity plus explicit reduced-motion suppression.
- `src/styles/global.css` — added the 160 ms footer-link color transition while preserving the existing footer focus outline.
- `tests/e2e/playground.spec.ts` — added natural keyboard focus, accent color, focus-ring, hover/rest, and reduced-motion regressions.

## Council review

- Creative director + technical content strategist: approve. The hover/focus pairing is restrained. Default 160 ms and manual-toggle transition assertions were added after their minor note.
- Principal engineer + release reviewer: approve with no findings. Selectors, transitions, reduced-motion paths, and targeted cross-browser tests are sound.
- Product + accessibility reviewer: initially rejected because global coral focus did not match the effective lime footer hover. Focus now uses the playground lime accent; the focused recheck found no blocker/major remaining, and an outline-color assertion was added after their minor note.

## Verified

- `npm run format && npm run verify` passed.
- Astro: 0 errors, 0 warnings, 0 hints.
- Vitest: 45 tests passed.
- Playwright: 196 passed, 8 expected skips across Chromium, Firefox, and WebKit, including Axe checks.
- Budgets: CSS 12,674 bytes gzip; TraceInspector JavaScript 73,196 bytes gzip; fonts 43,244 bytes; 0 third-party runtime requests.
- Fresh desktop/mobile quiet/footer rest, hover, focus, and route screenshots were inspected. The accent is clear, focus rings remain visible, and no layout shifts occur.
- Local screenshots are retained under `screenshots/baseline/` and `screenshots/after/` and ignored by Git.

## Next candidates

1. Revisit contact-copy confirmation timing only if real-device testing exposes a rough corner.
2. Do a final hover-only selector audit before adding any further motion.
