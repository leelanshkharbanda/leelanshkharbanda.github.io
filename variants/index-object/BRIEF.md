# BRIEF — Variant D: INDEX OBJECT

## Direction

Treat the homepage as a curated object: an exhibition catalogue crossed with an engineering
log. A giant typographic index of numerals and project names on warm-neutral paper, an
asymmetric hairline grid, and dossiers that reveal real diagrams and scope notes on hover or
focus. Deliberately not the current dark full-stage instrument hero.

## Audience and voice

Readers who care about the software/hardware boundary: signal processing, computer
architecture, hardware counters and local-first tools. Voice is factual and quiet. "Engineer"
is a description of practice, never a job title.

## Content inventory (exact claims)

- Identity: Leelansh Kharbanda; ECE undergraduate at IIIT Delhi; coordinates Tasveer, the
  media society of IIIT Delhi. Contact: leelansh24319@iiitd.ac.in, GitHub
  github.com/leelanshkharbanda, LinkedIn linkedin.com/in/leelansh-kharbanda.
- Dossier 01 — Chronos-DSP: Elixir/Phoenix control plane + Rust NIF DSP data plane; LoS,
  image-source, knife-edge, transmission, Doppler; seeded QPSK/AWGN/BER; `render_rx_block/5`
  on a dirty CPU scheduler with a deterministic pure-Elixir reference fallback. Scope: a
  simulator, not a live radio.
- Dossier 02 — Modulation Studio: browser DSP visualizer, waveforms/FFT/constellations, named
  schemes only (AM DSB-LC/DSB-SC, FM, PM, ASK, FSK, BPSK, QPSK, 16-QAM), live demo, AWGN /
  fading / offsets, optional PLL + timing recovery. No hard scheme count.
- Dossier 03 — MoE Memory Wall: group course project (CA Project 2, Group 24), simulated with
  LLMSimulator; reported 1.27× at C=64 on TinyMoE prose vs on-demand LRU. No GPU measurements.
- Index 04–07: RISC-V RV32I assembler/simulator with auditable trace; HPC_Boost 4-event PMU
  subsets; Life OS local-first Tauri 2 app, unpublished; Tasveer society site, coordinated.
- Thinking: three short working principles, all tied to the projects above.

Explicitly excluded: employer, title, completed degree, graduation year, forks, live radio,
GPU measurements, hard scheme counts, invented metrics or user counts.

## Interaction model

- Link or keyboard-focus a dossier → its detail panel appears (`:hover` and `:focus-within`).
- The `OPEN DOSSIER` button pins the panel open for touch/keyboard users and updates
  `aria-expanded` and its own label. Buttons are hidden when JS is off, because panels are
  already visible then.
- No JS: all panels visible, all content present. Reduced motion: no transitions or smooth
  scroll. Forced colors: borders and focus use system colors; outline numerals are hidden.
- A small `IntersectionObserver` marks the current section in the nav with `aria-current`.
  It never gates content.

## Layout and type

12-column hairline grid, asymmetric dossier spans (7 / 5 / 12), collapsing to one column.
System sans for prose, `ui-monospace` stack for every label and measured value (14px minimum).
Body copy starts at 16px; the cover numeral and project numerals use `clamp()` with overflow
contained. Warm paper and near-black ink, with one vermilion accent used only on small marks.
A light and a dark theme are provided through `prefers-color-scheme`; both use AA-contrast
token pairs.

## Files

`index.html`, `404.html`, `css/style.css`, `js/main.js`, `BRIEF.md`, `README.md`,
`INSPIRATION.md`. All paths are relative. No build step, fonts, frameworks, CDN, analytics or
other external runtime request.

## Verification performed

Static review of every claim against `research/github-identity.md` and `.scratch/site-content.md`;
screenshot decoding recorded in `INSPIRATION.md`; JS syntax check via the write tool's linter;
JS source size 1.47 KB (< 8 KB). No server, git command or approval-requiring action was run.
