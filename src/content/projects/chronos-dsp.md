---
title: 'Chronos-DSP: from geometry to simulated IQ'
question: 'What changes when transmitters, receivers, and walls move around a QPSK signal?'
summary: 'An Elixir/Phoenix and Rust simulation for moving transmitters, receivers, and walls around a QPSK signal. It includes a dashboard and a headless API.'
recruiterSummary: 'I built Chronos-DSP as a personal software simulation across an Elixir/Phoenix control plane and Rust NIF data plane. It makes geometric propagation inspectable from scene geometry to simulated QPSK and BER, with deterministic seeds and CI evidence; it does not claim RF calibration or hard-real-time guarantees.'
metaDescription: 'A personal Elixir, Phoenix, and Rust geometric-channel simulation with deterministic QPSK, tests, and stated limits.'
status: 'released'
role: 'individual'
contribution: 'Designed and implemented the personal geometric-channel simulation, Phoenix/LiveView control plane, Rust NIF and Elixir reference path, deterministic DSP, APIs, exports, and test coverage.'
evidenceClass: 'simulation'
stack:
  - 'Elixir'
  - 'Phoenix'
  - 'LiveView'
  - 'Rust'
  - 'Rustler NIF'
  - 'StreamData'
  - 'ECharts'
links:
  - label: 'Source repository'
    url: 'https://github.com/leelanshkharbanda/Chronos-DSP'
    kind: 'source'
  - label: 'v0.3.0 release'
    url: 'https://github.com/leelanshkharbanda/Chronos-DSP/releases/tag/v0.3.0'
    kind: 'release'
  - label: 'CI run'
    url: 'https://github.com/leelanshkharbanda/Chronos-DSP/actions/runs/45619704945'
    kind: 'tests'
results:
  - claim: 'CI snapshot passed the Elixir and Rust suites'
    value: '459 tests, 41 properties, and 6 Rust tests; 0 failures'
    evidenceClass: 'artifact'
    method: 'Read the successful CI run for commit c8ec0b0d5882; its log reports 41 properties and 459 tests with zero failures, plus six passing Rust tests.'
    source: 'https://github.com/leelanshkharbanda/Chronos-DSP/actions/runs/45619704945'
  - claim: 'A versioned release is available'
    value: 'v0.3.0'
    evidenceClass: 'artifact'
    method: 'Checked the public GitHub Releases page for the published tag and release metadata.'
    source: 'https://github.com/leelanshkharbanda/Chronos-DSP/releases/tag/v0.3.0'
  - claim: 'Seeded scenes produce repeatable simulated signal outputs'
    value: 'Complex-baseband IQ, received power, path count, and BER under stated geometry and noise assumptions'
    evidenceClass: 'simulation'
    method: 'Inspected the channel and DSP implementation plus the headless simulate contract; the outputs come from the software model rather than radio captures.'
    source: 'https://github.com/leelanshkharbanda/Chronos-DSP#json-api'
limits:
  - 'Geometric propagation and material losses are illustrative; the model is not calibrated against RF measurements.'
  - 'There is no frequency-selective channel, antenna/link budget, OFDM, or FEC in the documented scope.'
  - 'Dirty-CPU scheduling and reference fallback do not establish hard-real-time deadlines or latency guarantees.'
  - 'Repository screenshots are not reused; portfolio visuals are original diagrams.'
nextStep: 'Add an opt-in link-budget mode and compare a few propagation cases with published reference data.'
diagram: 'signal-path'
diagramAlt: 'Original signal-path diagram from scene geometry through multipath channel modeling and QPSK processing to simulated IQ and BER.'
diagramCaption: 'A sketch of scene geometry, multipath, and simulated QPSK output.'
depth: 'flagship'
visualRights: 'original'
checkedOn: '2026-11-25'
draft: false
---

## Context and constraints

Wireless-channel behavior is easy to discuss and difficult to see. A receiver moving past walls changes path length, reflection, blockage, diffraction, transmission loss, and Doppler together; a single BER number hides that sequence. Chronos-DSP started as a personal engineering question: could a small software model make that chain visible and repeatable without requiring radio hardware?

This is a geometric-channel software simulation, not a capture system. Material losses are illustrative, the signal is QPSK over complex baseband samples, and the geometry is deliberately bounded. The model uses explicit assumptions, deterministic noise, and tests.

The implementation also crosses a language boundary. Phoenix and LiveView provide session control and browser interaction, while Rust handles the numerical DSP path. A pure-Elixir reference renderer makes the numerical contract visible and provides a fallback when the native artifact is unavailable. That split creates a practical systems problem: both implementations must agree on sample order, interpolation, phase rotation, and random-number behavior.

## Mechanism

A scene contains transmitters, receivers, and planar walls. The channel layer derives candidate paths: line of sight, image-source reflections with a bounded bounce count, knife-edge diffraction around blocking edges, and transmission through walls. Each path carries geometry and DSP-relevant fields such as delay, gain, and Doppler. A path cap keeps crowded scenes bounded and retains the strongest candidates.

Those paths feed a QPSK signal chain. The renderer applies fractional-delay interpolation, Doppler phase rotation, and complex additive Gaussian noise. An explicit xorshift64* seed makes a run reproducible. Received power, path count, and BER are computed alongside constellation, waveform, and spectrum data, allowing a viewer to connect a geometry change with its simulated signal consequence rather than treating the plots as decorative output.

The Rust NIF runs rendering on a dirty CPU scheduler, keeping the work out of the BEAM's normal scheduler path. That is an implementation choice, not a deadline guarantee. The Elixir reference mirrors the NIF contract, and native-artifact checks allow development and tests to fall back cleanly; production readiness can instead fail when a required NIF cannot load.

Each browser connection owns a supervised simulation session. LiveView controls play/pause, stepping, speed, noise, scenarios, and scene editing; the server validates mutations and pushes frames to Canvas and chart renderers. A headless JSON endpoint exposes the same metrics and DSP snapshot without a browser, while CSV endpoints export metrics, history, and complex samples for offline inspection.

## Contribution and credit

This is my personal project. I designed and implemented the geometry-to-signal architecture, the Phoenix/LiveView control plane, the Rust NIF and matching Elixir reference, deterministic DSP, supervised sessions, APIs, exports, and validation work. The repository, release, tests, and CI logs show the scope of that work.

## Source

The [source repository](https://github.com/leelanshkharbanda/Chronos-DSP) includes [v0.3.0](https://github.com/leelanshkharbanda/Chronos-DSP/releases/tag/v0.3.0). The channel models, DSP backends, supervision, API controllers, and tests are in the documented project layout. The browser dashboard is one interface to the model.

CI run `45619704945` at commit `c8ec0b0d5882` is the checked snapshot. The release tag and snapshot are reported separately. For local reproduction, the repository provides pinned tool versions, `bin/setup`, `bin/test`, and `bin/smoke`.

## Results

The checked CI snapshot reports **459 tests, 41 properties, and 6 Rust tests, with zero failures**. The Elixir and Rust jobs both passed. These counts describe the checked suites, not physical-channel accuracy or latency.

The simulation produces repeatable outputs: path geometry, complex IQ samples, received power, and BER for a stated scene, seed, and noise setting. They come from the software model, not radio captures. The release and CI runs are separate implementation checks.

Native and reference renderers share a contract, generated properties exercise geometry and packing invariants, and the API exposes the same model outputs used by the interface. The physical assumptions are still limited.

## Limits

Chronos is not calibrated RF software and contains no hardware measurement. The material catalogue and path losses are modeling choices. Diffraction uses a single knife-edge model rather than full uniform theory of diffraction, and the documented scope excludes frequency selectivity, antenna behavior, a complete link budget, OFDM, and forward error correction.

The Phoenix session model and dirty-CPU NIF call don’t establish hard-real-time performance, deadline latency, or throughput. A deterministic seed makes a software run repeatable; it doesn’t make the model empirically accurate.

The named-scene store is capped and ephemeral by default, and the public API has documented authentication and rate-limiting gaps. Those constraints matter if the showcase is exposed beyond a single-user evaluation. Repository screenshots are not cleared for reuse, so this portfolio uses an original signal-path diagram instead.

## Reproduction

Start with the repository's `.tool-versions`, run `bin/setup`, and execute `bin/test` to exercise both language suites. Then launch `mix phx.server` and compare the `orbit` and `open_field` scenarios, or call `POST /api/simulate` with a fixed seed and record the returned metrics and DSP snapshot. `bin/smoke --local` checks a fresh local release and NIF-loaded readiness.

A possible next step is a controlled validation track: make physical link-budget terms opt-in, compare a few propagation cases with published reference data, and publish the assumptions alongside any error comparison.
