# Leelansh Kharbanda — Portfolio

Personal project showcase for signal processing, computer architecture, hardware telemetry, and local-first software. The live site uses the dithering-led **Project Playground** direction: ordered-dither texture, original project diagrams, and a cursor-local evidence lens.

**Live:** https://leelanshkharbanda.github.io/

## Stack

- Astro 7 static multipage site
- React 19 for the Chronos-DSP Trace Inspector island
- TypeScript, Zod-validated Markdown content, and Vitest
- Playwright + Axe for cross-browser and accessibility checks
- Self-hosted variable fonts and original SVG/Canvas visuals

## Local development

Requires Node.js 24.

```bash
npm ci
npm run dev
```

Open the local URL printed by Astro.

## Commands

```bash
npm run check          # Astro and TypeScript diagnostics
npm test               # Unit tests
npm run build          # Checks, tests, and static build to dist/
npm run preview        # Preview the production build
npm run verify         # Formatting, build, budgets, HTML, and Playwright
```

For end-to-end tests, install the Playwright browsers first:

```bash
npx playwright install
npm run test:e2e
```

## Content

- `src/content/projects/` — project case studies and facts
- `src/data/` — site facts, curation, schema, and labels
- `src/pages/` — Home, Work, About, résumé, and case-study routes
- `src/components/` — cards, diagrams, SignalToy, and shared UI
- `src/components/react/` — the interactive Trace Inspector
- `src/styles/` — global, Playground, and dithering styles
- `public/` — fonts, favicon, and social artwork

Project drafts default to hidden. Keep simulation, measurement, team credit, and source links explicit when editing content.

## Deployment

Pushes to `main` trigger `.github/workflows/deploy.yml`. The workflow builds the Astro site and deploys `dist/` directly to GitHub Pages. Set `SITE_URL` to override the default production origin.
