---
title: 'Life OS: local records, adaptive recommendations'
question: 'How can a desktop prototype keep personal records local while adapting recommendations to context and making uncertainty visible?'
summary: 'A three-person Tauri 2 prototype combining local SQLite records, ONNX embeddings, LanceDB memory, and a contextual bandit for explainable recommendations, with required model setup and optional network integrations kept explicit.'
recruiterSummary: 'I contributed to a three-person local-first desktop prototype connecting React and Tauri workflows to Rust commands, SQLite persistence, ONNX inference, LanceDB recall, and uncertainty-aware action selection. It remains an unreleased team prototype with required model provisioning and optional network integrations; the case study separates source-level implementation from user or productivity evidence.'
metaDescription: 'Life OS case study: a three-person local-first desktop prototype using Tauri, React, Rust, SQLite, ONNX, LanceDB, and contextual recommendations.'
status: 'prototype'
role: 'team-project'
teamSize: 3
contribution: 'Contributed within the verified three-person team to the shared desktop prototype spanning React/Tauri workflows, Rust commands, SQLite persistence, ONNX/LanceDB memory, and recommendation logic; individual module ownership is not inferred.'
creditNote: 'Team size 3 is verified by the local résumé. The public repository does not establish a complete teammate-by-module credit split, so no collaborators are named.'
evidenceClass: 'artifact'
stack:
  - 'Tauri 2'
  - 'React 19'
  - 'TypeScript'
  - 'Rust'
  - 'SQLx'
  - 'SQLite'
  - 'ONNX Runtime'
  - 'LanceDB'
links:
  - label: 'Source repository'
    url: 'https://github.com/leelanshkharbanda/Life-Os'
    kind: 'source'
  - label: 'Recommendation orchestration'
    url: 'https://github.com/leelanshkharbanda/Life-Os/blob/master/src-tauri/src/agent/intelligence.rs'
    kind: 'source'
  - label: 'Frontend tests'
    url: 'https://github.com/leelanshkharbanda/Life-Os/tree/master/src/__tests__'
    kind: 'tests'
results:
  - claim: 'The prototype implements a local desktop data and command boundary'
    value: 'React 19 and Tauri 2 with Rust, SQLx, and SQLite'
    evidenceClass: 'artifact'
    method: 'Inspected package manifests, database migrations, and Tauri command registration; no release artifact or user study was used as evidence.'
    source: 'https://github.com/leelanshkharbanda/Life-Os/blob/master/src-tauri/Cargo.toml'
  - claim: 'Recommendation source combines context, uncertainty, memory, and explanations'
    value: 'Linear bandit selection, Thompson-sampling alternative, LanceDB recall, and feature contributions'
    evidenceClass: 'artifact'
    method: 'Read the bandit and orchestration source to verify selection, update, and explanation paths; no recommendation accuracy or productivity improvement is claimed.'
    source: 'https://github.com/leelanshkharbanda/Life-Os/blob/master/src-tauri/src/ml/bandit_v2.rs'
  - claim: 'The project remains an unreleased prototype'
    value: 'No published GitHub release'
    evidenceClass: 'artifact'
    method: 'Checked the public Releases page on 2026-11-25; the result records release status, not adoption or production readiness.'
    source: 'https://github.com/leelanshkharbanda/Life-Os/releases'
limits:
  - 'No released build or sustained user study is evidenced, so usability, recommendation quality, and productivity effects remain unknown.'
  - 'ML operation requires a locally available embedding model; exercise lookup and Google Calendar sync are optional network integrations, so the prototype is not fully offline.'
  - 'The neural ensemble upgrade is planned; the inspected linear bandit path does not demonstrate a deployed neural recommender.'
  - 'Public contributor history does not establish a complete credit split among the three team members.'
  - 'Local storage and inference alone do not prove privacy, security, or cross-platform reliability.'
nextStep: 'Produce a documented desktop build and network-dependency matrix, then run a small longitudinal evaluation that records recommendation acceptance and outcomes without treating them as proven productivity gains.'
diagram: 'local-system'
diagramAlt: 'Original local-system diagram showing React and Tauri IPC, Rust commands, SQLite records, ONNX embeddings, LanceDB memory, and contextual recommendations.'
diagramCaption: 'Life OS keeps core records and inference inside the desktop boundary; required model provisioning and optional network integrations remain separate and explicit.'
depth: 'flagship'
visualRights: 'original'
checkedOn: '2026-11-25'
draft: false
---

## Context and constraints

A personal productivity tool has to reconcile two competing needs: it should remember enough context to be useful, and it should not turn every interaction into an unexplained cloud workflow. Life OS explores that problem as a desktop prototype for academic work, physical wellness, skills, and mental check-ins. The design question is whether local records and local inference can support adaptive, explainable recommendations.

“Local-first” is a boundary claim, not a slogan. Core records live in a local SQLite database, and the embedding path uses ONNX Runtime on the device. The README documents a first-use embedding-model download of about 500 MB, but the inspected source only loads local model files and errors when they are absent. Model provisioning is therefore a setup requirement. Exercise lookup and Google Calendar synchronization are optional network integrations, so the project is not fully offline.

The second constraint is evidence. Life OS is a three-person team prototype with no published release. Source code can demonstrate architecture and intended behavior, but it cannot establish sustained use, better decisions, improved wellbeing, or productivity gains. This case study is consequently about system design and implementation boundaries, not validated outcomes.

## Mechanism

The React 19 interface communicates with Rust command handlers through Tauri 2 IPC. SQLx queries a local SQLite database whose migrations cover courses, assignments, exams, sessions, workouts, skills, check-ins, weekly reviews, recommendation state, and related records. This gives the desktop application a structured source of truth for both ordinary productivity views and recommendation context.

For recommendations, the backend captures a rich context from signals such as deadlines, recent sessions, energy, mood, streaks, workload, and time of day. Similar past experiences are retrieved from LanceDB using embeddings produced through ONNX Runtime. The retrieved outcomes can enrich the context before action selection, connecting semantic recall with the structured database rather than treating memory as an isolated feature.

The recommendation model is a linear contextual bandit. The inspected orchestration calls the upper-confidence-bound path, which combines expected reward with uncertainty; the same parameter model also contains a Thompson-sampling selection alternative. Observed outcomes update the bandit's posterior parameters and reward logs. The returned recommendation includes expected reward, uncertainty, a confidence category, leading feature contributions, similar experiences, and a human-readable explanation.

That mechanism makes the decision process inspectable, but inspectability is not correctness. A confidence label is derived from model uncertainty, not from proof that the suggested action will help. Likewise, the repository describes a neural ensemble as a future phase; the source inspected here does not demonstrate a deployed neural recommender.

## Contribution and credit

I contributed as part of the verified three-person team to the shared desktop prototype spanning React/Tauri workflows, Rust commands, SQLite persistence, ONNX/LanceDB memory, and recommendation logic. The public repository shows the resulting system, but it does not provide a complete teammate-by-module ownership record.

Accordingly, this case study does not name collaborators, assign exclusive ownership of individual files, or imply that I built every feature alone. The contribution claim is deliberately team-scoped. The evidence supports what the prototype contains and how its parts connect; it does not support a finer credit split than the supplied résumé and repository can establish.

## Artifact

The primary artifact is the [source repository](https://github.com/leelanshkharbanda/Life-Os). The frontend manifests verify React 19 and Tauri 2, while the Rust manifest and migrations expose the SQLx/SQLite, ONNX Runtime, and LanceDB dependencies. The [recommendation orchestration](https://github.com/leelanshkharbanda/Life-Os/blob/master/src-tauri/src/agent/intelligence.rs) is a useful review entry point because it connects context capture, semantic recall, action selection, explanations, feedback, and persistence.

The repository also contains Rust tests and frontend tests, including hooks and utility suites. Their presence is implementation evidence, not a claim that every platform configuration or complete user journey has passed. There is no published GitHub release and no demo link in this case study because the supplied project facts identify Life OS as an unreleased prototype.

## Results and evidence

The verifiable result is a coherent prototype architecture: React 19 and Tauri 2 at the desktop boundary, Rust and SQLx over SQLite for commands and records, ONNX Runtime for embeddings, and LanceDB for semantic memory. Those components are visible in manifests and source. They establish implementation presence, not measured runtime quality.

The bandit source exposes expected-reward prediction, uncertainty calculation, posterior updates, feature contributions, UCB selection, and a Thompson-sampling alternative. The orchestration source then shows how those pieces are assembled into a recommendation with explanations and similar experiences. This is artifact evidence for an adaptive recommendation mechanism; there is no controlled result showing that its suggestions improve users' decisions.

Release status is also explicit: the public Releases page contained no published release on the check date. That absence is reported to prevent a prototype from being mistaken for a shipped product. It is not a negative performance result, and it says nothing about adoption that was never measured.

## Limits and non-claims

Life OS is not fully offline. ML operation requires a locally available embedding model; the README documents a first-use download, while the inspected source only loads local files and errors if the model is missing. Exercise lookup and Google Calendar synchronization are optional network features. A reviewer should distinguish required model provisioning from optional integrations.

There is no released build, longitudinal user study, or controlled comparison. Recommendation acceptance, model accuracy, latency, resource use, usability, and wellbeing effects therefore remain unverified. The neural phase is planned rather than demonstrated, and the current linear model's confidence labels should not be read as calibrated probabilities of real-world benefit.

The repository also cannot establish security or privacy guarantees merely because storage and inference are local. Permissions, credential handling, data export, failure recovery, and platform packaging need separate review. Finally, public contributor history does not supply the full three-person credit split, so the portfolio does not infer one from commit counts.

## Reproducibility and next step

The README documents a frontend dependency install followed by `npm run tauri:dev` for the full desktop application; `npm run build` checks the frontend, while Rust tests exercise backend modules. Reproduction should record operating system, Tauri/WebView prerequisites, model availability, and whether optional network integrations are enabled, because those conditions materially change the boundary being tested.

The next step is a reproducible release candidate and an honest evaluation plan: document the desktop build, publish a network-dependency matrix, define a small set of recommendation scenarios with expected behavior, and collect consent-based acceptance and outcome logs over a bounded study. Those logs would be new evidence to assess, not predetermined proof of productivity or personal benefit.
