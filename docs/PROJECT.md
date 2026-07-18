# Koda-C project working document

**Last updated:** 2026-07-18

## Product

Koda-C is a small, headless CLI over plain files. It prevents a project phase from advancing until a non-empty artifact, independent review, allowed verdict, unique review receipt, and the owner's exact receipt quote all agree on disk.

The discipline is domain-general: the produced thing may be code, prose, research, design, or another artifact. The CLI is the contract; interfaces and agent tasks sit above it.

## Owner decisions currently in force

- The build itself uses Codex's normal engineering workflow; the phase discipline lives in the product, not the process that made it.
- All persistent outputs, skills, test evidence, transcripts, and project documents live inside this repository.
- The initial Phase 01 build session is archive evidence only; its REVISE receipt was never used.
- Every gate condition receives a deliberate mutation test proving refusal.
- Producer work and independent review are separate Codex tasks sharing one Koda session folder.
- There is one producer skill per declared native phase and one shared reviewer skill with per-phase criteria.
- A producer hands its artifact to the reviewer. Only an allowed verdict, owner receipt, and `advance` activate the next phase from config.
- Session closure is an immutable artifact with Git between preparation and verification. A new session cannot open until that close is pushed.

## Lifecycle

```text
owner contract
  → session opens
  → current producer skill writes its artifact
  → koda-c-review independently verifies it
  → owner reads and quotes the unique receipt
  → gate routes:
      APPROVE / APPROVE WITH COMMENTS → next configured phase
      REVISE / REJECT                 → same producer phase
      DISCUSS                         → owner ruling, then fresh review
  → final declared phase advances
  → close.md is prepared
  → Git commit + push
  → close is verified
  → another session may open
```

## Context model

- A **Koda session** is the dated, disk-backed project record under the configured sessions directory.
- A **Codex task** is one agent context/window. The producer and reviewer should use separate tasks so the review does not inherit producer reasoning.
- Context handover happens through artifacts, cited evidence, reviews, receipts, and state—not through copied chat summaries.
- A new session reads the prior pushed close and final summary, then records deliberate carry-forward items in its new owner prompt.

## Current implementation

- Dependency-free TypeScript CLI running on Node.js 22.18+.
- Configurable phase chain snapshot into each session's `state.json`.
- Commands for init, session open/status/close, review generation, receipt approval, and advancement.
- Artifact hashing, generated review metadata, unique receipts, structured Markdown approval entries, and verdict routing.
- Fail-closed checks for missing, empty, stale, malformed, duplicated, or mismatched evidence.
- Immutable close-artifact hashing plus Git-derived commit/push verification.
- Repository-local Koda-C skills: seven producer relay legs, one shared reviewer, and one close ceremony.

## Build evidence

- [Archived initial approach](sessions/2026-07-18-01/ARCHIVE.md)
- [Testing ledger](TESTING.md)
- [Visible backlog](BACKLOG.md)
- Git history on `main` contains honest pushed milestones.

## Drift watch against the starting document

- **Owner-approved replacement:** Section 7's instruction to phase-gate the build itself was replaced. The product remains fully gated; its construction does not.
- **Owner-approved extension:** The minimum one reviewer skill expanded to seven producer relay skills, one shared reviewer, and one close ceremony skill.
- **Owner-approved extension:** `close.md` makes the original committed-and-pushed closure rule immutable and independently checkable.
- **Owner-approved extension:** New sessions deliberately cite prior pushed closure and summary carry-forward; phase artifacts record owner/adviser input resolved mid-phase.
- **Transparency extension:** `PROJECT.md` and `BACKLOG.md` expose work that would otherwise live only in Codex's internal plan.
- **Boundary preserved:** A reviewer handoff is mechanically required and may run in a separate Codex task, but the CLI does not launch agents or run a daemon.
- **No change:** Sections 3–6 remain the product contract: file truth, configurable phases, independent review, verdict routing, unique receipt proof, fail-closed gates, mutation tests, and pasteable recovery actions.

Any future contradiction—not merely an extension—requires Kristian's explicit ruling before implementation.

## Roadmap vocabulary

Guide, explore, architect, and triage remain named role lenses for later skills. They do not expand the core CLI and are not part of the current target until the gate, skill relay, closure, dogfood run, and judge demo are complete.
