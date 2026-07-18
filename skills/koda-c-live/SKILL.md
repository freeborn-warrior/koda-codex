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
5. Preserve an existing live artifact unless explicitly asked to resume or revise it. Permit revision after a blocking review only after that review's receipt is recorded.

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

If owner or adviser input is needed, remain in `live`, ask one clear question, and record the answer and source. Never turn a requested expectation into an observed result.

## HANDOVER OBLIGATION

Verify that every reported result was observed, failures remain visible, raw evidence exists where cited, and required input is resolved. Leave `currentPhaseIndex` unchanged and create no review, approval, receipt, advancement, repair, or summary.

Run `koda status`; the phase must remain `live` and the gate must remain closed pending independent review proof. Report the artifact path and hand it to `koda-c-review`.
