# GitHub identity research — leelanshkharbanda

Research basis: the public GitHub profile README at
<https://github.com/leelanshkharbanda/leelanshkharbanda>, the GitHub REST API
(`users/leelanshkharbanda`, `users/leelanshkharbanda/repos`), and the READMEs of
all non-fork repositories read on 2026-11-25. Every fact below is tied to a
repository URL. Nothing here is inferred from private data, job postings, or
third-party profiles.

## 1. Positioning statement

Leelansh Kharbanda presents himself, in his own profile README, as an ECE
undergraduate at IIIT Delhi working on signal processing, computer architecture,
hardware-counter telemetry, and local-first tools — a body of public work that
sits squarely at the software/hardware intersection rather than in a single
language or stack. His repositories pair the physical layer with the software
that observes it: a wireless channel simulator whose Elixir/Phoenix control
plane drives a Rust NIF DSP data plane, a computer-architecture study of expert
prefetching across the DRAM/HBM boundary in offloaded Mixtral-8x7B decoding, a
malware-detection project built on CPU hardware performance-counter subsets,
and a from-scratch RV32I assembler and simulator. Alongside those architecture
and telemetry projects he ships browser- and desktop-side tools — a DSP
modulation visualizer with FFT and constellation plots and a local-first Tauri
desktop app with on-device inference — so the portfolio's credible through-line
is "code that models, measures, or respects the machine underneath," not
"full-stack developer" or any formal job title. The framing below therefore
uses *engineer* as a description of practice, not a verified employment claim.

## 2. Verified fact sheet

| Fact | Verified value | Source |
|---|---|---|
| Name | Leelansh Kharbanda | GitHub profile `name` field and profile README heading — <https://github.com/leelanshkharbanda>, <https://github.com/leelanshkharbanda/leelanshkharbanda> |
| Education | "ECE undergrad at IIIT Delhi" — **self-described**, present tense | Profile README — <https://github.com/leelanshkharbanda/leelanshkharbanda>. Corroborating context only: the IIIT Delhi email domain and the Tasveer site being the media society of IIIT Delhi — <https://github.com/leelanshkharbanda/tasveer> |
| Contact email | `leelansh24319@iiitd.ac.in` | `mailto:` link in profile README — <https://github.com/leelanshkharbanda/leelanshkharbanda> |
| LinkedIn | <https://linkedin.com/in/leelansh-kharbanda> | Profile README — <https://github.com/leelanshkharbanda/leelanshkharbanda> |
| GitHub | <https://github.com/leelanshkharbanda> | GitHub API `html_url`; account created `2024-08-22` per API `created_at` |
| Profile README repo | <https://github.com/leelanshkharbanda/leelanshkharbanda> | GitHub API |
| Portfolio site repo | <https://github.com/leelanshkharbanda/leelanshkharbanda.github.io> | GitHub API |
| Public repo inventory | 17 public repos: **13 non-fork, 4 forks** | `users/leelanshkharbanda/repos` (`public_repos: 17`) |
| Published homepages | Modulation Studio demo <https://leelanshkharbanda.github.io/Modulation-Studio/>; Tasveer <https://leelanshkharbanda.github.io/tasveer/> | Repo `homepage` fields and READMEs — <https://github.com/leelanshkharbanda/Modulation-Studio>, <https://github.com/leelanshkharbanda/tasveer> |
| Additional activity | Coordinates Tasveer, IIIT Delhi's media society | Profile README — <https://github.com/leelanshkharbanda/leelanshkharbanda>; site README — <https://github.com/leelanshkharbanda/tasveer> |
| Job title / employer | **None found** in any public source consulted | Absence across profile README + all non-fork READMEs |

Repositories the GitHub API reports as **forks** (excluded from the shortlist):
`hive`, `posthog`, `AionUi`, `ecapture` —
<https://github.com/leelanshkharbanda/hive>,
<https://github.com/leelanshkharbanda/posthog>,
<https://github.com/leelanshkharbanda/AionUi>,
<https://github.com/leelanshkharbanda/ecapture>.

Repositories with no description in GitHub metadata and no substantive README
content surfaced (also excluded): `Tally`, `University_ERP_PROJECT`,
`University_Erp_System`, and the portfolio repo itself —
<https://github.com/leelanshkharbanda/Tally>,
<https://github.com/leelanshkharbanda/University_ERP_PROJECT>,
<https://github.com/leelanshkharbanda/University_Erp_System>,
<https://github.com/leelanshkharbanda/leelanshkharbanda.github.io>.

Selected repository dates, **as reported by the GitHub API** (`created_at` /
`pushed_at`, UTC dates): Chronos-DSP 2026-02-04 / 2026-11-25;
MoE-Memory-Wall-CA-Project 2026-10-14 / 2026-11-25; HPC_Boost 2026-06-14 /
2026-06-28; RISC-V-Assembler-and-Simulator 2025-02-10 / 2026-11-25;
Modulation-Studio 2026-02-12 / 2026-11-25; Life-Os 2026-01-10 / 2026-09-10.
These are repository metadata, not claims about when work "started" or about
employment.

## 3. Ranked shortlist (6 projects)

Ranked by fit with the software/hardware-intersection positioning, then by the
specificity of the verifiable technical detail. Each entry has two sentences,
one strongest technical detail, and a source URL.

### 1. Chronos-DSP — <https://github.com/leelanshkharbanda/Chronos-DSP>

This is a real-time wireless propagation simulator with an Elixir/Phoenix
control plane and a Rust NIF DSP data plane; a LiveView dashboard drives a
3D scene of transmitters, receivers, and planar walls while signal processing
runs server-side. The README describes line-of-sight, specular reflections via
the image-source method, knife-edge diffraction, transmission, material
attenuation and Doppler, plus QPSK modulation, AWGN and BER in a seeded,
reproducible pipeline.
**Strongest technical detail:** `render_rx_block/5` runs the Rust NIF on a dirty
CPU scheduler with artifact-magic checking and a deterministic pure-Elixir
reference fallback that mirrors the NIF's sample order, interpolation, rotation
and RNG.

### 2. MoE-Memory-Wall-CA-Project — <https://github.com/leelanshkharbanda/MoE-Memory-Wall-CA-Project>

A computer-architecture course project (CA Project 2, Group 24) studying
Mixtral-8x7B decode with experts offloaded to CPU DRAM, using LLMSimulator and
an SSD-offloading fork; the final submission adds training-free expert
predictors and a prefetcher that copies predicted experts from DRAM into HBM
ahead of use. The README's headline table reports improvements over on-demand
LRU in simulated H100/A100 configurations, alongside explicit energy and
DRAM→HBM traffic costs, and states plainly that everything is simulation and no
GPU is needed.
**Strongest technical detail:** the authors' policy — a calibrated speculative
gate with history fallback, guided replacement, preemption and a feedback
throttle — reports 1.27x at C=64 on TinyMoE prose and is never slower than
on-demand + LRU across all 54 reported platform × workload × batch × capacity
points.

### 3. HPC_Boost — <https://github.com/leelanshkharbanda/HPC_Boost>

The GitHub repository metadata describes this as malware detection via
4-event CPU hardware performance counter subset selection on RaDaR and x86-64
KVM traces, and the repository does contain source directories, reports, and
experiment outputs. Its checked-in `README.md`, however, is still the stock
GitLab "Getting started" template pointing at `gitlab.com/breaking-byts/hpc-boost`,
so the README itself documents none of the technical claims.
**Strongest technical detail:** the 4-event hardware-performance-counter subset
for malware detection, as stated in the repository description and topics
(`hardware-security`, `performance-counters`, `malware-detection`, `python`).

### 4. RISC-V-Assembler-and-Simulator — <https://github.com/leelanshkharbanda/RISC-V-Assembler-and-Simulator>

A Python RV32I assembler and simulator built for computer-organization / ISA
learning: the assembler handles R/I/S/B/J-type instructions, labels, ABI
register names and immediate range checking, and the simulator executes them
on a 32-register model with byte-addressed memory. It emits a per-instruction
execution trace showing PC and register state and finishes with a data-memory
dump.
**Strongest technical detail:** a two-pass, label-resolving RV32I pipeline with
immutable `x0`, 12-bit and 20-bit immediate validation, and a decode-execute
cycle that produces an auditable trace.

### 5. Modulation-Studio — <https://github.com/leelanshkharbanda/Modulation-Studio>

A terminal-style browser DSP visualizer covering AM DSB-LC/DSB-SC, FM, PM and
eight digital schemes (ASK, FSK, BPSK, QPSK, 16-QAM among them — the README
lists five named digital schemes under "Digital" and the repo description says
8 digital modulation schemes; treat the exact count as repo-metadata-level),
with AWGN, fading and carrier/phase offset impairments, FFT magnitude spectra
and constellation plots. It computes BER/SER for digital schemes and
correlation for analog ones, has a live static-site demo, and keeps analytics
off by default while honoring Do Not Track / Global Privacy Control.
**Strongest technical detail:** optional adaptive receiver mode combining a PLL
with timing recovery, exposed in the browser alongside waveform, spectrum and
constellation views.

### 6. Life-Os — <https://github.com/leelanshkharbanda/Life-Os>

A privacy-first, local-first desktop productivity app built with Tauri 2,
React 19, TypeScript, TanStack Router/Query and SQLite, spanning academics,
fitness, skills and wellness tracking. The README's AI/ML section describes
on-device ONNX Runtime inference with CoreML acceleration, LanceDB vector
memory for experience-based reasoning, and a Bayesian linear bandit for
recommendations with feature importance.
**Strongest technical detail:** all inference and user data stay on the device —
ONNX Runtime with CoreML acceleration plus LanceDB similarity search over
stored experiences — rather than calling a hosted model.

## 4. Claims we must NOT make

- **No verified job title, employer, or years of experience.** Nothing in the profile README or the non-fork READMEs states employment. Use "engineer" only as a framing of practice, never as a title or a résumé fact.
- **No completed degree, graduation year, GPA, or "CS" label.** The only education evidence is the present-tense, self-described "ECE undergrad at IIIT Delhi" in the profile README. Do not convert it into an alumnus claim or attach a date to it.
- **HPC_Boost is not a GitHub-native, well-documented showcase.** Its README is still the stock GitLab template with a `gitlab.com/breaking-byts/hpc-boost` remote; do not present that README as project documentation, do not assert the work was "built on GitHub," and do not claim the GitLab and GitHub projects are the same canonical source without more evidence.
- **Do not attribute the forks to him.** `hive`, `posthog`, `AionUi`, and `ecapture` are GitHub forks. Their descriptions, features, stars and upstream teams are not his work and must not appear as portfolio projects or as evidence of his skills.
- **MoE-Memory-Wall results are simulated, and it is a group course project.** The README says "Everything is simulation; no GPU is needed" and labels it "CA Project 2, Group 24." Do not claim real H100/A100 measurements, production deployment, sole authorship, or that he built LLMSimulator; quote numbers only as *reported by the project's simulation* and with the configuration (C=64 vs C=224) intact.
- **Chronos-DSP is a simulator, not a deployed radio/telecom product.** Do not claim it handles live over-the-air signals or that it is used by any external organization.
- **Life-Os is an unpublished local app.** Do not claim users, downloads, App Store presence, or company backing. Do not say it is "cloud-based" — the README says the opposite.
- **Modulation-Studio scheme counts are inconsistent across sources.** The repo description says "8 digital modulation schemes" while the README's "Digital" list names five; state the named schemes rather than asserting a hard count.
- **AP_Project / University_ERP* are academic repositories.** `AP_Project` is an "Academic project repository" with seeded default credentials; do not call it a shipped ERP product or a client engagement. `University_ERP_PROJECT` and `University_Erp_System` have no description in GitHub metadata.
- **Tasveer is a society website, not his personal product.** The README identifies it as the site of "Tasveer, the media society of IIIT Delhi"; the profile README says he *coordinates* it. Do not claim he founded it or owns the society.
- **No invented metrics or dates.** Do not state star counts, throughput, accuracy, "founded in" dates, or project durations unless quoted from the cited source. Repository `created_at`/`pushed_at` values are metadata, not project timelines.

## 5. Candidate taglines / headline phrases

Each phrase is grounded in a fact above.

- "Software at the hardware boundary." — profile README's signal-processing / computer-architecture focus plus the shortlist.
- "Signals, caches, and cores." — Chronos-DSP, MoE memory wall, HPC_Boost, RV32I.
- "Code that knows the machine underneath." — RV32I assembler/simulator and Rust NIF DSP data plane.
- "Modeling the channel, measuring the counters." — Chronos-DSP and HPC_Boost.
- "Making the memory wall visible." — MoE-Memory-Wall-CA-Project.
- "DSP you can see in the browser." — Modulation-Studio live demo.
- "Local-first by default." — Life-Os (on-device inference, no data leaving the machine).
- "ECE at IIIT Delhi · signal processing & computer architecture." — profile README; safe as a factual one-liner, with "undergrad" retained if precision matters.

## 6. Method / limitations

Data was read from public GitHub only: `gh api users/leelanshkharbanda`,
`gh api repos/leelanshkharbanda/leelanshkharbanda/readme`,
`gh api users/leelanshkharbanda/repos?per_page=100`, and the `readme` endpoint for
each non-fork project repo. README contents can change; dates above are the API
values at read time (2026-11-25). No LinkedIn, email, or private-repository
contents were accessed, so LinkedIn/email claims are single-source (the profile
README) and should be re-confirmed with the person before publication.
