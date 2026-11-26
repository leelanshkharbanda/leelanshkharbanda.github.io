---
title: 'HPC-Boost v2: four counters and a routing check'
question: 'Can four CPU performance-counter events separate malware from benign workloads without leaking binary identity into validation?'
summary: 'A team project on choosing four CPU performance counters, validating on held-out binaries, and checking whether per-binary routing helps.'
recruiterSummary: 'HPC-Boost asks whether a small set of CPU performance counters can support malware detection under a four-event budget. My contribution is framed as participation in the two-person project listed on my résumé, not sole authorship of the repository. The later v2 study used real-PMU traces, binary-grouped validation, and training-only subset selection. Its fixed-subset result is measured dataset evidence; the per-binary conditioning result is a negative finding that prevented an unjustified routing layer. The imported earlier report remains separate.'
metaDescription: 'Four-event PMU selection, binary-grouped validation, measured fixed-subset results, and a per-binary routing check.'
status: research
role: team-research
creditLabel: 'Research record · v2 team size unverified'
contribution: 'The résumé lists HPC-Boost as a two-person project but does not identify a version. This page covers the later v2 artifacts; the public record does not verify v2 team composition or module-level ownership.'
creditNote: 'The two-person label applies only to the version-unspecified résumé entry. The imported report remains separate; v2 authorship is not inferred from repository ownership.'
evidenceClass: mixed
stack:
  - Python
  - CPU performance counters
  - XGBoost
  - grouped cross-validation
links:
  - label: 'Source repository'
    url: 'https://github.com/leelanshkharbanda/HPC_Boost'
    kind: source
  - label: 'v2 results memo'
    url: 'https://github.com/leelanshkharbanda/HPC_Boost/blob/main/hpc_boost_v2/experiments/exp5_recommender/RESULTS.md'
    kind: report
  - label: 'Per-binary gate paper'
    url: 'https://github.com/leelanshkharbanda/HPC_Boost/blob/main/papers/hpc-boost-exp5-per-binary-gate.md'
    kind: report
  - label: 'Earlier imported report'
    url: 'https://github.com/leelanshkharbanda/HPC_Boost/blob/main/hpc_boost_report.txt'
    kind: report
  - label: 'v2 tests'
    url: 'https://github.com/leelanshkharbanda/HPC_Boost/tree/main/hpc_boost_v2/tests'
    kind: tests
results:
  - claim: 'Training-only fixed four-event selection on held-out binaries'
    value: 'F1 0.889; balanced accuracy 0.886; FPR 0.174'
    evidenceClass: measured
    method: 'Track-1 native x86-64 KVM real-PMU traces; 45 binaries and 225 runs; five binary-grouped outer folds; XGBoost with 100 trees and depth 4; threshold tuned on training data at TPR 0.95.'
    source: 'https://github.com/leelanshkharbanda/HPC_Boost/blob/main/hpc_boost_v2/experiments/exp5_recommender/RESULTS.md'
  - claim: 'Per-binary oracle conditioning over one global subset'
    value: '+0.0045 balanced accuracy, about 3% of total oracle headroom'
    evidenceClass: measured
    method: 'Same 45-binary Track-1 corpus; exhaustive 715 four-event subsets; pooled five binary-grouped folds; per-binary routing compared with the post-hoc global-subset ceiling.'
    source: 'https://github.com/leelanshkharbanda/HPC_Boost/blob/main/papers/hpc-boost-exp5-per-binary-gate.md'
limits:
  - 'The corpus contains 22 malware binaries from only Tsunami and Kaiji families, so the negative conditioning result is corpus-specific.'
  - 'The selected event subset changed across folds, indicating a flat family of near-equivalent subsets rather than a unique optimum.'
  - 'One detector family and one train-tuned operating point were evaluated; no operational security product or deployment outcome is claimed.'
  - 'Repository history combines an imported earlier report and later v2 work; authorship and results must be read by version.'
nextStep: 'Re-run the documented gate on a more behaviorally diverse x86-64 malware corpus before revisiting per-binary conditioning.'
diagram: counter-ledger
diagramAlt: 'Counter-ledger schematic showing grouped PMU traces, candidate event subsets, training-only selection, and held-out binary evaluation.'
diagramCaption: 'A sketch of fixed-subset selection and the per-binary routing check.'
depth: medium
visualRights: original
checkedOn: '2026-11-25'
draft: false
---

## Context and constraints

CPU performance monitoring units expose rich behavior, but only a few counters can be read together. HPC-Boost asks whether four events are enough to distinguish malicious from benign execution, and whether choosing those events per binary adds anything useful. The later v2 experiment used Track-1 native x86-64 KVM traces: 45 binaries, each run five times, comprising 22 autonomous-bot malware samples from Tsunami and Kaiji and 23 diverse benign workloads. That produced 225 binary-run rows. The four-event constraint, repeated runs, and need to generalize to unseen binaries shaped both collection and evaluation.

## Mechanism

Collection cycled through 13 guest PMU events in separate-boot groups of at most four, with `cycles` anchoring every group. Six marginal statistics per event—mean, standard deviation, p1, p99, skew, and kurtosis—made 78 features; any four-event subset contributed 24. The experiment enumerated all C(13,4) = 715 subsets. Each candidate trained an XGBoost detector with 100 trees and depth 4. Inner cross-validation chose the subset and tuned the threshold at target TPR 0.95; five outer folds held out whole binaries, never individual runs. This matters because repeated executions of one binary are correlated. The comparison baseline was 2SMaRT, and a routing ladder compared one global subset with per-family, per-binary, and per-run oracle choices.

## Contribution and credit

The résumé lists HPC-Boost as a two-person project without a version. This page covers the later v2 work. The imported `hpc_boost_report.txt` names Varun Parashar, Aaditya Gupta, and Samriddh Singh and describes an earlier workflow; it isn’t the source of the v2 numbers. The public record doesn’t provide a complete per-author map for v2.

## Source

The repository’s `hpc_boost_v2` tree contains the experiment drivers, ranking and detection modules, tests, result notes, and per-binary gate paper. `papers/hpc-boost-exp5-per-binary-gate.md` has the routing tables and selection procedure. The diagram sketches the flow: grouped trace features become candidate subsets, training data select one fixed set, and held-out binaries provide the evaluation. The earlier imported report is linked separately.

## Results

These are measured results from recorded hardware-counter runs, not synthetic detector scores. On the 45-binary corpus, the training-only fixed-four-event selector reported F1 0.889, balanced accuracy 0.886, and FPR 0.174. The values come from the [v2 results memo](https://github.com/leelanshkharbanda/HPC_Boost/blob/main/hpc_boost_v2/experiments/exp5_recommender/RESULTS.md) and five binary-grouped outer folds, with thresholds tuned only on training data at TPR 0.95.

The negative result: moving from the post-hoc global-subset ceiling to per-binary oracle routing added only 0.0045 balanced accuracy, about 3% of total oracle headroom. Roughly 96% of the headroom came from choosing one fixed subset. The [gate paper](https://github.com/leelanshkharbanda/HPC_Boost/blob/main/papers/hpc-boost-exp5-per-binary-gate.md) rejected a conditional recommender for this corpus.

## Limits

The malware side is narrow: 18 Tsunami and 4 Kaiji binaries, with 23 benign workloads. A broader malware population might behave differently. The experiment covers one native x86-64 KVM/PMU setup, one XGBoost configuration, and one operating point. The chosen event set also varied across folds, so the named representative subset is not a uniquely optimal portable signature. Most importantly, these are dataset results from an offline study. They do not establish a deployed detector, operational false-positive costs, adversarial robustness, or real-world security impact.

## Reproduction

The v2 results memo records the command and dataset name, and the repository includes tests for the loader, ranking, gate, and recommender. The Track-1 CSV isn’t committed and must be obtained from the collection host, so a fresh clone isn’t a complete reproduction package. A next step is to rerun the grouped gate on a more behaviorally diverse x86-64 malware corpus before revisiting a learned router.
