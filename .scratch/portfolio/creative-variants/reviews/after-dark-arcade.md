# After-Dark Arcade — Creative Direction Review

**Verdict: 77/100. Keep in the council; revise before selection or folding into main.** This is the most structurally ambitious direction, but its arcade identity currently outweighs Leelansh’s authorship. The project-selection idea is worth keeping; the generic neon arcade dressing is not yet fully earned.

## Evidence caveat

The supplied `test-results/after-dark-arcade-*.png` files do **not** show this branch: they depict the scrapbook/workbench direction (“Things I’ve built, broken & learned,” “The workbench”). The recorded test run is also failed. I therefore reviewed the branch source and built output directly, with fresh desktop, 390px, and 320px captures. The PNGs must be regenerated against an isolated branch-specific server before council comparison; shared preview ports make cross-worktree contamination plausible.

## Rubric score

| Axis | Score | Assessment |
|---|---:|---|
| Personality and authorship | 18/25 | First-person curiosity and playful language are present, but the hero still leads with the explicitly discouraged “I build inspectable systems,” a giant name, and portfolio counts. “Player 01,” “class,” and “loadout” supply a persona costume more than personal specificity. |
| Project discovery and storytelling | 21/25 | The selector, work launchpad, direct case-study routes, source links, visible limits, and team/evidence labels are strong. Projects remain the eventual hero, but sit below a full-viewport decorative introduction. One-at-a-time panels also make comparison harder than a compact overview. |
| Interaction quality | 15/20 | Roving tabs, arrow/Home/End keys, focus movement, live selection status, touch-sized controls, no-JS fallback, offscreen pausing, Save Data awareness, and initial/manual reduced motion are thoughtful. The companion cursor duplicates the native pointer, and the canvas is atmosphere rather than project exploration. |
| Visual originality | 12/15 | The split signal-field hero, cartridge cabinet, launchpad, scan/glitch accents, and original diagrams are genuinely distinct—not a recolor. However, familiar neon/HUD tropes carry too much identity, and the work index remains a long vertical card list. |
| Usability and readability | 11/15 | Clear navigation, skip link, keyboard access, 320px page reflow, and no serious/critical axe violations on home/work/about are positives. At 320–390px, “KHARBANDA” breaks into “KHARBAND / A”; mobile HUD text drops to roughly 9px, and wide diagrams require horizontal scrolling. |

**Hard penalties:** no services pitch, hiring/rate language, client logos, copied assets, or inaccessible-only project route found. Without JavaScript, all three homepage records and their links remain present.

## Personal and project-first?

More personal than corporate, but not consistently project-first. “Pick a project,” “rabbit hole,” “no leaderboard,” and the candid evidence boundaries feel made by a person. Against that, the opening hierarchy reads “personal brand + engineering credentials + arcade decoration.” The project questions are specific; the surrounding voice often explains the portfolio’s evidence philosophy instead of why Leelansh wanted to build each thing.

## Three highest-value improvements

1. **Replace the showcase front door with a personal hook and a real project.** Put a concise first-person obsession and one concrete build/question above the fold; shrink the name/counts and decorative field. Use the copy-guideline voice, not “I build inspectable systems” as the main claim.
2. **Make the cabinet do meaningful project work.** Keep the distinctive selector, but add a compact three-project comparison and project-specific play—such as changing a Chronos path, inspecting a Life OS record, or perturbing a Modulation Studio signal. Avoid generic glitch/cursor effects standing in for exploration.
3. **Finish the usability and verification pass.** Prevent the mobile name split, enlarge small metadata, make reduced motion reversible, and verify live OS-preference changes—the canvas remained animated in my Chromium emulation despite initial and manual reduced motion working. Regenerate branch-correct screenshots and rerun the failed suite before the next council.

Payload is not a reason to reject this low-traffic showcase; hierarchy and meaningful interaction matter more than bytes.
