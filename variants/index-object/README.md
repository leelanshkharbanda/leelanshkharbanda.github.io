# INDEX OBJECT

Variant D of the Leelansh Kharbanda portfolio: a gallery / dossier grid built as a static
site. Open `index.html` directly in a browser — there is no build step, package manager,
font download, framework, analytics or other external runtime request. All paths are relative.

## Tree

```
index.html          cover, three case dossiers, four-item index, thinking, about, contact, footer
404.html            branded missing-entry page using the same cover grammar
css/style.css       tokens, light/dark themes, 12-column grid, reveals, narrow/forced-colors rules
js/main.js          dossier pin toggle + current-section nav marker (progressive enhancement)
BRIEF.md            direction, exact claims, interaction model, verification notes
INSPIRATION.md      decoded mechanics from the six screenshots reviewed, and how they were adapted
README.md           this file
```

## How it behaves

- The cover is a catalogue spread: cropped outline numeral, name as an index entry, a short
  position statement and three factual meta fields. No dark full-stage hero.
- Each dossier shows an original inline SVG diagram with a `role="img"` and a descriptive
  title, plus a spec list and an explicit scope note. Detail panels reveal on `:hover` and
  `:focus-within`; the button pins them open on touch devices.
- With JavaScript disabled the buttons disappear and every panel is already visible. With
  reduced motion enabled there is no smooth scrolling or transition. In forced-colors mode
  the structural lines and focus rings use system colors and outline numerals are hidden.
- Both `prefers-color-scheme: light` and `dark` are supported through CSS custom properties.

## Editing rules

- Keep claims tied to public sources in `research/github-identity.md`. Do not add an employer,
  job title, completed degree, graduation year, forks, live-radio, GPU or user-count claim.
- Keep scheme names as names; do not assert a hard digital-modulation count.
- Quote MoE results only as reported by the simulation, with C=64 and TinyMoE intact and the
  group-course context present.
- Keep the JavaScript small: it is deliberately only about interaction, never content.
- `404.html` is linked from the same stylesheet and uses `index.html#…` links so it works
  when served from any path.

## Claim sources

Identity and links: <https://github.com/leelanshkharbanda/leelanshkharbanda>.
Project repositories: Chronos-DSP, Modulation-Studio, MoE-Memory-Wall-CA-Project,
RISC-V-Assembler-and-Simulator, HPC_Boost, Life-Os and tasveer under the same GitHub account.
Dossier and index links point directly to those repositories; the Modulation Studio link
points to its live static demo.
