# Owner ruling — wait or halt, never steer

**Date:** 2026-07-19
**Status:** Settled product contract; replaces the proposed pause-at-checkpoint transfer

## The only two transitions

Koda-C supports two responses when owner direction appears during an active phase:

1. **Wait — the default.** Record the exact direction immediately as timestamped disk evidence bound to the active phase-entry contract and the artifact state observed at receipt. Producer does not read or apply it during that phase. The current artifact is reviewed only against the inputs frozen at phase entry. At the next successful gate, Koda binds every waiting direction into the receiving phase's entry evidence.
2. **Halt — the only interrupt.** End the active session attempt without treating the in-flight phase as produced, reviewed, or approved. Preserve an immutable halt record, commit and push it, then return the work through a new session and fresh Brief containing the direction.

There is no pause-inject-resume path. A direction may never become another current-phase input after entry. That would split provenance and make independent review ambiguous.

## Consequences

- Conversation must never be the only copy of direction. Guide and Reviewer record it immediately.
- Recording is not steering. Waiting evidence remains outside Producer's active-phase contract until the gate boundary.
- If an artifact cites or uses a direction queued after its phase entry, the gate must refuse the provenance violation by name.
- The gate that closes the current phase remains judged against the original frozen entry contract.
- The receiving phase must cite every direction Koda applied at its entry boundary.
- Direction introduced at a formal review is still new direction, not a reason to rewrite already reviewed work. Review defects use the review verdicts; new direction waits for the receiving phase.
- Halt is explicit owner authority. A reviewer may explain or offer it, but may not infer or execute it from ordinary conversation.
- A halted session is terminal only after its immutable halt evidence is committed and pushed. Only then may the new Brief session open.

## Evidence shape

A waiting record must bind at least:

- unique direction ID, timestamp, source interface, and exact owner words;
- session, current phase, phase index, and frozen phase-entry identity;
- current artifact path plus its observed content hash, or an explicit `ABSENT` state;
- current review hash when one already exists;
- the Reviewer or Guide classification that caused recording.

The advancement record is the atomic application evidence: it lists the waiting direction IDs released at that boundary. The next phase entry derives its required direction inputs from that record. This avoids a mutable queue flag and makes status truth re-derivable from ordinary files.

## Historical correction

The first always-open Reviewer slice safely printed `OWNER DIRECTION — NOT SENT` and wrote no file because transfer authority was then unresolved. That behavior is preserved in its dated test evidence but is now superseded by this ruling. The next implementation must record immediately while retaining the proved no-current-phase-mutation boundary.
