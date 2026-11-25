# BRIEF — SIGNAL LAB (variant B)

## Intent
A self-contained static portfolio for Leelansh Kharbanda that reads like an
engineer's workbench rather than a generic developer terminal. The organizing
idea is an instrument bench: a small claim beside three live-looking panels,
then three case **datasheets**, a four-item bench **index**, notebook
**annotations**, operator facts, contact, and a branded 404.

## Direction and decisions
- Palette: charcoal-navy `#0B1220`, cool-grey panels, one signal accent
  (acid lime). No second accent; the lime marks measured values, active
  segments and the interactive control.
- A precise 1px grid is the only background texture. Diagrams are original
  inline SVG with dashed measurement lines; decorative SVGs are `aria-hidden`,
  meaningful diagrams carry `role="img"` with title/description.
- Typography uses only system stacks: a sans voice for claims and a monospace
  voice for every measurement, label and index. Mono never drops below 14px;
  body copy starts at 16px.
- The hero deliberately avoids the root site's oversized crossing glyph and
  full-bleed ray-path stage. Propagation geometry survives only as a single
  small panel diagram. There is no photograph, no preloader and no fake
  progress counter.

## Content honesty
All project claims come from `research/github-identity.md` and the elevation
research. Chronos-DSP is consistently labelled a simulator, not a live radio.
Modulation Studio names schemes rather than asserting a hard count. MoE Memory
Wall is a group course project; `1.27x at C=64 on TinyMoE` is written as
*reported by simulation*, never as a GPU measurement. HPC_Boost is described
only as a 4-event PMU subset study. Life OS is local-first. Tasveer is a
society he coordinates. No employer, job title, completed degree, graduation
year, forks, invented metrics or deployment claims appear anywhere.

## Interaction model
- One genuinely interactive control: an AWGN SNR slider driving a seeded QPSK
  constellation and an estimated-BER readout. The BER is computed from the
  standard QPSK AWGN relation and labelled simulated, not measured.
- Datasheets use segmented readers (Claim / Mechanism / Bounds). With scripts
  off, all three segments render; no content is gated behind JS.
- A light/dark toggle is persisted locally. Both token sets meet AA contrast.
- The canvas caps DPR at 2, pauses work offscreen via IntersectionObserver and
  on `visibilitychange`, and starts with an inline SVG poster.
- Reduced-motion CSS and forced-colors rules preserve the composed state.

## Files
`index.html`, `404.html`, `css/style.css`, `js/main.js`, `BRIEF.md`,
`README.md`, `INSPIRATION.md`. All paths relative; no build step, CDN, font
download, framework or external runtime request.

## Verification performed
Static review of every claim against the identity research; markup checks for
single `h1`, skip link, landmarks, labelled diagrams, 44px targets, mono >=
14px, body >= 16px, no-JS visibility of tab panels, 320px single-column
fallback, reduced-motion and forced-colors rules. No network requests are made
by the page itself.
