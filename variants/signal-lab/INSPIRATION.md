# INSPIRATION — decoded mechanics, original adaptations

Screenshots viewed during this build (2026-11-25), from
`.scratch/elevation-shots/`: `refs2/identity2_brunosimon.png`,
`refs2/identity2_lusion.png`, `refs2/visual-crl-settled.png`,
`refs2/visual-cydstumpel.png`, `refs2/identity2_robinpayot.png`,
`v1-baseline/01-hero-light.png`, `v2build/01-hero-desktop-light.png`.
Research read: `elevation-technical.md`, `elevation-visual.md`,
`portfolio-patterns.md`, `elevation-sources.md`, `github-identity.md`.
Graphics are cited as mechanics only. No asset, code, font, colour bitmap,
component name or sentence from any reference was copied into this variant.

## Bruno Simon (identity2_brunosimon.png)
Observed: a ~56px navy chrome bar spans the top; a full-bleed photograph holds
a plain 44px sans heading at left, a dictionary-style definition block, and a
small pill CTA. The chrome is visually separate from the stage.
Decoded mechanic: thin persistent header + stage separation + a short
definition-style lede under a single heading.
Our adaptation: kept the thin instrument header and the "define the work in a
few lines" lede; rejected the photograph, full-bleed stage and pill CTA. The
stage here is a set of bordered panels, not a backdrop.

## Lusion (identity2_lusion.png)
Observed: the captured first paint is a black preloader with a centred grey
progress bar and a large `00/46` counter in the lower-left; the source notes
describe a fixed canvas, explicit grid column positions and a tokenised
palette with short, specific transition times.
Decoded mechanic: numeric state is a visual element in its own right; fixed
layers are assigned exact grid slots; palette lives in tokens.
Our adaptation: token-driven palette and explicit bench slots, but no loader.
The numeric state is real: SNR and estimated BER in the live readout. No fake
progress counter was invented.

## CRL (visual-crl-settled.png)
Observed: three stencil-like letters at the edges, cut slits, a bottom-up fill
that doubles as load progress; at rest the frame is quiet grey-on-grey.
Decoded mechanic: a mark and a measurement share one object; restraint at the
settled state lets the accent matter when it moves.
Our adaptation: the bench uses restrained grey panels; the single lime accent
appears only on measured values, active tabs and diagram paths. No stencil
glyph, monogram or invented progress value.

## Cyd Stumpel (visual-cydstumpel.png)
Observed: cream paper, one rust band and quarter-disc, a large serif headline,
and three small rotated badges scattered at distinct points.
Decoded mechanic: two inks plus one accent; one geometric field anchors the
composition; small labelled badges create depth without imagery.
Our adaptation: two neutral inks plus one signal colour; the geometric field
is an original 1px measurement grid; the badges become instrument labels
(`CH A`, `CH B`, `CH C`) sitting in panel headers. No disc, band colour or
badge artwork.

## Robin Payot (identity2_robinpayot.png)
Observed: a clean white field with a thin hand-drawn sine-like line near the
centre, minimal corner text, and a fixed-stage/long-runway scroll arrangement.
Decoded mechanic: a single thin signal line can carry an entire first
impression; navigation can follow a domain metaphor.
Our adaptation: the signal-line idea survives as original SVG traces inside
datasheet figures and the 404 readout. We rejected the fixed stage and
long runway; the page is an ordinary linear, fully readable document.

## v1 baseline (01-hero-light.png)
Observed: cream field, an oversized two-line personal-name `h1`, a two-column
layout with a right-hand "channel monitor" panel (waveform, constellation, SNR
slider, BER text), and underlined mono links.
Decoded mechanic: a compact instrument panel can make a technical claim more
credible than a large statement, and a single slider can express a whole model.
Our adaptation: kept the instrument-panel-plus-control idea and placed it at
the top, but replaced the name-as-hero with a short claim and changed the
palette and panel language entirely. No waveform copied into the hero.

## v2 build (01-hero-desktop-light.png)
Observed: near-black field, oversized "Model it. Measure it. Show the trace."
headline, a full-bleed ray-path diagram with TX/RX nodes and dashed lines, a
"SIMULATION" stamp, and mono captions across the bottom.
Decoded mechanic: strong hierarchy and a clearly stamped simulation status.
Our adaptation: kept the honest simulation stamp and the step-down from
claim to captions; rejected the full-bleed ray path and the oversized crossing
glyph. Propagation geometry is demoted to one small SVG inside a panel.

## Rules carried forward
- Use principles, not pixels: no reference sizes, colours, counters, class
  names, fonts, bundles or copy.
- System font stacks only; mono for measurement, sans for claims.
- Static final state in HTML/CSS; JS only enhances. The QPSK control is the
  one honest interaction, and its readout says "simulated, not measured".
