# Council Review 09: Engineering Implementation

Date: 2026-11-25  
Role: Principal engineer  
Verdict: **Hold — no current-content Blocker, but three Major release gates remain.**

The implementation substantially follows Council Decision 03 and Engineering Review 04: Astro static multipage output, validated Markdown, one `client:visible` React island, native navigation, original SVG, self-hosted fonts, and no SSR/CMS/router/third-party runtime.

## Verification performed

- `npm run check`: 0 errors, warnings, or hints.
- `npm test`: 40/40 passed.
- `npm run build`: 13 static pages plus sitemap and robots generated.
- `npm run test:e2e`: 55 passed, 2 Clipboard tests skipped in Firefox/WebKit.
- `npx --no-install html-validate dist`: clean; a generated-output internal-link scan found no broken local targets; `npm audit --omit=dev`: 0 vulnerabilities.
- Fresh byte audit: CSS **6,802 B gzip**; fonts **43,244 B**; homepage executable inline JavaScript **528 B gzip**. Inspector chunks total **73,263 B gzip** (`4,419 + 65,821 + 3,023`), within the 75 KB on-demand and 200 KB cumulative ceilings. No remote runtime assets were found. These are local measurements; Review 07's Lighthouse figures remain lab-only.

## Blocker

None found in the current eight-project output. Team credit, evidence labels, source links, limits, and the 3/5/3 curation are present.

## Major

1. **Required failure and accessibility verification is incomplete.** `tests/e2e/portfolio.spec.ts:42-53` covers no-JS only on home and Chronos; `:160-176` scans only four routes in their initial state. There are no island-chunk abort, font failure, denied Clipboard/storage, live reduced-motion change, print, or resource-budget tests. Review 07:45-50 also acknowledges missing real devices and screen readers. Review 04:295-314 defines these as release gates. **Smallest fix:** add the targeted Playwright failure/budget/print cases, run them in CI, and complete the documented real-device and NVDA/VoiceOver/TalkBack smoke matrix before public release.

2. **The production URL and hosting contract are not settled.** `astro.config.mjs:6` hardcodes GitHub Pages as `site`; `.scratch/portfolio/map.md:22` still lists the final deployment target/domain as unspecified; Review 07:50 says host, caching, compression, and security headers are unconfigured. This leaves canonicals, sitemap, Open Graph URLs, HTML caching, immutable asset caching, security headers, and true hosted 404 behavior unverified. **Smallest fix:** confirm one production origin, make it an explicit required build setting, configure host headers/cache/404 rules, then test deployed deep links and regenerate metadata.

3. **Publishing safeguards fail open.** `src/content.config.ts:60` defaults omitted `draft` values to `false`, contrary to Review 04:140. `package.json:12` runs only `astro build`; unit/content tests are separate. Additionally, `src/pages/index.astro:11-14`, `src/pages/work/index.astro:10-12`, and `src/pages/resume.astro:9-11` silently discard missing curated entries. **Smallest fix:** default drafts to true, gate build/CI on `verify`, throw on unresolved/draft curated slugs, and test draft exclusion from routes, cards, résumé, and sitemap.

## Minor

- **No-JS inspector detail is source-stage-only.** `TraceInspector.tsx:21-24,116-120,165-177` server-renders source metrics and disabled controls; the external summary at `src/pages/work/[...slug].astro:107-120` lacks per-stage metrics. Core evidence survives, but not Review 04's full static equivalent. **Fix:** render an all-stage static table or native `<details>` sections beside the island.

- **React consumes nearly the entire inspector allowance for simple state.** `TraceInspector.tsx:20-55` uses only stage state and three buttons, yet shared React chunks bring the island to 97.7% of its 75 KB cap. Review 04:162 explicitly permits removing React when unjustified. **Fix:** prefer a small vanilla component, or retain React with an enforced byte gate and recorded complexity rationale.

- **“Zero JavaScript” is not literally met or fully reported.** `Footer.astro:32-65` injects a 523-byte inline module (270 B gzip) on Work and other content routes; Review 07's asset list omits inline scripts. **Fix:** count all executable bytes and either document this bounded exception or scope the motion enhancement to routes that need it.

- **Identity/configuration can drift.** `BaseLayout.astro:54-59` hardcodes origin, email, and profiles already held in `src/data/site.ts`; the origin is duplicated again in `astro.config.mjs:6`. **Fix:** generate JSON-LD from `site` and use one canonical origin source.

- **Release hygiene:** `package.json:8` permits Node 22 despite the approved Node 24 baseline, and `public/.DS_Store` is copied into `dist` (8,196 bytes). **Fix:** constrain the Node engine to the tested 24 line and remove the metadata file from `public/`.
