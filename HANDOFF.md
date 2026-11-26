# Handoff — personal portfolio (v2)

Live site: https://leelanshkharbanda.github.io/
Source: https://github.com/leelanshkharbanda/leelanshkharbanda.github.io (branch `main`, root published via GitHub Pages)

## What is here

- `index.html` — single-page portfolio in the council-approved "instrument stage" art direction: hook-first hero with an original oversized signal glyph, a real Chronos-DSP ray-path artifact (LoS / image-source reflection / knife-edge diffraction), a live QPSK/AWGN readout, a real-value measurement rail, three project datasheets (Chronos-DSP, Modulation Studio, MoE Memory Wall), four-item index, about and contact.
- `css/style.css` — surface-bound tokens (paper/stage ink, muted, signal, stage-signal, decorative/UI rules), light/dark themes, system sans + mono + one serif-italic accent on "trace.", reduced-motion/no-JS final frame, forced-colors support. No downloaded fonts, no framework.
- `js/main.js` — one dependency-free ES module (3,907 B raw / ~1.68 KB gzip): deterministic seeded signal render on trusted input, DPR-capped IO-gated decorative canvas. Adds `.js` only after successful init.
- `404.html` — branded on-brand 404 with the same glyph and navigation.
- `.nojekyll` — serves the static files directly.
- `research/` — sourced GitHub identity study, Awwwards/source-level pattern studies, v1 brief, v2 elevation sources/visual/technical notes, and the signed-off `elevation-brief.md`.
- `docs/agents/` — engineering-skills configuration (issue tracker, triage labels, domain docs).

## Build → review → refine record

- Wayfinder v1 map: issues #1 and #2–#9, all resolved. v2 elevation map: #10 with research #11–#13 and brief #14, all resolved.
- v1 shipped and council-approved, then the baseline council scored it 6–7/10 and demanded a structural leap rather than a tidy refinement.
- 18 new award-site sources were decoded from real HTML/CSS/JS and screenshots; lineage: matvoyce (glyph-as-landscape), cydstumpel (two-ink system + real-value marquee), kernsociety/CRL (dark field + numeric state), robinpayot (one pinned-stage moment). Loader veils are explicit anti-goals.
- v2 brief took four council seats three rounds to sign off: surface-bound color tokens, decoupled glyph scale, accessible ray-path SVG, no-JS control semantics, final-frame base rule, and exclusion of dev-only instrumentation.
- Prototype council: first pass withheld by art director and accessibility; six visual + three accessibility fixes applied, re-captured, and unanimously approved.
- Full build council: three seats requested fixes (marquee fade, About headline, rail label, footer target size); all fixed and re-verified before deployment.
- Production council: final live-site verification by all four seats.

## Measured gates (2026-11-25)

- Live: `/` 200 with v2 HTML (18,018 B), CSS 15,753 B, JS 3,901 B; `/nope` HTTP 404 serving the branded page; three `article.case` datasheets; zero off-site runtime requests; zero console errors.
- Local DCL/load 55 ms; no web fonts; no horizontal scroll at 320/390/1280; slider keyboard-verified; no-JS and reduced-motion paths verified; dev instrumentation absent from shipped JS.
- Contrast verified numerically in both themes: ink/paper 15.93, muted/paper 4.76, signal/paper 4.73, stage-ink 16.81, stage-muted 7.94, stage-signal 6.22. Accent tokens are surface-bound; no single red clears 4.5:1 on both surfaces.
- All interactive targets >=44px at 320px (including footer); mono labels >=14px; 320px WCAG text-spacing override passes; four meaningful SVGs with `role="img"` + title/desc and adjacent text; decorative layers `aria-hidden`.
- Field Core Web Vitals remain unmeasured until real traffic; local lab numbers are proxies.

## Ship-then-veto defaults (you were absent; these are the decisions I made for you)

1. Published the email and LinkedIn from your own public profile README, as in v1. Say the word and I will remove either.
2. Kept `leelanshkharbanda.github.io` with no custom domain.
3. No photo or avatar — the identity is a quiet typographic lockup, not the headline.
4. Kept the conservative claim set: Chronos-DSP is a simulator, MoE numbers are simulation from a group course project, Modulation Studio scheme counts are not asserted, no employer/job title/graduation year, forks excluded.
5. Did **not** create `AGENTS.md` or `CLAUDE.md`: writing those protected files needs your explicit approval. Their configuration already lives in `docs/agents/*.md`.

## Residual risk / what only you can judge

- The aesthetic verdict is council-based (final scores 9–10/10); your own visual judgement outranks it. Screenshots are in `.scratch/elevation-shots/v2build/` and `.scratch/elevation-shots/v2live/` (not published).
- The 320px simulation caption begins at the fold; it is not clipped, and CTA/links are fully visible. Optional future polish: trim hero top padding at <=360px.
- `research/` is served by Pages as static files. It contains only source-cited public notes, no private data or internal council splits.

## Production-ready variants (added 2026-11-25)

Four complete alternative directions now ship under `/variants/`, each with its own council-approved build and a preview in the chooser page:

- `field-notes/` — warm editorial dossier, Palatino display, numbered annotation rails. Full four-seat council approved after one fix round (final 9/9/9/9).
- `signal-lab/` — dark modular instrument bench with honest tabbed channel models. Full four-seat council approved after one fix round (final 9/9/9.5/9).
- `kinetic-atlas/` — cinematic dark/light chapters, recurring impulse trace, scroll-linked reveals. Full council approved; three low residuals (header ghosting, 13px labels, 6px eyebrow overlap) fixed and re-confirmed (final 9.5/9.5/9/10).
- `index-object/` — light catalogue cover, serif statement headline, focus-reveal dossiers. Full council approved; two low residuals (320px mid-word wrap, text-spacing URL overflow) fixed and re-confirmed (final 9/10/10/10).

All four: one h1, 3 case studies, branded 404, no external runtime requests or fonts, no JS build step, AA contrast, 44px targets, 320px reflow, no-JS and reduced-motion fallbacks, and no claims beyond the verified GitHub record. The harness injects a 🐴 into `document.title` in screenshots; the served HTML is clean.

Open `https://leelanshkharbanda.github.io/variants/` to choose. The original v2 instrument-stage build remains the root site.

## Expanded Index Object (added 2026-11-26)

`variants/index-object/` is now a complete portfolio: the original abstract cover plus eight local project pages under `projects/<slug>/`. Each page uses the question → mechanism → evidence → guardrail → route structure, verified credit labels, original diagrams, verbatim limits, and source links. The eight-entry index is the single canonical project list; the old three dossiers are gone. Two CSS-only interactions were borrowed from award-site research (a scroll-linked playhead readout and letter-spread on non-nav titles with focus parity); six heavier patterns were rejected. Copy is deliberately nonchalant.

Final build council: art director 9.7, visitor 9.5, frontend 9.9, accessibility 9.6 — all >=9.5. The last low diagram-label residual was fixed and re-measured. Screenshots: `.scratch/elevation-shots/index-object-expansion/`. Source notes: `research/index-object-expansion-brief.md`, `research/index-object-content-spec.md`, `research/index-object-interactions.md`. Wayfinder map: issue #20.

The supplied `info/` folder was used as content only. Its HTML is not copied, linked, served, or committed; `info/` is gitignored along with `.DS_Store`.

Root v2 is intentionally unchanged (council decision on promotion ticket #28). To promote Index Object to the root later, first preserve the current root, then copy the variant over it:

```
mkdir -p variants/instrument-stage
cp index.html 404.html variants/instrument-stage/
cp -R css js variants/instrument-stage/
rsync -a variants/index-object/ ./
git add -A && git commit -m "promote: Index Object to root" && git push
```

## Production polish (added 2026-11-26)

The two earlier borrowed interactions are gone. The hover letter-spread was bad UX (type distortion with no payoff), and the scroll playhead duplicated the browser scrollbar. Both were rejected by the user and by council.

The shipped interaction is one real scope filter on the project index: All / Deep dives / Archive. It uses native `aria-pressed` buttons, a polite live count, and the `hidden` attribute so out-of-scope records leave the view, tab order and accessibility tree together. Out-of-scope rows are never dimmed. An earlier fixed-height version left dead gaps and was rejected by the fifth-seat arbiter; the list now collapses naturally, with only user-initiated reflow.

Also fixed: duplicate Projects/Index nav targets, forced-colors grid overflow, eyebrow separators leading wrapped lines, internal jargon in visitor copy, stale 404 copy, and external links missing `target="_blank" rel="noopener noreferrer"`. The expansion brief was formally amended so no signed-off interaction remains unimplemented.

Final local council: art director 9.7, visitor 9.45 before publication (blocked only on live URL), frontend 9.7, accessibility 9.6 — all dimensions >=9.0 and zero site findings. Evidence: 33 screenshots in `.scratch/elevation-shots/index-object-polish/`, full edge results in `.scratch/index-object-polish/results.md`, research in `research/index-object-polish-interactions.md`, and the arbiter ruling on Wayfinder #32.

Root v2 remains untouched. The promotion command in the previous section still applies.

## Editing locally

Open `index.html` directly, or serve the folder with any static server. The site needs no build step. Push to `main` to publish.
