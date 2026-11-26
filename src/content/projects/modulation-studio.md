---
title: 'Modulation Studio: a browser signal lab'
summary: 'Two-person browser DSP lab for testing AM/FM/PM and digital modulation schemes, channel noise, FFTs, and constellations.'
metaDescription: 'Two-person browser DSP lab for modulation, channel impairments, receiver recovery, constellations, and BER/SER.'
status: 'live-demo'
role: 'team-project'
teamSize: 2
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
  - claim: 'Live web app'
    value: 'Hosted on GitHub Pages'
    evidenceClass: 'artifact'
    method: 'Static HTML/JS app deployed to GitHub Pages.'
    source: 'https://leelanshkharbanda.github.io/Modulation-Studio/'
  - claim: 'Vitest test suite'
    value: '66 tests passing across 6 test files'
    evidenceClass: 'artifact'
    method: 'Vitest suite in GitHub Actions.'
    source: 'https://github.com/leelanshkharbanda/Modulation-Studio/actions/runs/45619690872'
  - claim: 'Browser signal chain'
    value: 'AM/FM/PM, ASK/FSK/BPSK/QPSK/16-QAM, AWGN/fading, FFT, constellations, and BER/SER'
    evidenceClass: 'simulation'
    method: 'Implemented in js/signal-core.js and Canvas 2D renderers.'
    source: 'https://github.com/leelanshkharbanda/Modulation-Studio/blob/master/js/signal-core.js'
diagram: 'constellation'
diagramAlt: 'Three-panel constellation diagram comparing clean QPSK symbols, impaired channel symbols, and recovered receiver decisions.'
diagramCaption: 'Source symbols, channel noise, and receiver decisions.'
depth: 'flagship'
draft: false
---

## Overview

Modulation Studio is an interactive DSP playground my teammate and I built to run directly in the browser. Pick a modulation scheme, dial in SNR, fading, or carrier/phase offsets, and watch the baseband, modulated, received, and demodulated waveforms update live alongside FFT magnitude, constellation plots, and BER/SER readouts.

## How it works

- **Schemes:** supports analog (AM DSB-LC, AM DSB-SC, FM, PM) and digital (ASK, FSK, BPSK, QPSK, 16-QAM) modulation in `js/signal-core.js`.
- **Recovery & adaptive mode:** integrates over symbol windows to decode bits and compute BER/SER (or correlation for analog), plus an optional adaptive receiver mode that estimates phase, frequency error, and timing.
- **Extras:** `localStorage` presets, side-by-side comparison mode, and CSV/PNG export.

## Running locally

Install with Bun and run `bun run dev`, or `bun run test` for the Vitest suite. Live version is up at [leelanshkharbanda.github.io/Modulation-Studio](https://leelanshkharbanda.github.io/Modulation-Studio/).
