---
name: koda-c-summary
description: Write an evidence-backed summary of the active Koda session without claiming unproved completion or session closure. Use only when the current phase in state.json is named summary.
---

# Koda-C Summary

Summarize what the session files prove. Hand the summary to the shared reviewer. Do not self-review, approve, advance, commit, push, or close the session.

## ENTRY CHECK

1. Locate `koda.config.json`, the latest session, and `state.json`. Refuse if any is missing or invalid.
2. Require the current phase name to equal `summary`. Refuse and name the actual phase otherwise.
3. Derive the prior phase from `state.json`; verify its artifact, definitive review, exact ledger receipt, and advancement record.
4. Read the session prompt, advanced phase artifacts, their active reviews, approval entries, and cited live evidence from disk. Refuse stale conversational summaries.
5. Preserve an existing summary unless disk contains an acknowledged blocking review or a confirmed owner-direction handback bound to its current hash. Chat is never revision authority. Read and cite every applicable handback before revising.

## ITS OWN JOB

Verify every completion claim before writing it. State omissions and skipped work explicitly. Write `phases/<NN>-summary.md` with this shape:

```markdown
# Session summary

## Session purpose
- Source: [`../session-prompt.md`](../session-prompt.md)
- Intended outcome: <owner contract>

## Delivered
- <claim> → [`evidence path`](evidence path)

## Gate and review record
- <phase>: <verdict and approval evidence path>

## Testing and live evidence
- <check> → <observed result and evidence path>

## Owner decisions and resolved inputs
- <decision/input and where it is recorded>

## Deviations, skips, and known gaps
- <honest difference from intent, or none>

## Closure status
- Pending: this summary still requires independent review, receipt approval, gate advancement, commit, push, and the separate close ceremony.

## Review handover
- Immediate receiver: `koda-c-review`
- Evidence to inspect: <summary and every cited proof>
- Unresolved items: none
```

When input is needed, read and follow the [in-phase consultation protocol](../../../docs/IN-PHASE-CONSULTATION.md) completely. Remain in `summary`, suggest reviewer evidence authority or owner product authority, and send the request only to the reviewer. Never address the owner directly. Link the reviewer's final response. Never call the session closed from inside the summary phase.

## HANDOVER OBLIGATION

Verify every claim against cited files, record every skip, keep closure explicitly pending, and resolve required input. Leave `currentPhaseIndex` unchanged and create no review, approval, receipt, advancement, commit, push, or close artifact.

Run `koda status`; the phase must remain `summary` and the gate must remain closed pending independent review proof. Report the summary path and hand it to `koda-c-review`.
