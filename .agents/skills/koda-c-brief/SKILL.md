---
name: koda-c-brief
description: Turn the active Koda session prompt into a bounded, checkable brief and prepare evidence for the configured receiving phase. Use only when the current phase in state.json is named brief.
---

# Koda-C Brief

Translate the owner's session contract into a precise brief. Hand the completed artifact to the shared reviewer. Do not orient, plan, produce, self-review, approve, or advance.

## ENTRY CHECK

1. Locate `koda.config.json`, require the supervisor-bound `KODA_SESSION_ID`, and load only that session folder and `state.json`. Refuse missing, invalid, terminal, or ambiguous identity; never infer the latest session.
2. Require `state.json.phases[currentPhaseIndex].name` to equal `brief`. Refuse and name the actual current phase otherwise.
3. Require a non-empty `session-prompt.md`. Read it as the owner contract; do not substitute chat memory.
4. When `currentPhaseIndex > 0`, derive the prior phase from `state.json`, then verify its non-empty artifact, active review, exact receipt entry in `approvals.md`, and matching `advances` record. Refuse on the first missing proof.
5. Read every `state.json.entryDirections` record from its bound prior session before writing. Cite each exact direction ID and file in the Brief. Do not read or apply direction recorded after this Brief phase entered; it waits for the next gate.
6. If the brief artifact already exists, preserve it unless disk contains an acknowledged blocking review bound to its current hash. Chat and waiting direction recorded after phase entry are never same-phase revision authority.

## ITS OWN JOB

Write `phases/<NN>-brief.md`, where `NN` is the one-based current phase index padded to two digits. Cite `../session-prompt.md` and distinguish owner rulings from producer interpretation.

Use this exact shape:

```markdown
# Brief

## Source contract
- [Session prompt](../session-prompt.md)

## Purpose and why
<Outcome and reason>

## In scope
- <Included work>

## Out of scope
- <Explicit limit>

## Success evidence
- <Checkable proof>

## Constraints and owner rulings
- <Ruling, constraint, or none>

## Inputs resolved during this phase
- Question: <input needed, or none>
- Source and answer: <owner/adviser and answer recorded on disk>

## Deliverable or demonstration
<What will exist or be shown>

## Review handover
- Immediate receiver: `koda-c-review`
- Evidence to inspect: <artifact and cited file paths>
- Unresolved items: none
```

When input is needed mid-phase, read and follow the [in-phase consultation protocol](../../../docs/IN-PHASE-CONSULTATION.md) completely. Remain in `brief`, suggest reviewer evidence/technical authority or owner product authority, and send the disk-backed request only to the reviewer. Never address the owner directly. Link the reviewer's final response in the artifact and do not declare it ready with unresolved input. The gate—not this skill—selects the next configured phase after independent review and owner approval.

## HANDOVER OBLIGATION

Before stopping, verify from disk that the brief exists, is non-empty, cites the prompt and every entry direction ID, states scope and checkable success, resolves required input, and names `koda-c-review` as its immediate receiver. Leave `currentPhaseIndex` unchanged. Do not create or edit a review, quote a receipt, write an approval, or run `koda advance`.

Run `koda status --session <session-id>`; the phase must remain `brief` and the gate must remain closed pending independent review proof. Report the artifact path and hand it to `koda-c-review`.
