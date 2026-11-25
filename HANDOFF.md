# Handoff — personal portfolio

Live site: https://leelanshkharbanda.github.io/
Source: https://github.com/leelanshkharbanda/leelanshkharbanda.github.io (branch `main`, root published via GitHub Pages)

## What is here

- `index.html` — single-page portfolio: hero with an interactive QPSK/AWGN "tune the channel" monitor, three case studies (Chronos-DSP, Modulation Studio, MoE Memory Wall), a short thinking note, a four-project index, about, and contact.
- `css/style.css` — token-driven CSS: two neutrals plus one signal accent, light/dark themes, fluid type, 12-column grid, reduced-motion and no-JS paths. No downloaded fonts, no framework.
- `js/main.js` — one dependency-free ES module (2,361 bytes), deterministic seeded waveform/constellation. Adds `.js` only after successful init, so a failed load leaves working static content.
- `404.html` — branded 404 with the same tokens and navigation.
- `.nojekyll` — serves the static files directly.
- `research/` — sourced research and the council-approved design brief (development record).
- `docs/agents/` — engineering-skills configuration (issue tracker, triage labels, domain docs).

## Build → review → refine record

- Wayfinder map: issue #1, with eight decision tickets (#2–#9). All resolved.
- Research: verified GitHub identity (profile README + all original repos), real HTML/CSS/JS source study of eight Awwwards/engineering portfolios, and primary-source WCAG/Core Web Vitals/GitHub Pages rules.
- Prototype council: first pass approved by frontend and visitor; art director and accessibility findings fixed and re-verified to unanimous approval.
- Build council, round 1: art director and accessibility withheld findings (sparse later chapters, bare local 404, text-spacing overflow); frontend withheld on the same 404; visitor gave two low-severity copy notes.
- Build council, round 2: all four seats approve. Every finding was fixed and re-verified with its exact repro. The visitor's last voice note was applied afterwards ("which I coordinate").

## Measured gates (local lab, 2026-11-25)

- First paint at 1280x800: FCP/LCP 376 ms, LCP element = `h1`; at 360x740: 52 ms. CTA and contact links above the fold at both sizes. These are local lab numbers, not field CrUX data.
- Transfer: ~28 KB total (HTML 14,578 B, CSS 10,165 B, JS 2,361 B encoded). Zero off-site runtime requests.
- Contrast verified numerically in both themes: light ink 15.86:1, muted 6.46:1, signal 5.70:1, borders 4.37:1; dark ink 15.70:1, muted 9.38:1, signal 7.37:1, borders 7.26:1. Signal is never used as text on ink.
- Keyboard, touch, screen-reader readout, no-JS, reduced motion, 404 route (`/nope` → 404 with the branded page), reflow at 320/360/640/1280, and the WCAG text-spacing override all passed independent re-verification.
- JS size 2,361 B (budget 15 KB); no external scripts, fonts, CDN assets or analytics.

## Ship-then-veto defaults (you were absent; these are the decisions I made for you)

1. Published the email and LinkedIn from your own public profile README. LinkedIn returned HTTP 200 on 2026-11-25. Say the word and I will remove either.
2. Used `leelanshkharbanda.github.io`, not a custom domain.
3. No photo or avatar — the identity is typographic/code-native, as the brief specified. If you want a portrait, send one and I will add it.
4. Hero case studies: Chronos-DSP, Modulation Studio, MoE Memory Wall, chosen for verifiable technical detail and a working demo. RISC-V, HPC_Boost, Life OS and Tasveer sit in the compact index.
5. Did **not** create `AGENTS.md` or `CLAUDE.md`: writing those protected files needs your explicit approval. Their configuration already lives in `docs/agents/*.md`.

## Residual risk / what only you can judge

- The aesthetic verdict is council-based; your own visual judgement outranks it. Screenshots are at `.scratch/prototype-shots/` and `.scratch/refs/` in the working directory (not published).
- Field Core Web Vitals are unmeasured until real traffic arrives; local lab numbers are proxies.
- Claims are deliberately conservative: no employer, job title, completed degree, graduation year, forks as your work, simulation as real hardware measurement, or unpublished-app user claims. If any of those are now true and you want them on the site, tell me with a source.
- `research/` is served by Pages as static files. It contains only source-cited public notes, no private data or internal council splits.

## Editing locally

Open `index.html` directly, or serve the folder with any static server. The site needs no build step. Push to `main` to publish.
