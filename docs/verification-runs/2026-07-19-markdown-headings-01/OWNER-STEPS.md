# Owner steps — preserved three-window retry

**Current state:** session `2026-07-19-02` is safely paused at its first Brief review.
The Brief and APPROVE review exist, but the approval ledger has zero entries and no
phase advanced. The same Producer and Reviewer context identities remain bound.

The launch itself passed the repaired window boundary: one Reviewer and one Producer
opened beside the existing Guide, with no extra tabs or environment dump. The owner
ceremony then failed because Return exposed an undisclosed second receipt step and
both role processes exited after the empty paste.

## What Kristian should do now

Nothing yet. Keep the Guide conversation if convenient; closed Producer and Reviewer
windows do not lose the disk-backed session. Do not run a shell command, paste a path,
copy a receipt into Guide, or create another session.

The builder must first commit, push, and post-push verify the numbered retry and
recovery repair. When that is complete, speak naturally in Guide:

> What is the current session state?

Guide will reconstruct disk truth and show exactly:

1. reopen the same session;
2. not now.

If Kristian chooses 1, Codex may ask permission for one local launcher command. After
approval, Koda must open Reviewer first at the same unacknowledged review, then
Producer. No role command, runtime path, receipt, commit, or test count should be
copied by Kristian.

See the [receipt UX incident](RECEIPT-UX-INCIDENT.md), the
[first-use audit](../../quality-runs/2026-07-19-first-use-ux-audit-02/RESULT.md), and
the [security audit](../../security-runs/2026-07-19-owner-ceremony-recovery-audit-07/RESULT.md).
