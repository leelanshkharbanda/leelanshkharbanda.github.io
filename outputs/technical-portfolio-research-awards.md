# Award-Recognized Technical Portfolio References

**Research role:** researcher-awards  
**Access date:** 2026-11-25  
**Scope:** Read-only primary-source review of award-platform pages and the referenced live portfolios. No app code was changed. No reference code, assets, or long-form prose was copied.

## Executive synthesis

The strongest references for an engineer working across software and hardware are not simply the most spectacular sites. They are the sites that make the engineering legible through a repeatable narrative and use interaction to demonstrate a real mechanism.

- **Arthur Engel** is the strongest overall model: an immersive visual world backed by unusually precise case studies about constraints, mechanisms, stack, and technical decisions.
- **Haoqi Wen** is the strongest model for software/hardware credibility: he documents the tools he built, publishes code-level usage, and connects them to a live product.
- **Bruno Simon** shows how a portfolio can itself be an engineering artifact, with an open-source behind-the-scenes layer and multiple input modes.
- **Dennis Snellenberg**, **Robin Payot**, **Tom Sears**, and **Max Milkin** provide complementary lessons in editorial clarity, spatial navigation, collaboration credit, and restraint.

The recommended direction is a hybrid: **one recurring engineering signal, direct and readable case-study routes, and motion that explains rather than decorates**. The immersive layer should be optional, not the only way to reach the work.

## Scope and method

1. Searched Awwwards, CSS Design Awards, The FWA, and Godly for portfolio references.
2. Verified recognition on primary award pages. A gallery or inspiration page was not treated as an award.
3. Read the actual portfolio sites and selected case studies.
4. Used lightweight browser inspection for content order, computed typography, visible controls, and semantic text. This was not a bundle, accessibility, or performance audit.
5. Grounded project fit in the existing GitHub evidence audit and the seven public repositories. Project descriptions are treated as evidence boundaries, not as permission to claim measured hardware results. [1][2]

The FWA moved to a new site in November 2026. Historical case pages were verified through its official read-only archive at `legacy.thefwa.com`; current `thefwa.com/cases/...` URLs returned “record not found.” [4][7][17]

Godly now redirects to Recent.design. No specific Godly entry for the selected portfolios was verified, so Godly is recorded as a discovery channel only, not as award evidence. [30][31]

## Evidence table

| Reference | Verified recognition | Live URL | Strongest transferable pattern | Best fit for Leelansh | Main caution |
|---|---|---|---|---|---|
| Bruno Simon — Bruno's Portfolio | Awwwards SOTD, 2026-01-21; FWA FOTD, 2025-12-13 [3][4] | https://bruno-simon.com/ | The portfolio itself is a working technical artifact, with controls and an open-source explanation layer | Chronos-DSP, Modulation-Studio, RISC-V | Spatial/game navigation is not a sufficient content alternative |
| Arthur Engel — Portfolio | CSSDA WOTD, 2026-11-04; FWA FOTD, 2026-09-30 [6][7] | https://aengel.io/ | Problem → constraint → mechanism → stack → evidence, paired with one visual rule | MoE-Memory-Wall, HPC_Boost, Chronos-DSP | WebGPU, drag, and scroll dependence require a genuine lite/text route |
| Dennis Snellenberg — Portfolio | Awwwards SOTD, 2022-04-04 [10] | https://dennissnellenberg.com/ | Highly scannable role, year, location, credit, and live-artifact metadata | tasveer, Life-Os, Modulation-Studio | Visual polish currently outweighs technical explanation |
| Robin Payot — Portfolio 2022 | Awwwards SOTD, 2022-04-01 [14] | https://robinpayot.com/ | A spatial overview can function as a memorable map of the work | Chronos-DSP, Modulation-Studio, tasveer | Current entry explicitly blocks mobile with a desktop/rotate gate |
| Tom Sears — Personal Portfolio | Awwwards SOTD, 2022-05-15; FWA FOTD, 2022-05-09 [16][17] | https://www.tomsears.me/ | Explicit collaboration credits and decision-system artifacts inside case studies | HPC_Boost, RISC-V, tasveer | Design-director reference, not a deep engineering implementation model |
| Haoqi Wen — HAOQI.DESIGN | Awwwards SOTD, 2026-08-14; CSSDA WOTD, 2026-08-12 [21][22] | https://haoqi.design/ | Build a tool, publish it, document its API, and show the live product that needed it | Life-Os, HPC_Boost, RISC-V | Shader/glass/audio effects need opt-outs and GPU budgets |
| Max Milkin — Creative Frontend Developer | Awwwards SOTD, 2025-12-13; CSSDA Special Kudos, 2025-11-11 [26][27] | https://www.maxmilkin.com/ | Restrained typography, numbered sections, one hero visual, concise case routing | tasveer, Life-Os, Modulation-Studio | “Performance-first” is positioning, not a verified benchmark |

## Detailed findings

### 1. Bruno Simon — Bruno's Portfolio

- **URL:** https://bruno-simon.com/
- **Owner/designer:** Bruno Simon. The current Awwwards and FWA pages credit him directly. [3][4]
- **Award/gallery evidence:** Awwwards Site of the Day on 2026-01-21, score 8.11/10, with a Developer Award score of 7.65/10. The FWA archive records FWA of the Day on 2025-12-13, 93 points after two voting days. [3][4]
- **Visual concept:** A playful 3D world explored by driving a car. The environment is the navigation, while the portfolio’s technical personality is expressed through world objects, a circuit, achievements, and visitor messages.
- **Layout/content sequence:** Welcome and instructions → free driving through project/world areas → options, controls, achievements, circuit, and whispers → a “behind the scene” area containing stack, devlogs, source code, licenses, and credits. [5]
- **Typography:** Nunito for interface/body text and Amatic SC for display headings. The live site’s own technical notes identify both fonts. [5]
- **Interaction/motion idea:** Driving, boosting, braking, jumping, camera movement, hydraulics, a map, sound, quality settings, renderer selection, and mouse/keyboard, touch, and gamepad controls. Shared-world features include a circuit and visitor messages, with an explicit offline-server state. [5]
- **Technical storytelling strength:** **High technical credibility, medium scanability.** The behind-the-scenes section names Three.js, Rapier, Howler.js, the source repository, and licensing. That proves the site is an engineering artifact rather than only a visual showpiece. The trade-off is that a visitor must explore the world to discover the information.
- **Transferable principle:** Make the interaction a working metaphor for the engineering, but preserve direct project links and a textual technical route.
- **Fit for Leelansh:** Chronos-DSP could become a navigable signal path rather than a generic dashboard; Modulation-Studio could expose its signal chain as an explorable lab; RISC-V could use execution traces as the world’s feedback layer. The metaphor should be independently designed, not copied.
- **Accessibility/performance notes:** Positive signals include multiple input schemes, audio and quality controls, renderer choice, reset/unstuck actions, and an offline warning. Risks include continuous 3D rendering, audio, spatial navigation, and the absence of an obvious reduced-motion control in the options snapshot. This was not an accessibility audit.

### 2. Arthur Engel — Portfolio

- **URL:** https://aengel.io/
- **Owner/designer:** Arthur Engel, credited as a design engineer. [7][8]
- **Award/gallery evidence:** CSS Design Awards Website of the Day on 2026-11-04, final judge score 8.48. The FWA archive records FWA of the Day on 2026-09-30, 83 points after four voting days. [6][7]
- **Visual concept:** A dark, atmospheric cavern/arch environment with vegetation, water, light shafts, and restrained interface overlays. The visual system feels like a technical instrument embedded in a physical world.
- **Layout/content sequence:** Full-screen project selector with drag/scroll switching and a six-project counter → short design-engineering statement → contact route → semantic project index with detailed case content → about/contact/lite routes. [8]
- **Typography:** League Spartan for display/headings and Manrope for body/interface text. [8]
- **Interaction/motion idea:** Scroll-driven navigation, drag-to-switch projects, spatial scene transitions, sound, and an explicit Lite Version. [6][8]
- **Technical storytelling strength:** **Very high.** The PRESTI.AI case explains the product problem, the scene graph and render-pass pipeline, depth normalization, camera consistency, snapping, raycasting, collision behavior, stack, and live product. Other cases include concrete constraints such as reducing a 3D scene to a 376 KB asset and handing off from an SVG silhouette to a Three.js mesh. [8][9]
- **Transferable principle:** Derive the visual and motion system from the actual mechanism, then support it with precise prose and a readable semantic route.
- **Fit for Leelansh:** MoE-Memory-Wall can visualize expert movement and memory tiers; HPC_Boost can present subset selection and negative findings as an instrument panel; Chronos-DSP can connect ray geometry, channel model, and recovered IQ in one continuous scene.
- **Accessibility/performance notes:** Strong signals include the Lite Version, a WebGPU/WebGL failure message, `noscript` handling, and screen-reader-only project content in the page source. Risks remain: GPU-heavy rendering, Draco/texture assets, drag interaction, scroll dependence, and sound. The lite route should be tested as a complete content equivalent, not merely a visual downgrade.

### 3. Dennis Snellenberg — Portfolio

- **URL:** https://dennissnellenberg.com/
- **Owner/designer:** Dennis Snellenberg; the site identifies the work as “Code by Dennis.” [10][11]
- **Award/gallery evidence:** Awwwards Site of the Day on 2022-04-04, score 7.35/10, with a Developer Award score of 7.47/10. [10]
- **Visual concept:** The award-era screenshot uses a light-gray portrait field and oversized white name typography. The current site uses a dark `#1C1D20` canvas, white type, and a vivid `#455CE9` accent. The award page verifies the 2022 version; the live site is a later visual state. [10][11]
- **Layout/content sequence:** Multilingual greeting → oversized name and role → four recent projects → “more work” → contact. The work index adds Design/Development filters, client/location/service/year metadata, eleven current projects, and an archive of sixty-six. Case pages expose role, credits, location/year, live link, image sequence, and next case. [11][12][13]
- **Typography:** A single custom family, Dennis Sans, across display and body text. [11]
- **Interaction/motion idea:** Large-type reveals, image-led transitions, parallax, page transitions, and microinteractions; these are also the technologies/effects named on the award page. [10]
- **Technical storytelling strength:** **Medium.** Metadata and collaboration credit are excellent, and live artifacts are easy to find. The TWICE case, however, presents role, credits, location/year, live link, and images without a problem, mechanism, or result narrative. [13]
- **Transferable principle:** Make role, year, location, credit, and live artifact impossible to miss; then add a short engineering narrative rather than relying on imagery.
- **Fit for Leelansh:** tasveer needs this editorial clarity and explicit team credit; Life-Os needs product-level role/stack/live-demo framing; Modulation-Studio can use the filterable index as a model for organizing interactive demos and written experiments.
- **Accessibility/performance notes:** The current pages expose readable headings, links, metadata, and case credits without requiring images. Risks include large media, animated type, parallax, and smooth transitions. No reduced-motion control was observed, and no performance measurements were taken.

### 4. Robin Payot — Portfolio 2022

- **URL:** https://robinpayot.com/
- **Owner/designer:** Robin Payot, freelance creative developer. [14][15]
- **Award/gallery evidence:** Awwwards Site of the Day on 2022-04-01, score 7.52/10, with a Developer Award score of 7.01/10. [14]
- **Visual concept:** A blue spatial field with dotted trajectories, cylinders, and floating project cards. The award screenshot shows a BMW Motorshow card inside an “overview” space, making the portfolio feel like a navigable exhibition rather than a scrolling list. [14]
- **Layout/content sequence:** Desktop/rotation gate → split-text identity intro → a 3D scene containing project, menu, list-view, footer, and scroll-explore regions. The source exposes a list-view region, but its accessibility and behavior were not verified. [15]
- **Typography:** Roadgeek for the intro display and Lato for body text. [15]
- **Interaction/motion idea:** Spatial project navigation, infinite scroll, 3D/WebGL scenes, transitions, and sound; these are the effects and technologies highlighted by Awwwards. [14]
- **Technical storytelling strength:** **Low to medium.** The overview communicates range, polish, and spatial thinking immediately. It provides much less textual evidence about constraints, implementation, or outcomes, and the current mobile gate prevents access to the main experience.
- **Transferable principle:** Use a spatial map as an optional overview layer, never as the only route to project evidence.
- **Fit for Leelansh:** Chronos-DSP could map ray paths and channel effects; Modulation-Studio could map modulation states and impairments; tasveer could become an explorable editorial archive. Every spatial object should also have a direct text/list equivalent.
- **Accessibility/performance notes:** The explicit “designed for desktop” gate is the largest concern: mobile visitors are told to rotate rather than offered a complete alternative. Continuous 3D, infinite scroll, and sound add performance and vestibular risks. Cookie consent and labeled rotation imagery are positive but do not resolve the content-access issue.

### 5. Tom Sears — Personal Portfolio

- **URL:** https://www.tomsears.me/
- **Owner/designer:** Tom Sears. The current site source also credits development to Jonas Luebbers. [16][17][18]
- **Award/gallery evidence:** Awwwards Site of the Day on 2022-05-15, score 7.55/10, with a Developer Award score of 7.49/10. The FWA archive records FWA of the Day on 2022-05-09, 80 points after fourteen voting days. [16][17]
- **Visual concept:** The award-era projects view is a black vertical index with large condensed typography and a floating image preview. The current site is a quieter off-white editorial portfolio with black type and image-led case pages. [16][18]
- **Layout/content sequence:** Current About page: identity → introduction → clients → awards → speaking → links. The projects index lists seven cases. Case pages move from introduction to visual evidence to explicit credits and live site. [18][19][20]
- **Typography:** Neue Haas Grotesque Display with system fallbacks. [18]
- **Interaction/motion idea:** Hover project previews and transitions in the award-era index; the current case studies emphasize readable editorial sequence and large visual evidence. [16][18]
- **Technical storytelling strength:** **Medium to high for process and collaboration, lower for code.** The Squarespace Brand case documents guidelines, motion rules, component libraries, and role-specific credits. It shows how decisions were systematized, but it is not a deep implementation narrative. [20]
- **Transferable principle:** Show the decision system and the collaboration matrix, not only the final screen.
- **Fit for Leelansh:** HPC_Boost and RISC-V need explicit team/individual contribution boundaries; tasveer needs a clear credit model; all seven projects benefit from a consistent problem/process/evidence/limits structure.
- **Accessibility/performance notes:** Current pages have readable text, semantic headings, explicit credits, and responsive image URLs. The award-era hover index is more pointer-dependent, and case pages are image-heavy. No Lighthouse, screen-reader, or reduced-motion audit was performed.

### 6. Haoqi Wen — HAOQI.DESIGN

- **URL:** https://haoqi.design/
- **Owner/designer:** Haoqi Wen; award pages identify him as a product designer and design engineer. [21][22]
- **Award/gallery evidence:** Awwwards Site of the Day on 2026-08-14, score 7.36/10, with a Developer Award score of 7.43/10. CSS Design Awards Website of the Day on 2026-08-12, final judge score 8.28. [21][22]
- **Visual concept:** An off-white grid with iridescent/chrome “hello” lettering, colorful stickers, pointer coordinates, and technical status readouts. It blends product interface, motion experiment, and engineering notebook.
- **Layout/content sequence:** Identity and positioning → current coding projects (Reunimos, Inspire Mono, Wasm design utils, VectorSymbols, DarkSide) → prior product work and events → contact. Project articles use date/year, narrative, code/tool links, and live previews. [23][24][25]
- **Typography:** A custom `tiktok` sans for primary text, Tronica Mono for technical labels, and generic mono for code. [23]
- **Interaction/motion idea:** Pointer-coordinate feedback, theme and sound controls, Rive/Motion/shader effects, and Liquid Glass treatment. A reduced-motion rule is present for the signature-drawing animation. [23][24]
- **Technical storytelling strength:** **Very high.** Reunimos explains the product need and links to the UI utilities created while building it. The Wasm design utils article documents installation, async APIs, color conversion, image color extraction, SVG path generation, and how the site itself uses the package. [24][25]
- **Transferable principle:** Publish the tool you built to solve your own engineering/design problem, document its interface, and connect it to a live artifact.
- **Fit for Leelansh:** Life-Os can expose local-first architecture and adaptive recommendation mechanisms; HPC_Boost can publish analysis tooling and honest experiment notes; RISC-V can document the assembler/simulator API and execution-trace format.
- **Accessibility/performance notes:** Positive signals include readable article content, code blocks, semantic headings, live previews, and at least one reduced-motion rule. Risks include shader/glass effects, audio, pointer-driven detail, and GPU load. The article route should remain complete without the visual effects.

### 7. Max Milkin — Creative Frontend Developer

- **URL:** https://www.maxmilkin.com/
- **Owner/designer:** Max Milkin for the developer portfolio; Olha Lazarieva is credited for design on the Awwwards/CSSDA pages and the site footer. [26][27][28]
- **Award/gallery evidence:** Awwwards Site of the Day on 2025-12-13, score 7.21/10, with a Developer Award score of 7.70/10. CSS Design Awards Special Kudos on 2025-11-11, final judge score 7.81. The CSSDA recognition is Special Kudos, not Website of the Day. [26][27]
- **Visual concept:** A pale sage field, a central rock, smaller scattered stones, thin technical metadata, and a restrained frame. The visual idea is reduction to essentials rather than dense dashboard decoration.
- **Layout/content sequence:** Manifesto/about statement → awards → seven works → expertise → contact. Case pages use title/year → gallery → stack → awards → concise overview → live site and next project. [28][29]
- **Typography:** RF Dewi for primary text and Bebas Neue for display accents. [28]
- **Interaction/motion idea:** Parallax, 3D imagery, split-letter reveals, progress indicators, and precise numbered sections. Awwwards tags Three.js, React, Blender, typography, and parallax. [26]
- **Technical storytelling strength:** **Medium.** The case pages are concise and easy to scan, with stack labels and live links. The sample case explains the intended experience but gives little evidence about implementation constraints, testing, or outcomes. “Performance-first” is the submitter’s positioning, not a verified performance result. [26][29]
- **Transferable principle:** Use one strong visual, disciplined typography, and numbered sections; earn the performance claim with measured evidence.
- **Fit for Leelansh:** tasveer can use editorial restraint; Life-Os can use a single local-first system diagram; Modulation-Studio can foreground one interactive signal visual instead of many competing widgets.
- **Accessibility/performance notes:** Split-letter duplicated text, parallax, and 3D media can affect screen-reader output and loading cost. The site exposes semantic headings, links, and form labels, but no motion control was observed. No performance benchmark was verified.

## Project-to-pattern fit

| Project | Evidence-safe narrative | Most useful reference patterns | Avoid |
|---|---|---|---|
| **Chronos-DSP** | From ray geometry to received IQ: an interactive wireless-channel simulation with an Elixir/Phoenix control plane and Rust NIF DSP data plane. [1][2] | Bruno’s explorable world; Arthur’s mechanism-first case structure; Robin’s spatial map | Calibrated RF claims, production-radio language, or unproven hard-real-time performance |
| **Modulation-Studio** | A signals lab that can be disturbed, measured, and exported, with modulation, impairment, FFT, and constellation views. [1][2] | Haoqi’s live artifact plus technical notes; Max’s restrained hero; Robin’s state map | Treating a screenshot as proof or assuming the latest deployment is still live without rechecking |
| **HPC_Boost** | Hardware-performance-counter subset selection with grouped validation and honest negative findings. [1][2] | Arthur’s constraint/evidence structure; Tom’s explicit credit matrix | Implying sole authorship or a deployed malware detector |
| **MoE-Memory-Wall** | Training-free expert prediction and prefetching under a constrained HBM budget, with committed simulation results. [1][2] | Arthur’s memory-tier visualization; Haoqi’s tool documentation | Measured GPU/Mixtral speedup language when the evidence is simulation |
| **Life-Os** | A local-first personal systems prototype using Tauri, React, Rust/SQLx/SQLite, ONNX, and LanceDB. [1][2] | Dennis’s product metadata; Haoqi’s architecture/tool narrative; Max’s visual restraint | “Fully offline” language or release claims |
| **RISC-V** | An inspectable two-pass RV32I-subset assembler/simulator with registers, label resolution, and execution trace. [1][2] | Tom’s decision/credit structure; Haoqi’s API documentation; Bruno’s feedback-rich interaction | Complete-RV32I or individual-authorship claims |
| **tasveer** | A coordinated campus media archive and editorial experience with photo essays, THE ROLL, and THE CREW. [1][2] | Dennis’s editorial index; Tom’s collaboration credits; Max’s image restraint | Assuming repository ownership grants media rights or photographer consent |

## Three candidate design lessons

### 1. Signal path, not dashboard

**Idea:** Use one recurring visual grammar based on movement through a system: signal, instruction, memory, or event. The same grammar can connect Chronos-DSP, Modulation-Studio, RISC-V, HPC_Boost, MoE-Memory-Wall, and Life-Os without making every project look identical.

**Applications:**
- Chronos-DSP: ray geometry → channel model → impaired signal → recovered IQ.
- Modulation-Studio: source → modulation → impairment → measurement/export.
- RISC-V: instruction → register/memory change → execution trace.
- HPC_Boost and MoE-Memory-Wall: event/expert movement across constrained resources.
- Life-Os: local data → inference/memory → recommendation → user feedback.

**Guardrail:** Every visual path needs a text equivalent, direct project links, and a non-animated state. The signal is a navigation and explanation device, not a substitute for evidence.

**References:** Bruno, Robin, Arthur. [3][4][6][7][14]

### 2. Evidence before spectacle

**Idea:** Standardize every case study around **problem → constraints → mechanism → evidence → limits**, with explicit role and collaboration credit. Use one project-specific visual rather than a generic collage.

**Applications:**
- Put simulation/measured labels beside every result.
- Show the smallest useful artifact: a plot, trace, test, release, API snippet, or live demo.
- For team projects, separate individual contribution from upstream and team work.
- Preserve negative findings as first-class engineering evidence, especially for HPC_Boost.

**Guardrail:** Do not repeat reference-site marketing language. Write original explanations from the repositories and tests, and link to the artifact that supports each claim.

**References:** Arthur, Haoqi, Tom. [6][7][9][20][21][24][25]

### 3. Instrument-panel minimalism

**Idea:** Combine Max Milkin’s restraint and Dennis Snellenberg’s metadata clarity with Arthur Engel’s atmospheric depth. Use a compact typographic system, numbered sections, one hero visualization per project, and motion only when state or meaning changes.

**Applications:**
- A dark lab palette for signal/memory work, or a light editorial palette for tasveer and Life-Os.
- Persistent labels for project, role, year, stack, evidence type, and live/repository links.
- A visible motion/audio control and a complete lite route.
- A small performance budget with measured evidence before using words such as “fast” or “performance-first.”

**Guardrail:** Do not confuse visual minimalism with missing context. The interface should be quiet; the evidence should remain dense and precise.

**References:** Max, Dennis, Arthur. [6][10][26][27]

## Accessibility and performance watchlist

These are shallow observations for the next researcher, not audit findings.

- **Always provide a direct index and text route.** Spatial and scroll-driven navigation should enhance discovery, not gate access.
- **Treat reduced motion, audio, and quality controls as core features.** Bruno and Haoqi expose useful controls; several other references do not show an obvious motion toggle.
- **Make the lite route content-complete.** Arthur’s Lite Version is a strong pattern, but it needs verification across all case studies and input modes.
- **Use semantic text for technical evidence.** Plots and 3D scenes need captions, text summaries, and non-color encodings for states.
- **Measure performance claims.** Asset weight, GPU load, font loading, and interaction responsiveness should be tested on real devices before using “fast” or “performance-first” language.
- **Avoid desktop-only gates.** Robin Payot’s current gate is the clearest anti-pattern for a public engineering portfolio.

## Uncertainties and exclusions

- Award pages verify the submitted version, not necessarily the current live design. Dennis and Tom show clear visual changes between award-era screenshots and current pages.
- The old `brunosimon.com` domain currently displays a registrar parking page. The verified current portfolio is `bruno-simon.com`. The 2019 CSSDA award for the earlier portfolio was not conflated with the 2025/2026 version.
- The FWA’s official archive is read-only and removes outbound links. Award date, points, credits, and description were verified there; live URLs were verified separately on the portfolio sites.
- Godly’s redirect to Recent.design prevented verification of a specific Godly entry for any selected reference. No Godly award or gallery claim is made.
- Robin Payot’s main project sequence could not be fully explored in the mobile research browser because the site blocks that viewport. Its intro, scene structure, and metadata were verified; deeper case order remains uncertain.
- Max Milkin’s public honors list is self-reported. Only the Awwwards and CSSDA recognitions listed in this report were independently verified.
- Typography was checked through computed styles and the sites’ own technical notes. Font files and licenses were not audited.
- Accessibility and performance comments are based on visible structure and controls only. No axe, Lighthouse, screen-reader, network-throttling, or bundle-size audit was performed.
- Leelansh’s project facts come from the existing evidence audit and public repository descriptions. This stream did not re-audit source code, tests, releases, or hardware measurements. [1][2]

## Numbered sources

All sources accessed **2026-11-25**.

1. **Internal GitHub evidence audit:** `/Users/leelanshkharbanda/portfolio_final/outputs/github-evidence.md`
2. **Leelansh Kharbanda project repositories:**
   - https://github.com/leelanshkharbanda/Chronos-DSP
   - https://github.com/leelanshkharbanda/Modulation-Studio
   - https://github.com/leelanshkharbanda/HPC_Boost
   - https://github.com/leelanshkharbanda/MoE-Memory-Wall-CA-Project
   - https://github.com/leelanshkharbanda/Life-Os
   - https://github.com/leelanshkharbanda/RISC-V-Assembler-and-Simulator
   - https://github.com/leelanshkharbanda/tasveer
3. **Awwwards — Bruno's Portfolio, SOTD 2026-01-21:** https://www.awwwards.com/sites/brunos-portfolio
4. **The FWA archive — Bruno's Portfolio, FOTD 2025-12-13:** https://legacy.thefwa.com/cases/brunos-portfolio
5. **Bruno Simon — live portfolio:** https://bruno-simon.com/
6. **CSS Design Awards — Arthur Engel Portfolio, WOTD 2026-11-04:** https://www.cssdesignawards.com/sites/arthur-engel/50316/
7. **The FWA archive — Arthur Engel Portfolio, FOTD 2026-09-30:** https://legacy.thefwa.com/cases/arthur-engel-portfolio
8. **Arthur Engel — live portfolio:** https://aengel.io/
9. **Arthur Engel — PRESTI.AI case study:** https://aengel.io/projects/presti
10. **Awwwards — Dennis Snellenberg, SOTD 2022-04-04:** https://www.awwwards.com/sites/dennis-snellenberg
11. **Dennis Snellenberg — live portfolio:** https://dennissnellenberg.com/
12. **Dennis Snellenberg — work index:** https://dennissnellenberg.com/work
13. **Dennis Snellenberg — TWICE case study:** https://dennissnellenberg.com/work/twice
14. **Awwwards — Robin Payot Portfolio 2022, SOTD 2022-04-01:** https://www.awwwards.com/sites/robin-payot-portfolio-2022
15. **Robin Payot — live portfolio:** https://robinpayot.com/
16. **Awwwards — Tom Sears Personal Portfolio, SOTD 2022-05-15:** https://www.awwwards.com/sites/tom-sears-personal-portfolio
17. **The FWA archive — Tom Sears Personal Portfolio, FOTD 2022-05-09:** https://legacy.thefwa.com/cases/tom-sears-personal-portfolio
18. **Tom Sears — live portfolio:** https://www.tomsears.me/
19. **Tom Sears — projects index:** https://www.tomsears.me/projects
20. **Tom Sears — Squarespace Brand case study:** https://www.tomsears.me/project/squarespace-brand
21. **Awwwards — HAOQI.DESIGN, SOTD 2026-08-14:** https://www.awwwards.com/sites/haoqi-design
22. **CSS Design Awards — HAOQI.DESIGN, WOTD 2026-08-12:** https://www.cssdesignawards.com/sites/haoqi-design/49819/
23. **Haoqi Wen — live portfolio:** https://haoqi.design/
24. **Haoqi Wen — Reunimos case study:** https://haoqi.design/reunimos
25. **Haoqi Wen — Wasm design utils technical article:** https://haoqi.design/wasm_design_utils
26. **Awwwards — Max Milkin Portfolio, SOTD 2025-12-13:** https://www.awwwards.com/sites/max-milkin-portfolio
27. **CSS Design Awards — Max Milkin, Special Kudos 2025-11-11:** https://www.cssdesignawards.com/sites/max-milkin/48371/
28. **Max Milkin — live portfolio:** https://www.maxmilkin.com/
29. **Max Milkin — Yevgeniya Grab case study:** https://www.maxmilkin.com/yevgeniyagrab
30. **Godly — current redirect entry point:** https://godly.website/
31. **Recent.design — Godly redirect destination:** http://recent.design/?ref=godly
