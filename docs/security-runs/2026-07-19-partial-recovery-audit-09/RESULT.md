# Security audit 09 — partial visible recovery

**Date:** 2026-07-19  
**Result:** PASS WITH HUMAN RECOVERY STILL OWED

## Security effect of the live failure

The failed Producer rejoin was an availability and first-use defect, not a gate
bypass. The existing reviewer-job identity guard refused a conflicting job. No
receipt entered process arguments, environment, transcript, or ledger; no approval
was written; no phase advanced; and the original Reviewer context stayed open.

## New recovery boundary

Producer-only recovery is permitted only when all of these agree on disk:

- a prior ordinary owner-receipt recovery record exists and is a real regular file;
- the run's exact error names the same review kind, phase, and `AWAITING_OWNER` state;
- the existing job is one of `formal`, `repair`, or `fresh` and remains uncompleted;
- the Reviewer lock is a real directory with a valid owner record and a live process;
- no Producer-only retry was already recorded.

The repair opens no Reviewer window. It writes no receipt or approval. After asking
Ghostty to open Producer, it waits for disk state `AWAITING_REVIEWER_WINDOW` with no
error before Guide may say Producer rejoined. A changed job ID refuses while Producer
waits, and a duplicate partial recovery refuses.

## Checks

- Exact spawned-Producer recovery: passed; Producer remained alive, preserved the
  formal job ID, and waited until an injected safe stop.
- Partial Guide recovery: passed; one Producer request, zero Reviewer requests,
  live-lock requirement, recorded retry, and duplicate refusal.
- Focused Guide/relay/security/integrity suite: **59/59**.
- Complete suite: **199/199**.
- Pushed-code suite: **199/199** at repair commit `9d4eaa7`; its
  [durable transcript](../../test-results/2026-07-19-producer-rejoin-pushed.md) is
  hash-bound by toolkit capability `ghostty-partial-recovery-v4`.
- Coverage suite: **199/199**, 89.32% lines, 69.05% branches, and 87.43%
  functions overall. The gate engine remains at 97.51% lines, 98.73% branches,
  and 100% functions.
- Existing credential, argument, clean-environment, symbolic-link, toolkit, gate,
  receipt, stale-review, status-truth, and Git-lock mutations remained green.

## Boundaries

The system still cannot prove Ghostty's visual placement or owner comprehension.
Same-user replacement of the verifier and all evidence together remains outside the
unsigned local integrity model. A terminal window that has already exited must be
closed by the human; Koda does not control window chrome. No critical or high
unmitigated security finding was introduced by this repair.
