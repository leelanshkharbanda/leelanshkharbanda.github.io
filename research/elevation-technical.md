# Elevation — Technical Motion Research (primary sources)

Resolves Wayfinder ticket #13 ("Research PRIMARY-source techniques for high-craft motion on a static site with no third-party libraries"), part of #10 — Wayfinder map: Elevate portfolio to Awwwards-level craft.

**Scope:** techniques for a dependency-free static site. **Sources:** primary only — MDN, W3C/WAI WCAG 2.2, Chrome for Developers, web.dev. Every factual claim carries an inline `[S#]` marker resolving to a URL and an access date in [Sources](#sources). **All sources accessed 2026-11-25.** No screenshots were produced for this ticket.

---

## 1. What the primary sources actually establish

### 1.1 CSS scroll-driven animations + `@supports` fallback

- CSS scroll-driven animations **build on CSS Animations and the Web Animations API** and animate along a *scroll-based timeline* instead of the default time-based document timeline. You pick the controlling scroller with the `scroll()` or `view()` functions, or by naming a `scroll-timeline` / `view-timeline`; `animation-range` bounds the portion of the timeline the animation attaches to, and `timeline-scope` shares a named timeline with descendants. [S1]
- The declarative form **integrates with WAAPI/CSS Animations and can run off the main thread**. The legacy alternative — `scroll` event handlers plus `getBoundingClientRect()` on the main thread — is asynchronous relative to scrolling (modern browsers scroll on a separate process) and subject to jank. Chrome exposes the APIs from Chrome 115. [S2]
- `@supports` is a **feature query**: a top-level (or nested conditional) at-rule whose block applies only when the browser supports the given `<property>: <value>` declaration or function. Conditions compose with `and`, `or`, `not`; function syntax includes `selector()` and `at-rule()`; the JS twin is `CSS.supports()` (boolean, `propertyName`/`value` or a single condition string). `@supports` itself is Baseline widely available. [S3] [S4]
- **Fallback shape:** author the *static final state* as the base rule, then override with animation only inside `@supports (animation-timeline: view())`. Because an unsupported `animation-timeline` declaration is simply ignored, the fallback is the natural resting state, not a broken mid-animation frame. Use `@media (prefers-reduced-motion: reduce)` in the same cascade layer to pin the static state back. [S1] [S3] [S17]

### 1.2 View Transitions API

- The API animates between DOM states in an SPA **and** between documents in an MPA. The mechanism is: browser snapshots old and new states, the DOM is updated while rendering is suppressed, and the transition is powered by **CSS Animations**. [S5] [S6]
- Same-document: call `document.startViewTransition(() => updateDOM())` — supported in Chrome 111. Cross-document: opt in on both pages with `@view-transition { navigation: auto; }` and let a same-origin navigation trigger it — supported in Chrome 126; there is no JS call to start it. [S6]
- **Accessibility caution from MDN:** keeping old and new content in the DOM at once can cause loss of reading position, focus confusion, and odd live-region announcements; the API offers hooks (`ViewTransition` states, skip conditions) to manage this. [S5]
- **Fallback shape:** feature-detect `document.startViewTransition`; if absent, run the DOM update immediately (plain navigation for the MPA case). `@view-transition` is inert in browsers that do not implement it. [S6]

### 1.3 Web Animations API (WAAPI)

- WAAPI combines a **Timing Model** and an **Animation Model** to give one language for DOM animation; the interfaces include `Animation`, `KeyframeEffect`, `DocumentTimeline`/`AnimationTimeline`. The CSS scroll-driven module is defined on top of it. [S7] [S1]
- `Element.animate(keyframes, options)` is the short form: creates an `Animation`, applies it, plays it, and returns it. Options accept timing properties plus `id` and `rangeEnd` (the JS equivalent of `animation-range-end`, e.g. `"entry"`, `"cover 100%"`). `Element.getAnimations()` lists active animations. [S8]
- MDN's own WAAPI accessibility guidance: blinking/flashing and certain motion can trigger ADHD, vestibular, epilepsy, migraine and scotopic-sensitivity issues; **provide a mechanism to pause or disable animation** and honour the reduced-motion media query (or the `Sec-CH-Prefers-Reduced-Motion` client hint). [S7]
- **Fallback shape:** no JS ⇒ no WAAPI animation, so the element must already be in its final visual state in CSS; feature-detect `Element.prototype.animate` before calling it.

### 1.4 Canvas 2D wavefield / constellation + devicePixelRatio caps

- The Canvas API draws graphics via JS on `<canvas>`; it is 2D-first (WebGL is the other `<canvas>` consumer) and is Baseline widely available since July 2015. [S11]
- **Canvas is a bitmap, not semantics:** it exposes no information about drawn objects, text can become blurry under magnification, and content is not surfaced to accessibility tools. MDN says to treat canvas like an image and avoid rendering significant content without accessible backing markup. [S11] → keep the canvas decorative (`aria-hidden="true"`) and put all meaning in adjacent HTML.
- `devicePixelRatio` is the physical-pixel / CSS-pixel ratio; page zoom changes it (pinch zoom does not), and it can change when the window moves to a different-density display. MDN's correction recipe: set `canvas.style.width/height` in CSS pixels, set the backing store to `size * ratio`, and scale the context by that ratio. MDN flags the property as *limited availability* — so cap it. [S12]
- **Cap rule (ours):** `const dpr = Math.min(window.devicePixelRatio || 1, 2)` — a 2× cap bounds backing-store memory and fill cost on 3× phones while staying visually sharp. Re-check on `matchMedia('(resolution: Xdppx)')` change. [S12]
- **Fallback shape:** `<canvas>` with no script is a transparent/blank box, so pair it with a static poster — a CSS gradient or inline SVG constellation — that is visible by default and only replaced once the first frame has actually been painted (add a `.is-painted` class). Reduced-motion users keep the poster. [S11] [S17]

### 1.5 IntersectionObserver + rAF choreography

- IntersectionObserver asynchronously reports changes in a target's intersection with an ancestor or the viewport. MDN explicitly lists "**deciding whether or not to perform tasks or animation processes based on whether or not the user will see the result**" as a core use case, and contrasts it with main-thread loops calling `getBoundingClientRect()` for every element. Baseline widely available since March 2019. [S13]
- `requestAnimationFrame()` runs the callback before the next repaint, generally at the display refresh rate (60/75/120/144 Hz), and is **paused in most browsers in background tabs and hidden iframes**. It is one-shot — the callback must re-request. **Always drive progress from the callback's `DOMHighResTimeStamp` argument**, or the animation runs faster on high-refresh screens; for `Window` it equals `document.timeline.currentTime`, which lets you sync WAAPI `startTime`. [S14] [S8]
- **Choreography rule (ours):** IO is the *gate*, rAF is the *clock*. IO starts/stops a single shared rAF loop; the loop never polls geometry, it only advances a timestamp-driven phase and draws. This avoids both the scroll-event jank of [S2] and the main-thread intersection loop of [S13].
- **Fallback shape:** if `IntersectionObserver` is missing, run the loop whenever the document is visible (visibilitychange gate) and accept the extra work; if JS is off, the static poster/revealed state is already present. [S13] [S16]

### 1.6 FLIP

- web.dev's Chrome Dev Summit case study describes FLIP as: set the animating elements to their **final state**, apply compositor-friendly **transforms and opacity** to invert the change back to the start position, then enable transitions on those properties and remove the inversion so elements move to their final positions — a performance win. [S10]
- web.dev's toast pattern gives the concrete four steps with WAAPI: `FIRST` measure (`offsetHeight`), mutate DOM, `LAST` measure, `INVERT` = `last - first`, `PLAY` via `element.animate([{transform: translateY(invert)}, {transform: translateY(0)}], {duration, easing})` with `animation.startTime = document.timeline.currentTime`. The same pattern gates on `matchMedia('(prefers-reduced-motion: no-preference)')` and uses `role="status"` / `aria-live="polite"` for the announced result. [S9] [S14]
- **Fallback shape:** FLIP is pure enhancement — skip it and the DOM is already at its final layout. Measure only when motion is allowed. [S9] [S17]

### 1.7 Pointer effects with keyboard/touch parity

- Pointer events unify mouse, pen/stylus and touch under one event model (`pointerdown`/`pointermove`/`pointerup` analogously to mouse events), with `PointerEvent.pointerType` for device-specific handling; the events inherit `MouseEvent` properties. Baseline widely available since July 2020; `touch-action` interacts with them. [S15]
- **WCAG 2.2 SC 2.1.1 Keyboard (A):** all functionality must be operable through a keyboard interface without requiring specific keystroke timings; pointer effects that reveal or control content therefore need a keyboard equivalent. [S18]
- **WCAG 2.2 SC 2.5.7 Dragging Movements (AA, new in 2.2):** any action that uses dragging must be achievable with a single pointer without dragging unless dragging is essential — e.g. clicking/tapping anywhere on a slider track as an alternative to dragging the thumb. [S19]
- **Parity rule (ours):** make the effect *decorative* (pointer parallax never gates content) and bind the same state change to `focusin` and `click`/`tap` on a real `<button>`; avoid drag-only interactions entirely, or add a tap-target alternative per [S19].

### 1.8 Performance guards

- `prefers-reduced-motion`: `no-preference` (false) / `reduce` (true); `@media (prefers-reduced-motion)` ≡ `@media (prefers-reduced-motion: reduce)`. It asks for motion to be **removed, reduced or replaced**; scaling/panning large objects are vestibular triggers. Baseline widely available since January 2020. [S17]
- `visibilitychange` fires when visibility status changes (tab switch, minimise, app switch); use `document.hidden` / `document.visibilityState`. Transition to `hidden` is the last reliably observable event and is the right place to stop UI updates and background work. [S16]
- Together with [S14] (rAF already throttled in background tabs) and [S13] (IO gate), the guard stack is: **reduced-motion → don't start; offscreen → don't start; hidden → stop and cancel the rAF id.**
- Core Web Vitals thresholds (all judged at the **75th percentile**, segmented mobile/desktop): **LCP ≤ 2.5 s** (render time of the largest visible image/text/video), **INP ≤ 200 ms** (longest interaction, outliers ignored, across click/tap/keyboard for the whole visit), **CLS ≤ 0.1** (largest session-window burst of layout shifts). [S20] [S21] [S22]

---

## 2. Feasibility matrix — impact vs JS weight vs a11y risk

JS weight = rough minified+gzipped cost of a from-scratch implementation on this static site (no libraries). Impact = craft/perceived-quality payoff. Risk assumes the mitigations in §1 are applied.

| Technique | Impact | JS weight | A11y risk | Mitigation / no-JS fallback | Verdict |
|---|---|---|---|---|---|
| CSS scroll-driven animation + `@supports` | **High** (signature scrub, off-main-thread) | ~0 KB (CSS only) | Low–Med (motion sensitivity; must be reduced-motion aware) | Static final state as base rule; `@supports` overrides; reduced-motion pins state | **Adopt first** — best impact/byte ratio [S1] [S2] [S3] |
| View Transitions (MPA `@view-transition` + SPA feature-detect) | **High** (seamless nav) | ~0.3–1 KB | **Med** (dual DOM: focus, reading position, live regions) | Plain navigation fallback; skip transitions on reduced motion; manage focus after | **Adopt (MPA opt-in)** [S5] [S6] |
| FLIP + WAAPI (`Element.animate`) | **Med–High** (state morphs feel native) | ~1.5–2.5 KB | Low (transform-only; announce result via live region) | DOM ends at final layout anyway; skip measurement | **Adopt** — reuse for chips/filters [S8] [S9] [S10] |
| Pointer parallax with parity | **Med** (tactile hero) | ~0.8–1.2 KB | **Med** (SC 2.1.1 / 2.5.7 if it controls content) | Decorative only; real buttons + focusin; tap alternative; no drag | **Adopt (decorative)** [S15] [S18] [S19] |
| Canvas wavefield / constellation (DPR-capped) | **High** (the visual signature) | ~7–9 KB | **Med–High** (bitmap not exposed to AT; zoom blur; CPU) | `aria-hidden`; static SVG/CSS poster; DPR cap ≤2; paint-once gate | **Adopt as supporting system, budget-capped** [S11] [S12] |
| IntersectionObserver + rAF choreography | **Med** (enabler, invisible to user) | ~1.5–2.5 KB (shared runtime) | Low (it's a gate, not a motion source) | Visible-by-default content; IO absence → visibility gate only | **Adopt (shared runtime)** [S13] [S14] |
| Performance guards (reduced-motion, visibilitychange, offscreen pause) | **High** (protects all gates + a11y) | ~0.5–1 KB | **Reduces risk** | Native CSS fallback; JS feature-detect | **Mandatory** [S17] [S16] |
| Instrumentation (LCP/INP/CLS `PerformanceObserver`) | Low (craft-neutral) but **High** (gate enforcement) | ~1–1.6 KB (dev-only) | None | Not shipped to users / no-JS irrelevant | **Adopt in dev build** [S20] [S21] [S22] |

**Deferred / rejected:** WebGL, third-party animation libraries, drag-to-reorder effects (would need a [S19] alternative for little payoff), and any canvas-rendered *text content* ([S11] a11y concern).

---

## 3. Concrete implementation recipe (≤ 20 KB JS total)

Two deliverables: **(A)** one signature hero experience and **(B)** one supporting graphic system. Both ship with a static/no-JS fallback, and both share a single guarded runtime.

### 3.1 Byte budget (minified + gzipped)

| Module | Budget |
|---|---|
| Shared runtime: feature detect, `matchMedia('(prefers-reduced-motion: reduce)')`, `visibilitychange`, one IO+rAF scheduler | 2.4 KB |
| (A) Signature hero: MPA View Transition opt-in, FLIP chip morph, pointer/keyboard parity | 6.8 KB |
| (B) Supporting canvas wavefield/constellation: DPR cap, resize, draw, IO pause | 8.1 KB |
| Measurement harness (`PerformanceObserver` for LCP/INP/CLS; dev build only) | 1.6 KB |
| **Total** | **18.9 KB** (1.1 KB headroom under 20 KB) |

### 3.2 Shared runtime (do this once)

1. `const reduce = matchMedia('(prefers-reduced-motion: reduce)')`; treat `reduce.matches` as a hard stop for every rAF loop and FLIP measurement. Mirror it in CSS with `@media (prefers-reduced-motion: reduce)` so the no-JS case is also calm. [S17]
2. One `visible` flag driven by `visibilitychange` (`document.hidden`); on `hidden`, call `cancelAnimationFrame(id)` and set `id = 0`; on visible, re-arm only if an IO reports the target intersecting. [S16] [S14]
3. One IO for all animated regions with `threshold: 0` and `rootMargin: '100px'`; entry/exit toggles the shared rAF loop, never geometry reads. [S13]
4. The rAF callback takes `t` (DOMHighResTimeStamp), computes phase from `t` (never frame count), and assigns `animation.startTime = document.timeline.currentTime` when kicking WAAPI animations so CSS/JS stay in sync. [S14] [S9]

**No-JS fallback:** none of this runs; CSS base rules and the poster are already the final state.

### 3.3 (A) Signature hero experience — "Signal Trace Hero"

A hero whose headline and project chips reveal on scroll, and whose chips FLIP-morph the featured project summary, with a cross-document View Transition into the project page.

**Markup (progressive enhancement):**
```html
<header class="hero">
  <h1>Signal, measured.</h1>
  <p class="hero__lede">Hardware-aware software from IIIT Delhi.</p>
  <nav class="chips" aria-label="Featured work">
    <a class="chip" href="/projects/chronos-dsp">Chronos DSP</a>
    <a class="chip" href="/projects/risc-v">RV32I</a>
  </nav>
  <div class="hero__summary" aria-live="polite"><!-- server-rendered default --></div>
</header>
```

**CSS (zero JS, two feature queries):**
```css
/* Base = final, static, no-JS state */
.hero__summary { opacity: 1; transform: none; }

@supports (animation-timeline: view()) {
  @media (prefers-reduced-motion: no-preference) {
    .hero > * {
      animation: rise linear both;
      animation-timeline: view();
      animation-range: entry 0% cover 35%;
    }
    @keyframes rise { from { opacity: 0; transform: translateY(1.5rem); } }
  }
}
@view-transition { navigation: auto; } /* MPA opt-in; inert where unsupported */
```
This follows [S1] (`view()`, `animation-range`), [S3] (feature query), [S17] (reduced motion) and [S6] (MPA opt-in). Where any of these are unsupported, the base rule is the visible, finished hero.

**JS behaviour (feature-detected, ~6.8 KB):**
- Chip click: if `document.startViewTransition` exists, wrap the summary DOM swap in it; otherwise swap directly (normal link navigation still works with JS off). [S6]
- If the swap is same-document, use FLIP: measure `first`, update, measure `last`, invert with `translateY`, play with `element.animate(..., {duration: 150, easing: 'ease-out'})` and sync `startTime = document.timeline.currentTime`; skip entirely when `reduce.matches`. [S9] [S8] [S10]
- Pointer parallax: on `pointermove` of the hero, translate the decorative accent by ≤ 6 px, throttled through the shared rAF; **never** gate content on it. Bind the identical state change to `focusin` on the chips and to `click`, so keyboard and touch get parity; no drag-only affordance (SC 2.1.1 / 2.5.7). [S15] [S18] [S19]
- After any transition, restore focus to the activated control; MDN flags focus confusion as the main VT accessibility hazard. [S5]

**Static/no-JS fallback:** fully server-rendered headline, lede, chip links and summary; the accent sits at its resting position; links are ordinary navigations. The hero is complete and usable with JS disabled or failed.

### 3.4 (B) Supporting graphic system — "DPR-capped constellation / wavefield"

A decorative canvas used as the hero backdrop and repeated as a section divider; it renders a slowly drifting node field plus animated wave rings.

**Markup + fallback:**
```html
<div class="field" aria-hidden="true">
  <svg class="field__poster" viewBox="0 0 800 450" preserveAspectRatio="xMidYMid slice">…static nodes…</svg>
  <canvas class="field__canvas" width="1" height="1"></canvas>
</div>
```
The SVG poster is visible by default; the canvas is transparent until the first successful frame, at which point JS adds `.is-painted` (CSS hides the poster). With no JS, only the poster renders. Because canvas output is not exposed to assistive tech, `aria-hidden="true"` plus adjacent real HTML text is the correct pattern. [S11]

**Sizing (the DPR cap):**
```js
const dpr = Math.min(window.devicePixelRatio || 1, 2);      // cap at 2 [S12]
const w = canvas.clientWidth, h = canvas.clientHeight;
canvas.width  = Math.round(w * dpr);
canvas.height = Math.round(h * dpr);
ctx.setTransform(dpr, 0, 0, dpr, 0, 0);                     // draw in CSS px [S12]
```
Recompute on `resize` and on `matchMedia('(resolution: ${dpr}dppx)')` change; cap node count by area (e.g. `Math.min(90, w*h/9000)`) so fill cost is bounded. [S12]

**Choreography:** IO reports the `.field` intersecting; only then does the shared rAF loop advance phase from the timestamp and redraw; on non-intersection or `document.hidden`, cancel the frame id. [S13] [S14] [S16] With `prefers-reduced-motion: reduce`, skip the loop and keep the poster (motion would be scaling/panning large objects, a vestibular trigger). [S17]

**Static/no-JS fallback:** the inline SVG poster — no blank box, no layout shift (the wrapper has a fixed `aspect-ratio` so CLS stays 0).

### 3.5 Measurement gates

| Gate | Target | How enforced here | Primary source |
|---|---|---|---|
| LCP | ≤ 2.5 s (p75) | Hero `<h1>` and poster are in the initial HTML/CSS; no JS before first paint; all motion modules `defer`ed; VT snapshots never delay first content | [S20] |
| INP | ≤ 200 ms (p75) | Scroll scrub is off-main-thread CSS; IO+rAF does no geometry reads; FLIP measures at most two `offsetHeight`s per interaction and only when motion allowed; pointer work is ≤6 px transform in rAF | [S21] [S2] [S9] |
| CLS | ≤ 0.1 (p75) | Canvas wrapper has `aspect-ratio`; poster→canvas swap is same-size and opacity-only; FLIP uses `transform`, never layout-moving properties | [S22] [S10] |

Dev-build harness (not shipped): `PerformanceObserver` with `type: 'largest-contentful-paint'`, `type: 'event'` (`duration`, `interactionId`) for INP, and `type: 'layout-shift'` (`hadRecentInput === false`) for CLS; report the 75th percentile, split mobile/desktop. Fail CI if any gate regresses. [S20] [S21] [S22]

---

## 4. Static / no-JS fallback summary (every technique)

| Technique | With JS | Without JS / unsupported |
|---|---|---|
| Scroll-driven animation | `view()` timeline inside `@supports` | Base rule = finished state [S1] [S3] |
| View Transitions | `document.startViewTransition` / `@view-transition` | Ordinary same-origin navigation [S6] |
| WAAPI / FLIP | `Element.animate` morphs | DOM already at final layout [S8] [S9] |
| Canvas wavefield | DPR-capped animated field | Inline SVG poster [S11] [S12] |
| IO + rAF | IO-gated rAF loop | Content visible by default; no loop [S13] |
| Pointer effects | Decorative parallax + parity bindings | Static accent, native focus/links [S15] [S18] |
| Performance guards | reduced-motion, visibilitychange, offscreen pause | CSS `@media (prefers-reduced-motion)` keeps it calm [S17] [S16] |
| Measurement | Dev-only `PerformanceObserver` | N/A (not user-facing) |

---

## Sources

All accessed **2026-11-25**. Primary domains only.

| ID | Source | URL |
|---|---|---|
| S1 | MDN — CSS scroll-driven animations | https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_scroll-driven_animations |
| S2 | Chrome for Developers — Animate elements on scroll with Scroll-driven animations | https://developer.chrome.com/docs/css-ui/scroll-driven-animations |
| S3 | MDN — `@supports` CSS at-rule | https://developer.mozilla.org/en-US/docs/Web/CSS/@supports |
| S4 | MDN — `CSS.supports()` static method | https://developer.mozilla.org/en-US/docs/Web/API/CSS/supports_static |
| S5 | MDN — View Transition API | https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API |
| S6 | Chrome for Developers — Smooth transitions with the View Transition API | https://developer.chrome.com/docs/web-platform/view-transitions/ |
| S7 | MDN — Web Animations API | https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API |
| S8 | MDN — `Element.animate()` | https://developer.mozilla.org/en-US/docs/Web/API/Element/animate |
| S9 | web.dev — Toast pattern (FLIP code example) | https://web.dev/patterns/components/toast/pattern |
| S10 | web.dev — Chrome Dev Summit 2014 case study (FLIP) | https://web.dev/case-studies/chrome-dev-summit |
| S11 | MDN — Canvas API (accessibility concerns) | https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API |
| S12 | MDN — `Window.devicePixelRatio` | https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio |
| S13 | MDN — Intersection Observer API | https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API |
| S14 | MDN — `Window.requestAnimationFrame()` | https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame |
| S15 | MDN — Pointer events | https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events |
| S16 | MDN — `Document: visibilitychange` event | https://developer.mozilla.org/en-US/docs/Web/API/Document/visibilitychange_event |
| S17 | MDN — `prefers-reduced-motion` media feature | https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion |
| S18 | W3C/WAI — Understanding SC 2.1.1 Keyboard (WCAG 2.2, Level A) | https://www.w3.org/WAI/WCAG22/Understanding/keyboard.html |
| S19 | W3C/WAI — Understanding SC 2.5.7 Dragging Movements (WCAG 2.2, Level AA) | https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements.html |
| S20 | web.dev — Largest Contentful Paint (LCP) | https://web.dev/articles/lcp |
| S21 | web.dev — Interaction to Next Paint (INP) | https://web.dev/articles/inp |
| S22 | web.dev — Cumulative Layout Shift (CLS) | https://web.dev/articles/cls |

**Non-goals / open risks:** browser support for `animation-timeline` and cross-document VT is still partial — the fallbacks above are therefore load-bearing, not decorative. MDN marks `devicePixelRatio` as limited availability, reinforcing the 2× cap and poster fallback. Canvas CPU cost must be verified on low-end mobile against the INP gate before increasing node counts. No third-party libraries were evaluated or recommended.
