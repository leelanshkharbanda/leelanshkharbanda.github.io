# Iteration 19 — Shared project-visual transition

Date: 2026-11-27

## Inspected

- Captured the Chronos-DSP card visual on Home and Work plus the case-study visual at 1440×900 and 390×844.
- Reviewed route links, unique visual IDs, diagram aspect ratios, current motion behavior, and browser support.
- Card-to-case navigation was instant even though the same original diagram appears in both contexts.

## Research

- MDN's [View Transition API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API) and [CSS view transitions guide](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/View_transitions) describe named shared-element transitions across documents.
- CSS-Tricks' [cross-document gotchas](https://css-tricks.com/cross-document-view-transitions-part-1/) covers the current `@view-transition` opt-in, snapshot aspect-ratio warping, browser fallback, and reduced-motion gating.
- Awwwards' [Case Study and Page Transition](https://www.awwwards.com/inspiration/case-study-and-page-transition-jo-benetuk-portfolio-24) and [Pinned gallery to shared-image case study](https://www.awwwards.com/inspiration/pinned-project-gallery-shared-image-case-study-transition-christen-dijoux-portfolio) examples reinforce continuity between selection and detail views.
- Original adaptation: a 360 ms contain-fit morph for the portfolio's own SVG diagram, with no root fade, no client-side router, and a tiny early preference guard. No reference code, assets, or wording were copied.

## Changed

- `src/components/ProjectVisual.astro` — added an optional shared transition name driven by a CSS custom property.
- `src/components/ProjectCard.astro` and `src/pages/work/[...slug].astro` — assign matching `project-*` names to card and case-study visuals.
- `src/styles/global.css` — defaults visuals to no transition name and names only hovered/focused cards plus the case visual.
- `src/styles/playground.css` — adds the 360 ms shared morph, contain-fit snapshots, static root, fine-pointer/reduced-motion gating, and manual-reduction override.
- `src/layouts/BaseLayout.astro` — scopes the `@view-transition` opt-in to Home/Work/case routes and disables it early from the stored manual preference.
- `src/components/Footer.astro` — synchronizes the transition opt-in when the manual motion control changes.
- `tests/e2e/view-transitions.spec.ts` — covers supported Chromium/WebKit transitions, Firefox/touch/OS fallbacks, manual reduction, keyboard activation, unmatched snapshots, unique names, and contain-fit timing.

## Council review

- Creative director + technical content strategist: initially rejected for unmatched named-card snapshots. Just-in-time hover/focus naming and an unmatched-group assertion were added; the focused recheck passed.
- Principal engineer + release reviewer: initially rejected for manual-reduction snapshot work and site-wide overhead. The opt-in is now route-scoped and disabled before render from the stored preference; the focused recheck passed.
- Product + accessibility reviewer: approved the bounded fine-pointer enhancement. Manual gating, keyboard activation, destination behavior, and fallback coverage were tightened; the focused recheck found no remaining issues.

## Verified

- `npm run format && npm run verify` passed.
- Astro: 0 errors, 0 warnings, 0 hints.
- Vitest: 45 tests passed.
- Playwright: 227 passed, 10 expected skips across Chromium, Firefox, and WebKit, including Axe checks.
- Budgets: CSS 12,973 bytes gzip; TraceInspector JavaScript 73,196 bytes gzip; fonts 43,244 bytes; largest inline script 2,460 bytes gzip; 0 third-party runtime requests.
- Targeted transition tests passed 13 cases with 2 expected touch skips. Chromium/WebKit reported a 360 ms shared group, `object-fit: contain`, no root animation, and no unmatched group; Firefox, touch, OS reduced motion, and manual reduction navigated normally.
- Mid-morph and settled desktop/mobile screenshots were captured for visual inspection.

## Next candidates

1. Extend the same shared-element idea to the case-study title only if the visual morph proves stable in production.
2. Keep the next larger interaction bounded to one project surface rather than adding a site-wide transition system.
