# Release accessibility review

**Verdict: HOLD — one Serious finding; no Critical findings.**

Basis: current `main` working tree at `c6b9360`, both requested E2E specs, release source, and fresh Chromium checks. Pre-existing source edits were left untouched. The named `test-results/final-*.png` files were absent, so the six home/work/about desktop and mobile views were recaptured at 1440×1000 and 390×844 and reviewed. No visual clipping or mobile title-order regression appeared.

## Serious — scrollable visuals lack keyboard access

At 320 CSS px, `src/styles/global.css:2227-2238` makes `.project-visual__root` and `.trace-inspector__figure` horizontally scrollable. Their containers have `tabIndex = -1`, no accessible name, and no focusable descendants, so keyboard-only users cannot reach offscreen diagram content.

Axe reports **`scrollable-region-focusable` (Serious)** on `/`, `/work/`, and the Chronos-DSP, Life OS, Modulation Studio, HPC-Boost, MoE Memory Wall, and RISC-V case routes at both 100% and 200% text. At 100%, actual overflow is present on all six case routes: project visuals measure 960 px content in 278 px, and the Trace figure 672 px in 228 px. Home/work previews measure no overflow at 100% but still trigger axe because `overflow-x: auto` is declared; at 200% they also overflow by 7–31 px. Desktop scans are clean.

Cause: `src/components/ProjectVisual.astro:95-118` and `src/components/react/TraceInspector.tsx:188-199` render non-focusable figures/SVGs. The existing axe test (`tests/e2e/portfolio.spec.ts:329-349`) scans only default desktop widths, so it misses this.

**Smallest fix:** make each actual scroller focusable (`tabindex="0"`) with an accessible name and visible focus, or reflow the SVG without horizontal scrolling; remove unnecessary `overflow-x: auto` from non-scrolling previews. Add 320 px/200% axe coverage plus Tab and horizontal-scroll assertions. Browser-only injection of focusable named regions cleared the Serious result across all 16 affected route/text-size scans.

## Confirmed passes

- **Keyboard:** skip link focuses main; mobile Menu opens by keyboard; SignalToy supports arrows/Home/End, synchronized native ranges, and reset; disclosures and Trace controls work with Enter and expose one live status.
- **Touch:** Chromium touch emulation dragged the transmitter from 104 to 189, synchronized its range, and reset correctly. Measured toy controls were at least 27 px high.
- **Reduced motion:** OS and live preference changes remove smooth scrolling, animation, transitions, tilt, and cursor; manual reduction is reversible and persists.
- **Reflow:** all 12 routes remained 320 px at default, 200% text, WCAG spacing, and combined stress; no offscreen controls or horizontal page scroll. The 200% open menu stayed within x=68.8–308.8.
- **Facts/routes:** three home projects and the 5+3 work model remain visible with status, credit, evidence class, questions, summaries, guardrails, and actions. All eight cases expose four facts, evidence rows, and boundary conditions. `mailto:`, `/#contact`, `/resume/`, five résumé projects, keyboard print, and core no-JS content pass.
- **Automated:** no Serious/Critical desktop violations; About, résumé, University ERP, and Tasveer remain clean at 320 px/200%.

Limits: Chromium emulation and axe do not replace real iOS/Android, screen-reader, or full WCAG testing.
