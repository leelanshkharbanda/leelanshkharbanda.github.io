# GitHub profile voice research

**Access date:** 2026-11-26
**Method:** Read-only review of first-party GitHub profile READMEs, profile pages, and REST/GraphQL metadata. Web search was used only to discover candidates. Follower and star counts are point-in-time popularity signals, not quality scores. Short quotations below are evidence for pattern analysis, not wording to reuse in the portfolio.

## Core finding

The strongest transferable pattern is **artifact + specific function or constraint + honest status + direct link**. The best profiles make the work easy to inspect without asking the reader to admire it. Useful status words include *prototype*, *subset*, *simulation*, *not yet integrated*, *paused*, and *archived*; they are more informative than “passionate,” “cutting-edge,” or “production-ready.”

Six profiles below contain substantive project presentation. Karpathy is included as a high-popularity minimalist contrast, not as a complete template.

## Examples

### 1. Jatin Chowdhury — audio DSP and real-time systems

- **Profile:** https://github.com/jatinchowdhury18
  **README:** https://github.com/jatinchowdhury18/jatinchowdhury18/blob/main/README.md
  **Accessed:** 2026-11-26
- **Popularity:** 1,019 followers; [AnalogTapeModel](https://github.com/jatinchowdhury18/AnalogTapeModel) 1,466 stars; [RTNeural](https://github.com/jatinchowdhury18/RTNeural) 856 stars.
- **Pattern:** Opens with “Things I’m doing,” then groups work into libraries/tools, plugins, research/teaching, and music. Each named project receives a short function-level description; portfolio and research pages are secondary links. Status is conveyed through the current-work framing rather than achievement claims.
- **Tone:** “Developing libraries and tools for audio developers”; “Making music!”
- **Fit:** Strong for Chronos-DSP and Modulation-Studio: name the artifact, say what it enables, then link. The statistics badges and long affiliation block are optional and add little technical evidence.

### 2. cnlohr — embedded hardware, DSP, and RISC-V

- **Profile:** https://github.com/cnlohr
  **README:** https://github.com/cnlohr/cnlohr/blob/master/README.md
  **Accessed:** 2026-11-26
- **Popularity:** 3,690 followers; [mini-rv32ima](https://github.com/cnlohr/mini-rv32ima) 2,207 stars; [channel3](https://github.com/cnlohr/channel3) 1,576 stars.
- **Pattern:** A taxonomy of single-file libraries, tools, demos, documentation, and graphics experiments. Descriptions emphasize implementation constraints such as code size, target processor, or missing SDK. The inventory does not consistently distinguish maintained, paused, and archived work.
- **Tone:** “without the bloat”; “experiments + tools”
- **Fit:** Excellent for hardware-counter telemetry and signal projects where footprint, target platform, and demonstrated behavior matter. Borrow the constraint-first descriptions, not the enormous catalog, Discord invitation, Patreon section, or repeated superlatives. A student should curate four to six projects and label status.

### 3. Matt Godbolt — compilers, architecture, and emulation

- **Profile:** https://github.com/mattgodbolt
  **README:** https://github.com/mattgodbolt/mattgodbolt/blob/main/README.md
  **Accessed:** 2026-11-26
- **Popularity:** 4,261 followers; [Compiler Explorer](https://github.com/compiler-explorer/compiler-explorer) 19,203 stars; [jsbeeb](https://github.com/mattgodbolt/jsbeeb) 398 stars.
- **Pattern:** A brief statement of interests leads directly to two recognizable projects, with live destinations and pinned repository cards. It avoids feature lists and sales language. The README does not state current maintenance status.
- **Tone:** “I love old computer hardware”; “understanding modern computers at a very low level”
- **Fit:** A good model for RISC-V and architecture work: establish the technical curiosity, then foreground one or two inspectable artifacts. Add explicit status, which this profile omits. The language/statistics cards are not necessary.

### 4. Dan Gisselquist / ZipCPU — CPU architecture and FPGA systems

- **Profile:** https://github.com/ZipCPU
  **README:** https://github.com/ZipCPU/zipcpu/blob/master/README.md
  **Accessed:** 2026-11-26
- **Popularity:** 1,875 followers; [ZipCPU](https://github.com/ZipCPU/zipcpu) 1,598 stars; [dblclockfft](https://github.com/ZipCPU/dblclockfft) 270 stars.
- **Pattern:** The profile README is a full engineering brief: definition, design goals, architectural constraints, getting-started route, current status, and “Not yet integrated” gaps. It is highly specific about what the implementation does and does not include.
- **Tone:** “small, light-weight, RISC CPU”; “Not yet integrated”
- **Fit:** The best status-and-boundary example for RISC-V, HPC_Boost, and MoE-Memory-Wall. Use concise versions of these boundaries in the profile and link to the detailed README. The deep build instructions and commercial-licensing section are too heavy for a personal profile.

### 5. Herb Caudill — local-first software

- **Profile:** https://github.com/HerbCaudill
  **README:** https://github.com/HerbCaudill/HerbCaudill/blob/main/README.md
  **Accessed:** 2026-11-26
- **Popularity:** Niche rather than mass-audience recognition: 123 followers; [local-first/auth](https://github.com/local-first-web/auth) 327 stars; [local-first/state](https://github.com/local-first-web/state) 194 stars; [local-first/relay](https://github.com/local-first-web/relay) 118 stars.
- **Pattern:** Four software values—change, offline, control, integration—lead into three concrete projects, each with a one-sentence mechanism. **Status warning:** the README says “Recently,” but GitHub GraphQL marks all three repositories archived on 2026-10-08. The founder/CEO biography is much longer than the project evidence.
- **Tone:** “let me work offline”; “give me control over my stuff”
- **Fit:** Strong framing for Life OS when “local-first” means core data and useful operation remain local, with optional network integrations. Borrow the user-visible properties and concrete mechanisms. Avoid “superpowers,” founder credentials, and stale current-work language.

### 6. Simon Willison — AI tools, data tooling, and local models

- **Profile:** https://github.com/simonw
  **README:** https://github.com/simonw/simonw/blob/main/README.md
  **Accessed:** 2026-11-26
- **Popularity:** 17,982 followers; [LLM](https://github.com/simonw/llm) 12,830 stars; [Datasette](https://github.com/simonw/datasette) 11,668 stars; [sqlite-utils](https://github.com/simonw/sqlite-utils) 2,237 stars.
- **Pattern:** One current-work sentence, followed by an automated three-column feed of recent releases, blog posts, and TILs. Recency and status are visible without a promotional paragraph. The feed requires maintenance infrastructure and produces far more volume than a student needs.
- **Tone:** “Currently working on”; “Recent releases”
- **Fit:** Useful for the AI side of Life OS: a short “Current work” line plus three dated release, demo, or report links. Do not replicate the dashboard. Also keep local-first distinct from merely running a model locally; local inference alone does not establish offline usefulness or data ownership.

### 7. Andrej Karpathy — neural networks and local AI

- **Profile:** https://github.com/karpathy
  **README:** https://github.com/karpathy/karpathy/blob/main/README.md
  **Accessed:** 2026-11-26
- **Popularity:** 234,261 followers; [nanoGPT](https://github.com/karpathy/nanoGPT) 65,087 stars; [llama2.c](https://github.com/karpathy/llama2.c) 20,323 stars.
- **Pattern:** The README is one sentence. It provides no in-README project descriptions, status, or project links; the pinned repositories—nanoGPT, nanochat, llm.c, llama2.c, and micrograd—carry the project evidence.
- **Tone:** “I like deep neural nets.”
- **Fit:** A useful lesson in restraint and avoidance of self-congratulation, but not a sufficient model for an unknown ECE student. Existing reputation makes the sparse approach work. Use a one-line introduction, then add specific project bullets with function, status, and links.

## Recommended adaptation for this portfolio

1. **Intro:** one sentence naming ECE interests; no mission statement or adjective stack.
2. **Selected work:** four to six entries using `Project — artifact type that does X. Current status or limit. Repo · demo/report`.
3. **Signal projects:** follow Jatin’s function-first descriptions and cnlohr’s implementation constraints.
4. **Architecture/hardware projects:** follow ZipCPU’s explicit boundaries and Matt Godbolt’s focus on a few inspectable flagships.
5. **Life OS:** follow Herb Caudill’s user-visible local-first properties and Simon Willison’s dated activity cues, while stating prototype/team status and avoiding stale or promotional claims.
6. **Leave out:** giant inventories, badge walls, founder/CEO biographies, commercial sections, donation links, and unsupported status labels.

The target voice is calm and testable: **what it is, what it does, what state it is in, and where to inspect it.**
