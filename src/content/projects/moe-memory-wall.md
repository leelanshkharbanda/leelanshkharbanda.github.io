---
title: 'MoE Memory Wall: Prefetching Experts Under an HBM Budget'
summary: 'Group coursework simulating expert prediction, bounded HBM caching, and prefetching for Mixtral-8x7B decode.'
metaDescription: 'Group coursework simulating MoE expert prediction and HBM prefetching under a tight memory budget.'
status: coursework
role: team-coursework
stack:
  - C++
  - Python
  - LLMSimulator
  - discrete-event simulation
links:
  - label: 'Source repository'
    url: 'https://github.com/leelanshkharbanda/MoE-Memory-Wall-CA-Project'
    kind: 'source'
  - label: 'Generated results'
    url: 'https://github.com/leelanshkharbanda/MoE-Memory-Wall-CA-Project/blob/main/RESULTS.md'
    kind: 'report'
  - label: 'Final report'
    url: 'https://github.com/leelanshkharbanda/MoE-Memory-Wall-CA-Project/blob/main/report/CA%20Final%20Report%20Group%2024.pdf'
    kind: 'report'
  - label: 'Timeline tests'
    url: 'https://github.com/leelanshkharbanda/MoE-Memory-Wall-CA-Project/blob/main/tests/test_prefetch.py'
    kind: 'tests'
results:
  - claim: 'TinyMoE-prose routing at C=64'
    value: '1.27× latency ratio vs. on-demand LRU (16.65 ms vs. 21.18 ms/token)'
    evidenceClass: simulation
    method: 'Batch-1 Mixtral-8x7B roofline + discrete-event timeline on simulated 80 GB H100 hardware.'
    source: 'https://github.com/leelanshkharbanda/MoE-Memory-Wall-CA-Project/blob/main/RESULTS.md'
  - claim: 'Mixtral-calibrated routing at C=64'
    value: '1.04× latency ratio vs. on-demand LRU (22.19 ms vs. 23.10 ms/token)'
    evidenceClass: simulation
    method: 'Synthetic routing fitted to published Mixtral temporal-locality statistics.'
    source: 'https://github.com/leelanshkharbanda/MoE-Memory-Wall-CA-Project/blob/main/RESULTS.md'
  - claim: 'Uniform routing at C=64'
    value: '1.00× (24.73 ms/token)'
    evidenceClass: simulation
    method: 'Random uniform routing baseline.'
    source: 'https://github.com/leelanshkharbanda/MoE-Memory-Wall-CA-Project/blob/main/RESULTS.md'
diagram: memory-grid
diagramAlt: 'Memory-grid diagram showing off-chip experts, next-layer predictor, copy link, bounded HBM cache, and decode stalls.'
diagramCaption: 'Off-chip experts, bounded HBM cache, and predicted prefetches.'
depth: medium
draft: false
---

## Overview

Mixtral-8x7B's 256 FP16 experts (~352 MB each) don't fit alongside non-expert weights and KV cache on a single 80 GB GPU. For our Group 24 computer architecture project, we built a discrete-event simulator around modified C++ roofline models (building on LLMSimulator and Duplex) to test whether causal next-layer expert prefetching can hide off-chip DRAM-to-HBM transfer stalls under a tight resident budget (`C = 64`).

## How it works

- **Workloads:** compares recorded routing traces from a small TinyMoE model (trained on Tiny Shakespeare and CPython), a synthetic Mixtral-calibrated locality trace, and a uniform random routing baseline.
- **Memory timeline:** models a per-layer LRU HBM cache, a single copy engine with demand-over-prefetch priority, preemptible transfers, prediction-guided eviction, and feedback throttling when mispredictions waste bandwidth.
- **Results:** at `C = 64`, TinyMoE-prose dropped simulated decode latency from 21.18 ms to 16.65 ms/token (**1.27×**, with TinyMoE-code at **1.266×**), Mixtral-calibrated routing hit **1.04×**, and uniform routing stayed at **1.00×**.

## Running locally

`run_final.sh` compiles the C++ simulator, runs the sweeps, and executes `tests/test_prefetch.py` in [MoE-Memory-Wall-CA-Project](https://github.com/leelanshkharbanda/MoE-Memory-Wall-CA-Project).
