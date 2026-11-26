---
title: 'Life OS: local records, adaptive recommendations'
question: 'Can a desktop app keep records local and still make recommendations from context?'
summary: 'A three-person Tauri 2 prototype with local SQLite records, ONNX and LanceDB memory, and recommendations from a contextual bandit. Model files need to be set up locally; some integrations use the network.'
recruiterSummary: 'I contributed to a three-person local-first desktop prototype connecting React and Tauri workflows to Rust commands, SQLite persistence, ONNX inference, LanceDB recall, and uncertainty-aware action selection. It remains an unreleased team prototype with required model provisioning and optional network integrations; the case study separates source-level implementation from user or productivity evidence.'
metaDescription: 'A three-person local-first desktop prototype using Tauri, React, Rust, SQLite, ONNX, LanceDB, and contextual recommendations.'
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
    method: 'Inspected package manifests, database migrations, and Tauri command registration.'
    source: 'https://github.com/leelanshkharbanda/Life-Os/blob/master/src-tauri/Cargo.toml'
  - claim: 'Recommendation source combines context, uncertainty, memory, and explanations'
    value: 'Linear bandit selection, Thompson-sampling alternative, LanceDB recall, and feature contributions'
    evidenceClass: 'artifact'
    method: 'Read the bandit and orchestration source, including selection, update, and explanation paths.'
    source: 'https://github.com/leelanshkharbanda/Life-Os/blob/master/src-tauri/src/ml/bandit_v2.rs'
  - claim: 'The project remains an unreleased prototype'
    value: 'No published GitHub release'
    evidenceClass: 'artifact'
    method: 'Checked the public Releases page on 2026-11-25.'
    source: 'https://github.com/leelanshkharbanda/Life-Os/releases'
limits:
  - 'No released build or sustained user study is evidenced, so usability, recommendation quality, and productivity effects remain unknown.'
  - 'ML operation requires a locally available embedding model; exercise lookup and Google Calendar sync are optional network integrations, so the prototype is not fully offline.'
  - 'The neural ensemble upgrade is planned; the inspected linear bandit path does not demonstrate a deployed neural recommender.'
  - 'Public contributor history does not establish a complete credit split among the three team members.'
  - 'Local storage and inference alone do not prove privacy, security, or cross-platform reliability.'
nextStep: 'Make a documented desktop build and network-dependency matrix, then try a small study of recommendation acceptance and outcomes.'
diagram: 'local-system'
diagramAlt: 'Original local-system diagram showing React and Tauri IPC, Rust commands, SQLite records, ONNX embeddings, LanceDB memory, and contextual recommendations.'
diagramCaption: 'Local records and inference, with model setup and optional network calls noted.'
depth: 'flagship'
visualRights: 'original'
checkedOn: '2026-11-25'
draft: false
---

## Context and constraints

A personal productivity tool has to reconcile two competing needs: it should remember enough context to be useful, and it should not turn every interaction into an unexplained cloud workflow. Life OS explores that problem as a desktop prototype for academic work, physical wellness, skills, and mental check-ins. The design question is whether local records and local inference can support adaptive, explainable recommendations.

Core records live in a local SQLite database, and the embedding path uses ONNX Runtime on the device. The README documents a first-use embedding-model download of about 500 MB, but the source only loads local model files and errors when they are absent. Model provisioning is a setup requirement. Exercise lookup and Google Calendar synchronization are optional network integrations, so the project is not fully offline.

Life OS is a three-person team prototype with no published release. The source shows the architecture and intended behavior; there’s no sustained-use or productivity study yet.

## Mechanism

The React 19 interface communicates with Rust command handlers through Tauri 2 IPC. SQLx queries a local SQLite database whose migrations cover courses, assignments, exams, sessions, workouts, skills, check-ins, weekly reviews, recommendation state, and related records. This gives the desktop application a structured source of truth for both ordinary productivity views and recommendation context.

For recommendations, the backend captures a rich context from signals such as deadlines, recent sessions, energy, mood, streaks, workload, and time of day. Similar past experiences are retrieved from LanceDB using embeddings produced through ONNX Runtime. The retrieved outcomes can enrich the context before action selection, connecting semantic recall with the structured database rather than treating memory as an isolated feature.

The recommendation model is a linear contextual bandit. The inspected orchestration calls the upper-confidence-bound path, which combines expected reward with uncertainty; the same parameter model also contains a Thompson-sampling selection alternative. Observed outcomes update the bandit's posterior parameters and reward logs. The returned recommendation includes expected reward, uncertainty, a confidence category, leading feature contributions, similar experiences, and a human-readable explanation.

The confidence label comes from model uncertainty, so it doesn’t say whether an action will help. The repository also describes a neural ensemble as a future phase; it isn’t deployed in the inspected source.

## Contribution and credit

I contributed as part of a three-person team to the shared desktop prototype spanning React/Tauri workflows, Rust commands, SQLite persistence, ONNX/LanceDB memory, and recommendation logic. The public repository doesn’t provide a complete teammate-by-module ownership record, so I don’t name collaborators or assign exclusive file ownership.

## Source

The [source repository](https://github.com/leelanshkharbanda/Life-Os) includes the frontend manifests, Rust manifest, and database migrations. The [recommendation orchestration](https://github.com/leelanshkharbanda/Life-Os/blob/master/src-tauri/src/agent/intelligence.rs) connects context capture, semantic recall, action selection, explanations, feedback, and persistence.

The repository also contains Rust and frontend tests. There’s no published release or demo link because Life OS is still an unreleased prototype.

## Results

The prototype combines React 19 and Tauri 2 at the desktop boundary, Rust and SQLx over SQLite for commands and records, ONNX Runtime for embeddings, and LanceDB for semantic memory. These parts are visible in the manifests and source; runtime quality hasn’t been measured.

The bandit source includes expected-reward prediction, uncertainty, posterior updates, feature contributions, UCB selection, and a Thompson-sampling alternative. The orchestration code assembles them into recommendations with explanations and similar experiences. There’s no controlled result showing that the suggestions improve users’ decisions.

The public Releases page had no published release on the check date.

## Limits

Life OS is not fully offline. ML operation requires a locally available embedding model; the README documents a first-use download, while the source only loads local files and errors if the model is missing. Exercise lookup and Google Calendar synchronization are optional network features. Model setup is required; those integrations are optional.

There is no released build, longitudinal user study, or controlled comparison. Recommendation acceptance, model accuracy, latency, resource use, usability, and wellbeing effects therefore remain unverified. The neural phase is planned rather than demonstrated, and the current linear model's confidence labels should not be read as calibrated probabilities of real-world benefit.

The repository also cannot establish security or privacy guarantees merely because storage and inference are local. Permissions, credential handling, data export, failure recovery, and platform packaging need separate review. Finally, public contributor history does not supply the full three-person credit split, so the portfolio does not infer one from commit counts.

## Reproduction

The README documents a frontend dependency install followed by `npm run tauri:dev` for the full desktop application; `npm run build` checks the frontend, while Rust tests exercise backend modules. Reproduction should record operating system, Tauri/WebView prerequisites, model availability, and whether optional network integrations are enabled, because those conditions materially change the boundary being tested.

A possible next step is a reproducible release candidate and a small evaluation: document the desktop build, publish a network-dependency matrix, define a few recommendation scenarios, and collect consent-based acceptance and outcome logs over a bounded study.
