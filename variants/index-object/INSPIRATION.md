# INSPIRATION — decoded mechanics for INDEX OBJECT

All observations below come from screenshots I actually viewed in this session. Paths are
absolute under `/Users/leelanshkharbanda/portfolio_1/.scratch/elevation-shots/`.
These are **mechanics**, not assets: no image, typeface, colour value as artwork, selector,
copy or code from any reference was brought into this variant.

## 1. `refs2/visual-matvoyce.png` — oversized numeral, quiet caption

Observed: a near-white field; a cyan `00` set so large that its lower half is cropped by the
bottom edge of the frame, reading as shape before text; a single tiny black sentence,
"Type designer & animator.", floating alone high in the empty upper space.

Decoded mechanics: scale contrast is the whole identity. One numeral pair derives its size
from the viewport and deliberately overflows; the reading layer stays at caption size and sits
in the empty counter-space rather than fighting the form. The document research corroborates
that the giant form is layout (CSS/JS-rendered text), not an image asset.

Applied here: the cover carries a cropped outline numeral `01` (`aria-hidden`, stroke-only),
and dossier fronts carry oversized `01 / 02 / 03` numerals with reading-size titles beside
them. Hierarchy comes from magnitude difference, not from more decoration.

## 2. `refs2/identity2_basedesign.png` — the index grid itself

Observed: a near-black field with a thin top utility bar; a strict three-column grid of
empty frames separated by hairline borders; each frame has a small uppercase mono caption
underneath (VISA, BVN, CHÂTEAU DE GRANDSON). Top-right holds `PROJECTS` / `INDEX` toggles and
a search control; bottom corners hold `FILTER` and `NOW`. A cookie panel overlays one cell.

Decoded mechanics: the artefact is a catalogue, not a stage. Hairline rules do the structural
work; empty rectangles read as inventory slots; the label is the content when the image is
absent; utility controls sit at the perimeter, not over the work. The toggle between
"projects" and "index" is a first-class mode switch.

Applied here: both the dossier grid and the four-item index use 1px rules as structure with
paper-coloured cells, so the grid reads as a catalogue spread. Mono labels carry the metadata.
Navigation and counters live in the header/section edges. No image slots or fake thumbnails —
the diagrams are real, original SVGs instead.

## 3. `refs2/identity2_ohzi.png` — technical mark and legible state

Observed: near-black field; a small centred wireframe cube in thin white strokes; directly
below it a short horizontal progress track with a light filled segment. Nothing else.

Decoded mechanics: a load state can be a truthful technical diagram rather than a spinner;
one geometric line-mark plus one numeric/linear readout is enough to establish "instrument"
without a logo or a photograph.

Applied here: there is no loader (all content is in the HTML and paints immediately), but the
same grammar informs the dossier figures: line-drawn geometry, one reserved accent stroke,
caption-sized labels. State is exposed as text — `OPEN DOSSIER` / `CLOSE DOSSIER`,
`aria-expanded`, and the section counters — never as a decorative progress bar.

## 4. `refs2/identity2_hellomonday_dom.png` — evidence of the veil (not copied)

Observed: a solid black frame with no visible DOM content in this capture. The research file
records the cause: an `Intro` overlay at 100vh and a measured but not-yet-advanced module
stack, so the honest first paint is a veil.

Decoded mechanics: a full-screen intro layer can hold the entire site hostage to script
timing. This is the failure mode to avoid, not a pattern to borrow.

Applied here: no overlay, no loader, no scroll lock. The `h1`, all three dossiers and all seven
entries are present in the static HTML and visible without JavaScript.

## 5. `refs2/visual-kernsociety-settled.png` — two inks, one wedge, one counter

Observed: near-black field; a huge cream `KS` monogram centred; a single vermilion sliver
visible in the gap between the letters; a tiny `100` numeral in the bottom-left corner.

Decoded mechanics: two inks and one accent; the accent is a *small* interruption inside a
large neutral form, not a background wash. A tiny numeral doubles as a state readout. Crop and
placement carry the identity.

Applied here: warm-neutral paper + near-black ink + one vermilion accent used only on a few
small markers (nav rule, dossier flags, index numerals, one line inside each SVG diagram,
scope borders). The accent never fills a hero. Section counts are small mono numerals.

## 6. `v2build/01-hero-desktop-light.png` — the thing to depart from

Observed: a dark full-stage hero; huge white sans headline "Model it. Measure it. Show the
trace." with an italic serif word; an orange outlined propagation diagram filling the right
half; an orange `SIMULATION` tag; small mono kicker and links at the edges.

Decoded mechanics: dark instrument panel, dramatic headline, diagram as hero artwork.

Applied here — deliberate reversal: the new cover is a warm paper catalogue spread, not a
dark stage. The headline is the person's name set as an index entry; the diagrams move down
into the dossiers where they are captioned, labelled and scoped; the orange tag becomes a set
of tiny mono flags. The subject stays the same; the art direction does not.

## Rules carried forward

- One scale law, wide magnitude range: giant outline numerals, large titles, 1rem body, 14px mono.
- Hairline grid + generous paper is the structure; no shadows, no gradients, no glass.
- SVG figures are original line drawings with `role="img"` and descriptive titles; nothing copied.
- Motion is optional. Hover reveals are mirrored by `:focus-within`, and every panel is
  visible in the no-JS state.
