# Council Review 13: Creative Re-review

**Verdict: Not release-ready — 1 Major, 1 Minor.**

Evidence basis: current implementation plus fresh Chromium captures at 1440×1000 and 390×844. The five named `*-v2.png` files were absent, so they were recaptured from the current built site into `test-results/`; targeted diagram and résumé captures were also inspected. No code was modified.

## Resolution check

- **Work folio — resolved.** `.project-list` now has one `minmax(0, 1fr)` track and every card spans it. The lead reads as a full-width proof sheet; standard entries are ruled two-column folio rows on desktop and single-column rows on mobile. The accidental micro-card wall is gone.
- **Case reflow — resolved.** `.case-body` explicitly uses `minmax(0, 1fr)` and its children can shrink. Chronos measures 390 px document width at a 390 px viewport; the 760 px evidence table scrolls only inside `.table-scroll`.
- **Stacked hero — partially resolved.** Identity/positioning now sit above the three-datum strip, and the rejected split silhouette is removed. The desktop two-line display cap is still missed.
- **Datum/evidence IDs — resolved.** `P-xx` is visible and assistive-technology-readable on cards and repeated in case headers. Stable `E-xx` IDs appear in both claim and Source cells and are repeated in the adjacent diagram caption.
- **Mobile diagram strategy — resolved.** At ≤640 px, diagrams retain native 960/640 px SVG width inside local horizontal scrollers instead of shrinking 10 px labels to roughly 3 px. Trace stage rows and the stage summary become vertical, and page-level reflow remains intact.
- **Teal semantics — substantially resolved, with one residual leak.** Section accents, captions, footer, principles, leadership, and ledger rules no longer use teal; remaining path, point, cache, and state uses read as data.
- **Identity — resolved.** The full name is visible at 390 px; only the narrowest widths hide it while retaining the `LK` mark.
- **Résumé measure — resolved.** Project paragraphs are capped at `68ch`; the Chronos question now wraps to two lines in the fresh desktop capture.

## Major

- **Desktop hero still renders three lines, not the approved two.** `test-results/home-desktop-v2.png` shows “I build inspectable” / “systems.” / “Software ↔ hardware.” `src/pages/index.astro:21-24` supplies two spans, but `src/styles/global.css:434-445` constrains the identity to `62rem` and the heading to `22ch`, forcing the first sentence to wrap. **Smallest fix:** widen the desktop identity/heading measure and/or reduce the desktop maximum type size until the first sentence occupies one line and the tail occupies the second; preserve the current readable mobile wrapping.

## Minor

- **One non-data link still uses trace teal.** `.trace-inspector__source-link` is `var(--dark-trace)` at `src/styles/global.css:1606-1608`, although council reserves teal for data paths/series. **Smallest fix:** use dark signal or paper with an underline for this repository link; retain teal for actual data-state and visual-series elements.
