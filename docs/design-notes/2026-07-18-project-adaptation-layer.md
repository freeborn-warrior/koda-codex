# Project adaptation is a product layer

**Date:** 2026-07-18

## Owner observation

Kristian's real projects do not share one generic instruction set. Their `AGENTS.md`, skills, evidence expectations, and review behavior are adapted to what each project is trying to accomplish. His two primary families are writing and software, but even projects within one family differ.

Koda-C is therefore a meta-harness: the competition entry builds and demonstrates the infrastructure that later projects will adopt and adapt.

## Stable invariants

These belong to the harness and must not drift by project type:

- configured disk-backed phase order;
- producer/reviewer context separation;
- non-empty phase artifact and formal review;
- verdict routing;
- unique receipt and attributable exact acknowledgement;
- artifact/review hash binding and stale-evidence refusal;
- truthful status derived from disk;
- immutable close followed by Git commit and push;
- no new session before verified closure.

## Project-local adaptation

These should live inside the adopting project's repository:

- `AGENTS.md` guidance for its actual purpose, constraints, tools, and evidence;
- one producer skill per configured phase, preserving ENTRY CHECK / ITS OWN JOB / HANDOVER OBLIGATION;
- one shared reviewer skill with criteria adapted across those phases;
- artifact shapes and citations;
- verification commands and live-evidence standards;
- vocabulary, owner decision boundaries, and risk rules.

A writing Produce phase may create and structurally inspect chapters, while a software Produce phase may change code and run deterministic tests. A writing Live phase may involve reading continuity and rendered output; software Live may exercise a built binary or application. They share proof discipline, not identical work.

## Leading adoption shape

Writing and software can be starter profiles, not final templates. An owner-facing guide or bootstrap ceremony should use the project's actual contract to tailor the files, preserve existing instructions, and disclose what came from a profile versus an owner decision. Generated output must remain in the new project's folder.

The exact command, guide boundary, conflict behavior for an existing `AGENTS.md`, and validation fixtures remain open design work. They follow the full native-session and real two-context proofs; they do not weaken or delay the competition entry's core gate.
