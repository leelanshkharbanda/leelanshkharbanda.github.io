---
title: 'HPC-Boost v2: four counters and a routing check'
summary: 'Malware detection experiment under a four-PMU-counter budget with binary-grouped validation and a per-binary routing ablation.'
metaDescription: 'Four-counter CPU PMU malware detection experiment, binary-grouped validation, and per-binary routing check.'
status: research
role: team-research
creditLabel: 'Research project'
stack:
  - Python
  - CPU performance counters
  - XGBoost
  - grouped cross-validation
links:
  - label: 'Source repository'
    url: 'https://github.com/leelanshkharbanda/HPC_Boost'
    kind: 'source'
  - label: 'v2 results memo'
    url: 'https://github.com/leelanshkharbanda/HPC_Boost/blob/main/hpc_boost_v2/experiments/exp5_recommender/RESULTS.md'
    kind: 'report'
  - label: 'Per-binary gate paper'
    url: 'https://github.com/leelanshkharbanda/HPC_Boost/blob/main/papers/hpc-boost-exp5-per-binary-gate.md'
    kind: 'report'
  - label: 'v2 tests'
    url: 'https://github.com/leelanshkharbanda/HPC_Boost/tree/main/hpc_boost_v2/tests'
    kind: 'tests'
results:
  - claim: 'Single training-picked 4-event set'
    value: '0.889 F1 · 0.886 balanced accuracy · 0.174 FPR'
    evidenceClass: measured
    method: 'Track-1 x86-64 KVM PMU traces (45 binaries, 225 runs), 5 binary-grouped outer folds, XGBoost (100 trees, depth 4).'
    source: 'https://github.com/leelanshkharbanda/HPC_Boost/blob/main/hpc_boost_v2/experiments/exp5_recommender/RESULTS.md'
  - claim: 'Per-binary oracle routing vs. global subset'
    value: '+0.0045 balanced accuracy (~3% of oracle headroom)'
    evidenceClass: measured
    method: 'Exhaustive search across all 715 four-event subsets on the same 45-binary dataset.'
    source: 'https://github.com/leelanshkharbanda/HPC_Boost/blob/main/papers/hpc-boost-exp5-per-binary-gate.md'
diagram: counter-ledger
diagramAlt: 'Experiment pipeline from grouped PMU traces and four-event budgets through training-only selection to held-out binary testing.'
diagramCaption: 'Four-counter subset selection and per-binary routing check.'
depth: medium
draft: false
---

## Overview

CPUs only expose a small number of hardware performance counters (PMUs) simultaneously, typically four. HPC-Boost v2 tests whether four counters are enough to distinguish malware from benign workloads on unseen binaries, and whether choosing counters dynamically per binary actually improves on a single fixed set.

## How it works

- **Dataset & grouping:** Track-1 x86-64 KVM PMU traces covering 45 binaries (22 Tsunami/Kaiji malware samples, 23 benign workloads) run 5 times each. Outer cross-validation holds out entire binaries rather than individual runs so repeated executions don't leak into test splits.
- **Exhaustive subset search:** 13 guest PMU events yield C(13, 4) = 715 four-event subsets (6 summary stats per event = 24 features per subset), each evaluated with a 100-tree depth-4 XGBoost classifier.
- **Results:** one training-selected four-event subset hit **0.889 F1** and **0.886 balanced accuracy** on held-out binaries. Oracle per-binary routing only added **+0.0045 balanced accuracy**, showing that a single global four-event set captures ~96% of available headroom without needing a learned router.

## Code

Experiment drivers, tests, and memos live under `hpc_boost_v2/` and `papers/hpc-boost-exp5-per-binary-gate.md` in [HPC_Boost](https://github.com/leelanshkharbanda/HPC_Boost) (alongside an earlier separate report in the root directory).
