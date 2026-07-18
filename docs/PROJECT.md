# Koda-C project working document

**Last updated:** 2026-07-18

## Product

Koda-C is a small, headless CLI over plain files. It prevents a project phase from advancing until a non-empty artifact, independent review, allowed verdict, unique review receipt, and the owner's exact receipt quote all agree on disk.

The discipline is domain-general: the produced thing may be code, prose, research, design, or another artifact. The CLI is the contract; interfaces and agent tasks sit above it.

The product originates in Kristian's repeated real workflow across C++, Swift, and Rust projects: session prompt → brief → orient → plan → produce → live → summary → push, with every phase handed to a separate reviewer chat. Koda-C automates and hardens that relay so phase depth survives without manual copy-paste.

## Owner decisions currently in force

- The build itself uses Codex's normal engineering workflow; the phase discipline lives in the product, not the process that made it.
- All persistent outputs, skills, test evidence, transcripts, and project documents live inside this repository.
- Durable Codex guidance lives in root `AGENTS.md`; repository-local skills live in the discoverable `.agents/skills/` path.
- The initial Phase 01 build attempt and unused REVISE receipt remain only in pushed Git history, not in the live `docs/sessions/` namespace.
- Every gate condition receives a deliberate mutation test proving refusal.
- Producer work and independent review are separate Codex tasks sharing one Koda session folder.
- There is one producer skill per declared native phase and one shared reviewer skill with per-phase criteria.
- A producer hands its artifact to the reviewer. Only an allowed verdict, owner receipt, and `advance` activate the next phase from config.
- Session closure is an immutable artifact with Git between preparation and verification. A new session cannot open until that close is pushed.
- The current target keeps owner receipt acknowledgement at every gate. Exception-only owner attention is a distinct open policy decision and must not be introduced silently.

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
- Kristian deliberately starts a session in the producer window by invoking `koda-c-session` with a written prompt prepared beforehand. After that opening handoff, he speaks only with the owner-facing reviewer until close. Every producer request enters that reviewer task, and every actionable handback returns as a named disk artifact.
- A new session reads the prior pushed close and final summary, then records deliberate carry-forward items in its new owner prompt.

## Current implementation

- TypeScript source built during packaging into dependency-free plain JavaScript for Node.js 22.18+.
- Configurable phase chain snapshot into each session's `state.json`.
- Commands for init, session open/status/close, review generation, receipt approval, and advancement.
- Artifact hashing, generated review metadata, unique receipts, structured Markdown approval entries, and verdict routing.
- Fail-closed checks for missing, empty, stale, malformed, duplicated, or mismatched evidence.
- Immutable close-artifact hashing plus Git-derived commit/push verification.
- Repository-local Koda-C skills: seven producer relay legs, one shared reviewer, and one close ceremony.
- A concise root `AGENTS.md` preserves repository rules without turning the build itself into a gated Koda session.
- A preserved tiny end-to-end session and normalized transcript under `docs/dogfood/`.
- A disk-backed in-phase consultation protocol lets producer skills suggest reviewer versus owner authority while sending every request to the reviewer. Reviewer advice may escalate to Kristian in the reviewer window but cannot impersonate a product ruling or become a formal phase verdict.

## Build evidence

- [Original owner contract and build-approach ruling](origin/2026-07-18-owner-contract.md)
- [Owner process origin](origin/2026-07-18-owner-process-origin.md)
- [Testing ledger](TESTING.md)
- [Visible backlog](BACKLOG.md)
- [Dated builder assessment](design-notes/2026-07-18-builder-assessment.md)
- [Codex skill-platform implications](design-notes/2026-07-18-codex-skill-platform.md)
- [Owner-facing session runtime](design-notes/2026-07-18-owner-facing-session-runtime.md)
- [Long-lived guide context research](design-notes/2026-07-18-long-lived-guide-context.md)
- Git history on `main` contains honest pushed milestones.

## Drift watch against the starting document

- **Owner-approved replacement:** Section 7's instruction to phase-gate the build itself was replaced. The product remains fully gated; its construction does not.
- **Owner-approved extension:** The minimum one reviewer skill expanded to seven producer relay skills, one shared reviewer, and one close ceremony skill.
- **Owner-approved extension:** `close.md` makes the original committed-and-pushed closure rule immutable and independently checkable.
- **Owner-approved extension:** New sessions deliberately cite prior pushed closure and summary carry-forward; phase artifacts record owner/adviser input resolved mid-phase.
- **Owner-approved extension:** Mid-phase input now has an explicit request/response artifact. The producer sends everything to the reviewer; reviewer authority covers evidence and technical questions, while owner authority is obtained through the reviewer window. The persistent reviewer may later formally review because it did not author the artifact and must disclose its consultation.
- **Transparency extension:** `PROJECT.md` and `BACKLOG.md` expose work that would otherwise live only in Codex's internal plan.
- **Codex-native packaging correction:** Skills first existed under top-level `skills/`; official discovery requires `.agents/skills/`. They were moved without duplication, and root `AGENTS.md` now holds durable repository guidance.
- **State-namespace correction:** The abandoned build attempt was removed from `docs/sessions/` after its meaningful owner contract and design note were moved to `docs/origin/` and `docs/design-notes/`. Git history retains the discarded brief and review without exposing them as live session state.
- **Owner-approved test expansion:** Receipt-adversarial, stale-review, status-truth, and bounded reviewer-fixture classes make the tests part of the product contract. The first model-assisted set stays limited to one planted defect and one honest control until target (a) is secure.
- **Platform boundary clarified:** Skill descriptions are a bounded discovery surface, not a tool-permission boundary. Koda-C tests fresh-task independence but claims mechanical enforcement only for its disk evidence and gate.
- **Boundary preserved:** A reviewer handoff is mechanically required and may run in a separate Codex task, but the CLI does not launch agents or run a daemon.
- **No change:** Sections 3–6 remain the product contract: file truth, configurable phases, independent review, verdict routing, unique receipt proof, fail-closed gates, mutation tests, and pasteable recovery actions.

Any future contradiction—not merely an extension—requires Kristian's explicit ruling before implementation.

## Roadmap vocabulary

Guide, explore, architect, and triage remain named role lenses for later skills. They do not expand the core CLI and are not part of the current target until the gate, skill relay, closure, dogfood run, and judge demo are complete.

Self-hosting Koda-C development remains an optional later validation, not the current goal. The current goal is to make the two-context producer/reviewer/owner relay strong across every phase and prove that relay in genuinely fresh tasks.

Between sessions, the leading owner-facing role is a guide/session-prompter with a long-lived project conversation. Its continuity is reconstructed from project state, prior pushed close, summary, backlog, and design notes rather than trusted to chat memory alone. It writes the next session prompt with Kristian; Kristian then invokes the existing `koda-c-session` ceremony in the producer window with that prompt. The ceremony validates and consumes the artifact without interviewing him. Whether guide and session-prompter become one skill is intentionally still open.

The mature runtime may remove even that one producer-window action: after Kristian approves the written prompt in the guide interface, a supervisor can open the session and launch a non-interactive producer plus the owner-facing reviewer. This is a roadmap orchestration layer, not current behavior and not new gate authority.

## Open owner decision

The current core demonstrates owner acknowledgement at every phase because that is the clearest answer to the original unread-review failure. The desired mature workflow may instead interrupt Kristian only for `DISCUSS`, genuine product choices, and material risk while a guide/orchestrator acknowledges routine allowed reviews.

The leading design is a config-level owner-attention policy, separate from receipt enforcement:

- `every_gate` keeps the current conservative behavior;
- a future `decisions_only` policy still requires attributable receipt acknowledgement at every gate, but permits an authorized receiving context to acknowledge routine reviews and stops for Kristian on `DISCUSS` or an explicit `owner_attention_required` marker.

Before implementing the second policy, define which role may acknowledge routine reviews, how that role is authenticated in the file record, and who may set the attention marker. Preserve the same disk gate and never represent automated acknowledgement as owner reading.
