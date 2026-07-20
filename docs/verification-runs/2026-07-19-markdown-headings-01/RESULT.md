# Three-window verification result

- Status: COMPLETE — OWNER-OBSERVED PASS AFTER PRESERVED FAILURES
- Live project: repository-local ignored verification area
- Initial halted launch: `bf91c29d-a7a3-4cd5-8118-80b186d7a790`
- Successful recovered launch: `6371ade2-3002-42aa-87ab-a613220b7eab`
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

## Secure-Guide recovery — fail-closed launcher-context mismatch

The persistent secure Guide found the same saved Brief decision and offered only
`1` recover Producer / `2` remain paused. Kristian selected recovery twice. Both
attempts refused before opening a role because terminal-specific locale and color
bytes in the clean saved launchers differed from bytes reconstructed under managed
Guide. Guide stayed open; the ledger and phase remained unchanged.

The [launcher-context incident](LAUNCHER-CONTEXT-MISMATCH-INCIDENT.md) records the
root cause and bounded migration contract. Repair commit `461824b` passes an
unchanged pushed **230/230** transcript under capability
`deterministic-role-launchers-v11`. The preserved launchers have been validated
read-only but not yet migrated or executed. The same session and review remain the
next human observation.

The subsequent atomic role-ownership repair is bound by pushed capability
`atomic-role-ownership-v12` at **230/230**. It retains read compatibility with the
Reviewer's already-open legacy lock; the live session remains untouched.

## Second recovery observation — pager and clipboard UX failure

On 2026-07-20, the same Reviewer context and approved Brief were recovered. The
gate again stayed shut, but the owner ceremony was still unusable: the terminal
pager warned that the terminal was not fully functional, returning required `q`,
acknowledgement depended on an automatically copied long receipt, and Ghostty
showed a paste-safety dialog after the clipboard had been replaced by copied
terminal output. All three visible consoles were closed with zero acknowledgements
and zero advancement.

This is a second human failure, not completion evidence. Its sanitized record and
replacement contract are in
[OWNER-REVIEW-CEREMONY-INCIDENT-02.md](OWNER-REVIEW-CEREMONY-INCIDENT-02.md).

## Successful recovery and full-session completion

On 2026-07-20, Kristian recovered the same dependent retry launch
`6371ade2-3002-42aa-87ab-a613220b7eab` through the persistent Guide. Koda reopened
the preserved Sol/medium Producer context and Terra/medium Reviewer context rather
than creating replacements. The inline review ceremony required no pager,
clipboard mutation, receipt paste, raw recovery command, or extra Ghostty tab.

The recovered Brief and every later phase completed the full configured chain:
Brief, Orient, Plan, Produce, Live, and Summary. Kristian read and acknowledged six
bound reviews in Window B. Koda revalidated the artifact, review hash, verdict,
short-code-to-receipt binding, and prior gate history before each advancement. The
Producer remained input-closed; the Reviewer remained the owner-facing session
context; their persistent Codex context IDs stayed distinct for the entire run.

- Session: `2026-07-19-02`
- Completed phases: 6/6
- Owner acknowledgements: 6
- Producer: `gpt-5.6-sol` / medium, 9 turns, context
  `019f7c0d-dc76-7510-8636-db23d81bf002`
- Reviewer: `gpt-5.6-terra` / medium, 8 turns, context
  `019f7c10-aabf-75d2-bc9d-3f9804992246`
- Immutable close commit: `b5105da7b9404d2d2e42421fe732d047380a599e`
- Guide archive commit: `bde0807643718b94bc0e9ee31d478b7e8d5c7d3e`
- Final repository state: clean, with local `main` exactly matching `origin/main`
- Guide return: `CLOSED_SESSION_RETURNED`

The complete verification-project history, including its pushed session evidence,
Guide return, role event streams, stderr records, and disk-derived transcript, is
preserved in [COMPLETED-SESSION-HISTORY.bundle](COMPLETED-SESSION-HISTORY.bundle).
It is a complete `main` history at archive commit `bde0807`; its SHA-256 is
`a536da61e642ca57b019b72db15145804cbcf33443de60257ee19aebdf9b8cb3`.

The human observation also found two non-gating presentation weaknesses to correct
before submission: successful command checks are too prominent in the default
stream, and Reviewer conversation sounds procedural because skill/runtime narration
surrounds otherwise useful answers. Those are UX findings from a successful run,
not gate or closure failures.
