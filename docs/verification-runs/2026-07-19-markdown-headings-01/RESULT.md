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

## Retry preparation after the repair

The first retry conversation exposed another UX failure before launch: Guide
asked Kristian to carry toolkit paths, commits, test counts, and evidence
locations from the builder context. Kristian identified that as unusable for an
ordinary human. No retry was confirmed or launched.

Koda now validates repository-contained toolkit proof itself. `guide status`
reports `TOOLKIT READY — ghostty-clean-launch-v1 — 187/187 post-push checks`, and
new confirmations bind that exact toolkit snapshot. The session-prompter forbids
technical owner relays. The unconfirmed retry was normalized to cite only the
verified capability, committed and pushed in the isolated project at `f3dc524`.

The exact draft is [archived here](RETRY-SESSION-PROMPT-DRAFT.md), and
`RETRY-DRAFT-HISTORY.bundle` preserves its complete restorable project history.
This is preparation evidence, not owner confirmation. No new launch request,
runtime, session, model context, review, receipt, or acknowledgement exists.

## Second attempt — clean launch, recoverable owner-ceremony failure

Kristian later confirmed dependent retry launch
`6371ade2-3002-42aa-87ab-a613220b7eab`. Ghostty opened exactly one Reviewer and one
Producer beside the existing Guide. No unintended tab, environment output, Node
prompt, or loose command error appeared. The Sol/medium Producer and distinct
Terra/medium Reviewer reached an APPROVE Brief review in session `2026-07-19-02`.

The acknowledgement instructions were still not fit for a first-time human. Return
appeared to mean acknowledge, but it actually exposed a second receipt-paste prompt.
Kristian pressed Return, the empty receipt correctly failed literal matching, and
both role processes exited. The phase remains Brief, the ledger has zero entries, and
nothing advanced. The artifact, review, and both context identities remain preserved.

The [receipt UX incident](RECEIPT-UX-INCIDENT.md) records the failure without the
receipt or any secret. Numbered, retryable decisions and one-action same-context Guide
recovery now pass deterministically. This attempt remains paused—not a pass—until
Kristian observes recovery and completes the session through pushed close.
