# SIGNAL LAB

A one-page static portfolio variant for Leelansh Kharbanda, built as a modular
instrument workbench. No build system, no dependencies, no external requests.

## Open it
Open `variants/signal-lab/index.html` directly in a browser. Relative paths
resolve from the variant folder; a local server is optional, not required.
Open `404.html` to see the branded error page.

## Layout
```
signal-lab/
  index.html        hero bench, 3 datasheets, 4-item index, thinking, about, contact
  404.html          branded "signal lost" page
  css/style.css     design tokens, both themes, all component styles, a11y rules
  js/main.js        theme toggle, segmented tabs, seeded QPSK/AWGN control
  BRIEF.md          design and content rationale
  README.md         this file
  INSPIRATION.md    decoded reference mechanics and original adaptations
```

## Behaviour
- **Theme:** the header button switches between dark and light and stores the
  choice in `localStorage` (guarded). Without JS the dark theme renders fully.
- **Datasheets:** each reader has three segments. Keyboard: Left/Right/Up/Down,
  Home/End move between tabs. Without JS every segment is visible.
- **Constellation:** the SNR slider redraws a deterministic QPSK scatter with
  AWGN and computes an estimated BER (`Q(sqrt(2·Eb/N0))`, `Eb/N0 = Es/N0 / 2`).
  It is a teaching model of a channel, not a measured radio link. The canvas is
  decorative (`aria-hidden`); the adjacent live text carries the meaning.
- **Performance:** DPR capped at 2, one IntersectionObserver gate, no
  continuous animation loop, redraw only on input, resize or visibility return.

## Accessibility notes
Single `h1`, skip link, header/nav/main/footer landmarks, 44px minimum target
heights, AA-contrasting token pairs in both themes, `prefers-reduced-motion`
and `forced-colors` rules, visible focus rings, and `role="img"` on the
meaningful SVG diagrams. At 320px the grids collapse to one column.

## Editing
Change colors only in the `:root` / `:root[data-theme="light"]` token blocks.
Project facts should stay tied to the sources named in `BRIEF.md`; do not add
employment, graduation, live-radio, GPU or scheme-count claims.
