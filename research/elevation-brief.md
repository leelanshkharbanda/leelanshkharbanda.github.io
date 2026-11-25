# Elevation brief — v2 portfolio (Wayfinder #14)

Synthesised from the four-seat visual brief council after it viewed 30+ captured screenshots: new award-site references in `.scratch/elevation-shots/refs2/` and the v1 baseline in `.scratch/elevation-shots/v1-baseline/`. Evidence: `research/elevation-sources.md`, `research/elevation-visual.md`, `research/elevation-technical.md`. Principles only — no reference assets, fonts, copy, values or code.

## 1. Positioning and first paint

- h1, real text in initial HTML: **"Model it. Measure it. Show the trace."**
- Visible identity lockup in the 56px utility bar: `[LK] Leelansh Kharbanda` (mono, 16px, 44px+ hit area). Name is no longer the largest element on the page.
- Sub-line under h1: "Software that models and measures the machine underneath — signal processing, computer architecture, local-first tools." No employer, job title, completed-degree, graduation-year or experience claims.
- Primary CTA: `See the work` (real anchor, 44px target). Secondary: `GitHub` and `email` in mono.
- First-10-seconds gate: at 1280x800 and 390x844, before scroll, the visitor sees the identity lockup, h1 hook, one-line positioning, one dominant artifact, and the CTA/links. No loader, veil, progress counter or JS-gated content.

## 2. Visual language

A dark instrument stage inside a warm editorial page. The hero and section dividers use a near-black field; the reading chapters stay on warm paper. This gives the dark, one-accent drama the visitor asked for without sacrificing light/dark parity or legibility.

| Token | Light theme | Dark theme | Use / measured ratio |
|---|---|---|---|
| `--paper` | `#F3F0E8` | `#0D0E10` | page field; dark overrides whole document |
| `--stage` | `#0D0E10` | `#0D0E10` | instrument stage, both themes; stage surface always uses stage tokens below |
| `--ink` | `#141618` | `#F2EFE7` | body/large text; 15.93:1 / 16.81:1 on their field |
| `--stage-ink` | `#F2EFE7` | `#F2EFE7` | text on stage; 16.81:1 in both themes |
| `--muted` | `#6B6A64` | `#A9A69E` | small labels on paper; 4.76:1 / 7.94:1 |
| `--stage-muted` | `#A9A69E` | `#A9A69E` | small labels on stage; 7.94:1 in both themes. `--muted` light is 3.56:1 on stage and MUST NOT be used there |
| `--signal` | `#C5351A` | `#FF5A33` | accent on PAPER only: 4.73:1 light; never for text on stage |
| `--stage-signal` | `#FF5A33` | `#FF5A33` | trace, readout numerals and stamped tag on stage; 6.22:1 in both themes |
| `--signal-hi` | `#C5351A` | `#FF5A33` | large graphics/fills only; keep `#C5351A` (3.58:1 on stage) out of stage text |
| `--rule` | `rgba(20,22,24,.22)` | `rgba(242,239,231,.24)` | DECORATIVE staff rules only (1.60:1 / 1.98:1), never a control boundary |
| `--rule-ui` | `rgba(20,22,24,.62)` | `rgba(242,239,231,.50)` | input borders, chip boundaries, focus companions, state boundaries; >=3:1 (light 4.83:1) |
| focus | 3px `--ink` on paper / `--stage-ink` on stage, 2px offset + paper halo | same | >=3:1 in both themes; never bind focus on stage to light `--ink` (1.06:1) |

Accent is reserved for the signal trace, readout numerals and one stamped tag; never body copy, never the sole carrier of status. Ratios recomputed with the WCAG formula on 2026-11-25. No single red clears 4.5:1 on both paper and stage, which is why accent tokens are surface-bound.

**Type — system only, no `@font-face`, no preload, zero font-driven CLS:**
- UI/claims: `ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`, weight 700 for display, tracking tightened as size grows.
- Data/labels: `ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace`, minimum 14px (mobile floor 14px), line-height >=1.5, letter-spacing <=0.06em, sentence case where possible.
- Scale law: `--u: clamp(1rem, 0.9rem + 0.5vw, 1.125rem)` (16-18px); section heads ~2.6u, lead 1.4u, body 1u, labels 0.8u with the 14px floor. Set `body { font-size: max(1rem, var(--u)) }` so body never drops below 16px.
- **The oversized glyph is decoupled from `--u`**: `--glyph: clamp(380px, 92svh, 980px)` (or `min(118vw, 96svh)`), positioned absolutely with bottom overflow hidden; the 14u-from-type-unit idea is rejected because 14u of a 14-18px unit cannot fill an 800px stage.
- Accessibility floor: body >=16px/1.6, mono labels >=14px/1.5, no ultra-thin weights, `overflow-wrap: anywhere` on display text, no clipping at 320px.

## 3. Hero — one signature experience: "Instrument stage"

- Full-viewport dark stage using `100svh` (not `100vh`) so the lockup, h1, positioning, artifact and CTA all fit at 390x844 and 320px. An **original oversized signal glyph** — an eye-diagram opening drawn as two crossing bracket strokes — uses `--glyph` and is scaled past the bottom edge so it reads as a shape before text (lineage: matvoyce / CRL glyph-as-landscape, but original geometry). The glyph is `aria-hidden`.
- Across the glyph runs a **real Chronos-DSP ray-path artifact**: transmitter, two planar walls, receiver, and labelled line-of-sight / image-source reflection / knife-edge diffraction paths, drawn as inline SVG with a vermilion `--stage-signal` trace. Along the bottom, a thin FFT spectrum strip (`aria-hidden`). This is the stop-and-screenshot image; it is labelled `SIMULATION — NOT A LIVE RADIO`. The ray-path SVG is **not** aria-hidden wholesale: expose `role="img"` with `<title>`/`<desc>` and an adjacent visible text list naming the three path types and the scope note, so the meaning survives without sight.
- The h1 hook, positioning line and CTA sit in the glyph's counter / upper-left reading area, not centred over the graphic. Small mono readout reports only truthful values: `QPSK · AWGN · SEED 42` is **not** allowed unless verified; use `QPSK · AWGN · BER 0` (v1's seeded model) and `RUST NIF / ELIXIR PHOENIX`, `RV32I`, `C=64 (SIMULATED)` from the source research.
- Load: accent trace draws over ~900ms ease-out, glyph settles 0.94 -> 1 over ~700ms, readout typewriter-free (no fake counter). **Base/no-JS CSS is the final composed frame** (`stroke-dashoffset:0`, `transform:scale(1)`, static marquee row); the draw/settle/marquee run only inside `prefers-reduced-motion: no-preference` (scroll-driven parts additionally gated by `@supports (animation-timeline: view())`). With `prefers-reduced-motion: reduce` the final frame renders immediately.
- Decorative canvas: DPR capped at 2, node count `min(90, w*h/9000)`, one IO-gated rAF loop, cancelled offscreen and on `document.hidden`; inline SVG poster underneath, `.is-painted` only after first successful frame; `aria-hidden="true"`. No canvas text.
- No-JS: the complete h1, positioning, SVG glyph/ray-path poster, CTA and links are server-rendered; no blank stage, no loader.

## 4. Supporting graphic system — "measurement rail"

- Section dividers are staff rules with mono tick labels and real values only (`01 / FIELD`, `QPSK · AWGN`, `RV32I`, `4-EVENT PMU`, `C=64 · SIMULATED`). Hand-drawn inline-SVG brackets/circles annotate the plots; no decorative emojis.
- A single marquee band carries **real, citable values** from the repos: `ELIXIR/PHOENIX CONTROL PLANE`, `RUST NIF DATA PLANE`, `SEED-REPRODUCIBLE AWGN`, `RV32I TWO-PASS`, `4-EVENT PMU`, `C=64 · SIMULATED`. It freezes to a static row under reduced-motion and is `aria-hidden` with an adjacent text list.
- Three small vector stamps with truthful labels: `SIMULATION`, `LOCAL-FIRST`, `OPEN SOURCE`. No borrowed badge art.
- The faint ray-path/constellation field repeats once as a section divider, never as wallpaper.

## 5. Case studies and index

Each project is a **datasheet**, not a card grid: a measurement-console frame, a left gutter of numbered real facts, one large artifact, restrained copy, and a direct link.
1. Chronos-DSP — large ray-path diagram + QPSK constellation/BER readout; scope note "simulator, not a live radio".
2. Modulation Studio — live FFT/constellation view (link to the working demo); named schemes only, no hard count.
3. MoE Memory Wall — C=64 vs C=224 comparison, explicitly "reported by simulation", group course project.
Index entries: RISC-V trace, HPC_Boost 4 PMU events, Life OS local-first, Tasveer media society (first person, verified facts only). Forks absent; no fabricated metrics.

## 6. Motion, fallbacks and gates

- One guarded runtime, zero libraries, JS <=20KB min+gzip. `--dur-fast:120ms`, `--dur-base:220ms`, `--ease:cubic-bezier(.2,.8,.2,1)`; trace draw 900ms; all reveals 400-500ms.
- Scroll reveals use `@supports (animation-timeline: view())` + `prefers-reduced-motion: no-preference` only; the finished state is the base rule. FLIP/WAAPI chip morphs 150ms, with focus restored to the activating control. Pointer parallax capped at 6px, decorative, with `focusin`/`click` parity; no drag-only path.
- `prefers-reduced-motion: reduce`: all durations 0.01ms, marquee frozen, canvas loop stopped, static final frame, `scroll-behavior:auto`.
- No-JS: all content, headings, links and the SVG poster present and navigable. The **native range control is visible in the no-JS/failed-init fallback** together with the pre-rendered clean SVG and its authoritative static text readout (`AWGN · SNR ∞ · BER 0`); it is hidden ONLY after the module initializes successfully and an equivalent labelled, keyboard-operable control with `aria-valuetext` and `aria-live="polite"` readout is proven live. If enhancement never initializes, keep the native range present but `disabled` with an `aria-describedby` explaining that the readout is a static reference — never leave a responsive-looking control with no effect. This matches `research/design-brief.md` and must not be inverted.
- Instrumentation: the 1.6KB `PerformanceObserver` harness in `research/elevation-technical.md` is dev-only and MUST NOT ship; glyph/trace/marquee effects are CSS, and only the DPR-capped (<=2) decorative field canvas uses the single IO-gated rAF loop, cancelled offscreen and on `document.hidden`, node count `min(90, w*h/9000)`, SVG poster and `.is-painted` after first frame. No libraries, no per-frame geometry reads. Dev-only measured gates: p75 LCP <=2.5s, INP <=200ms, CLS <=0.1.
- Accessibility binding constraints: one h1, real heading order, named landmarks, skip link, focus not obscured (fix v1's mobile heading clipping with `scroll-margin-top: calc(var(--header-h) + 16px)` and mobile section padding), targets >=44px on mobile and >=24px elsewhere, AA contrast in both themes, `aria-hidden` on decorative graphics with adjacent text alternatives, `aria-live="polite"` for any readout change, 320px reflow and 200% zoom without horizontal scroll, theme parity, `@media (forced-colors: active)` support.
- Measurement gates: p75 LCP <=2.5s, INP <=200ms, CLS <=0.1; no off-site runtime requests; zero console errors.

## 7. Lineage and why this is a real leap

Primary lineage: **matvoyce** (one oversized form owns the fold), **cydstumpel** (two-ink system, one vivid accent, real-value band, stamped truth), **kernsociety** (dark field, one bold mark, tiny numeric state), with **robinpayot**'s pinned-stage/long-runway idea reduced to an ordinary scroll with one sticky instrument moment. Loader veils from Immersive Garden, Lusion, Resn, Jesper Landberg and Maria Vasilyeva are explicit anti-patterns.

v1's largest element was the person's name and its only graphic was a small framed widget; the rest was uniform two-column editorial rhythm. v2 makes an original signal glyph plus real ray-path artifact the largest element, moves the identity to a quiet lockup, turns the widget into a site-wide measurement language, and adds one disciplined motion narrative — while keeping every content fact, a11y gate and performance gate. That is a change of art direction, not a coat of paint.

## 8. Anti-goals

No loader/progress veil; no JS-gated content; no WebGL/Three/GSAP/jQuery/CDN/webfont; no copied glyphs, badges, values, copy or component code; no stock photography; no rainbow accents; no name-as-headline; no buried artifacts; no unlabelled simulation; no fake counters or fabricated metrics; no mobile sticky-header clipping; no hover-only or drag-only affordance; no more than one hero experience and one supporting graphic system.

## 9. Council status

All four seats signed off on the direction. Exact post-sign-off fixes are written into sections 2, 3 and 6: surface-bound accent/muted/rule tokens (B1/B3), native-range fallback semantics (B2), glyph scale decoupled from `--u`, ray-path SVG exposed with `role="img"`, final composed frame as the base rule, `100svh` stage, and exclusion of dev-only instrumentation from the shipped JS. The prototype must match these tokens and gates before the next visual review.
