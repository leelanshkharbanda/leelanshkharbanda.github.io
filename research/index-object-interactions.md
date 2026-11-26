# Index Object — source-level interaction ledger (Wayfinder #22)

Resolved 2026-11-26. Followed the `research` skill: primary sources are the **live sites' fetched HTML/CSS/JS bundles** and the **award bodies' own pages**, with a first-paint screenshot per visual reference. Raw bundles were kept **outside the repo** at `/Users/leelanshkharbanda/.hermes/cache/scratch/index-object-refs/` and screenshots at `.../index-object-refs/shots/`. No server was started; nothing from those bundles was imported into this repo.

Design target: the Index Object described in `research/design-brief.md` — static-first HTML, system fonts only, one signature interaction (`Tune the channel`), no loading veil, no custom cursor, no WebGL/canvas, no scroll-jacking, no second signature interaction, `:focus-visible` parity on everything interactive.

## Evidence inventory (what was actually fetched)

| Ref | Fetched primary source | Award evidence from the award body | First-paint screenshot |
|---|---|---|---|
| Maria Vasilyeva | `https://www.mariavasilyeva.com/` — HTML 45,730 B; `/css/_.css?…` 30,256 B; `/js/_.js?…` 313,553 B; `/r.json?…` 121,790 B | Awwwards `https://www.awwwards.com/sites/maria-vasilyeva-portfolio` → "SOTD **7.28**/10", "Site of the Day – Oct 9, 2026". Awwwards DEV same date and FWA FOTD 2026-08-26 are recorded in the teardown (secondary). | `shots/maria-first-paint.png` |
| rickcreates decode | `https://rickcreates.com/r/2026-10-09-maria-vasilyeva-portfolio` — 28,297 B HTML | Secondary cross-check only; used for timings/asset totals, never as sole mechanic evidence. | — |
| JazzKeys | Awwwards `https://www.awwwards.com/sites/jazzkeys` — 330,696 B; winner `https://jazzkeys.plan8.co/` — 3,860 B + 4 `/_nuxt/*.js` bundles (2,563 + 192,409 + 64,804 + 275,845 B on disk) | "Site of the Day – **Jun 11, 2020**", "SOTD **7.69**/10"; sub-scores 7.33 design / 7.58 usability / 8.58 creativity / 7.67 content; Awwwards element "Musical typing interface – JazzKeys"; description "you can write messages in jazz". | `shots/jazzkeys-first-paint.png` |
| Bittercreek Studio | Awwwards `https://www.awwwards.com/bittercreek-studio.html` — 223,830 B; winner `https://www.bittercreek.studio` — 77,087 B HTML, CSS 143,160 B, `bttc-custom.js` 52,717 B, cursor script 2,617 B | First-party Awwwards **case study** (no SOTD score on the fetched page). Quote: "Our favorite touch is the hover mechanic on the index screen… dynamic thumbnails appear in randomized positions across the screen". | `shots/bittercreek-first-paint.png` |
| Mathilde de Chiara | Awwwards `https://www.awwwards.com/inspiration/click-to-expand-project-slide-mathilde-de-chiara-portfolio` — 304,550 B; winner `https://www.mathildedechiara.com/` — 5,395 B HTML, `assets/index-D88q76o1.js` 308,515 B, `vendor-gsap` 130,383 B | Awwwards **Elements** entry "Click to expand project slide" by Thibault Guignand from MATHILDE DE CHIARA • PORTFOLIO — an interaction-pattern selection, not a scored SOTD. | `shots/mathilde-first-paint.png` |
| Eva Sánchez | Not fetched; no claim made about it. | — | — |

## Source facts (derived from the bundles, not from screenshots)

**Maria Vasilyeva (`_.css`, `_.js`).** One CSS bundle: 511 rule blocks, 95 `@media`, 18 `transition:`, 21 `transform:`, 12 `letter-spacing`, 11 `position:fixed`, 6 `will-change`, **0** `prefers-reduced-motion`, **0** `animation:`. One JS bundle (313,545 chars): **0** `prefers-reduced-motion`, **0** `IntersectionObserver`, 6 `requestAnimationFrame`, 4 `matchMedia`, 10 `keydown`, 12 `pointermove`, 9 `wheel`; WebGL2 MSDF text (`/fonts/msdf/feat`, `/fonts/msdf/synt`), `OffscreenCanvas` + Worker for the intro, `AudioContext` with master gain `0.8` and `VC=2` pre-created buffer sources per decoded sound. DOM is a handful of real controls (`button#h-sound`, `#h-ann`, `#h-cta[aria-expanded]`) plus canvases; menu Escape handler explicitly calls `bt?.focus()`; an `A` key listener toggles annotations while guarding `input|textarea|select`. Pointer tracking is gated on a `(pointer: fine)` query. Teardown measurements: ~4.9 MB first visit, FCP 236–300 ms, home fully revealed 4.25–4.6 s, CLS 0.03.

**JazzKeys (`jk-4.js`).** A Web Audio/MIDI-style stack: 16 `AudioContext` references, `noteOn`/`noteOff` handling, sequencer clip scheduling. The four fetched Nuxt chunks contain **no global `keydown` binding** (only an Escape-to-close dialog listener in `jk-3.js`), so the exact key→note map cannot be asserted from the downloaded source; the award page's "Musical typing interface" is the evidence for keyboard-driven play.

**Bittercreek (`bc-custom.js`).** Webflow + GSAP/Flip + Lenis. Three `Math.random` calls: two size loader-bar widths (`baseWidth + (Math.random()*variation - variation/2)`), one picks `DIRECTIONS = ["pos-west","pos-east"]` for a Flip grid move with `animationDefaults = {duration:0.6, ease:"expo"}`. A `gsap.quickTo` cursor-follow and `mm.add("(min-width: 992px)")` hover gating exist. **No RNG call for thumbnail placement appears in the fetched bundle** — the randomized hover thumbs described by Awwwards are likely in the Webflow interaction layer, so exact placement math is not claimed.

**Mathilde (`mdc-main.js`).** React + OGL/WebGL slides + GSAP quickTo. Slide state is `c = introCompleted ? (isRevealed ? "expanded" : "visible") : "hidden"`; pointer-driven diamond uses `quickTo(..., {duration:.5, ease:"power3"})` and a `mousemove` follower with 14 px offsets; `viewMode` cycles `slider / grid / transitioning-*`. The inlined CSS has a global reduce rule (`animation-duration:.01ms!important; transition-duration:.01ms!important`) and disables 0.8 s `::view-transition-*` clip-path animations. Only one `aria-expanded` exists (the filter button); no `:focus-visible` rule in the bundle.

## Technique ledger

Verdict scale: **RECOMMEND** = justified weight for Index Object; **REJECT** = documented but not imported.

### 1. Scroll-driven playhead + springing image cluster (Maria) — **RECOMMEND (decorative readout only)**

- **Observed math.** Positive modulo `E1(L,C)=(L%C+C)%C`; period read from `data-period` (or `data-m-period` under `max-width:768px`) times `Z1()`. Distance to playhead `U = (itemLeft + lx + itemWidth/2) − playheadPx`; nearest centre becomes current project. Rise envelope `j = 1 − clamp(|U| / (innerWidth * (mobile ? 0.36 : 0.32)), 0, 1)`, then `J = j*j` (flat at both ends). Per-image deterministic variation: `seed = Number(data-i)*31 + siblingIndex`; `hash(seed) = fract(sin(seed*12.9898 + 78.233)*43758.5453)`; `ny = ±hash(seed)`, `nx = hash(seed+101)*2−1`, scale lerp `3→9.5` desktop / `2.8→9` mobile via `hash(seed+211)`. Entrance delay `140 ms + clamp(|U|/innerWidth,0,1)*520 ms`, duration `1100 ms`, easeInOutCubic; total cycle constant `140+520+1100=1760 ms`.
- **Weight.** Very heavy as built: 313 KB bespoke JS, WebGL2 MSDF glyphs, OffscreenCanvas worker, ~4.9 MB first visit, ~9.6 MB on mobile after several projects. The *idea* is cheap; the implementation is not.
- **Accessibility failures in the original.** Cluster is canvas/WebGL, not focusable or readable as text; no reduced-motion support anywhere in CSS or JS; state depends on scroll and pointer; content arrives only after a 4.25–4.6 s gate.
- **Static translation for Index Object.** Keep only the *readout*: a 2 px mono hairline over the Index section, `aria-hidden="true"`, no content gating, no images. Implement as `@supports (animation-timeline: scroll())` + `@media (prefers-reduced-motion: no-preference)` with `animation: playhead linear both; animation-timeline: scroll();` on a `::after`. Under `reduce` or no support, show the **final frame** (line at 100%) or omit it — never a partially revealed state. Zero JS, zero assets.
- **Why it justifies its weight.** The visual idea (a position marker tied to progress) is delivered for a handful of CSS lines and no runtime; the original's 300 KB + media budget is explicitly not inherited.

### 2. Letter-spread on hover / focus (Maria) — **RECOMMEND**

- **Observed mechanics.** Source CSS contains 12 `letter-spacing` declarations; the large-type spread is rendered in the MSDF shader (`stag`, `CHARSTAG`, `TRAILMS`, `fx`, `smoothstep`) with the spread driven by an eased value and its velocity (faster spreading leaves a longer fading trail). The decode records ~1.4 s fast-then-slow opening on menu/about lines, closing on leave.
- **Weight.** Original: shader + two glyph atlases (~0.76 MB). Static: one custom property and one transition, ~8 lines.
- **Accessibility failures in the original.** Hover-only; WebGL text is not selectable/focusable; no reduce query; velocity-based trails add motion with no off switch.
- **Static translation for Index Object.** On **non-navigation** index entry titles only: `.index-entry__title:hover, .index-entry__title:focus-visible { letter-spacing: .08em; }` with `transition: letter-spacing var(--dur-base) var(--ease)` from the existing token set (`--dur-base: 220ms`). `:focus-visible` parity is inherent because the selector is shared. Under `reduce`, set `transition-duration: .01ms` so the **final frame** (spread applied) appears instantly. Keep the label in normal flow with `text-wrap: nowrap` so the change cannot shift header/nav geometry. No JS, no key handling.
- **Why it justifies its weight.** It adds a tactile, discoverable affordance using an already-existing token and focus ring; it does not move navigation or gate any content.

### 3. Bar-wipe menu / JAZZ fly-in / intro reveal (Maria) — **REJECT**

- **Observed mechanics/timings.** Bars rise in ~0.4 s on menu open; four words (`NOTES`, `MELODY`, `OVERTURE`, `JAZZ`) fly in from alternating sides, settling in ~1 s with seven faint copies each; ~0.7 s black hold on page change; intro fully reveals the home only at 4.25–4.6 s. Source: `h-cta` carries `aria-expanded`; `KeyA` toggles annotations; Escape closes the picker and restores focus; `j9` derives close delay from the longest fx (`1600/800` ms presets).
- **Failure modes.** Navigation itself is animated and hidden behind a black hold — direct violation of "no navigation movement"; intro is a loading gate; the wipe obscures content. High weight for a purely decorative transition.
- **Static translation (not adopted).** Static nav with a single `aria-expanded` disclosure would keep semantics, but the wipe/hold/fly-in have no place in Index Object. Rejected.

### 4. Handwritten annotations layer + toggle (Maria) — **REJECT**

- **Observed mechanics.** DOM ids `ann-fl`, `ann-m`, `n-ann-*`, `aria-hidden="true"` wrappers; `h-ann-on` / `h-ann-off` buttons; default on; `KeyA` toggles it (with an input guard). Uses the licensed SuomiHand Script face plus separately drawn SVG strikes/circles/arrows.
- **Failure modes.** Licensed font and extra assets; a global `A` shortcut; an optional layer that can hide text; purely decorative for a code-native identity. Rejected: the design brief forbids downloaded fonts and illustration, and the signature interaction must stay singular.

### 5. Wet-paint image smear (Maria) — **REJECT**

- **Observed mechanics.** Shader path `if(smear>.001)` performs a 20-tap directed blur/trail using 170-row hashes; the decode records the last 20 cursor segments, ≤50 px radius, and ~1.5 s recovery; fastest strokes drag the longest marks.
- **Failure modes.** Pointer-only, WebGL, no reduced-motion handling, significant GPU cost. There is no accessible interaction to translate — a static image is just an image. Rejected.

### 6. Keyboard-driven "play" (JazzKeys) — **REJECT**

- **Observed mechanics/award.** SOTD 7.69 (2020-06-11), creativity 8.58; Awwwards element "Musical typing interface"; winner site is a Nuxt shell whose `jk-4.js` bundle implements a Web Audio/MIDI note sequencer (16 `AudioContext` references, `noteOn`/`noteOff`, `charCode` only in a URL encoder). The actual key→note binding is not present in the fetched chunks, so no timing is claimed.
- **Failure modes.** Repurposes ordinary typing keys as instruments (key hijacking); requires audio unlock; creates a second signature interaction; no focus-visible or SR semantics for the "notes"; typed content would be lost. Static translation would just be the existing native range with `aria-valuetext`. Rejected.

### 7. Randomized index hover thumbnails (Bittercreek) — **REJECT**

- **Observed mechanics/award.** Awwwards case study: project codes index the work; "dynamic thumbnails appear in randomized positions across the screen" on index hover. Fetched `bc-custom.js` confirms desktop-gated hover (`mm.add("(min-width: 992px)")`), GSAP Flip grid moves (`0.6 s`, `expo`), `gsap.quickTo` cursor follow, and `Math.random` only for loader bars and west/east direction choice — not for thumb placement. Exact placement math is therefore **not claimed**.
- **Failure modes.** Pointer-only content; random positions defeat predictable scanning and `focus-visible`; no reduced-motion path; Webflow/Lenis/GSAP/lottie payload. A deterministic `nth-child` offset on focus would still reveal content only on hover/focus — pointer-first and out of scope. Rejected.

### 8. Click-to-expand project slide (Mathilde de Chiara) — **REJECT**

- **Observed mechanics/award.** Awwwards Elements entry; React state `hidden → visible → expanded`, `quickTo` 0.5 s `power3`, pointer-follow at 14 px offsets, WebGL slides; CSS disables 0.8 s view transitions under `reduce` (good) but the bundle has no `:focus-visible` rule and only one `aria-expanded` (filter button, not the slide).
- **Failure modes.** Initial `hidden` state gates content; WebGL/OGL dependency; pointer-follow; no expand/collapse semantics on the slide itself. Native `<details>/<summary>` would fix semantics with zero JS, but Index Object's Index rows have no additional content to reveal and the brief forbids a second interaction. Rejected as written (pattern noted for a future, content-bearing index).

## Compliance contract for anything borrowed

| Technique | `:focus-visible` parity | No key hijacking | No pointer-only content | Reduced-motion final frame | No navigation movement |
|---|---|---|---|---|---|
| 1. Playhead readout | N/A (decorative, `aria-hidden`) | Yes (no handlers) | Yes (no content revealed) | Line at 100% or omitted | Yes (no nav element moves) |
| 2. Letter-spread | Yes (shared `:focus-visible` selector) | Yes (no handlers) | Yes (text always present) | Instant spread, no transition | Yes (non-nav labels only) |

Every rejected technique fails at least one column above; none is carried into the repo.

## Copy the experience — do NOT reuse code/assets/fonts/copy

- **Copy only the experience/inspiration:** the *idea* of a position marker; the *idea* of typography that responds to focus; fixed per-item variation instead of per-frame randomness.
- **Do not reuse:** the fetched `/css/_.css`, `/js/_.js`, `/r.json`, Nuxt/Webflow/OGL bundles or any shader string; the `S5`/`E1` implementations, constants (`0.32`, `0.36`, `12.9898`, `43758.5453`, `140/520/1100/1760`) and class names; any imagery, video or audio; the fonts Feature Display, ABC Synt Mono, SuomiHand Script, Inter Tight or their loading setup; the words "NOTES / MELODY / OVERTURE / JAZZ", project names, taglines, the teardown's prose, award marks and the saved screenshots. All static translations above are re-derived from scratch and use only the repo's existing tokens and system fonts.

## Verdict

**Recommended (2):** scroll-linked decorative playhead readout (CSS-only, gated); letter-spread on `:hover`/`:focus-visible` for non-nav index labels (CSS-only).

**Rejected (6):** bar-wipe/JAZZ menu + intro gate; annotations layer; wet-paint smear; JazzKeys keyboard play; Bittercreek randomized hover thumbs; Mathilde click-to-expand slide — reasons: navigation movement/loading gate, licensed assets + shortcut hijack, pointer-only WebGL, key hijacking + second signature interaction, pointer-only randomness, and hidden content + WebGL without expand semantics respectively.
