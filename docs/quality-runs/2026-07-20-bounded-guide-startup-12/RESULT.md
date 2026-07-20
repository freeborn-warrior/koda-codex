# Bounded Guide startup quality audit 12

**Date:** 2026-07-20

**Scope:** Opening or resuming the persistent Guide, long-turn visibility, terminal
input loss, real-model latency, and the boundary between deterministic mechanics and
model work.

**Result:** PUSHED MECHANICAL AND REAL-MODEL PASS

## Owner finding

The Guide appeared to inspect indefinitely during a screen recording, then closed
with a low-level readline error. The owner could not tell whether it was working,
what survived, or what to do next. This was not a presentational quirk; it made the
competition path unusable without live technical assistance.

## Corrected experience

- Opening Guide is now a bounded status turn, not implicit session preparation or a
  repository-wide reconstruction.
- Koda itself computes the exact current Guide status before invoking the model.
  Guide receives that snapshot as data and does not spend a model tool call running
  the same deterministic command.
- The terminal immediately prints `GUIDE CHECK — STARTED`, says no action is needed,
  and prints a heartbeat every 30 seconds with elapsed time and completed disk checks.
- Raw events and stderr are written continuously to mode-600 partial evidence while
  a turn runs, then atomically renamed to their final names.
- If terminal input disappears during the turn, Koda completes and preserves the
  model result, explains that typing is no longer possible, releases ownership, and
  exits successfully. Reopening resumes the same context.
- Startup and ordinary conversation read compact continuity. Full dependency entry
  checks still run when the owner actually asks to prepare or start a session.

## Real-model observation

The initial permitted Sol/medium repair probe remained slow because the model tried
to execute status itself: about 191 seconds. After moving that operation into the
trusted controller, the same persistent context returned to `guide>` in about 41
seconds with seven bounded checks and one visible heartbeat, then closed cleanly.

## Honest latency boundary

The deterministic suite uses controlled fake model processes and therefore does not
measure production model latency. Real Guide, Producer, and Reviewer turns include
model scheduling, context loading, evidence reads, reasoning, and generation. Koda
can remove redundant work, bound evidence, preserve identity, and make waiting
legible; it cannot promise a fixed response time from a remote reasoning model.

Producer and Reviewer already receive phase-bounded skill contracts and cited-evidence
limits. Summary is intentionally broader because it verifies the full session. Further
latency optimization must be measured against real turns and may never omit evidence
merely to make the interface look fast.

## Evidence

- [Development failures](../../test-results/2026-07-20-bounded-guide-startup-development-failures.md)
- [Committed-code 238-check transcript](../../test-results/2026-07-20-bounded-guide-startup-committed.md)
- [Unchanged post-push 238-check transcript](../../test-results/2026-07-20-bounded-guide-startup-pushed.md)
- [Final pushed release 238-check transcript](../../test-results/2026-07-20-bounded-guide-startup-release.md)
- Focused Guide/skill/security/integrity slice: **42/42 passed**.
- Coverage: **87.04% lines, 71.55% branches, 85.74% functions** overall.
- Toolkit capability `bounded-guide-startup-v15` binds repair commit `8c126ea`,
  pushed tested commit `104dbbe`, and the unchanged post-push transcript.
