---
name: koda-c-live
description: Exercise the active Koda session's real output and save reproducible observed evidence without confusing predictions or mocks for live results. Use only when the current phase in state.json is named live.
---

# Koda-C Live

Run or exercise the real produced thing and record what actually happens. Hand the live evidence to the shared reviewer. Do not repair production work silently, self-review, approve, advance, or summarize the session.

## ENTRY CHECK

1. Locate `koda.config.json`, the latest session, and `state.json`. Refuse if any is missing or invalid.
2. Require the current phase name to equal `live`. Refuse and name the actual phase otherwise.
3. Derive the prior phase from `state.json`; verify its artifact, definitive review, exact ledger receipt, and advancement record.
4. Require the produced output and the approved evidence manifest to exist at their cited paths. Refuse rather than substitute a mock unless the approved scope explicitly calls for one.
5. Read every direction ID released in the prior advancement record and its exact waiting-direction file. Treat those as entry inputs and cite each ID. Ignore direction recorded after Live entered; it waits for the next gate.
6. Preserve an existing live artifact unless disk contains an acknowledged blocking review bound to its current hash. Chat and waiting direction recorded after phase entry are never same-phase revision authority.

## ITS OWN JOB

Exercise the real output safely. Capture exact commands, relevant environment, observed output, and failure paths as they happen. Save durable raw logs under the session folder when the result cannot be represented faithfully in Markdown. Write `phases/<NN>-live.md` with this shape:

```markdown
# Live exercise

## Output exercised
- [`relative/path`](relative/path): <real target>

## Environment
- <runtime, platform, or relevant condition>

## Scenarios and observed results
1. **Scenario:** <real action>
   - Command or method: `<exact action>`
   - Expected: <checkable expectation>
   - Observed: <actual result>
   - Evidence: <saved log/path or concise output>
   - Verdict: PASS | FAIL | BLOCKED

## Failure-path evidence
- <refusal or failure deliberately exercised>

## Inputs resolved during this phase
- Question: <input needed, or none>
- Source and answer: <owner/adviser and answer recorded on disk>

## Limitations
- <untested condition and reason, or none>

## Review handover
- Immediate receiver: `koda-c-review`
- Evidence to inspect: <live record and raw evidence paths>
- Unresolved items: none
```

When input is needed, read and follow the [in-phase consultation protocol](../../../docs/IN-PHASE-CONSULTATION.md) completely. Remain in `live`, suggest reviewer evidence authority or owner product/risk authority, and send the request only to the reviewer. Never address the owner directly. Link the reviewer's final response. Never turn a requested expectation into an observed result.

## HANDOVER OBLIGATION

Verify that every reported result was observed, every released direction ID is cited, failures remain visible, raw evidence exists where cited, and required input is resolved. Leave `currentPhaseIndex` unchanged and create no review, approval, receipt, advancement, repair, or summary.

Run `koda status`; the phase must remain `live` and the gate must remain closed pending independent review proof. Report the artifact path and hand it to `koda-c-review`.
