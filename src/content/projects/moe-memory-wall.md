---
title: 'MoE Memory Wall: Prefetching Experts Under an HBM Budget'
question: 'When expert weights exceed HBM capacity, can training-free prediction and prefetching reduce decode stalls without changing routing?'
summary: 'A group simulation of expert prediction, HBM caching, and prefetching under a memory budget.'
recruiterSummary: "MoE Memory Wall is group coursework about hiding expert-weight loads when a mixture-of-experts model exceeds HBM capacity. I take credit as a participant in Group 24's shared study rather than sole author of every component. The repository combines modified C++ simulators, Python predictors, and a discrete-event memory timeline. It compares TinyMoE prose/code, Mixtral-calibrated, and uniform routing. The headline 1.27× result is the TinyMoE-prose workload at C=64, a Simulation Result against on-demand plus LRU, not a hardware measurement. The work reports where prefetching helps, where it does not, and how extra traffic constrains the benefit."
metaDescription: 'MoE Memory Wall coursework: simulated expert prediction and prefetching under an HBM budget, with routing-sensitive results and explicit limits.'
status: coursework
role: team-coursework
contribution: "Participated in Group 24's shared coursework implementation and evaluation; individual ownership of simulator patches, predictors, and report sections is not inferred."
creditNote: 'Group coursework building on LLMSimulator, Duplex, SSD-offloading, and published ST-MoE/APEX ideas; reimplementations and group-authored components are distinguished in the repository.'
evidenceClass: simulation
stack:
  - C++
  - Python
  - LLMSimulator
  - discrete-event simulation
links:
  - label: 'Source repository'
    url: 'https://github.com/leelanshkharbanda/MoE-Memory-Wall-CA-Project'
    kind: source
  - label: 'Generated results'
    url: 'https://github.com/leelanshkharbanda/MoE-Memory-Wall-CA-Project/blob/main/RESULTS.md'
    kind: report
  - label: 'Final report'
    url: 'https://github.com/leelanshkharbanda/MoE-Memory-Wall-CA-Project/blob/main/report/CA%20Final%20Report%20Group%2024.pdf'
    kind: report
  - label: 'Timeline tests'
    url: 'https://github.com/leelanshkharbanda/MoE-Memory-Wall-CA-Project/blob/main/tests/test_prefetch.py'
    kind: tests
results:
  - claim: 'TinyMoE-prose routing at cache capacity 64'
    value: '1.27× latency ratio versus on-demand plus LRU; 16.65 ms versus 21.18 ms per token'
    evidenceClass: simulation
    method: 'Batch-1 Mixtral-8x7B cost model on a simulated 80 GB HBM3 H100-class platform; mean over 16 sequence groups and 191 decode steps; recorded TinyMoE-prose top-2 routing.'
    source: 'https://github.com/leelanshkharbanda/MoE-Memory-Wall-CA-Project/blob/main/RESULTS.md'
  - claim: 'Mixtral-calibrated routing at cache capacity 64'
    value: '1.04× latency ratio versus on-demand plus LRU; 22.19 ms versus 23.10 ms per token'
    evidenceClass: simulation
    method: 'Same simulated H100-class platform, batch size, sequence groups, and decode steps; synthetic routing calibrated to published Mixtral temporal-locality statistics.'
    source: 'https://github.com/leelanshkharbanda/MoE-Memory-Wall-CA-Project/blob/main/RESULTS.md'
  - claim: 'Uniform routing at cache capacity 64'
    value: '1.00× latency ratio versus on-demand plus LRU; 24.73 ms for both policies'
    evidenceClass: simulation
    method: 'Same simulated platform and evaluation groups; uniform expert routing provides a null workload with no temporal structure to predict.'
    source: 'https://github.com/leelanshkharbanda/MoE-Memory-Wall-CA-Project/blob/main/RESULTS.md'
limits:
  - 'Both simulators are analytical roofline models without DRAM timing, so latency and energy are modeled rather than observed on a GPU.'
  - 'TinyMoE routing shows stronger locality than the Mixtral-calibrated workload in this study; no real Mixtral routing trace was available.'
  - 'The evaluation models one copy engine, decode only, and no expert compression or quantization.'
  - 'Benefits depend on routing and cache capacity; uniform routing produced no speedup and prefetching increased traffic in the calibrated cases.'
nextStep: 'Validate the timeline against a timing-accurate memory model or real GPU traces, then test routing traces from a broader set of Mixtral workloads.'
diagram: memory-grid
diagramAlt: 'Memory-grid schematic showing off-chip experts, a bounded HBM cache, predicted copies, demand priority, and decode stalls.'
diagramCaption: 'A sketch of off-chip experts, a bounded HBM cache, and predicted copies.'
depth: medium
visualRights: original
checkedOn: '2026-11-25'
draft: false
---

## Context and constraints

Mixtral-8x7B activates only a fraction of its experts per token, but each FP16 expert is about 352 MB and all 256 cannot fit beside non-expert weights, KV cache, and activations on one 80 GB GPU. The course question was not whether experts can be compressed, but whether a memory system can hide off-chip loads by predicting the next layer’s experts. Capacity `C` is the number of resident experts; `C = 64` is the scarce-HBM case examined here. The boundary is batch-1 decode, one GPU-class platform, and one DRAM-to-HBM link. Everything is simulation; no GPU is required.

## Mechanism

LLMSimulator had no learned router and defaulted to uniform expert selection, so the group supplied routing traces from outside the hardware model. TinyMoE used Mixtral’s MoE topology and was trained on Tiny Shakespeare and CPython code; its recorded decisions provide a learned-routing workload. A Mixtral-calibrated generator fitted published temporal-locality statistics, while uniform routing supplied a null case. The predictors were causal and training-free, combining a calibrated speculative gate with history fallback.

A Python discrete-event timeline added the missing memory behavior: a per-layer LRU HBM cache, one copy link, demand priority, next-layer prefetching, prediction-guided replacement, preemptible copies, and feedback throttling. Prefetching never changed the routed experts; it only changed when weights arrived. The memory-grid diagram follows that path from off-chip residency through a bounded cache to exposed decode stalls, with latency, traffic, and energy recorded alongside one another.

## Contribution and credit

This is Group 24 coursework. I took part in the shared implementation and evaluation. The repository doesn’t map each simulator patch, predictor, or report section to one member. It builds on LLMSimulator, Duplex, and SSD-offloading, and reimplements ideas from ST-MoE and APEX.

## Source

The repository contains the modified C++ simulators, Python predictor and timeline packages, routing workloads, unit tests, generated results, figures, and reports. The [generated results](https://github.com/leelanshkharbanda/MoE-Memory-Wall-CA-Project/blob/main/RESULTS.md) list each latency ratio with its workload, batch size, capacity, and baseline. `run_final.sh` connects the pipeline, while `tests/test_prefetch.py` checks closed-form timeline cases, causality, and I/O.

## Results

At `C = 64`, batch 1 on the simulated H100-class platform, TinyMoE-recorded routing reduced mean latency from 21.18 ms to 16.65 ms per token: a simulated **1.27×** result relative to on-demand plus LRU. Mixtral-calibrated routing moved from 23.10 ms to 22.19 ms, or **1.04×**. Uniform routing stayed at 24.73 ms for both policies, or **1.00×**. These means cover 16 sequence groups and 191 decode steps in the [results table](https://github.com/leelanshkharbanda/MoE-Memory-Wall-CA-Project/blob/main/RESULTS.md).

TinyMoE’s stronger locality lets prediction overlap useful copies; calibrated routing offers a smaller benefit; uniform routing gives the throttle no signal to exploit. Prefetching also added DRAM-to-HBM traffic. The 1.27× figure is the TinyMoE-prose result at this capacity (TinyMoE-code: 1.266×), not a general Mixtral or GPU result.

## Limits

Both simulators are analytical roofline models without DRAM timing. TinyMoE is small and its locality is likely stronger than Mixtral’s. Mixtral-calibrated routing matches published temporal statistics, but its speculative gate is the generator’s own conditional mean—an idealized predictor, not a real Mixtral router. The study also assumes one copy engine, decode-only execution, and no expert compression or quantization. It doesn’t measure Mixtral performance, GPU speedup, or production inference.

## Reproduction

On Linux, `run_final.sh` builds the modified simulator, regenerates deterministic synthetic workloads, uses the committed TinyMoE traces, runs the experiments, and invokes validation checks. The repository documents its C++, CMake, and Python requirements and the external corpora needed only for retraining. The next step is to compare the timeline with a timing-accurate memory model or real GPU traces, then repeat the capacity sweep with a broader set of recorded Mixtral workloads.
