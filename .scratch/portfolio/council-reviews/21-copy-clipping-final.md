# Copy and clipping final council review

**Verdict: PASS.** No Blocker or Major finding remains.

## Scope

Current `main` working tree: project-card clipping, plain-language copy pass, case-study structure, and the dithering research report.

## Findings resolved

- **Clipping root cause:** the stage forced the figure and SVG to fill the same height, pushing captions below the card’s `overflow: hidden` boundary. Automatic figure sizing, `min-height: 0`, and single-column `align-self: start` now let SVG plus caption determine stage height.
- **Copy tone:** challenge-style headings, recruiter framing, “guardrail” language, and source/evidence calls to action were replaced with platter project notes and first-person observations. Technical facts, credit, simulation/measurement distinctions, and limits remain.
- **Creative council correction:** the HPC card now says the project did not add a router, avoiding an unsupported personal attribution in team research.
- **Accessibility/engineering minors:** the duplicate case-study summary was removed while credit notes moved into the case hero; the clipping regression now checks both 100% and 200% text.
- **Sketch language:** TraceInspector labels now match the “signal sketch” framing, while the visible simulation label still states that it is not hardware-measured.

## Evidence

- The pre-fix browser audit found clipped caption/evidence text on Home and Work at 320, 390, 768, and 1440 px. Post-fix audits found no clipped text across all content routes at 100% and 200% text.
- Fresh 390 px and 1440 px captures of Home, Work, About, and project cards showed complete captions and no page-level overflow.
- Final `npm run verify` passed: formatting, Astro diagnostics with 0 errors/warnings/hints, 46 unit tests, 13 static pages, budgets, HTML validation, and 96 Playwright tests across Chromium, Firefox, and WebKit with 6 expected skips.
- Independent creative re-review returned PASS with no remaining findings. Independent engineering/accessibility review returned PASS with no FATAL/MAJOR findings; both minors were fixed and re-verified.
