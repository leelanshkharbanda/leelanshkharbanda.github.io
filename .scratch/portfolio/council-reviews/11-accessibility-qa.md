# Accessibility and Release Review

**Verdict: HOLD — one Blocker and two Major findings.** The static content and core enhancements are strong, but the build fails the council’s 320 px reflow, text-resize/spacing, and forced-colors gates. No application code was changed.

## Basis and method

Compared the built site with `outputs/technical-portfolio-research-quality.md` (AC-K, AC-M, AC-G, AC-T, AC-B) and the resolved council decisions. Reviewed source and existing Playwright coverage, then ran targeted Chromium checks across all 13 built routes. The existing suite’s last run passed; its recorded 55 passes/2 clipboard-permission skips were not rerun. Proposed CSS fixes were injected only in the browser and rechecked across all routes.

## Verified findings

### Blocker — Work and case-study grids break reflow

**Reproduce:** At 320×720, `/work/` has `document.documentElement.scrollWidth = 400`; all eight `/work/<project>/` routes, including Chronos-DSP, expand to **782 px**. Narrative, diagrams, and controls require page-level horizontal scrolling. At 1280 px, the four standard work cards are also compressed into narrow side-by-side columns instead of full-width evidence rows.

**Cause:** `.project-list` cards lack full-row placement; `.case-body` uses an implicit auto track whose minimum is the 760 px evidence table, expanding every sibling. See `src/styles/global.css` (`project-list`, `case-body`, `table-scroll`).

**Smallest fix:** Give `.project-list .project-card` `grid-column: 1 / -1`; set `.case-body { grid-template-columns: minmax(0, 1fr) }` and `min-width: 0` on its children. Keep the table’s existing bounded horizontal scroller. Injected together, these restored 320 px reflow on every route.

### Major — Text resize and spacing still overflow

**Reproduce:** At 320 px with settled root text at 200%, home reaches **577 px** and the Menu moves offscreen; `/work/` reaches **1328 px** at 1280 px. The mobile identity is clipped even at default size (`112 px` visible versus `167 px` text). Applying WCAG text spacing (1.5 line-height, 2× paragraph spacing, 0.12em letter/0.16em word spacing) makes home **363 px** wide; the Life OS heading overflows. This fails AC-T3/T5 and the council requirement that headings grow and wrap.

**Smallest fix:** At ≤1100 px, make `.project-grid` one `minmax(0,1fr)` column and reset card placement to `auto`; otherwise 11 enlarged grid gaps recreate the overflow. Add inherited `overflow-wrap: anywhere` for long words, and replace the mobile identity ellipsis with a hidden name or wrapping header. The combined injection passed base, 200% text, and spacing checks on all 13 routes. Other representative routes passed 200% text/spacing at 1280 px.

### Major — Forced-colors mode loses SVG annotation contrast

**Reproduce:** Enable forced colors and open `/work/chronos-dsp/`. SVG surfaces become white while hard-coded dark panels and authored fills remain. Grey microcopy/plot captions such as `.trace-inspector__plot-caption` sit on white at **2.11:1**; paper-coloured annotations outside panels reach **1.13:1**, below 4.5:1. Project diagrams have the same mixed-surface problem. HTML alternatives remain available, but visual evidence is materially degraded (AC-B4/AC-T1).

**Smallest fix:** In `src/styles/global.css`’s forced-colors block, either remap every SVG fill/stroke to `Canvas`/`CanvasText`/`Highlight`, or remove the Canvas recolouring and set `forced-color-adjust: none` on `.project-visual__root` and `.trace-inspector__root`. The latter restored the already-tested dark palette (8.37:1 and 15.67:1 for the cited colours).

### Minor — 404 canonical does not match the requested URL

Unknown paths correctly return HTTP 404, `noindex`, one H1, and recovery links, but canonical and `og:url` point to `/404/`, not the requested path. Omit canonical/social URL for `noindex` or canonicalize to the site root.

## Verified passes

- **Semantics/native controls:** One H1/main per route, `lang="en"`, no heading jumps, duplicate IDs, broken ARIA references, or positive tabindex. All 15 role-image SVGs have titles/descriptions; navigation uses native links/`details`, and Trace uses native buttons, group semantics, and a focusable table scroller.
- **Keyboard/motion:** Skip link is first and focuses main; focus outlines are visible. Trace Previous/Next/Reset work with Enter/Space, retain focus, and expose one `aria-current="step"`. OS reduced-motion changes apply live; the manual toggle persists. No autoplay or focus trap was observed.
- **Resilience/status:** No-JS home, Chronos, and résumé preserve content, contact, static SVGs, and Trace’s text equivalent. Clipboard-unavailable fallback announces guidance and retains the visible `mailto:`. Trace updates a pre-existing polite, atomic status once per action.
- **Metadata/404:** Twelve indexable routes have unique titles/descriptions and matching canonicals/OG values; sitemap has 12 URLs. OG PNG is 1200×630 and returns 200.
- **Résumé print:** A4 and Letter each render one readable page with no observed clipping; navigation/actions are hidden. Generated test PDFs are untagged and unpublished; the HTML résumé remains the accessible deliverable.

## Explicit limits

No NVDA, VoiceOver, or TalkBack sessions; no real iOS/Android, Edge, touch-only, orientation, safe-area, bfcache, or OS-level motion testing. DOM live-region checks do not prove spoken announcement quality. Automated results cannot establish WCAG conformance. Add regressions for every route at 320 px, 200% text, spacing, and forced colors before release.
