---
name: koda-c-session-prompt
description: Turn Guide requests into one bounded, owner-confirmed Koda session prompt. Use in Guide to classify independent siblings versus dependency-blocked successors; never use in Producer or Reviewer.
---

# Koda-C Session Prompt

Hold the project-level perspective across many bounded sessions. Reconstruct that perspective from the repository, not from chat memory, and prepare exactly one session without opening it.

## ENTRY CHECK

1. Locate the project root and read `koda.config.json`. Refuse if it is missing, invalid, or points outside the repository.
2. Before drafting, editing, confirming, or launching in response to any session intent, run `koda guide status`. Never rely on chat memory. Read every active session ID, kind, phase, and named terminal condition.
3. Classify the proposed session relationship before writing a prompt. Never infer independence from a different kind label:
   - **Dependent successor:** name every predecessor session ID. If any is active or lacks pushed close/halt evidence, refuse before drafting and name it.
   - **Independent sibling:** require an explicit owner/Guide ruling that its result does not depend on active work. Use `--independent`; do not silently omit dependencies.
   - **Ambiguous:** ask Kristian in Guide. Create no prompt or launch evidence until he settles the relationship.
   A currently `READY_TO_LAUNCH` request must bind or be cancelled before another confirmation.
4. Require the Guide manifest at `<parent-of-sessionsDir>/guide/project.json`. It must name the project and list the project-specific continuity files the Guide steers—for example `docs/PROJECT.md`, `docs/BACKLOG.md`, and `docs/WORKING-PLAN.md`. Refuse missing, empty, duplicate, linked, or outside-project files.
5. Derive session history from the configured sessions directory. For each named dependency, require exactly one immutable pushed terminal artifact: `close.md` after every phase advanced, or `halt.md` while a phase remained in flight. Refuse merely prepared, uncommitted, unpushed, changed, missing, or ambiguous evidence.
6. For each dependency, read its prompt, terminal artifact, Summary or final approved artifact, and every direction released at its final boundary. After halt, read state and every waiting direction from the voided phase; do not treat partial phase work as approved. An independent sibling has no phase-input dependency on active sessions, but the Guide still reads project continuity files to avoid product-level contradiction.
7. Refuse corrupt or ambiguous launch evidence or project truth. Use the Guide conversation for owner exploration and decisions. Conversation-only facts are never project truth.

## ITS OWN JOB

Work with Kristian in the Guide context to choose the next useful bounded step in the evolving project. The Guide may challenge, explore, reprioritize, and update its continuity files before proposing a session.

During active sessions, keep project-level conversation open. Draft an additional prompt only after the relationship classification above permits it. A conceptually later idea is a dependent successor and waits; a genuinely independent sibling may proceed. If a thought becomes direction for an active path, preserve Kristian's exact words as `owner-via-guide` waiting evidence through `koda direction wait --session <session-id>`; it may enter Producer input only after that session's next successful gate. Never use pause-inject-resume.

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
- Ground prepared: <continuity files and evidence the receiver may rely on>
- Open items: <none, or an owner question that must be resolved before confirmation>
```

Show the owner a plain-language proposal covering goal, why now, scope, exclusions, proof, settled decisions, and unresolved questions. Revise the draft through Guide conversation. Drafting never opens a session.

Only after Kristian explicitly confirms that exact draft and its relationship, run exactly one matching form:

```text
koda guide confirm <prompt-file> --owner Kristian --kind <kind>
koda guide confirm <prompt-file> --owner Kristian --kind <kind> --independent
koda guide confirm <prompt-file> --owner Kristian --kind <kind> --depends-on <session-id> [--depends-on <session-id> ...]
```

Use the first form only for the first session or ordinary continuation when no sibling is active. The command binds kind, relationship, dependency terminal hashes, prompt hash, continuity hashes, owner identity, and confirmation time into one `READY_TO_LAUNCH` request. The prompt must cite every direction released by its dependencies and every halt ID. Changed evidence invalidates confirmation. Cancel immutably with `koda guide cancel <launch-id> --owner Kristian --reason <text>`, commit and push, then revise and confirm again.

## HANDOVER OBLIGATION

Before stopping, require all of these on disk:

- the project manifest names every steering file used by the Guide;
- project document, backlog, working plan, and other configured continuity files reflect the latest pushed session and any settled between-session decisions;
- the prompt contains every required section and names the configured first phase;
- the prompt and launch request agree on session kind, relationship, and every dependency ID;
- no unresolved owner question remains hidden inside `Open items: none`;
- exactly one immutable launch request says `READY_TO_LAUNCH` and hashes the confirmed prompt and continuity snapshot;
- `koda guide verify` succeeds after the prompt, continuity files, manifest, and launch request are committed and pushed.

Hand the verified request to the trusted supervisor. Do not run `koda session new`, launch producer or reviewer contexts, create phase evidence, or become an in-session authority. The supervisor re-verifies the request and starts the two separate contexts; `koda-c-session` consumes the confirmed prompt and saves the resulting session ID in that session's `guide-launch.json`. If interruption occurs after session creation but before binding, the supervisor must run `koda guide bind <launch-id> <session-id>`; it may not open another session or invent a binding.

Once a session begins, Guide remains available for project-level conversation but cannot steer any frozen active phase. Repeat the disk preflight and relationship classification for every later session request. Kristian speaks about an active session only with its persistent reviewer while its producer remains visible and input-closed. Each pushed close or halt returns terminal evidence to Guide; it does not force unrelated siblings to stop.
