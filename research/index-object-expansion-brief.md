# Index Object expansion — synthesized brief

Status: synthesized from Wayfinder #21 and #22; sent to the four-seat council for sign-off before any prototype.

## Destination

Keep the Index Object landing page as a quiet catalogue cover. Add eight source-safe project pages underneath it, connect them with persistent index-level labels, and borrow only two low-weight interactions. The copy stays nonchalant: it states what is there and what is not claimed, then steps aside.

## What stays

- The existing light paper catalogue, serif statement headline, mono metadata, restrained accent, and focus-reveal dossiers.
- No framework, build step, downloaded fonts, CDN, WebGL, audio, custom cursor, loading gate, scroll-jacking, or off-site runtime request.
- Root v2 instrument-stage site remains untouched. Publication target is `variants/index-object/` until the user explicitly promotes it. A one-line promotion command will be handed over.
- All verified claim boundaries from `info/github-evidence.md` and `info/public-resume-facts.md`. No employer, job title, graduation year, GPU measurement, live-radio claim, fork-as-original, or sole-authorship claim.

## Page architecture

- `variants/index-object/index.html`: unchanged hero abstraction; its Index section becomes the single canonical project list with eight persistent, keyboard-reachable entries, one per project. The current three focus-reveal dossiers are removed, not duplicated — their information is carried by the eight index entries. Numerals, labels, flags and credit strings come verbatim from the content spec. Each entry links to its own page.
- `variants/index-object/projects/<slug>/index.html` for all eight: `chronos-dsp`, `life-os`, `modulation-studio`, `hpc-boost-v2`, `moe-memory-wall`, `riscv-simulator`, `university-erp`, `tasveer`. Each page shares the same CSS/JS via `../../css/style.css` and `../../js/main.js`, one `<h1>`, branded navigation back to the catalogue, and a source link that opens in a new tab.
- `variants/index-object/404.html`: stays branded for paths inside the variant. GitHub Pages serves the repo-root 404 for unknown nested paths; since root v2 is unchanged, that fallback intentionally uses root-v2 navigation. Do not modify the root 404 in this effort.

## Five blocks, in order, on every project page

1. Question — one verbatim "How can …?" question.
2. Mechanism — one architecture paragraph, an original text/SVG diagram described in the content spec, and a plain summary. No numbers here.
3. Evidence & source — evidence class, value rows with conditions and checked date, Source link, notes link, and live-demo link only where re-verified 200 at publish.
4. Guardrail — the verbatim limit line plus boundary conditions. The last substantive content block; the limit is the final editorial word before the neutral route chrome.
5. Route — navigational chrome, not page copy: the exact landing label, `Open project notes →`, `Source ↗ (opens in a new tab)`, live demo where applicable, and checked date. All source/demo links use `target="_blank" rel="noopener noreferrer"`.

Five deep dives (Chronos, Life OS, Modulation Studio, HPC-Boost v2, MoE) fill every block; three archive records (RISC-V, University ERP, Tasveer) keep the same five headings but compact. Archive does not mean uncredited.

## Exact landing / page labels

```
P-01 · Chronos-DSP: from geometry to simulated IQ — Personal project
P-02 · Life OS: local records, adaptive recommendations — Team project · 3 people
P-03 · Modulation Studio: a browser signal lab — Team project · 2 people
P-04 · HPC-Boost v2: Choosing Four Counters, Then Saying No — Research record · v2 team size unverified
P-05 · MoE Memory Wall: Prefetching Experts Under an HBM Budget — Group coursework
P-06 · RISC-V Assembler and Simulator — Team project · 4 people
P-07 · University ERP System — Team project · 2 people
P-08 · Tasveer: A Campus Media Archive — Team project
```

Shelf labels: `The project shelf · 5 deep dives + 3 archive records`, `8 PROJECT RECORDS`, `DEEP DIVES`, `SIDE DRAWER`, `Earlier work, still on the bench.` Flags: Released / Prototype / Live demo / Research / Coursework / Archive. They are evidence descriptors, not job titles.

## Borrowed interactions — exactly two

1. Scroll-linked playhead readout in the Index section. A 2px mono hairline over the index rows, `aria-hidden="true"`, implemented with `@supports (animation-timeline: scroll())` and `@media (prefers-reduced-motion: no-preference)`. No content gating, no images, no JS. Final frame under `reduce` or no support: line at 100% or absent.
2. Letter-spread on non-navigation index entry titles only. Introduce `--dur-base: 220ms` and a new `.index-entry__title` hook as explicit build steps (they are net-new CSS, not existing tokens). Use `.index-entry__title:hover, .index-entry__title:focus-visible { letter-spacing: .08em; }` with that token. `:focus-visible` parity is inherent; under `reduce`, transition-duration `.01ms`. The title sits in a `min-width:0; overflow:hidden; text-overflow:ellipsis` wrapper so the spread cannot move header/nav or overflow at 320px / 1280-at-400%.

Everything else studied was rejected: bar-wipe/JAZZ menu, annotations layer, wet-paint smear, JazzKeys keyboard play, randomized hover thumbnails, click-to-expand slide. Reasons: navigation movement, licensed assets, pointer-only WebGL, key hijacking, unpredictable content positions, and hidden content respectively. No code, fonts, assets, copy, constants or class names from those sites are reused.

## Nonchalant voice

Short declaratives. State what is there and what is not claimed. Let the reader decide. Banned: you should, must see, impressive, powerful, revolutionary, hire me, don't miss, game-changer, cutting-edge, seamlessly, unlock, leverage, urgency. Reference cadence: "Per-binary conditioning added only 0.0045 balanced accuracy on this corpus. The useful result was deciding not to build the router."

Mechanism sentences are concrete and unadorned. Guardrails are plain, never apologetic. No call-to-action tells the reader what to do next beyond the neutral route links.

## Engineering gates

- One `<h1>`, landmarks, skip link, visible `:focus-visible` >=3:1, forced-colors support, AA contrast both supported schemes.
- Primary controls >=44px at 320px; other targets >=24px with the inline-link exception; mono labels >=14px.
- No horizontal overflow at 320/375/1280 or 1280-at-400%-zoom; `overflow-x` visible on html/body; containment via `min-width:0`, bounded `clamp()` and grid.
- WCAG 1.4.12 override: line-height 1.5, letter-spacing .12em, word-spacing .16em, paragraph spacing 2em; verify with `document.documentElement.clientWidth` in a pixel viewport.
- Per-page raw HTML+CSS+inline SVG+JS <=60KB; unique JS per page has two separate ceilings — raw <=20KB and gzip <=8KB — asserted at the build/review gate; CLS=0; local LCP recorded.
- Mechanism diagrams: every new SVG carries `role="img"` with an accessible name and `<title>/<desc>`, or is `aria-hidden="true"` when the adjacent plain summary conveys the same information. Forced-colors contract carried over verbatim: system-color borders and focus, decorative outline numerals hidden. All apply to landing, eight project pages and the variant 404.
- Branded 404; zero console errors; no offsite runtime requests (user-initiated links allowed); required content in initial HTML.
- Keyboard parity for both interactions; no key hijacking; reduced-motion static final frames; no navigation movement.
- Publish rechecks both live demos (Modulation Studio and Tasveer) with curl; a stale Pages workflow is not described as a fresh deployment.

## Evidence

- `research/index-object-content-spec.md` (ticket #21, commit 297fd1e) — verbatim labels, credit, links, guardrails, diagrams, banned-claim scan.
- `research/index-object-interactions.md` (ticket #22, commit 535561c) — source bundles inspected, 8-technique ledger, 2 recommended / 6 rejected, compliance matrix.
