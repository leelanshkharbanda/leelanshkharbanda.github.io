# Project Playground — creative direction review

**Verdict: advance to the next pass; do not fold into main unchanged. 78.8/100 (7.9/10).** This is a distinctly personal direction: warm paper, hard ink, lime accents, handwritten-adjacent stickers, and an actual draggable signal sketch feel made by a curious person. It is project-forward in tone and evidence, but not yet project-first in structure. Much of the novelty still decorates the verified baseline’s card system.

## Rubric score

| Axis | Weight | Score /10 |
|---|---:|---:|
| Personality and authorship | 25 | 8.5 |
| Project discovery and storytelling | 25 | 8.0 |
| Interaction quality | 20 | 7.5 |
| Visual originality | 15 | 6.5 |
| Usability and readability | 15 | 8.5 |

**Hard penalties:** none triggered. No services pitch, client logos, availability claims, hidden project facts, copied assets, or broken core navigation were observed.

## Creative assessment

**Personal, mostly—not corporate.** “Welcome to my bench,” “Things I make so I can see how they tick,” “four counters, one honest no,” and “I like taking the lids off” establish authorship. ECE/IIIT, recurring technical interests, and Tasveer make the identity specific rather than generic. The main hero still misses the copy guidance, however: “I build inspectable systems” is precisely the positioning line the guidelines ask to demote. “I kept the receipts,” “No polished sales pitch,” and repeated “poke” language also make the voice occasionally self-conscious. The friendliness is genuine; the anti-marketing posture needs less announcing.

**Project discovery is strong once the cards appear.** The work index’s jump links, five deep dives versus three archive records, questions, summaries, role/evidence labels, guardrails, and visible notes/demo/source actions preserve the useful baseline. But the home and work first viewports lead with an abstract proposition or decorative project stack, not an artifact, result, or project question. The shelf improves invitation more than comparison.

**Interaction quality is promising but uneven.** The SignalToy is the best idea here: moving endpoints changes paths and readouts, with pointer dragging, native ranges, keyboard arrows/Home/End, reset, and a clear “not a measurement” boundary. A Chromium spot-check confirmed drag, keyboard/range synchronization, reset, 390px reflow without horizontal overflow, in-viewport mobile navigation, and reduced-motion behavior. The custom cursor, magnetic buttons, and card tilt are restrained but largely decorative. Vertical dragging has no keyboard equivalent; the Reduce motion control is one-way and disappears after activation. The new playground behaviors also lack dedicated E2E coverage.

**Visual originality is moderate.** The paper/sticker/schematic language is memorable and coherent, and alternating work-card stages add rhythm. Yet the rounded bordered cards, archive grid, toolkit grid, and repeated hard-shadow treatment remain familiar. This is a tactile reskin plus two good illustrations, not yet a fundamentally new browsing structure.

## Three highest-value improvements

1. **Make the opening earn “project-first.”** Replace the generic hero with a specific first-person hook, such as “I make small systems so I can see what they’re doing,” paired with one real Chronos-DSP or Modulation Studio artifact/output. Give the SignalToy a direct “see the project behind this” route and trim the anti-sales meta language.
2. **Turn project cards into small experiments.** Add one meaningful, project-specific state change per featured card—an explanation toggle for Life OS, before/after impairment for Modulation Studio, a visible negative result for HPC-Boost—while keeping the question, outcome, credit, source, and limit visible. Spend the next interaction pass here, not on more tilt.
3. **Close mobile and input-parity gaps.** On mobile, put each title/question before its schematic; currently recognition is delayed by the visual. Make the toy’s vertical state keyboard-accessible or constrain it to one axis, make reduced motion reversible, and add focused tests for drag, ranges, reset, touch, and motion preferences.
