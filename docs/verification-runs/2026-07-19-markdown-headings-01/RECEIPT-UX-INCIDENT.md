# Receipt acknowledgement UX incident

**Date:** 2026-07-19  
**Launch:** `6371ade2-3002-42aa-87ab-a613220b7eab`  
**Session:** `2026-07-19-02`  
**Result:** PAUSED — RECOVERABLE PRODUCT FAILURE

The repaired launcher passed its first human observation: one persistent Guide was
already open, and Koda opened exactly one Reviewer window and one Producer window.
There were no extra tabs, environment dump, Node prompt, direct-execution error, or
repeated Ghostty permission cascade. The Sol/medium Producer completed the Brief and
the distinct Terra/medium Reviewer wrote an APPROVE review.

The owner ceremony then failed. The visible prompt said Return could acknowledge,
but Return only selected acknowledgement and a second hidden step expected the
receipt paste. Kristian reasonably pressed Return. Koda received an empty line,
refused it as a receipt mismatch, and both role processes exited instead of keeping
the decision point open. The already-open Guide received no automatic message.

Disk truth after the error was safe:

- the phase remained Brief, 1/6;
- the approval ledger contained zero entries;
- no phase advanced;
- the artifact, review, review binding, Producer context ID, and Reviewer context ID
  remained intact;
- the runtime named `PAUSED_REVIEWER_FAILURE` and the exact legacy error class;
- no receipt value, credential, or unsafe screenshot is preserved in this record.

This is not an owner mistake to design around after the fact. It is evidence that the
product failed to disclose its interaction contract and treated normal human input as
a fatal process error.

## Repair contract

- The review reader explains Return, scrolling, `(END)`, and `q` before opening.
- The decision point presents numbered choices with consequences.
- Acknowledgement discloses the final paste step before accepting input.
- Wrong, empty, or unexpected input changes nothing and stays in the same loop.
- Stop-for-now preserves `AWAITING_OWNER` rather than fabricating failure.
- The historical exact failure can reopen the same review and persistent contexts.
- Guide recovery is one owner choice; Guide never prints role commands for Kristian
  to transport.
- The receipt and any owner comments or ruling travel to the deterministic CLI over
  stdin, not process arguments, environment, model chat, or durable event logs.

Deterministic proof is recorded separately. This live run remains paused and is not a
human pass until the repaired recovery and the remainder of all six phases are
observed by Kristian.
