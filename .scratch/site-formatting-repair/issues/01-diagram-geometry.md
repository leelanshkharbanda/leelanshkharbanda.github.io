# Repair project and interactive diagram geometry

Status: ready-for-agent

## Acceptance criteria

- Fix Life OS optional-network text containment and all detached marker endpoints.
- Attach Chronos stage feeds to the scene panel and stage nodes; keep the waveform inside the viewBox.
- Give long Chronos/HPC panel copy adequate padding.
- Keep the mobile preview SVG override from cancelling intrinsic diagram width; use readable scrolling at every narrow container size.
- Fix TraceInspector arrow gaps and SignalToy no-JS handle placement/mobile label readability.
- Add browser regression tests for text containment, connector gaps, and readable scrollers.

## Evidence

- `src/components/ProjectVisual.astro`
- `src/components/SignalToy.astro`
- `src/components/react/TraceInspector.tsx`
- `src/styles/global.css`
- `src/styles/playground.css`
- Baseline screenshots and geometry measurements under `/tmp/portfolio-formatting-audit-before/`.

## Comments

- Completed: all six schematics, TraceInspector, SignalToy, responsive scrollers, no-JS transcripts, and exact connector regressions are implemented and verified.
- Final council approval: `.scratch/portfolio/council-reviews/26-site-formatting-repair.md`.
