# Manual-terminal multi-part acknowledgement — result 10

**Date:** 2026-07-21  
**Status:** COMPLETE LOCAL PASS — POST-PUSH PROOF PENDING

## Owner-observed failure

Kristian launched the complete workflow through Apple Terminal using Guide's
manual-terminal choice. Reviewer and Producer opened from the two printed,
run-bound launcher files and retained the same visible roles as the Ghostty path.

At launch `1c2a5c0f-d578-4d64-822b-ee99fa184133`, session `2026-07-21-01`
advanced through three owner acknowledgements to Produce. The independent
GPT-5.6 Terra Reviewer returned `APPROVE WITH COMMENTS`. Kristian entered the
correct review code and supplied the comments to preserve. The acknowledgement
child then stopped with Node's `Detected unsettled top-level await` warning.

Disk-derived status immediately reported:

- runtime `PAUSED_REVIEWER_FAILURE`;
- phase 4 of 6, Produce;
- three prior owner acknowledgements;
- Reviewer job `3e50ccc6-ec1e-4862-9605-3f7589900732` failed;
- no Produce acknowledgement and no Produce advancement.

The gate therefore failed closed. The current review, exact receipt, owner-visible
comments, role context identifiers, and failed job remain in the ignored
repository-local demo project; no partial ledger entry was written.

## Root cause

Reviewer intentionally sends the receipt and required comments to the CLI through
stdin so neither value appears in process arguments or environment variables.
The CLI created and closed a new readline interface for each prompt. With piped
input, the first interface buffered both lines and returned only the receipt; the
second interface then waited on an already exhausted stream. Node detected the
unsettled top-level await and terminated the command.

The same transport defect could affect a `DISCUSS` acknowledgement that carries
an owner ruling. Ordinary one-line `APPROVE` was unaffected.

## Repair

The default CLI input adapter now reads non-terminal stdin once, queues its lines,
and supplies one line to each prompt in order. Interactive terminal prompts retain
their existing behavior. Receipt, comments, and owner ruling remain stdin-only;
the review code mapping and gate logic are unchanged.

Two controller-level regression cases exercise the complete Reviewer path:

1. `APPROVE WITH COMMENTS` must save the exact comments with the bound receipt.
2. `DISCUSS` must save the exact owner ruling with the bound receipt.

## Test evidence so far

- The new `APPROVE WITH COMMENTS` test failed **0/1** before the repair with the
  same unsettled-await warning observed by Kristian.
- After the repair, both multi-part acknowledgement tests passed **2/2**.
- Gate mutation and printed-command suites passed **36/36**.
- The focused security assertion proving receipt and ruling data stay out of
  child-process arguments and environment passed **1/1**.
- The first wider protected slice passed **78/92**. Its fourteen refusals all
  named `src/commands.ts` as changed after toolkit verification. This is the
  expected integrity bootstrap before a new tested capability is issued; no
  integrity assertion was changed or bypassed.

The first integrity-enabled complete suite passed **264/264** in
[`../../test-results/2026-07-21-owner-comments-local.md`](../../test-results/2026-07-21-owner-comments-local.md),
whose SHA-256 is
`5dca2b914f6ab217f720430970d450e0ea6d29dabc7b0828d89a3f7e190b5f3c`.
Post-push verification remains required before this repair is release-ready. The
interrupted owner run predates that proof and will not be represented as a clean
completed post-repair session.
