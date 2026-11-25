# Technical Portfolio Research — Implementation Evidence

**Access date:** 2026-11-25  
**Capture window:** approximately 14:16–14:35 UTC  
**Scope:** three live public portfolios, their fetched HTML/CSS/JavaScript, representative runtime-loaded bundles, public source maps where available, one GitHub repository linked from a live portfolio, and one official Awwwards record.  
**App-code changes:** none. This document is research only.

## Method and evidence rules

- Live pages were read with WebFetch and independently fetched as raw HTML with `curl -fLsS --compressed`.
- Linked CSS and JavaScript were fetched directly from the URLs found in the live HTML. Runtime network logs were used to confirm which bundles and assets actually loaded.
- Byte counts below are **decompressed response-body sizes** saved by curl, not compressed transfer sizes. SHA-256 values identify the exact captures.
- Robin Payot publishes JavaScript and CSS source maps; their `sourcesContent` was inspected as primary source. Bruno Simon links an MIT-licensed source repository from the live “Behind the scene” panel; that repository was cloned at the recorded commit.
- A small in-app browser smoke test confirmed runtime globals, canvas/context presence, selected network requests, and console errors. It used a **525 × 593 CSS-pixel viewport**, so it is not a desktop performance benchmark.
- **[Observed]** means directly present in fetched HTML, CSS, JavaScript, source maps, repository files, HTTP metadata, or runtime output. **[Inference]** means an implementation or performance conclusion drawn from those observations. **[Limitation]** identifies something not established.

No screenshot was used as implementation evidence, and no substantial source code is reproduced here.

## Executive comparison

| Site | Why it is in the set | Observed stack | Signature behavior | Reduced-motion / fallback | Adaptation difficulty | Likely performance cost |
|---|---|---|---|---|---|---|
| Bruno Simon | Creative developer; unusually deep technical 3D portfolio | Vite; Three.js r187 WebGPU/WebGL renderer and TSL; GSAP 3.15.1; Rapier WASM physics; Howler | Full-viewport drivable 3D world, physics, raycast interactions, audio, quality tiers | Quality toggle and WebGL backend path; no OS reduced-motion path or non-WebGL fallback found | **High** | Very high: large entry bundle, many models/textures/audio files, physics, postprocessing |
| Robin Payot | Self-identified senior creative developer; source maps expose the implementation | Webpack; Three.js r113; GSAP 3.6.1; GLTF/DRACO; BMFont; Hammer.js; Hogan; Howler; detect-gpu; EffectComposer/SMAA/custom GLSL | Fixed WebGL canvas, 15,000 px scroll narrative, camera trail, particles, displacement transitions | Portrait-mobile rotate prompt; GPU-tier DPR/SMAA gating; no reduced-motion or WebGL-failure fallback found | **High** | High: continuous rendering, postprocessing, particle shaders, large asset set |
| Dennis Snellenberg | Official Awwwards Site of the Day and Developer Award recipient | Server-rendered HTML; jQuery 3.5.1; GSAP/ScrollTrigger 3.9.1; Barba 2.10.3; Locomotive Scroll; LazyLoad 17.6.1 | DOM/CSS portfolio with smooth scroll, full-page transitions, magnetic buttons, custom cursor, scroll reveals | Touch/mobile branches and native-scroll CSS fallback; no OS reduced-motion path found | **Medium** | Moderate: transform-based smooth scrolling, a persistent GSAP cursor tween, HTML page swaps |

**Selection result:** the set includes an Awwwards-recognized technical portfolio (Dennis), two creative developers (Bruno and Robin), two WebGL/WebGPU implementations, and one comparatively adaptable DOM/GSAP implementation.

---

## Fetch ledger

### Bruno Simon

| Artifact actually fetched | URL | Decompressed bytes | SHA-256 |
|---|---|---:|---|
| Live HTML | https://bruno-simon.com/ | 58,883 | `d241ce5dc5d436f6405e9bb5f5cea9d5705c6b5be46d5319608bb20b7f8a8cfb` |
| Entry bundle | https://bruno-simon.com/assets/index-DZgz1LCb.js | 3,819,170 | `82dbf4b254df072ef5ad45d79e6faa349cbfc5132d579adb2099e59056f42132` |
| Module-preload chunk | https://bruno-simon.com/assets/dist-BiW6BJVu.js | 27,737 | `11d383ba56cbd2b1d6353f617a2bb9572489dbceb98e70592ee5dbf8198edf71` |
| Runtime-loaded physics bundle | https://bruno-simon.com/assets/rapier-DfGXH9Do.js | 184,515 | `928ddb64fe11e7bf8c2c91e4acf1cd2f9c02f71ffc70a3c375039ad066c73c9c` |
| Live stylesheet | https://bruno-simon.com/assets/index-BM1b7eY0.css | 38,958 | `64c9ba4d28665f783069fd22f626149b6b876899869046546b861c8f8bcc591c` |
| Linked source repository | https://github.com/brunosimon/folio-2025 | cloned at `70764a94756cc4de564e493c8ba46c4b5fe03ed1` | commit dated 2026-11-04 |

**HTTP observations:** nginx returned HTTP 200 with gzip. The HTML, entry CSS, entry JS, and Rapier chunk report `Last-Modified: Wed, 04 Nov 2026 ...`. The HTML preloads a compressed GLB and three KTX textures and module-preloads `dist-BiW6BJVu.js`.

**Inspection status:** the live bundles are minified and do not expose a `sourceMappingURL`. The linked repository supplies readable source for the main architecture. The exact role of the small `dist-BiW6BJVu.js` chunk was not conclusively identified from its strings, so no library attribution is made for that chunk alone.

### Robin Payot

| Artifact actually fetched | URL | Decompressed bytes | SHA-256 |
|---|---|---:|---|
| Live HTML | https://robinpayot.com/ | 8,842 | `12a397d94e65405e0ba783966046911a78237618959fa78fac4166c6093c3745` |
| Main bundle | https://robinpayot.com/bundle.fc8479f1eef2be9b39d9.js?09c63737b326ad82a8e6 | 1,213,456 | `6915ff539cc28177144522330d083fb6de7c049c0b785211b58786cc3be479f4` |
| Public JS source map | https://robinpayot.com/bundle.fc8479f1eef2be9b39d9.js.map | 3,822,456 | `eddf801bcd0af7cf386427f3d36632f52a0ade6b7ad49f5ad236a4276b1fe36b` |
| Live stylesheet | https://robinpayot.com/main.fc8479f1eef2be9b39d9.css?09c63737b326ad82a8e6 | 41,208 | `4b38815b916d8de538dd09a287cbd4e0da6645e6f6b598287ddc73ed829ec408` |
| Public CSS source map | https://robinpayot.com/main.fc8479f1eef2be9b39d9.css.map | 51,686 | `4ff5078a67d2e45916eac098ba9b762139c322c2f623d6969b477c494e5c869e` |

**HTTP observations:** Apache returned HTTP/2 200. The bundle and stylesheet report `Last-Modified: Sun, 05 Oct 2025 21:27:39/42 GMT` and `Cache-Control: max-age=900`.

**Inspection status:** production JS/CSS are minified, but both publish source maps. The JS map contains 157 source entries with `sourcesContent`, including application modules, GLSL, Three.js r113, and GSAP 3.6.1. This is unusually transparent and allowed source-level verification rather than screenshot inference.

### Dennis Snellenberg

| Artifact actually fetched | URL | Decompressed bytes | SHA-256 |
|---|---|---:|---|
| Live HTML | https://www.dennissnellenberg.com/ | 39,582 | `55bf24dfc808fb519a105886513ac3b084838b8aace300a7e650f8d9b11e4726` |
| Application script | https://www.dennissnellenberg.com/assets/js/index-new.js | 36,812 | `7d997e8eed26c01228065ae0fe55a71ee812348429e5e54361947dc2407604aa` |
| Smooth-scroll library | https://www.dennissnellenberg.com/assets/js/locomotive-scroll.min.js | 47,164 | `351253ae16600278c6a8b3f4945424faeb2566b955e4cfb3dde7d61823194005` |
| Main stylesheet | https://www.dennissnellenberg.com/assets/css/style-new.css | 76,145 | `f671acedd82a707209dc9f8d82c16d2d08816bb0215c72bc6e0b094d981a81aa` |
| Component stylesheet | https://www.dennissnellenberg.com/assets/css/components.css | 2,544 | `62ed2651a7de51cae15e6fbca00f88f606e63c19b482d096e5036ab63e4f6eae` |
| Official Awwwards record | https://www.awwwards.com/sites/dennis-snellenberg | 358,341 | `dac9f7bdd9e6f11e5a1082b264cd1c6ece607fc69e507e09e908cf9034a073aa` |

**HTTP observations:** the site reports PHP 8.2.36 and Apache. `index-new.js` reports `Last-Modified: Thu, 14 Mar 2024 08:36:25 GMT`; the main stylesheet reports `Last-Modified: Mon, 17 Mar 2025 14:14:17 GMT`. The Awwwards page returned HTTP 200 with `Cache-Control: public, s-maxage=18000`.

**Linked third-party scripts confirmed by HTML and runtime network logs:**

- https://code.jquery.com/jquery-3.5.1.min.js
- https://cdnjs.cloudflare.com/ajax/libs/js-cookie/2.2.0/js.cookie.min.js
- https://cdnjs.cloudflare.com/ajax/libs/gsap/3.9.1/gsap.min.js
- https://cdnjs.cloudflare.com/ajax/libs/gsap/3.9.1/ScrollTrigger.min.js
- https://cdn.jsdelivr.net/npm/@barba/core@2.10.3
- https://cdn.jsdelivr.net/npm/vanilla-lazyload@17.6.1/dist/lazyload.min.js

These third-party files were runtime-loaded; the separately curl-fetched application files are the two local scripts and two local stylesheets listed above.

**Inspection status:** `index-new.js` is largely readable and commented. Locomotive Scroll is minified. No source map was found for the application script.

---

## 1. Bruno Simon — drivable Three.js portfolio

**Live URL:** https://bruno-simon.com/  
**Identity:** the live page calls Bruno a “creative developer” and describes the portfolio as a world to drive around. The page’s “Behind the scene” panel explicitly names Three.js, Rapier, Howler.js, and the source repository.

### Observed libraries and architecture

- **[Observed]** The HTML loads a Vite-style ES module entry and a module-preload chunk. The entry contains `__vite` markers, Three.js revision `187`, GSAP `3.15.1`, `WebGPURenderer`, TSL imports, Howler, GLTF/DRACO/KTX2 loaders, and a dynamic Rapier import.
- **[Observed]** The runtime-loaded `rapier-DfGXH9Do.js` is followed by `rapier_wasm3d_bg-bb0TTxsO.wasm` in the network log.
- **[Observed]** The linked repository’s `package.json` declares Three.js `^0.187.0`, GSAP `^3.15.1`, Rapier `^0.19.3`, Howler `^2.2.4`, and Vite `^8.3.5`.
- **[Observed]** `sources/Game/Rendering.js` constructs `THREE.WebGPURenderer` with `powerPreference: 'high-performance'`, conditional antialiasing, a capped pixel ratio, shadows, manual opaque/transparent sorting, and `setAnimationLoop` as the master ticker.
- **[Observed]** Rendering uses a Three.js `RenderPipeline`, TSL bloom, and a custom `cheapDOF` pass. High quality combines depth-of-field and bloom; low quality removes the depth-of-field stage and reduces bloom mip count.
- **[Observed]** Physics, camera/view, weather, audio, interactions, and rendering are separate systems subscribed to the same ticker with explicit priorities. The repository README documents this game-loop order.

### Behavior patterns

- **Scroll orchestration:** **[Observed]** This is not a conventional scroll narrative. The primary navigation is spatial: keyboard, gamepad, and touch drive a vehicle and camera through a fixed 3D world. HTML overlays provide menus, controls, achievements, project areas, and contact paths.
- **Canvas/WebGL:** **[Observed]** One full-viewport canvas is present. The renderer prefers WebGPU through Three.js and can use a WebGL backend; the options panel labels the active renderer.
- **Transitions:** **[Observed]** GSAP animates a shader-driven full-screen overlay for major reveals. The overlay uses a patterned mask, diagonal progress, and gradient colors rather than a simple CSS fade.
- **Cursor/hover physics:** **[Observed]** A `RayCursor` tests pointer rays against spheres, boxes, planes, and meshes, invokes enter/leave/down/up callbacks, and changes the canvas cursor to `pointer` over interactive objects. Pointer input supports mouse, touch averaging, and pinch distance.
- **Reveals:** **[Observed]** The world reveals content through spatial zones and interactive points. The intro and overlay are coordinated with resource loading and renderer initialization.
- **Shaders:** **[Observed]** Three.js TSL node materials and custom passes are used for bloom, depth-of-field, water/grid/material effects, and the patterned transition overlay.
- **Asset loading:** **[Observed]** Four critical assets are preloaded. A custom loader caches textures, KTX2 textures, Draco-compressed GLB models, and other resources; it reports progress and rejects on loader error. The runtime log showed Draco and Basis transcoders, their WASM files, many compressed GLBs/KTX textures, and dozens of MP3s.
- **Audio:** **[Observed]** Howler manages a large positional/event sound set. Source gates autoplay behind audio initialization and exposes mute/audio controls.

### Reduced motion and fallback

- **[Observed]** A user-facing High/Low quality toggle exists. Mobile user agents default to low quality.
- **[Observed]** The renderer has a WebGL backend path when WebGPU is unavailable, and the options panel can label that state.
- **[Observed]** No `prefers-reduced-motion` / `reduced-motion` handling was found in the fetched HTML, CSS, live entry bundle, or cloned source tree.
- **[Observed]** No `<noscript>` alternative or explicit non-WebGL content fallback was found in the live HTML.
- **[Inference]** The quality toggle mitigates GPU cost but is not an equivalent accessibility substitute for reduced motion.

### Runtime smoke test

- **[Observed]** A cache-busted navigation to `https://bruno-simon.com/?research=20261125` loaded the actual app. It exposed one canvas with a 1050 × 1186 backing buffer in the 525 × 593 viewport, consistent with DPR 2.
- **[Observed]** The options UI reported `High` quality and `WebGPU`; the page had started and the server was offline.
- **[Observed]** The network log reached 120 requests during the intro, including the entry, shared chunk, Rapier chunk/WASM, Draco/Basis WASM, models, textures, and audio.
- **[Observed]** Four warnings said preloaded GLB/KTX resources were not used within a few seconds of the window load event. No console errors were reported.
- **[Limitation]** A direct WebGL2 context query returned a live WebKit WebGL context, but that query alone does not prove which Three.js backend was active; the UI and source are the backend evidence.

### Difficulty, cost, and safe takeaway

- **Adaptation difficulty: High.** The experience combines rendering, physics, input, level design, audio, asset compression, and backend-optional features.
- **Likely performance costs:** very high initial transfer and request count; continuous GPU rendering; WASM startup; physics simulation; postprocessing; audio decoding; high memory use from models and textures.
- **Safe takeaway for this portfolio:** borrow the **quality-tier idea and optional 3D layer**, not the game architecture. Keep all project evidence in semantic HTML and add at most one lazy-loaded, DPR-capped 3D/SVG hero with an immediate static fallback.

---

## 2. Robin Payot — scroll-driven WebGL narrative

**Live URL:** https://robinpayot.com/  
**Identity:** the title and visible introduction say “Senior Creative Developer.” The meta description explicitly mentions 3D/2D websites, WebGL, JavaScript, HTML, and CSS.

### Observed libraries and architecture

- **[Observed]** The public JS source map identifies Three.js r113, GSAP 3.6.1, GLTFLoader, DRACOLoader, OrbitControls, EffectComposer, RenderPass, ShaderPass, SMAAPass, detect-gpu, Hammer.js, Hogan.js, Howler (`hower` in the source path), three-bmfont-text, three.meshline, glslify, and stats-js.
- **[Observed]** Application source modules include `Scene`, `ScrollManager`, `RAFManager`, `ResizeManager`, `LoaderManager`, `RaycasterManager`, `CameraController`, `TemplateManager`, `Road`, `Flags`, `Obstacles`, `ProjectPostProcessing`, and multiple GLSL shader pairs.
- **[Observed]** The stylesheet map exposes one original SCSS source, `src/style/app.scss`.

### Behavior patterns

- **Scroll orchestration:** **[Observed]** `ScrollManager` sets a 15,000 px scroll container, normalizes `window.scrollY` to 0–1, eases a separate `targetProgress`, and uses that progress to drive the camera trail, colors, road, section titles, obstacles, and postprocessing. It also supports automatic wrapping between the top and bottom after a loop.
- **Canvas/WebGL:** **[Observed]** A fixed `data-scene-canvas` hosts a Three.js `WebGLRenderer`. The camera follows a precomputed 3D trail; mouse movement adds a small clamped camera rotation on non-touch devices.
- **Transitions:** **[Observed]** GSAP timelines move the camera between intro, road, overview, list, project, and about states. DOM overlays and project templates transition in sync. A custom displacement shader moves between project views.
- **Cursor/hover physics:** **[Observed]** Raycasting updates hoverable 3D objects and switches the body cursor between `pointer` and `default`. The intro button scales its SVG circles on hover and plays a click transition. Touch interaction feeds an offscreen canvas texture used by particle flags.
- **Reveals:** **[Observed]** Text is split into spans, section titles animate in 3D, list items and DOM overlays use staged visibility classes, and scroll progress changes gradient/obstacle colors.
- **Shaders:** **[Observed]** Raw GLSL is used for road particles, particle flags, gradients, section titles, obstacle grain, overlays, and a displacement postprocess. The displacement shader samples a ripple texture and uses progress/force uniforms during transitions.
- **Asset loading:** **[Observed]** `LoaderManager` uses `Promise.all` across texture, image, BMFont, and Draco-compressed GLTF requests. Scene startup is gated by GPU detection and asset completion; the intro starts the shared render loop.
- **Frame loop:** **[Observed]** `RAFManager` attaches its callback to `gsap.ticker`, dispatches a custom RAF event with time/delta, and removes/restarts the callback on `visibilitychange`.
- **GPU adaptation:** **[Observed]** `detect-gpu` sets a tier. Retina desktop DPR is reduced on weaker tiers, SMAA is added only at tier 3+, mobile particle DPR is forced to 1, and Apple/Intel GPUs receive explicit tier caps.

### Reduced motion and fallback

- **[Observed]** Portrait mobile devices receive a “Please rotate your device” overlay; the visible introduction also says the site was designed for desktop.
- **[Observed]** GPU tiering adjusts DPR and postprocessing, and the render loop pauses when the document is hidden.
- **[Observed]** No `prefers-reduced-motion` handling was found in the original sources recovered from the source maps.
- **[Observed]** No `<noscript>` alternative or explicit WebGL-construction failure fallback was found. GLTF error handling logs an error but does not visibly reject the loading promise, which is a fragile failure path.
- **[Inference]** The Enter gate and rotate prompt improve pacing and orientation, but they do not provide an equivalent reduced-motion or non-WebGL experience.

### Runtime smoke test

- **[Observed]** The live page loaded one canvas and a WebGL 2.0 context; the context was not lost.
- **[Observed]** The body remained `no-scroll` before Enter, and the rotate overlay was displayed in the narrow portrait test viewport.
- **[Observed]** Runtime requests included the exact hashed bundle, CSS, BMFont descriptors/atlases, two GLB models, and scene textures. No console errors were reported.
- **[Limitation]** The test viewport did not exercise the desktop road narrative or project transitions.

### Difficulty, cost, and safe takeaway

- **Adaptation difficulty: High.** The camera, scroll, DOM templates, raycasting, shaders, and postprocessing are tightly coordinated.
- **Likely performance costs:** high continuous WebGL rendering; multiple render passes; particle and fragment-shader work; large scroll surface; model/texture/font loading; camera and template state complexity.
- **Safe takeaway for this portfolio:** use **one compact visual mechanism**, such as an SVG signal-path diagram or a small Canvas 2D animation, rather than a full 3D world. Tie it to a short in-view scroll range and disable it when offscreen or reduced motion is requested.

---

## 3. Dennis Snellenberg — Awwwards-recognized DOM/GSAP portfolio

**Live URL:** https://www.dennissnellenberg.com/  
**Official recognition:** https://www.awwwards.com/sites/dennis-snellenberg

### Observed recognition

- **[Observed]** Awwwards labels the site **Site of the Day — Apr 4, 2022**.
- **[Observed]** The page reports **SOTD score 7.35/10** and **Developer Award 7.47/10**.
- **[Observed]** Its “Technologies & Tools” tags include GSAP, BARBA.js, Locomotive Scroll, Parallax, Transitions, Microinteractions, Animation, and Portfolio.
- **[Observed]** Awwwards highlights the navigation, contact form, and freelance portfolio presentation.

### Observed libraries and architecture

- **[Observed]** The HTML is server-rendered content with Barba wrapper/container/namespace attributes and Locomotive `data-scroll-container` / `data-scroll-section` markers.
- **[Observed]** The runtime exposes jQuery, GSAP 3.9.1, ScrollTrigger, Barba, LocomotiveScroll, and LazyLoad globals.
- **[Observed]** `index-new.js` registers ScrollTrigger, initializes Barba page transitions, creates LocomotiveScroll, proxies ScrollTrigger to the custom scroller, and reinitializes both after navigation.
- **[Observed]** No application framework signature such as React, Vue, Svelte, or Next.js was found in the fetched HTML; the implementation is conventional HTML/CSS/JavaScript with libraries.

### Behavior patterns

- **Scroll orchestration:** **[Observed]** Locomotive Scroll transforms the page container and forwards scroll events to ScrollTrigger. The code selects `pinType: transform` when the container is transformed and `fixed` otherwise, with a comment explaining mobile jitter avoidance.
- **Page transitions:** **[Observed]** Barba uses a full-screen overlay with multilingual greeting words, stops scrolling, removes the old container after a short delay, kills old ScrollTriggers, recreates smooth scrolling, and animates the new page’s `.once-in` elements upward with stagger.
- **Canvas/WebGL/shaders:** **[Observed]** None were found in the live HTML, application script, or runtime. This portfolio’s technical sophistication is DOM/CSS/GSAP orchestration rather than 3D rendering.
- **Cursor/hover physics:** **[Observed]** A persistent GSAP tween runs at roughly 120 Hz and separately lerps cursor image/button/span positions with different divisors. Hovering work items changes cursor state and moves a floating image stack. Magnetic buttons are enabled only above 540 px and return with an elastic ease.
- **Reveals:** **[Observed]** ScrollTrigger animates line-wrapped text from `y: 100%`, fade elements from `y: 2em` and opacity 0, footer shapes, arrows, background colors, and badge rotation. Desktop and mobile animation sets are separated with `ScrollTrigger.matchMedia`.
- **Marquee motion:** **[Observed]** A looping GSAP timeline clones text and reverses its time scale when scroll direction changes.
- **Asset loading:** **[Observed]** LazyLoad handles `.lazy` elements and `data-bg` images. Muted inline videos play and pause according to ScrollTrigger in-view state.
- **Responsive behavior:** **[Observed]** Touch detection adds a `touch` class; CSS switches fixed/transformed containers to relative positioning at small widths and on touch. The custom cursor image is hidden at 540 px and below.

### Reduced motion and fallback

- **[Observed]** The site has mobile/touch branches and a native-positioning CSS path instead of always transforming the page.
- **[Observed]** No `prefers-reduced-motion` handling was found in the fetched application JS, HTML, or main CSS.
- **[Observed]** No `<noscript>` alternative was found.
- **[Inference]** The mobile fallback reduces scroll-jank risk but does not address users who request reduced motion on desktop.

### Runtime smoke test

- **[Observed]** The live page initialized Locomotive Scroll (`has-scroll-init`) and exposed all expected library globals.
- **[Observed]** GSAP reported version 3.9.1; Barba was an object; LocomotiveScroll and LazyLoad were functions.
- **[Observed]** There were zero canvases. No console errors were reported.
- **[Observed]** Runtime requests included the exact local scripts/styles plus the third-party library URLs listed in the fetch ledger.

### Difficulty, cost, and safe takeaway

- **Adaptation difficulty: Medium.** Individual transitions, magnetic buttons, and reveals are reusable patterns, but recreating the full smooth-scroll/Barba lifecycle is more work and risk.
- **Likely performance costs:** moderate. The main risks are transform-based smooth scrolling, a continuously running cursor tween, many `will-change` surfaces, full HTML page swaps, and layout recalculation around reveal targets.
- **Safe takeaway for this portfolio:** adopt the **clear transition grammar and concise project-card hover behavior**. Use native scrolling by default, short CSS/WAAPI reveals, and at most a very small magnetic effect on primary buttons. Do not add Barba or Locomotive unless multipage transitions become a demonstrated requirement.

---

## GitHub-linked source corroboration

Bruno’s live “Behind the scene” panel links https://github.com/brunosimon/folio-2025 and states that the portfolio code is MIT-licensed. The repository was cloned at commit `70764a94756cc4de564e493c8ba46c4b5fe03ed1`.

Useful primary files inspected:

- https://github.com/brunosimon/folio-2025/blob/70764a94756cc4de564e493c8ba46c4b5fe03ed1/package.json
- https://github.com/brunosimon/folio-2025/blob/70764a94756cc4de564e493c8ba46c4b5fe03ed1/sources/Game/Rendering.js
- https://github.com/brunosimon/folio-2025/blob/70764a94756cc4de564e493c8ba46c4b5fe03ed1/sources/Game/ResourcesLoader.js
- https://github.com/brunosimon/folio-2025/blob/70764a94756cc4de564e493c8ba46c4b5fe03ed1/sources/Game/Game.js
- https://github.com/brunosimon/folio-2025/blob/70764a94756cc4de564e493c8ba46c4b5fe03ed1/sources/Game/Quality.js
- https://github.com/brunosimon/folio-2025/blob/70764a94756cc4de564e493c8ba46c4b5fe03ed1/sources/Game/Options.js
- https://github.com/brunosimon/folio-2025/blob/70764a94756cc4de564e493c8ba46c4b5fe03ed1/sources/Game/Ticker.js
- https://github.com/brunosimon/folio-2025/blob/70764a94756cc4de564e493c8ba46c4b5fe03ed1/sources/Game/Overlay.js
- https://github.com/brunosimon/folio-2025/blob/70764a94756cc4de564e493c8ba46c4b5fe03ed1/sources/Game/RayCursor.js
- https://github.com/brunosimon/folio-2025/blob/70764a94756cc4de564e493c8ba46c4b5fe03ed1/readme.md

**Observed match:** the live bundle contains Three.js revision 187 and GSAP 3.15.1, matching the repository’s declared versions and the shared 2026-11-04 asset timestamp. This corroborates the live-bundle interpretation without claiming that every runtime environment variable or server feature is public.

No second GitHub-linked portfolio repository was needed: Robin’s public source maps already provided original application source, and Dennis’s application script is readable.

---

## Cross-site implementation findings

### Patterns worth adapting

1. **Motion carries navigation, but content remains legible.** All three use transitions to explain state changes. The strongest adaptation is to connect motion to a real information change rather than decorate every element.
2. **One shared clock reduces coordination bugs.** Bruno and Robin centralize updates in a single ticker/event loop. For this portfolio, one in-view `requestAnimationFrame` loop is sufficient if an animated visualization is added.
3. **Lerped targets feel smoother than direct scroll mapping.** Robin and Dennis separate target state from rendered state. The same idea can be used with small transform/opacity values and no scroll hijacking.
4. **Quality tiers matter more than visual maximalism.** Bruno exposes High/Low quality; Robin adjusts DPR and postprocessing from GPU tier. A simpler portfolio should default to the cheapest acceptable rendering path.
5. **Progressive enhancement is the safest differentiator.** Dennis demonstrates that exceptional interaction can be achieved without WebGL. This is the lowest-risk model for an evidence-first engineering portfolio.

### Patterns not to copy unchanged

- Full-viewport continuous WebGL rendering for a content-heavy portfolio.
- A 15,000 px artificial scroll surface or transform-based smooth scrolling by default.
- Persistent custom cursors that replace normal pointer affordances.
- Persistent 120 Hz cursor tweens when no cursor element is visible.
- Intro gates that delay access to content without a skip/reduced-motion path.
- Motion that is the only way to reach project evidence.
- Large model, audio, and texture sets loaded before the visitor can use the site.

### Reduced-motion finding

**[Observed]** None of the three inspected implementations exposed an OS-level `prefers-reduced-motion` path in the fetched source. This is a shared gap, not a pattern to reproduce.

**[Inference]** For this portfolio, reduced motion should be designed as a first-class static mode: no autoplay, no parallax, no magnetic movement, no shader animation, and no smooth-scroll interception.

---

## Safe implementation approach for this portfolio

The current repository defines an evidence-first engineering portfolio at the software/hardware intersection. `GLOSSARY.md` emphasizes Project Evidence, Engineering Narrative, Signal Path, and Portfolio Signal; `outputs/github-evidence.md` identifies strong project narratives and warns against unsupported performance claims. No application framework has been selected in the current tree.

### Recommended adaptation

**Use Dennis’s transition clarity, Robin’s single-visual-idea discipline, and Bruno’s quality controls—without adopting their full rendering or scrolling architectures.**

1. **Keep the evidence layer semantic and independent.**
   - Every project should have real headings, text, links, code/demo evidence, constraints, mechanism, results, and limits.
   - No project fact exists only inside a canvas or animated overlay.
   - Keyboard users can reach every project and contact link without triggering motion.

2. **Choose one signature interaction: an inspectable signal path.**
   - Implement a compact SVG diagram, optionally enhanced with Canvas 2D, showing source → channel → impairment → receiver → measured/simulated output.
   - Use a short in-view scroll range or explicit step buttons to update the diagram.
   - Provide a static SVG/image and complete text equivalent as the default state.
   - Avoid a full 3D world, physics engine, and artificial 15,000 px page.

3. **Use native scroll and short, purposeful motion.**
   - Prefer CSS transitions and the Web Animations API for 200–500 ms reveals.
   - Use `IntersectionObserver` to add a one-shot `is-visible` class.
   - If a continuous visual is justified, run one `requestAnimationFrame` loop only while its section is visible; cancel it on exit and `visibilitychange`.
   - Do not introduce Locomotive Scroll, Lenis, or Barba in the first implementation unless a measured usability problem requires them.

4. **Make any WebGL an optional enhancement.**
   - Lazy-load the renderer after the critical content and after idle or user intent.
   - Cap DPR at 1–1.5, avoid postprocessing, avoid physics, and use a low-poly or shader-light scene.
   - Wrap context creation in `try/catch`; replace the canvas with the static visual on failure or context loss.
   - Never autoplay audio.

5. **Implement reduced motion explicitly.**
   - Check `matchMedia('(prefers-reduced-motion: reduce)')` before initializing continuous motion.
   - In reduced mode, show final states immediately, disable parallax/magnetic/custom-cursor behavior, and stop render loops.
   - Provide a visible “Reduce motion” control that can override automatic behavior in either direction.

6. **Set performance and accessibility gates before adding spectacle.**
   - Proposed initial budgets: no more than roughly 200 KB gzip of first-load JavaScript, one optimized hero image, no blocking third-party script, and no layout shift from late motion setup.
   - Target LCP ≤ 2.5 s, INP ≤ 200 ms, and CLS ≤ 0.1 on a representative mobile test.
   - Require visible focus, semantic landmarks, readable contrast, keyboard-operable controls, and no content hidden behind hover.
   - Test at desktop width, narrow portrait, reduced motion, keyboard-only, and WebGL-disabled conditions.

### Practical difficulty judgment

- **Low:** semantic reveals, hover states, static SVG signal path, quality toggle.
- **Medium:** one coordinated Canvas 2D/SVG animation with in-view lifecycle and reduced-motion states.
- **High:** full WebGL narrative, camera trails, postprocessing, physics, or custom smooth scrolling. These should be deferred unless they materially improve understanding of the engineering work.

---

## Limitations and non-claims

- The browser smoke test used a narrow portrait viewport and did not measure frame rate, GPU memory, Lighthouse scores, or desktop interaction quality.
- Network request counts describe the observed capture session, not guaranteed counts for every visitor or cache state.
- The initial in-app browser navigation to Bruno’s bare URL landed on a legacy FWA archive page; a cache-busted query loaded the live portfolio. Raw curl and WebFetch consistently retrieved the live HTML directly.
- Bruno’s and Robin’s Awwwards profile URLs attempted during discovery returned 404, so this report makes no award claim for either. Dennis’s official award record was verified.
- Server code, private APIs, analytics backends, and every runtime branch were not inspected.
- Minification remains a limitation for Bruno’s live bundle, partially mitigated by the linked source repository. Robin’s public maps and Dennis’s readable script substantially reduce that limitation.
- No third-party code, assets, branding, or prose should be copied into this portfolio. The recommendations above are independent adaptations of observable patterns.

## Primary source index

- Bruno Simon live portfolio: https://bruno-simon.com/
- Bruno Simon linked source: https://github.com/brunosimon/folio-2025
- Robin Payot live portfolio: https://robinpayot.com/
- Robin Payot public JS source map: https://robinpayot.com/bundle.fc8479f1eef2be9b39d9.js.map
- Robin Payot public CSS source map: https://robinpayot.com/main.fc8479f1eef2be9b39d9.css.map
- Dennis Snellenberg live portfolio: https://www.dennissnellenberg.com/
- Dennis Snellenberg official Awwwards record: https://www.awwwards.com/sites/dennis-snellenberg
