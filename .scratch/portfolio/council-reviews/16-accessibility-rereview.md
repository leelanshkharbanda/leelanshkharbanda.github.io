# Accessibility and Release Re-review

**Verdict: HOLD — one Blocker, one Major, and one Minor remain.** No application code was modified.

## Remaining actionable findings

### Blocker — Opening the static stage ledger restores page-level overflow

**Reproduce:** At 320×720 on `/work/chronos-dsp/`, open **Static stage ledger**, with JavaScript enabled or disabled. The closed page is 320 px wide; the opened page becomes **689 px** in Chromium, Firefox, and WebKit.

The `.trace-static-details` grid item uses an automatic minimum width and adopts the 640 px table (`src/pages/work/[...slug].astro:132-163`; `src/styles/global.css:1700-1724`). Its `.table-scroll` consequently has `clientWidth = scrollWidth = 640`, so `overflow-x: auto` never bounds the table. The wrapper also has `tabIndex = -1`; Tab skips it for the later evidence-ledger scroller, leaving sighted keyboard-only users unable to scroll the fallback table.

**Smallest fix:** Give `.trace-static-details` `min-width: 0`; add `tabindex="0"` and an accessible label to its `.table-scroll`, matching the evidence ledger. Browser-only injection restored a 320 px page and a bounded internal scroller in all three engines. Extend the no-JS test to open the ledger at 320 px, assert reflow, focus the scroller, verify arrow-key scrolling, and retain the four-row/content assertions. Current coverage checks only row count (`tests/e2e/portfolio.spec.ts:50-66`), while the all-route reflow test leaves the ledger closed (`:68-80`).

### Major — The 200% mobile menu clips navigation links offscreen

**Reproduce:** At 320 px, set root text to 200% and open **Menu**. The navigation is 384 px wide, positioned from **x = -99 to 285**; every link starts at x = -98. `document.documentElement.scrollWidth` still reports 320, so the current width-only assertion misses the clipped controls.

`min-width: 12rem` scales with root text (`src/styles/global.css:317-324`). Constrain the popup, for example `min-width: 0; width: min(12rem, calc(100vw - 2.5rem))`. Injection placed it at x = 45–285 in all three engines. Add an open-menu 200% regression asserting that the navigation and link bounds remain inside the viewport.

### Minor — Combined 200% text and WCAG spacing overflow the Trace control

At 320 px on Chronos-DSP, apply 200% root text and the WCAG spacing overrides **together**. The page reaches **325 px** in Chromium/Firefox and **328 px** in WebKit; the **Previous** button is the sole page-level offender. Each condition passes separately, but the suite reloads between them (`tests/e2e/portfolio.spec.ts:82-101`).

At ≤640 px, reduce mobile control padding (validated: controls `0.5rem`, buttons `0.4rem` inline). Injection kept the button within the section and the page at 320 px in all engines. Add a combined-override pass.

## Verified resolved

- Default 320 px reflow passes on all 12 indexable routes in all three engines; settled no-JS layouts also pass. At 1280 px, all five Work case-study rows are full-width (1106 px).
- Separate 200% text and spacing checks pass on every route at 320 px; combined stress passes at 1280 px.
- Forced-colors 320 px reflow passes everywhere. Eight SVG-bearing routes retain the authored palette where supported; cited contrasts are 8.37:1 and 8.85:1. WebKit lacks `forcedColorAdjust` but retains visible content.
- Unknown routes return 404, `noindex`, one H1, and no canonical or `og:url`.
- Full Playwright suite: **74 passed, 4 expected skips**; targeted accessibility subset: **15 passed**.

## Limits

No real iOS/Android devices, Edge, NVDA, VoiceOver, TalkBack, touch-only, orientation/safe-area, bfcache, or hosted-header testing. Emulation, DOM checks, and axe do not establish WCAG conformance or spoken-announcement quality. The HTML résumé remains the accessible deliverable; generated PDFs are unpublished and untagged.
