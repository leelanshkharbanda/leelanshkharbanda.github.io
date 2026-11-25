---
title: 'RISC-V Assembler and Simulator'
question: 'How does assembly become an inspectable sequence of register and memory states?'
summary: 'A four-person Python project that makes an RV32I subset visible through assembly encoding, execution traces, and memory dumps.'
recruiterSummary: 'This four-person team project turns a supported subset of RV32I assembly into machine code and an inspectable functional execution. I contributed within the shared team rather than claiming sole ownership of the assembler, simulator, or instruction coverage. The repository documents label resolution, 32 registers, byte-addressed memory, and trace output. Its value is pedagogical: a learner can connect an instruction’s encoding to the next program-counter and register state. The artifact is source and example output, not evidence of complete RV32I conformance or hardware performance.'
metaDescription: 'A four-person Python RV32I-subset assembler and functional simulator with instruction traces, register state, and memory inspection.'
status: archived
role: team-project
teamSize: 4
contribution: 'Contributed within a four-person team to the Python assembler and functional simulator; the public artifact does not support assigning every instruction encoder or simulator module individually.'
creditNote: "Shared Breaking Bytes team work; this entry describes the repository's RV32I subset rather than complete ISA conformance."
evidenceClass: artifact
stack:
  - Python
  - RISC-V RV32I
  - instruction encoding
links:
  - label: 'Source repository'
    url: 'https://github.com/leelanshkharbanda/RISC-V-Assembler-and-Simulator'
    kind: source
results:
  - claim: 'Instruction execution is inspectable'
    value: '32-register model, program-counter trace, and final memory dump'
    evidenceClass: artifact
    method: 'Repository README and Python assembler/simulator workflow document binary output, register state after each instruction, and memory inspection.'
    source: 'https://github.com/leelanshkharbanda/RISC-V-Assembler-and-Simulator'
limits:
  - 'The implementation supports an RV32I subset, not the complete RV32I base integer instruction set.'
  - 'The documented memory model is limited to 64 KB and excludes privilege levels, floating-point, and compressed instructions.'
  - 'Functional simulation is not cycle-accurate modeling, hardware measurement, or a performance benchmark.'
nextStep: 'Add instruction-level conformance tests against an independent RV32I reference before expanding the supported subset.'
diagram: instruction-trace
diagramAlt: 'Instruction-trace schematic connecting assembly, binary encoding, program-counter updates, register state, and memory output.'
diagramCaption: 'Original text-equivalent trace for the archive entry; it illustrates functional execution rather than hardware timing.'
depth: archive
visualRights: original
checkedOn: '2026-11-25'
draft: false
---

## Context

RISC-V Assembler and Simulator is a four-person computer-organization project built to make instruction execution easier to inspect. A two-pass Python assembler resolves labels and encodes supported R-, I-, S-, B-, and J-type instructions. The functional simulator then models 32 registers, byte-addressed memory, a program counter, and data-memory access. The repository’s learning goal is concrete: connect assembly text and binary encoding to the state changes produced by each instruction.

## Contribution and credit

The work is credited to the four-person team. I contributed within that shared effort, but the public files do not provide a reliable per-member map for every encoder, decoder, or memory operation. This entry therefore describes the combined artifact rather than assigning all assembler and simulator work individually. The instruction-trace diagram is a new portfolio schematic, not a screenshot or a claim about the original team’s visual assets.

## Evidence

The source repository includes `assembler.py`, simulator modules, an example assembly program, generated binary output, and usage instructions. A reader can assemble a program, load the resulting words, run the CPU, and inspect the execution trace and final memory state. That is **artifact/source evidence** of a functional learning tool. It demonstrates implementation and inspectability; it does not turn simulated state transitions into a hardware measurement.

## Limits

The supported instruction set is an RV32I subset, not complete RV32I. The documented simulator uses 64 KB of memory and has no privilege levels, floating-point support, or compressed instructions. It is also not cycle-accurate, so no timing, throughput, or hardware-efficiency claim follows from the trace. The next useful increment is a conformance-tested instruction subset with explicit expected register and memory states.
