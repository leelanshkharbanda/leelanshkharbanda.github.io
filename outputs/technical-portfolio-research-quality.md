# Technical Portfolio Research — Quality Findings

**Access date:** 2026-11-25  
**Scope:** Authoritative constraints and buildability guidance for a distinctive, motion-rich software/hardware engineering portfolio.  
**Method:** Read-only synthesis of primary W3C/WAI, web.dev/Chrome, MDN, and Awwwards sources. No individual portfolio sites or secondary write-ups were analyzed.

## Executive determination

1. **Use WCAG 2.2 Level AA as the accessibility floor, with WCAG 2.3.3 Level AAA reduced-motion behavior adopted as a product requirement.** The AA criteria make keyboard operation, visible/unobscured focus, adequate contrast, reflow, target size, and non-text alternatives release gates. WCAG 2.3.3 is AAA, not AA; nevertheless, a portfolio built around parallax, scroll-scrubbing, and 3D motion should honor `prefers-reduced-motion` as a non-negotiable design state rather than an optional enhancement. ([1–22])
2. **The most distinctive robust concept is an “engineering evidence layer,” not a single spectacle:** server-rendered project narrative, an accessible SVG/Canvas 2D visualization with a text/table equivalent, editorial CSS motion, and WebGL only as an optional enhancement. This keeps the software/hardware story intelligible when JavaScript, WebGL, motion, or a fast GPU is unavailable. ([18–26], [36–38])
3. **Buildability ranking:** editorial reveals **High**; scroll scenes, custom cursor, page transitions, and live project visualizations **Medium**; WebGL hero **Low**. These rankings assume native scrolling, real links, progressive enhancement, and a static fallback. A full-page pinned scroll engine, globally hidden native cursor, transition-gated SPA, or essential WebGL interaction moves the relevant pattern to Low. ([7–10], [22–35])
4. **Core Web Vitals are field outcomes, not a Lighthouse score.** The release target is LCP ≤2.5 s, INP ≤200 ms, and CLS ≤0.1 at the 75th percentile, segmented by mobile and desktop. Lighthouse is useful for regression detection but cannot measure real-user INP; TBT is only a lab proxy. ([41–44])
5. **Do not lazy-load the LCP image or hide primary content until an animation library initializes.** Native lazy loading is for offscreen images; all media need reserved dimensions/aspect ratio. Fonts, embeds, late banners, and animation-driven size changes are common CLS sources. ([42–47])
6. **Awwwards’ published weighting is Design 40%, Usability 30%, Creativity 20%, Content 10%.** Design and usability therefore account for 70% of its evaluation. This is an external evaluation lens, not an accessibility standard, but it supports spending effort on legibility, navigation, and proof of engineering rather than motion for its own sake. ([56])
7. **No-JS is a functional test, not a cosmetic fallback.** Project descriptions, navigation, contact routes, and the core evidence must exist in HTML/CSS. `noscript` is useful for supplemental messaging, but it is not a substitute for shipping content that only JavaScript creates. ([36–38])

## 1. Standards status and interpretation

- W3C **Understanding** pages are informative explanations; the normative requirements are the success-criterion text they reproduce. This report cites them for intent, exceptions, and testable implications. ([1–21])
- **AA vs AAA:** Keyboard, focus, contrast, reflow, pointer alternatives, and status semantics are treated as AA/A release requirements. “Animation from Interactions” is **AAA**. The proposed reduced-motion acceptance criteria intentionally exceed AA because vestibular safety is central to this portfolio’s concept. ([10])
- **Core Web Vitals thresholds are recommendations**, not WCAG conformance rules. They are used here as product performance gates. ([41])
- **Awwwards criteria are an award-evaluation model**, not a technical or accessibility standard. They are used only to translate visual ambition into a balanced delivery strategy. ([56])
- **Asset byte limits, animation durations, DPR caps, and the proposed test matrix are project policies derived from the cited evidence.** They are not universal web standards. The report labels them accordingly.

## 2. Authoritative constraints and concrete acceptance criteria

### 2.1 Keyboard operation and focus

**Primary evidence.** All functionality must be operable through a keyboard interface without specific keystroke timing, except genuinely path-dependent functions. Focus must be able to leave a component; sequential focus must preserve meaning and operation; keyboard focus must have a visible mode; and a focused component must not be entirely hidden by author-created content. Custom controls also need programmatically determinable names, roles, states, and values. ([1–5], [20])

**Acceptance criteria**

- **AC-K1 — Native-first operation:** Navigation, project filters, visualization controls, dialogs, carousels, and media controls work with Tab, Shift+Tab, Enter, Space, arrows, and Escape as appropriate. Prefer `<a>`, `<button>`, `<input>`, `<details>`, and `<dialog>` over scripted `div` controls.
- **AC-K2 — No pointer-only action:** Hover, drag, pinch, path gestures, and canvas hit targets do not contain unique functionality. Every result has a keyboard-accessible control or comparable action.
- **AC-K3 — No trap:** A user can leave every embedded visualization, iframe, dialog, and custom widget using standard keyboard methods. Modal focus is contained while open and returned to the trigger or another logical element on close.
- **AC-K4 — Logical order:** DOM/focus order preserves the narrative and visual relationships. Do not use positive `tabindex` to repair a visually reordered layout.
- **AC-K5 — Visible focus:** A persistent, clearly identifiable keyboard focus indicator is present. Do not globally remove outlines. `:focus-visible` may customize the indicator; author-styled focus indication must meet 3:1 non-text contrast against adjacent colors. ([4], [14])
- **AC-K6 — Unobscured focus:** Sticky headers, custom cursors, cookie/status bars, and transition overlays never entirely hide the focused component. The project target is stricter: keep both the component and its focus indicator fully visible using `scroll-padding`/`scroll-margin` where needed. ([5])
- **AC-K7 — Transition focus:** After a page/view transition, focus moves to the new page heading or a logical control without stealing focus during an animation. Back navigation restores a sensible focus and scroll position. ([33–35])

**Tradeoff.** A custom focus ring is inexpensive visually but expensive to validate across dark/light sections, image backgrounds, forced colors, and overlays. A dual-color outline or strongly contrasted inset/outset treatment is safer than a single decorative accent that disappears on one project image.

### 2.2 Reduced motion, automatic movement, and flashing

**Primary evidence.** Interaction-triggered motion animation should be disableable unless essential; parallax is explicitly identified as a potential vestibular trigger. Automatically moving/blinking/scrolling content that starts automatically, lasts more than five seconds, and appears alongside other content needs pause/stop/hide; auto-updating information needs pause/stop/hide or update-frequency control. Content must not flash more than three times per second unless below the defined flash thresholds. MDN and web.dev document `prefers-reduced-motion` for CSS and JavaScript. ([10–12], [22–23])

**Acceptance criteria**

- **AC-M1 — Complete reduced-motion state:** With `prefers-reduced-motion: reduce`, disable parallax, scroll-scrubbing, pinning, large translations/scales, auto-rotating 3D, cursor smoothing, full-screen wipes, and nonessential autoplay. State changes occur immediately or through a subtle non-vestibular opacity/color treatment.
- **AC-M2 — Live preference changes:** JavaScript animations observe `matchMedia('(prefers-reduced-motion: reduce)')` changes and stop or switch state without a reload. CSS handles CSS animations/transitions.
- **AC-M3 — Animation-independent logic:** Content visibility, focus, navigation, and completion do not depend on `animationend`, a scroll progress value, or a transition promise that can be skipped.
- **AC-M4 — Pause automatic activity:** Continuous live visualizations, tickers, autoplay loops, and auto-updating data provide keyboard-accessible pause/stop controls. A single global motion control may cover multiple effects.
- **AC-M5 — No strobe-like effects:** Shader pulses, LED simulations, glitch effects, and hardware demos avoid rapid luminance flashing. Do not rely on a pause button to make dangerous flashing acceptable. ([12])
- **AC-M6 — No forced waiting:** There is no full-screen preloader that delays reading or navigation until a motion sequence finishes.

**Tradeoff.** Simply shortening every animation is not equivalent to reduced motion. A 100 ms large-scale slide can still be disorienting. The safer reduced state removes spatial movement and preserves information through instant layout, text, and static imagery. WCAG’s five-second rule is not a general permission to autoplay for five seconds; it is a specific condition for the pause/stop/hide criterion. ([11])

### 2.3 Canvas, WebGL, and accessible alternatives

**Primary evidence.** Canvas is a bitmap and does not expose drawn objects as semantic HTML. MDN recommends avoiding canvas for accessible content where possible and providing fallback content for unsupported browsers or disabled JavaScript. `getContext()` returns `null` when a requested context is unsupported or the canvas is already in another mode. WebGL guidance calls for conservative VRAM use, context-loss handling, optional extensions, quality settings, eager resource deletion, smaller back buffers where appropriate, batched draw calls, and avoidance of synchronous production queries. WAI requires equivalent text alternatives for complex images, and custom UI components need name/role/value semantics. ([18–20], [24–26])

**Acceptance criteria**

- **AC-G1 — HTML evidence layer:** Every canvas/WebGL scene has an adjacent or preceding HTML explanation containing the same essential information. Hardware diagrams get a structured description and, where relevant, a component/specification table. Decorative scenes are hidden from assistive technology.
- **AC-G2 — Real fallback:** The no-WebGL/no-JS state displays a useful static SVG, image, diagram, or textual project explanation—not a blank canvas or “enable JavaScript” dead end.
- **AC-G3 — Feature and failure detection:** Check the requested context for `null`; handle `webglcontextlost`, `webglcontextrestored`, shader/link failures, missing extensions, and asset-load failures. Fall back without losing navigation or project content.
- **AC-G4 — DOM controls:** Visualization controls are native HTML controls outside the canvas. Do not require keyboard users to hit-test invisible pixels. Names, roles, values, selected states, and changes are exposed programmatically. ([20])
- **AC-G5 — Static first frame:** A lightweight poster/SVG appears immediately and can serve as the LCP image. WebGL must not be the only way the hero or project evidence becomes visible.
- **AC-G6 — Bounded GPU cost:** Default to one active WebGL context, a capped render resolution, limited texture sizes, low/mobile quality settings, and on-demand loading. Production rendering avoids synchronous `getError`/`getParameter` calls in hot paths. ([26])

**Recommended hierarchy**

1. **HTML/CSS:** narrative, labels, controls, layouts, simple motion.
2. **SVG:** circuit diagrams, architecture maps, line charts, vector project artwork; scalable and semantically easier to expose.
3. **Canvas 2D:** dense particles, oscilloscope traces, custom plotting, or a bounded interactive diagram with a DOM equivalent.
4. **WebGL:** optional 3D assembly, spatial simulation, or shader-based artwork with a static fallback and reduced-motion state.

**Tradeoff.** WebGL offers spatial distinctiveness that SVG cannot cheaply reproduce, but it introduces a second rendering system with GPU memory limits, context loss, shader compilation, device-specific extensions, and weak inherent semantics. It is a poor dependency for the only proof that a project exists.

### 2.4 Contrast, typography, and reflow

**Primary evidence.** Normal text needs 4.5:1 contrast; large text needs 3:1. “Large” means at least 18 pt regular or 14 pt bold, approximately 24 px or 18.5 px. Meaningful UI/graphics and author-styled focus indicators need 3:1 against adjacent colors. Text must resize to 200% without loss, content must reflow at a 320 CSS px width for vertically scrolling content, and user text-spacing overrides must not clip or overlap content. web.dev recommends relative font sizes, readable typefaces, limited all-caps/italic variations, columns under 80 characters, and avoiding justified paragraphs. ([13–17], [31])

**Acceptance criteria**

- **AC-T1 — Contrast tokens:** Every text/background pair meets 4.5:1, or 3:1 only when the delivered text qualifies as large. Test default, hover, focus, selected, disabled, error, and image-overlay states. Do not round 4.499 up to a pass. ([13])
- **AC-T2 — Non-text contrast:** Essential icons, chart lines, control boundaries/states, and focus indicators meet 3:1 against adjacent colors. A chart does not pass merely because its legend has contrast. ([14])
- **AC-T3 — Resizable type:** Base sizes use `rem`/`em`/percent; text and controls remain complete and usable at 200% text scaling and browser zoom. Avoid `overflow: hidden` around expanding headings and labels.
- **AC-T4 — Reflow:** At a 320 CSS px viewport, non-excepted content reflows without two-dimensional scrolling or lost functionality. A genuinely two-dimensional diagram may scroll inside its own bounded container; surrounding narrative, headings, and controls still reflow. ([16])
- **AC-T5 — Spacing resilience:** Applying line-height 1.5×, paragraph spacing 2×, letter-spacing 0.12×, and word-spacing 0.16× causes no clipping, overlap, or inaccessible controls. ([17])
- **AC-T6 — Editorial readability:** Keep long-form measure under roughly 80 characters, use left/start alignment for body copy, avoid long all-caps passages and tightly kerned display fonts for essential information, and use real text rather than text baked into project images. ([31])

**Tradeoff.** Expressive display type can carry the art direction if it is brief and nonessential. Project outcomes, specifications, captions, and contact information need the more conservative reading treatment. A thin variable font may nominally pass contrast yet render faintly because of anti-aliasing; test the actual font, not only the color token. ([13])

### 2.5 Responsive and touch behavior

**Primary evidence.** WCAG 2.2 AA requires pointer targets of at least 24×24 CSS px unless an exception applies; the same Understanding page notes 44×44 CSS px as the stricter AAA enhanced target. Multipoint/path gestures need single-pointer alternatives; dragging needs a non-drag single-pointer alternative; pointer actions need cancellation/abort/undo behavior. MDN documents `pointer`, `hover`, `touch-action`, and viewport behavior. ([6–9], [27–30])

**Acceptance criteria**

- **AC-R1 — Zoom remains available:** Use `width=device-width`; do not set `user-scalable=no` or otherwise suppress browser zoom. Respect safe-area insets when using `viewport-fit=cover`. ([30])
- **AC-R2 — Targets:** Meet the 24×24 CSS px AA minimum. Project policy: make primary touch controls at least 44×44 CSS px and give dense icon rows adequate separation.
- **AC-R3 — Input capability, not viewport proxy:** Use `(pointer: coarse)` and `(hover: hover)`/`(hover: none)` where appropriate. A narrow desktop window is not proof of touch; a touch laptop may have a fine primary pointer. ([27–28])
- **AC-R4 — Gesture alternatives:** Pinch-to-zoom, two-finger rotate, path drawing, swipe-only galleries, and drag-only sliders/models all have buttons, numeric inputs, preset views, or tap-to-position alternatives. ([7–8])
- **AC-R5 — Native scrolling/zoom:** Keep `touch-action: auto` or `manipulation` for ordinary content. Restrict `touch-action: none` to a bounded custom-manipulation surface that also has non-drag controls. It can inhibit browser zoom. ([29])
- **AC-R6 — Cancellation:** Activate ordinary controls on up-event/click; moving off a target before release cancels the action. Dragging can be aborted or undone. Test accidental palm/finger contact and rapid repeated taps. ([9])

**Tradeoff.** Dense hardware pin maps and node graphs may qualify for a target-size exception, but that does not remove the need for equivalent functionality. Provide a component list, table, search, or preset views so precision tapping is not the only route to the engineering evidence.

### 2.6 Lazy loading, asset delivery, and layout stability

**Primary evidence.** Browser-level lazy loading defers offscreen images without requiring a JavaScript library; images likely to be in the initial viewport, especially LCP images, should load eagerly. Lazy-loaded images still need dimensions. CSS background images cannot use the `loading` attribute. Modern WebP/AVIF generally compress better than JPEG/PNG, SVG suits geometric artwork, and video is preferable to animated GIF. Font guidance favors WOFF2, subsetting, few font files, careful preload, and an explicit `font-display` tradeoff. CLS guidance calls for dimensions/aspect ratio, reserved embed/banner space, and avoiding late content insertion and layout-triggering animation. ([43], [45–47])

**Acceptance criteria**

- **AC-P1 — LCP eager:** The likely LCP image is discoverable in the initial HTML, not lazy-loaded, and uses `fetchpriority="high"` only when measurements justify it. A hero hidden until JavaScript initializes fails this criterion. ([42])
- **AC-P2 — Selective lazy loading:** Apply `loading="lazy"` only to offscreen images/iframes. Verify carousel and hidden-image behavior in each browser; do not assume `display:none`, opacity, and offscreen slides behave identically. ([45])
- **AC-P3 — Reserved geometry:** Every image, video, iframe, embed, chart, and dynamically inserted banner has intrinsic dimensions, `aspect-ratio`, or a correctly sized placeholder before content arrives. Do not collapse the reserved area if an embed fails.
- **AC-P4 — Efficient formats:** Use SVG for vector hardware diagrams; WebP/AVIF with fallback for raster imagery; responsive `srcset`/`sizes`; compressed muted video instead of GIF; and no essential text inside images. ([46])
- **AC-P5 — Font discipline:** Ship only required WOFF2 subsets/weights, preload only the critical font, use a robust fallback stack, and choose `swap` versus `optional` knowingly. `swap` displays text sooner but can shift; `optional` avoids late swap-related shifts but may forgo the brand font. ([47])
- **AC-P6 — No surprise insertion:** Banners, cookie notices, live feeds, and transition content do not shift readable content after load. Prefer user-initiated loading, fixed/reserved containers, or overlays that do not obstruct focus. ([43])

**Tradeoff.** Lazy loading saves initial bandwidth but can make a fast deep-scroll feel slower if every asset waits until the last moment. Native browser thresholds help, but project galleries still need measured prefetching. Conversely, eager-loading all high-resolution project media protects scrolling while damaging LCP and data cost.

### 2.7 LCP, CLS, INP, and asset budgets

**Primary evidence.** Core Web Vitals are LCP, INP, and CLS. Good thresholds are ≤2.5 s, ≤200 ms, and ≤0.1 at the 75th percentile, segmented by mobile/desktop. LCP consists of TTFB, resource load delay, resource load duration, and element render delay. INP consists of input delay, event processing, and presentation delay. CLS combines shift impact and distance and can occur after initial load. Quantity-only budgets are insufficient because resource order and critical-path timing matter. ([41–44], [48])

**Acceptance criteria**

- **AC-V1 — Field gate:** Mobile and desktop each meet LCP ≤2.5 s, INP ≤200 ms, and CLS ≤0.1 at p75 for representative routes. Segment by device and navigation type; do not hide slow project pages behind a fast homepage average.
- **AC-V2 — Lab regression gate:** Track LCP/CLS and TBT in CI; use Lighthouse performance ≥90 as a secondary project gate. Do not report a lab “INP” from a tool that had no user input. ([41])
- **AC-V3 — Responsive interactions:** Keep event callbacks small, avoid forced synchronous layout, defer nonvisual work until after the next frame, and stop offscreen animation/rendering. No author-created task should exceed 200 ms during common load or interaction paths; this is a project budget derived from the INP target. ([44])
- **AC-V4 — Full-page CLS:** Measure scrolling, filtering, project opening, menu transitions, lazy media, and back/forward—not only first load. Do not rely on the 500 ms post-input exclusion as a layout strategy. ([43])

**Proposed starting asset budget — project policy, not a standard**

| Budget item | Proposed limit | Rationale |
|---|---:|---|
| Critical-path resources, compressed/minified | ≤170 KB | web.dev’s baseline starting point for slow devices/networks. ([48]) |
| Initial mobile homepage transfer | ≤350 KB compressed | Leaves room for a real hero while forcing deferred project media. Derived from web.dev/Lighthouse examples. ([48–50]) |
| Initial JavaScript | ≤125 KB compressed | Lighthouse example budget; 3D/animation engines must be route-loaded. ([49]) |
| Initial CSS | ≤30 KB compressed | Keeps render-blocking CSS below the hero resource cost. |
| Initial web fonts | ≤60 KB total WOFF2 | Encourages one display face and one text face/subset strategy. ([47]) |
| LCP image/poster | ≤120 KB compressed | Large enough for art direction, small enough to start early. ([42], [46]) |
| On-demand project detail media | ≤500 KB per project until explicit intent | Prevents one case study from dominating the initial route. |
| Third-party requests | ≤5 | Every third-party script/embed adds connection, main-thread, and CLS risk. ([50]) |
| WebGL enhancement | ≤200 KB compressed on demand; one active context | Keeps GPU experimentation out of the baseline route. ([26]) |
| Render resolution | DPR cap 1.5 mobile / 2 desktop by default | Balances crispness and fill rate; expose a quality setting where useful. ([26]) |

These numbers are deliberately stricter than a typical media-heavy page and should be adjusted using measured device/network data. Byte budgets do not replace field metrics: two pages with identical weight can have very different LCP because one discovers its hero late. ([48])

### 2.8 Graceful JavaScript failure

**Primary evidence.** Progressive enhancement provides essential content/functionality to as many users as possible and enhances capable browsers. `noscript` supplies content when scripting is disabled or unsupported. Classic scripts without `async`/`defer`/`type="module"` interrupt parsing; `defer` executes after parsing in document order; modules defer by default; `async` executes when ready and does not guarantee order. ([36–38])

**Acceptance criteria**

- **AC-J1 — Server/static content first:** Project narratives, headings, outcomes, links, contact actions, and visualization summaries exist in generated HTML. No essential content is created only by client-side rendering.
- **AC-J2 — Real navigation:** Project and section links are real URLs. If an SPA is used, it enhances navigation rather than replacing it; direct links, reloads, and browser history work.
- **AC-J3 — Isolated enhancement failure:** A failed WebGL module, chart library, animation library, font, analytics script, or third-party embed cannot hide the page, trap focus, or block contact/navigation.
- **AC-J4 — Nonblocking scripts:** Use modules/`defer` for dependent DOM enhancements and `async` only for independent scripts. Dynamically import WebGL/heavy interaction modules after intent or idle time. ([38])
- **AC-J5 — Failure-state test:** The site passes keyboard navigation, reading, and contact tasks with JavaScript disabled, with WebGL disabled, with a forced context loss, with a blocked third-party domain, and with a failed lazy image.

**Tradeoff.** Static generation or server rendering improves resilience, SEO, and LCP discovery but requires a build pipeline. For a portfolio, that cost is usually lower than maintaining a second no-JS content tree or debugging an empty client-rendered shell.

### 2.9 SEO and social metadata

**Primary evidence.** web.dev recommends descriptive titles, accurate descriptions, canonical URLs, Open Graph/Twitter metadata, absolute social-image URLs, and social-image alternative text. It discourages meta-refresh and keyword meta tags. MDN emphasizes unique, concise, front-loaded page titles for accessibility and search. ([39], [57])

**Acceptance criteria**

- **AC-S1 — Per-route metadata:** Every home/project route has a unique descriptive `<title>`, concise `meta description`, canonical URL, and matching Open Graph title/description/URL/type. Avoid duplicate titles and generic “Portfolio”/“Projects” titles across routes.
- **AC-S2 — Social image:** Provide an absolute HTTPS `og:image`, `og:image:alt`, and a deliberate Twitter card type. Verify image dimensions and crop in the target platforms; use a project-specific image where it improves clarity.
- **AC-S3 — Crawlable evidence:** Project names, roles, technologies, outcomes, and links are HTML text. No essential indexable content exists only inside canvas, video, or a JS-only modal.
- **AC-S4 — Semantics:** Use one clear page heading hierarchy, descriptive link text, language metadata, and stable URLs. Do not use meta refresh or cloaked client-only content to manufacture transitions.

**Tradeoff.** Per-project metadata and artwork cost production time, but they directly improve sharing and search comprehension. They also reinforce the engineering story: a recruiter should understand the project from the title, description, and static card before loading a 3D scene.

### 2.10 Browser and assistive-technology testing

**Primary evidence.** WAI Easy Checks are explicitly a first review, not a comprehensive evaluation. WAI states that tools cannot determine accessibility, may produce false/misleading results, and require human judgment. web.dev recommends automated, manual keyboard/visual/content, and assistive-technology testing. Chrome DevTools can inspect the accessibility tree, source order, contrast, reflow, vision deficiencies, forced colors, and reduced-motion preferences. web.dev advises cross-browser checks on current Chrome, Firefox, Safari, and Edge and detailed reproduction steps. ([51–55])

**Acceptance criteria**

- **AC-B1 — Automated baseline:** HTML validation, Lighthouse accessibility/SEO/performance, and an accessibility ruleset run on every representative route and critical state.
- **AC-B2 — Manual keyboard pass:** Complete all tasks with no pointer, including modal open/close, visualization filtering, project navigation, pause controls, and back/forward restoration.
- **AC-B3 — Screen-reader pass:** Verify reading order, names/roles/states, dynamic status messages, canvas alternatives, and focus after transitions with at least NVDA + Firefox/Chrome on Windows and VoiceOver + Safari on macOS/iOS. Add TalkBack + Chrome on Android for touch-heavy interactions.
- **AC-B4 — Visual/motion pass:** Test 200% text/zoom, 400% page zoom/320 CSS px reflow, text-spacing overrides, reduced motion, forced colors, high-contrast/vision-deficiency emulation, and real OS reduced-motion settings.
- **AC-B5 — Failure/device pass:** Test no JS, blocked assets, slow network, WebGL unavailable/context lost, touch-only, hybrid touch/trackpad, orientation changes, safe-area cutouts, and bfcache restoration.

## 3. Evidence table

| ID | Primary evidence | Portfolio acceptance criterion | Verification |
|---|---|---|---|
| E01 | All functionality must be keyboard operable; path-dependent input is the narrow exception. ([1]) | AC-K1, AC-K2: every task has native keyboard operation. | Keyboard-only task script; no pointer. |
| E02 | Focus must leave components, preserve meaning, remain visible, and not be entirely obscured. ([2–5]) | AC-K3–AC-K6: no traps, logical order, visible 3:1 focus, no sticky/overlay concealment. | Tab/Shift+Tab through every state; inspect contrast and viewport occlusion. |
| E03 | Custom components need programmatic name, role, state, and value. ([20]) | AC-K1, AC-G4: native controls or complete semantics for custom UI. | Accessibility tree + screen reader. |
| E04 | Interaction motion should be disableable unless essential; parallax is a cited vestibular risk. ([10]) | AC-M1–AC-M3: reduced-motion state and live preference changes. | Emulate and set OS reduce motion; toggle while page is open. |
| E05 | Auto-moving content >5 s alongside other content needs pause/stop/hide; auto-updates need control. ([11]) | AC-M4: pause continuous visualizations and updates. | Operate pause by keyboard; confirm state persists after focus moves. |
| E06 | No more than three flashes/second unless below general/red thresholds. ([12]) | AC-M5: no strobe/glitch effects that risk threshold violation. | Review shader/video parameters; use flash analysis where needed. |
| E07 | Canvas is bitmap content without semantic drawn objects; fallback is needed. ([24]) | AC-G1, AC-G2, AC-G5: HTML equivalent and static first frame. | Disable JS/WebGL; inspect accessibility tree. |
| E08 | `getContext()` can return `null`; WebGL needs VRAM, context-loss, extension, and quality handling. ([25–26]) | AC-G3, AC-G6: detect failure, restore/fallback, bound GPU cost. | Force unsupported context/context loss; test low-quality mode. |
| E09 | Complex images need short and long descriptions conveying essential information. ([18–19]) | AC-G1: hardware diagrams have structured descriptions/spec tables. | Compare visual information with text/table equivalent. |
| E10 | Text contrast is 4.5:1, or 3:1 for large text; meaningful non-text visuals are 3:1. ([13–14]) | AC-T1, AC-T2: all states and graphics meet contrast. | Token tests plus manual image/gradient checks. |
| E11 | Text must resize to 200%, reflow at 320 CSS px, and tolerate specified spacing overrides. ([15–17]) | AC-T3–AC-T5: no clipping, overlap, or two-axis reading. | Text-only zoom, page zoom, 320 px viewport, spacing bookmarklet. |
| E12 | Relative sizes, readable type, <80-character columns, and non-justified body copy are recommended. ([31]) | AC-T6: editorial hierarchy remains readable. | Visual review at mobile/desktop/zoom. |
| E13 | AA target minimum is 24×24 CSS px; enhanced target is 44×44. ([6]) | AC-R2: AA minimum plus 44 px primary touch targets. | Measure hit boxes at each breakpoint. |
| E14 | Multipoint/path gestures and dragging need simple-pointer alternatives. ([7–8]) | AC-R4: buttons, inputs, presets, or tap alternatives. | Complete every visualization task using taps/clicks only. |
| E15 | Pointer actions need no-down-event, abort/undo, up-reversal, or essential behavior. ([9]) | AC-R6: cancellable taps and reversible drags. | Press, move away, release; test accidental contact. |
| E16 | `touch-action: none` can inhibit zoom; viewport settings can suppress scaling. ([29–30]) | AC-R1, AC-R5: preserve zoom/native pan outside bounded custom surfaces. | Real device pinch zoom and scroll; inspect viewport meta. |
| E17 | LCP image must be eager and early; hiding it until JS renders creates delay. ([42]) | AC-P1, AC-G5: static, discoverable hero/poster. | Network waterfall and LCP attribution. |
| E18 | Native lazy loading is for offscreen media and needs dimensions; hidden/carousel behavior varies. ([45]) | AC-P2, AC-P3: selective lazy loading with reserved geometry. | Throttled scroll in each browser; watch CLS and requests. |
| E19 | Dimensions, reserved embeds, font strategy, and non-layout animation reduce CLS. ([43], [47]) | AC-P3–AC-P6, AC-V4: stable full-page experience. | Full-session CLS trace, not only initial load. |
| E20 | Good CWV targets are LCP ≤2.5 s, INP ≤200 ms, CLS ≤0.1 at p75; lab and field differ. ([41–44]) | AC-V1–AC-V4: field gates plus lab regression checks. | RUM/CrUX where available; DevTools/Lighthouse in CI. |
| E21 | Budgets should combine quantity and user-centric metrics and be enforced in builds. ([48–50]) | Proposed asset budget and CI limits. | Bundle/resource report and Lighthouse budget audit. |
| E22 | Progressive enhancement preserves baseline content/functionality; script loading affects parsing. ([36–38]) | AC-J1–AC-J5: static content, real URLs, isolated failures. | No-JS, blocked-script, and failed-module tests. |
| E23 | Metadata controls search/social presentation; social images need alt text. ([39]) | AC-S1–AC-S4: per-route metadata and crawlable evidence. | View source, validators, social debuggers, JS-off fetch. |
| E24 | Automated tools cannot determine accessibility; manual and AT testing are required. ([51–54]) | AC-B1–AC-B5: combined test protocol. | Test evidence matrix with browser/device/state versions. |
| E25 | Awwwards weights Design 40, Usability 30, Creativity 20, Content 10. ([56]) | Treat usability and legibility as co-equal art-direction constraints. | Design review scores concept, operation, and evidence separately. |

## 4. Buildability ranking for interaction patterns

**Ranking definition:** **High** = straightforward to implement and verify with standard HTML/CSS and minimal fallback burden. **Medium** = buildable when bounded, progressive, and supported by a static/DOM equivalent; otherwise fragile. **Low** = expensive to make accessible, performant, and reliable across devices; suitable only as an optional enhancement.

| Pattern | Rank | Robust implementation | Main tradeoff / failure mode | Key sources |
|---|---|---|---|---|
| Scroll scenes | **Medium** | One or two native-scroll sections using `transform`/`opacity`, Intersection Observer, static end states, and reduced-motion bypass. | Strong narrative pacing, but custom scroll hijacking, pinning, and scrubbing increase focus, touch, motion, and INP risk. Complex pinned scenes become Low. | [7–10], [22], [32] |
| WebGL hero | **Low** | Static poster/SVG as LCP; dynamically loaded WebGL with quality tiers, context restoration, and no essential text/controls. | Highest spectacle, but largest GPU/VRAM, shader, context-loss, semantic, and fallback burden. It should never be the only hero. | [18], [24–26], [42] |
| Custom cursor | **Medium** | Small decorative ring only under `(hover: hover) and (pointer: fine)` and no reduced-motion preference; retain native cursor for text/inputs and all functionality. | Cheap to code, easy to regress. Hiding the native cursor globally, lagging hit targets, touch laptops, forced colors, and low vision make it Low. | [4], [6], [22], [27–29] |
| Page transitions | **Medium** | Real URLs plus View Transition API/CSS enhancement; no network wait inside callback; explicit focus/title/scroll handling; bfcache-safe lifecycle. | Improves continuity but can delay content, break history/focus, freeze the page, and disqualify bfcache through `unload` listeners. Cross-document support must not be assumed. | [33–35], [38], [40] |
| Live project visualizations | **Medium** | SVG/Canvas 2D with deterministic data, native controls, text/table equivalent, pause, and explicit “measured” versus “simulated” labels. | Best proof of engineering, but data semantics, update frequency, and dense hit targets require discipline. A WebGL/sensor-stream dependency makes it Low. | [6–8], [11], [18–21], [24–26] |
| Editorial reveals | **High** | Content visible by default; one-time short `transform`/`opacity` reveals; no layout-height animation; reduced-motion/static state. | Strong hierarchy with low risk. Staggered text masks, per-character animation, and reveal-dependent content reduce rank to Medium. | [10], [22], [32], [43] |

### 4.1 Scroll scenes

**Recommended:** Use the browser’s native scroll position and animate a small number of compositor-friendly properties. Keep the section’s DOM and end state readable without scroll progress. Prefer Intersection Observer for discrete state changes and a single `requestAnimationFrame` loop for continuous transforms rather than unthrottled scroll handlers.

**Accept when:** The same narrative is available at every scroll position; keyboard users can reach all links/controls; touch scrolling remains native; reduced motion produces a static section; and the scene does not block input or create layout shifts.

**Reject/de-scope when:** The concept requires hijacked scrolling, a full-viewport pinned timeline, canvas text as the only explanation, or a scene that cannot be understood when paused. WCAG’s dragging criterion applies when the author suppresses native scrolling and implements a custom drag mechanism. ([8])

### 4.2 WebGL hero

**Recommended:** Treat WebGL as an optional “inspect the assembly” layer over an immediate static hero. Load it after intent or when the device passes a conservative capability check. Provide low-quality settings, compressed textures, bounded canvas size, and context restoration.

**Accept when:** The hero remains useful with a blank canvas, no GPU, reduced motion, or a lost context; the static poster is the LCP candidate; all project information is HTML; and measured mobile performance remains within budget.

**Reject/de-scope when:** The concept depends on continuous rendering to reveal the headline, uses WebGL hit areas as the only controls, or requires large uncompressed textures/models before the page becomes readable. WebGL’s portability and semantic costs outweigh its visual benefit in that case. ([24–26], [42])

### 4.3 Custom cursor

**Recommended:** Add a subtle ring or contextual label without removing the native pointer. Keep native cursor behavior for text selection, inputs, draggable controls, and touch. Disable smoothing and decorative movement under reduced motion.

**Accept when:** It is purely decorative, never changes the clickable target, works on hybrid devices without duplicate/stuck cursors, and disappears cleanly when hover/pointer capability changes.

**Reject/de-scope when:** It is used to communicate focus, hide the system cursor over the entire page, or replace native pointer feedback. A custom cursor cannot satisfy focus-visible requirements and may reduce targeting precision. ([4], [27–29])

### 4.4 Page transitions

**Recommended:** Keep real anchor navigation and progressively wrap the DOM update in `document.startViewTransition` where supported. Preload route data before starting the transition, keep the callback short, use an aggressive font/image timeout if needed, and call the same DOM-update function directly when unsupported. ([33–35])

**Accept when:** Direct URLs/reloads work; the destination title and metadata update; focus lands logically; back/forward restores state; reduced motion disables spatial animation; the page remains interactive if the transition is skipped; and bfcache is not blocked by `unload`. ([40])

**Reject/de-scope when:** Navigation is gated on a transition, the old page remains frozen while waiting for network assets, or the only way to return is a custom JavaScript history stack. View transitions are an enhancement, not a navigation architecture. ([34–35])

### 4.5 Live project visualizations

**Recommended:** Start with SVG for circuit/architecture diagrams and Canvas 2D for traces/particles. Use deterministic seed data for a stable first frame, native controls for parameters, a text/table equivalent, and clear evidence labels such as “measured,” “simulated,” and “illustrative.” Pause nonessential continuous updates.

**Accept when:** Keyboard and single-pointer users can reach the same insights; status changes such as “filter applied” or “simulation paused” are announced appropriately without making the interface excessively chatty; the visualization survives data-load failure; and the text evidence stands alone. ([11], [18–21])

**Reject/de-scope when:** A live hardware endpoint is required to understand the project, values update too rapidly to read, or the only comparison is color. Ship a recorded dataset and static evidence instead. This also avoids presenting simulation as measured hardware evidence.

### 4.6 Editorial reveals

**Recommended:** Reveal headings, rules, and project cards once with short opacity/translate transitions. Keep content visible in the base state and add the animation only when JavaScript and no-reduced-motion conditions are met. Avoid per-character effects for long text and avoid animating `height`, `top`, or `left`.

**Accept when:** Content is readable before hydration, focus never lands on an invisible element, reduced motion shows the final layout immediately, and the reveal does not shift later content. This is the best “distinctive but dependable” motion layer. ([10], [22], [32], [43])

## 5. Recommended delivery architecture

### Tier 0 — Always available

- Static/server-generated HTML for every project and route.
- Semantic headings, descriptive links, project outcomes, role/team distinctions, and contact actions.
- A static hardware diagram, architecture graphic, or project poster with an appropriate text alternative.
- Core CSS layout and visible focus styles.

### Tier 1 — CSS enhancement

- Editorial reveals, hover/focus treatments, responsive layout, theme tokens, and subtle opacity/transform motion.
- Reduced-motion and forced-colors behavior.
- Native `loading="lazy"` and responsive images.

### Tier 2 — Data interaction

- SVG/Canvas 2D visualizations loaded on demand.
- Native HTML controls and accessible status messages.
- Deterministic datasets, pause/reset, preset views, and text/table alternatives.

### Tier 3 — Optional spatial enhancement

- WebGL assembly or shader artwork only after capability/intent checks.
- Quality settings, bounded DPR, context-loss recovery, and immediate static fallback.
- No essential content, navigation, or contact path inside this tier.

This architecture makes the motion richness additive rather than load-bearing. It also produces a useful engineering narrative: the portfolio itself demonstrates constraint handling, progressive enhancement, measurement, and failure recovery.

## 6. Release test protocol

### 6.1 Minimum browser/device matrix

| Layer | Required coverage |
|---|---|
| Desktop browsers | Current stable Chrome, Edge, Firefox, and Safari on macOS; include the previous major Safari release because WebKit behavior cannot be inferred from Chromium. |
| Mobile browsers | Current iOS Safari and Android Chrome on real devices; test portrait/landscape and safe-area cutouts. |
| Input | Keyboard-only, mouse/trackpad, touch-only, and hybrid touch/precise-pointer. |
| Assistive technology | NVDA with Firefox or Chrome on Windows; VoiceOver with Safari on macOS and iOS; TalkBack with Chrome on Android for touch interactions. |
| States | Default, reduced motion, forced colors, 200% text/zoom, 400% page zoom/320 CSS px, no JS, blocked third party, slow network, WebGL unavailable/context lost, and bfcache restore. |

This matrix is a project recommendation, not a W3C-mandated browser list. WAI and web.dev support the underlying requirement for automated, manual, and AT testing; web.dev specifically recommends comparing current Chrome, Firefox, Safari, and Edge. ([51–55])

### 6.2 Required evidence before release

1. **Keyboard task recording:** every interactive flow completed without pointer; focus order, visibility, and restoration checked.
2. **Accessibility tree review:** custom controls expose correct names/roles/states; canvas has an HTML equivalent; status messages are not excessive.
3. **Contrast and typography results:** all theme/project states tested, including text over imagery and forced colors.
4. **Motion review:** CSS and JS behavior checked with emulation and a real OS setting; automatic motion can be paused.
5. **Performance report:** field p75 LCP/INP/CLS by device, plus lab LCP/CLS/TBT, resource budgets, and LCP attribution.
6. **Failure report:** no-JS, blocked asset, context-loss, and transition-skip results.
7. **Metadata/social review:** titles/descriptions/canonicals per route; social card crop and alt text verified.
8. **Cross-browser defect notes:** browser/OS/device versions, steps, expected/actual result, and a minimized reproduction for any suspected browser bug. ([55])

## 7. Numbered primary sources

All sources accessed **2026-11-25**.

1. W3C WAI — Understanding SC 2.1.1: Keyboard. https://www.w3.org/WAI/WCAG22/Understanding/keyboard.html
2. W3C WAI — Understanding SC 2.1.2: No Keyboard Trap. https://www.w3.org/WAI/WCAG22/Understanding/no-keyboard-trap.html
3. W3C WAI — Understanding SC 2.4.3: Focus Order. https://www.w3.org/WAI/WCAG22/Understanding/focus-order.html
4. W3C WAI — Understanding SC 2.4.7: Focus Visible. https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html
5. W3C WAI — Understanding SC 2.4.11: Focus Not Obscured (Minimum). https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html
6. W3C WAI — Understanding SC 2.5.8: Target Size (Minimum). https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html
7. W3C WAI — Understanding SC 2.5.1: Pointer Gestures. https://www.w3.org/WAI/WCAG22/Understanding/pointer-gestures.html
8. W3C WAI — Understanding SC 2.5.7: Dragging Movements. https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements.html
9. W3C WAI — Understanding SC 2.5.2: Pointer Cancellation. https://www.w3.org/WAI/WCAG22/Understanding/pointer-cancellation.html
10. W3C WAI — Understanding SC 2.3.3: Animation from Interactions. https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html
11. W3C WAI — Understanding SC 2.2.2: Pause, Stop, Hide. https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html
12. W3C WAI — Understanding SC 2.3.1: Three Flashes or Below Threshold. https://www.w3.org/WAI/WCAG22/Understanding/three-flashes-or-below-threshold.html
13. W3C WAI — Understanding SC 1.4.3: Contrast (Minimum). https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html
14. W3C WAI — Understanding SC 1.4.11: Non-text Contrast. https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html
15. W3C WAI — Understanding SC 1.4.4: Resize Text. https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html
16. W3C WAI — Understanding SC 1.4.10: Reflow. https://www.w3.org/WAI/WCAG22/Understanding/reflow.html
17. W3C WAI — Understanding SC 1.4.12: Text Spacing. https://www.w3.org/WAI/WCAG22/Understanding/text-spacing.html
18. W3C WAI — Understanding SC 1.1.1: Non-text Content. https://www.w3.org/WAI/WCAG22/Understanding/non-text-content.html
19. W3C WAI — Images Tutorial: Complex Images. https://www.w3.org/WAI/tutorials/images/complex/
20. W3C WAI — Understanding SC 4.1.2: Name, Role, Value. https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html
21. W3C WAI — Understanding SC 4.1.3: Status Messages. https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html
22. MDN — `prefers-reduced-motion` CSS media feature. https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion
23. web.dev — `prefers-reduced-motion`: Sometimes less movement is more. https://web.dev/articles/prefers-reduced-motion
24. MDN — `<canvas>`: HTML graphics canvas element. https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/canvas
25. MDN — `HTMLCanvasElement.getContext()`. https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/getContext
26. MDN — WebGL best practices. https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/WebGL_best_practices
27. MDN — `pointer` CSS media feature. https://developer.mozilla.org/en-US/docs/Web/CSS/@media/pointer
28. MDN — `hover` CSS media feature. https://developer.mozilla.org/en-US/docs/Web/CSS/@media/hover
29. MDN — `touch-action` CSS property. https://developer.mozilla.org/en-US/docs/Web/CSS/touch-action
30. MDN — `<meta name="viewport">`. https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/meta/name/viewport
31. web.dev — Learn Accessibility: Typography. https://web.dev/learn/accessibility/typography
32. web.dev — How to create high-performance CSS animations. https://web.dev/articles/animations-guide
33. web.dev — View transitions for single page applications. https://web.dev/learn/css/view-transitions-spas
34. Chrome for Developers — Same-document view transitions for single-page applications. https://developer.chrome.com/docs/web-platform/view-transitions/same-document
35. web.dev — Designing view transitions. https://web.dev/articles/designing-view-transitions
36. MDN — Progressive enhancement. https://developer.mozilla.org/en-US/docs/Glossary/Progressive_enhancement
37. MDN — `<noscript>`. https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/noscript
38. MDN — `<script>`. https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/script
39. web.dev — Learn HTML: Metadata. https://web.dev/learn/html/metadata
40. web.dev — Back/forward cache. https://web.dev/articles/bfcache
41. web.dev — Web Vitals. https://web.dev/articles/vitals
42. web.dev — Optimize Largest Contentful Paint. https://web.dev/articles/optimize-lcp
43. web.dev — Optimize Cumulative Layout Shift. https://web.dev/articles/optimize-cls
44. web.dev — Optimize Interaction to Next Paint. https://web.dev/articles/optimize-inp
45. web.dev — Browser-level image lazy loading for the web. https://web.dev/articles/browser-level-image-lazy-loading
46. web.dev — Choose the right image format. https://web.dev/articles/choose-the-right-image-format
47. web.dev — Font best practices. https://web.dev/articles/font-best-practices
48. web.dev — Performance budgets 101. https://web.dev/articles/performance-budgets-101
49. web.dev — Use Lighthouse for performance budgets. https://web.dev/articles/use-lighthouse-for-performance-budgets
50. Chrome for Developers — Lighthouse: Keep request counts low and transfer sizes small. https://developer.chrome.com/docs/lighthouse/performance/resource-summary
51. W3C WAI — Easy Checks: A First Review of Web Accessibility. https://www.w3.org/WAI/test-evaluate/preliminary/
52. W3C WAI — Selecting Web Accessibility Evaluation Tools. https://www.w3.org/WAI/test-evaluate/tools/selecting/
53. web.dev — Manual accessibility testing. https://web.dev/learn/accessibility/test-manual
54. Chrome for Developers — DevTools accessibility features reference. https://developer.chrome.com/docs/devtools/accessibility/reference
55. web.dev — How to file a good browser bug. https://web.dev/articles/how-to-file-a-good-bug
56. Awwwards — Evaluation System. https://www.awwwards.com/about-evaluation/
57. MDN — `<title>`: HTML document title element. https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/title
