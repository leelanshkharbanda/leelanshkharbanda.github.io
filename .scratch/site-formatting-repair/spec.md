# Site-wide formatting repair

## Request

Fix the broken project diagrams and minor formatting defects across the portfolio, recheck the whole site, and submit every change through the review council before committing.

## Confirmed scope

- Restore readable project diagrams in narrow card and case-study containers without shrinking fixed SVG labels below their intended size.
- Repair all six project schematics: clipped waveform, detached arrowheads, floating feeds, crowded panel copy, and text outside the Life OS boundary.
- Repair the interactive signal sketch and TraceInspector connector/layout details.
- Remove obsolete spacing, restore active/divider styling, fix mobile heading and next-project word breaks, align the 404 actions and header-height calculation, and normalize résumé screen/print typography.
- Keep the dithering-led visual direction, plain project voice, evidence labels, and static-first behavior.
- Add regression coverage for SVG containment, connector attachment, responsive diagram scrolling, word wrapping, and the corrected shared formatting.

## Out of scope

- Rewriting project narratives or changing evidence claims.
- Redesigning the site, adding projects, or changing hosting.
- Pushing or deploying.

## Acceptance criteria

- Every SVG text label stays inside its viewBox and intended panel with usable padding.
- Every arrow that targets a node terminates at that node; feeds do not begin in empty space.
- Project diagrams retain readable intrinsic geometry and scroll horizontally when their container is narrower.
- All routes pass overflow, clipping, word-break, keyboard, and accessibility checks at mobile, tablet, breakpoint-boundary, desktop, and wide sizes.
- Fresh 390 px and 1440 px screenshots are captured and reviewed for every route, with focused captures for diagrams and interactions.
- `npm run verify` passes.
- Creative, engineering, accessibility/product, content, and release council reviewers approve the final diff and evidence before a commit is created.

## Review routing

Unresolved choices go to `.scratch/portfolio/council.md`. Record the final review in `.scratch/portfolio/council-reviews/26-site-formatting-repair.md`.
