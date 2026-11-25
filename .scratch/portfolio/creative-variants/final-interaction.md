# Final three-way interaction comparison

**Verdict: select Project Playground, conditional on repairing its verification blockers.** It is the only direction where manipulation, feedback, and project-specific explanation form one coherent interaction. Scores below are interaction-specific, on a 10-point scale; payload is deliberately not a differentiator.

| Axis | Project Playground | Personal Scrapbook | After-Dark Arcade |
|---|---:|---:|---:|
| Interaction originality | 8.5 | 7.5 | 8.0 |
| Play reveals project-specific meaning | 8.5 | 6.5 | 5.5 |
| Keyboard / touch / reduced motion | 8.5 | 8.0 | 9.0 |
| Implementation robustness | 5.5 | 6.0 | 6.5 |
| **Total** | **31.0 / 40** | **28.0 / 40** | **29.0 / 40** |

## Project Playground

The SignalToy is the strongest interaction in the council: moving either endpoint redraws direct/reflected paths and updates numerical readouts. It is explicitly labeled as an illustrative sketch, not Chronos-DSP output or a measurement. The one-axis constraint fixes the earlier keyboard-parity problem; SVG sliders support arrows/Home/End, native ranges duplicate those controls, reset is available, and pointer capture plus `touch-action` support dragging. Fine-pointer tilt, magnets, and cursor remain decorative rather than explanatory.

Project cards now disclose genuinely specific insights: renderer agreement for Chronos-DSP, local model provisioning for Life OS, constellation/BER honesty for Modulation Studio, and the useful negative result for HPC-Boost. These are mostly text disclosures rather than additional manipulable models, but they satisfy the important requirement that “play” leads somewhere project-specific. The revised hero places a real project link above the fold, and the mobile capture puts the title before the schematic.

## Personal Scrapbook

The notebook has the warmest authored interaction texture. Sticky notes are bounded, pointer-captured, keyboard-movable with arrows/Home, resettable, visibly focusable, and touch-enabled. Project margin notes reveal useful particulars—two renderers agreeing on sample order, local-first provisioning complications, and BER countering a misleadingly pretty constellation.

However, moving the notes changes the frame, not the engineering story; most discovery remains a native `<details>` disclosure. The full-height hero still delays project comparison, and the manual motion control is one-way: it hides after activation and cannot re-enable motion. The former mobile clipping is fixed in source and in the 320/390/200% boundary tests; the v2 captures no longer show clipped cards.

## After-Dark Arcade

Arcade has the best input architecture: roving tabs with arrows/Home/End, focus movement, live selection status, large mobile controls, semantic no-JS panels, reversible motion control, live OS-preference response, Save Data awareness, offscreen pausing, and a static canvas under reduced motion. The added three-project comparison strip improves orientation, and the mobile name split is resolved.

Its central weakness is meaning. The cabinet selects between static project records; it does not perturb a project. The canvas explicitly says it is “not project data,” while the companion cursor and glitch treatment are atmosphere. “What to poke at” adds specific guidance, but not interactive discovery. It is polished exploration furniture around the projects rather than play that explains them.

## Remaining blockers and majors

1. **Release blocker — stale shared assertions.** Playground and Arcade still expect `inspectable systems` in `tests/e2e/portfolio.spec.ts:29`, while their current heroes say “I make small systems” and “I take weird systems apart.” That home test necessarily fails in each configured browser.
2. **Release blocker — broken self-start configuration.** Playground targets `4331` but starts/checks a preview command on `4321`; Scrapbook repeats the mismatch with `4332` versus `4321`. Clean `npm run test:e2e` runs can time out unless an external server masks the problem. Arcade’s `4333` configuration is consistent.
3. **Major verification gap.** None of the variant-specific suites exercises real touch drag/selection. Playground also lacks drag/reset/range-synchronization coverage. The root Playwright report predates the final v2 captures, so it is not evidence of a green final run.

## Recommendation

Advance **Project Playground** unchanged in concept, not unchanged in code. Fix both blocker classes, add touch-context tests for the toy and notes/selector equivalents, verify persisted and live motion preferences, then rerun all three browsers and regenerate branch-correct evidence. Borrow only Arcade’s compact comparison strip if project comparison needs strengthening; do not import its decorative canvas/cursor layer. Payload size does not alter this ranking.
