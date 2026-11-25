# Council Review 15 — Content Evidence Re-review

Date: 2026-11-25  
Verdict: **PASS.** All seven findings from Review 10 are resolved in the current audited source. No Blockers, Major, or Minor findings remain within this review’s scope.

## Prior findings verified

1. **HPC v2 labeling — PASS.** `src/content/projects/hpc-boost.md:2,4-11,68-70` uses the version-qualified title, removes `teamSize`, limits the two-person statement to the version-unspecified résumé entry, and disclaims verified v2 composition/module ownership. `creditLabel` now renders “Research record · v2 team size unverified.” The override is honored on cards (`ProjectCard.astro:16-20`), case heroes (`work/[...slug].astro:30-34`), and résumé entries (`resume.astro:68-82`); no two-person v2 credit is generated.

2. **Chronos receiver wording — PASS.** `work/[...slug].astro:125-126` now describes hard QPSK decisions from simulated IQ and explicitly identifies the fixture’s phase correction as illustrative, not a Chronos synchronizer. The unsupported phase/timing-recovery claim is absent.

3. **Life OS model provisioning — PASS.** `life-os.md:4-5,50,68,104` distinguishes the README’s approximately 500 MB first-use download from the inspected local-file loader, treats model provisioning as required, and labels exercise lookup/calendar sync optional. `ProjectVisual.astro:43-44,435-451` matches: `SETUP / NETWORK`, “required model setup + optional integrations,” separate required/optional items, and `NOT FULLY OFFLINE`.

4. **MoE TinyMoE-prose specificity — PASS.** `moe-memory-wall.md:4-5,31-34,48,81-83` identifies the four routing workloads and ties 1.27×/16.65 ms specifically to TinyMoE-prose at `C=64`; TinyMoE-code is separately noted at 1.266×. The method says “recorded TinyMoE-prose top-2 routing,” and the limits reject generalizing this to Mixtral or measured GPU performance.

5. **Modulation deployment-health note — PASS.** `modulation-studio.md:7-8` retains “Live demo” while adding “Live URL reachable; latest Pages deploy failed.” `ProjectCard.astro:38`, `work/[...slug].astro:73`, and `resume.astro:83-85` all render `statusNote`; curation includes Modulation on the homepage, Work, and résumé surfaces.

6. **HPC gate wording — PASS.** `hpc-boost.md:88` no longer claims preregistration. It conditions revisiting a learned router on per-binary conditioning clearing documented headroom and value gates.

7. **RISC-V instruction addresses — PASS.** The four-instruction assembly in `ProjectVisual.astro:755-765` places `add x3, x1, x2` third and `sw x3, 0(x0)` fourth. Trace rows at `830-852` correctly show `0x08 | ADD | x3 = 12 | —` and `0x0C | SW | x3 = 12 | mem[0] = 12`.

## Scope and method

Re-read all eight files in `src/content/projects/`, both requested components, the case-study route, résumé route, and supporting curation/status mappings. Previously verified limits—team-size evidence, personal/team framing, simulation versus measurement labels, RV32I-subset scope, academic/release status, and media-rights restrictions—remain consistent. No external claim remained uncertain, so no `gh` lookup was necessary. Application code was not modified.
