# Static Portfolio Engineering Patterns — Primary-Source Research

Resolves Wayfinder ticket #4 ("Research — Static portfolio engineering patterns from primary sources"), part of the map "Wayfinder — Ship Leelansh's engineering portfolio" (#1).

**Scope:** concrete, implementable patterns for a static portfolio that is fast, accessible, and resilient. **Sources:** primary only — W3C/WAI WCAG 2.2 Understanding docs, MDN, web.dev, Chrome for Developers, GitHub Docs. Every claim below carries an inline `[S#]` marker resolving to a URL and an access date in the [Sources](#sources) table. **All sources accessed 2026-11-25.**

---

## 1. Semantic document structure, landmarks, headings, focus

- **Use native sectioning elements for landmarks.** `<header>`, `<nav>`, `<main>`, `<aside>`, `<footer>` create the corresponding `banner`, `navigation`, `main`, `complementary`, and `contentinfo` landmark roles; `landmark` itself is an *abstract* role and `role="landmark"` must not be used. Prefer the semantic element over adding a role to a `<div>`; redundant roles on semantic elements are only a legacy-browser courtesy. [S3]
- **Name repeated landmarks.** Give each repeated landmark (e.g. multiple `<nav>` elements) a visible label referenced by `aria-labelledby`, or a brief descriptive `aria-label`. Landmarks act like skip links for screen-reader users but do not replace in-page navigation. [S3]
- **Structure must survive restyling (SC 1.3.1, Level A).** Information and relationships conveyed by visual formatting must be programmatically determinable, so use semantic HTML (`H101`, `G115`) rather than visual-only styling; `role="heading"` and `aria-labelledby` are the documented ARIA alternatives. [S1]
- **Headings mark section starts (technique H69).** Put heading elements at the beginning of each content section; this is an W3C-sufficient technique both for info-and-relationships and for bypassing repeated blocks. Keep exactly one `<h1>` for the page and nest subsequent levels without skipping — the W3C rule is that sections have headings, so the practical implementation is a single `<h1>` plus a consistent `<h2>`/`<h3>` outline. [S1] [S2]
- **Skip block (SC 2.4.1, Level A).** Provide a "skip to main content" link at the top of every page pointing at the `<main>` target (technique `G1`); W3C also accepts ARIA landmarks (`ARIA11`) and section headings (`H69`) as sufficient mechanisms. The skip link must be keyboard-reachable, not hidden with `display: none`. [S2]
- **Focus visible (SC 2.4.7, Level AA).** There must be a mode of operation where the keyboard focus indicator is visible, and it must not be time-limited. W3C lists `:focus-visible` as sufficient technique `C45` and "outline: none / border: 0" that removes the indicator as failure `F78`. Because the indicator is non-text, it is also subject to the 3:1 non-text contrast requirement. [S4] [S7]
- **Focus not obscured (minimum) (SC 2.4.11, Level AA, new in WCAG 2.2).** When a component receives keyboard focus it must not be *entirely* hidden by author-created content — sticky headers/footers and cookie banners are the classic failures (`F110`). Use `scroll-padding` on the scroll container to keep focused elements clear of sticky chrome (technique `C43`); AAA `2.4.13 Focus Appearance` gives stricter guidance. [S5] [S4]
- **Keep DOM order equal to reading/visual order.** Since sequential navigation and programmatic structure follow the DOM, injecting cards with CSS `order` or positive `tabindex` that disagrees with source order breaks the 1.3.1/2.4.1 mechanisms above. Implement the visual sequence in the HTML itself. [S1] [S2]

## 2. WCAG 2.2 contrast and target size (AA)

- **Text contrast (SC 1.4.3, AA): 4.5:1** for normal text and images of text; **3:1** for large text (18 pt / 14 pt bold ≈ 24 px / 18.5 px). Exempt: inactive UI, pure decoration, text inside a picture with significant other content, and logotypes. Thresholds are not rounded — 4.499:1 fails. Apply to placeholder and hover/focus text too. [S6]
- **Non-text contrast (SC 1.4.11, AA): 3:1** against adjacent colors for visual information needed to identify UI components and states, and for graphical objects required to understand content; inactive components and UA-determined appearances are exempt. A focus indicator is non-text content, so its colors must reach 3:1 (e.g. `#949494` on white). No rounding: 2.999:1 fails. [S7]
- **Target size (minimum) (SC 2.5.8, AA): 24 × 24 CSS px** — a solid 24×24 square aligned to the page must fit inside the target. Exceptions: **spacing** (undersized targets whose 24 px-diameter centering circles do not intersect another target), **equivalent** control elsewhere, **inline** links in a sentence / constrained by line-height, **user-agent**-sized controls untouched by the author, and **essential** presentation. The requirement is independent of zoom. For comparison, AAA `2.5.5 Target Size (Enhanced)` is 44 × 44 px; aim for 44 px on the portfolio's primary nav and CTA buttons even though AA only demands 24. [S8]
- **Practical palette rule:** body text ≥ 4.5:1, headings ≥ 3:1 at large sizes, borders/icons/focus rings ≥ 3:1, and ≥ 24 px hit areas (44 px preferred). Verify both light and dark themes against these numbers. [S6] [S7] [S8]

## 3. `prefers-reduced-motion` and `prefers-color-scheme`

- **`prefers-reduced-motion` is Baseline widely available (since January 2020).** Values are `no-preference` (false) and `reduce` (true); `@media (prefers-reduced-motion)` is equivalent to `@media (prefers-reduced-motion: reduce)`. It signals a desire to remove, reduce, or replace non-essential motion; scaling and panning large objects are vestibular triggers. MDN's own pattern is to *replace* the triggering animation with a calmer cross-fade rather than leaving it running, and equal-specificity rules placed later in source order win. [S9]
- **Portfolio recipe:** make still content the default; inside `@media (prefers-reduced-motion: reduce)` set `animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; scroll-behavior: auto !important` and drop any `transform`/parallax movement. Replace entrance slides with an opacity fade if any motion is kept. [S9]
- **`prefers-color-scheme` is Baseline widely available.** Values are `light` (light preferred or no active preference) and `dark` (dark preferred), sourced from an OS or UA setting. Define the light theme as the base and override under `@media (prefers-color-scheme: dark)`, which keeps the page usable where the feature is unsupported. [S10]
- **Align native UI with the theme.** Use the CSS `color-scheme` property (and, where appropriate, `<meta name="color-scheme">`) so form controls and scrollbars follow the chosen theme; MDN notes the media query also works for embedded cross-origin SVGs/iframes, which must be embedded via `<img>` rather than inlined to inherit the parent scheme. [S10]
- **No FOUC, no JS theme state:** pure CSS variables + the two media queries give a system-following theme with no flash of the wrong palette and no external dependency. [S10]

```css
:root { color-scheme: light dark; --bg: #fafafa; --fg: #16181d; }
@media (prefers-color-scheme: dark) { :root { --bg: #0d0f12; --fg: #eef0f3; } }
html { scroll-behavior: smooth; scroll-padding-top: 5rem; }
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

## 4. Scroll-driven animation as progressive enhancement

- **What it is.** Scroll-driven animations tie an animation to scroll position rather than the document clock. Chrome shipped declarative **Scroll Progress Timelines** and **View Progress Timelines** in Chrome 115; they integrate with the Web Animations API and CSS Animations and can run **off the main thread**, avoiding the jank of main-thread scroll handlers. [S11] [S12]
- **Primitives.** `animation-timeline: scroll()` creates an anonymous Scroll Timeline (`scroll(root block)` = document viewport, block axis; defaults are `nearest`/`block`); `view()` and `view-timeline` track an element's position in its scroller from first intersection to last; `animation-range` limits the attachment range and `timeline-scope` hoists a named timeline to an ancestor. [S11] [S12]
- **Feature-detect, don't polyfill blindly.** `@supports` is a CSS feature query; the declaration syntax `@supports (animation-timeline: view())` tests property/value support, and `CSS.supports()` exposes the same check to JS. Wrap scroll effects in a feature query so unsupported browsers simply see the unanimated layout. [S13]
- **Layer the guards correctly:** base content is fully visible and functional → `@media (prefers-reduced-motion: no-preference)` → `@supports (animation-timeline: view())`. Both guards matter: the first is an accessibility requirement, the second a compatibility one. [S9] [S13]
- **Never rely on the animation to reveal content.** An element must not start at `opacity: 0` and depend on a timeline to become visible — if the timeline is unsupported or motion is reduced, the content disappears. Animate only decorative accents, reading-progress bars, and gentle entrance opacity; keep transform/opacity-only animations so they stay compositor-friendly (Chrome's own progress-bar demo scales with `transform` rather than animating `width`). [S11]
- Keep sticky headers in mind: `scroll-padding-top` both preserves focus visibility (SC 2.4.11) and gives view-timeline subjects room to breathe. [S5]

```css
.reveal { opacity: 1; }                     /* base: always readable */
@media (prefers-reduced-motion: no-preference) {
  @supports (animation-timeline: view()) {
    .reveal { animation: fade-in linear both; animation-timeline: view();
              animation-range: entry 10% cover 30%; }
  }
}
@keyframes fade-in { from { opacity: 0; transform: translateY(8px); }
                     to   { opacity: 1; transform: none; } }
```

## 5. Font loading without layout shift, with system fallbacks

- **Control the swap with `font-display`.** Values: `block` (short block, infinite swap), `swap` (extremely small block, infinite swap), `fallback` (extremely small block, short swap), `optional` (extremely small block, no swap); `auto` is UA-defined. The block period renders an *invisible* fallback, the swap period renders a visible fallback until the web font arrives, then the failure period settles into normal fallback. Use `swap` for fast text painting or `optional` when you refuse a late font swap. [S14]
- **Preload the critical font.** By default font requests wait until the render tree is built, delaying text; MDN's documented fix is `<link rel="preload">` together with `font-display` (or the Font Loading API). Preload only the WOFF2 actually used above the fold. [S16]
- **Match fallback metrics to kill CLS.** The `size-adjust`, `ascent-override`, `descent-override`, and `line-gap-override` descriptors let a local fallback occupy the same dimensions as the web font; metric overrides alone noticeably reduce font-shift, and adding `size-adjust` can effectively eliminate it. Generate overrides from the *web font's* metadata (`ascent-override = ascent / unitsPerEm`, etc.) — they are fallback-independent. [S15]
- **Pick dependable local fallbacks.** `Arial` is recommended for sans-serif and `Times New Roman` for serif on Windows/macOS, but neither exists on Android (where `Roboto` is the system font), so list a Windows/macOS fallback, an Android fallback, then a generic family. [S15]
- **Always end `font-family` with a generic.** Browsers choose the first installed family *per character*, so a generic final entry guarantees a usable glyph source. `system-ui` takes the platform UI font and is intended for UI, not long-form paragraphs — prefer `sans-serif` (or `ui-sans-serif`) for body copy. [S17]
- **Self-host the WOFF2** under the repo's own `assets/fonts/` instead of hotlinking a third-party CSS endpoint: no external dependency to rot, no extra connection, and full control over `preload`, `font-display`, and overrides. [S14] [S16]

```html
<link rel="preload" href="/assets/fonts/inter-var.woff2" as="font" type="font/woff2" crossorigin>
```
```css
@font-face { font-family: "Inter Local"; src: local("Arial");
  size-adjust: 107%; ascent-override: 90%; descent-override: 22%; line-gap-override: 0%; }
body { font-family: "Inter", "Inter Local", "Roboto", sans-serif; }
@font-face { font-family: "Inter"; src: url("/assets/fonts/inter-var.woff2") format("woff2");
  font-weight: 100 900; font-display: swap; }
```

## 6. Modern image formats and lazy loading

- **Prefer AVIF, then WebP, with a legacy fallback.** MDN: AVIF and WebP offer much better compression than PNG/JPEG with transparency, animation and higher color depths; AVIF has slightly better compression but narrower support, so provide fallbacks with `<picture>`. JPEG remains the baseline lossy still format, PNG the baseline for precision/transparency, and SVG is ideal for icons, logos and diagrams that must be crisp at any size. [S18]
- **Quantified benefit:** web.dev reports greater-than-50% AVIF savings vs JPEG in real cases, plus HDR and wide-color-gamut support; modern formats shrink resource load time and can lower LCP. [S20] [S19]
- **Let the browser pick the first supported source** by ordering `<source>` elements AVIF → WebP → `<img src="…jpg">`; the browser takes the first it can render and otherwise moves on. [S19] [S18]
- **Serve the right dimensions.** `srcset` width descriptors (`1000w`) describe each candidate's intrinsic width; `sizes` describes the intended CSS display size. The browser combines these with device pixel ratio to pick one source — serving a 1000 px image into a 500 CSS px container at DPR 2, rather than a 1500 px one, is the documented optimum. [S19]
- **Reserve the box to protect CLS.** Give every `<img>`/`<video>` explicit `width` and `height` attributes (as in W3C/web.dev examples) so layout can reserve the intrinsic aspect ratio before bytes arrive. [S18] [S19]
- **Lazy-load only off-screen media.** `loading="lazy"` on `<img>`, `<iframe>`, `<video>`, `<audio>` defers off-screen resources until the user scrolls near them (Intersection Observer under the hood); audio needs `controls` or it never comes into view and never loads. Do **not** lazy-load the hero/LCP image — that delays the primary content. The `load` event waits only on eager resources; use `img.complete` to check a specific image. [S16]
- **`decoding="async"`** lets the browser decode off the main thread, improving rendering of other content; `auto` is the default. [S19]
- For line-art/simple graphics, lossless AVIF/WebP or SVG beats JPEG-style lossy encoding, which produces artifacts on sharp edges and text. [S19]

## 7. Core Web Vitals thresholds

- **The three stable Core Web Vitals and their "good" thresholds (75th percentile, mobile and desktop measured separately but judged on the same numbers):** **LCP ≤ 2.5 s** (loading), **INP ≤ 200 ms** (interactivity), **CLS ≤ 0.1** (visual stability). A page passes when all three are good at p75. [S21] [S22]
- **"Poor" thresholds:** LCP > 4000 ms, INP > 500 ms, CLS > 0.25; the bands in between are "needs improvement". [S22]
- **Field data is authoritative.** CrUX powers PageSpeed Insights, DevTools and Search Console; the `web-vitals` library (`onLCP`, `onINP`, `onCLS`) mirrors how Google measures. Set up real-user monitoring rather than trusting a single lab run. [S21]
- **Mapping to this static site:** optimize the hero image (right size, AVIF/WebP, preload if LCP) for LCP; keep interaction handlers tiny and avoid long tasks on nav/filter clicks for INP; reserve media/font dimensions and avoid injected banners for CLS. [S19] [S21]

## 8. GitHub Pages deployment constraints

- **Static only.** GitHub Pages is a *static site hosting service* that takes HTML/CSS/JS straight from a repository and publishes it; it explicitly **does not support server-side languages such as PHP, Ruby, or Python**. No backend, no runtime config, no server code. [S23] [S24]
- **No rewrites — design the URL tree as real files.** Pages publishes pushed static files and each file is served in the *same directory structure* as the publishing source (e.g. `/about/contact-us.md` → `/<user>.github.io/<repo>/about/contact-us.html`). Consequence of static-only hosting: there is no server rewrite layer, so clean URLs must be actual directories with `index.html`, and an SPA-style catch-all fallback is unavailable. [S24] [S23]
- **`.nojekyll` bypass.** When publishing from a branch, Jekyll builds by default; an **empty `.nojekyll` file at the root of the publishing source disables the Jekyll build** so files are published unmodified. Jekyll otherwise skips files/folders starting with `_`, `.`, or `#` (and ending `~`), which is why underscored asset dirs or `.well-known` can vanish. GitHub recommends a GitHub Actions workflow for non-Jekyll generators. [S24] [S25]
- **Entry file and site URL.** `index.html`, `index.md`, or `README.md` at the top level of the publishing source is the entry file. A user/organization site must live in `<owner>.github.io` and is served at `http(s)://<owner>.github.io`; project sites live under `http(s)://<owner>.github.io/<repository>`. [S24] [S23]
- **Custom 404.** Add `404.html` (or `404.md` with `permalink: /404.html`) at the root of the publishing source and GitHub Pages serves it for nonexistent paths. Since there is no rewrite layer, this is the only catch-all mechanism available. [S26]
- **Operational notes.** Builds run via GitHub Actions; allow up to ~10 minutes for changes to publish; commits made by a workflow using `GITHUB_TOKEN` do not trigger a Pages build. MIME types come from `mime-db` and cannot be set per file/repository — stick to standard extensions. [S24]

---

## Builder checklist (concrete, in build order)

1. Scaffold `index.html` with exactly one `<h1>`, `<header>` → `<nav>` → `<main id="main">` → `<footer>`, plus a first-focusable `<a class="skip-link" href="#main">Skip to content</a>` that is visible on focus. [S2] [S3]
2. Name every repeated landmark (`<nav aria-label="…">`) and start each section with an `<h2>`/`<h3>` in DOM order matching the visual order. [S1] [S3]
3. Style `:focus-visible` with a ≥3:1 outline (never `outline: none` without a replacement); add `scroll-padding-top` ≥ sticky-header height so focused items are never fully hidden. [S4] [S5] [S7]
4. Verify the palette numerically: body text ≥4.5:1, large headings ≥3:1, UI borders/icons/focus rings ≥3:1 — in *both* light and dark themes. [S6] [S7]
5. Size nav links, icon buttons and CTAs ≥24×24 CSS px (prefer 44×44) with 24 px spacing circles for any undersized inline links. [S8]
6. Define CSS custom properties once; add `@media (prefers-color-scheme: dark)` overrides, `color-scheme`, and a reduced-motion block that neutralizes durations and `scroll-behavior`. [S9] [S10]
7. Self-host one WOFF2 in `assets/fonts/`, `<link rel="preload" … as="font" crossorigin>`, `font-display: swap`, and a local-fallback `@font-face` with metric overrides + generic `sans-serif` last. [S14] [S15] [S16] [S17]
8. Export each raster asset as AVIF + WebP + JPEG/PNG; use `<picture>` in that order, `srcset`/`sizes` for responsive widths, and explicit `width`/`height` on every image. SVG for icons/logos. [S18] [S19] [S20]
9. Put `loading="lazy" decoding="async"` on all off-screen media; keep the hero image eager (and consider preloading it). [S16] [S19]
10. Make all content visible in base CSS; add scroll effects only inside `@media (prefers-reduced-motion: no-preference) { @supports (animation-timeline: view()) { … } }`, animating only `opacity`/`transform`. [S9] [S11] [S13]
11. Put an empty `.nojekyll` at the publishing-source root; keep generated paths as real directories with `index.html`; add a custom `404.html`. [S24] [S26]
12. Before shipping, measure with PageSpeed Insights/DevTools and the `web-vitals` library: p75 LCP ≤2.5 s, INP ≤200 ms, CLS ≤0.1; re-check after each build. [S21] [S22]

---

## Sources

All accessed **2026-11-25**.

| ID | Primary source | URL | Accessed |
|---|---|---|---|
| S1 | WAI — Understanding SC 1.3.1 Info and Relationships (A) | https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html | 2026-11-25 |
| S2 | WAI — Understanding SC 2.4.1 Bypass Blocks (A) | https://www.w3.org/WAI/WCAG22/Understanding/bypass-blocks.html | 2026-11-25 |
| S3 | MDN — ARIA `landmark` role | https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/landmark_role | 2026-11-25 |
| S4 | WAI — Understanding SC 2.4.7 Focus Visible (AA) | https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html | 2026-11-25 |
| S5 | WAI — Understanding SC 2.4.11 Focus Not Obscured (Minimum) (AA) | https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html | 2026-11-25 |
| S6 | WAI — Understanding SC 1.4.3 Contrast (Minimum) (AA) | https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html | 2026-11-25 |
| S7 | WAI — Understanding SC 1.4.11 Non-text Contrast (AA) | https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html | 2026-11-25 |
| S8 | WAI — Understanding SC 2.5.8 Target Size (Minimum) (AA) | https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html | 2026-11-25 |
| S9 | MDN — `prefers-reduced-motion` media feature | https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion | 2026-11-25 |
| S10 | MDN — `prefers-color-scheme` media feature | https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-color-scheme | 2026-11-25 |
| S11 | Chrome for Developers — Animate elements on scroll with Scroll-driven animations | https://developer.chrome.com/docs/css-ui/scroll-driven-animations | 2026-11-25 |
| S12 | MDN — CSS scroll-driven animations | https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll-driven_animations | 2026-11-25 |
| S13 | MDN — `@supports` CSS at-rule | https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@supports | 2026-11-25 |
| S14 | MDN — `font-display` descriptor | https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@font-face/font-display | 2026-11-25 |
| S15 | Chrome for Developers — Improved font fallbacks | https://developer.chrome.com/blog/font-fallbacks | 2026-11-25 |
| S16 | MDN — Lazy loading | https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/Lazy_loading | 2026-11-25 |
| S17 | MDN — `font-family` | https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/font-family | 2026-11-25 |
| S18 | MDN — Image file type and format guide | https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Formats/Image_types | 2026-11-25 |
| S19 | web.dev — Image performance (Learn Performance) | https://web.dev/learn/performance/image-performance | 2026-11-25 |
| S20 | web.dev — Using AVIF to compress images on your site | https://web.dev/articles/compress-images-avif | 2026-11-25 |
| S21 | web.dev — Web Vitals | https://web.dev/articles/vitals | 2026-11-25 |
| S22 | web.dev — How the Core Web Vitals metrics thresholds were defined | https://web.dev/articles/defining-core-web-vitals-thresholds | 2026-11-25 |
| S23 | GitHub Docs — What is GitHub Pages? | https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages | 2026-11-25 |
| S24 | GitHub Docs — Creating a GitHub Pages site | https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site | 2026-11-25 |
| S25 | GitHub Docs — About GitHub Pages and Jekyll | https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/about-github-pages-and-jekyll | 2026-11-25 |
| S26 | GitHub Docs — Creating a custom 404 page for your GitHub Pages site | https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-custom-404-page-for-your-github-pages-site | 2026-11-25 |
