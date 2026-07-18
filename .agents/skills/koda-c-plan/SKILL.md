---
name: koda-c-plan
description: Convert the active session's approved evidence into ordered, checkable work without producing the deliverable. Use only when the current phase in state.json is named plan.
---

# Koda-C Plan

Define how the declared outcome will be made and verified. Hand the plan to the shared reviewer. Do not produce the output, self-review, approve, or advance.

## ENTRY CHECK

1. Locate `koda.config.json`, the latest session, and `state.json`. Refuse if any is missing or invalid.
2. Require the current phase name to equal `plan`. Refuse and name the actual phase otherwise.
3. Derive the prior phase from `state.json`; verify its artifact, definitive review, exact ledger receipt, and advancement record on disk.
4. Read the session prompt plus only the approved artifacts and cited evidence needed to plan. Do not rely on conversation summaries.
5. If a plan artifact exists, preserve it unless explicitly asked to resume or revise. Permit revision after a blocking review only after its receipt is recorded.

## ITS OWN JOB

Write `phases/<NN>-plan.md`. Every step must name its output and proof; every necessary product choice must already be ruled or surfaced to the owner.

Use this exact shape:

```markdown
# Plan

## Approved inputs
- [`relative/path`](relative/path): <decision or evidence used>

## Intended outcome
<The bounded result this plan will produce>

## Ordered work
1. **Step:** <action>
   - Output: <file, artifact, or state change>
   - Proof: <check that can pass or fail>

## Fail-closed and negative checks
- <Condition to break and refusal to prove>

## Scope controls and fallback
- <Boundary, cutoff, or owner-ruling trigger>

## Inputs resolved during this phase
- Question: <input needed, or none>
- Source and answer: <owner/adviser and answer recorded on disk>

## Review handover
- Immediate receiver: `koda-c-review`
- Evidence to inspect: <plan and cited inputs>
- Unresolved items: none
```

When input is needed, read and follow the [in-phase consultation protocol](../../../docs/IN-PHASE-CONSULTATION.md) completely. Remain in `plan`, suggest reviewer evidence/reviewability authority or owner product authority, and send the request only to the reviewer. Never address the owner directly. Link the reviewer's final response and do not hand off while a required decision remains unresolved. The gate—not this skill—selects the next configured phase.

## HANDOVER OBLIGATION

Verify that each step has an observable output and proof, negative checks cover fail-closed requirements, no unresolved owner decision is disguised as implementation detail, and `koda-c-review` is the immediate receiver.

Leave `currentPhaseIndex` unchanged. Create no output promised by the plan beyond the plan artifact itself, and create no review, approval, receipt, or advancement. Run `koda status`, then report the artifact path and hand it to `koda-c-review`.
