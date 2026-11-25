# Elevation — Graphic / Typographic Identity Systems (ticket #12)

Scope: current award-winning portfolios and type showcases, **excluding** the earlier eight
(`brunoarizio.com`, `giats.me`, `minhpham.design`, `benhays.dev`, `rauno.me`,
`joshwcomeau.com`, `leerob.com`, `nathansmith.design`). Principles only. Every observation below is
tied to a fetched page/source or to a captured first-paint screenshot; no assets, fonts, copy,
selectors or component code were reused.

## Evidence ledger

All screenshots: 1280 px wide, first paint unless suffixed `-settled`, saved in the shared directory
`/Users/leelanshkharbanda/portfolio_1/.scratch/elevation-shots/refs2/`.

| Site | Source URL | Award / recognition | Source actually inspected | First-paint screenshot |
|---|---|---|---|---|
| Mat Voyce | https://matvoyce.tv | Awwwards SOTD (Jan 2025); GSAP SOTY 2025 nominee | fetched HTML (103 KB), Next.js CSS/JS chunk graph; developer case study https://hontran.dev/blog/mat-voyce-case-study-award-winning-portfolio | `visual-matvoyce.png` |
| Cyd Stumpel | https://cydstumpel.nl | Awwwards SOTD 2025 | fetched HTML (148 KB), `@font-face` + inline SVGs, `portfolio-2026` theme CSS/JS | `visual-cydstumpel.png` |
| Creative Reference Library | https://www.awwwards.com/sites/creative-reference-library · https://crl-2026.webflow.io | Awwwards SOTD + Developer Award (Nov 2025/2026 listing) | award page + dokle design decode https://dokle.design/awards/creative-reference-library-crops-oversized-type-at-the-edge | `visual-crl-settled.png` |
| Kern Society | https://shockingmike.github.io/kern-society | Website Design Awards Winner 8.5/10 | WDA jury review https://websitedesignawards.com/site/kern-society + live page HTML/CSS | `visual-kernsociety.png`, `visual-kernsociety-settled.png` |
| Gil Huybrecht | https://gilhuybrecht.com | Awwwards SOTD + DEV, FWA FOTD | fetched HTML (752 KB), `font-variation-settings` ×6, `letter-spacing` ×3, `mix-blend-mode` ×4; report https://rickcreates.com/r/2026-09-21-gil-huybrecht | `visual-gilhuybrecht.png` |
| Jesper Landberg | https://jesperlandberg.com | Awwwards SOTD 7.73 + DEV 8.17, FWA FOTD | report https://rickcreates.com/r/2026-09-29-jesper-landberg (stack: Nuxt, three.js, GSAP, KTX2) | `visual-jesperlandberg.png` |
| Maria Vasilyeva | https://www.mariavasilyeva.com | Awwwards SOTD + DEV, FWA FOTD | fetched HTML (46 KB): 3 `@font-face`, 12 `letter-spacing`, 4 `<canvas>`, 12 `<svg>`, `mix-blend-mode` ×2; report https://rickcreates.com/r/2026-10-09-maria-vasilyeva-portfolio | `visual-mariavasilyeva.png`, `visual-mariavasilyeva-settled.png` |
| Fine Thought | https://finethought.com.au | Awwwards SOTD (Jul 2025) | fetched HTML (172 KB), Typekit stylesheet link, Next/Turbopack chunks | `visual-finethought.png` |
| Olha Lazarieva | https://www.olhalazarieva.com | Awwwards SOTD (Oct 2025) | fetched HTML (2 KB app shell) + CSS/JS bundle names | `visual-olhalazarieva.png` |
| Roman Jean-Elie | https://www.romanjeanelie.com | Awwwards SOTD (Nov 2025) | fetched HTML (54 KB), 9 `background-image`, 9 `filter` declarations | `visual-romanjeanelie.png` |
| Ning Huang | https://ning-h.com | Awwwards SOTD (Aug 2025) | fetched HTML (68 KB), 5 `@font-face`, 6 `marquee`, 15 `<svg>`, three.js postprocessing | `visual-ninghuang.png` |

Note on evidence: several of these sites gate content behind 3–5 s asset loaders, so the honest
first-paint frame is a black/grey loader (e.g. `visual-mariavasilyeva-settled.png` shows a staff and
a `1%` playhead counter; `visual-kernsociety.png` shows an oversized `KS` and a `077` corner
counter; `visual-crl-settled.png` shows `C R L` spread across a grey field). Settled-state claims for
those sites come from the cited fetched source and third-party decode articles, not from inventing
pixels. Loaders themselves are evidence — technique 7 below is about exactly that.

---

## 1. Glyph as landscape — one letter larger than the viewport

**Source:** https://matvoyce.tv · https://www.awwwards.com/sites/creative-reference-library
**Screenshot:** `visual-matvoyce.png` (cyan `00` cropped by the bottom edge, a tiny "Type designer &
animator." label floating above it), `visual-crl-settled.png` (`C R L` pushed to three edges).

**Decoded implementation idea.** A single glyph or numeral pair is scaled past the viewport so it
reads as a shape before it reads as text; the caption stays at reading size and sits in the empty
counter space. The CRL decode describes the same move: "a black glyph fills the home page and runs
off the top and the bottom, so you read it as a shape before you read it as a letter," with small
dense body copy set over it (`Neue Haas Grotesk` in the source). Mat Voyce's fetched HTML is a
Next.js shell; the giant form is rendered by its CSS/JS chunks rather than an `<img>` — the crop is
a layout decision, not an image asset.

**Original adaptation for a DSP/computer-architecture engineer.** Pick one symbol you can defend —
an impulse-response bracket, a ∑, or a single eye-diagram opening — and set it as an inline SVG or
text node at a viewport-derived size that deliberately overflows the frame. Put one short truthful
sentence in the counter space: "I work at the software / hardware boundary." No reference glyph,
no foundry face, no borrowed colour.

**Principle:** scale contrast is a type system; let one oversized form carry the identity while the
reading layer stays quiet.

---

## 2. Marquee as a structural band of live state

**Source:** https://cydstumpel.nl (also https://shockingmike.github.io/kern-society, whose jury
review notes an "electric vermilion ticker")
**Screenshot:** `visual-cydstumpel.png` — a rust/orange band of "CYD STUMPEL CYD ST…" at roughly
180 px cap height, repeated and clipped at both edges above a cream field.

**Decoded implementation idea.** A single line of text is duplicated end-to-end and translated on a
continuous loop; because the strip is wider than the viewport, the seam is never visible. In the
captured frame the band is one flat colour against paper, so it behaves as a graphic rule that
happens to be made of letters. The underlying HTML shows an inline-SVG-heavy theme and two
`@font-face` declarations; the effect is CSS layout + transform, not a video.

**Original adaptation.** Run a ticker whose content is measured, not decorative: `SAMPLE RATE 48
kHz · 1024 TAPS · 7.2 GOPS · LATENCY 2.1 ms`, fed from constants you can cite in the repo. Let the
band change colour once when a reduced-motion preference is set (freeze it into a static row). Use
a system sans, not the reference face.

**Principle:** a marquee earns its place when it transports real values; otherwise it is wallpaper.

---

## 3. One face, one weight, hierarchy from position alone

**Source:** https://gilhuybrecht.com · decode: https://rickcreates.com/r/2026-09-21-gil-huybrecht
**Screenshot:** `visual-gilhuybrecht.png` (black first paint with a `0%` readout — the loader uses
the same single-size white type).

**Decoded implementation idea.** The report states the site uses "one typeface at one size, except
for the paragraphs on Profile and the big title on the privacy policy page," with the face in a
single medium weight; everything — header, project names, numbers, footer, descriptions — shares
one viewport-relative size (about 20 px at 1920 px and 15.5 px at 1366 px) and a line-height only a
tenth above the type size. Hierarchy is produced by columns, bands and whitespace; the Profile
paragraphs jump to more than four times that size with tightened tracking. Our fetched HTML
confirms `font-variation-settings` and `letter-spacing` are present but restrained.

**Original adaptation.** Define one `--type-unit: clamp(0.9rem, 0.7rem + 0.5vw, 1.25rem)` and use it
for 90% of the interface. Put availability, services, awards and contact in a header split into
columns exactly as data, not as marketing. Reserve one deliberately enormous size for a single
"measurement statement" on the about page.

**Principle:** remove type variables and the remaining differences (position, space, one exception)
read as authorship.

---

## 4. Three semantic layers of type, each with one job

**Source:** https://www.mariavasilyeva.com · decode: https://rickcreates.com/r/2026-10-09-maria-vasilyeva-portfolio
**Screenshot:** `visual-mariavasilyeva.png`, `visual-mariavasilyeva-settled.png` — near-black field,
seven thin horizontal staff rules, a centre playhead line and a tiny `0% → 1%` counter.

**Decoded implementation idea.** The site separates display serif (project names, four menu words,
large about sentences — set tight and large enough to span most of the screen), a monospaced face
(buttons, numbers, side bars, case notes — reading like markings on a score), and a handwritten face
(annotation words only). Strikes, circles and arrows are drawn as separate lines rather than glyphs.
The fetched HTML bears this out: three `@font-face` rules, twelve `letter-spacing` declarations,
four `<canvas>` elements, twelve `<svg>` elements and two `mix-blend-mode` uses; the decode names
WebGL2 MSDF glyphs and six shaders.

**Original adaptation.** Use three layers with strict jobs: a system sans for claims, `ui-monospace`
for every measured value (cycles, dB, bit widths), and a hand-drawn SVG annotation layer for
arrows/circles around a constellation plot. Keep each layer to its job; never let the handwriting
carry body copy.

**Principle:** a type system is a division of labour — assign semantics first, then style.

---

## 5. Canvas-drawn stage with a single spatial metaphor

**Source:** https://jesperlandberg.com · decode: https://rickcreates.com/r/2026-09-29-jesper-landberg
**Screenshot:** `visual-jesperlandberg.png` (black stage, three tiny corner labels — a name and two
project words — with the rest left empty).

**Decoded implementation idea.** Three.js draws a perspective grid receding into black; eight
rounded cards form one curved ribbon across the middle, draggable or wheel-driven, wrapping from
last to first. Navigation is reduced to four tiny entries pinned to the corners. The decode records
Nuxt + Vue + three.js + GSAP + KTX2 and a card-to-project-sheet transition (a card grows into a
near-fullscreen white sheet; slivers of neighbouring projects remain at the edges). FCP ~0.10 s with
text hidden and the home visible after ~3 s shows the loader is a deliberate part of the choreography.

**Original adaptation.** Draw an original register — time on one axis, frequency on the other — on a
`<canvas>`, and place project cards along one draggable ribbon above it. Opening a project expands its
card into a "datasheet" panel while thin slivers of adjacent experiments stay clickable. Provide
keyboard parity and an escape route; do not use a black-hole effect or the reference geometry.

**Principle:** the interaction should be an argument about your craft, not a demo of a library.

---

## 6. Viewport-derived scale law with extreme magnitude range

**Source:** https://matvoyce.tv · https://cydstumpel.nl · https://gilhuybrecht.com
**Screenshots:** `visual-matvoyce.png`, `visual-cydstumpel.png`

**Decoded implementation idea.** All three pages size type from the viewport rather than fixed
breakpoints: a tiny label sits near 12–18 px while the hero glyph runs into the hundreds of pixels;
line-height stays near 1.0–1.1 and tracking tightens as size grows. Cyd Stumpel's frame shows the
contrast directly — a ~180 px rust band, a ~90 px black serif "Creative Engineer", ~14 px nav and
~12 px body, all on one screen. The result is one law generating many magnitudes instead of a
five-step modular scale.

**Original adaptation.** Derive every type size from one `vw`-rooted custom property and clamp it:
a hero numeral at `12 × unit`, section heads at `3 × unit`, body at `1 × unit`, instrument labels at
`0.55 × unit`. Test at 1280 px and 390 px. Never copy the reference multipliers as a set; choose
your own based on what the measurement means.

**Principle:** one scale law across a wide magnitude range beats many arbitrary steps.

---

## 7. The loader is the identity (and the numeral is progress)

**Source:** https://crl-2026.webflow.io · https://shockingmike.github.io/kern-society
**Screenshots:** `visual-crl-settled.png` (`C R L` at three edges, cut/stencil slits, filling from
the bottom), `visual-kernsociety.png` (`077`) and `visual-kernsociety-settled.png` (`100`, with a
vermilion sliver appearing between the huge cream `KS` letters); `visual-mariavasilyeva-settled.png`
(`1%` on a staff).

**Decoded implementation idea.** Rather than a spinner, the mark and the progress indicator are the
same object: CRL's three letters fill bottom-up as the page loads, and the dokle decode calls the
marks "cut … like stencils" so the brand reads from a single glyph. Kern Society shows a counter
climbing in a corner while a coloured wedge is revealed inside the monogram. Maria Vasilyeva's
staff uses its playhead counter the same way. All are numerals doing double duty as state.

**Original adaptation.** Build an original monogram from two signal lines and fill it bottom-up with
your own progress value; put a small numeric readout in a corner that reports actual asset or
compute progress if you can measure it, otherwise omit the counter rather than fake it.

**Principle:** a loading state is unpaid attention — use it to demonstrate the subject, not to
display a stock spinner.

---

## 8. Utilitarian tool chrome as the whole art direction

**Source:** https://finethought.com.au · Awwwards SOTD decode: https://awwwards.com/sites/fine-thought-site
**Screenshot:** `visual-finethought.png` — a dark editor surface titled `fine-thought.js`, a left
gutter of numbered lines (1–50), a thin top rule and a tiny sun/expand control at the upper right.

**Decoded implementation idea.** The Awwwards description calls it "an experimental portfolio site
that recontextualises the design language and utilitarian aesthetics of the tools we as creatives
use daily." The captured first paint makes the tactic concrete: a code-editor frame — gutter, line
numbers, monospace, dark neutral field, minimal controls — is the interface itself. The fetched HTML
shows a Typekit stylesheet plus Next/Turbopack chunks, so the chrome is DOM/CSS, not a screenshot of
an editor.

**Original adaptation.** Frame case studies inside an original "measurement console": a gutter of
line numbers where each line is a real, citable fact (`01 target: Xilinx Zynq`, `02 taps: 1024`,
`03 throughput: …`), a theme toggle, and no third-party editor branding. The utility is honest
because the content is technical.

**Principle:** borrow the grammar of the tools you actually use, never their logo or exact skin.

---

## 9. Two-ink palette, one geometric field, small tilted badges

**Source:** https://cydstumpel.nl
**Screenshot:** `visual-cydstumpel.png` — cream paper, one rust band and rust quarter-disc, black
type, and three sticker-like badges (blue "MOTION WEB DESIGN", purple "AWARD WINNING DEVELOPER",
lime "ACCESSIBILITY") rotated a few degrees.

**Decoded implementation idea.** The composition is paper + one accent + black: a single large
geometric shape anchors the lower left, the repeated word band anchors the top, and small rotated
badges are scattered at distinct points to create depth without images. Badges use a tiny icon, a
short all-caps label and a slight rotation; the fetched HTML contains 17 inline `<svg>` elements and
only two `@font-face` rules, so the badges are generated vector marks rather than bitmaps.

**Original adaptation.** Choose paper, ink and one signal colour; draw one large geometric field in
CSS/SVG. Generate small rotated badges as inline SVG with truthful labels ("RTL SIGN-OFF", "ZYNQ
TARGET", "OPEN SOURCE"). Keep the geometric field abstract; do not reuse the disc, band colours or
badge artwork.

**Principle:** constrain the palette to two inks so scale, crop and placement carry the identity.

---

## 10. Scroll-linked type and the playhead as navigation

**Source:** https://www.mariavasilyeva.com · https://matvoyce.tv
**Screenshots:** `visual-mariavasilyeva-settled.png`, `visual-matvoyce.png`

**Decoded implementation idea.** The Maria Vasilyeva decode describes a pale staff of seven evenly
spaced rules with a strip of thumbnails pressed onto the middle line; as the visitor scrolls the
strip moves left while a thin vertical playhead moves right, and the bottom of the screen shows the
current project number and name with a "View project" link. Hovering the name expands a list of all
nine and choosing one glides the strip the shorter way around the loop. Mat Voyce's GSAP case study
documents the same scroll-to-type coupling at a kinetic scale.

**Original adaptation.** Bind scroll position to a playhead crossing an original impulse-response
or eye-diagram plot: each experiment is a tick on the trace, the readout at the bottom shows its
index and measured value, and hovering the readout opens the full list. Keep the plot generated from
your own data and provide a linear, non-animated fallback for reduced motion.

**Principle:** when navigation follows a domain metaphor, the interface teaches the subject.

---

## Do-not-copy list

- **Fonts / faces:** Geist (Cyd Stumpel), Lay Grotesk (Gil Huybrecht), Feature Display, ABC Synt Mono,
  SuomiHand Script (Maria Vasilyeva), Neue Haas Grotesk (CRL), ABC Diatype Plus, the Fine Thought
  Typekit family, and every proprietary face named in the cited decodes. Use system stacks or self-
  owned/open fonts and describe the *role* of each layer, not the product.
- **Images / artwork:** all project thumbnails and case-study screenshots, CRL's covers and wheel of
  prints, the Kern Society `KS` monogram and vermilion wedge, Cyd Stumpel's badges/stickers and rust
  quarter-disc, Mat Voyce's cyan `00`, the Fine Thought editor chrome, and every award badge. No
  reference file, screenshot, glyph outline, texture or colour bitmap may enter the repo.
- **Exact values:** the cited pixel sizes (20 px @ 1920, 15.5 px @ 1366, ~180 px band), line-heights
  (1.1), tracking deltas (−2%), counters (`077`, `100`, `1%`), scroll-space heights, asset sizes,
  scores and timing numbers are observations, not targets. Derive your own from your own content and
  gates (LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1).
- **Class names / component names / selectors:** `portfolio-2026`, `homepage-header`, `selected-work`,
  `text-with-meta`, `VariablePhysicsText`, `fine-thought.js` as a component id, and any selector,
  utility name or file path seen in the fetched bundles. Write original semantic HTML and name
  things after the domain (e.g. a measurement readout), not after the source site.
- **Copy and claims:** do not reuse taglines, project descriptions, awards or "available" statements;
  quote nothing from the reference sites into the portfolio. Award citations above are credit in
  research notes only.
- **Runtime dependencies and shader code:** no copied GSAP/three.js/Lenis bundle snippets, MSDF
  glyph pipeline, shader source, Web Audio loops or Typekit URLs. Principles and attribution only.

## Ranked shortlist for the build

1. **#1 oversized glyph + #6 one scale law** — the cheapest, strongest identity leap.
2. **#7 loader-as-identity + #10 playhead navigation** — makes the signal structural, not a widget.
3. **#3 single-size type + #8 tool chrome** — the most credible voice for a DSP/computer-architecture engineer.
