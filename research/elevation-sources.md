# Elevation sources — a second set of Awwwards-grade portfolio references

Wayfinder ticket #11 (part of #10). Research date **2026-11-25**. All observations below are from (a) award pages on awwwards.com, (b) real HTML/CSS/JS bundles fetched with `curl` into the shared scratch directory **outside** the repo, (c) live DOM/computed-style measurements at a 1280×800 viewport, and (d) first-paint screenshots at 1280×800. No third-party assets, code or marketing copy were copied into this repository; this document records principles and measurements only. The eight earlier references (brunoarizio.com, giats.me, minhpham.design, benhays.dev, rauno.me, joshwcomeau.com, leerob.com, nathansmith.design) are excluded; `bruno.io` below is a different site (Bruno Simon) and is explicitly award-verified.

Raw sources: `.scratch/refs2-src-identity2/` (shared scratch, gitignored). Measurements: `.scratch/elevation-shots/refs2/identity2_metrics.json`. Browser sessions used an isolated named session; the harness prepends an emoji to `document.title`, so every title was cross-checked against `curl`'s raw `<title>` (e.g. Hello Monday `Hello Monday` vs `🐴 Hello Monday`) [P1–P7, D1].

## Source key (award evidence)

- **A1** Active Theory — https://awwwards.com/active_theory : 84 works, 3 SOTY, 11 SOTM, 60 SOTD; examples include Active Theory V6, Developer Award + SOTD 2026-11-11.
- **A2** Immersive Garden — https://awwwards.com/immersivegarden : 94 works, 68 SOTD, 13 SOTM; Cartier Watches & Wonders 2026 Developer Award + SOTD 2026-05-25.
- **A3** Hello Monday — https://awwwards.com/hellomonday and https://awwwards.com/sites/hello-monday : 53 SOTD, 2 SOTY; own site SOTD 2019-10-07, other work Developer Award + SOTD 2023-12-18.
- **A4** Lusion — https://awwwards.com/lusion : Lusion v3 is Developer Award + **Site of the Year 2023**; EverSwap Developer Award + SOTD 2026-06-22.
- **A5** Resn — https://awwwards.com/resn : 62 SOTD, 11 SOTM; Squarespace Foundations Developer Award + SOTD 2026-09-01.
- **A6** Robin Payot — https://awwwards.com/sites/robin-payot-portfolio (SOTD 2022-04-01) and https://awwwards.com/sites/robin-payot (SOTD 2018-02-24).
- **A7** Bruno Simon — https://awwwards.com/sites/bruno-simon-portfolio : SOTD 2019-11-11, score 8.04/10; Awwwards highlights its 3D game project navigation.

## Site table

| # | Site | URL | Source files actually inspected (all under `.scratch/refs2-src-identity2/`) | First-paint screenshot (1280×800) | Date |
|---|---|---|---|---|---|
| 1 | Active Theory | https://activetheory.net/ | `activetheory.html` (5.9 KB), `activetheory_app.txt` = `assets/js/app.1780406240914.js` (1.82 MB), `activetheory_uil.txt` = `assets/data/uil.1780406240914.json` (223 KB), `activetheory__assets_meta_manifest.json` | `.scratch/elevation-shots/refs2/identity2_activetheory.png` | 2026-11-25 |
| 2 | Immersive Garden | https://immersive-g.com/ | `immersivegarden.html` (233 KB), `assets_entry.CU8H-nqP.css` (11 KB), `assets_HeroBlock.BetzaiHB.css` (25 KB), `assets_entry.DyxL_KXi.js` (2.44 MB), `assets_HeroBlock.DoznkBHg.js` (10.6 KB), `_payload.json` (59 KB) | `.scratch/elevation-shots/refs2/identity2_immersivegarden.png` | 2026-11-25 |
| 3 | Hello Monday | https://www.hellomonday.com/ | `hellomonday.html` (229 KB), `build_css_bundle-c856abf032.css` (152 KB), `build_js_main-187ce11faa.js` (2.07 MB) | `.scratch/elevation-shots/refs2/identity2_hellomonday.png` | 2026-11-25 |
| 4 | Lusion | https://lusion.co/ | `lusion.html` (60 KB), `_astro_about.CNa9RfUh.css` (90 KB), `_astro_hoisted.CUO_IjfL.js` (1.25 MB) | `.scratch/elevation-shots/refs2/identity2_lusion.png` | 2026-11-25 |
| 5 | Resn | https://resn.co.nz/ | `resn.html` (4.3 KB), `20260721233115_1_0_a02666f_css_critical_mobile.css` (243 B), `.../js/libs/es6-shim.min.js` (57 KB), `.../js/libs/modernizr-2.5.3.min.js` (15 KB), `resn_loader_js.txt` = `.../js/loader.js` (246 KB) | `.scratch/elevation-shots/refs2/identity2_resn.png` | 2026-11-25 |
| 6 | Robin Payot | https://robinpayot.com/ | `robinpayot.html` (8.8 KB), `main.fc8479f1eef2be9b39d9.css` (41 KB), `bundle.fc8479f1eef2be9b39d9.js` (1.21 MB) | `.scratch/elevation-shots/refs2/identity2_robinpayot.png` | 2026-11-25 |
| 7 | Bruno Simon | https://bruno.io/ | `brunosimon.html` (28.6 KB), `css_main.css` (71 KB), `js_main.js` (4.8 KB), `js_particles.min.js` (23 KB), plus `js_jquery.min.js`, `js_jquery.scrollex.min.js`, `js_jquery.scrolly.min.js`, `js_skel.min.js`, `js_util.js`, `js_decrypt.js` | `.scratch/elevation-shots/refs2/identity2_brunosimon.png` | 2026-11-25 |

Capture protocol: new isolated browser tab, `Emulation.setDeviceMetricsOverride` to 1280×800 at DPR 1, navigate, wait 8–18 s for first paint, then CDP `Page.captureScreenshot` to the paths above. Files named `identity2_*_dom.png`, `identity2_*_noload.png`, `identity2_*_nosurface.png` in the same folder are **diagnostics only** (they remove overlays/canvas and are not first paint). Extra probes `identity2_basedesign.png` and `identity2_ohzi.png` exist but are not in the table: their award provenance is weaker (Base Design has one SOTD in its Awwwards submissions; OHZI has Awwwards honorable mentions but no verified SOTD), so they were not promoted [A1–A7, D1, P1–P7].

## Above-the-fold mechanics decode

Citations: `S#` = files in the table's source-file column, `D1` = `identity2_metrics.json` computed-style measurements, `P#` = screenshot of the corresponding table row, `A#` = award evidence above.

### 1. Active Theory — data-driven stage, no DOM hero
- One `#Stage` fills exactly 1280×800 with computed background `rgb(0,0,0)`; even after 14 s there is no canvas element and no `h1` text in the DOM — the hero is script-generated, so the honest first paint in this harness is black [D1, P1].
- The page preloads then asynchronously injects a single app bundle; the app bundle contains a Hydra-style runtime with explicit WebGL context-loss handling and a `graphics.webgl()` capability check [S1: `activetheory.html` inline bootstrap; `activetheory_app.txt`].
- Scene appearance is data, not hand-authored markup: a 223 KB JSON supplies shader colours (`#C64DFF`, `#422EA3`), 3D text font sizes (`0.28` for home, `0.075` for about) and line heights around 1.1–2 [S1: `activetheory_uil.txt`].
- Fonts are self-hosted NBArchitektStd Regular/Light/Bold in woff2+woff with an optionality/feature-detect block and an unsupported-page redirect for older engines; no `@font-face` for system fallbacks [S1: `activetheory.html` inline CSS + bootstrap, `activetheory_app.txt`].
- Takeaway: a single preloaded script plus a scene-data JSON is a tidy loading strategy, but it makes first paint entirely dependent on JS — the inverse of a resilient portfolio [S1, P1].

### 2. Immersive Garden — full-viewport WebGL behind a typographic hero
- Body field is `rgb(232,232,232)`; a canvas is absolutely positioned at 0,0, 1280×800; the first `h1` is PSTimes serif, 49.78px, colour `rgb(3,3,3)`, box x=121/y=640/w=511/h=219 — i.e. the headline sits low in the viewport, not centred [D1, P2].
- Hero rules: `hero` is a flex column, `height:100vh`, `justify-content:flex-end`, `padding-bottom:12.5vw`; text blocks use `min-height:100vh` with ~11.11vw top/bottom padding — spacing scales with viewport width, not fixed pixels [S2: `assets_HeroBlock.BetzaiHB.css`, hero and textBlock rules].
- Scroll space exists below the fold: project sections begin at y≈2412, 3983 and 5719 with heights ≈1109, 1274 and 1717; the document reports 800px only because a `lockScroll` class is applied while the intro loader is active [D1].
- Motion: media opacity transition 1.9 s ease-in-out, Vue enter/leave 0.5 s, and GSAP 3.12.5 is bundled; hero-specific tweens run `offset` 2 s `power2.out` and `opacity` 1.8 s with staggered letters. The `h1` carries a WebGL-title hook, so DOM text and shader text are paired [S2: `assets_HeroBlock.BetzaiHB.css` L1; `assets_entry.DyxL_KXi.js`; `assets_HeroBlock.DoznkBHg.js`].
- Layer/loading strategy: a `introLoader ... lockScroll` element covers the viewport at `z-index:1010`; in the harness it never clears, so the genuine first-paint screenshot is a black veil. Removing it diagnostically still yields black because the WebGL canvas is the visual layer [D1, P2].

### 3. Hello Monday — one-screen module system, canvas media, long CSS
- Body is white; a canvas occupies x=63/y=0/w=1155/h=800; the hero module is `height:100vh` with `max-height:667px`; a separate black `Intro` layer is absolutely 100vh and the capture shows that veil [D1, P3].
- Type: base `h1` is 20px ClarendonBTWXX-Light, with an 80px desktop override in the same bundle; body copy is 12px with 1.29 line-height and Clarendon is loaded through myfonts [S3: `build_css_bundle-c856abf032.css`, h1/ErrorPage rules; D1].
- Layer stack: `HeroModule`, `CaseGridModule`, `DeepDiveSplashModule` are sequential sections; overlays at `z-index:665` (menu bulge) and `z-index:10` (background renderer) sit above them; at capture their measured heights were 0 because the app had not advanced past its intro [D1, P3].
- Motion: lazy images/videos fade over 0.5 s with 0.3 s delay, some transitions use a cubic-bezier around (.25,.46,.45,.94) with 0.1 s delay; the JS bundle contains PixiJS + shader creation and a TweenLite/GSAP-style ticker [S3: CSS transition rules; `build_js_main-187ce11faa.js`].
- Loading: CSS and the 2.07 MB main JS are both preloaded in `<head>`; analytics is Plausible, not a heavy tag manager [S3: `hellomonday.html` head; table].

### 4. Lusion — fixed canvas, explicit grid positions, tokenised palette
- Body is white; the hero is `calc(var(--vh,1vh) * 100)` tall with grid rows `auto 1fr`; the visual container spans columns 1–12 while the title spans 4–5. Measured `h1`: Aeonik 32px at x=358/y=50/w=465/h=106. Header is 146px tall at `z-index:52`; a fixed canvas fills 1280×800 at `z-index:100` and another overlay sits at `z-index:200` [D1, S4: `assets_entry`/`_astro_about.CNa9RfUh.css`, `#home-hero`, `#home-hero-title`, `#header`, `#header-background` rules].
- Tokens: root custom properties define an off-white `#f0f1fa`, white `#fff`, dark-white `#e4e6ef`, an error red `#e90000`; fonts are Aeonik, IBM Plex Mono and LusionMono, all `font-display:block`; fluid display sizing reaches `clamp(7em,8vw,20em)` in the utility type scale [S4: CSS `:root`, `@font-face` and `.text-4xl` rules].
- Motion timings are short and specific: colour transition 0.25 s, header-background opacity 0.4 s with 0.4 s delay, logo colour 0.5 s; the JS bundle is Three.js (MIT license header, WebGLAnimation/requestAnimationFrame loop) [S4: CSS transition rules; `_astro_hoisted.CUO_IjfL.js`].
- The true first paint here is a **black preloader**: a centred grey progress bar with a white fill and a large `00/46` counter bottom-left. This is load state, not the hero; it demonstrates an explicit, numeric progress affordance [P4].

### 5. Resn — 4 KB shell, inline critical CSS, module loader
- Body is `rgb(0,0,0)`; two canvases fill 1280×800; a `rootNode` wrapper is at `z-index:100` and a `js-loader loader` at `z-index:10` with an inline `lockScroll`-style setup. No `h1` exists in the static HTML [D1, P5].
- Inline critical CSS gives the loader a 24×22 px drop (30×30 in landscape) and a 1 px bottom bar using `rgb(40,40,40)` for the track and white for the fill; the only linked critical stylesheet is 243 bytes [S5: `resn.html` inline `<style>`, `critical_mobile.css`].
- Delivery is progressive: ES6 shim + Modernizr are classic scripts, then RequireJS (`data-main` pointing at `js/loader`) loads the rest. The loader bundle is 246 KB and contains device detection, Underscore helpers and jQuery-era utilities [S5: `resn.html` tail; `resn_loader_js.txt`].
- First paint is near-black with the canvas layer visible; this is a deliberately dark, loader-first shell rather than a content-first hero [P5, D1].

### 6. Robin Payot — pinned viewport plus 15,000 px of scroll space
- Document scroll height is **15,000 px** while a `fixed-container` section stays 800 px tall at `z-index:200` and a `scene` section sits at `z-index:11` with an 1280×800 canvas — the canonical "fixed stage, long scroll runway" arrangement [D1, P6].
- Measured `h1`: Roadgeek 42px, `letter-spacing:2.52px`, colour `rgb(67,67,67)`, box x=501/y=206/w=279/h=50. CSS defines display sizes from 24px at ≤900px to 50px/144px at larger breakpoints and letter-by-letter split-text delays of 0.04 s increments [D1, S6: `main.fc8479f1eef2be9b39d9.css`, `.t-h1` and `.split-text__letter` rules].
- A scroll cue fades over 0.5 s linear with a 1.5 s delay; project containers use `height:100vh`; the bundle contains Three.js exports (VideoTexture, WebGLRenderTarget) and GSAP [S6: CSS `.scene__scroll-text` / `.project__container` rules; `bundle...js`].
- Fonts are self-hosted woff2 (Roadgeek, Silka, `font-display:swap`) plus Google IBM Plex Sans/Lato; first paint observed here is a clean white field with a thin hand-drawn sine-like line and a cookie banner — the WebGL name has not appeared yet [S6: CSS `@import`/`@font-face` rules; P6].

### 7. Bruno Simon (bruno.io) — full-bleed hero, 56 px chrome bar, particle canvas
- A 56 px navigation bar spans the width at `z-index:10000`; the hero wrapper occupies y=56…816 (760 px) with a canvas at the same size; a second section starts at y=816 with height 627 px, and total scroll height is 1,587 px [D1, P7].
- Hero type is plain Arial/Helvetica at 44px, white, box x=64/y=242/w=1152/h=66, over a full-bleed autumn-tunnel photograph; the first paint shows a 3-line dictionary-style subhead and a pill CTA [D1, P7, A7].
- Palette is unusually explicit: body `#031634` (navy), hero wrapper `#556270` (slate), white type; CSS uses `100vh` fullscreen wrappers and 0.2 s ease link transitions [S7: `css_main.css` body/wrapper/link rules; D1].
- Motion is library-based rather than shader-based: a 23 KB particles script creates its own canvas and exposes grab/bubble/repulse modes with 0.4 s durations; `main.js` initialises smooth scrolling with speed 1000 [S7: `js_particles.min.js`, `js_main.js`].
- Loading is classic script tags (jQuery, skel, util, particles) with no module graph; Awwwards specifically highlights its 3D game-style project navigation, while the current live hero is a static photograph plus DOM type [A7, S7, P7].

## Ranked shortlist — 3 ideas transferable to a software/hardware engineer portfolio

1. **A fixed instrument stage over a long, scroll-driven runway.** Robin Payot's 15,000 px document with an 800 px pinned viewport and z-separated stage/scene is the clearest pattern to borrow: keep one deterministic visual (a signal trace, constellation or timeline) pinned while ordinary HTML sections scroll past it, and use scroll position only to update a labelled parameter readout [S6, D1, P6, A6]. For an engineer portfolio this maps directly onto "show the measurement, not the movie": the range control and BER readout stay keyboard-operable and never gate the content.

2. **One-screen, grid-positioned hero with a single reserved accent.** Lusion's viewport-height grid (visual columns 1–12, title 4–5), short 0.25–0.5 s transitions and a tokenised off-white/red palette — paired with Bruno Simon's 56 px utility bar, 44 px display type and 760 px full-bleed stage — demonstrate that hierarchy and spacing, not effect count, carry the first impression [S4, S7, D1, P4, P7, A4, A7]. A hardware/ECE portfolio can achieve the same with a system font stack, an inline SVG trace and a 4 px spacing scale, avoiding the 1–2 MB WebGL bundles those studios ship.

3. **Make loading and configuration legible instead of decorative.** Lusion's progress bar plus `00/46` counter and Active Theory's single preloaded bundle fed by a scene-data JSON both expose state: the viewer sees that work is happening and what it is [S1, S4, P4, A1, A4]. The transferable principle is a single source of truth for content/interaction parameters (one small config, deterministic output, visible status text) with a real no-JS fallback — not a loading veil that hides the name and links.

## Caveats

- Four of the seven genuine first paints (Active Theory, Immersive Garden, Hello Monday, Resn) are dark/veiled in a headless CDP capture because their intro loaders or WebGL canvases never complete; the screenshots are kept as the honest first paint, and the DOM evidence above distinguishes "stuck loader" from "blank page" [P1, P2, P3, P5, D1].
- Bruno Simon's hero contains a third-party photograph and Lusion's first paint shows a third-party counter; neither asset, typeface, colour token value as artwork, nor any copy was imported into this repository — only measurements and principles are recorded here [P4, P7, S4, S7].
