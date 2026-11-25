# Council Review 10 — Content and Evidence

Date: 2026-11-25  
Verdict: **Not release-ready.** No Blockers; four Major and three Minor findings. Read-only audit; application code was not changed.

## Major

### 1. HPC v2 still inherits an unverified two-person label

`src/content/projects/hpc-boost.md:8-11` maps `teamSize: 2` and “shared v2 experiment” onto the v2 case study. The résumé verifies two people only for a version-unspecified HPC-Boost entry; the imported report names Varun Parashar, Aaditya Gupta, and Samriddh Singh; public v2 commits do not establish a second teammate. Consequently Work cards, the case hero, and `/resume/` display “Team research · 2 people” for v2 despite the prose caveat.

Replace with:

- Title: `HPC-Boost v2: Choosing Four Counters, Then Saying No`
- Remove `teamSize: 2`.
- Contribution: `The résumé lists HPC-Boost as a two-person project but does not identify a version. This case study covers the later v2 artifacts; the public record does not verify v2 team composition or my module-level ownership.`
- Credit note: `The two-person label applies only to the version-unspecified résumé entry. The imported report remains separate; v2 authorship is not inferred from repository ownership.`
- Rendered credit on card, case study, and résumé: `Research record · v2 team size unverified`.

### 2. Chronos receiver recovery is not implemented

`src/pages/work/[...slug].astro:115` says “phase and timing recovery before symbol decisions.” Public `lib/chronos/modem.ex` implements QPSK modulation/demodulation and BER only; no PLL or timing-recovery path was found. The portfolio fixture is explicitly illustrative, but this sentence still attributes an unsupported mechanism to Chronos.

Replace the line with:

`Receiver: hard QPSK symbol decisions from simulated IQ; the portfolio fixture’s phase correction is illustrative, not a Chronos synchronizer.`

### 3. Life OS model setup is mislabeled as optional networking

`src/content/projects/life-os.md:5,68,104` and `src/components/ProjectVisual.astro:43,435-450` blur two different dependencies. The README documents a first-use model download (~500 MB), but inspected `embedding.rs` only loads local files and errors when absent; automatic download is not verified. The visual places “model download” under “OPTIONAL NETWORK,” although model provisioning is required for ML operation.

Replace the relevant prose with:

`The README documents a first-use embedding-model download (~500 MB), but the inspected source only loads local model files and errors if they are absent. Model provisioning is a setup requirement; exercise lookup and Google Calendar sync are optional network integrations.`

Replace the visual labels with: heading `SETUP / NETWORK`; microcopy `required model setup + optional integrations`; items `model provisioning`, `exercise lookup (optional)`, `calendar sync (optional)`; footer `NOT FULLY OFFLINE`. Update the SVG description likewise.

### 4. MoE headline result is not workload-specific

`src/content/projects/moe-memory-wall.md:4,31-34,48,81-83` says “three routing workloads” and labels 1.27× as generic “TinyMoE-recorded routing.” The repository has four workloads: TinyMoE prose, TinyMoE code, Mixtral-calibrated, and uniform. The 1.27×/16.65 ms result is specifically **TinyMoE-prose at C=64**; TinyMoE-code is 1.266×/17.33 ms.

Replace with:

- Summary: `A group coursework simulation of expert prediction, HBM caching, and prefetching across TinyMoE prose/code, Mixtral-calibrated, and uniform routing under a constrained memory budget.`
- Claim: `TinyMoE-prose routing at cache capacity 64`
- Method ending: `recorded TinyMoE-prose top-2 routing.`
- Limit: `TinyMoE routing shows stronger locality than the Mixtral-calibrated workload in this study; no real Mixtral routing trace was available.`
- Result sentence: `The 1.27× figure is the TinyMoE-prose result at this capacity (TinyMoE-code: 1.266×), not a general Mixtral or GPU result.`

## Minor

### 5. Modulation’s status is reachable but not deployment-healthy

`modulation-studio.md:7` renders “Live demo” without the known failed latest Pages deployment on homepage, Work, and résumé. Keep the status, but add and render a per-project note everywhere: `Live URL reachable; latest Pages deploy failed.` The case study already states this correctly.

### 6. HPC gate preregistration is not independently dated

`hpc-boost.md:88` says “preregistered,” but the public plan and results were committed together; no pre-run timestamp establishes precedence. Replace with: `Only if per-binary conditioning then clears the documented headroom and value gates should a learned router be revisited.`

### 7. RISC-V schematic has an incorrect instruction address

`src/components/ProjectVisual.astro:841-851` places `sw` at `0x08`; in the shown four-instruction sequence it is at `0x0C`, with `add x3, x1, x2` at `0x08`. Replace the trace rows with: `0x08 | ADD | x3 = 12 | —` and `0x0C | SW | x3 = 12 | mem[0] = 12`.

## Verified

All eight project files, `site.ts`, About, résumé, cards, visuals, and case-study rendering were reviewed. Modulation (2), Life OS (3), RISC-V (4), and ERP (2) team sizes match the résumé; Chronos personal-work framing, Tasveer’s unverified headcount, RV32I-subset limits, ERP’s academic status, simulation/measurement labels, and media-rights limits are otherwise sound. Chronos v0.3.0 and CI run, Modulation’s 66-test CI/failed deploy, HPC metrics, Life OS’s lack of releases, and MoE values match public artifacts. All 32 unique external URLs in audited content returned HTTP 200. Homepage/work/résumé otherwise derive consistently from the same project metadata.
