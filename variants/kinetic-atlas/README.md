# KINETIC ATLAS

A static, single-page portfolio variant for Leelansh Kharbanda. Open
`index.html` directly or publish the folder as-is; there is no build step.

## Contents
- `index.html` — six-chapter scroll essay, semantic landmarks, one `h1`.
- `404.html` — branded error page with the same stylesheet and navigation.
- `css/style.css` — all layout, both palettes, enhanced and reduced-motion states.
- `js/main.js` — optional ~2.6KB canvas enhancer; nothing in the page depends on it.
- `BRIEF.md` — design and fact-discipline decisions.
- `INSPIRATION.md` — decoded reference mechanics and what was deliberately not copied.

## Run / publish
No server is needed to read the files. For GitHub Pages, copy this directory's
contents to the publishing source; `404.html` is served automatically for
unknown paths. All paths are relative and there are no external runtime requests,
CDNs, fonts, frameworks or analytics.

## Behaviour
- Without JavaScript: the complete composed page, including every trace SVG,
  is present and readable.
- With reduced motion: no canvas animation, no scroll-linked reveal, no progress
  animation, no transform movement.
- With motion allowed and scroll-timeline support: gentle opacity reveals and a
  scroll progress rail; both are decorative.
- Canvas: one fixed element, `aria-hidden`, IntersectionObserver gated, DPR
  capped at 2, and it stops animating when off-screen or when motion is reduced.
