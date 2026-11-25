# Council Review 06: Award Differentiation

Date: 2026-11-25  
Role: Creative director  
Disposition: **APPROVE WITH ADJUSTMENTS**  
Scope: final derivative-risk check; no application code changed.

## Finding

**Evidence Bench is distinct as a system, but its surface specification is not ready to lock.** Its repeated datum route—`C-02` beside a claim, diagram, and source—plus visible evidence classes, asymmetric proof sheets, and explicit stage controls has no direct equivalent among the seven.

The risk is execution: warm paper, black grotesk type, mono labels, and a left-introduction/right-visual hero would resemble Tom Sears, Haoqi Wen, and Max Milkin. Proceed with a refined **“Indexed Proof Sheet” variant**, not a new concept.

## Reference comparison

Award pages verify submitted versions; Dennis and Tom have changed since. This assessment separates award-era and current-site evidence.

| Reference | Overlap and required boundary |
|---|---|
| **Tom Sears** | **High surface overlap:** current off-white/black editorial pages, large grotesk typography, project metadata, and credits. Distinguish through the carbon datum gutter, red index tabs, trace-teal data-only role, and claim-to-source links—not another monochrome image-led index. |
| **Haoqi Wen** | **High palette/type/hero overlap:** off-white grid, sans-plus-mono hierarchy, technical readouts, and live-tool storytelling. Keep exact font pairing, but remove decorative grid, sticker/chrome energy, pointer coordinates, and notebook-window framing. |
| **Max Milkin** | **Moderate layout/hero overlap:** pale restrained field, one hero visual, numbered sections, concise routing. Use dense, unequal evidence folios and datum IDs instead of a central object, scattered stones, or decorative numbering. |
| **Arthur Engel** | **Moderate narrative/interaction overlap:** mechanism-derived visuals and constraint-rich cases. Keep the engineering principle; use flat SVG, explicit stages, and a complete static route rather than atmosphere, drag, scroll switching, or WebGPU. |
| **Dennis Snellenberg** | **Moderate metadata/motion overlap:** scannable credits, live links, large type, and transitions. Evidence labels must precede polish; no image-led hero, parallax, magnetic controls, or smooth-scroll lifecycle. |
| **Bruno Simon** | **Low visual overlap:** drivable 3D world versus static proof sheets. Borrow source transparency only; do not turn navigation into a game or continuous renderer. |
| **Robin Payot** | **Low visual overlap:** blue spatial exhibition versus reflowable editorial evidence. Borrow optional overview thinking only; never a desktop/rotate gate or spatial-only project access. |

## Required adjustments

1. **Palette:** retain verified tokens but change their distribution: a continuous carbon datum gutter—72px desktop, inline labels on mobile—and 4px signal-red index rule. Paper becomes the reading surface between ink rails, not a beige wrapper. Teal appears only in data paths/series.
2. **Type:** retain Bricolage Grotesque, Source Sans 3, and IBM Plex Mono; none exactly matches a reference. Cap display type at `5.5rem` and two lines. Combine name and domain positioning. Limit mono to datum IDs, units, parameters, and status—not section numbering.
3. **Layout:** retain the 12-column construction, but use folio rows, not boxed cards: one unequal lead proof sheet, two full-width ruled entries, and a narrow evidence ledger. No thumbnail wall or decorative grid.
4. **Hero:** replace the split copy/poster with identity and positioning above a static **three-datum proof strip**: question → artifact → evidence class/limit, plus View Work and Résumé. Move the Chronos visual into the lead project. Mobile keeps this sequence without horizontal scrolling.
5. **Interaction:** keep the Trace Inspector only in Chronos. Frame it as four evidence-ledger rows with Previous/Next; active datum and source row change together. No terminal chrome, autoplay, unverified slider, or misleading trace morphs.

## Acceptance gates

- **AD-01:** desktop/mobile comparison against all seven shows no shared hero silhouette or recognizable composition.
- **AD-02:** datum labels, evidence classes, sources, and equivalent tables remain in HTML without JavaScript; 320px reflow and 44px primary targets pass.
- **AD-03:** gutter, rules, states, and focus retain 4.5:1 text/3:1 graphic contrast; forced-colors, 200% text, and reduced-motion remain complete. Font budgets do not increase.

**Decision:** approve Evidence Bench with these adjustments. If implementation reverts to beige editorial cards plus a technical hero object, differentiation is lost and this review must reopen.

## Evidence

- [Creative Review 02](02-creative-direction.md)
- [Creative Decision 01](../council-decisions/01-creative-direction.md)
- [Award Research](../../../outputs/technical-portfolio-research-awards.md)
- [Implementation Research](../../../outputs/technical-portfolio-research-implementation.md)
- [Engineering Architecture Review 04](04-engineering-architecture.md)
