# Index Object — source-safe content spec (Wayfinder ticket #21)

**Branch:** `research/index-object-content` · **Checked:** 2026-11-26 · **Status:** research only, no site files changed.

**Provenance / hard rule.** All project facts below come from the extracted *text* exports in `.scratch/info-text/*.txt`, `info/github-evidence.md`, `info/public-resume-facts.md`, `research/github-identity.md`, and the current variant labels in `variants/index-object/{BRIEF.md,index.html}`. The supplied `info/` HTML is **content-only**: it is not copied, linked, served, or committed here, and none of its markup or page URLs are to be published. Visuals described below are *descriptions for new original diagrams*, not assets to reuse (`.scratch/info-text/chronos-dsp.txt` L226, L251; `info/github-evidence.md` L34–36).

---

## 1. Exact five-block page template (all eight projects)

The source shelf states the contract: "Each project starts with a question, then shows the moving parts, the source, and the limits," with "a direct route to its notes and evidence" (`.scratch/info-text/info.txt` L11). Render **these five blocks, in this order, on every one of the eight project pages**:

| # | Block | Required content | Source |
|---|---|---|---|
| 1 | **Question** | One verbatim "How can …?" question from the project record. Nothing else in this block. | `info.txt` L31, L83, L133, L177, L229, L275, L296, L318 |
| 2 | **Mechanism (moving parts)** | One-paragraph architecture description + the original diagram and its caption + the credit/summary paragraph. No metrics beyond those cleared in Block 3. | `info.txt` L32–34, L84–86, L134–136, L178–180, L230–232, L276–278, L297–299, L319–321; mechanism text in §5 |
| 3 | **Evidence & source** | Evidence class, the claim/value ledger row(s) with conditions, checked date, and the Source / notes links. Any number appears only here and only with its configuration intact. | `info.txt` L17–20, L77–80, L127–130, L171–174, L223–226, L269–272, L290–293, L312–315; `github-evidence.md` L13–20 |
| 4 | **Guardrail (limits)** | The project's verbatim guardrail line plus its boundary conditions. No success, adoption, or accuracy language may leak out of this block. | `info.txt` L39–40, L91–92, L141–142, L185–186, L237–238, L282–283, L304–305, L326–327 |
| 5 | **Route (links & label)** | Exact landing label (§7), `Open project notes →`, `Source ↗ (opens in a new tab)`, and `Try live demo ↗` only for P-03 and P-08. Checked date repeated here. | `info.txt` L41–45, L93–97, L143–150, L187–191, L239–243, L284–288, L306–310, L328–335 |

**Depth rule — same blocks, different depth.** The five **deep dives** (P-01 Chronos-DSP, P-02 Life OS, P-03 Modulation Studio, P-04 HPC-Boost v2, P-05 MoE Memory Wall) fill every block fully: complete mechanism paragraph, full original schematic with labelled stages, full evidence ledger with all rows and method/conditions, detailed boundary conditions, and a next-step note from the case study (`info.txt` L9, L21–24; `chronos-dsp.txt` L190–196, L227–245; `life-os.txt` L88–94, L113–119; `modulation-studio.txt` L85–89, L116–130; `hpc-boost.txt` L88–91, L113–120; `moe-memory-wall.txt` L87–90, L117–124). The three **archive records** (P-06 RISC-V, P-07 University ERP, P-08 Tasveer) keep the same five block headings but are compact: one summary paragraph, one evidence row, short limits, and a smaller text diagram — P-07 and P-08 use **no custom visual at all** (`info.txt` L265–267; `university-erp.txt` L50; `tasveer.txt` L27, L52). Archive does **not** mean uncredited: the shared-work boundary stays explicit (`info.txt` L267).

---

## 2. One consistent verified credit label per project

Use exactly one credit label per project, identical on landing and page (§7). Team sizes appear **only** where the local résumé states them; unverified teams get no number.

| ID | Project | Credit label (verbatim) | Verification / qualification |
|---|---|---|---|
| P-01 | Chronos-DSP | **Personal project** | Personal build; "team size not stated" — no headcount (`info.txt` L27; `github-evidence.md` L13) |
| P-02 | Life OS | **Team project · 3 people** | Résumé line 81 (`public-resume-facts.md` L20; `info.txt` L79; `life-os.txt` L30) |
| P-03 | Modulation Studio | **Team project · 2 people** | Résumé line 64 (`public-resume-facts.md` L17; `info.txt` L128; `modulation-studio.txt` L91–92) |
| P-04 | HPC-Boost v2 | **Research record · v2 team size unverified** | The résumé's two-person entry (line 70) is **version-unspecified**; the imported earlier report names different authors. The two-person label must not be applied to v2 or to the whole repository (`public-resume-facts.md` L18, L30; `github-evidence.md` L15; `hpc-boost.txt` L34, L93–95) |
| P-05 | MoE Memory Wall | **Group coursework** | "Group 24" is a group identifier, not a verified headcount; no team size stated (`info.txt` L225; `github-evidence.md` L16; `moe-memory-wall.txt` L31–32, L92) |
| P-06 | RISC-V Assembler and Simulator | **Team project · 4 people** | Résumé line 76 (`public-resume-facts.md` L19; `info.txt` L271; `riscv-simulator.txt` L25) |
| P-07 | University ERP System | **Team project · 2 people** | Résumé line 87, AP_Project (`public-resume-facts.md` L21; `info.txt` L292; `university-erp.txt` L27, L46) |
| P-08 | Tasveer | **Team project** | Team size not verified; role list is not a headcount (`info.txt` L314; `tasveer.txt` L27–28, L46, L58) |

Contribution wording is shared-team throughout: no collaborator names, no per-module ownership claims (`life-os.txt` L30, L95–97; `modulation-studio.txt` L91–92; `riscv-simulator.txt` L25, L76; `university-erp.txt` L46; `tasveer.txt` L46). "Engineer" is only a description of practice, never a title (`variants/index-object/BRIEF.md` L13–14; `research/github-identity.md` L27).

---

## 3. Source URLs, live-demo URLs, and HTTP-200 check

Checked now with `curl -L -o /dev/null -w '%{http_code}'` on **2026-11-26**. **Publish must recheck every URL — availability changes; a 200 is not a freshness, adoption, or reliability claim.** Source URLs for P-01–P-06, P-08 are recorded in `research/github-identity.md` L74, L142, L128, L104, L88, L116, L34, L41; P-07 in `info/index.html` / `info/university-erp/index.html` hrefs (URL only; HTML not reused).

| ID | Source URL | Status 2026-11-26 | Live demo | Status 2026-11-26 |
|---|---|---|---|---|
| P-01 Chronos-DSP | https://github.com/leelanshkharbanda/Chronos-DSP | **200** | — | — (simulator, no live demo) |
| P-02 Life OS | https://github.com/leelanshkharbanda/Life-Os | **200** | — | — (unreleased; no demo link, `life-os.txt` L104) |
| P-03 Modulation Studio | https://github.com/leelanshkharbanda/Modulation-Studio | **200** | https://leelanshkharbanda.github.io/Modulation-Studio/ | **200** |
| P-04 HPC-Boost v2 | https://github.com/leelanshkharbanda/HPC_Boost | **200** | — | — |
| P-05 MoE Memory Wall | https://github.com/leelanshkharbanda/MoE-Memory-Wall-CA-Project | **200** | — | — |
| P-06 RISC-V | https://github.com/leelanshkharbanda/RISC-V-Assembler-and-Simulator | **200** | — | — |
| P-07 University ERP | https://github.com/leelanshkharbanda/AP_Project | **200** | — | — |
| P-08 Tasveer | https://github.com/leelanshkharbanda/tasveer | **200** | https://leelanshkharbanda.github.io/tasveer/ | **200** |

**200-check caveats (must be carried into copy):** both demos returned 200 on 2026-11-25 in the source record too (`modulation-studio.txt` L32, L62–64, L104–105; `tasveer.txt` L38, L48–52). For Modulation Studio, the latest Pages workflow **failed at artifact lookup**, so a 200 must never be described as a successful fresh deployment (`modulation-studio.txt` L110, L114, L128; `info.txt` L132). For Tasveer, availability is artifact evidence only — no audience, adoption, reliability, or editorial-impact metric follows (`tasveer.txt` L40, L54, L59). Source repos with stale content (e.g., HPC_Boost's stock GitLab README, `research/github-identity.md` L109–111) are not thereby "built on GitHub" showcases.

---

## 4. Guardrails / non-claims, per project

Verbatim guardrails from `.scratch/info-text/info.txt`, with the boundary conditions from each case study:

- **P-01 Chronos-DSP:** "Geometric propagation and material losses are illustrative; the model is not calibrated against RF measurements" (`info.txt` L39–40). No hard-real-time guarantee, no live/over-the-air radio, no external deployment; named-scene store is capped/ephemeral and the API has documented auth/rate-limit gaps (`chronos-dsp.txt` L29, L190, L226, L245–251).
- **P-02 Life OS:** "No released build or sustained user study is evidenced, so usability, recommendation quality, and productivity effects remain unknown" (`info.txt` L91–92). Do not repeat "zero cloud dependency": model provisioning is required and exercise lookup / calendar sync are optional integrations, so **not fully offline** (`public-resume-facts.md` L32; `life-os.txt` L88, L54).
- **P-03 Modulation Studio:** "All channel effects and recovered signals are software simulations; no over-the-air or hardware measurement is claimed" (`info.txt` L141–142). No learning outcome, adoption, cross-browser correctness, or fresh-deployment claim; adaptive receiver is a bounded simulation aid, not a production synchronizer (`modulation-studio.txt` L84, L113–115, L127–130).
- **P-04 HPC-Boost v2:** "The corpus contains 22 malware binaries from only Tsunami and Kaiji families, so the negative conditioning result is corpus-specific" (`info.txt` L185–186). Not a deployed detector; selected subset varied across folds; one detector family and one operating point; imported earlier report is a distinct history (`hpc-boost.txt` L112, L117–120). Corpus figures, when quoted, keep method: 45 binaries / 225 runs, F1 0.889, balanced accuracy 0.886, FPR 0.174, and +0.0045 oracle headroom (`hpc-boost.txt` L74–83, L105–108).
- **P-05 MoE Memory Wall:** "Both simulators are analytical roofline models without DRAM timing, so latency and energy are modeled rather than observed on a GPU" (`info.txt` L237–238). No measured Mixtral/GPU speedup, no production inference, no sole authorship, no claim that the project built LLMSimulator; quote 1.27× only at C=64 on TinyMoE-prose vs on-demand LRU (`moe-memory-wall.txt` L31, L92, L117, L124; `research/github-identity.md` L160).
- **P-06 RISC-V:** "The implementation supports an RV32I subset, not the complete RV32I base integer instruction set" (`info.txt` L282–283). 64 KB memory, no privilege levels/floating point/compressed instructions; not cycle-accurate, so no timing or hardware-efficiency claim (`riscv-simulator.txt` L84, L87–89).
- **P-07 University ERP:** "The repository is an academic desktop project and provides no evidence of institutional adoption or business impact" (`info.txt` L304–305). Seeded accounts are fixtures, not production security; no load, reliability, or production-readiness result; no sole authorship (`university-erp.txt` L27, L46, L52, L56–57).
- **P-08 Tasveer:** "Repository ownership does not establish copyright permission or photographer consent for the site's media" (`info.txt` L326–327). Team size unverified; no audience/adoption/reliability metric from a 200; society site, not a personal product or founding claim (`tasveer.txt` L27–28, L54, L57–59; `research/github-identity.md` L165).

---

## 5. Mechanism and diagram description, per project

Descriptions are for **newly drawn original diagrams**; no repository screenshot or society media is reused (`chronos-dsp.txt` L226; `info/github-evidence.md` L34–36).

- **P-01 Chronos-DSP — mechanism:** geometric path construction is separated from deterministic signal rendering: LiveView drives a 3D scene of TX/RX and walls; candidate paths (LOS, image-source reflection, transmission) feed a QPSK chain with fractional-delay interpolation, Doppler phase rotation and seeded complex AWGN; a `render_rx_block/5` Rust NIF runs on a dirty CPU scheduler with artifact-magic checks and a deterministic pure-Elixir reference fallback that mirrors sample order, interpolation, rotation and RNG; a headless JSON/CSV API exposes the same outputs (`chronos-dsp.txt` L190–196, L241). **Diagram:** four-stage signal-path schematic — `TS-01 SOURCE (QPSK + seed) → TS-02 CHANNEL (paths + impairment) → TS-03 RECEIVER (decisions + phase) → TS-04 OUTPUT (IQ + BER)`, over a bounded scene with TX, wall A, wall B, RX and candidate paths, stamped "MODEL BOUNDARY / NOT A RADIO CAPTURE"; all values illustrative (`chronos-dsp.txt` L30–56; `info.txt` L46–48).
- **P-02 Life OS — mechanism:** React 19 UI calls typed Tauri IPC commands into Rust/SQLx over local SQLite; ONNX Runtime produces local embeddings stored in LanceDB; a linear contextual bandit (UCB path, Thompson-sampling alternative) returns expected reward, uncertainty, confidence category, feature contributions, similar experiences and a human-readable explanation (`life-os.txt` L88–94, L106–107). **Diagram:** desktop-boundary schematic `REACT UI → TAURI IPC → RUST COMMANDS → SQLITE / ONNX / LANCEDB → CONTEXT + BANDIT`, with a separate dashed `SETUP / NETWORK` region (required model provisioning; optional exercise lookup and calendar sync) labelled "NOT FULLY OFFLINE" (`life-os.txt` L31–55).
- **P-03 Modulation Studio — mechanism:** baseband message plus carrier parameters feed the selected modulator; a software channel applies adjustable SNR, fading and receiver offsets; digital schemes integrate over symbol intervals, decide and compare against retained bits to produce BER/SER, analog schemes report correlation; an optional bounded adaptive receiver estimates phase/frequency/timing; signal core is separated from UI for testing (`modulation-studio.txt` L85–89). **Diagram:** three-panel QPSK constellation schematic `SOURCE / QPSK (fixed seed, 32 pts) → CHANNEL / IMPAIRED (fixed seed) → RECEIVER / DECISIONS (fixed seed)`, captioned "CONCEPTUAL SIGNAL VIEWS / NOT CHRONOS-DSP RECORDED OUTPUT" (`info.txt` L151–169; `modulation-studio.txt` L34–49).
- **P-04 HPC-Boost v2 — mechanism:** 13 guest PMU events cycled in separate-boot groups of ≤4 anchored on cycles; six marginal statistics per event give 78 features (24 per four-event subset); all C(13,4)=715 subsets trained an XGBoost detector (100 trees, depth 4); inner CV selected the subset and tuned threshold at TPR 0.95 while five outer folds held out whole binaries; a routing ladder compared one global subset with per-family/per-binary/per-run oracles (`hpc-boost.txt` L88–91). **Diagram:** "V2 / FIXED-SUBSET EXPERIMENT LEDGER" — `01 PMU TRACES → 02 EVENT GROUPS (≤4) → 03 SUBSETS (training only) → 04 FIXED SET (one selector) → 05 HELD OUT (whole binaries)`, with "NO RUN-LEVEL LEAKAGE" and a per-binary oracle branch ending at the "NEGATIVE CONDITIONING RESULT / do not add a learned routing layer" gate (`info.txt` L192–221; `hpc-boost.txt` L35–62).
- **P-05 MoE Memory Wall — mechanism:** LLMSimulator had no learned router, so the group supplied routing traces: recorded TinyMoE (Mixtral topology, trained on Tiny Shakespeare and CPython code), a Mixtral-calibrated generator fitted to published temporal-locality statistics, and uniform routing as a null; causal training-free predictors (calibrated speculative gate + history fallback) fed a Python discrete-event timeline with per-layer LRU HBM cache, one copy link, demand priority, next-layer prefetch, guided replacement, preemptible copies and feedback throttling; prefetching never changed which experts were routed (`moe-memory-wall.txt` L87–90). **Diagram:** memory-grid schematic `OFF-CHIP EXPERTS → NEXT-LAYER PREDICTOR → PREFETCH (one copy link) → BOUNDED HBM CACHE (capacity C, LRU + predicted copies) → DECODE / STALL`, with "BATCH-1 DECODE BOUNDARY" and "TRAFFIC + LATENCY + ENERGY ARE MODEL OUTPUTS" — not measured GPU performance (`info.txt` L244–264; `moe-memory-wall.txt` L33–51).
- **P-06 RISC-V — mechanism:** a two-pass Python assembler resolves labels and encodes supported R/I/S/B/J types; the functional simulator models 32 registers, byte-addressed 64 KB memory, a PC and data-memory access, producing a per-instruction trace and memory dump (`riscv-simulator.txt` L74, L78–82). **Diagram:** functional-trace schematic — assembly (`addi/addi/add/sw`) → labels→addresses → instruction fields (e.g. `imm | rs1 | funct3 | rd | opcode`) → `ENCODING → FETCH → DECODE → EXECUTE` → a PC/instruction/registers/memory table, stamped "RV32I SUBSET / FUNCTIONAL TRACE / NOT CYCLE-ACCURATE" (`info.txt` not applicable for this diagram; `riscv-simulator.txt` L27–56).
- **P-07 University ERP — mechanism:** multi-tier Java Swing desktop client, Gradle build, and MySQL storing authentication and ERP data in **separate schemas**; documented administrator, instructor and student roles with AuthService, AccessControlService and role-specific services (`university-erp.txt` L27, L40, L44–48). **Diagram:** none — text-only archive entry; "No custom visual is used for this entry" (`university-erp.txt` L50). Do not invent a UI mockup or adopt repository screenshots.
- **P-08 Tasveer — mechanism:** a static HTML/CSS/JavaScript editorial site with shared content data and self-hosted motion libraries; THE ROLL presents event beats as photo essays, THE CREW organizes the people behind coverage; the page describes browsing stories and roles, not a database-backed publishing product (`tasveer.txt` L44). **Diagram:** none — deliberately text-only, links out, embeds no society media (`tasveer.txt` L27, L52).

---

## 6. Banned-claim scan

Scan of the copy specified above (template strings, credit labels, guardrails, mechanism text, landing labels, Tasveer note) against the banned categories:

| Banned category | Result | Governing sources |
|---|---|---|
| Employer / job title / years of experience | **Absent.** No employer, title or tenure string appears. "Engineer" is practice-only; "Event Lead" appears only as a Tasveer society coordination role, not a job title. | `research/github-identity.md` L43, L156; `info/github-evidence.md` L43; `variants/index-object/BRIEF.md` L14, L34; `info/public-resume-facts.md` L37 |
| Graduation / completed degree / GPA / "CS" | **Absent.** Education appears as present-tense "ECE undergraduate at IIIT Delhi" only in the identity line, never as alumnus/graduation year; no CGPA or school results. | `variants/index-object/BRIEF.md` L18, L34; `research/github-identity.md` L157; `info/public-resume-facts.md` L11, L39–41; `info/github-evidence.md` L7 |
| GPU measurement / real-chip speedup | **Absent.** MoE numbers are labelled simulation outputs only; no measured H100/A100 result. The 1.27× is quoted only as "reported by the project's simulation" at C=64 on TinyMoE-prose vs on-demand LRU. | `info.txt` L232, L237–238; `moe-memory-wall.txt` L31, L104–107, L117, L124; `research/github-identity.md` L160; `variants/index-object/BRIEF.md` L29, L34 |
| Live radio / over-the-air / hardware measurement / calibrated RF | **Absent.** Chronos and Modulation Studio are explicitly simulators; no radio capture, no RF calibration, no production synchronizer. | `variants/index-object/BRIEF.md` L24, L34; `research/github-identity.md` L161; `chronos-dsp.txt` L29, L251; `modulation-studio.txt` L113, L127 |
| Forks as original work | **Absent.** AionUi, ecapture, hive, posthog are excluded from all eight records; no fork appears as evidence. | `info/github-evidence.md` L22–24; `research/github-identity.md` L45–50, L159; `variants/index-object/BRIEF.md` L34 |
| Hard scheme counts / invented metrics / adoption or user counts | **Absent.** Named modulation schemes only; no "8 schemes" hard count; no star counts, user counts, or deployment claims. | `variants/index-object/BRIEF.md` L26–27, L34; `research/github-identity.md` L133, L163, L166; `info.txt` L91–92, L305 |

Also excluded by construction: sole-authorship language, collaborator names, employer-backed tool claims, "zero cloud dependency," and repository screenshots/media reuse (§2, §4).

---

## 7. Exact landing label text (landing and pages must agree)

Render each of these strings **verbatim and identically** as (a) the landing card label and (b) the project page header label. Do not paraphrase, rename, or drop a credit qualifier. Titles are from `info.txt` L30, L82, L131, L176, L228, L274, L295, L317; credit suffixes are the verified labels in §2.

```
P-01 · Chronos-DSP: from geometry to simulated IQ — Personal project
P-02 · Life OS: local records, adaptive recommendations — Team project · 3 people
P-03 · Modulation Studio: a browser signal lab — Team project · 2 people
P-04 · HPC-Boost v2: Choosing Four Counters, Then Saying No — Research record · v2 team size unverified
P-05 · MoE Memory Wall: Prefetching Experts Under an HBM Budget — Group coursework
P-06 · RISC-V Assembler and Simulator — Team project · 4 people
P-07 · University ERP System — Team project · 2 people
P-08 · Tasveer: A Campus Media Archive — Team project
```

Shelf-level labels must also match exactly: **"The project shelf · 5 deep dives + 3 archive records"** (`info.txt` L9), **"8 PROJECT RECORDS"** (L18), **"DEEP DIVES"** (L21) for P-01–P-05, and **"SIDE DRAWER" / "Earlier work, still on the bench."** (L265–267) for P-06–P-08. P-04's flag is "Research", P-03 and P-08's flag is "Live demo", P-01's flag is "Released", P-02's is "Prototype", P-05's is "Coursework", P-06/P-07's is "Archive" (`info.txt` L26–27, L77–80, L126–129, L171–174, L223–226, L269–272, L290–293, L312–315). These flags are evidence/format descriptors, not job titles. The current variant landing uses shorter labels ("Modulation Studio", "MoE Memory Wall", "HPC_Boost", "Life OS", "Tasveer"; `variants/index-object/index.html` L103, L145, L196, L201, L206) — adopt the §7 strings above so landing and the eight pages agree.

---

## 8. Tasveer text-only media-rights note

Use this exact note on P-08 (no embedded images, no reused photography):

> **Text-only entry.** This page describes the work and links out to the live editorial site; it reuses no photography. Repository ownership does not establish copyright permission or photographer consent for the site's images, portraits, and archive material. Team size is unverified, and the credited roles are not a headcount. No audience, adoption, editorial-impact, accessibility, or reliability metric is claimed from live availability alone. Before any media is reused or this entry receives a deeper visual treatment, the credit ledger and permissions must be confirmed with the people responsible.

Sources: `tasveer.txt` L27–28, L52, L54, L57–61; `info.txt` L326–327; `info/github-evidence.md` L20, L36; `research/github-identity.md` L165.

---

## Verification performed

Every URL in §3 was requested live on 2026-11-26 and returned HTTP 200; no server was started, no `info/` HTML copied/linked/served, and no shared file outside this worktree modified. All factual claims above are cited to the extracted text files, the two evidence markdown files, `research/github-identity.md`, or the current variant files. **Publish must recheck every URL and re-confirm the two demo statuses before release.**
