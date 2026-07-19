# Producer rejoin incident

**Observed:** 2026-07-19 18:09 America/New_York  
**Session:** `2026-07-19-02`  
**Launch:** `6371ade2-3002-42aa-87ab-a613220b7eab`  
**Classification:** LIVE HUMAN RECOVERY FAILURE; GATE REMAINED CLOSED

## What Kristian saw

Guide accepted the one-action recovery. The same Reviewer reopened successfully and
restored the unacknowledged Brief review at its owner decision point. The Producer
window then exited with:

```text
A different reviewer job is already active: formal brief (AWAITING_OWNER).
```

The Reviewer stayed open. No receipt was recorded, no approval entry was created,
and Brief did not advance. Kristian correctly recognized that one of the two session
roles had not survived recovery and stopped before reading or acknowledging again.

## Cause

The recovered Reviewer correctly changed the existing formal-review job from the
legacy failed state to `AWAITING_OWNER`. The restarted Producer reconstructed the
artifact and review from disk, saw that approval was absent, and attempted to create
a second `acknowledge` job. The job identity guard correctly refused that conflicting
write, but Producer treated the refusal as a fatal relay error instead of rejoining
the already-active formal-review handover.

The prior recovery test proved window ordering but mocked both windows after open. It
did not run the restarted Producer against the exact `formal + AWAITING_OWNER`
interleaving. It was therefore insufficient.

## Repair

- Producer now recognizes that an existing `formal`, `repair`, or `fresh` job for the
  same phase and review still owns the owner decision. It waits on that exact job ID
  instead of creating a second acknowledgement job.
- Job replacement while Producer waits refuses by identity.
- Guide recognizes this exact partial recovery from disk and offers only:
  `1. Reopen only the missing Producer` or `2. Not now`.
- The partial recovery requires the original recovery record, the matching
  `AWAITING_OWNER` review job, and a live Reviewer lock. It opens no second Reviewer.
- Guide does not claim recovery success merely because Ghostty accepted the window
  request. It waits until Producer actually reports that it rejoined the Reviewer
  handover.

## Evidence

- First focused relay run: **17/18**. The new product behavior was correct, but the
  assertion read streamed stdout immediately after observing disk state and raced
  the output event. The test now waits boundedly for both signals.
- Corrected relay-window run: **18/18**.
- First combined recovery/security run: **58/59**. The implementation changed Guide
  output from future tense (“will reopen”) to the truthful post-verification tense
  (“reopened”); the stale exact-word assertion was corrected without removing the
  requirement.
- Corrected combined recovery/security run: **59/59**.
- Complete living suite: **199/199**.

Kristian has not yet retried the Producer. Human recovery remains unproved until the
repair is committed, pushed, integrity-bound, and observed in the same open session.
