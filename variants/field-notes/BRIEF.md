# BRIEF — Field Notes (variant A)

## Direction
A quiet editorial engineering dossier: warm paper (`#F4F1E9`), near-black ink
(`#1A1815`), one restrained accent (deep vermilion `#B23A20`), a confident
system serif display (Georgia) against monospace annotations, generous white
space, a left-hand numbered annotation rail, dossier-style figure captions, and
content-first recruiter legibility.

## What this variant is
- One self-contained static directory: `variants/field-notes/`.
- No build step, no CDN, no fonts, no frameworks, no external runtime requests.
- Relative asset paths only, so it works from `file://` and at
  `/variants/field-notes/` on any static host.
- Light and dark themes follow `prefers-color-scheme`; reduced motion and
  forced-colors are respected; the no-JS final state is fully visible.

## Page architecture
- `index.html` — skip link; named primary nav; landmarks `header / nav / main /
  footer`; exactly one `h1`; sections: hero (00), work (01, three case sheets),
  index (02, four entries), thinking (03), about (04), contact (05), footer.
- `404.html` — branded error sheet with the same shell and one `h1`.
- `css/style.css` — tokens, responsive 12-col-feeling grid with annotation rail,
  both color schemes, focus rings, reduced-motion and forced-colors rules.
- `js/main.js` — under 1 KB: optional IntersectionObserver fade; never needed
  for content visibility.
- `BRIEF.md`, `README.md`, `INSPIRATION.md` — documentation, no build output.

## Editorial rules
- Case studies read as article-like datasheets with a meta list, prose, a real
  inline SVG artifact, a figure caption and an explicit scope note.
- All SVGs are original line drawings with `role="img"` + `title`/`desc`; no
  decorative SVG is left unlabelled.
- Motion is fade/slide only and is disabled when reduced motion is preferred.

## Claim boundaries (never cross)
No employer, job title, completed degree, graduation year, forks as his work,
live radio, real GPU measurement, or hard scheme count. Chronos-DSP is a
simulator; MoE Memory Wall is a group course project with simulated results
(reported 1.27× at C=64 on TinyMoE); Modulation Studio names schemes without a
count; Tasveer is a society website he coordinates; Life OS is an unpublished
local app. Facts sourced from `research/github-identity.md`.

## Accessibility acceptance
Single `h1` · skip link · landmarks · named navs · 44 px targets · mono ≥14 px ·
body ≥16 px · AA contrast in light and dark · forced-colors · no-JS and
reduced-motion final state · no horizontal overflow at 320 px.
