# Portfolio patterns: Awwwards-style & engineering portfolios

Research ticket: Wayfinder #3 — surface transferable design/engineering patterns from
award-winning and acclaimed developer portfolios, grounded in **real fetched source**
(HTML, CSS and JS bundles), not screenshots. Compiled 2026-11-25.

> Principles only. No third-party source code, assets, fonts or copy were added to this
> repo. Raw fetched source was kept outside the repo in the machine's temp directory
> (`$TMPDIR/reference-src`) for inspection and is not committed.

## Sites inspected

All eight sites were reachable (HTTP 200) on 2026-11-25. `curl -sSL --compressed` was
used to fetch the origin HTML; referenced stylesheets and JS bundles were then fetched
directly and inspected with regex/structural analysis (not executed).

| Name | URL | Source actually inspected (2026-11-25) | Recognition / context |
|---|---|---|---|
| Bruno Arizio | https://brunoarizio.com | `GET /` HTML (~252 KB), 8 `/_nuxt/*.js` chunk references, Typekit `fjg0acb.css` (~1.9 KB); signals: `lenis`, `webgl`, `eb-garamond` | Awwwards SOTD + Developer Award (Nov 2019); open-sourced plain-JS build |
| Giats (Evangelos Giatsidis) | https://giats.me | `GET /` HTML (~41 KB), both Next CSS bundles (~25 KB + ~19 KB), `pages/index` chunk (~43 KB), 13 Next chunks total | Awwwards HM, CSSDA WOTD, GSAP SOTD; front-end developer portfolio |
| Minh Pham | https://minhpham.design | `GET /` HTML (~59 KB) incl. inline `<style>`; `caching.js` (~0.2 KB); `vendor/app.bundle.js` returned 404 ( noted below ); signals: `lenis`, `no-system-cursor`, `js-cursor-contract/extend` | Awwwards SOTD, developer score 7.77; GSAP + Three.js build |
| Ben Hays | https://benhays.dev | `GET /` HTML (~7.6 KB), CSS (~27 KB), JS (~304 KB); signals: `gsap`, `three`, 11 pointermove, 44 loading/preload hits | Awwwards Honors, GSAP SOTD; React/TS/PixiJS creative developer |
| Rauno Freiberg | https://rauno.me | `GET /` HTML (~36 KB), both Next CSS bundles (~8.4 KB + ~3.9 KB), 9 Next chunks; 12 `:root` colour tokens | Acclaimed personal site of a design engineer (Vercel) |
| Josh W. Comeau | https://www.joshwcomeau.com | `GET /` HTML (~138 KB), 3 Next CSS bundles (~15 KB main), App-Router chunks | Acclaimed front-end engineer/educator portfolio + writing |
| Lee Robinson | https://leerob.io (redirects to leerob.com) | `GET /` HTML (~802 KB after redirect), CSS (~86 KB), 10 immutable chunks; 46 `:root` vars, 12-col grid | Developer and writer; Vercel engineer's personal site |
| Nathan Smith | https://www.nathansmith.design | `GET /` HTML (~66 KB) with CDN script tags: GSAP 3.9.1, ScrollTrigger 3.8.0, Draggable, jQuery UI, inview; Webflow runtime | Awwwards SOTD (Jan 2023); non-linear project exploration |

**Reachability notes.** Every origin returned 200. Minh Pham's `vendor.bundle.js` and
`app.bundle.js` paths embedded in the HTML returned 404 (likely a deploy/CDN change
since the case study was written); the page HTML itself — including its inline styles
and cursor/Lenis class system — was fully captured and inspected, so the example was
kept rather than replaced. No site in the set was wholly unreachable.

## Transferable patterns

Each pattern states what was observed in the real source, then an **original**
implementation idea. Do not lift the site's code — re-derive the behaviour.

1. **Fluid, type-led hero on a strict column grid.** Several sites size the headline
   with `clamp(min, vw-based, max)` and lay the page out on an explicit 12-column grid
   with fluid gutters, so the type scale never collapses between breakpoints
   (source: https://leerob.com, https://giats.me).
   *Original idea:* define your own `--step-*` scale with `clamp()` and a `--gutter`,
   place the hero in a 12-col grid with the headline spanning 8 cols and meta in the
   remaining 4; verify at 320/768/1440px without media-query type overrides.

2. **Restrained earth palette plus one signal accent.** Off-white/charcoal bases with a
   single acid-lime or gold accent appear repeatedly; the accent is reserved for the
   one action or word that matters (source: https://giats.me, https://benhays.dev).
   *Original idea:* choose two neutrals and one accent, expose them as custom
   properties (`--ink`, `--paper`, `--signal`), and write a lint rule that flags any
   hard-coded colour outside the tokens.

3. **Editorial display serif paired with a monospace for metadata.** A distinctive
   display face carries emotion; a mono carries labels, indices and code
   (source: https://brunoarizio.com, https://rauno.me, https://benhays.dev).
   *Original idea:* pair a freely licensed display serif with a system/self-hosted mono;
   set project numbers, dates and tags in mono at small sizes, headings in the serif —
   and self-host or use system fonts you have rights to.

4. **Smooth-scroll inertia with pinned, scrubbed sections.** Scroll choreography uses
   an inertia scroll layer plus GSAP ScrollTrigger pin/scrub, so a section holds while
   its content animates (source: https://giats.me, https://minhpham.design,
   https://www.nathansmith.design).
   *Original idea:* implement one pinned "process" section where a sticky panel changes
   sub-step with scroll progress; drive it with `IntersectionObserver` +
   `requestAnimationFrame` and a CSS `position: sticky` fallback so the site still
   works without an animation library.

5. **A cursor that changes state over interactive targets.** One site exposes explicit
   "contract/extend" cursor states and a `no-system-cursor` class; another shows
   frequent pointermove handling (source: https://minhpham.design, https://benhays.dev).
   *Original idea:* a single fixed cursor element that scales/changes label on hover of
   links and project cards via event delegation; disable entirely on touch devices and
   under `prefers-reduced-motion`, keeping the native cursor as the default.

6. **Loading gate as a choreographed first reveal.** One build devotes substantial code
   to preload/loading state before revealing the hero (source: https://benhays.dev,
   https://brunoarizio.com).
   *Original idea:* render a minimal progress veil that waits on `document.fonts.ready`
   and the hero image, then animates out — with a hard timeout fallback and a skip
   button so the content is never held hostage to a slow asset.

7. **WebGL/canvas as an accent layer, not the whole experience.** WebGL/Three appears as
   a texture behind an otherwise ordinary DOM layout (source: https://brunoarizio.com,
   https://benhays.dev, https://minhpham.design).
   *Original idea:* put a low-cost noise/particle canvas behind the hero that reacts
   faintly to pointer position, capped at devicePixelRatio 1.5, and swap to a static
   CSS gradient when WebGL is unavailable or motion is reduced.

8. **Non-linear exploration alongside a normal scroll path.** One SOTD lets visitors
   both scroll continuously and "riffle" the archive via a draggable strip
   (source: https://www.nathansmith.design).
   *Original idea:* offer a linear case-study scroll plus an optional horizontal,
   draggable project index; make the strip keyboard-navigable (arrow keys + focus) so
   the alternate path is not mouse-only.

9. **Writing treated as first-class portfolio content.** Two sites present technical
   articles with careful type and syntax-highlighted code as part of the portfolio
   (source: https://www.joshwcomeau.com, https://leerob.com).
   *Original idea:* give each project a short "how it works" note with a real, readable
   code excerpt using semantic token colours and generous line-height, so the work
   demonstrates thinking, not just thumbnails.

10. **Grid-driven asymmetric project cards.** CSS grid with repeated/variable column
    counts underpins bento-like project layouts (source: https://giats.me,
    https://rauno.me).
    *Original idea:* use `grid-template-columns: repeat(12, 1fr)` and let featured
    projects span 7 cols and secondary ones 5, collapsing to a single column on
    mobile; keep DOM order equal to visual order for accessibility.

11. **Semantic code-theme tokens for developer content.** A 46-variable `:root` includes
    a full syntax-highlight token set alongside layout vars (source: https://leerob.com).
    *Original idea:* if you show code, define your own `--code-keyword`, `--code-string`,
    `--code-comment` variables with AA contrast on the code background, and keep them
    in the same token file as your layout variables.

12. **Static-first, fast meta.** These sites ship pre-rendered HTML/CSS with minimal
    runtime and careful preloads (source: https://rauno.me, https://leerob.com,
    https://www.joshwcomeau.com).
    *Original idea:* pre-render every route, inline critical CSS, preload only the hero
    font, and budget the JS bundle; measure with Lighthouse before adding any motion
    library.

## Do not copy

- **Assets:** photographs, illustrations, logos, icons, videos, textures or Webflow
  CDN files from any listed site; do not hotlink their CDN URLs.
- **Fonts:** the proprietary faces observed in the fetched CSS — Neue Haas Grotesk
  Display Pro, Adobe Typekit `eb-garamond`, Benguiat Bold Condensed BT, Dolly Roman,
  Wotfard, STIX Two Text — are licensed works; use your own licensed or open fonts.
  Open fonts seen (e.g. JetBrains Mono, Geist) are fine to use under their own
  licences, but do not copy these sites' font files or loading setup.
- **Copy:** taglines, bios, headings and project descriptions verbatim (e.g. the
  "self-taught front-end developer", "friendly articles and tutorials", or
  "selectively skilled product designer" phrasings). Write original text.
- **Component code:** GSAP/ScrollTrigger timelines, Lenis integration glue, cursor
  contract/extend logic, Webflow/Next boilerplate, Shiki token maps, exact `clamp()`
  values, class names such as `no-system-cursor`/`js-cursor-extend`, and any bundle
  fetched into `$TMPDIR/reference-src`. Reimplement the *principle* from scratch.
- **Repositories:** the public "clone" repos found during search are learning
  artifacts; do not vendor or copy their source into this project.
