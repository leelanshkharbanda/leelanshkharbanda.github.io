# INSPIRATION — Field Notes

## No copying statement
No asset, image, code, stylesheet, font, typeface file, selector, colour token
as artwork, or written copy was copied from any reference site. The screenshots
were viewed only to decode transferable mechanics — layout, type hierarchy,
rhythm and interaction — and every implementation here is drawn and written
from scratch with system fonts and original inline SVG. No third-party font is
loaded; no external request is made.

## Screenshots reviewed (2026-11-25)
Five images were viewed directly:
`.scratch/elevation-shots/refs2/visual-cydstumpel.png`,
`visual-matvoyce.png`, `visual-finethought.png`,
`visual-kernsociety-settled.png`, and
`.scratch/elevation-shots/v1-baseline/01-hero-light.png`.
Vision was available; no rate limit was hit. Written research inputs were also
read: `research/portfolio-patterns.md`, `research/elevation-visual.md`,
`research/elevation-sources.md`, `research/web-engineering-patterns.md`.

## Decodes and what was adapted

### Cyd Stumpel — oversized rust band over cream, quiet nav underneath
Observed: a full-width repeated name band in rust red at roughly 180 px cap
height, cream field below, a serif "Creative Engineer" line at ~90 px, and a
small ~14 px nav. One accent dominates; hierarchy comes from scale contrast
and placement, not effects.
Adapted: the **single-accent rule** and the **tiny-label / large-display**
contrast. The accent here is vermilion `#B23A20`, used only for the rail
numbers, figure labels, one arrow and the primary button. The name is set in
Georgia at a large but reading-scale size; no cropped giant glyph band.

### Mat Voyce — one cropped numeral as a mark, caption at reading size
Observed: a huge cyan `00` pushed against the bottom edge, almost empty white
field, and a tiny "Type designer & animator." label floating above it. The mark
carries identity while the caption stays quiet.
Adapted: the **one-mark, quiet-caption** relationship. The hero has one original
technical figure — three propagation paths, a wall edge and a four-point
constellation inset — with a small dossier caption beneath it. The figure is a
drawing about the work, not a borrowed glyph.

### Fine Thought — utilitarian editor chrome
Observed: a near-black editor surface titled `fine-thought.js`, a gutter of line
numbers, a thin top rule, and monospaced utility labels; the art direction is
tooling rather than marketing.
Adapted: the **datasheet chrome** idea, inverted to paper. Case sheets use meta
lists (`PLATFORM / METHOD / SCOPE`), numbered figures, explicit scope notes and
source lines. The line-number logic becomes the left-hand annotation rail
(`00`, `01`, `02` …) paired with short mono tags. No dark UI, no code editor,
no large instrument glyph, no ghost widgets.

### Kern Society — settled monogram with one vermilion wedge
Observed: a cream `KS` monogram on near-black, a single vermilion wedge cut into
the letterforms, and a small `100` counter in the lower-left corner during the
settled state. Restraint: one accent, one mark, one numeral as state.
Adapted: the **one wedge / one numeral** discipline. Vermilion appears as a
single arrow and a few rules, never as a field; numerals appear as annotation
indices rather than a loader. There is intentionally no progress counter — no
fake state is displayed.

### v1 baseline — what to change
Observed: warm paper already, a dark sans name, a right-hand "channel monitor"
card with a waveform, constellation and a noise slider, and a mono project
list. The card reads as a widget and the type is uniformly sans.
Changed: replaced the widget card with an article-like figure; switched display
and body to Georgia with mono only for annotations; moved numbering into a
persistent left rail; turned project blurbs into datasheets with scope notes;
removed the interactive slider so the page has no decorative controls.

## Mechanics carried into the build
- **Layout:** grid of annotation rail + content column, collapsing to one
  column at 640 px; generous section rhythm with hairline rules.
- **Type:** one serif for display and prose, one system mono for all labels,
  numbers, captions and meta; mono never below 14 px, body never below 16 px.
- **Rhythm:** numbered sheets (00–05) and numbered figures (01–04), each with
  a short caption; scope notes set off with a vermilion rule.
- **Interaction:** only a minimal fade/slide reveal via IntersectionObserver,
  disabled under reduced motion and irrelevant without JS. No cursor tricks,
  no loaders, no scroll hijack, no marquee.
- **Colour:** paper and ink tokens with a single signal accent; dark theme is a
  token override, not a separate design.
