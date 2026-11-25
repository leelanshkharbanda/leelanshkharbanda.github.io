# Technical Portfolio Research — Editorial References

**Access date:** 2026-11-25  
**Scope:** Seven independent personal-site references for making complex technical work legible.  
**Method:** First-party pages, project pages, visible page copy, and lightweight inspection of page structure/styles. Search was used for discovery only. No award-directory or agency-roundup entries were used, no JavaScript bundles were exhaustively analyzed, and no credentials were inferred from secondary sources.

> **Verification note:** “Verified” means the URL was retrieved and the owner/context was confirmed on a first-party page. Interactive pages were inspected through their own copy, controls, notes, and documentation; this was not a full cross-browser interaction or accessibility audit. Counts, roles, and project status are reported as observed on the access date.

## Executive findings

The strongest references do not make technical work look simple. They make the **route through the complexity** explicit: the question, the constraint, the model, the artifact, the result, and the limits.

Seven patterns stand out:

1. **A mission-led archive creates more coherence than a project grid.** Bret Victor's homepage is a chronology of work serving a stated intellectual mission, not a wall of thumbnails.
2. **The best project cards are miniature arguments.** Lea Verou repeatedly moves from a plain-language description to “Innovation(s)” and “Impact,” with the runnable artifact beside the explanation.
3. **Interaction should produce evidence, not merely delight.** Victor's sliders reveal time and state; Nicky Case's games expose systems; Jhey Tompkins's prototypes let the behavior itself carry the proof.
4. **Hardware becomes legible through decisions and constraints.** Matt Webb writes about cable behavior, display finish, packaging, firmware, factory trade-offs, and test units—not just the finished object.
5. **Diagrams are most useful when they preserve a traceable relationship to the real thing.** Maggie Appleton maps syntax to visual shapes; Julia Evans turns surprising system behavior into compact visual models.
6. **Restraint is an information strategy.** Narrow reading measures, plain text, clear captions, restrained navigation, and visible status labels reduce the effort required to understand the work.
7. **Trust comes from maintained context:** dates, collaborators, research notes, transcripts, public-domain or open-source terms, failure modes, and honest statements about what is unfinished or outdated.

### Reference set at a glance

| Reference | Owner | Archetype | Dominant legibility move | Best evidence |
|---|---|---|---|---|
| [Worrydream](https://worrydream.com/) | Bret Victor | Interface research / creative systems | Mission → interactive essay → physical computing demonstration | “Learnable Programming,” “Ladder of Abstraction,” Dynamicland intro |
| [Lea Verou](https://lea.verou.me/) | Lea Verou | Web standards / developer tools / research engineer | Project description → innovation → impact → live tool | Open Source Work, Mavo, Color.js |
| [Jhey Tompkins](https://jhey.dev/) | Jhey Tompkins | Creative developer / design engineer | Small curated shelf over a searchable prototype lab | Home “Latest,” index, “Pluckable Grid” |
| [Nicky Case](https://ncase.me/) | Nicky Case | Interactive explainer / creative coder | Learn by playing, then connect the model to research notes | “The Evolution of Trust,” “Explorable Explanations” |
| [Interconnected](https://interconnected.org/) | Matt Webb | Hardware/product researcher / editorial notebook | Decision → constraint → trade-off → physical evidence | Poem/1 posts, Little Printer talk, colophon |
| [Maggie Appleton](https://maggieappleton.com/) | Maggie Appleton | Research engineer / visual essayist | Visual metaphor with an explicit translation back to code | “Drawing Invisible Programming Concepts,” “A Picture Worth a Thousand Programmes” |
| [Julia Evans](https://jvns.ca/) | Julia Evans | Software researcher / technical illustrator | Surprise → minimal visual model → safe playground | Wizard Zines, Projects, “How I write useful programming comics” |

---

## 1. Bret Victor — Worrydream

**Verified URL:** https://worrydream.com/  
**Owner:** Bret Victor. His first-person bio describes his work on a “humane dynamic medium” and Dynamicland; the page also identifies him as the leader of the team that founded Dynamicland and the inventor of Realtalk.  
**Reference type:** Interface research, creative coding, and physical computing.

### Specific page and section evidence

- **Homepage, “placemaking”:** Opens with a mission—“creating a humane dynamic medium”—before listing current Dynamicland work. The archive is divided into “Toward a dynamic medium,” “Earlier work,” “Bits & blurts,” “Realtoys,” and “Poems & diversions.” Each project is dated and given a short interpretive phrase, such as “Learnable Programming” or “the lab is the experiment.” ([Homepage](https://worrydream.com/))
- **Homepage interaction and type:** The visible styles use Avenir at roughly 13px/1.2, a dark navy ground, pale blue text, and a 564px content column. Links reveal page previews on hover for fine pointers; decorative illustrations sit outside the reading column. This is dense, archival typography rather than promotional hero typography. ([Homepage](https://worrydream.com/))
- **“Learnable Programming”:** Starts with “How do we get people to understand programming?” and distinguishes a programming environment from a programming language. Its major sections are “Read the vocabulary,” “Follow the flow,” “See the state,” “Create by reacting,” and “Create by abstracting.” The essay uses embedded examples where a slider scrubs execution, timelines expose program flow, and variable values become visible. Its blunt rule is “Show the data.” ([Learnable Programming](https://worrydream.com/LearnableProgramming/))
- **“Up and Down the Ladder of Abstraction”:** Builds a car-control simulation from a concrete animation into time controls, parameter controls, trajectory views, and higher-dimensional charts. The crucial move is “stepping back down”: pointing at an abstract trajectory returns to a concrete car state. The page explicitly says the deepest insights occur in transitions between abstraction levels. ([Ladder of Abstraction](https://worrydream.com/LadderOfAbstraction/))
- **Dynamicland intro:** A six-minute, chaptered presentation moves through “Real world,” “Communal computer,” “Authoring,” “Realtalk,” “Dynamicland,” “Communal science,” “Agency,” and “Literacy.” It shows computation projected onto physical objects and tables, with cameras and projectors above the room. Programs are described as things on the table that anyone can see and change. ([Dynamicland intro](https://dynamicland.org/2024/Intro/))

### How it makes complex work legible

**Narrative framing.** The site argues that all the artifacts belong to one long inquiry. That makes a diverse body of work—software interfaces, essays, hardware, physical toys, and poetry—feel cumulative rather than scattered.

**Project hierarchy.** The homepage is not a conventional portfolio index. It is a dated intellectual autobiography. The project title supplies the “what”; the short phrase supplies the “why it matters.” The deeper essay then supplies the argument and evidence.

**Live demos and diagrams.** The interactive essays model good technical explanation exceptionally well. The reader first controls a variable, then sees its effect, then sees a representation across many values, and finally returns to a concrete instance. That sequence turns an abstraction into something inspectable.

**Typography and restraint.** The homepage's small type and limited palette are not universally good defaults, but they support its purpose: a large amount of material is available without the interface competing with it. The reading column stays narrow while peripheral illustrations and hover previews add depth.

**Interaction.** Interaction is epistemic. A slider is not there because sliders are fashionable; it changes what can be known about the system. Dynamicland extends the same principle into physical space.

### What works especially well

- The mission statement gives the archive a durable organizing principle.
- The control → abstraction → concrete-return pattern is a reusable structure for explaining simulations, robotics, data pipelines, or control systems.
- Physical and digital work are presented as parts of the same research program.
- Short project subtitles encourage exploration without reducing the work to a one-line sales pitch.

### What not to imitate

- The archive's scale and density can overwhelm a first-time visitor; it suits a long career, not necessarily a new portfolio.
- Very small type and low-contrast ornamental text should not be copied without accessibility testing.
- Some older interactive essays are products of their browser era; presence on the page is not proof of current mobile or keyboard support.
- The polemical certainty of some essays is part of Victor's voice. A portfolio should not borrow that posture without the same depth of argument.
- Dynamicland's physical-computing vision is highly specific. Transfer the explanatory method, not the entire aesthetic or ideology.

### Transferable pattern

**Mission-led case study:** state the question you are pursuing; date each artifact; use a short interpretive subtitle; then let the reader move between a concrete demo, an abstract model, and a real-world consequence.

---

## 2. Lea Verou — Personal site and developer tools

**Verified URL:** https://lea.verou.me/  
**Owner:** Lea Verou. Her homepage describes her work across web standards, open-source developer tools, teaching, writing, and consulting.  
**Reference type:** Web standards, developer tools, and research-led software.

### Specific page and section evidence

- **Homepage:** “I make things for making things” is followed by distinct routes into Blog, Consulting, Specs, Open Source, Speaking, Publications, Press, and About. This separates kinds of evidence instead of flattening everything into “projects.” ([Homepage](https://lea.verou.me/))
- **Open Source Work:** At access, the page listed 33 projects. Entries generally include a title and date, artifact type, a screenshot or mark, a concise explanation, and links to the live tool and repository. Larger entries add explicit “Innovation(s)” and “Impact” sections. ([Open Source Work](https://lea.verou.me/projects/))
- **Mavo:** The first-party site leads with “A new, approachable way to create Web applications,” then explains the central premise: complex, reactive, persistent applications from HTML and CSS without JavaScript or a server backend. It organizes the value proposition as “Approachable,” “Learnable,” “Flexible,” “Extensible,” “Accessible,” and “Free and Open Source.” “Mavo at a glance” places explanations next to small code samples and editable demos for a homepage, to-do list, and portfolio. ([Mavo](https://mavo.io/))
- **Color.js:** The homepage moves from a short promise—“Let's get serious about color”—into concrete technical differentiators such as color-space-agnostic operations, gamut mapping, multiple DeltaE methods, and CSS Color 4 support. Navigation separates docs, API, notebook, demos, elements, tests, and source. The page explicitly credits Lea Verou and Chris Lilley as creators and identifies a broader maintainer team. ([Color.js](https://colorjs.io/))

### How it makes complex work legible

**Narrative framing.** The project index treats each tool as a response to a user problem. It does not begin with a technology name and hope the visitor supplies the relevance.

**Project hierarchy.** The card structure is unusually useful: description first, then optional innovation and impact. A visitor can skim for scope, while a technical reader can go deeper into what was novel and where it was adopted.

**Live demos.** Mavo's editable homepage and to-do examples make an unfamiliar programming model tangible. Color.js offers a notebook, apps, and elements rather than asking readers to understand the library from API prose alone.

**Diagrams and typography.** This is not a diagram-heavy portfolio. Its strength is a functional type hierarchy: project title, date, category, short explanation, and clearly labeled Innovation/Impact subheads. The typography is doing editorial work rather than performing a brand.

**Restraint.** Screenshots are evidence, not decoration. Repository, npm, and live-site links sit close to the explanation, reducing the distance between curiosity and verification.

### What works especially well

- The description → innovation → impact structure is directly reusable.
- Research claims are paired with artifacts, papers, demos, or standards work.
- Mavo's “approachable / learnable / flexible” framing explains a complex system through user capabilities.
- Color.js demonstrates how a deep technical product can have both a concise front door and a rich documentation hierarchy.

### What not to imitate

- A long project catalogue can become a wall of links. A smaller portfolio should feature a curated subset and move the rest to an archive.
- Download counts and impact metrics age quickly and should be dated or qualified.
- Sponsorship and maintenance messages are appropriate here because the tools are widely used; they should not be imitated without an equally clear public-benefit model.
- Standards leadership is not a transferable credential. The transferable element is the evidence structure, not the authority.

### Transferable pattern

**Project card schema:** one-sentence problem → artifact type → live demo → what was technically novel → observable impact or adoption → source/repository. For flagship work, add a separate product/documentation site rather than forcing the whole explanation into the portfolio card.

---

## 3. Jhey Tompkins — Prototype lab

**Verified URL:** https://jhey.dev/  
**Owner:** Jhey Tompkins. The homepage self-describes him as “Designer · Engineer · Tastemaker” and says he crafts interfaces, prototypes, and web experiments.  
**Reference type:** Creative development and interaction prototyping.

### Specific page and section evidence

- **Homepage:** A compact introduction and contact/index links are followed by only five “Latest” prototypes. This is a deliberately small front door over a much larger body of work. ([Homepage](https://jhey.dev/))
- **Index:** At access, the searchable tree showed **867 prototypes, 47 articles, and 14 talks**, grouped by year. It supports “Recent” and “A–Z” views and searches titles and file names. Monospace tree labels, counts, uppercase top-level categories, and nested year folders make the volume navigable. ([Index](https://jhey.dev/index))
- **“Pluckable Grid”:** The instruction is immediate: “these lines are strings go on, pluck one.” A section called “Editorial block” explains that ordinary content sits above the grid, is not itself playable, and causes the strings to stop at its edges. This is a clear example of interaction design respecting reading. ([Pluckable Grid](https://jhey.dev/prototypes/2026/pluckable-grid/index.html))
- **“esp32 magic eight”:** The page provides a direct manipulation invitation—“drag gently to nudge · shake for another”—and then asks the visitor to ask a question and shake the ball. The filename names ESP32, but the visible page did not explain wiring or hardware setup, so it is useful here as an interaction reference, not as verified hardware documentation. ([ESP32 Magic Eight](https://jhey.dev/prototypes/2026/esp32-magic-eight/index.html))
- **Archive maintenance signal:** One sampled current homepage link, “The Construct: Not Found,” resolved to a custom page saying “404 Not found” and “Looks like this experiment got away.” This was a single sampled link, not an exhaustive health audit, but it illustrates the maintenance cost of a very large prototype archive. ([The Construct](https://jhey.dev/prototypes/2026/construct-dense/index.html))

### How it makes complex work legible

**Narrative framing.** The site frames the work as an ongoing practice: “One thing leads to another.” The homepage does not pretend that hundreds of prototypes can all be explained at once. It offers recency as the curation mechanism.

**Project hierarchy.** The tree index is the key piece of information architecture. Year folders and counts allow a visitor to understand scale, while search provides a direct path to a known technique or artifact.

**Live demos.** Each prototype is the explanation. The interface removes most portfolio chrome so the visitor can manipulate the thing immediately. Short instructions appear in plain language next to the interaction.

**Typography and restraint.** The index uses utility typography—monospace labels, small metadata, counts—while prototype pages use a minimal title/instruction frame. The visual identity comes from the behavior of the artifact, not from animated portfolio navigation.

**Interaction.** “Pluckable Grid” is the strongest editorial example: it defines where play belongs and where reading must remain stable. That boundary is as important as the effect itself.

### What works especially well

- Five recent items on the homepage, backed by a searchable archive.
- Instructions written as invitations rather than feature descriptions.
- A prototype index that makes prolific output inspectable.
- A demonstrated understanding that some page regions should remain non-interactive.

### What not to imitate

- Sheer volume without curation can read as output rather than judgment.
- File-name-style titles such as “esp32-magic-eight” are efficient for an archive but weak as client-facing case-study names.
- Many prototype pages have little explanation of the problem, constraints, or implementation. A portfolio case study should add that context.
- A large live archive needs link checking, fallbacks, and a policy for retired experiments.

### Transferable pattern

**Curated shelf + searchable lab:** feature five recent or strongest experiments on the homepage; keep the full chronology in a searchable index; place a one-sentence manipulation instruction beside every demo; explicitly separate playable surfaces from reading surfaces.

---

## 4. Nicky Case — Playable explanations

**Verified URL:** https://ncase.me/  
**Owner:** Nicky Case, who introduces the site with “Hi, I'm Nicky! I make shtuff for curious & playful folks.”  
**Reference type:** Interactive explanation, creative coding, and educational games.

### Specific page and section evidence

- **Homepage:** Work is divided into “SHTUFF YOU CAN PLAY,” “SHTUFF YOU CAN READ,” and “SHTUFF YOU CAN WATCH.” This classifies work by what the visitor can do, not by medium or client. Each card has a thumbnail and a plain-language description. The footer states that the work is available under a public-domain waiver. ([Homepage](https://ncase.me/))
- **Projects archive:** The chronology is unusually candid. Empty years are labeled “nothing. burnout. :(” and “nada, nothing, zilch.” Individual entries include “a tiny explanation-free sim, made in 2 days for a pal” and a puzzle game marked as an unfinished demo. This makes the archive feel like a practice record rather than a polished victory lap. ([Projects](https://ncase.me/projects/))
- **“The Evolution of Trust”:** The project describes itself as “an interactive guide to the game theory of why & how we trust each other.” Its own notes identify the research base, including Robert Axelrod's *The Evolution of Cooperation*, and explain design choices. For example, “Copycat” is Tit for Tat renamed to avoid priming players who already know the established term. ([Trust](https://ncase.me/trust/), [Feetnotes](https://ncase.me/trust/notes/))
- **“Explorable Explanations”:** This first-party design essay supplies a practical method: “Do & Show & Tell,” interest curves, “Start small, build big,” playtesting, “See, Model, Apply,” cognitive gates, and “Author-guided & Player-driven.” It argues that text is best for abstraction, graphs for broad relationships, animation for temporal relationships, and interactives for processes, systems, and models. ([Explorable Explanations](https://blog.ncase.me/explorable-explanations/))
- **Reading controls:** The blog version of the essay exposes dark mode, font-size adjustment, serif/sans-serif choice, a table of contents, and expandable notes. These controls support long-form reading rather than adding decorative motion. ([Explorable Explanations](https://blog.ncase.me/explorable-explanations/))

### How it makes complex work legible

**Narrative framing.** The site promises curiosity and play, then organizes work by visitor action. The project descriptions explain the conceptual territory before mentioning the artifact.

**Project hierarchy.** The homepage is a curated triage surface; the archive preserves chronology, experiments, failures, and gaps. That combination avoids both the sterile “selected work” grid and the unfiltered dump.

**Live demos and diagrams.** The central technique is to teach one mechanic in isolation, let the visitor form a model, and then combine mechanics. The game is not an ornament attached to an essay; it is part of the argument.

**Typography and restraint.** Lowercase, playful copy and uppercase category headings create a recognizable voice. More importantly, the essay chooses among text, graphs, animation, and interaction instead of making every paragraph interactive.

**Interaction.** The interaction is author-guided but player-driven. Case also acknowledges the risk of gating: withholding information can increase motivation, but poor gating can make readers skip prerequisites.

### What works especially well

- Clear medium selection: not every concept needs a simulation.
- Research notes expose the sources and translation decisions behind the experience.
- Honest archive labels make experimentation and burnout part of the professional record.
- Reader controls and footnotes support the long-form companion to the playable work.

### What not to imitate

- Whimsy is not appropriate for every technical or institutional audience.
- Heavy gamification can obscure seriousness if the underlying model is not robust.
- The main trust experience is script-rendered; the text-only retrieval exposed a “loading...” state. A production portfolio should provide meaningful static content, transcripts, or fallbacks.
- Public-domain dedication is a deliberate ethical and licensing choice, not a default for commercial or team-owned work.
- Gating should be tested with real readers rather than added on principle.

### Transferable pattern

**Playable case study:** begin with a low-knowledge hook; teach one mechanic; let the reader generate data or intuition; combine mechanics; conclude with something only understandable after the earlier steps; attach research notes and disclose simplifications.

---

## 5. Matt Webb — Interconnected

**Verified URL:** https://interconnected.org/  
**Owner:** Matt Webb. His about page identifies him as co-founder and CTO at Inanimate and previously co-founder and CEO of BERG. It describes Interconnected as his public notebook, written since February 2000.  
**Reference type:** Hardware/product research and restrained editorial practice.

### Specific page and section evidence

- **About and homepage hierarchy:** The about page separates “About me,” “Some things I've made,” “About the blog,” and contact routes. The blog homepage combines a complete recent essay with a compact recent-post list, yearly archives, tags, search, email/RSS subscription, and “Unoffice Hours.” ([About](https://interconnected.org/), [Blog](https://interconnected.org/home/))
- **Poem/1:** The product page calls it an “AI rhyming clock,” promises “A new poem every minute of every day,” and says the displayed render updates live. It links to a setup manual, dashboard, developer page, and newsletter. ([Poem/1](https://poem.town/))
- **Hardware micro-decisions:** In “The agony and the ecstasy of, um, hardware products,” Webb describes screw placement, timezone configuration, USB PD cable compatibility, possible radio emissions, the naming difference between “notes” and “messages,” and the finish of an e-paper screen. He explicitly credits collaborators and notes that micro-decisions connect firmware, UX, manufacturing, certification, and business constraints. ([Hardware products](https://interconnected.org/home/2024/08/22/matte))
- **Manufacturing evidence:** “Back from Shenzhen” describes pilot production, a 100-unit certification/end-to-end test batch, firmware changes for assembly, a suspected display-damage mechanism involving a ribbon-cable bond weakened by shipping vibration, and marked-up physical parts reviewed with a factory manager. ([Shenzhen](https://interconnected.org/home/2025/07/18/shenzhen))
- **Little Printer:** Slide 42 of a 2014 talk describes a small web-connected receipt printer, then reports the important user behavior: families used it for collectables and things to color in. Webb says they sold “a few thousand.” This is outcome-focused hardware storytelling rather than a specification sheet. ([Little Printer slide](https://interconnected.org/notes/2014/10/interconnected/42))
- **Colophon and typography:** The colophon explains a plain-text, date-directory publishing system, SQLite indexing, Python/Flask/Jinja rendering, RSS, and a longevity-first approach. Styles use the operating system's body font, Archivo for headlines, and Tachyons. Visible article CSS uses a roughly 30rem measure, gray text on a light ground, blue links, and underlined second-level headings. ([Colophon](https://interconnected.org/home/2024/10/28/colophon))

### How it makes complex work legible

**Narrative framing.** Webb writes from inside the decision process. A hardware project becomes understandable through specific constraints and trade-offs rather than through claims such as “innovative” or “seamless.”

**Project hierarchy.** Interconnected is a notebook, not a conventional portfolio landing page. The about page supplies orientation; the archive supplies depth; tags connect recurring lines of inquiry. Hardware work is distributed across a coherent public record rather than isolated in a single case study.

**Live demos and diagrams.** Poem/1's live updating render connects the web page to the physical product. Elsewhere, the evidence is photographic and textual: marked-up parts, test units, factory scenes, and screen-finish comparisons. There is no need to force every hardware project into an interactive web diagram.

**Typography and restraint.** The narrow measure, system body font, minimal imagery, and direct hierarchy keep long essays readable. The design recedes so the specificity of the writing can do the work.

**Interaction.** Multiplayer cursors and ephemeral highlights add social presence, but the colophon presents them as small, loosely joined features—not as the reason to visit. The core interaction is reading, following links, and exploring related posts.

### What works especially well

- Hardware stories connect physical behavior to software, naming, manufacturing, and user experience.
- Test batches, suspected failure mechanisms, and production constraints make the work credible.
- Little Printer is framed through what families actually did with it.
- The archive demonstrates sustained practice over decades.
- The colophon explains how the site supports the writing rather than celebrating the stack for its own sake.

### What not to imitate

- A long-running personal blog is not a substitute for a clear portfolio entry point; pair the notebook with a curated “start here” route.
- Digressive first-person writing will not suit every audience or client.
- Current startup updates can easily overshadow older project evidence; date and label them.
- Manufacturing detail is useful only when it is accurate and shareable. Do not expose supplier-confidential or team-private material.
- Self-deprecation can undermine clarity if overused.

### Transferable pattern

**Hardware case study as a decision log:** product behavior → user need → constraint → trade-off → prototype/test evidence → manufacturing or field outcome → named collaborators → unresolved risks.

---

## 6. Maggie Appleton — Digital garden and visual research

**Verified URL:** https://maggieappleton.com/  
**Owner:** Maggie Appleton. Her about page currently lists her as a Staff Research Engineer at GitHub Next from October 2025 to present and describes prototypes and tools exploring how software engineers may collaborate with AI. She also self-describes as a designer, anthropologist, and developer.  
**Reference type:** Research engineering, visual essays, and technical illustration.

### Specific page and section evidence

- **Garden structure:** The site divides writing into Essays, Notes, Patterns, Smidgeons, Talks, Podcasts, Library, and Antilibrary. The Garden page reports 168 items at access and offers filters by topic, growth stage, and type. Growth stages are Seedling, Budding, and Evergreen. ([Homepage](https://maggieappleton.com/), [Garden](https://maggieappleton.com/garden))
- **“How to Draw Invisible Programming Concepts: Part I”:** The page begins with an explicit “Assumed Audience” and a challenge statement: “Create an illustration that clearly communicates the idea of ‘Web Security.’” It then develops a four-layer illustration model—visual metaphor, clear drawing, composition, and lighting/color—and repeatedly maps a familiar source to an abstract target. Examples include CSS selectors as painting parts of a house, Redux actions as *Space Invaders*, and Vue Router as a railway. ([Drawing Invisible Programming Concepts](https://maggieappleton.com/drawinginvisibles1))
- **“A Picture Worth a Thousand Programmes”:** This talk transcript and slide sequence argues that visuals reveal metaphors, spatial mappings, and change over time. A concrete example compares four `useEffect` dependency patterns as timelines rather than relying on syntax alone. It also acknowledges the limitations of visual programming: scale, ambiguous symbols, screen space, and spaghetti-like structures. ([A Picture Worth a Thousand Programmes](https://maggieappleton.com/programming-pictures))
- **Collaboration and attribution:** The same page describes work on *Just JavaScript* with Dan Abramov and explains that syntax was correlated with specific visual shapes to discuss object mutation and property assignment. This is a first-party statement of the collaboration, not an inferred credit. ([Programming Pictures](https://maggieappleton.com/programming-pictures))
- **Colophon:** Headers use Canela Display and body copy Canela Text, with Lato as supporting sans-serif. A fluid type scale from Utopia adjusts with viewport width. Content is written in MDX and published with Astro. Paragraph styles cap prose at roughly 52 characters. The colophon also explains growth stages and reusable “Assumed Audience” and “Coming Soon” components. ([Colophon](https://maggieappleton.com/colophon))

### How it makes complex work legible

**Narrative framing.** Appleton often writes a case study about the act of explanation itself. That is valuable for a research portfolio because it makes the author's judgment visible: what was abstract, what metaphor was chosen, what it reveals, and what it hides.

**Project hierarchy.** The garden taxonomy separates mature arguments from loose notes, observed patterns, talks, and links. Growth-stage labels disclose maturity instead of pretending every page is equally authoritative.

**Diagrams.** The diagrams are not decorative “tech” imagery. They map source and target concepts, preserve relationships, and return to specific code. The `useEffect` timelines are a strong example of choosing a representation that matches the behavior being explained.

**Typography and restraint.** Serif reading typography, a narrow prose measure, fluid scale, and restrained supporting type give long essays a stable reading surface. The visual energy is concentrated in illustrations and diagrams, not in interface motion.

**Interaction.** The site uses previews, hover states, view transitions, and some scrollytelling, but its published CSS disables growth-icon animation and drop-cap animation under `prefers-reduced-motion`. More importantly, the core content remains readable without relying on the effect.

### What works especially well

- “Assumed Audience” makes the contract with the reader explicit.
- “Challenge statement” forces the project or illustration to have a clear communicative job.
- Growth stages distinguish polished work from work in progress.
- Diagrams preserve a traceable connection to syntax and behavior.
- The site documents its own typography and content system in a useful colophon.

### What not to imitate

- Long visual essays require significant editorial investment; a short case study should not pretend to have the same depth.
- Growth-stage language can become confusing if dates and update history are hidden.
- Card hover motion and decorative transitions should be removed if they delay reading or create motion sensitivity.
- A broad garden taxonomy can make a small portfolio feel empty. Use only the categories that match the actual body of work.
- Do not borrow illustrations, visual languages, or third-party course artwork. Transfer the method, not the assets.

### Transferable pattern

**Visual explanation case study:** name the audience → write the communication challenge → choose a metaphor or diagram → show the mapping to the real system → disclose what the representation omits → mark the maturity of the explanation.

---

## 7. Julia Evans — Wizard Zines and technical playgrounds

**Verified URL:** https://jvns.ca/  
**Owner:** Julia Evans. Her about page identifies her as a software developer and says most of her income comes from her programming-zines business, Wizard Zines.  
**Reference type:** Systems research, technical education, and illustrated editorial work.

### Specific page and section evidence

- **Homepage and archive:** The homepage introduces the blog and organizes posts by categories including “Things I built,” “How a computer thing works,” “Zines / comics,” “On writing words,” and “On writing comics / zines.” This makes the relationship between research, artifacts, and explanation visible. ([Homepage](https://jvns.ca/), [About](https://jvns.ca/about))
- **Projects:** Each entry answers “what problem did this solve?” Examples include Mess with DNS as an easy safe place to experiment, dns-lookup as a friendlier alternative to `dig`, an nginx playground for testing configurations, and debugging mysteries as choose-your-own-adventure puzzles. Entries link to the artifact and to a blog post explaining it; collaborators are named where applicable. ([Projects](https://jvns.ca/projects/))
- **Wizard Zines:** The catalogue distinguishes free black-and-white-cover zines from paid color-cover zines. It also separates “Questions!” and “Experiments!”—including memory spy, Mess with DNS, integer.exposed, DNS lookups, nginx and SQL playgrounds—from the publication catalogue. Technical topics include Git, DNS, containers, CSS, HTTP, debugging, terminals, and Linux tools. ([Wizard Zines](https://wizardzines.com/))
- **Comics process:** In “How I write useful programming comics,” Evans identifies three useful forms: the surprising/hidden fact, the list of important things, and the relatable story. She says drawing is not the hard part and that she only writes definitive short comics about topics she knows relatively well; she uses longer blog posts while still learning. ([Programming comics](https://jvns.ca/blog/2020/12/05/how-i-write-useful-programming-comics/))
- **Accessibility:** Wizard Zines states that paid zines include downloadable HTML transcripts. Since 2023, new comics have transcripts, with a backlog of more than 500 older comics being updated; Mastodon and Bluesky posts also use alt text. This is a concrete accessibility commitment, with its limits disclosed. ([Accessibility](https://wizardzines.com/accessibility))

### How it makes complex work legible

**Narrative framing.** The site is organized around making “hard” and “scary” systems accessible and interesting. The explanation begins with surprise: a behavior that contradicts the reader's mental model.

**Project hierarchy.** Tools, games, blog posts, zines, and posters form a connected ecosystem. A reader can encounter a concept as a comic, a playground, a long explanation, or a reference poster.

**Live demos.** The playgrounds are safe, scoped environments. Their value is not visual spectacle; it is the ability to experiment without damaging a real system.

**Diagrams and typography.** The interface typography is deliberately secondary. The visual identity comes from simple drawings, characters, arrows, and compact explanatory sequences. That restraint is useful for technical work where the diagram—not the website chrome—must carry the meaning.

**Interaction and access.** The site pairs visual explanations with text alternatives and transcripts. The free/paid split is clearly signposted, and the experiments section gives readers multiple ways to engage with the same concepts.

### What works especially well

- A clear progression from surprising fact to visual model to safe experiment.
- Project entries explain the motivation and link to deeper writing.
- The archive connects research output with teaching output.
- Transcripts and alt text are treated as part of the publication system.
- The author distinguishes topics she is still learning from topics she can explain concisely and confidently.

### What not to imitate

- Cute characters are not appropriate for every domain or audience.
- A commerce-heavy catalogue can overwhelm the research narrative; keep portfolio and store hierarchies distinct.
- The projects page itself warns that it may be out of date. Visible maintenance status is honest, but it should not excuse stale links.
- Short definitive explanations should not be written before the author understands the topic well enough to avoid false certainty.

### Transferable pattern

**Explain–play–deepen loop:** surprising behavior → minimal diagram or comic → safe interactive playground → long-form technical post → reference artifact. Add transcripts and visible access tiers from the beginning.

---

## Evidence table

| ID | Reference and exact page/section | Observed evidence | Transferable lesson |
|---|---|---|---|
| BV-1 | [Worrydream home](https://worrydream.com/), “placemaking” and dated sections | Mission statement precedes a chronological archive; project titles carry short interpretive subtitles. | Organize diverse work around a question, not a medium or client list. |
| BV-2 | [Worrydream home](https://worrydream.com/), visible styles and hover behavior | Avenir around 13px/1.2, 564px column, dark palette, fine-pointer page previews. | Dense archival typography can work when the interface stays out of the reading path. |
| BV-3 | [Learnable Programming](https://worrydream.com/LearnableProgramming/), “Follow the flow” and “See the state” | Scrubbable execution, timelines, visible variable values; “Show the data.” | Reveal state and time instead of asking the visitor to imagine them. |
| BV-4 | [Ladder of Abstraction](https://worrydream.com/LadderOfAbstraction/), “Stepping Back Down” | Charts link back to concrete car states; interaction ties abstraction levels together. | Every abstraction should offer a route back to a concrete instance. |
| BV-5 | [Dynamicland intro](https://dynamicland.org/2024/Intro/), “Real world,” “Authoring,” “Realtalk” | Physical objects, projectors/cameras, programs as visible things on tables. | Explain physical computing through space, materials, and shared activity. |
| LV-1 | [Open Source Work](https://lea.verou.me/projects/) | Cards combine description, date, type, demo/repo, and optional Innovation/Impact. | Use a repeatable project-card schema. |
| LV-2 | [Mavo](https://mavo.io/), “Mavo at a glance” | Capability framing, small code samples, editable homepage/to-do/portfolio demos. | Place a runnable example next to the conceptual promise. |
| LV-3 | [Color.js](https://colorjs.io/), feature list and navigation | Technical differentiators lead into docs, API, notebook, demos, elements, tests, and source. | Give complex tools both a concise front door and a deep documentation layer. |
| JT-1 | [Jhey home](https://jhey.dev/), “Latest” | Only five prototypes are featured despite a much larger index. | Curate the entry point; archive the rest. |
| JT-2 | [Jhey index](https://jhey.dev/index) | Search, Recent/A–Z, year tree, counts; 867 prototypes, 47 articles, 14 talks at access. | Prolific output needs search, hierarchy, and counts. |
| JT-3 | [Pluckable Grid](https://jhey.dev/prototypes/2026/pluckable-grid/index.html), “Editorial block” | Content remains non-playable; strings stop at reading-region boundaries. | Define where interaction belongs and where reading must remain stable. |
| JT-4 | [The Construct](https://jhey.dev/prototypes/2026/construct-dense/index.html) | Sampled current link displayed a custom “404 Not found” page. | Large live archives require maintenance and retirement policies. |
| NC-1 | [Nicky Case home](https://ncase.me/), three “SHTUFF” sections | Work is classified as play, read, or watch; public-domain terms are visible. | Organize by visitor action and disclose reuse terms. |
| NC-2 | [Nicky Case projects](https://ncase.me/projects/) | Burnout years, a two-day explanation-free sim, and an unfinished demo are labeled honestly. | Preserve experiments and gaps without presenting everything as finished. |
| NC-3 | [Explorable Explanations](https://blog.ncase.me/explorable-explanations/), “Do & Show & Tell,” “Start small, build big” | Explicit rules for selecting media, sequencing mechanics, playtesting, and gating. | Use interaction only where it explains process or system behavior. |
| NC-4 | [Trust feetnotes](https://ncase.me/trust/notes/), “Copycat” | Research sources and a naming decision are documented to avoid priming players. | Attach research notes and disclose conceptual translations. |
| MW-1 | [Interconnected about](https://interconnected.org/), “About the blog” | Public notebook since February 2000; current work and made things have separate routes. | Use an archive to demonstrate sustained practice. |
| MW-2 | [Hardware products](https://interconnected.org/home/2024/08/22/matte) | Screw placement, timezone logic, USB PD, emissions, naming, and e-paper finish are connected. | Make hardware legible through cross-disciplinary decisions. |
| MW-3 | [Shenzhen](https://interconnected.org/home/2025/07/18/shenzhen) | 100-unit pilot batch, certification/end-to-end tests, suspected vibration-related display damage. | Show testing, failure hypotheses, and manufacturing constraints. |
| MW-4 | [Little Printer slide 42](https://interconnected.org/notes/2014/10/interconnected/42) | Product description followed by family use cases and “a few thousand” sold. | Report observed user behavior and scale, not only specifications. |
| MW-5 | [Interconnected colophon](https://interconnected.org/home/2024/10/28/colophon), “Longevity” and “Other doodads” | Plain-text source, baked data, friendly RSS, system body font, Archivo headlines. | Prefer owned content, simple formats, and maintainable reading features. |
| MA-1 | [Maggie Appleton Garden](https://maggieappleton.com/garden) | Filters for topic, growth stage, and type; Seedling/Budding/Evergreen status. | Make content maturity visible. |
| MA-2 | [Drawing Invisible Programming Concepts](https://maggieappleton.com/drawinginvisibles1), “Part Zero” | Assumed Audience, explicit challenge statement, four-layer illustration model. | State who the explanation serves and what it must communicate. |
| MA-3 | [Programming Pictures](https://maggieappleton.com/programming-pictures), “change over time” | Four `useEffect` patterns compared as timelines; visual-programming limits acknowledged. | Choose diagrams that represent behavior over time. |
| MA-4 | [Appleton colophon](https://maggieappleton.com/colophon), “Typography” and “Growth Stages” | Canela Display/Text, Lato, Utopia fluid scale, MDX, maturity labels. | Treat typography and content status as part of the explanation system. |
| JE-1 | [Julia Evans projects](https://jvns.ca/projects/) | Problem-first descriptions link each tool to the artifact and an explanatory blog post. | Connect every demo to motivation and deeper writing. |
| JE-2 | [Wizard Zines](https://wizardzines.com/), “Questions!” and “Experiments!” | Same technical domains appear as questions, zines, posters, and playgrounds. | Offer multiple depths of engagement with one subject. |
| JE-3 | [Programming comics](https://jvns.ca/blog/2020/12/05/how-i-write-useful-programming-comics/) | Three comic forms; definitive short comics reserved for well-understood topics. | Match the explanation format to the author's current confidence. |
| JE-4 | [Wizard Zines accessibility](https://wizardzines.com/accessibility) | HTML transcripts for paid zines, growing comic transcript archive, social alt text. | Design text alternatives into the publication workflow. |

---

## Strongest lessons for a technical portfolio

### 1. Lead with a point of view, then prove it

Victor's mission, Case's curiosity, Appleton's visual explanation, and Evans's accessibility-first systems teaching all give the work a coherent center. A portfolio should be able to finish this sentence: **“I make technical work understandable by…”** The projects then serve as evidence.

### 2. Treat each project as an argument, not a card

A strong case study answers:

1. What was the question or user problem?
2. What constraints mattered?
3. What model, system, or design decision made the work possible?
4. What can the visitor inspect or try?
5. What happened, and how do we know?
6. What was your individual contribution?
7. What remains uncertain, unfinished, or unmeasured?

Lea Verou's Innovation/Impact labels and Matt Webb's decision logs are especially useful structural references.

### 3. Make interaction answer a question

Use interaction when it can reveal state, compare cases, control time, expose causality, or step between abstraction and concrete behavior. Avoid adding motion simply to demonstrate that a site is technically capable.

The strongest single pattern is Victor's **control → abstract → step back down**. It can explain a control loop, a compiler pipeline, a distributed system, a data-processing workflow, or a robotic mechanism.

### 4. Pair every demo with an explanation and a fallback

A demo without framing can amuse but not inform. A text explanation without an artifact can be credible but hard to trust. The best references combine:

- a one-sentence invitation;
- the runnable or physical artifact;
- a short explanation of what to notice;
- a diagram or research note;
- source, documentation, or transcript access;
- a static fallback when scripting or motion is unavailable.

### 5. Use hierarchy to manage depth

The recurring architecture is:

- **Front door:** positioning, a small set of proof projects, and clear routes.
- **Selected work:** a few substantial case studies.
- **Lab or archive:** prototypes, experiments, older work, and process notes.
- **Research/writing:** deeper explanations, talks, publications, and references.
- **Colophon/now:** tools, typography, maintenance philosophy, and current focus.

A searchable archive is not an excuse to skip curation. The homepage still needs a point of view.

### 6. Show evidence, including friction

Hardware work becomes credible when it includes test units, suspected failure modes, packaging, firmware, factory constraints, and actual use. Software work becomes credible when it includes a live artifact, tests, source, benchmarks with context, or an explanation of the mechanism.

Do not convert simulations into measured results, team results into individual claims, or usage counts into impact without qualification.

### 7. Let typography carry the reading experience

Use a stable reading voice and reserve expressive typography for navigation or identity. Prefer:

- a comfortable prose measure;
- a clear heading hierarchy;
- captions that explain why an image matters;
- utility or monospace type for metadata and code-adjacent labels;
- reduced-motion support;
- transcripts and text alternatives for visual explanations.

The goal is not minimalism as a style. The goal is to reduce the cognitive cost of understanding.

### 8. Disclose status and maintain the record

Useful labels include date, project status, individual/team role, collaborators, research source, live/demo status, and maturity. Appleton's growth stages, Case's candid archive, and Evans's transcript backlog show that transparency builds more trust than pretending everything is complete.

Owned URLs, plain-text source, clear licensing, and a maintainable publishing system are part of the portfolio's technical credibility.

## Recommended editorial blueprint

A practical synthesis of these references would use the following structure:

1. **Home:** one positioning sentence, three proof projects, a short “what I’m exploring now,” and routes to Work, Lab, Notes, and About.
2. **Work index:** curated cards with problem, role, artifact type, date, and one evidence link.
3. **Case study template:** context → constraints → approach → artifact/demo → system diagram → result → limits → sources.
4. **Lab:** searchable experiments with one-sentence instructions, status, and retirement labels.
5. **Notes/research:** essays, diagrams, talks, and reading notes that explain the thinking behind the work.
6. **Colophon:** typography, accessibility choices, publishing stack, licensing, and maintenance policy.

This blueprint deliberately borrows structures, not copy, code, visual assets, or personal voice. The references are evidence of useful patterns, not permission to reuse their work.

---

## Source list

All sources below are first-party pages and were accessed on **2026-11-25**.

### Bret Victor

- https://worrydream.com/
- https://worrydream.com/LearnableProgramming/
- https://worrydream.com/LadderOfAbstraction/
- https://dynamicland.org/2024/Intro/

### Lea Verou

- https://lea.verou.me/
- https://lea.verou.me/projects/
- https://mavo.io/
- https://colorjs.io/

### Jhey Tompkins

- https://jhey.dev/
- https://jhey.dev/index
- https://jhey.dev/prototypes/2026/pluckable-grid/index.html
- https://jhey.dev/prototypes/2026/esp32-magic-eight/index.html
- https://jhey.dev/prototypes/2026/construct-dense/index.html

### Nicky Case

- https://ncase.me/
- https://ncase.me/projects/
- https://ncase.me/trust/
- https://ncase.me/trust/notes/
- https://blog.ncase.me/explorable-explanations/

### Matt Webb

- https://interconnected.org/
- https://interconnected.org/home/
- https://poem.town/
- https://interconnected.org/home/2024/08/22/matte
- https://interconnected.org/home/2025/07/18/shenzhen
- https://interconnected.org/notes/2014/10/interconnected/42
- https://interconnected.org/home/2024/10/28/colophon

### Maggie Appleton

- https://maggieappleton.com/
- https://maggieappleton.com/about
- https://maggieappleton.com/garden
- https://maggieappleton.com/drawinginvisibles1
- https://maggieappleton.com/programming-pictures
- https://maggieappleton.com/colophon

### Julia Evans

- https://jvns.ca/
- https://jvns.ca/about
- https://jvns.ca/projects/
- https://wizardzines.com/
- https://jvns.ca/blog/2020/12/05/how-i-write-useful-programming-comics/
- https://wizardzines.com/accessibility
