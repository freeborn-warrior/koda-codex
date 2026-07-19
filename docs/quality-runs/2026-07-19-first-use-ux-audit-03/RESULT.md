# First-use UX audit 03 — competition handoff

**Date:** 2026-07-19  
**Result:** MECHANICALLY READY FOR FRESH HUMAN RECOVERY; COMPLETE HUMAN RUN STILL OWED

## What a first-time owner now sees

Guide is the one ongoing project conversation. Starting a verified session is a
numbered decision: launch or do not launch. Guide stays open beside exactly one
visible Producer and one visible Reviewer.

Producer is watch-only. Reviewer is the owner's active-session conversation and owns
every formal decision. At a review it explains the reading step, opens the complete
review, then offers five numbered actions:

1. acknowledge and continue;
2. ask the Reviewer a question;
3. reread the review;
4. stop for now without losing the session;
5. permanently halt this attempt.

Choice 1 openly explains the remaining receipt action before asking for it. The
receipt is already copied; the owner pastes once and presses Return. A blank, changed,
or wrong paste does not end either process, write the ledger, or advance the phase.
It returns to three plain numbered choices: try again, go back, or stop safely.

The exact historical empty-receipt failure is recoverable from the same Guide
conversation. Guide reconstructs the state from disk and offers only:

```text
SESSION RECOVERY READY
1. Reopen this session
2. Not now
```

Recovery opens Reviewer first, waits for the existing decision point, then opens the
same Producer context. It does not ask the owner to carry a command, path, hash,
receipt, model ID, commit, or test count between windows.

## Mistakes exercised mechanically

Pseudo-terminal tests exercise an invalid menu number, empty question, reread, empty
halt direction, rejected halt confirmation, empty receipt, retry, exact receipt, and
stop-for-now. Mutations prove zero acknowledgement and zero advancement until the
exact valid receipt. Duplicate launch/recovery, corrupt runtime state, missing
context identity, changed review, stale artifact, and unsafe paths all refuse by
name.

A fresh Sol/medium Guide was also asked to start a conceptually dependent future
session while another session was at Brief. It created nothing, said the idea could
be discussed or preserved now, and said starting must wait for pushed close or halt.
That is the intended project-level conversational experience.

## Complexity that remains

- The receipt deliberately remains a two-part human ceremony: choose acknowledge,
  then paste the review-bound line. Collapsing those into an automatic approval would
  destroy the product's central proof.
- Codex may ask for host permission before Git or Ghostty actions. Koda can explain
  what it intends to do, but it cannot replace Codex's own permission interface.
- An idle terminal cannot notify an already-idle Guide chat. Guide reconstructs truth
  as soon as the owner speaks there; automatic notification belongs to a later UI or
  service bridge.
- Unexpected engineering crashes still expose technical diagnostics. Known owner
  mistakes are recoverable in place, but generic diagnostics are not yet a polished
  nontechnical recovery surface.
- The full three-context path still requires one owner-observed recovery followed by
  Orient, Plan, Produce, Live, Summary, and pushed close. Deterministic tests cannot
  prove visual clarity or first-time understanding.

## Evidence

- Complete deterministic suite: **197/197**.
- Coverage suite: **197/197**, 89.17% line coverage overall.
- Pushed-code durable suite:
  [197/197](../../test-results/2026-07-19-pre-handoff-pushed-final.md).
- Fresh ten-skill discovery:
  [PASS](../../discovery-runs/2026-07-19-fresh-codex-startup-06/RESULT.md).
- Fresh plural-session Guide preflight:
  [PASS](../../guide-preflight-runs/2026-07-19-sol-medium-05/RESULT.md).
- Security and package conclusions:
  [audit 08](../../security-runs/2026-07-19-pre-handoff-audit-08/RESULT.md).

The next owner interaction is a recovery test, not exploratory debugging. Koda is
mechanically ready to ask for it; the human result must still be recorded honestly.
