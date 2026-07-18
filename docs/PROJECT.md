# Koda-C project working document

**Last updated:** 2026-07-18

## Product

Koda-C is a small, headless CLI over plain files. It prevents a project phase from advancing until a non-empty artifact, independent review, allowed verdict, unique review receipt, and the owner's exact receipt quote all agree on disk.

The discipline is domain-general: the produced thing may be code, prose, research, design, or another artifact. The CLI is the contract; interfaces and agent tasks sit above it.

The product originates in Kristian's repeated real workflow across C++, Swift, and Rust projects: session prompt → brief → orient → plan → produce → live → summary → push, with every phase handed to a separate reviewer chat. Koda-C automates and hardens that relay so phase depth survives without manual copy-paste.

Koda-C is a **meta-harness**, not a claim that one generic prompt set fits every project. Its disk gate, verdict routing, receipt proof, session state, and close ceremony are stable infrastructure. A project using it should carry its own purpose-adapted `AGENTS.md`, phase skills, artifact shapes, review criteria, evidence sources, and verification commands. Writing and software projects share the relay discipline while requiring materially different producer and reviewer behavior.

## Owner decisions currently in force

- The build itself uses Codex's normal engineering workflow; the phase discipline lives in the product, not the process that made it.
- All persistent outputs, skills, test evidence, transcripts, and project documents live inside this repository.
- Durable Codex guidance lives in root `AGENTS.md`; repository-local skills live in the discoverable `.agents/skills/` path.
- The initial Phase 01 build attempt and unused REVISE receipt remain only in pushed Git history, not in the live `docs/sessions/` namespace.
- Every gate condition receives a deliberate mutation test proving refusal.
- Reviewer experiments score the specific evidence-backed CATCH separately from the chosen VERDICT; operational recovery notes never inflate either score.
- Producer work and independent review are separate Codex tasks sharing one Koda session folder.
- One persistent producer context and one separate persistent reviewer context span the full session. Both are visible side by side; Kristian may watch but not type into the producer and speaks only with the reviewer. Phase boundaries never create a fresh reviewer.
- There is one producer skill per declared native phase and one shared reviewer skill with per-phase criteria.
- A producer hands its artifact to the reviewer. Only an allowed verdict, owner receipt, and `advance` activate the next phase from config.
- Session closure is an immutable artifact with Git between preparation and verification. A new session cannot open until that close is pushed.
- The current target keeps owner receipt acknowledgement at every gate. Exception-only owner attention is a distinct open policy decision and must not be introduced silently.
- The competition entry is licensed under GPLv3 only, with `Copyright (C) 2026 Kristian Bengtsson` as the sole project copyright line.
- The product name remains **Koda-C**. The CLI command is `koda`; `koda-codex` is the lowercase repository and package slug for this Codex-built competition implementation.
- New reviewer fixtures are scored only by contracts committed before their first model run. The final model program stopped at its declared cap: two Luna baseline repeats and nine medium runs across the three new fixtures and models. All inference-chain cells passed, so no unique winner existed and the conditional low-effort confirmation was not run.

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
- Runtime continuity is session-scoped: the same producer task and the same reviewer task traverse every configured phase. Fresh reviewer tasks remain fixture/testing tools, not the intended owner session experience.
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
- A preserved fresh ephemeral Codex startup proves all nine local skills and root guidance are injected before any tool call or repository read.
- A preserved full native-chain session and normalized transcript under `docs/dogfood/`.
- Five sealed reviewer fixtures: the original hard-number capability check and honest control, plus an inference-chain plant, an imperfect-but-correct temperament control, and a missing-evidence trap.
- A completed seventeen-run model ledger: six original comparable runs, two Luna baseline repetitions, and nine new-fixture medium runs. All sealed score cells passed; Sol was operationally most consistent, while Terra recovered from path errors and Luna more often needed gate repair or skipped safe checks.
- A resumable full-relay test harness prepares a project-specific software session, persists separate producer/reviewer Codex thread IDs, re-derives every step from Koda files, pauses for Kristian's genuine receipt, and preserves a restorable Git proof bundle. Its first genuine run completed all six phases with distinct persistent contexts, an unplanned Summary REVISE recovery, seven owner acknowledgements, and a pushed immutable close.
- In supervised close, the persistent producer prepares and later verifies immutable `close.md`, while the trusted relay supervisor performs the exact intervening session commit and push. This keeps `.git` protected from model sandboxes without moving closure authority out of Koda's disk checks.
- The interim owner reader reduces Window B to `npm run relay:review`: it derives the only waiting session and current review from disk, opens the full file, detects concurrent review changes, and copies the exact receipt without printing or submitting it. This is a bridge, not the mature conversational reviewer interface.
- A disk-backed in-phase consultation protocol lets producer skills suggest reviewer versus owner authority while sending every request to the reviewer. Reviewer advice may escalate to Kristian in the reviewer window but cannot impersonate a product ruling or become a formal phase verdict.
- The competition repository contains the domain-general gate and a reference Koda-C skill set. It does not yet generate or adapt project-local guidance for a new writing or coding project.

## Build evidence

- [Original owner contract and build-approach ruling](origin/2026-07-18-owner-contract.md)
- [Owner process origin](origin/2026-07-18-owner-process-origin.md)
- [Testing ledger](TESTING.md)
- [Visible backlog](BACKLOG.md)
- [Dated builder assessment](design-notes/2026-07-18-builder-assessment.md)
- [Codex skill-platform implications](design-notes/2026-07-18-codex-skill-platform.md)
- [Owner-facing session runtime](design-notes/2026-07-18-owner-facing-session-runtime.md)
- [Long-lived guide context research](design-notes/2026-07-18-long-lived-guide-context.md)
- [Guide-to-session prompt thesis](design-notes/2026-07-18-guide-to-session-thesis.md)
- [Completed genuine six-phase relay](relay-runs/2026-07-18-software-clean-sol-medium-terra-medium-01/RESULT.md)
- [Completed reviewer model and effort matrix](MODEL-TEST-MATRIX.md)
- [Owner-readable bounded reviewer program report](test-results/2026-07-18-bounded-reviewer-model-program.md)
- [Fresh Codex startup discovery proof](discovery-runs/2026-07-18-fresh-codex-startup-01/RESULT.md)
- Git history on `main` contains honest pushed milestones.

## Drift watch against the starting document

- **Owner-approved replacement:** Section 7's instruction to phase-gate the build itself was replaced. The product remains fully gated; its construction does not.
- **Owner-approved extension:** The minimum one reviewer skill expanded to seven producer relay skills, one shared reviewer, and one close ceremony skill.
- **Owner-approved extension:** `close.md` makes the original committed-and-pushed closure rule immutable and independently checkable.
- **Owner-approved extension:** New sessions deliberately cite prior pushed closure and summary carry-forward; phase artifacts record owner/adviser input resolved mid-phase.
- **Owner-approved extension:** Mid-phase input now has an explicit request/response artifact. The producer sends everything to the reviewer; reviewer authority covers evidence and technical questions, while owner authority is obtained through the reviewer window. The persistent reviewer may later formally review because it did not author the artifact and must disclose its consultation.
- **Owner-approved runtime ruling:** The mature session is two visible persistent contexts side by side. Producer output is observable but its input is closed; only the full-session reviewer is conversational. Independent review means separation from producer context, not a new reviewer at every phase.
- **Owner-approved guide direction:** A long-lived Guide hosts a distinct `koda-c-session-prompt` skill. Only an explicitly confirmed, hashed prompt may ask the supervisor to launch the separate producer/reviewer session; pushed Summary and close evidence return to the Guide afterward.
- **Transparency extension:** `PROJECT.md` and `BACKLOG.md` expose work that would otherwise live only in Codex's internal plan.
- **Codex-native packaging correction:** Skills first existed under top-level `skills/`; official discovery requires `.agents/skills/`. They were moved without duplication, and root `AGENTS.md` now holds durable repository guidance.
- **State-namespace correction:** The abandoned build attempt was removed from `docs/sessions/` after its meaningful owner contract and design note were moved to `docs/origin/` and `docs/design-notes/`. Git history retains the discarded brief and review without exposing them as live session state.
- **Owner-approved test expansion:** Receipt-adversarial, stale-review, status-truth, and bounded reviewer-fixture classes make the tests part of the product contract. The first model-assisted baseline stayed limited to one planted defect and one honest control until the core target was secure.
- **Owner-approved fixture refinement:** The original 2/2 medium tie is treated as a fixture-floor result, not model equality. Three bounded fixtures deepen inference, temperament, and evidence-absence testing; CATCH and VERDICT are scored independently, with limited repetitions used only to expose decision-relevant variance.
- **Platform boundary clarified:** Skill descriptions are a bounded discovery surface, not a tool-permission boundary. Koda-C tests fresh-task independence but claims mechanical enforcement only for its disk evidence and gate.
- **Boundary preserved:** A reviewer handoff is mechanically required and may run in a separate Codex task, but the CLI does not launch agents or run a daemon.
- **No change:** Sections 3–6 remain the product contract: file truth, configurable phases, independent review, verdict routing, unique receipt proof, fail-closed gates, mutation tests, and pasteable recovery actions.

Any future contradiction—not merely an extension—requires Kristian's explicit ruling before implementation.

## Roadmap vocabulary

Guide, explore, architect, and triage remain named role lenses for later skills. They do not expand the core CLI and are not part of the current target until the gate, skill relay, closure, dogfood run, and judge demo are complete.

Self-hosting Koda-C development remains an optional later validation, not the current goal. The current goal is to make the two-context producer/reviewer/owner relay strong across every phase and prove that relay in genuinely fresh tasks.

The later adoption layer must turn an owner's project purpose into project-local operating material without weakening the invariant gate. Likely starting profiles are writing and software, but a profile is only a starting point: the resulting `AGENTS.md`, producer artifacts, live checks, and shared-reviewer criteria must be adapted to the actual project and remain in that project's repository. The exact bootstrap command and authoring ceremony are not yet settled.

Between sessions, the leading owner-facing role is a long-lived Guide whose continuity is reconstructed from project state, prior pushed close, summary, backlog, and design notes rather than trusted to chat memory alone. Owner direction now places a distinct `koda-c-session-prompt` skill inside that Guide conversation. It drafts one bounded prompt with Kristian, requires explicit launch confirmation, and hands a hashed ready artifact to the supervisor; the existing `koda-c-session` ceremony then validates and consumes it without interviewing him. The Guide remains separate from the launched producer and reviewer contexts and resumes from their pushed Summary and close evidence.

The mature runtime should remove even that one producer-window action: after `koda-c-session-prompt` records Kristian's explicit confirmation in the Guide, a supervisor revalidates the prior pushed close, opens the session, and launches a non-interactive producer plus the owner-facing reviewer. This is a roadmap orchestration layer, not current behavior and not new gate authority.

## Open owner decision

The current core demonstrates owner acknowledgement at every phase because that is the clearest answer to the original unread-review failure. The desired mature workflow may instead interrupt Kristian only for `DISCUSS`, genuine product choices, and material risk while a guide/orchestrator acknowledges routine allowed reviews.

The leading design is a config-level owner-attention policy, separate from receipt enforcement:

- `every_gate` keeps the current conservative behavior;
- a future `decisions_only` policy still requires attributable receipt acknowledgement at every gate, but permits an authorized receiving context to acknowledge routine reviews and stops for Kristian on `DISCUSS` or an explicit `owner_attention_required` marker.

Before implementing the second policy, define which role may acknowledge routine reviews, how that role is authenticated in the file record, and who may set the attention marker. Preserve the same disk gate and never represent automated acknowledgement as owner reading.
