# Ticket #30 — Award-site interaction research for Index Object

**Branch:** `research/index-object-polish` · **Scope:** research only; no variant code, fonts, assets or copy are changed here.
**Corpus rule:** named sites only, all primary-fetched. HTML and the real CSS/JS bundles were downloaded to
`/Users/leelanshkharbanda/.hermes/cache/scratch/index-object-polish-refs/` (outside the repo) and inspected there.
Manifest: `manifest.json` in that directory. No secondary-only claim is used; where only an Awwwards page was
provided, the claim is limited to that page's award metadata and named Elements.

## Provenance (primary fetches)

| Key | URL fetched | Saved | HTTP / bytes |
|---|---|---|---|
| maria | `https://www.mariavasilyeva.com/` | `maria.html`, `maria_asset00.css`, `maria_asset01.js` | 200 / 45,730 HTML; 30,256 CSS; 313,553 JS |
| maria award | `https://www.awwwards.com/sites/maria-vasilyeva-portfolio` | `maria_awwwards.html` | 200 / 399,735 |
| bittercreek | `https://www.bittercreek.studio` | `bittercreek.html`, 15 bundle files | 200 / 77,133 HTML; ~1,251,002 bundles |
| bittercreek case | `https://awwwards.com/bittercreek-studio.html` | `bittercreek_case.html` | 200 / 223,949 |
| bittercreek award | `https://www.awwwards.com/sites/bitter-creek` | `bittercreek_awwwards.html` | 200 / 429,447 |
| artemii | `https://www.awwwards.com/sites/artemii-lebedev-1` | `artemii.html` | 200 / 379,793 |
| mathilde | `https://www.mathildedechiara.com/` | `mathilde.html`, 4 bundle files | 200 / 5,395 HTML; 681,295 bundles |
| mathilde award | `https://awwwards.com/sites/mathilde-de-chiara-portfolio` | `mathilde_awwwards.html` | 200 / 289,296 |
| mathilde elements | `https://awwwards.com/inspiration/infinite-draggable-grid-mathilde-de-chiara-portfolio` | `mathilde_elements.html` | 200 / 304,229 |
| eva case | `https://awwwards.com/eva-sanchez-portfolio-the-result-of-a-collaboration-case-study.html` | `eva_case.html` | 200 / 233,013 |

## Per-site table

| Site | Award evidence (primary) | Fetched bundle facts | Mechanism | Information / orientation job | Weight | a11y risk | Static translation | Keep / reject |
|---|---|---|---|---|---|---|---|---|
| **Maria Vasilyeva** | Awwwards **SOTD 9 Oct 2026, 7.28/10** (Design 7.31, Usability 7.02, Creativity 7.56, Content 7.33) — `maria_awwwards.html` | Single `/js/_.js` 313,553 B + `/css/_.css` 30,256 B; JS has `playhead=0`, `setPlayhead()`, `notes.ogg` via `AudioContext`/`decodeAudioData`, global `pointerdown/mousemove/touchmove`, rAF, GLSL with `pitch` uniform, `translateX()` ghost tracks; CSS has `body.str`, `[data-gl-text]{color:#0000}` (DOM text transparent, drawn in GL), `#h-cta:hover` `transition:letter-spacing 1.4s` | Scroll-linked playhead crossing a five-line staff; hover plays a note; CTA letter-spread on hover | Daubed as musical "score" navigation, but the playhead carries only scroll extent; no named section or record | Heavy (WebGL + audio + rAF) | `aria-hidden` playhead; hover/pointer-only sound; primary text hidden in canvas; letter-spacing on hover changes type metrics | Not feasible ≤10KB JS without discarding the metaphor | **REJECT all**; keep only the abstract idea that a catalogue row can carry a visible name/code (already in our index) |
| **Bittercreek Studio** | Awwwards **SOTD 11 Sep 2025, 7.47/10** (Design 7.69, Usability 7.19, Creativity 7.46, Content 7.49) — `bittercreek_awwwards.html`; case study by Malvah Studio — `bittercreek_case.html` | Webflow + GSAP 3.12.7 (`gsap.min.js` 72,304 B, `ScrollTrigger` 43,974 B, `Flip` 25,004 B, `CustomEase` 7,137 B), Plyr 113,183 B, Lottie 305,543 B, jQuery 89,476 B, Webflow CSS 143,160 B; total ~1.25 MB fetched | Case study: "smart indexing system with **project codes** to make navigation intuitive", plus **filters**; also randomized hover thumbnails and click-and-hold screen inversion revealing a 3D element | Real information job: the code + filter tells you *which kind* of work you are looking at and how many records exist | Heavy (library stack) | Randomized hover thumbnails are pointer-only and unpredictable; hold-to-invert hijacks input and hides content; GSAP Flip moves layout | **Project codes + filters translate statically** with native buttons and a named count, no GSAP/Lottie/WebGL | **KEEP the code/category indexing idea (translated). REJECT** randomized hover thumbnails and hold-to-invert 3D |
| **Artemii Lebedev** | Awwwards **SOTD 22 Nov 2026, 7.27/10** (Design 7.46, Usability 7.03, Creativity 7.21, Content 7.39) — `artemii.html` | Award page only; tech listed as GSAP / Webflow / JavaScript. Elements named: *Channel Surfing* (scroll), *Expandable Navigation* (menu), *Mobile Scroll Experience*, *Interactive Work Gallery*. No site bundle fetched, so no bundle claim is made | Scroll "channel surfing" and an expanding navigation that names destinations | The nav element names real sections, but the motion is navigation movement, which the map rejects | Unknown (bundle not fetched) | Expanding/moving nav risks focus jumps and is pointer-biased; scroll "surfing" is scroll theatre | The *section naming* translates into a fixed readout; the expansion does not | **REJECT the animation; KEEP only the named-section cue.** No award-page asset or copy reused |
| **Mathilde de Chiara** | Awwwards **Honorable Mention 30 Sep 2026** — `mathilde_awwwards.html`. Elements: *Category filter dezoom* (Navigation), *Infinite draggable grid* (Mouse Interaction: "drag infinite grid inertia slider grid"), *Wheel driven slider distortion*, *Click to expand project slide*, *Project mosaic intro* — `mathilde_elements.html` | 5,395 B HTML shell loading `/assets/index-D88q76o1.js` 308,515 B; `vendor-gsap` 130,383 B, `vendor-ogl` 63,255 B, `vendor-react` 179,142 B; bundle contains `u_distortionAmount`, `uSphere`, OGL canvas with `touch-action:none`, smooth-wheel/touch-inertia logic, GSAP timeline label `dezoom`, `webglcontextlost` handler, CSS-in-JS `.grid-overlay`, `.slider-overlay__category` at `font-size:.75vw` (mobile `max(10px,.75vw)`) | Category filter with a dezoom transition; infinite draggable/inertial WebGL grid; wheel-driven distortion | The **category name** is a genuine orientation cue ("which set am I in"); the dezoom/drag/distortion are presentation, not information | Very heavy (~681 KB bundles) | WebGL-only, pointer drag + wheel hijack, `touch-action:none`, viewport-relative type metrics, no keyboard path, no static final frame | Category naming + count translates to `<button aria-pressed>` + text; effects are not translatable ≤10KB | **KEEP the category-name cue (translated). REJECT** draggable grid, dezoom, wheel distortion, WebGL |
| **Eva Sánchez** | Case study only (`eva_case.html`); **no award badge asserted** because the fetched page shows none | No site bundle provided or fetched; evidence is the case-study prose | WebGL/shader "liquid" fonts, fractal gallery deformation, text-reveal, and two project views (gallery/list) | Two project **views** is a real informational choice; liquid titles and fractal blur are identity theatre | Heavy (shaders) | Font deformation changes type metrics; WebGL title rendering breaks text selection/AT; no static translation claimed | The two-view choice can be a plain labelled toggle; shader typography cannot | **REJECT WebGL typography. KEEP only the principle that a view/state should be named, not merely animated** |

## Explicit application of the four-part production-grade test (map §Notes, line 9)

All four must pass. "Static frame" means the complete end state exists without JS or motion.

| Candidate | (1) Visible label / named orientation cue, not scrollbar position? | (2) Zero shift outside component, CLS ≤0.1? | (3) Tab + Enter/Space + touch, state exposed to AT? | (4) No type-metric changes? | Verdict |
|---|---|---|---|---|---|
| Maria scroll playhead | **FAIL** — it is a `scaleX` of scroll progress; no name (`aria-hidden`) | Pass (compositor transform) | **FAIL** — `aria-hidden`, no control | Pass | Theatre → reject (maps to F05 / E17) |
| Maria hover note / `notes.ogg` | Fail (no label) | Pass | **FAIL** — hover/audio-primary, excluded by map | Pass | Reject |
| Maria CTA letter-spread | Fail | Pass | Fail (hover-only) | **FAIL** — `letter-spacing` transition | Reject — matches the user's rejected pattern |
| Maria GL-rendered text (`color:#0000`) | Fail | Pass | **FAIL** — primary content hidden from DOM/AT | **FAIL** if pushed through GL | Reject |
| Bittercreek project codes + filters | **PASS** — code and "N of M in category" are named text | **PASS** if filter is a no-reflow scope lens (fixed-height component) | **PASS** — native buttons, `aria-pressed`, `aria-live` count | **PASS** — colour/label only | **Recommended #1** (translated) |
| Bittercreek randomized hover thumbnails | Fail | Pass | **FAIL** — pointer-only, random position, unpredictable | Pass | Reject (explicit out-of-scope pattern in map) |
| Bittercreek hold-to-invert 3D | Fail | Pass | **FAIL** — hold hijack, hidden 3D, no keyboard | Pass | Reject |
| Artemii expanding navigation | Pass (names sections) | **FAIL** — moving nav shifts content | Partial | Pass | Reject as animation; translate the naming |
| Mathilde category name | **PASS** — names the active category | **PASS** as text | **PASS** as button + pressed state | **PASS** | Folded into Recommended #1 |
| Mathilde draggable grid / dezoom / distortion | Fail (motion only) | **FAIL** (mesh movement) | **FAIL** — drag/wheel only, `touch-action:none` | **FAIL** — `.75vw` type | Reject |
| Eva liquid-font title | Fail | Fail (reflow) | **FAIL** — WebGL text | **FAIL** — glyph deformation | Reject |
| Current Index Object `.index-playhead` | **FAIL** — scroll-linked `scaleX`, `aria-hidden`, duplicates scrollbar | Pass | **FAIL** — no control, no state for AT | Pass | **REJECT / remove** (F05, E17) |

**Scope rule (map §Notes, line 10):** exactly one primary informational mechanic plus at most one passive orientation
cue naming a real section. The two recommendations below are that pair. Nothing else is retained.

## Recommended mechanic 1 (primary informational) — named scope lens with a live count

**Inspiration, not copy:** Bittercreek's project-code indexing and filters, and Mathilde's *Category filter* naming.
The corpus *filters/removes*; we deliberately translate that into a **no-reflow scope lens** so E01/E05/E12 hold.
All eight records stay in the DOM, readable and focusable; the selected scope is a named, countable state.

Concrete sketch on `variants/index-object/` (for a future ticket — not implemented here):

```html
<div class="scope" role="group" aria-label="Index scope">
  <button class="scope__btn" type="button" data-scope="all"     aria-pressed="true">All</button>
  <button class="scope__btn" type="button" data-scope="deep"    aria-pressed="false">Deep dives</button>
  <button class="scope__btn" type="button" data-scope="archive" aria-pressed="false">Archive</button>
  <p class="scope__status mono" id="scope-status" aria-live="polite">ALL · 8 OF 8 RECORDS</p>
</div>
<!-- each existing li gains data-scope="deep"|"archive"; no markup is removed -->
```
```css
.scope__status { min-block-size: 1.5rem; margin: 0; }      /* reserve the label's box */
.index-entry.is-out .index-entry__title { color: var(--muted); } /* colour only */
@media (forced-colors: active) { .index-entry.is-out .index-entry__title { color: CanvasText; } }
```
```js
const btns = [...document.querySelectorAll('.scope__btn')];
const rows = [...document.querySelectorAll('.index-entry')];
const status = document.getElementById('scope-status');
const names = {all:'ALL', deep:'DEEP DIVES', archive:'ARCHIVE'};
function setScope(k){
  for (const b of btns) b.setAttribute('aria-pressed', String(b.dataset.scope === k));
  let n = 0;
  for (const r of rows){ const on = k === 'all' || r.dataset.scope === k;
    r.classList.toggle('is-out', !on); if (on) n++; }
  status.textContent = `${names[k]} · ${n} OF ${rows.length} RECORDS`;
}
btns.forEach(b => b.addEventListener('click', () => setScope(b.dataset.scope)));
```

**Final frames:** *keyboard* — Tab reaches three native buttons; Enter/Space fires `click`; `aria-pressed` and the
`aria-live` count update; no global `keydown`, no trap; focus stays on the pressed button. *touch* — tap runs the
identical `click` handler on the 390px touch viewport; target ≥44px. *reduced-motion* — instant colour/label change,
no transition or animation. *no-JS* — `html.no-js .scope{display:none}`; the seeded status `ALL · 8 OF 8 RECORDS`
and all eight full-strength rows remain in the initial HTML (E05). E18 N/A — nothing opens or reveals a control.

**Byte estimate:** JS ≈ 0.6 KB raw / ≈ 0.35 KB gzip; CSS ≈ 0.5 KB; HTML ≈ 0.6 KB → **≈ 1.7 KB raw added**,
comfortably inside E13 (unique JS <20 KB raw, <8 KB gzip; page <60 KB — current index HTML 11.1 KB + CSS 18.1 KB).

## Recommended mechanic 2 (passive orientation cue) — named section readout

**Inspiration, not copy:** Artemii's *Expandable Navigation* section naming and Mathilde's *Category filter* label.
Rejection of the expansion/animation is explicit; only "name the real section" survives.

```html
<p class="orientation mono" id="orientation" data-default="INDEX">NOW VIEWING · INDEX</p>
<!-- real sections already carry id="index"|"notes"|"about"|"contact" and data-orientation labels -->
```
```css
.orientation { min-block-size: 1.5rem; margin: 0; }   /* fixed box: no CLS */
html.no-js .orientation { display: none; }            /* hide stale cue when it cannot update */
```
```js
const out = document.getElementById('orientation');
const links = [...document.querySelectorAll('.site-nav a')];
const io = new IntersectionObserver(es => { for (const e of es) if (e.isIntersecting){
  const name = e.target.dataset.orientation; out.textContent = `NOW VIEWING · ${name}`;
  for (const a of links) if (a.getAttribute('href') === '#' + e.target.id)
    a.setAttribute('aria-current', 'location');
  else a.removeAttribute('aria-current');
}}, { rootMargin: '-45% 0px -45% 0px' });
document.querySelectorAll('[data-orientation]').forEach(s => io.observe(s));
```

The cue names a **landmark**, not a scroll percentage, so it passes test (1) and is not a second playhead.
AT receives orientation through `aria-current="location"` on **exactly one** nav link (this does not reintroduce
F02's dual `aria-current`; #31 resolves the duplicate `#projects`/`#index` target separately). The readout itself is
deliberately **not** a live region, to avoid scroll chatter.

**Final frames:** *keyboard* — Tab/Shift+Tab never triggers a global handler; Enter on a nav link moves focus with
native anchor semantics and the cue updates on intersection. *touch* — tapping a nav link produces the same named
state. *reduced-motion* — text substitution only; no fade, no transform, no rAF. *no-JS* — cue hidden; the `h1`,
section `h2`s and landmarks supply orientation, and no false "NOW VIEWING" claim is left on screen.

**Byte estimate:** JS ≈ 0.7 KB raw / ≈ 0.4 KB gzip; CSS ≈ 0.4 KB; HTML ≈ 0.6 KB → **≈ 1.7 KB raw added**.
Combined additions ≈ 3.4 KB raw / ≈ 0.75 KB gzip, leaving E13 headroom intact.

## Explicit rejection of decorative theatre

- **Current `.index-playhead` (F05): REMOVE.** It is `animation-timeline: scroll(root block)` driving
  `transform: scaleX()`, `aria-hidden="true"`, and it duplicates the browser scrollbar. It fails test (1)
  (no text/named cue), test (3) (no operable control, no AT state) and is exactly the "scrollbar duplication"
  forbidden by E17/map line 10. Its reduced-motion/no-support `scaleX(1)` "final frame" is still a percentage bar,
  so it cannot be redeemed as a section cue; replace the element, do not redefine it.
- **Rejected corpus mechanics, with reasons:** Maria's playhead, hover note, letter-spread CTA and GL-only text;
  Bittercreek's randomized hover thumbnails and hold-to-invert 3D; Artemii's expanding/moving navigation and
  channel-surfing scroll; Mathilde's draggable grid, dezoom, wheel distortion and OGL canvas; Eva's liquid/fractal
  WebGL titles. Each fails at least one of the four tests or an explicit map exclusion (audio feedback, WebGL-only,
  key/pointer hijack, hidden primary content, loading gates, type-metric change, navigation movement).
- **No "one more small effect":** the scope rule is binary. If a future review wants an extra flourish, it must
  first displace one of the two recommendations.

## Copy-vs-inspiration boundary

Inspiration is limited to two abstract behavioural principles: **(a)** a record/category may carry a visible code
and a named, countable state; **(b)** a passive cue may name the current real section. Everything else is ours.
**No code, font, image, audio, build tool, CSS declaration string or sentence is reused.** In particular: no
`notes.ogg`/AudioContext, no GLSL, no GSAP/Flip/ScrollTrigger/Lottie/Plyr/jQuery/OGL/React/Webflow class names,
no `letter-spacing` hover, no `.75vw` type, no copy from the Awwwards case studies or Elements pages — those pages
are cited as *evidence of awards and mechanisms only*. The recommendations use native `<button aria-pressed>`,
`aria-live`, `IntersectionObserver` and existing variant tokens, and are written from scratch.
