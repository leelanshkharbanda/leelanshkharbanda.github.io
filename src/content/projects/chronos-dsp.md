---
title: 'Chronos-DSP: from geometry to simulated IQ'
summary: '2D wireless-channel simulator built with Elixir/Phoenix and Rust that links moving room geometry to QPSK IQ and BER.'
metaDescription: 'Elixir, Phoenix, and Rust 2D wireless-channel simulator with deterministic QPSK IQ and BER outputs.'
status: 'released'
role: 'individual'
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
  - claim: 'CI test suite'
    value: '459 Elixir tests, 41 StreamData properties, 6 Rust tests passing'
    evidenceClass: 'artifact'
    method: 'GitHub Actions CI run for commit c8ec0b0d5882.'
    source: 'https://github.com/leelanshkharbanda/Chronos-DSP/actions/runs/45619704945'
  - claim: 'v0.3.0 release'
    value: 'Tagged release on GitHub'
    evidenceClass: 'artifact'
    method: 'Public GitHub Releases page.'
    source: 'https://github.com/leelanshkharbanda/Chronos-DSP/releases/tag/v0.3.0'
  - claim: 'Deterministic QPSK output'
    value: 'Repeatable baseband IQ, received power, path count, and BER per seed'
    evidenceClass: 'simulation'
    method: 'Software simulation via Rust NIF / Elixir renderer and JSON simulate API.'
    source: 'https://github.com/leelanshkharbanda/Chronos-DSP#json-api'
diagram: 'signal-path'
diagramAlt: 'Signal-path diagram from 2D scene geometry and multipath rays to QPSK rendering and simulated IQ/BER output.'
diagramCaption: 'Scene geometry to multipath rays and QPSK IQ/BER.'
depth: 'flagship'
draft: false
---

## Overview

Chronos-DSP is a 2D wireless-channel simulator I built in Elixir/Phoenix and Rust. When you drag transmitters, receivers, or walls around a room, you can immediately see how path length, reflections, knife-edge diffraction, wall attenuation, and Doppler shift change the received QPSK constellation, waveform, spectrum, and BER.

I also wanted to wire Phoenix LiveView together with a Rust NIF. Phoenix handles browser sessions and UI state, while Rust runs the DSP math on a dirty CPU scheduler. There's also a pure-Elixir fallback renderer that implements the exact same interpolation, phase rotation, and `xorshift64*` PRNG behavior so both backends match sample-for-sample.

## How it works

- **Channel geometry:** derives line-of-sight, image-source reflections, knife-edge diffraction around wall edges, and wall transmission paths, keeping the strongest paths up to a scene cap.
- **DSP chain:** takes those delays, gains, and Doppler offsets into a baseband QPSK renderer with fractional-delay interpolation and complex Gaussian noise.
- **Interface & API:** every browser tab gets a supervised LiveView simulation session, alongside a headless `POST /api/simulate` JSON endpoint and CSV exports for metrics and IQ samples.

## Running locally

Check `.tool-versions`, run `bin/setup` and `bin/test` for both Elixir and Rust suites, then start `mix phx.server`. Tagged `v0.3.0` on [GitHub](https://github.com/leelanshkharbanda/Chronos-DSP).
