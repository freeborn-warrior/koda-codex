# First-use UX audit 02 — launch, review, mistake, recovery

**Date:** 2026-07-19  
**Result:** MECHANICS PASS; FRESH HUMAN RECOVERY STILL REQUIRED

## Human contract now implemented

At a formal review, the Reviewer explains how to open and leave the reader before it
does so. The complete review is followed by five numbered choices:

1. acknowledge;
2. ask the Reviewer;
3. reread;
4. stop for now without losing state;
5. permanently halt this session attempt.

Acknowledgement cannot honestly become one keystroke because the owner must still
quote the review's unique receipt. The minimum ceremony is now explicit: choose `1`,
then press Command-V and Return for the already-copied line. An empty or changed paste
does not exit, does not write the ledger, and offers numbered retry/back/stop choices.
Halt separately requires both direction and the literal confirmation `HALT`.

The real pseudo-terminal test behaves like a clumsy first-time user: invalid menu
number, empty question, reread, empty halt direction, rejected halt confirmation,
empty receipt, retry, then exact acknowledgement. Nothing advances before the final
valid receipt. A second pseudo-terminal test proves stop-for-now exits with a named
resumable `AWAITING_OWNER` state and zero ledger entries.

For the exact historical failure, Guide now shows only:

```text
SESSION RECOVERY READY
1. Reopen this session …
2. Not now …
```

It does not show role commands, runtime paths, or ask the owner to reconstruct a
technical action. Choice 1 revalidates the current toolkit, reopens Reviewer first,
waits for the same decision point, and opens Producer only afterward. Duplicate or
different failure states refuse.

## Complexity that remains honest

- An idle terminal cannot inject a notification into the already-open Codex Guide.
  Guide reconstructs the event from disk as soon as Kristian speaks there. Automatic
  notification needs a later UI or service bridge.
- Codex may present its own local-command permission prompt for launch or recovery.
  Koda names that possibility before the choice; it cannot bypass Codex's sandbox.
- A new project/session confirmation still includes Git commit and push, and Codex may
  ask separate host permissions for those operations. Consolidating that trusted
  ceremony is a worthwhile pre-submission simplification, but is not falsely claimed
  complete here.
- The CLI remains intentionally inspectable and therefore has technical diagnostic
  commands. The owner-facing Guide and Reviewer paths must not make Kristian use them.

## Evidence

- Expanded first-use, security, Guide, and relay slice: 73/73.
- Complete deterministic suite: 194/194.
- Complete coverage suite: 194/194; 89.34% line coverage overall.
- Current skill passed the packaged validator through Python.
- The real paused project now renders the two-choice recovery surface from disk.

Human proof is still required for actual Ghostty window reopening, the single host
permission prompt, visual clarity, and the remaining five phase ceremonies.
