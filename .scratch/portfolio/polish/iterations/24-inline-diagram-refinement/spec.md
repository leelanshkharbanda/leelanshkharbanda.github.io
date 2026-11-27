# Iteration 24 — Inline diagram refinement

Date: 2026-11-27

## Intent

Polish the six inline project diagrams themselves. The existing inspector remains available, but it is not the deliverable and must not be expanded.

## Constraints

- Preserve the static Astro renderer, dark instrument-panel visual language, project evidence, captions, and accessible descriptions.
- Keep every SVG fully visible at `width: 100%; height: auto`; no clipping, overlap, horizontal page overflow, or hidden labels.
- Improve hierarchy, geometry, spacing, label formatting, scan order, and restrained tactile feedback in the inline presentation.
- Keep phone-scale diagrams legible without requiring the inspector. Prefer fewer, larger labels and stronger grouping over shrinking type.
- Preserve keyboard, touch, reduced-motion, no-JavaScript, view-transition, performance, and zero-third-party-request behavior.
- Do not change project claims, copy, architecture boundaries, or the inspector.

## Acceptance

1. Each diagram has an isolated owner and at least one source-level refinement.
2. Fresh 1440px and 390px captures show complete geometry and readable primary labels.
3. Focused tests verify geometry, text bounds, responsive behavior, and existing inspector compatibility.
4. `npm run verify` passes.
5. All five council roles approve with no blocker or major findings.
