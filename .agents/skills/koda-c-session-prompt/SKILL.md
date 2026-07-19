---
name: koda-c-session-prompt
description: Turn durable Guide context into one bounded, owner-confirmed Koda session prompt and launch request. Use only between sessions; never use inside an active producer or reviewer session.
---

# Koda-C Session Prompt

Hold the project-level perspective across many bounded sessions. Reconstruct that perspective from the repository, not from chat memory, and prepare exactly one session without opening it.

## ENTRY CHECK

1. Locate the project root and read `koda.config.json`. Refuse if it is missing, invalid, or points outside the repository.
2. Require the Guide manifest at `<parent-of-sessionsDir>/guide/project.json`. It must name the project and list the project-specific continuity files the Guide steers—for example `docs/PROJECT.md`, `docs/BACKLOG.md`, and `docs/WORKING-PLAN.md`. Refuse missing, empty, duplicate, linked, or outside-project files.
3. Derive session history from the configured sessions directory. Never trust a cached session count or chat claim. If a latest session exists, require exactly one immutable pushed terminal artifact: `close.md` after every phase advanced, or `halt.md` while a phase remained in flight. Refuse an active, merely prepared, uncommitted, unpushed, or ambiguous session.
4. After close, read the prompt, Summary or final artifact, reviews needed to understand material changes, `close.md`, and every direction released by the final advancement. After halt, read the prompt, `halt.md`, state, and every waiting direction from the voided phase; do not treat partial phase work as approved. Reconcile the continuity files from this evidence before drafting another prompt.
5. Read `koda guide status`. Refuse if a prompt is already `READY_TO_LAUNCH`, launch evidence is corrupt or ambiguous, or project truth cannot be derived.
6. Use the Guide conversation for owner exploration and decisions. Ordinary discussion may update continuity files between sessions, but conversation-only facts are never project truth.

## ITS OWN JOB

Work with Kristian in the Guide context to choose the next useful bounded step in the evolving project. The Guide may challenge, explore, reprioritize, and update its continuity files before proposing a session.

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
- Configured receiver: <first phase name from koda.config.json>
- Ground prepared: <continuity files and evidence the receiver may rely on>
- Open items: <none, or an owner question that must be resolved before confirmation>
```

Show the owner a plain-language proposal covering goal, why now, scope, exclusions, proof, settled decisions, and unresolved questions. Revise the draft through Guide conversation. Drafting never opens a session.

Only after Kristian explicitly confirms that exact draft for launch, run:

```text
koda guide confirm <prompt-file> --owner Kristian
```

The command binds the prompt hash, current continuity-file hashes, prior pushed close or halt, prior carry-forward evidence, owner identity, and confirmation time into one `READY_TO_LAUNCH` request. The exact prompt must cite every direction released across the prior session boundary; after halt it must also cite the halt ID. A changed prompt or steering file invalidates the confirmation. Record an immutable cancellation with `koda guide cancel <launch-id> --owner Kristian --reason <text>`, commit and push it, then discuss, revise, and explicitly confirm again rather than treating old approval as permission or deleting evidence.

## HANDOVER OBLIGATION

Before stopping, require all of these on disk:

- the project manifest names every steering file used by the Guide;
- project document, backlog, working plan, and other configured continuity files reflect the latest pushed session and any settled between-session decisions;
- the prompt contains every required section and names the configured first phase;
- no unresolved owner question remains hidden inside `Open items: none`;
- exactly one immutable launch request says `READY_TO_LAUNCH` and hashes the confirmed prompt and continuity snapshot;
- `koda guide verify` succeeds after the prompt, continuity files, manifest, and launch request are committed and pushed.

Hand the verified request to the trusted supervisor. Do not run `koda session new`, launch producer or reviewer contexts, create phase evidence, or become an in-session authority. The supervisor re-verifies the request and starts the two separate contexts; `koda-c-session` consumes the confirmed prompt and saves the resulting session ID in that session's `guide-launch.json`. If interruption occurs after session creation but before binding, the supervisor must run `koda guide bind <launch-id> <session-id>`; it may not open another session or invent a binding.

Once the session begins, the Guide remains available for project-level conversation but cannot steer the frozen active phase. Kristian speaks about the session only with the persistent reviewer while the producer remains visible and input-closed. After immutable close or explicit pushed halt, control returns to the Guide, which reads the terminal evidence and moves the project steering files forward before proposing another session.
