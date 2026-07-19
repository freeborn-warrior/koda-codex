# Owner steps — preserved three-window retry

**Current state:** session `2026-07-19-02` is safely paused at its first Brief review.
The Brief and APPROVE review exist, but the approval ledger has zero entries and no
phase advanced. The same Producer and Reviewer context identities remain bound.

The launch itself passed the repaired window boundary: one Reviewer and one Producer
opened beside the existing Guide, with no extra tabs or environment dump. The owner
ceremony then failed because Return exposed an undisclosed second receipt step and
both role processes exited after the empty paste.

## What Kristian should do when ready to continue

The repeatable-recovery repair is pushed and bound by 206/206 checks. Keep the Guide
conversation if convenient; closed Producer and Reviewer windows do
not lose the disk-backed session. Do not run a shell command, paste a path, copy a
receipt into Guide, or create another session.

Speak naturally in Guide:

> What is the current session state?

Guide will reconstruct disk truth and show exactly two choices:

1. reopen the same session;
2. not now.

If Reviewer is still running, choice 1 opens only Producer. If Reviewer has also
closed, choice 1 restores Reviewer first at the same unacknowledged review and opens
Producer only after Reviewer is ready. Codex may ask permission for one local
launcher command. No role command, runtime path, receipt, commit, or test count
should be copied by Kristian.

If either window fails, return to Guide and ask the same ordinary-language question.
Do not diagnose tabs, rerun commands, or create a new session. Koda must preserve the
same review, keep the gate shut, and offer only the recovery that disk evidence
supports.

See the [receipt UX incident](RECEIPT-UX-INCIDENT.md), the
[first-use audit](../../quality-runs/2026-07-19-first-use-ux-audit-02/RESULT.md), and
the [repeatable-recovery UX audit](../../quality-runs/2026-07-19-repeatable-recovery-ux-audit-06/RESULT.md), and
the [repeatable-recovery security audit](../../security-runs/2026-07-19-repeatable-recovery-audit-11/RESULT.md).
