# Council Decision: Choose the Technical Architecture

Status: resolved
Blocked by: —

## Question

Which framework, rendering approach, asset strategy, and interaction architecture best balance distinctiveness, accessibility, performance, and maintainability?

## Decision

Adopt a **static-first Astro 7.4.13 multipage site** with React 19.3.1 limited to the Chronos Trace Inspector island.

- Real static routes for Home, Work, five case studies, three archive entries, About, `/resume/`, and 404.
- Typed, validated local content; no CMS, SSR adapter, API, database, or client router.
- Native HTML/CSS/SVG baseline; no WebGL, smooth-scroll library, custom cursor, animation framework, chart library, or third-party runtime script.
- Self-hosted subset fonts; original SVG diagrams; deterministic local visualization data.
- React island hydrates only when visible; pure TypeScript simulation helpers are independently tested.
- No-JS and island-failure states preserve all evidence, navigation, résumé, and contact paths.
- TypeScript 6.0.3, Vitest 5.1.2, Playwright 1.65.1, and accessibility automation gate release.

## Acceptance criteria

See [Engineering Architecture Review 04](../council-reviews/04-engineering-architecture.md). Initial budgets include ≤125 KB gzip JavaScript on any route, ≤30 KB CSS, ≤60 KB fonts, ≤350 KB compressed initial mobile transfer, WCAG 2.2 AA, complete reduced-motion behavior, and clean static output.
