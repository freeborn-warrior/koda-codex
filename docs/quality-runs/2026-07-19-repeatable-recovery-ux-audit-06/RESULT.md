# First-use UX audit 06 — repeatable window recovery

**Date:** 2026-07-19  
**Verdict:** PUSHED DETERMINISTIC FLOW PASS; OWNER OBSERVATION PENDING

## Why this audit happened

The live retry proved that a clean first launch was not enough. After an ordinary
owner input mistake, Reviewer recovered but Producer did not rejoin. The next
mechanical repair handled that exact partial state only while Reviewer stayed alive.
That left another first-use dead end: if Reviewer closed while Kristian was away,
the saved decision was still intact but the one-role recovery no longer applied.

The written Ghostty guide was also still describing the older 194-check repair. A
first-time user should never need to decide whether an old instruction or current
terminal state is authoritative.

## Current owner journey

The owner returns to the persistent Guide and asks in ordinary language:

> What is the current session state?

Guide reconstructs role liveness and the saved reviewer job from disk, then presents
only:

1. reopen the recoverable session;
2. not now.

The explanation adapts without asking the owner to understand a lock or runtime:

- Reviewer present, Producer absent → reopen only Producer;
- Reviewer and Producer absent → reopen Reviewer first, then Producer;
- Reviewer absent, Producer present → reopen only Reviewer;
- both present → refuse a duplicate request.

Recovery is repeatable at the same owner handover. A role that genuinely disappears
after one successful recovery can be restored again; the prior recovery record does
not turn a later missing window into a dead end. Every attempt is appended to the
runtime evidence.

## One-key and conversation boundary

Routine choices remain numbered. Free text is reserved for real Guide or Reviewer
conversation, actual owner direction, and the deliberate receipt paste after the
complete review has been read. Guide owns technical launch commands, paths, role
order, and diagnostics. The owner is never the courier.

If restored Reviewer readiness fails, Producer is not opened. If a later role fails,
Guide names the saved pause and the owner returns to the same conversation. The
process does not silently exit into a shell-command scavenger hunt.

## Evidence and limit

- Focused Guide recovery suite: 35/35.
- Complete deterministic suite: 206/206.
- Coverage suite: 206/206 at 89.03% lines, 69.12% branches, and 86.46% functions.
- Bound pushed-code suite: [206/206](../../test-results/2026-07-19-repeatable-recovery-manifest-corrected.md)
  from repair commit `b9b63eb`, bound as toolkit capability
  `ghostty-repeatable-recovery-v7`.
- The exact live verification project was inspected read-only and remains at Brief
  with zero owner acknowledgements and zero advancements.

These tests prove disk classification, request order, readiness refusal, repeatable
recovery, and owner-facing language. They cannot prove that Ghostty displays or
arranges a window correctly, that macOS shows no surprising permission dialog, or
that the words feel clear to Kristian. The next owner observation remains required.

The first final-manifest regression failed closed because its timestamp did not
exactly match the transcript and the judge assertion still named older evidence.
That failure is [preserved per test](../../test-results/2026-07-19-repeatable-recovery-manifest-assembly-failure.md);
the corrected contract requires the current 206-check proof and security audit.

After evidence commit `42476f7` was pushed, the shipped CLI performed a read-only
preflight of the real paused project. It reported the same open Brief decision,
Reviewer present, Producer missing, and only `1` reopen Producer / `2` not now. It
did not require Kristian to supply the session ID, path, command, or error history.
