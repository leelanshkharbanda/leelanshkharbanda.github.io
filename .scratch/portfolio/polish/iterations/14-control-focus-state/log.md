# Iteration 14 — Interactive control focus accents

Date: 2026-11-27

## Inspected

- Captured SignalToy reset and TraceInspector Next controls at rest, on hover, and with keyboard focus at 1440×900 and 390×844.
- Reviewed control labels, borders, focus rings, disabled behavior, target sizes, and reduced-motion handling.
- Hover changed the text/border accent but keyboard focus kept the resting color.

## Research

- Codrops' [Subtle Click Feedback Effects](https://tympanus.net/codrops/2015/02/11/subtle-click-feedback-effects/) treats compact control feedback as acknowledgment of an action.
- Awwwards' [UI Animation and Microinteractions](https://www.awwwards.com/awwwards/collections/animation/) collection reinforces state feedback attached directly to controls.
- Original adaptation: mirror the existing reset/inspector hover accents on `:focus-visible`, with 160 ms color/border transitions and reduced-motion suppression. No reference code, assets, or wording were copied.

## Changed

- `src/styles/playground.css` — added SignalToy reset focus parity and explicit reduced-motion suppression.
- `src/styles/global.css` — added TraceInspector control focus parity while preserving disabled-state exclusions.
- `tests/e2e/playground.spec.ts:511` — added hover/rest, keyboard-focus, focus-ring, accent, disabled-safe selector, and reduced-motion regressions.

## Council review

- Creative director + technical content strategist: approve. The reused hover accents are restrained. Focus border-color assertions and native keyboard paths were added after their minor note; the timing-dependent touch class assertion was replaced by the existing functional touch checks.
- Principal engineer + release reviewer: approve. No blocker or major findings. Native keyboard sequences and OS/manual reduced-motion assertions were added after their minor notes.
- Product + accessibility reviewer: approve. Focus visibility, disabled exclusion, stable targets, contrast, and touch layout remain sound. Keyboard paths were strengthened; the timing-dependent touch class check was replaced by the existing functional drag/range/reset assertions.

## Verified

- `npm run format && npm run verify` passed.
- Astro: 0 errors, 0 warnings, 0 hints.
- Vitest: 45 tests passed.
- Playwright: 202 passed, 8 expected skips across Chromium, Firefox, and WebKit, including Axe checks.
- Budgets: CSS 12,748 bytes gzip; TraceInspector JavaScript 73,196 bytes gzip; fonts 43,244 bytes; 0 third-party runtime requests.
- Fresh desktop/mobile SignalToy/TraceInspector rest, hover, focus, and route screenshots were inspected. Accents are clear, focus rings remain visible, and no layout shifts occur.
- Local screenshots are retained under `screenshots/baseline/` and `screenshots/after/` and ignored by Git.

## Next candidates

1. Audit remaining card/link hover treatments for keyboard parity rather than adding new motion.
2. Revisit contact-copy confirmation only if real-device testing exposes a rough corner.
