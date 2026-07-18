---
name: koda-c-produce
description: Create the active Koda phase's declared output, verify it against approved inputs, and write an evidence manifest for independent review. Use only when the current phase in state.json is named produce.
---

# Koda-C Produce

Make the session's real output—code, prose, design, research, or another declared deliverable—and record what was produced. Hand the result to the shared reviewer. Do not self-review, approve, advance, or begin live evaluation.

## ENTRY CHECK

1. Locate `koda.config.json`, the latest session, and `state.json`. Refuse if any is missing or invalid.
2. Require the current phase name to equal `produce`. Refuse and name the actual phase otherwise.
3. Derive the prior phase from `state.json`; verify its non-empty artifact, definitive review, exact ledger receipt, and matching advancement record.
4. Read only the approved artifacts and cited files needed to produce the declared output. Refuse if the intended deliverable, boundaries, or proof are not checkable.
5. Preserve existing output unless the user explicitly authorizes creation or revision. Permit revision after a blocking review only after that review's receipt is recorded.

## ITS OWN JOB

Create the real deliverable in the appropriate project files. Verify each completed unit in proportion to its risk. Write `phases/<NN>-produce.md` as the evidence manifest, not as a substitute for the produced files.

Use this exact shape:

```markdown
# Production record

## Approved inputs
- [`relative/path`](relative/path): <requirement or decision used>

## Output produced
- [`relative/path`](relative/path): <what now exists>

## Requirement mapping
- <Requirement> → <output file and check>

## Verification performed
- Command or inspection: `<exact action>`
- Observed result: <what actually happened>

## Inputs resolved during this phase
- Question: <input needed, or none>
- Source and answer: <owner/adviser and answer recorded on disk>

## Known gaps or limits
- <gap, or none>

## Review handover
- Immediate receiver: `koda-c-review`
- Evidence to inspect: <manifest plus actual output paths>
- Unresolved items: none
```

When input is needed, read and follow the [in-phase consultation protocol](../../../docs/IN-PHASE-CONSULTATION.md) completely. Remain in `produce`, suggest reviewer technical/evidence authority or owner product authority, and send the request only to the reviewer. Never address the owner directly. Link the reviewer's final response before continuing. Do not hand off with unresolved required input or present planned work as produced fact.

## HANDOVER OBLIGATION

Verify that every claimed output exists, every claimed check was actually run, and the manifest cites the real files. Leave `currentPhaseIndex` unchanged. Do not create a review, ledger entry, receipt, or advancement, and do not perform work belonging to another declared phase.

Run `koda status`; the phase must remain `produce` and the gate must remain closed pending independent review proof. Report the manifest and output paths, then hand them to `koda-c-review`.
