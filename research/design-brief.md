# Design brief — Leelansh Kharbanda portfolio

Resolved from Wayfinder ticket #5 by a four-seat reviewer council standing in for the absent user (2026-11-25). Evidence: `research/github-identity.md`, `research/portfolio-patterns.md`, `research/web-engineering-patterns.md`, and the decoded reference sheet/screenshots in `.scratch/`. No reference assets, fonts, copy or code were reused.

## 1. Positioning

**"Leelansh Kharbanda — ECE undergrad at IIIT Delhi, building software that models, measures, and respects the machine underneath."**

One `<h1>` in real text. "Engineer" describes practice, never a job title. No employer, completed degree, graduation year, GPA or employment claims. The monospace kicker above it: `SIGNAL PROCESSING / COMPUTER ARCHITECTURE / LOCAL-FIRST TOOLS`.

## 2. Visual language

Two neutrals + one reserved signal accent. All values verified with WCAG relative-luminance math (ratios against the theme paper/background):

| Token | Light | Ratio | Dark | Ratio | Use |
|---|---|---|---|---|---|
| `--paper` | `#F4F2EC` | — | `#0E1013` | — | page field |
| `--ink` | `#16181D` | 15.86:1 | `#ECE9E1` | 15.70:1 | heading/body text |
| `--muted` | `#54575E` | 6.46:1 | `#B3B6BC` | 9.38:1 | mono metadata |
| `--line` | `#6E7178` | 4.37:1 | `#9CA0A8` | 7.26:1 | borders/UI (>=3:1) |
| `--signal` | `#A63D0A` | 5.70:1 | `#FF7A45` | 7.37:1 | ONE word or action per view, on `--paper` only |
| focus ring | `--ink` with a `--paper` halo | 15.86:1 | `--ink` with halo | 15.70:1 | `:focus-visible`, two-tone so >=3:1 on any adjacent colour |

`color-scheme: light dark`; light is the base, dark is an override under `prefers-color-scheme: dark`. Never use `--signal` as text on `--ink` (2.78:1 / 2.13:1).

**Type — no downloaded font, no `@font-face`, no preload, zero font-driven CLS:**
- Display/body: `ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif` at weight 600–700, `letter-spacing: -0.03em` for display.
- Metadata/labels/readout: `ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace`.
- Fluid display `clamp(2.75rem, 9vw, 6rem)`; body `1rem` with line-height >=1.5; no media-query type overrides between 320px and 1440px.

**Space:** 4px base — `--s1..--s10` = 4/8/12/16/24/32/48/64/96/128px. Section rhythm `clamp(64px, 10vw, 128px)`. 12-column grid, fluid gutter `clamp(16px, 2vw, 32px)`, max content width 1120px, prose <=72ch. Hero spans 8 columns with meta in 4 on desktop; one column at 360px. Targets >=24px (44px preferred). `scroll-padding-top: var(--header-h)`, `scrollbar-gutter: stable`.

**Texture:** no photo, avatar or illustration. Identity is typographic/code-native: a small mono monogram `[LK]`, hairline rules, and one original inline-SVG signal trace. No canvas/WebGL, no noise layer, no custom cursor, no loading veil.

## 3. Information architecture

1. Skip link -> `#main`.
2. `<header>` with `[LK]` brand and `<nav aria-label="Primary">` (Work, About, Contact).
3. `<main id="main">`:
   - Hero: kicker, `<h1>`, one-line positioning, two proof points, CTA `See the work` + mono links `GitHub · email`, and the signature interaction. Real text visible on first paint.
   - Selected work (`<h2>`): three expanded case studies with links: **Chronos-DSP**, **Modulation-Studio**, **MoE-Memory-Wall-CA-Project**. Each states one verifiable technical detail; simulation results are explicitly labelled as reported simulation, with configuration intact.
   - How I think (`<h2>`): short note on signal processing + computer architecture, "code that models, measures, or respects the machine underneath".
   - Index (`<h2>`): compact one-line entries for RISC-V assembler/simulator, HPC_Boost, Life-Os, Tasveer. No forks. No claim that HPC_Boost's stock GitLab-template README is documentation.
   - About (`<h2>`): ECE undergrad at IIIT Delhi; coordinates Tasveer, IIIT Delhi's media society. Present tense only.
   - Contact (`<h2>`): `leelansh24319@iiitd.ac.in`, GitHub, LinkedIn (HTTP 200 verified 2026-11-25).
4. `<footer>` with `<nav aria-label="Footer">`.
5. Standalone `404.html` using the same tokens, one `<h1>`, and a link back.

Scope contract: no blog, CMS, analytics, comments, tracking, auth, second signature interaction, or extra pages.

## 4. Signature interaction — "Tune the channel"

One native `<input type="range">` labelled **Add noise (SNR)** sits beside the hero headline with an inline-SVG waveform plus constellation and a mono readout (SNR -> BER) computed by a small seeded, deterministic function. It is a direct metaphor for Chronos-DSP's seeded, reproducible AWGN/QPSK pipeline. It is parallel/decorative: it never contains or gates the name, positioning, proof points or links.

- **Keyboard**: native range responds to arrows/Home/End; visible label, `aria-valuetext`, focus ring >=3:1, logical tab order, no positive `tabindex`.
- **Touch**: native range is touch-operable; no hover-only or drag-only path.
- **Screen reader**: readout is `role="status" aria-live="polite"` and announces the new SNR/BER on change; the SVG is `aria-hidden="true"` with an adjacent text description.
- **No JS**: the ES module adds `.js` to `<html>` only **after successful initialization** (not from a head script alone), so a failed module load cannot leave a visible but inert range. Without it the range is `display:none` and the SVG ships a pre-rendered clean waveform with a real text readout `AWGN · SNR ∞ · BER 0`. Everything else is static HTML and fully navigable.
- **Reduced motion / no IO**: updates are instantaneous; no autoplay, parallax, pointer tracking, scroll-jacking, pinned sequences or reveal gates.
- **JS budget**: one vanilla ES module, zero dependencies, <=15KB uncompressed. No IntersectionObserver dependency for content; any scroll effect is `@supports (animation-timeline: view())` + `no-preference` gated.

Motion tokens: `--dur-fast: 120ms`, `--dur-base: 220ms`, `--ease: cubic-bezier(.2,.8,.2,1)`. Under `prefers-reduced-motion: reduce`, all durations become `0.01ms`, iteration-count 1, `scroll-behavior: auto`. Content is visible by default — never `opacity:0` awaiting a timeline. No loading gate.

## 5. Council verdict and conditions

- ART DIRECTOR — approved. Contributed the palette, system type stack, "tune the channel" interaction and the rejection of loading veils.
- FRONTEND ENGINEER — approved conditionally on measured CWV (p75 LCP<=2.5s, INP<=200ms, CLS<=0.1, mobile and desktop separately), contrast in both themes without rounding, target sizes, keyboard order, 360/1280px overflow checks, no-JS and reduced-motion emulation, JS <=15KB, and GitHub Pages mechanics.
- FIRST-TIME VISITOR — approved. Required name + positioning + two proof points + GitHub/contact above the fold at both widths, `See the work` CTA (not "Hire me"), and Modulation-Studio's live demo as a proof point.
- ACCESSIBILITY — approved the plan's strengths but withheld approval on four gaps: touch parity, keyboard operation of the signature interaction, screen-reader state announcements, and an explicit no-JS/no-gate guarantee. Sections 2 and 4 close all four explicitly; the frontend engineer's measurement conditions are adopted verbatim as ship gates. Re-review of this brief is recorded below.

## 6. Anti-goals

No loading gate, progress veil, photo, avatar, illustration, proprietary/downloaded font, CDN asset, pointer-only effect, custom cursor, parallax, WebGL, scroll-jacking, analytics, blog, fabricated metrics, title/employer/completed-degree claims, forks as his work, simulation as real hardware measurement, or copied reference code/assets/copy.

## 7. Reference lineage (inspiration, not reuse)

Restraint and oversized type: giats.me and rauno.me. Small mono metadata and generous chapter spacing: rauno.me. One signal accent: giats.me and benhays.dev. The *idea* of a progress/reveal moment: brunoarizio.com and benhays.dev — but the loading gates were rejected outright because they break the first-10-seconds guarantee. Technical writing/code-adjacent presentation: joshwcomeau.com and leerob.com. Full source-study table: `research/portfolio-patterns.md`.
