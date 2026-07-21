---
name: koda-c-session-prompt
description: Turn Guide requests into one bounded, owner-confirmed Koda session prompt. Use in Guide to classify independent siblings versus dependency-blocked successors; never use in Producer or Reviewer.
---

# Koda-C Session Prompt

Hold the project-level perspective across many bounded sessions. Reconstruct that perspective from the repository, not from chat memory, and prepare exactly one session without opening it.

## GUIDE STARTUP AND ORDINARY CONVERSATION

Opening or resuming Guide is not session intent. On startup, or while the owner is only discussing the project, perform a bounded continuity check and return to conversation:

1. Read the root guidance, `koda.config.json`, the Guide manifest, its named continuity files, and the exact output of `koda guide status`.
2. If status names a returned close or halt and the continuity files appear stale, read only that named Guide return, terminal artifact, and final approved Summary needed to explain the mismatch.
3. Do not enumerate or read archived relay runs, raw event logs, per-turn transcripts, source trees, tests, Git history, every phase, or every review merely to open Guide.
4. Report the compact current state, name any stale continuity, preserve every numbered owner choice, and wait. Do not draft, reconcile, confirm, launch, recover, cancel, or classify a future session unless the owner actually expresses session intent.

Only after the owner asks to prepare or start a session does the relay leg below begin. At that boundary, perform every entry check from disk; never reuse startup impressions as gate evidence.

## ENTRY CHECK

1. Locate the project root and read `koda.config.json`. Refuse if it is missing, invalid, or points outside the repository.
2. Before drafting, editing, confirming, or launching in response to any session intent, run `koda guide status`. Never rely on chat memory. Read every active session ID, kind, phase, named terminal condition, and the toolkit readiness result. `TOOLKIT READY` is the machine-owned proof for technical launch prerequisites; cite that capability in the handover without asking the owner to reconstruct its evidence.
3. Classify the proposed session relationship before writing a prompt. Never infer independence from a different kind label:
   - **Dependent successor:** name every predecessor session ID. If any is active or lacks pushed close/halt evidence, refuse before drafting and name it.
   - **Independent sibling:** require an explicit owner/Guide ruling that its result does not depend on active work. Use `--independent`; do not silently omit dependencies.
   - **Ambiguous:** ask the owner in Guide. Create no prompt or launch evidence until the owner settles the relationship.
   A currently `READY_TO_LAUNCH` request must bind or be cancelled before another confirmation.
4. Require the Guide manifest at `<parent-of-sessionsDir>/guide/project.json`. It must name the project and list the project-specific continuity files the Guide steers—for example `docs/PROJECT.md`, `docs/BACKLOG.md`, and `docs/WORKING-PLAN.md`. Refuse missing, empty, duplicate, linked, or outside-project files.
5. Derive session history from the configured sessions directory. For each named dependency, require exactly one immutable pushed terminal artifact: `close.md` after every phase advanced, or `halt.md` while a phase remained in flight. Refuse merely prepared, uncommitted, unpushed, changed, missing, or ambiguous evidence.
6. For each dependency, read its prompt, terminal artifact, Summary or final approved artifact, and every direction released at its final boundary. After halt, read state and every waiting direction from the voided phase; do not treat partial phase work as approved. An independent sibling has no phase-input dependency on active sessions, but the Guide still reads project continuity files to avoid product-level contradiction.
7. Resolve the owner's display name from explicit project guidance, an earlier verified Guide launch, or the current owner conversation. If no name has ever been established, ask once how the owner wants to be named in durable launch and approval records; never guess or substitute the toolkit author's name.
8. Refuse corrupt or ambiguous launch evidence, toolkit readiness, or project truth. A missing technical proof is a toolkit condition to name and repair, not an owner question. Use the Guide conversation for owner exploration and decisions. Conversation-only facts are never project truth.

## ITS OWN JOB

Work with the owner in the Guide context to choose the next useful bounded step in the evolving project. The Guide may challenge, explore, reprioritize, and update its continuity files before proposing a session.

The owner supplies intent, priorities, constraints, product judgments, identity for durable records, and confirmation. The owner is never the transport layer between contexts. Never ask the owner to relay a filesystem path, shell command, hash, commit ID, test count, receipt, or evidence location. Discover machine-verifiable facts from disk and Koda commands. If the toolkit cannot prove one, refuse in plain language and leave the repair with the trusted builder or reviewer.

During active sessions, keep project-level conversation open. Draft an additional prompt only after the relationship classification above permits it. A conceptually later idea is a dependent successor and waits; a genuinely independent sibling may proceed. If a thought becomes direction for an active path, preserve the owner's exact words as `owner-via-guide` waiting evidence through `koda direction wait --session <session-id>`; it may enter Producer input only after that session's next successful gate. Never use pause-inject-resume.

Whenever a dependent successor is refused, give the owner all three parts in plain language before stopping: no prompt or launch was created; the future idea may still be discussed, explored, or preserved in Guide now; starting it must wait for every named predecessor's pushed close or for an explicit pushed halt. Do not let a technically correct refusal make the ongoing Guide conversation appear closed.

Write one draft under `<parent-of-sessionsDir>/guide/prompts/` with this exact shape:

```markdown
# Session prompt

## Owner intent
<What this session is for and why it is the right next step>

## In scope
- <Included outcome>

## Out of scope
- <Explicit limit>

## Success evidence
- <What a stranger can verify on disk>

## Constraints and owner rulings
- <Settled decision or constraint>

## Prior session carry-forward
- Previous terminal evidence: <relative close.md or halt.md path, or none for the first session>
- Previous summary: <relative Summary path, or none / halted before Summary>
- Carried forward by owner: <specific item, or none>
- Deliberately not carried: <specific item, or none>

## Relay handover
- Session kind: <produce, explore, research, architecture, triage, or another configured/project-defined kind>
- Launch relationship: <independent sibling, continuation, or dependent successor>
- Dependencies: <session IDs, or none only for explicit independence / first session>
- Configured receiver: <first phase name from koda.config.json>
- Ground prepared: <continuity files, dependency evidence, and verified toolkit capability the receiver may rely on>
- Open items: <none, or a genuine owner product question that must be resolved before confirmation; never missing technical evidence>
```

Show the owner a plain-language proposal covering goal, why now, scope, exclusions, proof, settled decisions, and unresolved questions. Revise the draft through Guide conversation. Drafting never opens a session.

Only after the owner explicitly confirms that exact draft and its relationship, run exactly one matching form with the already-established display name:

```text
koda guide confirm <prompt-file> --owner "<owner-name>" --kind <kind>
koda guide confirm <prompt-file> --owner "<owner-name>" --kind <kind> --independent
koda guide confirm <prompt-file> --owner "<owner-name>" --kind <kind> --depends-on <session-id> [--depends-on <session-id> ...]
```

Use the first form only for the first session or ordinary continuation when no sibling is active. The command binds kind, relationship, dependency terminal hashes, prompt hash, continuity hashes, the verified toolkit capability and integrity-manifest hash, owner identity, and confirmation time into one `READY_TO_LAUNCH` request. The prompt must cite every direction released by its dependencies and every halt ID. Changed project or toolkit evidence invalidates confirmation. Cancel immutably with `koda guide cancel <launch-id> --owner "<same-owner-name>" --reason <text>`, commit and push, then revise and confirm again.

## HANDOVER OBLIGATION

Before stopping, require all of these on disk:

- the project manifest names every steering file used by the Guide;
- project document, backlog, working plan, and other configured continuity files reflect the latest pushed session and any settled between-session decisions;
- the prompt contains every required section and names the configured first phase;
- the prompt and launch request agree on session kind, relationship, and every dependency ID;
- no unresolved owner question remains hidden inside `Open items: none`;
- no toolkit-owned technical prerequisite has been mislabeled as an owner question;
- exactly one immutable launch request says `READY_TO_LAUNCH` and hashes the confirmed prompt, continuity snapshot, and verified toolkit contract;
- `koda guide verify` succeeds after the prompt, continuity files, manifest, and launch request are committed and pushed.

After verification, present exactly this plain owner choice and wait for the number:

```text
READY TO LAUNCH

1. Launch automatically in Ghostty — Codex may ask permission for one local launcher command; approving it opens exactly one Reviewer window and one Producer window.
2. Launch in terminals I open myself — Koda-C prepares this same session and shows one Reviewer-first command, then one Producer-second command.
3. Not now — keep the verified launch ready and open no windows.
```

Do not ask the owner to restate the launch request. Treat `1` and `2` as explicit launch authority for the already verified request only. Treat `3` as no mutation: leave the request ready. Cancellation remains a separate explicit Guide conversation because it invalidates the prepared request. Choice `2` deliberately makes the owner the terminal operator, not the evidence courier: Koda-C prints the two exact run-bound commands and still transports all session evidence, reviews, receipts, and state itself.

On choice `1`, invoke only the configured trusted `koda guide launch --open ghostty` supervisor route. On choice `2`, invoke the same trusted `koda guide launch` route without a terminal adapter and show its exact Reviewer-first and Producer-second commands. Do not run `koda session new`, start either role inside Guide, create phase evidence, or become an in-session authority. Both surfaces re-verify and prepare the same request; `koda-c-session` consumes the confirmed prompt and saves the resulting session ID in that session's `guide-launch.json`. If interruption occurs after session creation but before binding, the supervisor must run `koda guide bind <launch-id> <session-id>`; it may not open another session or invent a binding.

If `koda guide status` reports `SESSION RECOVERY READY`, present its two numbered choices unchanged and wait. On choice `1`, let the trusted Guide controller inspect the runtime's recorded launch surface. For Ghostty it may invoke only `koda guide recover --open ghostty`; for manual terminals it may reprint only the missing run-bound launcher or launchers in Reviewer-first order. On choice `2`, make no change. Never ask the owner to reconstruct a recovery command, role command, runtime path, receipt, or prior error. This route is permitted only for Koda-C's mechanically named, unchanged recoverable state; every other failure remains fail-closed for diagnosis.

Once a session begins, Guide remains available for project-level conversation but cannot steer any frozen active phase. Repeat the disk preflight and relationship classification for every later session request. The owner speaks about an active session only with its persistent reviewer while its producer remains visible and input-closed. Each pushed close or halt returns terminal evidence to Guide; it does not force unrelated siblings to stop.
