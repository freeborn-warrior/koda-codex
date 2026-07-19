# Three-window verification result

- Status: HALTED — HUMAN EXPERIENCE AND SECURITY FAILURE
- Live project: repository-local ignored verification area
- Launch: `bf91c29d-a7a3-4cd5-8118-80b186d7a790`
- Confirmed project commit: `ae2255c7d738644eb6a92e58ed3bae41f3c77bfa`
- Producer: `gpt-5.6-sol` / medium; persistent context created
- Reviewer: `gpt-5.6-terra` / medium; distinct persistent context created
- Session: `2026-07-19-01`
- Reached: Brief artifact plus formal review
- Completed phases: 0/6
- Owner acknowledgements: 0
- Halt: `c9743416-67dc-45bd-b7f0-4de56c6bb300`
- Halt commit: `ba22bfe`, pushed
- Immutable close: absent by design after halt
- Guide return: halted session is visible between sessions; fresh Brief required

The Guide preflight, visible Producer, visible Reviewer, distinct model contexts,
Brief handover, formal review, and pushed halt mechanics all ran. The human launch
still failed: Ghostty created unintended tabs and an environment dump displayed an
active credential. A second routing race presented the voided review again after
halt. The role windows were closed and the runtime was reconciled from pushed disk
truth without another model call.

No receipt, credential, or unsafe screenshot is preserved here. See the sanitized
[security incident](../../security-runs/2026-07-19-ghostty-launch-integrity-incident/RESULT.md).

This attempt is evidence of failure, not a partial pass. A new session may begin
only from a fresh owner-confirmed Brief carrying the halt direction, and only after
the launcher/security repair passes complete verification.

## Repair status after this attempt

The adapter now gives Ghostty one private executable token per role, clears the
ambient environment before the role starts, strips credentials and parent context
identity from every Codex child, refuses changed or linked launchers, and gives
pushed halt evidence priority over stale runtime jobs. Focused checks passed
44/44; ordinary, coverage, and durable complete runs each passed 181/181. See the
[durable repair transcript](../../test-results/2026-07-19-ghostty-integrity-repair-complete.md).

Those results repair the deterministic contract; they do not rewrite this run as
successful. A fresh owner-observed launch is still required to prove real Ghostty
window count, permission behavior, and human clarity.
