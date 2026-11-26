# Project-stage polish final council review

**Verdict: PASS.** No Blocker, Major, or Minor finding remains.

## Finding and fix

- Desktop project cards forced `.project-card__stage` to stretch and `.project-list .project-card__stage` to a 25rem minimum. The figure inherited that height, leaving unused dark space below its caption.
- Stages now align to the start and size naturally; the Work-list minimum and figure minimum height are zero. Redundant mobile overrides were removed.
- The floating preview note moved from the bottom-right to the top-right so it cannot cover caption evidence on hover or keyboard focus.

## Regression evidence

- A caption-to-stage-bottom geometry test covers every Home and Work diagram at 390, 768, and 1440 px with a transform-tolerant bound.
- A separate overlap test covers preview notes against caption/evidence at 768 and 1440 px.
- Existing caption clipping, mobile title order, keyboard scrolling, reflow, and accessibility tests remain green.
- Fresh captures of all five diagram cards at 390 and 1440 px show compact stages with complete captions and no dark tail. The final MoE focus-state capture shows the preview note clear of the caption.

## Verification

- Final `npm run verify` passed: formatting, Astro diagnostics with 0 errors/warnings/hints, 46 unit tests, 13 static pages, budgets, HTML validation, and 123 Playwright tests across Chromium, Firefox, and WebKit with 6 expected skips.
- CSS is 11,855 bytes gzip; third-party runtime requests remain zero.
- Independent visual review passed. Final engineering/accessibility re-review passed with no remaining findings.
