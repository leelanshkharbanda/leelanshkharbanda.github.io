# BRIEF — Variant C: KINETIC ATLAS

## Direction
A self-contained, cinematic scroll essay about signals and machines. The page is
structured as six numbered chapters with deliberate dark/light alternation:
hero (dark) → three case datasheets (light) → four-item index (dark) → thinking
(light) → about (dark) → contact (light) → footer (dark).

## Design decisions
- **One motif, evolving.** A single original impulse-response path lives in an
  inline SVG `<symbol>` and is reused via `<use>` in every chapter. CSS scales,
  tilts and flattens the same path at each appearance: hero (full jump),
  datasheets (compressed / stretched / stepped), index (four low marks). Nothing
  is copied from a reference artwork or brand mark.
- **One tiny canvas.** A fixed, `aria-hidden` canvas draws a dark field plus a
  deterministic low-alpha trace and a scroll playhead. It is IntersectionObserver
  gated, honours `prefers-reduced-motion`, and caps DPR at 2. Without it the dark
  chapters still read against the page background.
- **Kinetic type.** Oversized `clamp()` display sizes with tight tracking, one
  serif italic exception, and a 14px mono instrument layer. No web fonts.
- **Scroll-linked motion is enhancement only.** Reveal and progress animations sit
  inside `@media (prefers-reduced-motion: no-preference)` + `@supports
  (animation-timeline: view())`. Base opacity is 1; no loader veil, no gate on JS.
- **Accessibility.** One `h1`, skip link, named landmarks, `aria-labelledby`
  sections, 44px nav/CTA/contact targets, 16px+ body, 14px+ mono, visible focus,
  `role="img"` + `aria-label` on meaningful traces, `aria-hidden` on decoratives,
  forced-colors overrides, and no horizontal overflow at 320px.

## Fact discipline
Chronos-DSP is explicitly a simulator (QPSK/AWGN/BER; LoS, image-source,
knife-edge) with an Elixir/Phoenix control plane and Rust NIF data plane.
Modulation Studio is a browser visualizer with a live demo and named schemes,
with no hard count. MoE Memory Wall is a group course project, simulated only:
1.27x at C=64 on TinyMoE prose, no GPU measurements. The index contains RV32I,
HPC_Boost's 4-event PMU subset, Life OS (local-first Tauri/on-device inference)
and Tasveer (IIIT Delhi media society, coordinated by Leelansh). About states
About states only "ECE undergraduate at IIIT Delhi"; the page carries no job title, completed-degree, graduation-year, fork-count, live-radio or GPU-measurement claim.

## Files
`index.html`, `404.html`, `css/style.css`, `js/main.js`, `BRIEF.md`,
`README.md`, `INSPIRATION.md` — all inside `variants/kinetic-atlas/`.
