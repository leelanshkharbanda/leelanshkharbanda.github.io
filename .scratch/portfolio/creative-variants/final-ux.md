# Final three-way UX review

**Verdict: Project Playground is the UX winner.** It reaches real work soonest, makes the three featured projects easiest to scan, and has the strongest mobile project hierarchy. Borrow only Arcade’s compact comparison row; do not combine the three visual systems.

**Evidence:** rubric and copy guidelines, all three first-pass reviews, improved branch sources/tests, and all 18 final `*-v2.png` captures. Scores are unweighted, 1 (poor) to 5 (excellent).

| Variant | Project-first hierarchy | Speed of comparison | Content clarity | Mobile usability | Navigation | Factual/credit visibility | Total /30 |
|---|---:|---:|---:|---:|---:|---:|---:|
| Project Playground | 4.5 | 4.0 | 4.0 | 4.5 | 4.5 | 5.0 | **26.5** |
| After-Dark Arcade | 3.5 | 4.0 | 3.5 | 3.5 | 4.5 | 5.0 | **24.0** |
| Personal Scrapbook | 2.5 | 2.5 | 3.5 | 4.0 | 3.5 | 5.0 | **21.0** |

## Findings

**Project Playground** opens with a first-person hook, a direct Chronos-DSP route, three project links, and a meaningful signal toy. The home cards consistently expose question, summary, role/evidence, guardrail, notes, demo, and source. On mobile, the title/question now precedes the schematic; range controls, reset, reversible motion, and keyboard movement have focused tests. The work index’s jump links are the best long-page navigation aid. Remaining cost: work cards are still tall, and “receipts/poke” copy occasionally over-explains the portfolio rather than the project.

**After-Dark Arcade** has the best explicit comparison device: three linked title/question/result entries precede the selector. Keyboard tabs, live selection status, the work launchpad, and direct case-study/source routes are strong. However, the comparison row and cabinet repeat the same three projects, while the large decorative field delays the selection task. Arcade jargon (“player,” “loadout,” “cartridge”) sometimes obscures plain project meaning. Mobile reflow works, but metadata remains very small and wide diagrams require horizontal scrolling.

**Personal Scrapbook** preserves the strongest notebook voice and keeps facts static and visible. The former mobile clipping blocker is genuinely addressed: single-column board rules plus 320/390px and 200%-text element-boundary tests are in place. Nevertheless, the opening still spends substantial space on notes and a decorative loop before any project; the asymmetric, long cards slow comparison, and the work index lacks project jump links. Narrow columns also produce awkward title wrapping. Its manual reduced-motion control remains one-way and disappears after activation—the first-pass request for reversibility was not implemented.

All three retain visible status, individual/team role, evidence class, limits, and source links. No factual/credit hard penalty or services pitch appears.

## Remaining blocker and major

- **Blocker to fold-in: verification integrity.** Playground and Scrapbook `playwright.config.ts` launch preview on port 4321 but target/wait on 4331/4332, with `reuseExistingServer` enabled. Playground and Arcade also retain the shared home test expecting the old “inspectable systems” H1 although their built H1s changed. Thus the recorded `.last-run.json` passes are not a trustworthy full-suite sign-off. Fix ports, update assertions, and rerun each full build/E2E suite against a fresh isolated server.
- **Major if Scrapbook is retained:** make reduced motion reversible and keep the control available. Its delayed project hierarchy and slow comparison are selection disadvantages, not accessibility blockers.

## Recommendation

Select **Project Playground**. Graft Arcade’s `.selector-comparison` pattern as a plain three-row strip—project name, question, first result, direct case-study link—between the Playground hero and detailed cards. Keep Playground’s hierarchy, mobile ordering, jump navigation, SignalToy, and visible guardrails. Do not import Arcade’s cabinet/neon framing or Scrapbook’s corkboard density. Before merge, complete the isolated verification rerun and consider shortening Playground work-card summaries while preserving role, evidence, limits, demo, and source.
