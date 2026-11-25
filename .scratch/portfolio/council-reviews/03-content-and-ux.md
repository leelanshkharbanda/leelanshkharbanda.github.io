# Council Review 03: Content and UX

Date: 2026-11-25  
Role: Technical content strategist and product/UX reviewer  
Status: Recommended for council adoption  
Scope: Content, information architecture, visitor journeys, and recruiter utility. No app-code changes.

## Executive recommendation

Position the portfolio as an **evidence-led engineering portfolio at the software/hardware intersection**, not as a technology-logo wall or an interactive showcase. The first visit should answer three questions quickly:

1. Who is Leelansh, and what kind of problems does he work on?
2. Which projects best demonstrate his judgment and ability?
3. How can a visitor verify the work or start a relevant conversation?

Use three complementary projects on the homepage, five substantial project records under Work, and a compact three-project archive. Every project card and case study must expose **status, collaboration credit, and evidence class** before any performance language. A print-friendly `/resume/` route is worthwhile; a contact form, CMS, and large interactive archive are not.

Safe positioning draft:

> ECE undergraduate at IIIT Delhi exploring signal processing, computer architecture, hardware-counter telemetry, and local-first tools. I build systems and simulations that make technical behavior inspectable, and I document the constraints, evidence, and limits behind them.

This wording is grounded in the public profile and original-repository inventory. It does not claim a job title, availability, employment history, or measured impact.

## Findings and release severity

| Severity | Finding | Required response |
|---|---|---|
| Blocker | Any simulation described as a hardware measurement, team work described as sole authorship, fork described as original work, or unsupported result presented as fact. | Block release until corrected at the card, case-study, résumé, metadata, and visual-caption levels. |
| Blocker | A visitor cannot identify Leelansh, reach project evidence, or contact him with JavaScript disabled or by keyboard. | Keep orientation, project summaries, source links, résumé, and email in semantic HTML with real URLs. |
| Major | The homepage becomes an equal-weight grid of every repository or an animation-gated spectacle. | Feature three projects; move depth to Work; make motion additive and skippable. |
| Major | Project dates, individual contributions, media rights, résumé facts, or availability are guessed. | Omit or neutralize the claim and record the missing fact for user confirmation. |
| Minor | Toolkit content becomes a proficiency chart, or archive navigation grows more complex than the eight-project inventory warrants. | Use factual tool groups and a simple list; defer search and filters. |

## Evidence basis

- [GLOSSARY.md](../../../GLOSSARY.md) requires precise separation of Simulation Result, Measured Result, Collaboration Credit, Project Evidence, and Engineering Narrative.
- [GitHub Evidence](../../../outputs/github-evidence.md) supplies the original-project inventory, safe framings, team/research limits, excluded forks, and media-rights warning. Verified public résumé facts supply team sizes and coordination labels.
- [Editorial Research](../../../outputs/technical-portfolio-research-editorial.md), especially “Strongest lessons” and “Recommended editorial blueprint,” supports mission-led curation, problem-first cards, inspectable artifacts, honest limits, and a shallow front door over deeper work.
- [Quality Research](../../../outputs/technical-portfolio-research-quality.md) supplies the accessibility and resilience gates: keyboard operation, reduced motion, HTML equivalents for visuals, no-JS usefulness, reflow, and real contact paths.
- [Implementation Research](../../../outputs/technical-portfolio-research-implementation.md) supports native scrolling, one compact visual mechanism, and optional enhancement rather than a full 3D world or custom scroll architecture.
- [Council Charter](../council.md) makes factual accuracy, accessibility, and working functionality non-negotiable.

## Strongest first-visit journeys

| Audience | First ten seconds | Next action | Successful outcome |
|---|---|---|---|
| Recruiter | Learns name, ECE/IIIT Delhi context, technical domains, and that selected evidence is available. | Opens one relevant case study, then `/resume/` or the email action. | Can assess role fit, project maturity, and Leelansh's contribution without decoding a visual effect. |
| Engineer | Sees a concrete engineering question rather than a generic “passionate developer” claim. | Opens Chronos-DSP or another relevant case; inspects mechanism, evidence class, source/tests/report, and limits. | Can tell what was built, how it works, what was observed, and what remains unproven. |
| Collaborator | Sees recurring themes and honest project status. | Reads About, opens a matching project, and emails with a role or project-specific subject. | Knows what Leelansh is exploring and what kind of conversation to start. |

Shared route: **orient → select relevant evidence → inspect → verify → contact**. There is no required intro, drag, scroll milestone, or animation before this route is available.

### Homepage section order

1. **Orientation hero:** name, one-sentence positioning, program/domain context, primary “View selected work” action, secondary résumé link, and visible email/contact route. No availability badge unless confirmed.
2. **Selected work:** exactly three cards—Chronos-DSP, Life OS, and Modulation-Studio. Each card carries a one-sentence question, status, role, evidence class, and case-study link.
3. **About/toolkit preview:** three recurring themes and a short link to About. Do not repeat the full biography or tool inventory.
4. **Contact:** brief invitation for role or project conversations, visible email, copy action, GitHub, and LinkedIn.
5. **Footer:** current-content date, résumé, source/profile links, and a plain-text contact fallback.

### Site-wide navigation and deeper routes

- Primary navigation: **Work → About → Résumé → Contact**, with the name/logo returning home.
- **Work:** five featured project records in the order below, followed by a clearly separated three-item archive.
- **Case study:** summary → evidence → source/limits → next relevant project. Always provide a visible “Back to Work” route.
- **About:** short bio → recurring questions → toolkit → working principles → contact.
- **Résumé:** standalone, printable, text-first route at `/resume/`.
- **Contact:** use a home section and footer rather than a separate form page in the first release. The nav link must be a real, stable URL or anchor.

## Featured versus archive projects

### Homepage features and full case studies

| Order | Project | Why it earns depth | Mandatory framing | Depth |
|---|---|---|---|---|
| 1 | **Chronos-DSP** | Strongest single narrative: ray geometry to simulated received IQ, with a release and tests. | Personal engineering project; **Simulation Result**; v0.3.0 release and tests; geometric-channel software simulation, not calibrated RF, hardware measurement, or proven hard-real-time software. | Full flagship |
| 2 | **Life OS** | Adds product and local-first systems breadth beyond signal processing; shows architecture and adaptive-recommendation decisions. | Team prototype (3 people); artifact/source evidence; no release or measured performance claim; optional network integrations mean **not fully offline**. | Full flagship |
| 3 | **Modulation-Studio** | Live browser-based signals lab for engineers and collaborators, with clear interaction and tests. | Team project (2 people); **Simulation Result**; demo returned HTTP 200 on 2026-11-25, but the latest Pages workflow had an artifact lookup failure; availability does not establish deployment health. | Full flagship |
| 4 | **HPC_Boost** | Demonstrates research integrity through grouped validation and negative findings rather than a victory claim. | The résumé lists a two-person project without specifying a version; the repository contains an earlier imported report with different authors and later v2 results. Keep those histories distinct. Use “Measured Result” only for rows tied to recorded hardware-counter runs and documented conditions. | Medium case study |
| 5 | **MoE-Memory-Wall-CA-Project** | Adds computer-architecture and memory-system depth with a clear constrained-budget question. | Group coursework; **Simulation Result** using synthetic/calibrated routing; no measured Mixtral/GPU speedup claim. | Medium case study |

### Compact archive

| Project | Archive framing | Limits |
|---|---|---|
| **RISC-V-Assembler-and-Simulator** | Team project (4 people) making RV32I-subset instruction execution inspectable. | Subset, not complete RV32I; simulator behavior is not a hardware measurement. |
| **AP_Project** | Coordinated team desktop ERP product work (2 people). | Do not attribute all UI/service work individually; no adoption or business-impact claim. |
| **tasveer** | Coordinated team work on a campus-media archive and editorial experience with a live site; team size not verified. | Text/repository evidence only until media rights and photographer consent are established. |

The archive is not a dumping ground: each entry gets a human title, one-sentence purpose, role/status, source link, and one explicit limit. With eight original projects total, a simple chronological or thematic list is sufficient; search, filters, counts, and tag taxonomies are deferred.

**Promotion gates:** tasveer may become a feature only after credit and media permissions are confirmed. HPC_Boost and MoE may receive deeper treatment only after exact individual contributions, collaborator names, dates, and experimental provenance are confirmed. Conversely, stale demos or unsupported claims demote a project rather than remaining featured.

## Project-card schema

Every homepage, Work, and archive card should use the same compact structure:

1. Human-readable project title; repository slug only in the source link.
2. One-sentence problem or engineering question.
3. Status: released, live demo, prototype, research, coursework, or archived.
4. Role: individual, team project, team research, or group coursework; include verified team size; name collaborators only when verified.
5. Evidence class: Simulation Result, Measured Result, or artifact/source evidence.
6. One primary action—usually “Read case study”—plus a direct source, report, or demo link.
7. A visible limit when the project is commonly misunderstood.

Avoid “Impact” as a default card heading. Use “Outcome” only when an observed result exists; otherwise use “Evidence” or “What this shows.”

## Case-study schema and depth

### Required case-study schema

1. **Title and question:** what problem or behavior is being made understandable?
2. **At a glance:** status, date if verified, role, collaborators, evidence class, and artifact links.
3. **Recruiter summary:** approximately 80–120 words covering the problem, Leelansh's contribution, artifact, and outcome/limit.
4. **Context and constraints:** user or research need, resource budget, system boundary, and assumptions.
5. **Mechanism:** signal path, architecture, data flow, or decision log; one original diagram with a text equivalent.
6. **Contribution and credit:** separate individual work, team work, upstream work, and unknowns.
7. **Artifact:** live demo, release, source, tests, or report; one-sentence instruction describing what to notice.
8. **Results:** a compact evidence ledger, including negative findings.
9. **Limits and non-claims:** what was not measured, not built, not calibrated, or not validated.
10. **Reproducibility and next step:** source/tests/report, current status, and unresolved work.

### Results ledger

Use a table with these columns: **Claim | Value or observation | Evidence class | Method and conditions | Source**. Never publish a number without its method, conditions, and source. If no performance result exists, say “No performance claim” rather than leaving an ambiguous gap.

Evidence labels must be adjacent to results, chart captions, demo controls, and résumé bullets—not hidden in a footnote:

- **Simulation Result:** model-generated output under stated assumptions.
- **Measured Result:** physical-hardware or external real-world observation under reproducible conditions.
- **Artifact/source evidence:** working code, tests, release, live demo, or report that demonstrates implementation without implying measured impact.
- Demo HTTP availability is artifact evidence, not evidence of adoption, reliability, or performance.

### Depth tiers

| Tier | Target length | Required media/interaction | Use for |
|---|---:|---|---|
| Full flagship | 900–1,400 words | One original static diagram; at most one bounded demo; optional collapsible implementation notes. | Chronos-DSP, Life OS, Modulation-Studio |
| Medium case study | 500–800 words | One diagram or research figure redrawn from verified data; source/report links; no required live demo. | HPC_Boost, MoE-Memory-Wall |
| Archive entry | 150–300 words | No required custom visual; source/live link and explicit limits. | RISC-V, AP_Project, tasveer |

These lengths are editorial policy, not external standards. Keep the summary, role, evidence class, and limits visible even when deeper notes use `<details>`. Do not force every project into an interactive explanation.

## About and toolkit content

### About content

Keep About to approximately 250–400 words:

- **Identity:** Leelansh Kharbanda, ECE undergraduate at IIIT Delhi.
- **Recurring questions:** how signal behavior becomes visible; how architecture and memory constraints shape systems; how local-first tools can remain understandable and inspectable.
- **Working principles:** evidence before claims, explicit constraints, readable mechanisms, and honest limits. Ground these in the project record rather than inventing personality traits.
- **Current focus:** use only if Leelansh confirms it. Until then, label the section “Recurring themes,” not “Now.”
- **Contact:** one sentence inviting relevant role or project conversations without asserting availability.

### Toolkit content

Group tools by how they appear in the verified work; do not use percentages, star ratings, or “expert/advanced” labels.

- **Languages:** Rust, JavaScript, Python, C++, Elixir, Java, SQL.
- **Frameworks and systems used in projects:** Phoenix, Tauri 2, React 19, SQLx/SQLite, ONNX, LanceDB.
- **Methods and domains:** signal processing, geometric channel modeling, QPSK/BER simulation, FFT/constellation analysis, PMU experiments and grouped validation, expert prediction/prefetching under memory constraints, tests and releases.
- **Practices:** source-linked narratives, reproducible experiment notes, explicit team credit, and text alternatives for technical visuals.

Keep project-specific tools in case studies. The About toolkit should explain recurring capability areas, not reproduce every dependency.

## Contact behavior

- **Primary action:** visible institutional email already published in the public profile—`leelansh24319@iiitd.ac.in`—as the safe default until Leelansh supplies a preferred address.
- Provide a `mailto:` link with a neutral subject such as “Portfolio inquiry” or “Project collaboration,” plus a **Copy email** action.
- Always display the address as selectable text. If Clipboard API support or permissions fail, the user must still be able to select or use the `mailto:` link.
- Copy feedback must be programmatically announced and must not replace the address or move focus unexpectedly.
- Secondary links: current GitHub profile and LinkedIn profile. Do not use stale `breaking-byts` links.
- Use neutral language: “Email about a role or project.” Do not claim “Open to work,” response times, timezone, location, or scheduling availability until confirmed.
- Do not add a contact form, upload flow, calendar embed, tracking pixels, or marketing subscription in the first release. A form without a maintained backend creates delivery and privacy risk without improving the core journey.

## Print-friendly web résumé

**Recommendation: yes.** A `/resume/` route is a low-cost recruiter utility and a useful content discipline. It should be generated from the same verified facts as About and Work, not maintained as an unrelated document.

Required content:

- Name, concise positioning, verified contact links, and education (IIIT Delhi, ECE undergraduate).
- Three to five selected project entries with role, status, evidence class, and one outcome or artifact line.
- Relevant toolkit grouped by category.
- Optional education dates, employment, publications, awards, GPA, location, or work authorization only after user confirmation.

Required behavior:

- Semantic, selectable text; standard headings; no icon-only facts.
- `@media print` removes navigation, motion, decorative visuals, and nonessential controls.
- Readable in black and white, with no clipped text or hover-dependent links.
- Target one page at both A4 and Letter; verify browser print output rather than assuming it.
- Provide a “Print / Save as PDF” action, but keep the route useful without JavaScript.
- A separately downloadable PDF is optional and should ship only after the text is verified and the PDF is checked for selectable text, tags/reading order, and visual output.

Tradeoff: the résumé adds another maintained surface. Single-source content and a narrow scope keep that cost small; omitting it would make recruiters reconstruct basic facts from case studies.

## Explicit exclusions

### Content exclusions

- Forks presented as original work: AionUi, ecapture, hive, and posthog.
- Unsupported employment, credentials, awards, adoption, client logos, testimonials, or quantitative impact.
- Simulation described as benchmark wins or measured speedups; Chronos described as calibrated RF/proven hard-real-time; MoE described as measured Mixtral/GPU acceleration; HPC described as a deployed detector.
- Sole-authorship language for Modulation Studio, Life OS, HPC_Boost, MoE-Memory-Wall, RISC-V, AP_Project, or tasveer.
- Life OS described as fully offline; RISC-V work described as complete RV32I.
- Tasveer or repository screenshots reused as portfolio media before rights and consent are confirmed.
- Home address, date of birth, school results, CGPA, or other unnecessary personal data.
- Skill percentages, generic “passionate developer” prose, and technology lists without a project connection.
- Reference-site code, assets, branding, prose, or personal voice.

### Experience exclusions for the first release

- Contact form/backend, CMS, authentication, analytics/data collection, or newsletter system.
- Search, filters, tag clouds, and archive counts for an eight-project inventory.
- Full 3D world, physics, scroll hijacking, artificial long scroll surfaces, persistent custom cursor, intro gates, or autoplay audio.
- Motion as the only way to reach content, verify a project, or contact Leelansh.
- A separate résumé PDF before its facts and output are verified.
- Publishing or deployment decisions, which remain outside this content/UX review.

## Missing user facts and safe defaults

| Missing fact | Safe default until confirmed | Release effect |
|---|---|---|
| Target roles, seniority, and availability | Neutral ECE/domain positioning; no “Open to work” badge or job-title claim. | Recruiter CTA remains usable without inventing availability. |
| Preferred public email and privacy preference | Use the already-published institutional email with visible text, copy, and `mailto:`. | Replace before release if Leelansh requests another address. |
| Project dates | Omit dates; use status labels and a site-level “Evidence checked 2026-11-25” note. | Do not guess chronology. |
| Exact individual contributions and collaborator names | Label team project/research/coursework and state that detailed role credit is pending. | Team projects may ship only with non-misleading general credit. |
| Education dates, employment, awards, publications, GPA, location, work authorization | Include only corroborated institute/program and project facts. | Keep these fields out of About and résumé until verified. |
| Canonical demo/source URLs, licenses, and current deployment health | Link only verified repositories/artifacts; label demo check date; make no license or uptime claim. | Check all links again at release. |
| Media reuse rights and photographer consent | Text-only tasveer archive entry; use newly drawn portfolio diagrams elsewhere. | No third-party project imagery until permission is documented. |
| Numerical results and experimental conditions | Publish only values supported by source/report with method and evidence class. | Omit unsupported comparisons and impact language. |
| Contact response expectations or scheduling | Plain email; no SLA, calendar, or automated promise. | Avoid operational commitments. |
| Headshot and personal biography details | Text-only identity and project-grounded bio. | No stock photo or invented personal story. |

## Acceptance criteria

- **AC-CUX-01 — Orientation:** A first-time visitor can identify Leelansh, his program/domain context, and the site's purpose from the initial viewport without starting an animation.
- **AC-CUX-02 — Recruiter path:** From home, a recruiter can open one case study, reach `/resume/`, and reach a usable email action without scrolling through the archive.
- **AC-CUX-03 — Engineer path:** From any featured card, an engineer can find the question, mechanism, role, evidence class, source/report, and limits without interpreting a canvas or hover state.
- **AC-CUX-04 — Collaborator path:** A collaborator can identify recurring themes, inspect project status, and start a role/project-specific email from About or Contact.
- **AC-CUX-05 — Curation:** Home shows exactly three featured projects; Work shows five featured records and three archive entries; excluded forks do not appear as original work.
- **AC-CUX-06 — Card consistency:** Every project card includes status, role/collaboration credit, evidence class, a primary action, and any critical limit.
- **AC-CUX-07 — Claim traceability:** Every numerical or comparative claim has a source, method, conditions, and evidence class. No simulation is labeled measured; no availability check is labeled reliability or adoption.
- **AC-CUX-08 — Case-study completeness:** Every featured record follows the required schema. Summary, role, evidence class, negative findings, and limits remain visible when optional details are collapsed.
- **AC-CUX-09 — Team credit:** Modulation Studio (2), Life OS (3), HPC_Boost (2 per résumé, with the inherited report and later v2 results kept distinct), MoE group coursework, RISC-V team project (4), AP_Project team project (2), and tasveer coordinated team work are labeled as team work at card, case-study, résumé, and metadata levels; no unverified teammate is named.
- **AC-CUX-10 — Media and visuals:** Project visuals are original/redrawn or have documented permission; diagrams and demos have equivalent text/table explanations.
- **AC-CUX-11 — About/toolkit accuracy:** About contains only corroborated identity and themes; toolkit entries map to verified project use and contain no proficiency scores.
- **AC-CUX-12 — Contact resilience:** Email, GitHub, and LinkedIn work by keyboard and without JavaScript. When JavaScript is available, Copy email works by keyboard and fails safely to the visible address or `mailto:` link. No form, tracker, or unverified availability claim is present.
- **AC-CUX-13 — Résumé utility:** `/resume/` is text-first, matches verified portfolio facts, preserves role/evidence labels, and prints cleanly on one A4 and one Letter page in black and white.
- **AC-CUX-14 — Navigation and resilience:** Work, About, Résumé, Contact, case studies, and source links use real URLs; direct loads, reloads, and browser back/forward retain meaningful focus and position. Core content remains available with JavaScript disabled.
- **AC-CUX-15 — Accessibility:** All journeys pass keyboard-only operation, visible/unobscured focus, 200% text, 320 CSS px reflow, text-spacing overrides, reduced motion, and screen-reader reading-order checks. Primary touch targets are at least 44×44 CSS px.
- **AC-CUX-16 — Motion discipline:** There is no autoplay audio, intro gate, scroll hijack, or motion-only evidence. Continuous demos can pause; reduced motion shows useful static states immediately.
- **AC-CUX-17 — Link and status review:** All source, demo, résumé, GitHub, LinkedIn, and email links are checked at release; stale or failed artifacts are labeled, demoted, or removed.
- **AC-CUX-18 — Exclusion audit:** No fork, unlicensed media, unsupported metric, invented personal fact, copied reference asset, or speculative backend feature appears in the first release.

## Council tradeoffs

- **Three homepage projects over total inventory coverage:** sacrifices immediate visibility of every repository, but gives recruiters a legible front door and preserves the rest through Work.
- **Five case studies over eight deep pages:** concentrates writing where evidence and narrative are strongest; archive entries prevent coursework and older team work from being inflated.
- **Print résumé over PDF-first workflow:** adds a maintained route, but single-source content reduces drift and keeps recruiter utility accessible.
- **Email over contact form:** offers less structured intake, but avoids backend, privacy, and deliverability risk while Leelansh's preferences are unknown.
- **Static evidence over spectacle:** may be less immediately novel, but directly demonstrates the engineering judgment the portfolio is meant to communicate.

## Re-check before council closure

Run the three persona walkthroughs on desktop, narrow mobile, keyboard-only, reduced-motion, and no-JavaScript states. Audit every result label against the underlying repository/report, every team label against contribution facts, and every résumé line against verified user facts. Any blocker or major issue keeps this review open.
