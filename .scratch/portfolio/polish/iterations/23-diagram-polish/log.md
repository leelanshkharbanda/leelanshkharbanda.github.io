# Iteration 23 — Diagram inspector and visual polish

Date: 2026-11-27

## Inspected

- Captured all six project diagrams on Home, Work, and case studies at 1440×1000 and 390×844.
- Reviewed inline SVG geometry, labels, connectors, captions, preview cards, responsive scaling, and existing dither/hover/view-transition behavior.
- Desktop diagrams were structurally sound, but phone-scale inline diagrams became unreadable thumbnails and there was no direct inspection path.

## Research

- MDN's [HTML `<dialog>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog) documents modal focus behavior, Escape/close handling, inert background content, backdrop styling, and native accessibility semantics.
- MDN's [Pointer Events](https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events) and [Element.setPointerCapture](https://developer.mozilla.org/en-US/docs/Web/API/Element/setPointerCapture) informed the existing drag and pan interaction model.
- Original adaptation: a shared native-dialog inspector with cloned SVG geometry, local ID remapping, zoom/fit controls, keyboard/touch panning, project credit, and subtle stage/plot feedback. No reference code, assets, or wording were copied.

## Changed

- `src/components/DiagramInspector.astro` — added the shared native dialog, compact mobile controls, zoom toolbar, scrollable canvas, caption, and close behavior.
- `src/scripts/diagram-inspector.ts` — added isolated SVG cloning, ID/ARIA reference remapping, two-axis Fit, zoom bounds, focus trapping, body scroll cleanup, focus restoration, and project title/credit rendering.
- `src/components/ProjectVisual.astro` — added project-specific Inspect triggers and title/credit metadata while preserving static SVG content.
- `src/components/ProjectCard.astro` and `src/pages/work/[...slug].astro` — supply project title and collaboration credit to the shared visual.
- `src/layouts/BaseLayout.astro` — loads the inspector as a separate dynamic chunk.
- `src/styles/global.css` — added inspector styling, 44px controls, mobile 200% layouts, focus states, and stage/plot hover feedback.
- `scripts/check-budgets.mjs` — added a named 6 KB gzip DiagramInspector budget.
- `tests/e2e/diagram-inspector.spec.ts` — added dialog lifecycle, local ARIA, Fit, zoom bounds, focus trap, touch pan, mobile Axe, 200% text, no-JS, hover, and reduced-motion coverage.
- `playwright.config.ts` — reduced workers to two to prevent parallel browser resource crashes.

## Council review

- Creative director: approved the dark instrument-panel direction and mobile utility after Fit/pan and reduced-motion hover feedback were tightened.
- Principal engineer: initially rejected width-only Fit, unresolved ARIA IDREFs, and the missing named budget. Two-axis Fit, local IDREF remapping, a separate 1,435-byte chunk, and lifecycle tests resolved the findings.
- Technical content strategist: initially rejected missing project/team context. The inspector now uses the short project title and combines collaboration credit with the original caption.
- Product/accessibility reviewer: initially rejected 200% mobile control overflow and local ARIA gaps. Compact controls, a 120px minimum canvas, lower Fit scale, explicit focus trapping, focusable captions, and long-title regressions resolved the findings.
- Release reviewer: required fresh desktop/mobile/200% captures after the final source edits; the complete set was recaptured and approved.

## Verified

- `npm run verify` passed: Prettier, Astro 0 errors/warnings/hints, Vitest 45/45, HTML validation, budgets, and Playwright 281 passed with 16 expected skips.
- Focused inspector suite: 25 passed, 2 expected Chromium-only touch skips across Chromium, Firefox, and WebKit.
- Budgets: CSS 14,343 bytes gzip; TraceInspector JavaScript 73,344 bytes gzip; SignalToy JavaScript 3,530 bytes gzip; DiagramInspector JavaScript 1,435 bytes gzip; fonts 43,244 bytes; largest inline script 2,460 bytes gzip; 0 third-party runtime requests.
- Fresh inline diagram, desktop inspector/fit, mobile inspector, and 320px/200% long-title screenshots were inspected under `screenshots/after/`.

## Next candidates

1. Add stage-specific inspector narration only if it improves comprehension without duplicating the existing captions and descriptions.
2. Keep future diagram work bounded to readable labels and purposeful feedback rather than adding decorative motion to every connector.
