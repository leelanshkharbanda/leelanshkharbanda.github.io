# Personal Scrapbook — Creative Direction Review

**Branch:** `variant/personal-scrapbook` (`7d30285`)  
**Verdict:** **Conditional advance.** The notebook concept is warm, authored, and meaningfully different from a consultancy portfolio. It is not ready to select as-is: mobile project cards are clipped, triggering the rubric’s unreadable-mobile hard penalty.

## Rubric score

| Axis | Score | Assessment |
|---|---:|---|
| Personality and authorship | 22/25 | Strong first-person headlines, useful failures, margin notes, and curiosity; little corporate language. |
| Project discovery and storytelling | 18/25 | Projects have direct routes, source links, and visible context, but dense cards slow comparison. |
| Interaction quality | 15/20 | Thoughtful note controls and reduced-motion handling; most motion is decorative rather than explanatory. |
| Visual originality | 13/15 | Distinct corkboard composition, taped sketches, and original diagrams; familiar section cadence remains. |
| Usability and readability | 8/15 | Desktop is legible and facts stay exposed, but severe mobile card clipping outweighs that strength. |
| **Raw weighted total** | **76/100** | **Hard penalty applies; do not fold into main yet.** |

No copied assets or recognizable reference composition were observed. Role, team credit, evidence class, source links, and limitation notes remain visible rather than hidden behind interaction.

## Personal and project-first?

**Personal: yes.** “Things I’ve built, broken & learned,” “Broken counts too,” and About’s “Still figuring out how things work” sound like a person thinking aloud. The About page carries the strongest authorship through specific questions and honest boundaries. The homepage introduction is the weak link: its broad list of domains still sounds like a capabilities inventory. The lone “relevant role” phrasing on About also edges toward recruiting without requiring it.

**Project-first: partly.** Three curated projects anchor the homepage and five deeper records organize the workbench. However, at 1440×1000 the first project begins around 1,436px down the page; the full-height hero makes the project-first promise depend on clicking “Flip through my work.” Once reached, the projects are visually dominant, but each card runs roughly 1,100–1,300px and repeats a full teaser, stack, limit, and actions. That weakens comparison. The narrow Life OS column also splits “recommendations” awkwardly.

## Interaction and structural originality

The draggable notes are the strongest interaction work: bounded movement, pointer capture, arrow-key control, Home/reset, visible focus, and touch support are present. Reduced motion removes tilt/reveal behavior. Card tilt is restrained and fine-pointer-only.

Yet these interactions mostly animate the frame, not the projects. “Hover to peek underneath” merely nudges the “open the field notes” tab; it promises a reveal that never arrives. No project facts depend on motion, which is good, but there is little playful *discovery*.

The asymmetric corkboard, ruled paper, taped polaroids, and project-specific field sketches are genuinely structural distinctions—not a recolor of a generic grid. The repeated headline-left/sticky-note-right hero and otherwise conventional section sequence prevent the concept from feeling fully invented.

## Three highest-value improvements

1. **Fix mobile board geometry before any polish.** At 390px, a project card computes to 528px wide inside a 350px board. The collapsed 12-column grid retains eleven gaps, while `overflow: clip` hides the damage; document-width tests therefore pass. Use a true single-column mobile board or remove the inherited grid gaps, constrain cards to the available width, and add element-boundary assertions at 320/390px and 200% text.
2. **Make projects easier to compare and reach sooner.** Shorten the hero or bring the first project into the opening viewport. Give the lead one richer story and the other two compact entry points: question, what was tried, outcome/limit, and links. Preserve role, credit, evidence, and source visibility; move supporting technical detail into the case study rather than repeating full summaries on every card.
3. **Make play reveal something personal.** Replace the fake “peek” promise with an honest, reversible sketch lift or tap that exposes one project-specific insight—a failed assumption, surprising result, or modeling boundary. Attach notes to projects rather than only to heroes. Keep an explicit focus/touch equivalent and leave essential facts static.

**Rejected next-pass moves:** flattening the board into a uniform card grid, adding more autonomous decoration, or improving density by hiding evidence.
