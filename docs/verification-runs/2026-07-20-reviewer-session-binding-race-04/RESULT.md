# Reviewer session-binding race — owner-observed incident

- Date: 2026-07-20
- Owner-observed launch: `115c716e-1c9c-43c5-8e5d-edead043b29a`
- Result: **FAIL — REVIEWER EXPOSED INPUT BEFORE SESSION BINDING**
- Local corrected suite: [252/252](../../test-results/2026-07-20-reviewer-session-binding-local.md)
- Fresh owner-visible retry: required only after post-push and independent proof

## What happened

The Reviewer window displayed `Owner input: OPEN` and `reviewer>` while its
`RUN.json` still had no `sessionId`. Kristian typed `What's happening now?` during
that visible interval. Reviewer attempted active-session conversation immediately,
`activeSession()` found no binding, and the window exited with:

```text
REVIEWER PAUSED SAFELY
The relay has not bound a session ID yet.
```

The failed Reviewer state was written at `2026-07-20T21:47:13.523Z`. Producer
created and bound session `2026-07-20-01` at `2026-07-20T21:47:14.671Z`, about
1.1 seconds later. The owner action was valid; the interface had announced a state
that was not yet true.

No phase artifact, review, receipt, approval, or advancement was created. The
session folder contains only its prompt, state, empty approval ledger, and Guide
binding. The failed disposable demo remains under the ignored `.koda/` runtime;
this record preserves the material evidence in the repository.

## Root cause

Three separately intended rules were composed incorrectly:

1. Reviewer opened before Producer so the owner-facing role visibly existed.
2. Producer remained responsible for opening the disk-backed session.
3. Reviewer treated process startup as active-session readiness.

The launcher checked only that Reviewer had a lock and state file, then opened
Producer. Reviewer printed its input prompt immediately. Session identity was not
part of either readiness condition.

## Correction

- Reviewer now begins in explicit `STARTING` state with no bound session.
- It says owner input is not open and prints no `reviewer>` prompt yet.
- Lines typed during that gap remain queued in the same window.
- After Producer creates the session, Reviewer validates it, records the exact
  `sessionId`, changes to `READY`, and only then opens owner conversation.
- Producer waits for the live Reviewer to bind that same session before beginning
  Brief work.
- Guide launch readiness now requires live Producer plus matching bound Reviewer
  state; a missing, mismatched, incomplete, or failed state refuses.

## Executable regression

`REVIEWER STARTUP RACE` opens Reviewer without a session, types Kristian's exact
question before any prompt exists, binds the session 800 ms later, and requires the
same Reviewer process to answer it without a pause or exit. `GUIDE VISIBLE STARTUP
MUTATION` breaks each identity/readiness condition separately and requires refusal.

The first focused run was intentionally stopped by toolkit integrity after protected
startup code changed. After development hashes were rebound, 87/88 checks passed;
the one remaining failure was the old banner assertion. That assertion was
strengthened to require both `STARTING SESSION` and `SESSION READY`; the focused
slice then passed 88/88, the race/security subset passed, and the complete recorded
suite passed 252/252.
