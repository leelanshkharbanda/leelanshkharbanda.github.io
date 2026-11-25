---
title: 'Modulation Studio: a browser signal lab'
question: 'How can a browser make modulation, channel impairment, and receiver recovery inspectable in one interactive signal path?'
summary: 'A two-person static web lab that simulates analog and digital modulation, applies noise and fading, recovers signals, and exposes spectra, constellations, and error metrics in the browser.'
recruiterSummary: 'I contributed to a two-person browser DSP lab spanning simulated modulation, channel impairments, receiver controls, plots, exports, and tests. Its live demo returned HTTP 200 on 2026-11-25, while the latest Pages workflow failed during artifact lookup; the case study keeps availability, test evidence, and simulation claims separate.'
metaDescription: 'Modulation Studio case study: a two-person browser DSP lab for simulated modulation, channel impairments, receiver recovery, plots, and error metrics.'
status: 'live-demo'
statusNote: 'Live URL reachable; latest Pages deploy failed.'
role: 'team-project'
teamSize: 2
contribution: 'Contributed within the verified two-person team to the shared browser signal lab, including the simulation pipeline, receiver controls, visualizations, exports, and tests; no exclusive module ownership is claimed.'
creditNote: 'Team size 2 is verified by the local résumé. The public repository does not establish a complete teammate-by-module credit split, so no collaborators are named.'
evidenceClass: 'simulation'
stack:
  - 'JavaScript'
  - 'Canvas 2D'
  - 'FFT'
  - 'Vitest'
  - 'GitHub Pages'
links:
  - label: 'Source repository'
    url: 'https://github.com/leelanshkharbanda/Modulation-Studio'
    kind: 'source'
  - label: 'Live demo'
    url: 'https://leelanshkharbanda.github.io/Modulation-Studio/'
    kind: 'demo'
  - label: 'Signal-processing core'
    url: 'https://github.com/leelanshkharbanda/Modulation-Studio/blob/master/js/signal-core.js'
    kind: 'source'
  - label: 'Test suites'
    url: 'https://github.com/leelanshkharbanda/Modulation-Studio/tree/master/tests'
    kind: 'tests'
results:
  - claim: 'The live demo was reachable on the check date'
    value: 'HTTP 200 on 2026-11-25'
    evidenceClass: 'artifact'
    method: 'Requested the public demo URL and recorded its HTTP status; availability does not establish that the latest commit was deployed.'
    source: 'https://leelanshkharbanda.github.io/Modulation-Studio/'
  - claim: 'The latest workflow passed CI but failed the Pages deployment step'
    value: '66 tests passed; deploy failed at artifact lookup'
    evidenceClass: 'artifact'
    method: 'Read run 45619690872 job conclusions and the failed deploy log; the CI count and deployment failure are reported as separate observations.'
    source: 'https://github.com/leelanshkharbanda/Modulation-Studio/actions/runs/45619690872'
  - claim: 'The browser lab exposes an inspectable simulated signal chain'
    value: 'Analog and digital modulation, AWGN/fading, receiver recovery, FFT, constellation, and BER/SER/correlation outputs'
    evidenceClass: 'simulation'
    method: 'Read the signal core, modulation implementations, rendering modules, and tests; every signal and impairment is generated in software.'
    source: 'https://github.com/leelanshkharbanda/Modulation-Studio/blob/master/js/signal-core.js'
limits:
  - 'All channel effects and recovered signals are software simulations; no over-the-air or hardware measurement is claimed.'
  - 'The latest Pages workflow failed at artifact lookup, so an HTTP 200 response does not prove a fresh deployment.'
  - 'The public repository does not establish a complete two-person module-by-module credit split.'
  - 'The adaptive receiver is a bounded simulation aid, not a validated production synchronizer.'
  - 'Demo availability and passing unit tests are not evidence of adoption or learning outcomes.'
nextStep: 'Repair and verify the Pages artifact handoff, then add seeded end-to-end checks that assert plots, exports, and BER/SER against fixed reference cases.'
diagram: 'constellation'
diagramAlt: 'Original constellation diagram showing simulated symbols before and after channel impairment and receiver recovery.'
diagramCaption: 'Modulation Studio links a generated symbol stream to simulated channel effects, receiver decisions, and constellation or error-metric views.'
depth: 'flagship'
visualRights: 'original'
checkedOn: '2026-11-25'
draft: false
---

## Context and constraints

Modulation and demodulation are usually taught as separate equations, plots, and receiver assumptions. That separation makes it hard to see cause and effect: changing SNR should move constellation points, but the connection between a channel parameter, recovered decisions, and BER can remain abstract. Modulation Studio addresses that gap with a browser-based signals lab built as a two-person team project.

The product constraint is immediacy. A learner should be able to choose a scheme, introduce an impairment, and compare transmitted, received, and demodulated signals without installing a numerical stack or configuring a backend. The application is a static site with a JavaScript signal core, Canvas-based views, local presets, and export tools.

The evidence constraint is equally important. Every waveform and channel effect is simulated. The demo can show that the application is reachable and interactive, while tests can check implementation behavior; neither establishes physical radio performance, user learning, or adoption. Deployment health is a third, separate question because a live URL may continue serving an older successful build after a newer workflow fails.

## Mechanism

The lab supports analog schemes including AM DSB-LC, AM DSB-SC, FM, and PM, plus ASK, FSK, BPSK, QPSK, and 16-QAM. A baseband message and carrier parameters feed the selected modulator. The resulting transmitted waveform then passes through a software channel with adjustable SNR, fading depth, and receiver carrier or phase offsets.

Digital schemes retain transmitted bits and symbols alongside the received signal. Receiver logic integrates over symbol intervals, estimates or applies timing and phase parameters, makes decisions, and compares the recovered stream with the reference. That produces BER and SER rather than only a visually plausible plot. Analog schemes expose a correlation measure between relevant signal views.

The optional adaptive receiver estimates phase, frequency error, and timing from bounded signal statistics. It is useful for demonstrating how synchronization assumptions affect recovery, but the implementation is not presented as a production synchronizer. The rest of the interface pairs baseband, transmitted, received, and demodulated waveforms with FFT magnitude and constellation views.

Presets can be saved in browser local storage, comparison mode supports side-by-side exploration, and CSV/PNG export lets a user take results out of the page. The signal core is separated from UI orchestration and rendering so numerical behavior can be tested without depending on a particular visual layout.

## Contribution and credit

I contributed within the verified two-person team to the shared browser signal lab, including the simulation pipeline, receiver controls, visualizations, exports, and tests. The project is not presented as sole authorship, and the portfolio does not convert repository ownership into a claim that every module was implemented individually.

The résumé verifies the team size. Public contributor history does not provide a complete teammate-by-module credit split, so this case study names no collaborators and assigns no exclusive file ownership. The contribution is intentionally scoped to the shared prototype and the evidence that can be inspected in source, tests, CI, and the demo.

## Artifact

The [source repository](https://github.com/leelanshkharbanda/Modulation-Studio) contains the static entry point, signal-generation and channel modules, receiver logic, Canvas renderers, UI controllers, preset and export code, and test suites. The [signal-processing core](https://github.com/leelanshkharbanda/Modulation-Studio/blob/master/js/signal-core.js) is a compact review entry point for channel impairment, error metrics, and adaptive receiver-state estimation.

The [live demo](https://leelanshkharbanda.github.io/Modulation-Studio/) provides the interactive artifact. The repository also includes unit, smoke, and accessibility tests. Together these artifacts support a source-level review of the lab and a check that the public page is reachable; they should not be collapsed into a single claim that the latest deployment is healthy.

## Results and evidence

On 2026-11-25, the public demo returned **HTTP 200**. That is an availability observation at one URL and time. It does not identify which commit the browser received, prove that every control works, or establish a release or user base.

The latest Pages workflow, run `45619690872`, tells a more specific story. Its CI job passed **66 tests across 6 test files**. Its deploy job failed at the GitHub Pages step: the log first reported successful artifact upload, then artifact-metadata lookup errors and “No artifacts named github-pages were found.” The case study therefore reports the CI result and deployment failure independently. A reachable site can coexist with a broken latest deployment.

The substantive project result is simulation capability: a user can generate analog or digital signals, apply controlled impairments, inspect receiver decisions, and read spectra, constellations, BER, SER, or correlation. These outputs make the signal path inspectable. They are not measurements of a physical channel and are not evidence that the lab improves learning outcomes.

## Limits and non-claims

All waveforms, noise, fading, offsets, and recovered symbols are software-generated. No over-the-air capture, hardware measurement, calibrated receiver, or physical-channel validation is claimed. The simplified channel and adaptive receiver are teaching mechanisms, not substitutes for a complete communication-system model.

The latest Pages workflow failed during artifact lookup, so HTTP 200 must not be described as a successful fresh deployment. Passing unit, smoke, and accessibility tests also does not prove cross-browser correctness, sustained performance, or real user comprehension. No adoption or learning metric is available.

The two-person contribution is verified by the résumé, but the repository does not establish a complete module-level credit split. The adaptive receiver is bounded to the inspected signal window and estimation approach. Repository screenshots are not reused; the portfolio diagram is original.

## Reproducibility and next step

For local reproduction, install the repository's Bun dependencies and run `bun run dev`, or open the static entry point through a local server. `bun run test` executes the Vitest suites; `bun run build` assembles the static output. A useful manual check is to hold scheme and seed fixed, vary SNR, and record constellation, waveform, and BER/SER changes together.

The immediate next step is deployment repair. The workflow should verify the uploaded Pages artifact by name before deployment and surface the lookup failure clearly. After a successful redeploy, a smoke check should confirm the served commit or build identifier. Seeded end-to-end tests can then assert fixed reference cases for signal generation, impairment, receiver decisions, plots, and exports, keeping numerical correctness separate from page availability.
