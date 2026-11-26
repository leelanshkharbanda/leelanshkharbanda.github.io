---
title: 'RISC-V Assembler and Simulator'
summary: 'Four-person Python two-pass assembler and functional simulator for an RV32I subset.'
metaDescription: 'Four-person Python RV32I-subset assembler and functional simulator with register and memory traces.'
status: archived
role: team-project
teamSize: 4
stack:
  - Python
  - RISC-V RV32I
  - instruction encoding
links:
  - label: 'Source repository'
    url: 'https://github.com/leelanshkharbanda/RISC-V-Assembler-and-Simulator'
    kind: 'source'
results:
  - claim: 'Instruction-by-instruction trace'
    value: '32 registers, PC updates, and 64 KB byte-addressed memory dump'
    evidenceClass: artifact
    method: 'Python assembler and functional simulator CLI.'
    source: 'https://github.com/leelanshkharbanda/RISC-V-Assembler-and-Simulator'
diagram: instruction-trace
diagramAlt: 'Instruction-trace diagram showing assembly lines, RV32I field encoding, and PC/register/memory updates.'
diagramCaption: 'Assembly encoding to PC, register, and memory state.'
depth: archive
draft: false
---

## Overview

Built by a team of four for computer organization coursework: a two-pass Python assembler and functional simulator for an RV32I instruction subset. It resolves labels, encodes R-, I-, S-, B-, and J-type instructions into binary words, and steps through execution while printing the program counter, all 32 registers, and the 64 KB byte-addressed memory state.

## Source

Includes `assembler.py`, simulator modules, and sample assembly programs in [RISC-V-Assembler-and-Simulator](https://github.com/leelanshkharbanda/RISC-V-Assembler-and-Simulator).
