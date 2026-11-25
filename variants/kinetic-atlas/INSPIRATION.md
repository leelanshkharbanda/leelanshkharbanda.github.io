# INSPIRATION — KINETIC ATLAS

## Screenshots actually viewed
All paths under `.scratch/elevation-shots/`. Viewed with `vision_analyze`; the
honest first paint of several award sites is a loader, which is itself evidence.

1. `refs2/identity2_immersivegarden_noload.png` — a light neutral field with the
   overlay/canvas removed: the diagnostic confirms the site's typographic hero
   depends on a composite of DOM type plus a full-viewport WebGL layer. No text
   or brand is visible in the stripped frame. Decoded mechanic: **low-placed
   headline over a full-bleed visual field**, with hero spacing derived from
   viewport width rather than fixed pixels. Adapted as: dark chapter fields with
   a low, wide trace figure and `vw`-rooted `clamp()` type.
2. `refs2/identity2_lusion.png` — black first paint, centred grey progress bar
   with a white fill and a large `008 / 056` numeral bottom-left. Decoded
   mechanic: **numeric progress as an explicit state affordance**, with short
   0.25–0.5s interface transitions and a tokenised palette. Adapted as: a thin
   scroll progress rail driven by CSS `scroll()` timeline — but no loader veil;
   our content is never hidden behind progress.
3. `refs2/identity2_resn.png` — near-black first paint with only a faint vertical
   sliver: a 4KB shell whose canvases and module loader carry the visual. Decoded
   mechanic: **deliberately dark, loader-first shell** with a tiny inline
   critical style block. Adapted as: dark chapters that are genuine, readable
   content chapters — not an entry gate; no `lockScroll`, no loader.
4. `refs2/identity2_hellomonday.png` — black `Intro` overlay covering a modular
   one-screen hero; layered modules underneath, canvas media, and a small nav.
   Decoded mechanic: **one-screen module system** with z-separated layers.
   Adapted as: six full-viewport chapters with one focal idea each.
5. `refs2/identity2_basedesign.png` — dark almost-black grid of large outlined
   project rectangles, tiny uppercase mono labels, compact`PROJECTS / INDEX`
   controls at top-right and a cookie panel. Decoded mechanic: **a strict grid
   of bordered cells plus utilitarian mono chrome**. Adapted as: bordered datasheet
   rows with mono field labels (`CHANNEL MODEL`, `BOUNDARY`) and a four-item
   numbered index.
6. `refs2/visual-mariavasilyeva-settled.png` — near-black field with thin
   horizontal staff rules, a central playhead line and a `1%` counter. Decoded
   mechanic: **a score/staff metaphor where scroll moves a strip and a
   playhead**, with three type layers (display serif, mono, annotation) doing
   separate jobs. Adapted as: one recurring signal path, a canvas playhead tied
   to document scroll, and a strict division of labour: system sans for claims,
   14px mono for instrument labels, one serif italic for emphasis.
7. `v2build/01-hero-desktop-light.png` — the sibling build's composed hero:
   oversized stacked headline (`Model it. Measure it. Show the trace.`) with an
   italic serif final word, a small numbered eyebrow, a dark field, a low-opacity
   orange/red propagation diagram with TX/RX nodes, a tilted `SIMULATION` badge,
   mono nav and a bottom caption strip `SIMULATION — NOT A LIVE RADIO`. Decoded
   mechanic: **scale contrast between headline and instrument caption, one accent
   colour, and an explicit simulator boundary label**. Adapted as: our own
   headline, our own impulse-response line art (no TX/RX scene, no tilted badge),
   the same disciplined honesty about simulation — and no copied mark or copy.

## Principles carried forward
- Viewport-derived scale with extreme magnitude range: one `clamp()` law from
  14px mono labels to ~10rem display type, rather than a five-step scale.
- Two inks plus one accent; hierarchy from position, rule and whitespace.
- A domain metaphor that teaches the subject: the trace evolves chapter by
  chapter, and a playhead marks scroll position.
- Legible state instead of decorative state: real content at first paint.

## Deliberately not copied
No reference fonts, glyphs, logos, badges, loaders, counters, colour tokens as
artwork, component names, selectors or copy. No WebGL bundles, no three.js, no
GSAP, no third-party assets. The canvas and SVG paths here are original, tiny,
and generated from plain maths and hand-written path data.
