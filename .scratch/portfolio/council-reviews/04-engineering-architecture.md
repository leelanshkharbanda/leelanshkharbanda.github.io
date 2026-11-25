# Council Review 04: Engineering Architecture

Date: 2026-11-25  
Role: Principal engineer  
Status: **Recommended for council adoption, subject to the release gates below**  
Scope: architecture, rendering, content systems, dependencies, assets, interaction, resilience, performance, accessibility, and verification. No application code was changed.

## Executive recommendation

Adopt a **static-first Astro multipage site with narrowly scoped React islands**. Astro should render the home page, Work index, five case studies, three archive entries, About, Résumé, and Contact anchor as real HTML. React should be reserved for the stateful Trace Inspector in the Chronos-DSP case study; a compact homepage poster remains static. Navigation, content, email, résumé, motion preference, and project filtering do not need React.

Use the supplied environment as the implementation baseline:

| Concern | Baseline |
|---|---|
| Runtime | Node **24.22.1** |
| Site builder | Astro **7.4.13**, `output: 'static'` |
| Optional UI islands | `@astrojs/react` **7.1.9**, React/React DOM **19.3.1** |
| Type checking | TypeScript **6.0.3** with `@astrojs/check`; do **not** install TypeScript 7 |
| Unit tests | Vitest **5.1.2** |
| Browser tests | Playwright **1.65.1** against the built preview |

This is an Astro site with an interactive component, not a React application wrapped in Astro. No SSR adapter, server island, API endpoint, database, CMS, authentication system, or client-side router is justified by the current scope.

The repository contains research and council records but no application manifest or implementation. Consequently, this review defines an architecture and acceptance contract; it does not claim a build, Lighthouse score, browser pass, or measured performance result.

## Review findings and severity

| Severity | Finding | Architectural response |
|---|---|---|
| Blocker if introduced | Essential project evidence, contact, or navigation exists only after client rendering or inside Canvas/SVG. | Generate every core route and fact into HTML at build time; visuals are enhancements with adjacent equivalents. |
| Blocker if introduced | A Simulation Result becomes a Measured Result, team work becomes sole-authored work, or a fork becomes original work. | Encode evidence class and Collaboration Credit in validated content; test cards, case studies, résumé, and metadata. |
| Major | A site-wide React SPA pays framework and routing costs for a small, mostly editorial site. | Keep content in `.astro`/Markdown and permit React only at explicit island boundaries. |
| Major | WebGL, smooth scrolling, custom cursors, animation libraries, or third-party scripts become the differentiator. | Reject those dependencies; use native scrolling, CSS motion, SVG, and bounded Canvas 2D only. |
| Major | Fonts, late media, hydration, or reveal logic shift content or delay reading. | Self-host subset fonts, reserve media geometry, keep base content visible, and enforce route budgets. |
| Major | No-JS, failed-island, keyboard, reduced-motion, or deep-link behavior is left to manual spot checks. | Make these first-class Playwright scenarios and release gates. |
| Minor | Empty Lab/Notes routes, search, filters, or a CMS are built before content warrants them. | Launch only Work, About, Résumé, and Contact; add collections/routes when real content exists. |

No existing ADR conflicts were found; `docs/adr/` does not yet exist. This record advises the open [Choose the Technical Architecture](../council-decisions/03-technical-architecture.md) decision and does not resolve the separate creative or experience HITL tickets.

## Evidence basis

- [GLOSSARY.md](../../../GLOSSARY.md) makes Project Evidence, Engineering Narrative, Signal Path, Simulation Result, Measured Result, Collaboration Credit, and Portfolio Signal the governing vocabulary.
- [GitHub Evidence](../../../outputs/github-evidence.md) establishes eight original projects, five strong narrative candidates, excluded forks, team/coursework limits, and unresolved media rights. Verified public résumé facts supply team sizes and coordination labels.
- [Editorial Research](../../../outputs/technical-portfolio-research-editorial.md) supports a mission-led front door, case studies structured as arguments, diagrams linked back to source, and interaction that reveals state rather than merely decorates.
- [Implementation Research](../../../outputs/technical-portfolio-research-implementation.md) documents the cost and fragility of full WebGL worlds, custom smooth scrolling, persistent cursor loops, and transition-heavy navigation. Its safe adaptation is semantic HTML plus one compact SVG/Canvas 2D mechanism.
- [Quality Research](../../../outputs/technical-portfolio-research-quality.md) supplies the WCAG 2.2 AA floor, complete reduced-motion state, no-JS contract, Core Web Vitals targets, asset budgets, and combined automated/manual test requirement.
- [Creative Review 02](02-creative-direction.md) selects **Evidence Bench**, a static-first Trace Inspector, native scrolling, bounded motion, and no WebGL/custom cursor.
- [Content and UX Review 03](03-content-and-ux.md) fixes the initial information architecture: three homepage projects, five case studies, three archive entries, a text-first `/resume`, and email rather than a contact form.
- Astro's official documentation confirms that framework components render without client JavaScript unless given a `client:*` directive, that build-time content collections provide schema validation and static route generation, and that local images can be optimized at build time. Sources are listed at the end.

## Architecture comparison

| Dimension | Astro static + React islands — selected | Vite React SPA | Vanilla static HTML/CSS/JS |
|---|---|---|---|
| Rendering and resilience | Complete HTML/CSS per route; islands enhance isolated regions. | Usually an empty shell until React runs. Prerendering can repair this, but adds another toolchain and hydration model. | Excellent baseline if authored carefully; no framework runtime. |
| Initial JavaScript | Zero on content-only routes; React only where an island is deliberately hydrated. | React/React DOM and router infrastructure are broadly coupled to the experience, even with route splitting. | Lowest possible runtime; only explicitly authored modules. |
| Content model | Built-in content collections, typed schemas, Markdown rendering, static paths, component layouts. | Requires separate content loading/prerendering and usually more custom routing/metadata code. | No built-in schema, templating, or route generation; these must be hand-built or supplemented by a generator. |
| Interaction fit | Ideal for one or two complex widgets surrounded by editorial content. | Strong for pervasive client state, application-like tools, and many interdependent widgets. | Strong for details/disclosure, small menus, copy-email, and simple SVG controls; weaker for complex state without structure. |
| SEO/social/metadata | Per-route static titles, canonicals, structured content, and social images. | Possible with prerendering/SSG, but no longer a plain Vite SPA and with more moving parts. | Straightforward, but repeated metadata/layout code is manual. |
| Maintainability | One component system, one content source, small framework surface; clear island boundaries. | One ecosystem and familiar client routing, but content and rendering concerns accumulate in the client. | Transparent and portable, but schema drift, duplicated templates, and untested content invariants become likely as the site grows. |
| Failure/no-JS | Core route works if an island fails; real URLs need no router. | Client-rendered content can disappear; history/focus/error recovery requires deliberate implementation. | Naturally strong, provided content is not created by scripts. |
| Cost/risk | Build-time framework cost and hydration discipline; no server required. | Highest unnecessary runtime and resilience burden for this portfolio. | Lowest runtime, but highest authoring/schema maintenance burden for eight project records and a résumé generated from the same facts. |

**Why not the SPA:** the portfolio is primarily a readable evidence archive with one bounded interactive explanation. A SPA optimizes for the wrong center of gravity. Adding prerendering to Vite would recover static HTML but would not provide Astro's content-collection and island boundaries as directly.

**Why not pure vanilla:** it would be the correct fallback if the Trace Inspector prototype proves to need little state. Even then, retain Astro for static generation, content validation, layouts, image processing, and tests, and remove React. Hand-maintaining equivalent templates and schemas would add work without improving the visitor experience.

## Rendering and component boundaries

```text
Build time
Markdown + typed profile data + Zod-backed content collections
                        |
                        v
Astro static pages, layouts, SVG, optimized images, metadata
                        |
                        v
              deployable dist/ HTML/CSS/assets

Browser baseline
Real HTML + real links + core CSS + static Trace Inspector equivalent

Optional enhancement
React island: Trace Inspector state and controls
Pure TypeScript model: deterministic calculations, independently tested
Small vanilla modules: motion preference and copy-email only
```

Rules:

1. Use `.astro` for pages, layouts, navigation, cards, case-study structure, static diagrams, résumé, and print styles.
2. Use Markdown for long-form case-study prose. Do not add MDX at launch; stable diagram/evidence slots in the case-study layout are sufficient. Revisit MDX only if authors repeatedly need arbitrary components inside prose.
3. Use React only for the Trace Inspector. Render a useful static SVG and text/table equivalent as its initial output. Browser-only APIs belong in effects and must be guarded so build-time rendering works.
4. Prefer `client:visible` for the case-study island so it hydrates only when reached. Do not use `client:load` site-wide. If the inspector is placed behind native `<details>`, opening the disclosure can trigger visibility and loading while the no-JS state remains useful.
5. Keep all simulation functions in pure TypeScript modules with no React or DOM imports. The same deterministic model can be tested in Vitest and used by the island.
6. Keep islands independent. Do not introduce global client state, cross-island synchronization, or React Router for the current scope.
7. Use plain anchor navigation initially. Browser-native cross-document view transitions may be evaluated later; do not add Astro `<ClientRouter />` at launch because it intercepts navigation and requires script/state lifecycle management.

## Routing and deployment contract

Use stable, human-readable URLs with trailing slashes on content routes. The final host/domain is unresolved, so the build must accept one explicit production `site` URL and must not embed a placeholder canonical in release output.

| Route | Source and behavior |
|---|---|
| `/` | Orientation, static Trace Inspector poster, exactly three selected projects, short About preview, `#contact`, and footer. |
| `/work/` | Five featured records followed by three clearly separated archive entries; no search, filters, or tag cloud. |
| `/work/[slug]/` | One statically generated route per published project. Five featured records use the flagship/medium case-study template; three archive records use a compact layout. The Work index supplies the grouping. |
| `/about/` | Verified identity, recurring themes, toolkit, working principles, and contact. |
| `/resume/` | Canonical text-first, printable route generated from the same profile/project data. `/resume` redirects to `/resume/`. A PDF is optional later. |
| `/#contact` | Stable home-section URL for the Contact navigation item. Visible email remains available in the footer on every page. |
| `/404.html` | Static not-found page served with an actual 404 status by the host. |
| `/sitemap-index.xml`, `/sitemap-0.xml`, `/robots.txt` | Generated from published routes using the official sitemap integration after the production URL is known. |
| `/resume.pdf`, `/lab/*`, `/notes/*` | Deferred. Do not publish empty or speculative routes. |

Deployment requirements:

- Produce a fully static `dist/`; no runtime Node service or adapter.
- Serve HTML with revalidation/no-cache semantics and content-hashed assets, fonts, and optimized images with long-lived immutable caching.
- Enable Brotli or gzip, preserve clean URLs without redirect chains, return 404 correctly, and test direct deep links on the actual host.
- Keep builds deterministic and offline after dependency installation: no live GitHub, CMS, font-service, or API request during `astro build`.
- Use same-origin scripts and assets. A restrictive CSP, `Referrer-Policy`, `X-Content-Type-Options`, and `frame-ancestors 'none'` should be configured compatibly with Astro's generated inline bootstrap; test the policy rather than adding unsafe exceptions blindly.

## Content model and evidence invariants

Use a `projects` build-time content collection with local Markdown entries and a schema in `src/content.config.ts`. Keep verified identity/contact data in a small typed site-data module so About, home, footer, and Résumé cannot drift.

Required project fields:

| Group | Fields and rules |
|---|---|
| Identity | Stable slug, human title, one-sentence engineering question, summary, verified date when available, status, and depth tier (`flagship`, `medium`, `archive`). |
| Curation | `featured`, Work ordering, and homepage selection. Initial release invariants: 3 home features, 5 featured Work records, 3 archive entries. |
| Collaboration Credit | `individual`, `team-project`, `team-research`, or `team-coursework`; required `teamSize` when verified; explicit contribution statement; verified collaborators/upstream credit when known. Never infer sole authorship from repository ownership. |
| Engineering Narrative | Problem, constraints, mechanism, decisions, outcome, limits, and next step. Required headings/slots keep case studies comparable. |
| Project Evidence | Artifact array with kind (`source`, `tests`, `release`, `demo`, `report`, `paper`), URL, label, optional pinned commit, and `checkedOn` date. A project must have at least one primary evidence link. |
| Results | Per-claim evidence class: `artifact`, `simulation`, or `measured`; value/observation; method and conditions; source. Measured requires physical-hardware or external real-world provenance under the glossary definition. |
| Visuals | Original/redrawn asset or diagram ID, alt text, caption, text equivalent, and rights/provenance record. Missing rights means no image. |
| Presentation | Stack/toolkit labels used in this project, next relevant project, and metadata description/social image. |
| Publishing | `draft` defaults to true; only reviewed, non-draft entries generate routes, cards, sitemap entries, or résumé lines. |

Build-time tests must reject:

- missing role, evidence class, primary source, limits, or text equivalent;
- a numerical/comparative result without method, conditions, and source;
- excluded forks presented as original projects;
- media without provenance/permission;
- duplicate slugs, invalid internal links, or draft entries in production output;
- unsupported phrases such as measured GPU speedup for MoE, calibrated RF for Chronos, deployed detector for HPC_Boost, or fully offline for Life OS.

Recorded visualization data belongs in versioned local files with source/commit, assumptions, and generation notes. Do not calculate portfolio claims from unverified live endpoints. External-link health is a separate release check; it must not make the static build fail because GitHub or a demo is temporarily unavailable.

## Dependency policy

### Runtime allowlist

- `astro` for static generation, layouts, routing, content collections, and build-time image processing.
- `@astrojs/react`, `react`, and `react-dom` only while the Trace Inspector genuinely benefits from React.
- `@astrojs/sitemap` for crawl metadata once the canonical site URL is known.
- Local WOFF2/SVG/image assets; no runtime package is needed for icons, animation, scrolling, charts, or carousels.

If the Trace Inspector can be implemented cleanly as a small TypeScript module within the budgets, remove the React packages and integration. That is a successful simplification, not a failure to use the selected stack.

### Development allowlist

- TypeScript 6.0.3 and `@astrojs/check` for `astro check`.
- Vitest 5.1.2 for model, schema, and content-invariant tests.
- Playwright 1.65.1 for built-site browser, failure, keyboard, and accessibility scenarios.
- A small test-only accessibility/HTML/performance toolset, such as `@axe-core/playwright`, `html-validate`, and Lighthouse. Pin compatible versions in the lockfile; none ships to visitors.
- One formatter stack: Prettier plus the official Astro plugin. Do not add overlapping formatter/linter ecosystems without a specific gap to fill.

Policy:

1. Pin direct versions, commit the lockfile, set `engines.node` to the supported Node 24 line, and use `npm ci` in CI. Fail if multiple or unsupported TypeScript versions are installed.
2. Every new runtime dependency requires a stated user or maintenance need, license/security review, compressed-size delta, and removal/addition plan. Prefer platform APIs and existing dependencies.
3. No runtime analytics, tag manager, tracking pixel, comment service, marketing script, remote font CSS, embed, or A/B testing tool in the first release.
4. No WebGL/Three.js, physics/WASM, GSAP, Locomotive/Lenis, Barba, React Router, global state library, UI kit, carousel, icon package, chart library, or custom cursor. CSS, SVG, Canvas 2D, and native controls cover the approved scope.
5. Keep source maps and debug tooling out of public production assets unless a concrete diagnostic need is approved.
6. Review dependency updates deliberately; do not enable automatic major-version upgrades, especially across the TypeScript 6/7 boundary.

## Font and asset strategy

### Fonts

Creative Review 02 proposes Bricolage Grotesque, Source Sans 3, and IBM Plex Mono. Treat those as licensed, self-hosted candidates, not a requirement to ship three full families.

- Use only required WOFF2 subsets and weights. Prefer a variable file only when it is smaller than the equivalent static subsets.
- Target **≤60 KB compressed total initial web fonts** and preload at most one genuinely critical subset, **≤30 KB**. Preload only after the final typography and LCP candidate are measured.
- Use metric-compatible system fallbacks. For a preloaded critical face, `font-display: swap` is acceptable only with fallback metrics and a CLS check; use `optional` for noncritical faces where avoiding a late swap matters more than guaranteed brand rendering.
- If the three selected families exceed the budget, preserve hierarchy with two families plus a system monospace stack rather than increasing the budget or blocking text.
- No Google Fonts/runtime font service, icon font, late font swap without reserved metrics, or per-letter animation.

### Images, diagrams, and documents

- Prefer newly authored inline SVG and CSS for the Evidence Bench system. SVG text remains selectable; complex diagrams receive `<title>`, `<desc>`, and an adjacent structured explanation/table.
- Use Astro's build-time `<Image>`/`<Picture>` pipeline for local raster assets in `src/`; generate responsive AVIF/WebP variants with appropriate fallbacks. Files in `public/` are copied unprocessed and should be limited to stable documents/favicons.
- Do not hotlink repository screenshots or tasveer media. Repository control does not establish reuse rights. Record permission and attribution before adding any third-party visual.
- Set intrinsic dimensions/aspect ratio for every image, Canvas, video, or embed. Eager-load only the measured LCP candidate; lazy-load offscreen media. Never lazy-load the hero/poster.
- Avoid GIFs, autoplay audio/video, decorative videos, and large model/texture sets. No media is required to understand a project.
- Generate route-specific or default **1200×630** social images locally, keep them ≤120 KB, and use absolute HTTPS URLs with alt text. Do not depend on a runtime image-generation service.
- Résumé is HTML-first. If a PDF is later published, verify selectable text, tags/reading order, one-page A4/Letter output, and consistency with the HTML route.

## Canvas/SVG and motion approach

### Representation hierarchy

1. **HTML/CSS:** all narrative, labels, controls, status, source links, and result tables.
2. **Inline SVG:** default Trace Inspector path, architecture diagrams, constellation plots, and other bounded vector graphics.
3. **Canvas 2D:** only if dense traces or plotting become measurably awkward in SVG. It remains a rendering surface, never the semantic source.
4. **WebGL:** explicitly excluded.

### Trace Inspector contract

- The homepage receives a static poster: complete path, readable constellation, key result, and the persistent label **“Simulation · geometric channel model · not hardware-measured.”**
- The full Chronos-DSP inspector uses native Previous/Next stage buttons and at most one documented range parameter. Every slider action has button/preset alternatives.
- Use deterministic recorded data or a bounded browser calculation tied to source-verified model controls. Do not imply that an illustrative browser preset is the original project's exact behavior unless verified.
- Update numeric values and accessible text immediately. Any trace crossfade is brief and must not morph one dataset into a misleading different shape.
- Controls remain outside the Canvas/SVG hit surface. Use labelled native inputs, `aria-pressed`/selected state where appropriate, and a restrained polite status announcement for meaningful stage/result changes.
- Provide a visible text/table equivalent for every stage and a Reset action. Color is supplemented by labels, shapes, or line patterns.
- Default to a paused/static state. Optional playback is user-initiated, uses one `requestAnimationFrame` loop, caps mobile DPR at 1.5, and stops on pause, offscreen exit, document hiding, unmount, or reduced motion. No audio.
- Detect `getContext('2d') === null`, context loss, resize failures, and data errors. Preserve the static SVG and narrative outside the island so a rendering failure cannot blank the case study.

### Motion

- Native scrolling only: no smooth-scroll interception, pinning, parallax, artificial long scroll surface, marquee, magnetic control, custom cursor, or intro gate.
- Optional one-shot reveals: 220–320 ms opacity plus 8–12 px translation, with no more than a three-item 40–60 ms stagger. Content is visible in the base state; JavaScript only adds the enhancement.
- Stage relationship changes: 160–220 ms stroke/opacity treatment. Status confirmation: 100–160 ms. Hover/focus: 100–160 ms color/underline/small arrow movement.
- Honor `prefers-reduced-motion` before initialization and observe live changes. Reduced mode removes spatial movement, path drawing, crossfades, and loops; stage/data changes are immediate.
- A small session-level motion control defaults to the OS preference. Explicit opt-in may enable only the bounded inspector animation; a later OS change back to reduce wins. Storage failures must not break the control.
- Copy-email is another small progressive enhancement: Clipboard API when available, visible selectable address and `mailto:` fallback always, polite failure feedback, and no unexpected focus movement.

## Performance and accessibility budgets

These are project release policies derived from the research, not universal standards. Enforce compressed transfer sizes on the built preview and record which compression the production host serves.

| Budget | Release limit |
|---|---:|
| Content-only route JavaScript | **0 KB** |
| Homepage JavaScript | ≤10 KB gzip; static poster needs no React |
| Any route's initial JavaScript | ≤125 KB gzip |
| On-demand inspector JavaScript, including shared React chunks | ≤75 KB gzip additional |
| Cumulative JavaScript once the inspector loads by visibility or intent | ≤200 KB gzip |
| Initial CSS | ≤30 KB gzip per route |
| Initial web fonts | ≤60 KB compressed total; ≤30 KB preloaded |
| Critical-path resources | ≤170 KB compressed |
| Initial mobile route transfer | ≤350 KB compressed |
| LCP image/poster | ≤120 KB compressed; may be SVG/text |
| Same-origin initial requests | ≤20 |
| Additional project-detail media before explicit intent | ≤500 KB compressed per project |
| Third-party runtime requests | **0** |
| Long tasks on common load/interaction paths | None >200 ms |
| Lab performance | Lighthouse mobile performance ≥90; track LCP, CLS, TBT |
| Field outcomes | LCP ≤2.5 s, INP ≤200 ms, CLS ≤0.1 at p75, segmented by mobile/desktop and route |

Do not report Lighthouse as a field INP measurement. Until sufficient privacy-preserving first-party data or CrUX data exists, label results as lab measurements and keep the field gate open. No analytics package is required for launch.

Accessibility release floor:

- WCAG 2.2 Level AA, with the complete reduced-motion behavior of SC 2.3.3 adopted as a product requirement.
- Text contrast ≥4.5:1, or ≥3:1 only for genuinely large text; essential graphics, control boundaries, and focus ≥3:1 in every state.
- Visible, unobscured keyboard focus; logical DOM/focus order; no positive `tabindex`; no keyboard traps; skip link and semantic landmarks.
- Native controls with programmatic names, roles, values, and states. No hover-only, drag-only, or canvas-hit-target-only functionality.
- At least 24×24 CSS px for all targets; at least 44×44 CSS px for primary touch controls.
- Usable at 200% text/zoom, 400% page zoom/320 CSS px reflow, prescribed text-spacing overrides, forced colors, and hybrid touch/precise-pointer input.
- Long-form measure under roughly 80 characters; real text rather than essential text baked into images.
- Canvas/SVG has an equivalent HTML explanation and data table; decorative visuals are hidden from assistive technology.
- Automated accessibility scores are regression signals, not proof of conformance.

## Failure and no-JavaScript behavior

| Failure | Required behavior |
|---|---|
| JavaScript disabled | Every route, heading, project summary, role/evidence label, source link, résumé, contact anchor, and email action works. Static diagram and text/table equivalent remain available. |
| Island chunk fails | The rest of the page remains readable and navigable; the static inspector equivalent remains. No global loading overlay or error boundary blanks the site. |
| Canvas unavailable/lost | Show the static SVG and textual result; hide enhancement-only controls that cannot work. |
| Font fails | System fallback renders immediately without clipped or invisible text. |
| Image fails | Reserved geometry remains; useful alt/caption appears; surrounding content does not collapse or shift. |
| External demo unavailable | The source link, case study, and evidence remain useful; no essential iframe or uptime claim. |
| Clipboard denied/unavailable | Selectable email and `mailto:` still work; announce failure without moving focus. |
| Storage denied | Motion preference works for the session; no uncaught exception. |
| Unknown route | Host serves the static 404 page with HTTP 404 and useful Work/Home links. |

Implementation rules: keep base content visible; reveal enhancement controls only after successful initialization; use module/deferred scripts; never make content visibility or task completion depend on `animationend`, a transition promise, hydration, or a third-party request. `<noscript>` may explain that the interactive inspector is unavailable, but it must not contain the only copy of essential content.

## Automated and browser test plan

Run browser tests against `astro preview` or an equivalent static server serving `dist/`, not only against the dev server.

| Layer | Tooling and required coverage | Gate |
|---|---|---|
| Install/type/build | Node 24.22.1, `npm ci`, supported TypeScript 6.0.3, `astro check`, `astro build`. | Clean install and build; no unsupported TS major; no network content fetch. |
| Content invariants | Vitest over schema helpers and all project entries: evidence classes, sources, role credit, limits, media provenance, draft exclusion, unique slugs, initial 3/5/3 curation. | All tests pass; invalid content fails CI. |
| Model correctness | Vitest with fixed seeds/fixtures for channel stages, deterministic outputs, parameter bounds, reset, and result formatting. Snapshot only small stable outputs. | No nondeterministic or unexplained numeric changes. |
| Static output | Inspect generated HTML, route inventory, metadata, canonicals, sitemap, 404 behavior, internal links, and absence of draft content. | Every published route has meaningful HTML and unique metadata. |
| HTML/accessibility automation | `html-validate`; Axe/Playwright on every route template and key inspector states; Lighthouse accessibility/SEO. | Zero HTML errors; zero serious/critical Axe findings; no accessibility/SEO regression. |
| Browser journeys | Playwright Chromium, Firefox, and WebKit: home → Work → case study → source; Work → About → Résumé → Contact; direct load, reload, back/forward, 404. | All journeys pass at desktop and narrow mobile viewports. |
| Keyboard and focus | Tab/Shift+Tab, Enter, Space, arrows, Escape as appropriate; inspector stages/presets/reset/pause; copy-email; no traps; visible/unobscured focus. | Complete every task without a pointer. |
| No-JS/partial failure | Context with JavaScript disabled; abort island chunks; force Canvas 2D unavailable; dispatch context loss; fail font/image; deny clipboard/storage. | Core reading, navigation, source links, résumé, and contact remain usable; fallbacks appear without CLS. |
| Reduced motion | Emulate reduce, then change preference while open; inspect animations/frame-loop state; operate the session control. | No spatial/continuous motion starts in reduced mode; later OS reduce wins. |
| Responsive/input | 320 CSS px, 200% text, 400% zoom/320 reflow, text spacing, forced colors, touch-only and hybrid pointer. | No lost content/functionality, two-axis page scroll, or undersized primary target. |
| Performance | Lighthouse mobile on home, Work, a flagship case study, and Résumé; network/resource budgets; LCP attribution; full-session CLS; TBT/long tasks. | All byte and lab gates pass; no lazy LCP or late layout insertion. |
| Links | Internal link checker in CI; external source/demo/profile checks at release with manual review of anti-bot 403/429 responses. | No broken internal links; external failures are fixed, labeled, or demoted. |
| Print | Browser print preview/PDF for `/resume/` at A4 and Letter, black and white. | One readable page, selectable text, no clipped controls or decorative content. |

Required manual/device release matrix:

- Current stable Chrome, Edge, Firefox, and Safari on macOS; include the previous major Safari release because WebKit behavior cannot be inferred from Chromium.
- Current iOS Safari and Android Chrome on real devices, portrait/landscape and safe-area insets.
- Keyboard-only, mouse/trackpad, touch-only, and hybrid input.
- NVDA with Firefox or Chrome on Windows; VoiceOver with Safari on macOS/iOS; TalkBack with Chrome on Android for touch-heavy inspector behavior.
- Real OS reduced-motion setting, not only emulation; font failure, slow network, blocked asset, and back/forward-cache restoration.
- Three persona walkthroughs from Content Review 03 in default, mobile, keyboard, reduced-motion, and no-JS states.

CI should retain test reports, failure traces/screenshots, Lighthouse JSON, route inventory, and resource-budget reports as artifacts. A release is blocked by any failed core journey, accessibility blocker/major issue, evidence mislabel, missing fallback, or exceeded budget.

## Tradeoffs and revisit triggers

- **Astro build tooling versus hand-authored HTML:** accepted in exchange for typed content, consistent layouts, static routes, image processing, and enforceable invariants.
- **React island versus pure TypeScript:** accepted only for the inspector's state/control complexity. Remove React if the prototype does not justify its runtime or maintenance cost.
- **Multipage navigation versus SPA continuity:** accepted because direct links, reloads, native history, and failure isolation matter more than persistent client state. Revisit transitions only after measuring a real navigation problem.
- **Three-font concept versus font budget:** the 60 KB cap wins. Simplify the stack before delaying text or increasing transfer.
- **Static content versus live data:** accepted because the portfolio records verified work; it is not a monitoring dashboard. Real-time hardware or personalized data would require a separate architecture decision.
- **Git-based content versus CMS:** accepted for a small, engineering-owned site. Add a CMS only when a real editorial workflow cannot be served by Markdown and reviewed pull requests.

Reopen the architecture if the site develops several interdependent client tools, shared cross-route application state, frequent nontechnical publishing needs, or genuine personalization/real-time requirements. A separate client-heavy Lab application could then be evaluated without moving core evidence behind an SPA shell.

## Acceptance criteria

1. **Static output:** every published route is generated into `dist/` and works on a static host with no adapter or server runtime.
2. **Framework boundary:** content, navigation, résumé, contact, and motion preference contain no React; React is limited to the approved inspector island.
3. **Content integrity:** all initial 3/5/3 curation rules, evidence classes, Collaboration Credit, sources, limits, and media provenance validate automatically; excluded forks never appear as original work.
4. **Real navigation:** Work, About, Résumé, Contact, project routes, source links, direct loads, reloads, and back/forward work without a client router.
5. **No-JS/failure resilience:** all core journeys pass with JavaScript disabled and with the inspector, Canvas, font, image, clipboard, or storage failing independently.
6. **Interaction discipline:** no WebGL, smooth-scroll hijacking, custom cursor, autoplay, intro gate, physics, or unnecessary third-party script ships.
7. **Accessibility:** WCAG 2.2 AA checks and the manual keyboard, screen-reader, reflow, zoom, spacing, forced-colors, touch, and reduced-motion matrix pass.
8. **Performance:** all route byte/request budgets and lab gates pass; field targets are tracked honestly and not claimed from Lighthouse alone.
9. **Verification:** Vitest, Playwright, content/output checks, accessibility automation, link checks, and résumé print checks pass on the built preview and required real devices/browsers.
10. **Council alignment:** implementation preserves Evidence Bench and the Content/UX route model; any departure is recorded as a new council decision rather than silently changing scope.

## Sources

### Local evidence

- [Glossary](../../../GLOSSARY.md)
- [GitHub Evidence](../../../outputs/github-evidence.md)
- [Technical Portfolio Research — Editorial](../../../outputs/technical-portfolio-research-editorial.md)
- [Technical Portfolio Research — Implementation](../../../outputs/technical-portfolio-research-implementation.md)
- [Technical Portfolio Research — Quality](../../../outputs/technical-portfolio-research-quality.md)
- [Council Charter](../council.md)
- [Council Review 02 — Creative Direction](02-creative-direction.md)
- [Council Review 03 — Content and UX](03-content-and-ux.md)

### Official implementation references

Accessed 2026-11-25.

- [Astro — Islands architecture](https://docs.astro.build/en/concepts/islands/): static HTML by default; explicit `client:*` hydration; `client:idle` and `client:visible` loading priorities.
- [Astro — Content collections](https://docs.astro.build/en/guides/content-collections/): local build-time collections, schemas, typed queries, Markdown rendering, and static route generation.
- [Astro — Images](https://docs.astro.build/en/guides/images/): build-time local image optimization, responsive output, SVG components, and the unprocessed nature of `public/` assets.
- [Astro — View transitions](https://docs.astro.build/en/guides/view-transitions/): browser-native cross-document transitions versus `<ClientRouter />` interception and script/state lifecycle costs.

Package versions and Node compatibility constraints above were supplied in the review environment and must be verified by a clean install/lockfile when implementation begins.
