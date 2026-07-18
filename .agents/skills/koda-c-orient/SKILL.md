---
name: koda-c-orient
description: Inspect the actual cited ground for the active Koda session and write an evidence-backed orientation without planning ahead. Use only when the current phase in state.json is named orient.
---

# Koda-C Orient

Map what is true on disk before anyone plans. Hand the evidence map to the shared reviewer. Do not design the solution, schedule work, self-review, approve, or advance.

## ENTRY CHECK

1. Locate `koda.config.json`, the latest session, and `state.json`. Refuse if any is missing or invalid.
2. Require the current phase name to equal `orient`. Refuse and name the actual phase otherwise.
3. Require a non-empty session prompt and the current phase's declared input files.
4. Derive the prior phase from `state.json`; verify its non-empty artifact, definitive review, exact receipt in `approvals.md`, and matching advancement record. Never infer approval from prose.
5. If an orient artifact already exists, preserve it unless disk contains an acknowledged blocking review or a confirmed owner-direction handback bound to its current hash. Chat is never revision authority. Read and cite every applicable handback before revising.

## ITS OWN JOB

Inspect only relevant ground and cite the files actually opened. Separate observed facts, inferences, unknowns, and boundaries. Write `phases/<NN>-orient.md` with this shape:

```markdown
# Orientation

## Inputs and evidence inspected
- [`path/to/file`](../../../path/to/file): <why it matters>

## Current ground
- **Observed:** <fact proved by a cited file>
- **Inferred:** <clearly labeled inference>

## Constraints and boundaries
- <Constraint found on disk>

## Unknowns
- <Unresolved fact and why it matters>

## Inputs resolved during this phase
- Question: <input needed, or none>
- Source and answer: <owner/adviser and answer recorded on disk>

## Risks or contradictions
- <Evidence-backed risk, or none>

## Review handover
- Immediate receiver: `koda-c-review`
- Evidence to inspect: <artifact and cited paths>
- Unresolved items: none
```

Do not turn findings into a plan. When input is needed, read and follow the [in-phase consultation protocol](../../../docs/IN-PHASE-CONSULTATION.md) completely. Remain in `orient`, suggest reviewer evidence/technical authority or owner product authority, and send the request only to the reviewer. Never address the owner directly. Link the reviewer's final response and do not hand off while required input remains unresolved.

## HANDOVER OBLIGATION

Verify that every material claim is cited or labeled as inference, every unavailable fact is explicit, required input is resolved, and `koda-c-review` is the immediate receiver. Leave `currentPhaseIndex` unchanged and create no review, approval, receipt, or advancement.

Run `koda status`; the phase must remain `orient` and the gate must remain closed pending independent review proof. Report the artifact path and hand it to `koda-c-review`; the gate selects what follows.
