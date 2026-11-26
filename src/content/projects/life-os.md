---
title: 'Life OS: local records, adaptive recommendations'
summary: 'Three-person Tauri desktop app using SQLite, local ONNX embeddings, LanceDB recall, and a contextual bandit.'
metaDescription: 'Three-person Tauri desktop app with React, Rust, SQLite, ONNX embeddings, LanceDB, and a contextual bandit.'
status: 'prototype'
role: 'team-project'
teamSize: 3
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
  - claim: 'Local desktop storage & command layer'
    value: 'Tauri 2 + React 19 talking to Rust, SQLx, and SQLite'
    evidenceClass: 'artifact'
    method: 'Cargo.toml, SQLite migrations, and Tauri command handlers.'
    source: 'https://github.com/leelanshkharbanda/Life-Os/blob/master/src-tauri/Cargo.toml'
  - claim: 'Context + recall + bandit loop'
    value: 'Linear contextual bandit (UCB & Thompson sampling), LanceDB recall, and feature attributions'
    evidenceClass: 'artifact'
    method: 'Implemented in intelligence.rs and bandit_v2.rs.'
    source: 'https://github.com/leelanshkharbanda/Life-Os/blob/master/src-tauri/src/ml/bandit_v2.rs'
diagram: 'local-system'
diagramAlt: 'Desktop architecture showing React UI, Tauri IPC, Rust commands, SQLite, ONNX embeddings, LanceDB, and bandit recommendations.'
diagramCaption: 'Local storage and on-device embedding/bandit loop.'
depth: 'flagship'
draft: false
---

## Overview

Life OS is a desktop productivity and wellness app built by a team of three using Tauri 2, React 19, and Rust. It stores courses, assignments, study sessions, workouts, skills, and daily check-ins in a local SQLite database and uses an on-device embedding + contextual bandit loop to suggest what to do next.

## How it works

- **Persistence:** React communicates over Tauri IPC with Rust commands backed by SQLx and SQLite migrations.
- **Semantic recall:** context from recent sessions, deadlines, energy, mood, and streaks is embedded locally with ONNX Runtime to pull similar past entries from LanceDB.
- **Action selection:** a linear contextual bandit (`intelligence.rs` and `bandit_v2.rs`) picks actions with UCB or Thompson sampling, logs feature contributions so each suggestion comes with a plain explanation, and updates weights from user feedback. Optional integrations cover Google Calendar sync and exercise lookups.

## Running locally

Install frontend dependencies and run `npm run tauri:dev` (with the local ONNX embedding model in place), or run `npm run build` and `cargo test` in [Life-Os](https://github.com/leelanshkharbanda/Life-Os).
