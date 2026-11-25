# Technical Portfolio References — Final Verification Review

**Artifact reviewed:** `/Users/leelanshkharbanda/portfolio_final/outputs/technical-portfolio-references-brief.md`  
**Citation note reviewed:** `/Users/leelanshkharbanda/portfolio_final/outputs/technical-portfolio-references-citation-check.md`  
**Supporting evidence reviewed:** `/Users/leelanshkharbanda/portfolio_final/outputs/public-resume-facts.md`, `/Users/leelanshkharbanda/portfolio_final/outputs/github-evidence.md`, and the prior version of this verification report  
**Original résumé cross-check:** `/Users/leelanshkharbanda/resume.tex`  
**Verification date:** 2026-11-25  
**Review type:** final evidence and citation verification; no stylistic editing

**Reviewed brief SHA-256:** `68f8b0a29d9a371f8dec48aa7b6be7a40397bc3368d5764f78f9f518ba5f7879`  
**Reviewed résumé-extract SHA-256:** `fb720917b812927bfa5bf3ab5aac67f32146d6974d0b41464a6e3b085fd420ab`

## Final verdict

**PASS WITH NOTES.**

The revised brief passes final evidence and citation review. **MAJOR-1 through MAJOR-8 and MINOR-1 through MINOR-8 are resolved.** The citation note's residual items R1–R3 also no longer describe the current brief or résumé extract.

The notes are limited to one **MINOR audit-trail issue:** the citation note pins superseded file hashes and retains quotations of wording that has since been corrected. This does not invalidate the brief's claims, accessibility criteria, attribution boundaries, or source numbering, but the note should be regenerated before the verification package is treated as internally synchronized.

| Severity | Remaining count | Disposition |
|---|---:|---|
| FATAL | 0 | None |
| MAJOR | 0 | None |
| MINOR | 1 | Citation-note synchronization only |

### Severity definitions

- **FATAL:** invalidates the central recommendation or causes serious factual misrepresentation or an accessibility barrier.
- **MAJOR:** materially affects evidence fidelity, attribution, accessibility, performance, or release verification.
- **MINOR:** localized precision, citation-hygiene, or audit-trail issue that does not block the overall direction.

## Prior MAJOR findings: final disposition

| ID | Status | Current evidence and resolution |
|---|---|---|
| MAJOR-1 — HPC attribution boundary | **RESOLVED** | Brief §6, line 134 now says the résumé lists HPC-Boost as a two-person project **without specifying a version**, distinguishes the inherited report from later v2 results, and prohibits applying the two-person label to the whole repository history. `public-resume-facts.md:30` and `github-evidence.md:15` preserve the same boundary. Source 80 names Varun Parashar, Aaditya Gupta, and Samriddh Singh; source 81 supports grouped validation, the per-binary NO-GO, and the fixed-subset positive result without asserting authors or team size. |
| MAJOR-2 — unauditable exact team sizes | **RESOLVED** | Brief §6, lines 132–137 cites the new local source 82. `public-resume-facts.md:13–25` records the five exact sizes and labels them user-verified by the local résumé, not inferred from contributor counts. Original résumé lines 64, 70, 76, 81, and 87 independently reproduce Modulation Studio 2, HPC-Boost 2, RISC-V 4, Life OS 3, and AP_Project 2. The HPC version caveat remains explicit. |
| MAJOR-3 — Arthur case attribution | **RESOLVED** | Brief §2.1, line 36 keeps PRESTI.AI's scene graph/render-pass/camera/snapping/raycasting/collision details with source 8, attributes the 376 KB scene reduction to **Reaali** [78], and attributes the SVG-to-Three.js same-silhouette handoff to **W3R.ONE** [79]. Direct retrieval of both case pages reproduced those statements. |
| MAJOR-4 — incomplete accessibility traceability | **RESOLVED** | Brief §5, lines 112–123 now cites direct WAI sources 67–77 for contrast, non-text contrast, target size, resize, text spacing, focus visibility, keyboard traps, non-text content, complex images, and evaluation-tool limits. The text distinguishes WCAG 2.2 AA from voluntarily adopted AAA behavior and stricter project policy. |
| MAJOR-5 — overbroad Canvas/SVG rule | **RESOLVED** | Brief §5, line 120 and §9, line 208 now distinguish informative Canvas/complex SVG, functional SVG, and decorative SVG. Informative graphics receive an equivalent explanation and a table where relationships/data require it; functional graphics receive an accessible name and native external controls; decoration is hidden from assistive technology without redundant descriptions. WAI sources 75–76 carry the semantic requirements. |
| MAJOR-6 — three-font stack versus 60 KB cap | **RESOLVED** | Brief §4, line 106; §7.A, line 148; and §9, line 207 consistently preserve the 60 KB cap, treat the three families as candidates, require measured WOFF2 subsets, limit preloading to the measured critical subset, and specify a two-web-font-family plus system-monospace fallback. Source 37 supports WOFF2, subsetting, self-hosting, and cautious preloading; the exact cap remains project policy. |
| MAJOR-7 — no field-metrics mechanism | **RESOLVED** | Brief §4, line 106 identifies p75 field targets and states that Lighthouse is not a field INP measurement. §9, line 205 prohibits general analytics, while §11, line 250 supplies the compatible field plan: use CrUX when eligible; otherwise keep the field gate open or add minimal privacy-preserving RUM with a documented retention policy. Source 35 supports the thresholds, CrUX/RUM paths, and the lab/field distinction. |
| MAJOR-8 — hard two-line heading cap | **RESOLVED** | Brief §7.A, line 148 defines 5.5 rem/two lines as the **default composition only**, requires meaningful headings to grow and wrap at 200% text/zoom and under text-spacing overrides, and prohibits fixed-height clamping or hidden overflow. This is consistent with §5, line 118 and WAI sources 71–72. |

## Prior MINOR findings: final disposition

| ID | Status | Current evidence and resolution |
|---|---|---|
| MINOR-1 — “disjoint” streams | **RESOLVED** | Brief §1, line 17 now says “four complementary research streams.” |
| MINOR-2 — Awwwards weighting | **RESOLVED** | Brief §5, line 110 says design and usability are “both major constraints,” not equal-weight constraints. |
| MINOR-3 — unsupported motion duration | **RESOLVED** | Brief §4, line 103 labels 160–320 ms as project policy and uses source 45 only for animation-property guidance. |
| MINOR-4 — universal differentiation claim | **RESOLVED** | Brief §7.A, line 154 scopes the claim to what was observed in the inspected reference set. |
| MINOR-5 — MoE routing underdescribed | **RESOLVED** | Brief §6, line 135 names TinyMoE-recorded, Mixtral-calibrated, and uniform routing and retains the no-measured-GPU-speedup limit. |
| MINOR-6 — SC 2.3.3 level omitted | **RESOLVED** | Brief §5, line 112 explicitly identifies SC 2.3.3 as Level AAA and voluntarily adopted as a product requirement. |
| MINOR-7 — Bruno license contradiction | **RESOLVED** | Brief §4, line 94 discloses the MIT license file and the package metadata's ISC declaration, with sources 83–84. |
| MINOR-8 — access counts mislabeled as verification | **RESOLVED** | Citation note lines 16 and 20–29 label counts “retrieved/accessed” and distinguish access from semantic claim support. |

## Citation-note residual mismatches: final disposition

| Note item | Status | Current-file resolution |
|---|---|---|
| R1 — HPC two-person v2 attribution | **RESOLVED** | The note quotes “frames the v2 work as team research (2 people),” but that sentence is absent from the current brief. Current line 134 expressly says the résumé does not specify a version and keeps the inherited report, résumé entry, and v2 results distinct. |
| R2 — unqualified “control boundaries” | **RESOLVED** | The note quotes the former unqualified phrase. Current line 117 requires 3:1 for a boundary only when it is required to identify the control, and labels applying the stricter rule to all primary controls as project policy. |
| R3 — résumé-attributed RISC-V “subset” wording | **RESOLVED** | `public-resume-facts.md:31` now quotes the résumé's “RV32I base integer instruction set” exactly and separately attributes the subset limitation to repository evidence. Original résumé line 74 contains no “subset” wording; the repository README does. |

## Requested technical spot checks

- **HPC wording:** passes. The current claim is narrower than the evidence and does not map the two-person résumé entry to v2 without an explicit link.
- **Accessibility criteria and citations:** pass. The AA floor, AAA adoption, stricter project policies, exceptions where material, and direct WAI citations are distinguishable. Primary checks reproduced the 4.5:1/3:1 text thresholds, conditional 3:1 control-boundary rule, 24×24 AA target baseline with exceptions, 44×44 AAA target, 200% resize requirement, prescribed text-spacing values, and SC 2.3.3's AAA status.
- **Canvas/SVG cases:** pass. The three-case rule matches WAI Non-text Content and Complex Images guidance; decorative content is not burdened with redundant equivalents.
- **Font-budget fallback:** passes. The cap remains authoritative, the three-family stack is optional, and the two-family/system-monospace fallback is explicit.
- **Field-metrics plan:** passes. CrUX, minimal privacy-preserving RUM, and an explicitly open field gate are all permitted; Lighthouse/TBT are not represented as field INP.
- **Heading resize behavior:** passes. The two-line/5.5 rem direction is a default composition target, not a clipping constraint.
- **Arthur case attribution:** passes. Reaali owns the 376 KB example; W3R.ONE owns the SVG-to-Three.js silhouette handoff.
- **Source numbering:** passes independent recomputation: **84 entries, exactly 1–84; 83 unique remote URLs plus one local artifact; all 84 numbers cited in the body; no missing or dangling markers; all entries are Markdown hyperlinks.** Source 82 resolves to the reviewed local résumé extract.

## Independent evidence checks

- The HPC inherited-report blob revision matched the citation note: `69f6f6ad159e30a465064e70b45f31e45a3c0ede`.
- The HPC v2 results blob revision matched the citation note: `c359970c914b482199e5ba40e680cfff52177642`.
- The original résumé independently reproduced all five team sizes and the exact RISC-V wording.
- Direct primary-source checks reproduced the revised accessibility thresholds and exceptions, Canvas/SVG distinctions, font-delivery guidance, field/lab Core Web Vitals distinction, and Arthur case attribution.
- The brief itself was not edited during this review.

## Remaining issues by severity

### FATAL

None.

### MAJOR

None.

### MINOR-1 — Citation note is not synchronized to the reviewed revisions

**Locations:** `/Users/leelanshkharbanda/portfolio_final/outputs/technical-portfolio-references-citation-check.md:5, 81, 112–132`

**Issue:**

- The note records brief SHA-256 `644caba60d1c7558722cfdb177041ad01ebbaef66b9e66d40baf36ff70b9ff19`; the reviewed brief hashes to `68f8b0a29d9a371f8dec48aa7b6be7a40397bc3368d5764f78f9f518ba5f7879`.
- The note records résumé-extract SHA-256 `54cc6b0fd5bb6c0090c763e7967a9389bf1af6f9871108740f39017e3c7bf7e3`; the reviewed extract hashes to `fb720917b812927bfa5bf3ab5aac67f32146d6974d0b41464a6e3b085fd420ab`.
- Its R1–R3 quotations and disposition describe superseded wording. R1 and R2 quote sentences no longer present in the brief; R3 quotes artifact wording that has been corrected.

**Impact:** audit-trail precision only. The current brief, local evidence, source list, and substantive fixes pass.

**Recommended follow-up:** regenerate the citation note against the current hashes and mark R1–R3 resolved. No further brief correction is required for the findings reviewed here.

## Disposition

The revised brief is **safe to use as the evidence and accessibility basis for implementation**. All prior release-blocking document findings are closed. Treat the overall package as **PASS WITH NOTES** until the citation note is synchronized; do not interpret its stale residual section as evidence that the current brief still contains those mismatches.

This review verifies the research artifact and its citations. It does not claim that a future implementation has already passed WCAG conformance, browser testing, field Core Web Vitals measurement, or media-rights clearance.

## Local evidence used

- `/Users/leelanshkharbanda/portfolio_final/outputs/technical-portfolio-references-brief.md`
- `/Users/leelanshkharbanda/portfolio_final/outputs/technical-portfolio-references-citation-check.md`
- `/Users/leelanshkharbanda/portfolio_final/outputs/technical-portfolio-references-verification.md`
- `/Users/leelanshkharbanda/portfolio_final/outputs/public-resume-facts.md`
- `/Users/leelanshkharbanda/portfolio_final/outputs/github-evidence.md`
- `/Users/leelanshkharbanda/portfolio_final/outputs/technical-portfolio-research-awards.md`
- `/Users/leelanshkharbanda/portfolio_final/outputs/technical-portfolio-research-quality.md`
- `/Users/leelanshkharbanda/resume.tex`
