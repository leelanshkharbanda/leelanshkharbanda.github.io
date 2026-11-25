# Council Review 02: Creative Direction

Evidence snapshot: 2026-11-25  
Recommendation: **Select “Evidence Bench” for design development.**  
Scope: creative direction only; no application code or project claims changed.

## Decision

Build the portfolio as an **inspectable engineering proof sheet**, not as a dark 3D showroom and not as a conventional project-card grid. Warm paper, carbon ink, one signal-red accent, and one trace-teal accent create a technical editorial system. Every recurring visual device must connect a claim to an artifact, a model, a test, or a stated limit.

**Positioning line**

> I build inspectable systems across software and hardware—from wireless signal paths and computer architecture to local-first tools.

This is specific enough to cover the verified inventory without implying that every project is physical hardware. It also makes explanation part of the engineering identity rather than a marketing add-on.

## Evidence and constraints

- `GLOSSARY.md` makes **Project Evidence**, **Engineering Narrative**, **Signal Path**, and **Portfolio Signal** the governing language. The visual system should therefore expose relationships and evidence states, not merely decorate technical subject matter.
- `outputs/github-evidence.md` identifies Chronos-DSP and Modulation-Studio as strong signal-path narratives, with MoE-Memory-Wall, Life OS, HPC_Boost, and the RV32I-subset work providing complementary systems evidence. Verified public résumé facts supply team sizes and coordination labels. Team/coursework roles, simulated versus measured outcomes, and original-work boundaries must remain visible.
- The same evidence says repository screenshots are not cleared for reuse and third-party media rights are unconfirmed. New diagrams and recorded, source-linked data are safer than borrowed project imagery.
- `outputs/technical-portfolio-research-editorial.md` supports a mission-led front door, project entries structured as arguments, diagrams with a route back to the real system, and interaction that reveals state rather than merely delights.
- `outputs/technical-portfolio-research-implementation.md` favors semantic HTML, native scrolling, one compact SVG/Canvas 2D idea, and short transitions. Its three inspected creative portfolios all lacked an OS-level reduced-motion path; that is a gap to avoid, not a pattern to reproduce.
- `outputs/technical-portfolio-research-quality.md` sets WCAG 2.2 AA as the floor and a complete reduced-motion state as a product requirement. Static content, equivalent text, keyboard controls, mobile reflow, and performance gates are creative constraints.
- `.scratch/portfolio/council.md` requires a recommendation with evidence, tradeoffs, and acceptance criteria. Accessibility, factual accuracy, and working functionality override visual preference.

## Three distinct directions

### A. Evidence Bench — selected

**Visual thesis:** an engineer’s proof sheet: warm uncoated-paper ground, carbon-black structure, signal-red selections, trace-teal data paths, precise annotations, and unequal editorial modules. The identity comes from indexed evidence and inspectable relationships, not from “tech” texture.

- **Type:** expressive grotesk display, highly readable sans body, monospaced utility labels.
- **Layout:** wide 12-column desk; a narrow evidence rail; one lead case and smaller supporting cases; diagrams adjacent to the claims they explain.
- **Signature:** a user-controlled **Trace Inspector** that moves from ray geometry to channel impairment to received IQ/constellation/BER.
- **Best fit:** the whole inventory. It can make signals, memory systems, compilers, telemetry, and local-first software legible without pretending they share one literal circuit aesthetic.
- **Tradeoff:** less immediately spectacular than a 3D world. It earns distinctiveness through composition, annotation, and behavior; the diagrams must be genuinely good.
- **Decision:** select.

### B. Systems Atlas — rejected as the primary identity

**Visual thesis:** a cool architectural atlas of stacked planes, orthographic modules, coordinate labels, and exploded system views. Ice-white ground, graphite, cobalt, and a sharp lime status color. Geometric sans typography and diagram-first, edge-aligned compositions.

- **Signature:** an accessible “exploded stack” that separates application, runtime, memory, and hardware layers.
- **Best fit:** MoE-Memory-Wall, the assembler/simulator, Life OS, and HPC_Boost.
- **Risk:** weaker for signal phenomena and impairment; encourages speculative 3D or pseudo-hardware imagery; resembles spatial creative-developer portfolios already represented in the implementation research.
- **Decision:** reject as the site-wide direction. Borrow compact, accurate system diagrams inside Evidence Bench where they explain a project.

### C. Workshop Ledger — rejected as the primary identity

**Visual thesis:** a dated maker’s decision log. Deep forest green, cream, oxblood, and marigold; large literary serif headlines; book-like single-column reading; numbered notes, margin annotations, test cards, and original sketches.

- **Signature:** “decision flip” annotations that move between constraint, trade-off, test evidence, and unresolved risk.
- **Best fit:** hardware decision logs, HPC_Boost’s negative finding, and candid process writing.
- **Risk:** reads as a personal notebook or design studio before it reads as a software/hardware engineering portfolio; less natural for live tools and data-heavy explanations.
- **Decision:** reject as the primary identity. Borrow its dated decision-log candor for case-study constraints and limits.

## Selected system: Evidence Bench

### Personality and voice

Precise, curious, candid, and quietly playful. The persona is an engineer who can explain the mechanism and show the evidence—not a showman, futurist, or growth marketer.

- Lead with the question, then the constraint, mechanism, artifact, result type, and limit.
- Use plain language before terminology; define terms at first use.
- Be confident about verified work and explicit about uncertainty, team credit, and prototypes.
- Let humor appear in an annotation or example, never in a claim.
- Avoid “innovative,” “seamless,” “blazing-fast,” “production-ready,” and similar unsupported promotional language.

### Color system

| Token | Value | Role |
|---|---|---|
| Paper | `#F4F1EA` | Primary reading ground |
| Ink | `#171917` | Primary text and dark evidence panels |
| Secondary | `#555A55` | Secondary text on paper |
| Dark secondary | `#AFB4AC` | Secondary text on ink |
| Rule | `#85887F` | Essential dividers and diagram strokes on paper |
| Signal | `#C33B1B` | Selection, action, current stage, evidence marker |
| Trace | `#116C73` | Model paths and data-series distinction |
| Dark signal | `#FF805E` | Signal role on ink |
| Dark trace | `#75D6D2` | Trace role on ink |

Calculated token contrast: ink/paper **15.67:1**, secondary/paper **6.25:1**, dark secondary/ink **8.37:1**, signal/paper **4.70:1**, trace/paper **5.45:1**, rule/paper **3.20:1**. Re-test actual rendered states, fonts, overlays, and forced-colors behavior before release.

Rules:

- Signal means “selected/action”; trace means “model/data.” Pair both with labels, shapes, or line patterns so color is never the only distinction.
- Use dark panels for a diagram or evidence moment, not as a full-site neon wrapper.
- No glassmorphism, glow, faux circuit-board texture, terminal-window cliché, or decorative full-page grid.
- Focus uses a dual-color treatment so it remains visible on paper and ink.

### Type system

- **Display:** Bricolage Grotesque, semibold/bold, tight but not compressed. Fluid scale approximately `clamp(2.75rem, 7vw, 6.5rem)` for the hero; shorter project headings use a smaller step.
- **Body:** Source Sans 3, regular/semibold, approximately 18px/1.6 on desktop and 17px/1.6 on mobile.
- **Utility:** IBM Plex Mono, medium, approximately 12–13px/1.4 for evidence IDs, parameters, units, status, and source labels. Uppercase is limited to short labels, never paragraphs.
- **Measure:** 58–72 characters for long-form text; left/start aligned; no justified copy.
- **Delivery:** self-hosted, subset WOFF2 with robust fallbacks; total initial web fonts targeted at no more than 60KB compressed. Do not animate individual letters or mask essential headings.

### Layout and Portfolio Signal

- Use a maximum content width around 1240–1440px on a 12-column grid, with generous outer margins and 24–32px gutters. Collapse by content need rather than forcing tablet content into miniature desktop columns.
- **Home hero:** positioning line and a short plain-language introduction on the left; an immediate static Trace Inspector poster on the right. On mobile, text comes first and the visual follows.
- **Selected work:** three proof projects in unequal modules—one lead case plus two supporting cases—not a uniform wall of thumbnails. Each module carries the question, artifact type, role/team status—including verified team size—evidence status, and a direct source/live-artifact route.
- **Case study:** problem → constraints → mechanism → inspectable artifact → result and result type → limits → sources/credit. A desktop-only sticky evidence rail may aid orientation; it must never obscure focus.
- **Recurring signal:** the **datum mark**, a small bracket plus an ID such as `C-02`. The same ID appears beside a claim, in its diagram, and beside the supporting source/test/release. This is the Portfolio Signal: a visible route from statement to evidence.
- Project and section navigation uses real URLs. No evidence is available only through hover, a modal, or an animated transition.

### Signature interaction: Trace Inspector

Place the full interaction in the Chronos-DSP case study, with a compact static or simplified instance eligible for the homepage.

1. The visitor chooses a verified channel preset: direct path, one reflected path, or dense multipath. Use the repository’s actual model controls; if a named preset is unsupported, replace it with a source-verified equivalent and document the substitution.
2. Native **Previous / Next** stage buttons move through **source → channel model → receiver → output**. A single optional range control may adjust one documented model parameter; it is never the only control.
3. The active stage is highlighted in the SVG path. The adjacent annotation explains what changed and links to the corresponding datum/source.
4. Received IQ, constellation, and BER update from deterministic recorded data or a bounded browser calculation. Numeric results update immediately; old/new traces may crossfade briefly but must not morph into a misleading shape.
5. A persistent label reads **“Simulation · geometric channel model · not hardware-measured.”** Reset returns to the documented default.
6. The interaction is user-initiated. It does not require scrolling through a pinned scene, dragging, or waiting for an intro.

The static first state includes the complete path, a readable constellation, the key result, the simulation label, and a text/table equivalent. The source and explanation remain useful with JavaScript disabled.

### Motion grammar

The grammar is **reveal → relate → confirm**.

| Motion | Specification |
|---|---|
| Reveal | One-time 220–320ms opacity plus 8–12px upward translation; at most a three-item stagger at 40–60ms |
| Relate | 160–220ms stroke/opacity change for the active signal-path stage; data values change immediately |
| Confirm | 100–160ms treatment for updated status text; meaningful changes use a restrained live region |
| Hover/focus | 100–160ms color, underline, or 2px arrow movement; no card scaling or magnetic controls |
| Route change | Optional short opacity transition where supported; direct navigation remains immediate and functional |
| Ambient motion | None by default; no autoplay trace, parallax, marquee, custom smooth scroll, pinning, or full-screen wipes |

Use native scrolling. If animation requires a frame loop, run it only while the interaction is active and visible; stop it on exit, pause, page hiding, or reduced motion. Keep normal pointer behavior and visible keyboard focus.

### Mobile behavior

- At 320 CSS px and above, all narrative, headings, controls, and source links reflow without page-level two-dimensional scrolling.
- The Trace Inspector becomes a vertical sequence: stage buttons, path diagram, annotation, then plots/table. No rotate prompt and no desktop-only evidence.
- Primary touch targets are at least 44×44 CSS px with adequate separation. Presets and stage controls work by tap; the slider has native keyboard behavior and tap/button alternatives.
- Do not depend on hover. Keep ordinary `touch-action` so browser pan and zoom remain available.
- Use SVG for the baseline visual. If Canvas 2D becomes necessary, cap DPR at 1.5 on mobile and preserve the static SVG/text fallback. WebGL is not part of this direction.
- Avoid sticky panels on narrow screens unless they demonstrably help and leave both the focused control and its indicator fully visible.

### Reduced-motion behavior

- Honor `prefers-reduced-motion: reduce` before initializing animation and observe live changes.
- In reduced mode: no spatial reveals, path-drawing animation, trace crossfade, parallax, smooth scrolling, magnetic movement, or continuous loops. Stage changes and data updates occur immediately.
- The static diagram, all preset information, source links, and text/table equivalent remain fully available.
- Provide a visible session-level motion control. It defaults to the OS preference; explicit opt-in may enable the bounded Trace Inspector animation but never restores global decorative motion, and a later OS change back to reduce wins.
- Content visibility, focus, navigation, and interaction completion never depend on `animationend` or transition completion.
- Avoid flashing, strobing, glitch effects, and rapid luminance pulses.

## Concrete acceptance criteria

| ID | Acceptance criterion | Verification |
|---|---|---|
| CD-01 | The first viewport communicates software **and** hardware engineering, names the kind of work, and offers a clear route into project evidence. | In a five-person first-read check, at least four correctly identify both domains and one project mechanism without prompting. |
| CD-02 | Every featured project visibly states role/team status and evidence status where relevant; simulation is never presented as hardware measurement. | Content checklist against `GLOSSARY.md` and `outputs/github-evidence.md`; no forks or unsupported performance claims. |
| CD-03 | The delivered palette, typography, composition, and interaction are independently authored. No reference-site code, screenshots, illustrations, copy, branding, or recognizable hero composition is reused. | Asset/source provenance review plus side-by-side comparison at desktop and mobile widths. |
| CD-04 | Text meets 4.5:1 contrast, or 3:1 only when genuinely large; essential graphics, control boundaries, and focus meet 3:1. | Token tests and manual checks for default, hover, focus, selected, dark-panel, and forced-colors states. |
| CD-05 | Body text remains readable at 200% text/zoom and with prescribed text-spacing overrides; long-form measure stays under roughly 80 characters. | Browser zoom, text-only zoom, spacing override, and clipping inspection. |
| CD-06 | Trace Inspector stages and presets work with Tab, Shift+Tab, Enter, Space, and arrows as appropriate; focus is visible, logical, and unobscured. | Keyboard-only task pass and accessibility-tree inspection. |
| CD-07 | Every Trace Inspector insight has a static SVG and adjacent text/table equivalent; the simulation label and source links remain visible in all states. | Compare all stages against the text equivalent; test JavaScript disabled and a failed visualization module. |
| CD-08 | At 320 CSS px, the page has no two-axis reading scroll, no rotate gate, no hover-only action, and primary controls are at least 44×44 CSS px. | Real iOS Safari and Android Chrome checks plus narrow desktop reflow test. |
| CD-09 | With OS reduced motion enabled, no animation or frame loop starts; all stages work immediately. Changing the OS setting while open updates behavior without reload. | Emulation plus real OS-setting test, including toggle behavior and hidden/offscreen lifecycle. |
| CD-10 | Motion stays within the specified durations and properties. There is no scroll hijacking, pinning, parallax, autoplay loop, or motion-only information. | Code review and full-page interaction pass at desktop/mobile widths. |
| CD-11 | Initial targets remain within the research budgets: roughly ≤125KB gzip JavaScript, ≤30KB CSS, ≤60KB fonts, ≤350KB compressed mobile homepage transfer, and no blocking third-party script. | Build/resource report and throttled network audit. |
| CD-12 | Representative routes meet LCP ≤2.5s, INP ≤200ms, and CLS ≤0.1 at p75, segmented by mobile/desktop; the static hero is discoverable in initial HTML. | Field data when available, with lab LCP/CLS/TBT as regression evidence—not a fabricated lab INP. |

## Award-directory stream: provisional flag

The award-directory stream was still running at this evidence snapshot, and no award-directory output was present in `outputs/`. The existing implementation evidence verifies only Dennis Snellenberg’s official Awwwards Site of the Day record and Developer Award; attempts to locate award profiles for Bruno Simon and Robin Payot returned 404, so no award claim is made for them.

The pending stream may:

- add award-winning references and change the distinctiveness benchmark;
- reveal that a palette, layout trope, or interaction is overused;
- correct or expand the verified award list;
- strengthen the case for restraint—or for one more memorable, bounded interaction.

When it completes, repeat the derivative-risk comparison and review the selected type, palette, hero composition, and Trace Inspector against the new set. Adjust those layers if overlap is high. Do **not** relax evidence, accessibility, mobile, or reduced-motion requirements, and do not add award badges or affiliation language without an official record.

## Council disposition

**Approve Evidence Bench for design development, with final award differentiation held provisional until the directory stream completes.** The direction is distinctive through evidence indexing, editorial composition, and an inspectable signal-path interaction—not through borrowed spectacle. Its primary tradeoff is lower immediate spectacle in exchange for stronger comprehension, accessibility, resilience, and factual credibility.
