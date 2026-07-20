# Security audit — Reviewer session binding

- Date: 2026-07-20
- Scope: visible role startup, owner-input timing, session identity, liveness,
  permissions, direction evidence, recovery, and terminal output
- Status: **LOCAL PASS — POST-PUSH AND INDEPENDENT REVIEW PENDING**
- Local complete regression: [252/252](../../test-results/2026-07-20-reviewer-session-binding-local.md)

## Findings

- `ReviewerWindowState` now carries an optional validated dated `sessionId` and an
  explicit `STARTING` status. Existing state remains readable, while malformed or
  conflicting identity refuses.
- Owner input received before binding remains only in the live Reviewer's in-memory
  input queue. No model receives it and no direction file can be created until
  `activeSession()` validates the disk session. If the process itself is killed,
  ordinary terminal input is not claimed as durable evidence.
- Producer checks both Reviewer state and the live Reviewer lock before beginning
  Brief work. A failed Reviewer is named; absence or mismatch times out closed.
- Guide's success predicate requires runtime status `RUNNING`, no runtime error, a
  session ID, a matching Reviewer session ID, and a valid ready/working/owner state.
  Locks or incomplete JSON alone cannot create success.
- No new filesystem root, credential, network, shell, clipboard, environment, or
  model permission was introduced. The changed state remains under ignored,
  project-contained `.koda/` runtime evidence.
- Terminal copy now distinguishes `NOT OPEN YET` from `OPEN`; control and
  bidirectional-character sanitization remain unchanged.

## Remaining boundary

The deterministic tests prove ordering and refusal with real processes and terminal
input. Only a fresh owner-visible Ghostty session can prove that the complete human
experience now feels correct on the target desktop.
