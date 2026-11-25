# Technical Portfolio Reference Research

**Prepared for:** Leelansh Kharbanda  
**Date:** 2026-11-25  
**Question:** Which award-recognized and technical portfolio patterns can become a distinctive, accessible, production-ready portfolio for an engineer working across software and hardware?

## Executive Summary

The strongest references do not treat technical work as a gallery of finished screens. They make the route through complexity visible: the question, constraint, mechanism, artifact, result type, and limit. Award-recognized portfolios such as Arthur Engel and Haoqi Wen pair a strong visual world with precise technical case studies; editorial references such as Bret Victor, Lea Verou, Matt Webb, Maggie Appleton, and Julia Evans show why interaction, diagrams, and writing should explain a mechanism rather than decorate it. [5][8][17][20][24][25][26][29][30][31]

The implementation evidence argues for restraint. Bruno Simon's live entry bundle was 3,819,170 decompressed bytes and loaded a physics/WASM, model, texture, and audio stack; [3][4][55] Robin Payot's main bundle was 1,213,456 decompressed bytes with source maps exposing Three.js, GSAP, postprocessing, GPU tiering, and a 15,000 px scroll narrative. [12][13][56] Dennis Snellenberg's comparatively adaptable application script was 36,812 decompressed bytes and achieved its sophistication through DOM/CSS/GSAP orchestration rather than WebGL. [9][10][57] None of the three inspected implementations exposed an OS-level `prefers-reduced-motion` path. [3][4][9][10][12][13][55][56][57]

The recommended direction is **Indexed Proof Sheet**, a refinement of the council's Evidence Bench concept: warm paper between carbon-black evidence rails, signal-red index rules, trace-teal data paths, expressive grotesk typography, monospaced datum labels, asymmetric folio rows, and a claim-to-source system. Its signature interaction is a user-controlled **Trace Inspector** in the Chronos-DSP case study. The site should be static-first, with real project routes, semantic HTML, original SVG diagrams, native scrolling, and React limited to one bounded interactive island. [32][33][34][38][40][41]

## 1. Method and Evidence Quality

Four complementary research streams were completed:

1. **Award-directory research:** seven portfolios with primary Awwwards, CSS Design Awards, or FWA evidence. [2][5][6][9][11][14][17][18][21][22]
2. **Editorial and technical research:** seven first-party portfolios spanning interface research, web standards, creative development, hardware/product research, visual explanation, and systems education. [24][26][27][28][29][30][31]
3. **Implementation inspection:** live HTML/CSS/JavaScript, public source maps, a linked source repository, runtime network logs, and bundle hashes for Bruno Simon, Robin Payot, and Dennis Snellenberg. [3][4][9][10][12][13][55][56][57]
4. **Accessibility and performance research:** primary W3C/WAI, MDN, web.dev, Chrome for Developers, and Awwwards evaluation guidance. [1][32][33][34][35][36][37][38][39]

The four reports contain 161 unique URLs. Award pages verify the submitted version, not necessarily the current live design. [9][10][14][15] Godly redirected to Recent.design, so no specific Godly recognition is claimed. [61][62] The FWA's current case URLs were unavailable; historical recognition was verified through its official read-only archive. [6]

Evidence labels used in this brief:

- **Observed:** directly present in fetched source, runtime output, award records, or first-party pages.
- **Inference:** a design or performance conclusion drawn from observations.
- **Project policy:** a recommended budget or acceptance criterion, not a universal standard.

## 2. What Award-Recognized Portfolios Actually Do

### 2.1 Arthur Engel — mechanism-first immersion

Arthur Engel's portfolio combines an atmospheric visual scene with detailed project writing. The PRESTI.AI case explains the product problem, scene graph, render-pass pipeline, depth normalization, camera consistency, snapping, raycasting, collision behavior, stack, and live product. [7][8] Two other cases show the same constraint-first method: Reaali documents reducing a complete 3D scene to a 376 KB file, while W3R.ONE documents handing off from an SVG silhouette to a Three.js mesh on the same silhouette. [78][79]

**Transferable principle:** derive the visual system from the actual mechanism, then support it with a precise semantic route. The atmospheric treatment is optional; the constraint → mechanism → evidence structure is the durable idea.

### 2.2 Haoqi Wen — publish the tool and the reason it exists

Haoqi Wen's portfolio connects product work to tools built during the work. The Wasm design utils article documents installation, asynchronous APIs, color conversion, image color extraction, SVG path generation, and how the site itself uses the package. [19][20]

**Transferable principle:** a project becomes more credible when the visitor can inspect the artifact, understand its interface, and see why it was built. For Leelansh's work, this favors source links, test/release links, execution traces, experiment notes, and live demos over generic technology badges.

### 2.3 Dennis Snellenberg — metadata clarity before visual polish

Dennis's current work and case pages make role, credits, location/year, live links, and image sequences easy to find. The award page verifies the 2022 submitted version; the live site is a later state. [9][10][60]

**Transferable principle:** status, collaboration credit, evidence class, and artifact links should be impossible to miss. The missing layer for this portfolio is a short engineering narrative: problem, mechanism, result type, and limits.

### 2.4 Tom Sears and Max Milkin — decision systems and restraint

Tom Sears's current case studies emphasize editorial sequence, explicit credits, and decision-system artifacts such as guidelines, motion rules, and component libraries. Max Milkin's portfolio uses a pale field, one central visual, thin metadata, numbered sections, and concise case routing. [15][16][23][65][66]

**Transferable principle:** show the decision system, not only the final screen. Use one strong visual and disciplined typography, but do not confuse minimal composition with missing context. Max's “performance-first” language is positioning, not a verified benchmark. [21][22]

### 2.5 Bruno Simon and Robin Payot — the portfolio as an artifact, with a cost

Bruno Simon's portfolio is a drivable technical world with quality controls, multiple input modes, a behind-the-scenes area, source, licenses, and credits. Robin Payot's portfolio uses a spatial overview, a 15,000 px scroll narrative, camera trails, particles, and postprocessing. [3][4][11][12][13]

**Transferable principle:** the site itself can demonstrate engineering judgment. The boundary is that spatial navigation must never be the only route to evidence. Robin's current portrait-mobile rotate gate is an anti-pattern for a public engineering portfolio. [12][13]

## 3. What Editorial and Technical References Add

### 3.1 Mission-led curation

Bret Victor's homepage is a chronology organized around a stated intellectual mission, not a wall of thumbnails. Lea Verou's project pages move from description to innovation and impact, with the runnable artifact beside the explanation. [24][26]

**Application:** Leelansh's diverse projects should share one durable question, such as “How can technical behavior become inspectable?” The homepage should feature three proof projects and preserve the rest in a compact Work index.

### 3.2 Interaction as evidence

Victor's interactive essays expose program state and time. Nicky Case's explainable explanations use a “Do & Show & Tell” sequence and choose among text, graphs, animation, and interaction according to what each represents. Jhey Tompkins's Pluckable Grid explicitly separates playable surfaces from stable reading regions. [25][28][58]

**Application:** use interaction only when it reveals state, causality, comparison, or mechanism. The Trace Inspector should teach one signal path through explicit stages. It should not autoplay, require dragging, or hide project evidence behind an effect.

### 3.3 Hardware stories as decision logs

Matt Webb writes about hardware through screw placement, timezone behavior, cable compatibility, radio emissions, screen finish, firmware, test batches, and suspected failure mechanisms. [29][59]

**Application:** technical credibility comes from constraints and decisions. Even software-heavy projects can use this structure: resource budget → architectural decision → test or artifact → unresolved risk.

### 3.4 Diagrams with a route back to reality

Maggie Appleton's visual explanations map an abstract target to a familiar source and disclose what the representation omits. Julia Evans connects surprising system behavior to minimal visual models, safe playgrounds, and deeper writing. [30][31][63][64]

**Application:** every diagram needs a caption, text equivalent, and source or method. A memory-tier diagram should explain expert movement; a signal diagram should explain the channel model; neither should exist as decorative “tech” imagery.

## 4. Implementation Evidence and Safe Adaptation

| Reference | Public implementation evidence | Observed signature | Reduced-motion/fallback finding | Safe adaptation |
|---|---|---|---|---|
| Bruno Simon | Vite, Three.js r187, GSAP 3.15.1, Rapier WASM, Howler; 3.82 MB decompressed entry bundle; linked repository with an MIT license file while package metadata still declares ISC [3][4][55][83][84] | Drivable 3D world, physics, raycast interactions, audio, quality tiers | Quality toggle and WebGL backend path; no OS reduced-motion or non-WebGL fallback found | Borrow source transparency and quality thinking, not the game architecture |
| Robin Payot | Webpack, Three.js r113, GSAP 3.6.1, GLTF/DRACO, postprocessing, detect-gpu; 1.21 MB decompressed main bundle; public source maps [12][13][56] | 15,000 px scroll narrative, camera trail, particles, displacement transitions | Mobile rotate gate; no OS reduced-motion or WebGL-failure fallback found | Borrow one-visual-idea discipline and lifecycle awareness |
| Dennis Snellenberg | Server-rendered HTML, jQuery, GSAP/ScrollTrigger, Barba, Locomotive Scroll, LazyLoad; 36.8 KB decompressed application script [9][10][57] | Smooth scroll, full-page transitions, magnetic buttons, custom cursor, reveals | Touch/native-positioning branch; no OS reduced-motion path found | Borrow transition clarity and concise card behavior; keep native scrolling |

### Safe implementation conclusions

1. **Semantic evidence first.** Every project fact, role, source, result, and limit belongs in HTML.
2. **One compact visual mechanism.** An SVG signal path with optional Canvas 2D is sufficient; WebGL is not justified.
3. **Native scrolling.** No Locomotive, Lenis, Barba, artificial long scroll surface, pinning, or parallax.
4. **Short purposeful motion.** As project policy, use 160–320 ms opacity, stroke, color, and small transform changes; prefer compositor-friendly properties and measure the rest. Content remains visible by default. [45]
5. **Reduced motion as a first-class state.** No autoplay, spatial reveals, trace morphs, smooth scrolling, or continuous loops when reduced motion is requested. [33][45]
6. **Static fallback.** A useful SVG, text explanation, and data table remain if JavaScript or Canvas fails. [34][38]
7. **Performance budgets before spectacle.** The research supports ≤125 KB gzip initial JavaScript, ≤30 KB CSS, ≤60 KB fonts, and ≤350 KB compressed initial mobile transfer as project policies. Field targets remain LCP ≤2.5 s, INP ≤200 ms, and CLS ≤0.1 at p75; Lighthouse is a lab regression tool, not a field INP measurement. [35][36][37]

## 5. Accessibility and Quality Constraints

Awwwards publishes a weighting of Design 40%, Usability 30%, Creativity 20%, and Content 10%. That is not an accessibility standard, but it reinforces that design and usability are both major constraints. [1]

The release floor should be WCAG 2.2 AA, with the complete reduced-motion behavior of SC 2.3.3 (Level AAA) voluntarily adopted as a product requirement. [33]

Required acceptance criteria:

- Every task works by keyboard with visible, unobscured focus and no trap. [32][43][73][74]
- Text meets 4.5:1 contrast, or 3:1 only when genuinely large; essential graphics and focus meet 3:1. A control boundary needs 3:1 only when that boundary is required to identify the control; this portfolio may apply the stricter rule to all primary controls as project policy. [67][68]
- Content reflows at 320 CSS px, text resizes to 200% without loss, and prescribed text-spacing overrides cause no clipping or overlap. [44][71][72]
- Meet the WCAG 2.2 AA target-size baseline of 24×24 CSS px with its exceptions; as stricter project policy, make primary touch targets at least 44×44 CSS px, aligned with the enhanced AAA criterion. No unique action depends on hover, drag, or canvas hit targets. [69][70]
- **Informative Canvas or complex SVG:** provide an adjacent equivalent explanation and, where relationships or data require it, a table. **Functional SVG:** provide an accessible name and native HTML controls outside the graphic. **Decorative SVG:** hide it from assistive technology without redundant descriptions. [34][75][76]
- Core routes, project narratives, source links, résumé, and contact work with JavaScript disabled. [38]
- Every route has a unique title, description, canonical URL, Open Graph metadata, and deliberate social image. [39]
- Combine automated checks with manual keyboard, visual, reduced-motion, no-JS, and browser testing; accessibility tools can produce false positives or negatives and do not replace human judgment. [77]

## 6. Fit to Leelansh's Verified Work

The portfolio should not imply that every project is physical hardware. The honest connecting idea is **inspectable systems across software and hardware**: signal paths, memory systems, instruction execution, hardware-counter telemetry, and local-first software.

| Project | Evidence-safe narrative | Best visual mechanism | Required limit |
|---|---|---|---|
| Chronos-DSP | Personal engineering project: ray geometry to simulated received IQ, with an Elixir/Phoenix control plane and Rust NIF DSP data plane [46][47] | Trace Inspector: source → channel model → receiver → constellation/BER | Simulation, not calibrated RF, hardware measurement, or proven hard-real-time software |
| Life OS | Team prototype (3 people, user-verified in the redacted résumé extract): local-first personal system with ONNX, LanceDB, and adaptive recommendations [46][50][82] | Local data → inference/memory → recommendation → feedback | No release or measured performance claim; not fully offline |
| Modulation-Studio | Team project (2 people, user-verified in the redacted résumé extract): browser signals lab with impairment, FFT, constellation, BER/SER, and export [46][48][82] | Static constellation and signal-chain diagram; direct live demo | Simulation; one HTTP 200 does not prove deployment health |
| HPC_Boost | The résumé lists HPC-Boost as a two-person project but does not specify a version. The repository contains an earlier imported report with different authors and later v2 results covering PMU subset selection, grouped validation, and negative findings. [46][51][80][81][82] | Counter-subset bars and validation ledger | Keep the inherited report, résumé entry, and v2 results distinct; not sole-authored or a deployed detector; measured dataset claims need conditions |
| MoE-Memory-Wall | Group coursework: training-free expert prediction and prefetching under a memory budget [46][49] | Expert movement across HBM/cache tiers | Simulation using TinyMoE-recorded, Mixtral-calibrated, and uniform routing; no measured Mixtral/GPU speedup |
| RISC-V | Team project (4 people, user-verified in the redacted résumé extract): two-pass RV32I-subset assembler and execution-trace simulator [46][52][82] | Instruction → register/memory change → trace | Subset, not complete RV32I; not hardware measurement |
| AP_Project | Coordinated team desktop ERP work (2 people, user-verified in the redacted résumé extract) [46][53][82] | Compact archive entry | No adoption or individual-authorship claim |
| tasveer | Coordinated team campus-media and editorial work [46][54] | Text-only archive entry and live link | Media rights and photographer consent are unconfirmed |

Forks—AionUi, ecapture, hive, and posthog—are excluded as original work.

## 7. Three Creative Directions

### A. Indexed Proof Sheet — recommended

**Visual thesis:** an engineer's proof sheet with warm paper, carbon evidence rails, signal-red index rules, trace-teal data paths, precise annotations, and unequal folio rows. Identity comes from the datum system: a small ID beside a claim, in its diagram, and beside its source.

- **Type:** Bricolage Grotesque, Source Sans 3, and IBM Plex Mono are candidates, not a mandate. The default composition targets a 5.5 rem display size and two lines, but meaningful headings must grow and wrap at 200% text/zoom and under text-spacing overrides; never use fixed-height clamping or hidden overflow. Ship only measured WOFF2 subsets within the 60 KB cap, falling back to two web-font families plus a system monospace stack if needed.
- **Layout:** continuous carbon datum gutter, 4 px red index rule, one lead proof sheet, two full-width ruled entries, narrow evidence ledger. No thumbnail wall or decorative grid.
- **Hero:** identity and positioning above a static three-datum proof strip—question → artifact → evidence class/limit—with View Work and Résumé actions.
- **Signature:** the Chronos Trace Inspector, framed as four evidence-ledger rows controlled by Previous/Next.
- **Motion:** reveal → relate → confirm; no ambient motion, autoplay, parallax, magnetic controls, custom cursor, or scroll hijacking.
- **Buildability:** high. Static HTML/SVG carries the concept; one React island adds state.
- **Differentiation:** no direct equivalent of the claim-to-source datum route and folio construction was observed in the inspected reference set. The surface avoids Tom Sears's monochrome image index, Haoqi's decorative grid/sticker energy, Max's central-object composition, and Arthur's atmospheric WebGPU scene. [7][15][19][23]

### B. Systems Atlas — rejected as the primary identity

**Visual thesis:** cool architectural planes, orthographic modules, coordinate labels, exploded system views, graphite/cobalt/lime.

- **Best fit:** MoE, Life OS, RISC-V, and HPC_Boost.
- **Signature:** an accessible exploded stack separating application, runtime, memory, and hardware.
- **Risk:** weaker for signal phenomena, encourages pseudo-hardware imagery, and resembles spatial creative-developer portfolios.
- **Decision:** reject as the site-wide identity; borrow compact accurate system diagrams inside case studies.

### C. Workshop Ledger — rejected as the primary identity

**Visual thesis:** deep forest, cream, oxblood, marigold, literary serif headlines, numbered notes, margin annotations, test cards.

- **Best fit:** hardware decision logs, HPC_Boost's negative finding, and candid process writing.
- **Signature:** constraint → trade-off → test → unresolved-risk annotations.
- **Risk:** reads as a personal notebook or design studio before an engineering portfolio; less natural for live tools.
- **Decision:** reject as the primary identity; borrow dated decision-log candor for case-study limits.

## 8. Recommended Experience Architecture

### Routes

- `/` — orientation, three selected projects, About preview, contact, footer.
- `/work/` — five case studies followed by three archive entries.
- `/work/[slug]/` — static case study or compact archive record.
- `/about/` — verified identity, recurring themes, toolkit, principles, contact.
- `/resume/` — text-first, print-friendly résumé generated from the same facts.
- `/#contact` — stable contact anchor; visible email in every footer.
- `/404.html` — useful static not-found route.

### Homepage order

1. Identity and positioning.
2. Three-datum proof strip: question → artifact → evidence class/limit.
3. Exactly three selected projects: Chronos-DSP, Life OS, Modulation-Studio.
4. Short About/toolkit preview.
5. Contact invitation with email, copy action, GitHub, and LinkedIn.
6. Footer with evidence-checked date, résumé, and source/profile links.

### Case-study schema

Title/question → at-a-glance status/role/team size/evidence class → recruiter summary → context and constraints → mechanism → contribution and credit → artifact → results ledger → limits and non-claims → sources and next step.

Every numerical or comparative result needs a value, evidence class, method, conditions, and source. Negative findings remain first-class evidence.

## 9. Recommended Technical Architecture

Adopt **Astro static generation with narrowly scoped React islands**. Astro renders complete HTML for content routes; React is reserved for the Chronos Trace Inspector and hydrates only when visible. Pure TypeScript simulation helpers remain independently testable. [40][41]

- No SSR adapter, server island, API, database, CMS, authentication, analytics, or client router.
- No WebGL, Three.js, physics/WASM, GSAP, Locomotive/Lenis, Barba, React Router, chart library, icon package, or custom cursor.
- Self-host only measured WOFF2 subsets within the 60 KB cap; no remote font CSS. Prefer two web-font families plus a system monospace stack if the three candidate families exceed the cap, and preload at most the measured critical subset. [37]
- Author original inline SVG diagrams. Treat informative/complex, functional, and decorative graphics differently: provide equivalents where needed, accessible names for controls, and assistive-technology hiding for pure decoration. [42][75][76]
- Local deterministic visualization data with source and assumptions; no build-time network dependency.
- Real anchor navigation and stable URLs; direct loads, reloads, and back/forward remain native.
- TypeScript 6.0.3, Vitest, Playwright, and accessibility automation gate release.

The architecture is successful if the Trace Inspector can later be simplified to vanilla TypeScript without changing the visitor contract.

## 10. Do / Don't Guidance

### Do

- Lead with a specific engineering question.
- Put role, team size, status, evidence class, and limits beside the work.
- Use one original diagram per project and one signature interaction for the site.
- Keep every insight available as text, table, or static SVG.
- Make source, tests, release, report, and demo links close to the claim.
- Use native controls and native scrolling.
- Treat reduced motion, no-JS, and failed-island states as release gates.
- Measure performance and label lab versus field evidence honestly.

### Don't

- Copy reference code, assets, branding, prose, typography pairings as a recipe, or recognizable hero compositions.
- Use a 3D world, physics, postprocessing, autoplay audio, or a desktop-only gate to prove technical depth.
- Hide evidence behind hover, dragging, scrolling milestones, or an intro.
- Describe simulations as hardware measurements or team work as sole authorship.
- Call Life OS fully offline, Chronos calibrated RF, MoE measured GPU acceleration, HPC a deployed detector, or RISC-V complete RV32I.
- Reuse repository screenshots or tasveer media before rights are confirmed.
- Add a contact form, CMS, search/filter taxonomy, analytics, or speculative backend to an eight-project portfolio.
- Claim availability, employment, awards, adoption, or performance that the evidence does not support.

## 11. Open Questions and Safe Defaults

| Open question | Safe default |
|---|---|
| Target roles and availability | Neutral ECE/domain positioning; no “Open to work” badge |
| Preferred public email | Use the already-published institutional email |
| Exact individual contributions and collaborator names | Label team/coursework and describe general contribution only |
| Project dates | Omit dates; show status and an evidence-checked date |
| Canonical domain | Configure one explicit production `site` URL before release; GitHub Pages origin is available but deployment is not part of this build |
| Media reuse rights | Original diagrams only; text-only tasveer archive entry |
| Résumé PDF | Ship HTML `/resume/` first; add PDF only after print and accessibility verification |
| Real-user Core Web Vitals | Use CrUX when eligible. Until then, keep the field gate open or add a minimal privacy-preserving RUM beacon with a documented retention policy; do not fabricate field INP from Lighthouse |

## Sources

1. [Awwwards — Evaluation System](https://www.awwwards.com/about-evaluation/).
2. [Awwwards — Bruno's Portfolio](https://www.awwwards.com/sites/brunos-portfolio).
3. [Bruno Simon — Live portfolio](https://bruno-simon.com/).
4. [Bruno Simon — Folio 2025 source](https://github.com/brunosimon/folio-2025).
5. [CSS Design Awards — Arthur Engel Portfolio](https://www.cssdesignawards.com/sites/arthur-engel/50316/).
6. [The FWA archive — Arthur Engel Portfolio](https://legacy.thefwa.com/cases/arthur-engel-portfolio).
7. [Arthur Engel — Live portfolio](https://aengel.io/).
8. [Arthur Engel — PRESTI.AI case study](https://aengel.io/projects/presti).
9. [Awwwards — Dennis Snellenberg](https://www.awwwards.com/sites/dennis-snellenberg).
10. [Dennis Snellenberg — Live portfolio](https://dennissnellenberg.com/).
11. [Awwwards — Robin Payot Portfolio 2022](https://www.awwwards.com/sites/robin-payot-portfolio-2022).
12. [Robin Payot — Live portfolio](https://robinpayot.com/).
13. [Robin Payot — Public JavaScript source map](https://robinpayot.com/bundle.fc8479f1eef2be9b39d9.js.map).
14. [Awwwards — Tom Sears Personal Portfolio](https://www.awwwards.com/sites/tom-sears-personal-portfolio).
15. [Tom Sears — Live portfolio](https://www.tomsears.me/).
16. [Tom Sears — Squarespace Brand case study](https://www.tomsears.me/project/squarespace-brand).
17. [Awwwards — HAOQI.DESIGN](https://www.awwwards.com/sites/haoqi-design).
18. [CSS Design Awards — HAOQI.DESIGN](https://www.cssdesignawards.com/sites/haoqi-design/49819/).
19. [Haoqi Wen — Live portfolio](https://haoqi.design/).
20. [Haoqi Wen — Wasm design utils](https://haoqi.design/wasm_design_utils).
21. [Awwwards — Max Milkin Portfolio](https://www.awwwards.com/sites/max-milkin-portfolio).
22. [CSS Design Awards — Max Milkin](https://www.cssdesignawards.com/sites/max-milkin/48371/).
23. [Max Milkin — Live portfolio](https://www.maxmilkin.com/).
24. [Bret Victor — Worrydream](https://worrydream.com/).
25. [Bret Victor — Learnable Programming](https://worrydream.com/LearnableProgramming/).
26. [Lea Verou — Projects](https://lea.verou.me/projects/).
27. [Jhey Tompkins — Portfolio](https://jhey.dev/).
28. [Nicky Case — Explorable Explanations](https://blog.ncase.me/explorable-explanations/).
29. [Matt Webb — Hardware products](https://interconnected.org/home/2024/08/22/matte).
30. [Maggie Appleton — Drawing Invisible Programming Concepts](https://maggieappleton.com/drawinginvisibles1).
31. [Julia Evans — Projects](https://jvns.ca/projects/).
32. [W3C WAI — Understanding Keyboard](https://www.w3.org/WAI/WCAG22/Understanding/keyboard.html).
33. [W3C WAI — Understanding Animation from Interactions](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html).
34. [MDN — Canvas element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/canvas).
35. [web.dev — Web Vitals](https://web.dev/articles/vitals).
36. [web.dev — Performance budgets 101](https://web.dev/articles/performance-budgets-101).
37. [web.dev — Font best practices](https://web.dev/articles/font-best-practices).
38. [MDN — Progressive enhancement](https://developer.mozilla.org/en-US/docs/Glossary/Progressive_enhancement).
39. [web.dev — Metadata](https://web.dev/learn/html/metadata).
40. [Astro — Islands architecture](https://docs.astro.build/en/concepts/islands/).
41. [Astro — Content collections](https://docs.astro.build/en/guides/content-collections/).
42. [Astro — Images](https://docs.astro.build/en/guides/images/).
43. [W3C WAI — Focus Not Obscured](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html).
44. [W3C WAI — Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html).
45. [web.dev — High-performance CSS animations](https://web.dev/articles/animations-guide).
46. [GitHub — Leelansh Kharbanda profile](https://github.com/leelanshkharbanda).
47. [GitHub — Chronos-DSP](https://github.com/leelanshkharbanda/Chronos-DSP).
48. [GitHub — Modulation-Studio](https://github.com/leelanshkharbanda/Modulation-Studio).
49. [GitHub — MoE-Memory-Wall](https://github.com/leelanshkharbanda/MoE-Memory-Wall-CA-Project).
50. [GitHub — Life-Os](https://github.com/leelanshkharbanda/Life-Os).
51. [GitHub — HPC_Boost](https://github.com/leelanshkharbanda/HPC_Boost).
52. [GitHub — RISC-V Assembler and Simulator](https://github.com/leelanshkharbanda/RISC-V-Assembler-and-Simulator).
53. [GitHub — AP_Project](https://github.com/leelanshkharbanda/AP_Project).
54. [GitHub — tasveer](https://github.com/leelanshkharbanda/tasveer).
55. [Bruno Simon — Captured entry bundle](https://bruno-simon.com/assets/index-DZgz1LCb.js).
56. [Robin Payot — Captured main bundle](https://robinpayot.com/bundle.fc8479f1eef2be9b39d9.js?09c63737b326ad82a8e6).
57. [Dennis Snellenberg — Application script](https://www.dennissnellenberg.com/assets/js/index-new.js).
58. [Jhey Tompkins — Pluckable Grid](https://jhey.dev/prototypes/2026/pluckable-grid/index.html).
59. [Matt Webb — Back from Shenzhen](https://interconnected.org/home/2025/07/18/shenzhen).
60. [Dennis Snellenberg — TWICE case study](https://dennissnellenberg.com/work/twice).
61. [Godly — Redirect entry point](https://godly.website/).
62. [Recent.design — Godly redirect destination](http://recent.design/?ref=godly).
63. [Julia Evans — How I write useful programming comics](https://jvns.ca/blog/2020/12/05/how-i-write-useful-programming-comics/).
64. [Maggie Appleton — A Picture Worth a Thousand Programmes](https://maggieappleton.com/programming-pictures).
65. [Max Milkin — Yevgeniya Grab case study](https://www.maxmilkin.com/yevgeniyagrab).
66. [Tom Sears — Projects index](https://www.tomsears.me/projects).
67. [W3C WAI — Contrast (Minimum), SC 1.4.3](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html).
68. [W3C WAI — Non-text Contrast, SC 1.4.11](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html).
69. [W3C WAI — Target Size (Minimum), SC 2.5.8](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html).
70. [W3C WAI — Target Size (Enhanced), SC 2.5.5](https://www.w3.org/WAI/WCAG22/Understanding/target-size-enhanced.html).
71. [W3C WAI — Resize Text, SC 1.4.4](https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html).
72. [W3C WAI — Text Spacing, SC 1.4.12](https://www.w3.org/WAI/WCAG22/Understanding/text-spacing.html).
73. [W3C WAI — Focus Visible, SC 2.4.7](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html).
74. [W3C WAI — No Keyboard Trap, SC 2.1.2](https://www.w3.org/WAI/WCAG22/Understanding/no-keyboard-trap.html).
75. [W3C WAI — Non-text Content, SC 1.1.1](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content.html).
76. [W3C WAI — Complex Images Tutorial](https://www.w3.org/WAI/tutorials/images/complex/).
77. [W3C WAI — Selecting Web Accessibility Evaluation Tools](https://www.w3.org/WAI/test-evaluate/tools/selecting/).
78. [Arthur Engel — Reaali case study](https://aengel.io/projects/reaali).
79. [Arthur Engel — W3R.ONE case study](https://aengel.io/projects/w3r-one).
80. [HPC_Boost — Inherited report](https://github.com/leelanshkharbanda/HPC_Boost/blob/main/hpc_boost_report.txt).
81. [HPC_Boost — v2 experiment results](https://github.com/leelanshkharbanda/HPC_Boost/blob/main/hpc_boost_v2/experiments/exp5_recommender/RESULTS.md).
82. [Public résumé facts — Redacted evidence extract](./public-resume-facts.md).
83. [Bruno Simon — Repository package metadata](https://github.com/brunosimon/folio-2025/blob/main/package.json).
84. [Bruno Simon — Repository license file](https://github.com/brunosimon/folio-2025/blob/main/license.md).
