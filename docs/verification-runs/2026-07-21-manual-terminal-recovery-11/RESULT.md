# Owner-visible manual-terminal recovery and close — result 11

**Date:** 2026-07-21  
**Result:** **PASS — EXACT SAVED DECISION RECOVERED, SIX PHASES CLOSED, GUIDE RETURNED**

- Launch: `1c2a5c0f-d578-4d64-822b-ee99fa184133`
- Session: `2026-07-21-01`
- Producer: GPT-5.6 Sol / medium, context `019f8517-6f83-7e42-bbbf-2c2d4ea476e6`
- Reviewer: GPT-5.6 Terra / medium, context `019f8518-d5e5-7f91-912b-0060999bbd13`
- Completed phases: 6/6
- Owner acknowledgements: 6
- Close commit: `ed4ad4de0dde9628cc6eb7ab97c64c1d8cc15e81`
- Guide-return commit: `2a9bd70646c22fb68a10cfaa672c5a3383050eca`

## What this proves

Kristian selected Guide's manual-terminal launch choice, started the printed
Reviewer launcher first and Producer launcher second, and kept the persistent
Guide beside those two visible roles. The session used the same relay, gate, role
profiles, evidence files, and context-continuation contract as the Ghostty path;
only terminal-window creation was manual.

The first three phases advanced normally. Produce received the independent
Reviewer's `APPROVE WITH COMMENTS` verdict. The original acknowledgement then
failed after the exact receipt matched because the pre-repair CLI exhausted its
two-line stdin stream. As recorded in [result 10](../2026-07-21-manual-comments-10/RESULT.md),
the gate failed closed: no Produce approval or advancement was written.

After capabilities `multi-part-owner-ack-v26` and
`bound-owner-ack-recovery-v27` were promoted, Guide re-evaluated the unchanged
runtime and mechanically reported `SESSION RECOVERY READY`. The already-running
Guide controller had been loaded before v27, so Kristian safely closed only that
console and reopened the same persistent Guide context against the new controller.
This was a development-time hot-reload boundary, not an ordinary release step.

Guide then prepared only the two missing manual roles. Kristian reused the same
terminal windows, starting Reviewer first and Producer second. Koda-C retained
the original launch, session, review, artifact, job binding, and both role context
identities. It created neither a replacement session nor a replacement Produce
review.

Kristian acknowledged the same Produce review with its displayed eight-character
code and entered this comment:

> Preserve raw evidence for future failed verification runs; the historical-detail note is non-blocking.

[APPROVALS.md](APPROVALS.md) records that exact comment beside the original
review ID and receipt. Produce then advanced to Live. Live and Summary received
fresh reviews and acknowledgements, all six phases advanced, the immutable close
was committed and pushed, and the closed session returned to Guide.

## Disk-backed completion evidence

- [PRODUCE-REVIEW.md](PRODUCE-REVIEW.md) is the unchanged `APPROVE WITH COMMENTS`
  review whose acknowledgement first failed and later succeeded.
- [APPROVALS.md](APPROVALS.md) contains exactly six entries. The Produce entry
  preserves the non-blocking comment; no duplicate or partial pre-repair entry
  exists.
- [STATE.json](STATE.json) contains six ordered advancements ending after Summary.
- [CLOSE.md](CLOSE.md) binds final Summary review
  `b59e0dd6-cdbd-443b-93e6-5a641b949306` and session SHA-256
  `95ea5de9a9d3983ea048df9da9e564fecbe523fb4d8e6af3b4c121716e6fc1e9`.
- [GUIDE-RETURN.json](GUIDE-RETURN.json) records `CLOSED_SESSION_RETURNED`, both
  unchanged role contexts, 9 Producer turns, 6 Reviewer turns, six owner
  acknowledgements, and close commit `ed4ad4d`.
- [TRANSCRIPT.md](TRANSCRIPT.md) is the compact controller-derived phase, gate,
  commit, close, and Guide-return chronology.
- [GIT-EVIDENCE.json](GIT-EVIDENCE.json) records a clean demonstration project at
  close whose `main` and local `origin/main` both identified `ed4ad4d`.
- [REVIEWER-PRE-REPAIR-EVENTS.jsonl](REVIEWER-PRE-REPAIR-EVENTS.jsonl) preserves
  the original Reviewer context event stream through the failed decision.

Post-close status derived `COMPLETE`, `6/6`, six acknowledgements, no waiting
directions, no pending Reviewer job, and no safe action remaining. The final demo
project was clean, and its returned `main` exactly matched its local upstream.

After this public evidence was assembled, the complete Koda-C suite passed
**267/267** with zero failures, skips, cancellations, or todos. The durable
[per-test transcript](../../test-results/2026-07-21-manual-terminal-recovery-complete.md)
has SHA-256
`63d6f52d97685b656152eb98fdf23bb0ba1fef4a682932cb04638af46e501987`.

## Restorable history and security check

[COMPLETED-MANUAL-RECOVERY-HISTORY.bundle](COMPLETED-MANUAL-RECOVERY-HISTORY.bundle)
contains the complete demonstration history. `git bundle verify` reported complete
history and identical `HEAD`, `main`, and `origin/main` at Guide-return commit
`2a9bd706`. The bundle SHA-256 is
`3a1ba9fbf4bb14d12d43c49160362a876989b50aa8b694910b3012ea09b9d116`.

Before preservation, the complete working tree and every reachable Git commit
were scanned for common credential assignments, provider-key forms, and private
key headers. No match was found. The copied public evidence received the same
scan before staging. This is a bounded signature check, not a claim that arbitrary
content can never contain sensitive information.

## Honest boundary

This is not a fresh uninterrupted post-repair run. It is stronger evidence for a
different claim: the exact pre-repair, zero-write failure survived a real toolkit
repair and resumed without changing its decision provenance. The earlier failure,
the repair, the controller restart needed to load new code, the manual recovery,
and the final pushed close all remain visible rather than being rewritten as a
clean first attempt.
