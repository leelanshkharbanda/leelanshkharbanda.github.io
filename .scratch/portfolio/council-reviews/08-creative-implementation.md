# Council Review 08: Creative Implementation

**Verdict: Not release-ready.**

Evidence basis: implementation plus fresh Chromium recaptures at 1440×1000 and 390×844; the five named screenshots were absent and were recaptured. Paths below are relative to `/Users/leelanshkharbanda/portfolio_final`.

## Blocker

- **The Work index is an accidental micro-card wall, not the approved folio sequence.** `src/pages/work/index.astro:38-46` puts the lead and standard entries in `.project-list`; `src/styles/global.css:522-524` gives every lead `grid-column: span 12`, while `.project-list` has no explicit columns (`1050-1052`). Chromium consequently creates four 313 px standard columns at 1440 px, each 2345 px tall; at 320 px it creates four 70 px columns and a 400 px document. See `test-results/work-desktop.png`. **Smallest fix:** scope the 12-column span to `.project-grid .project-card--lead` (or override it to `auto` inside `.project-list`) and give `.project-list` one `minmax(0, 1fr)` track. Extend the 320 px test in `tests/e2e/portfolio.spec.ts:55-65` to `/work/`.

- **Chronos forces page-level horizontal scrolling.** `.case-body` uses an implicit auto grid track (`src/styles/global.css:1262-1266`), which inherits the evidence table’s 760 px minimum (`1684-1689`); `.table-scroll` cannot shrink its parent. Measured document widths are 782 px at 320/390 px and 793 px at 768 px. **Smallest fix:** set `.case-body { grid-template-columns: minmax(0, 1fr); }` and `min-width: 0` on its direct children, leaving horizontal scrolling only inside `.table-scroll`. Add Chronos to the 320 px reflow test.

## Major

- **The hero restores the rejected split silhouette and misses the two-line display cap.** `src/pages/index.astro:20-52` and `src/styles/global.css:414-421,427-429` place identity left and the proof strip right; `test-results/home-desktop.png` shows a five-line headline. Council Review 06:33 requires identity/positioning above the three-datum strip and specifically rejects this derivative-risk composition. **Smallest fix:** stack the hero into one column, place a three-column proof strip below it, and widen/tune the headline measure to two desktop lines without reducing mobile readability.

- **Datum indexing is decorative rather than a claim-to-source route.** `src/components/ProjectCard.astro:15,23-24` hides `P-xx` from assistive technology; the hero’s `D-01`–`D-03` labels in `src/pages/index.astro:35-51` never recur; the evidence ledger in `src/pages/work/[...slug].astro:127-160` has no datum beside either claims or sources. This removes the approved system’s primary differentiator. **Smallest fix:** add stable result IDs rendered in both claim and Source cells, repeat them in the adjacent diagram/caption, and carry the visible project `P-xx` into the case header.

- **Evidence diagrams become microscopic once mobile reflow is corrected.** `src/components/ProjectVisual.astro:55-62` uses a 960-unit viewBox with 10–15 px labels (`src/styles/global.css:690-708`): at 390 px the scale is 0.36, making microcopy about 3.6 px; at 320 px it is about 2.9 px. The Trace Inspector’s 720-unit SVG and 10 px labels (`src/components/react/TraceInspector.tsx:189-197`; `global.css:1643-1647`) collapse similarly, while `global.css:2134-2144` keeps its stage ledger in a 2×2 grid instead of the approved vertical sequence. **Smallest fix:** make mobile stage rows full-width; move redundant SVG micro-annotations into adjacent HTML and enlarge remaining labels to at least 10 px effective size.

- **Teal has lost its data-only meaning.** It colors rights/evidence captions (`src/styles/global.css:669-675`), theme numbering (`892-911`), the footer email (`996`), principle numbering (`1132-1155`), leadership (`1198`), and the evidence-ledger rule (`1672`). Council Review 06:30 reserves trace teal for data paths/series. **Smallest fix:** use signal red, ink, or neutral rules for sectional/index accents and links; retain trace/dark-trace only on actual paths, points, and data series.

## Minor

- **Mobile identity is needlessly truncated.** `test-results/home-mobile.png` shows “Leelansh Kh...” at 390 px because of `src/styles/global.css:2081-2086`. **Smallest fix:** remove the 7 rem cap above 360 px; reserve ellipsis for the narrowest widths.

- **Résumé project questions exceed the reading measure.** `test-results/resume-desktop.png` shows the Chronos question as one roughly 110-character line; `src/styles/global.css:1849-1853` sets no maximum width. **Smallest fix:** add `max-width: 68ch` to `.resume-project > p`.
