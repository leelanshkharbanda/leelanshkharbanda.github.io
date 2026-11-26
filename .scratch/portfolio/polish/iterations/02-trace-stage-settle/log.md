# Iteration 02 — TraceInspector stage settle

Date: 2026-11-26

## Inspected

- Captured the TraceInspector at Source, Channel, and Output stages at 1440×900 and 390×844.
- Reviewed the active stage row, SVG path nodes, readout, controls, live announcement, horizontal diagram viewport, and reduced-motion behavior.
- The stage content and active colors changed correctly but snapped instantly, so the row and diagram read as separate UI updates rather than one signal-path handoff.

## Research

- Codrops' [Inside Heron](https://tympanus.net/codrops/2026/10/12/heron-ai/) case study describes iterating on tiny state transitions where geometry, highlight, and text reveal in sequence.
- Awwwards' [UI Animation and Microinteractions](https://www.awwwards.com/awwwards/collections/animation/) collection reinforced the use of SVG/CSS state feedback that stays attached to the content.
- Original adaptation: use one shared 180 ms color easing across the active row and SVG node. Geometry and evidence text update immediately; no reference code, assets, or wording were copied.

## Changed

- `src/styles/global.css:1503` — added a 180 ms background/border/text color settle to TraceInspector stage rows.
- `src/styles/global.css:1691` — matched the SVG node fill/stroke timing so the diagram and ledger hand off together.
- `tests/e2e/portfolio.spec.ts:247` — added coordinated-state, rendered-color, OS reduced-motion, and manual motion-toggle regressions.
- `src/components/Footer.astro:36` — removed `aria-pressed` from the changing Reduce/Enable action label to resolve a council-identified screen-reader semantics issue.
- `tests/e2e/playground.spec.ts:79` — updated the motion-toggle regression to assert clear action names without conflicting pressed state.

## Council review

- Creative director + technical content strategist: approve. No blocker or major findings. Their minor timing/easing test gap was addressed with exact shared-duration and easing assertions.
- Principal engineer + release reviewer: approve. No blocker or major findings. Static SSR active-row, SVG-node, and readout assertions were added to the no-JavaScript journey.
- Product + accessibility reviewer: initially rejected for one pre-existing major motion-toggle semantics issue. The toggle was fixed, tests were tightened for keyboard and both reduced-motion modes, and the focused re-review passed with no blocker or major remaining.

## Verified

- `npm run format && npm run verify` passed.
- Astro: 0 errors, 0 warnings, 0 hints.
- Vitest: 45 tests passed.
- Playwright: 165 passed, 6 expected skips across Chromium, Firefox, and WebKit, including Axe checks.
- Budgets: CSS 12,204 bytes gzip; TraceInspector JavaScript 73,196 bytes gzip; fonts 43,244 bytes; 0 third-party runtime requests.
- Fresh desktop/mobile route, full-page, Source, Channel, and Output screenshots were inspected. SVG geometry and labels remain fully contained; no overlap or layout shift was introduced.
- Local screenshots are retained under `screenshots/baseline/` and `screenshots/after/` and ignored by Git.

## Next candidates

1. Add a brief SignalToy readout tick when pointer or keyboard input changes the direct/reflected path lengths.
2. Refine the work-index jump controls so the active project has a clearer tactile state on both pointer and keyboard navigation.
