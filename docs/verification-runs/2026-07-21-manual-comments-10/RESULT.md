# Manual-terminal multi-part acknowledgement — result 10

**Date:** 2026-07-21  
**Status:** POST-PUSH PASS — TOOLKIT PROMOTED

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
Pushed commit `f77f10c` then passed the unchanged complete **264/264** suite in
[`../../test-results/2026-07-21-owner-comments-pushed.md`](../../test-results/2026-07-21-owner-comments-pushed.md),
whose SHA-256 is
`f02c4025643341a32c3848cc198a23c34c1c90f8566a19437e0c27653dbfa0a9`.
Toolkit capability `multi-part-owner-ack-v26` binds that exact commit, count,
transcript, and every protected runtime file. The interrupted owner run predates
the repair and is not represented as a clean completed post-repair session.

After the promoted manifest, security audit, and public links were pushed at
`bf204f7`, the unchanged complete suite passed **264/264** once more in the
[`release transcript`](../../test-results/2026-07-21-owner-comments-release.md),
SHA-256
`2d00456b3788880b1a62c0729a91de45bc5ee62ef5af50d2730dd0c3a859ea2f`.

## Preserved-session recovery follow-up

The input repair did not by itself authorize the pre-fix failed runtime to
resume. Guide correctly continued to report `SESSION NEEDS GUIDE ATTENTION`
instead of interpreting a similar-looking failure. The recovery classifier is
now deliberately narrower than the original defect:

- the exact pre-fix unsettled-await signature must match in `RUN.json`, the
  failed Reviewer job, and Reviewer state;
- the original launch, session, Producer context, Reviewer context, current
  phase, job identity, and review path must still agree;
- `guide-launch.json` must still bind the same launch and session;
- the artifact and review must still pass every gate check except the expected
  missing acknowledgement (and the expected blocking `DISCUSS` condition where
  applicable);
- the approval ledger must still contain no entry for the current receipt; and
- the prior advancement and acknowledgement counts must still end immediately
  before the failed phase.

The valid recovery and five one-condition mutations pass **3/3** in the focused
Guide/Reviewer slice. The complete development suite passes **267/267** in
[`../../test-results/2026-07-21-owner-ack-recovery-bootstrap-refusal.md`](../../test-results/2026-07-21-owner-ack-recovery-bootstrap-refusal.md),
SHA-256
`6e21f2ef4033316569ca0397265e216fc3643f811f77e6eee54c8ee0039d9509`.
The misleading historical `bootstrap-refusal` label is retained as the immutable
run name; the recorded result itself is PASS. Repair commit `894a747` then passed
the unchanged **267/267** post-push suite and is bound as toolkit capability
`bound-owner-ack-recovery-v27`. Promoted manifest commit `a496742` passed the
unchanged **267/267** release suite once more. The owner-observed continuation
remains pending.
