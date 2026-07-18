---
name: koda-c-session
description: Open a Koda session from the owner's written purpose, limits, and success conditions, then verify its disk-backed start. Use before any configured phase artifact exists.
---

# Koda-C Session

Create the owner's opening contract and the mechanical start of one Koda session. Do not create a phase artifact, review, approval, or advancement.

## ENTRY CHECK

1. Locate the project root and read `koda.config.json` from disk. Refuse if it is missing, invalid, has no phases, or points outside the project.
2. Run `koda status` or inspect the configured sessions directory. If no session exists, continue. If one exists, run `koda session close` and refuse unless Koda confirms its immutable close is committed and pushed.
3. When a previous session exists, read its `close.md`, `state.json`, final summary artifact when declared, and any known gaps cited by that summary. Require the supplied prompt to name deliberate carry-forward rather than silently inheriting it.
4. Require a non-empty prompt source already prepared by the owner-facing guide/session-prompter. It must state purpose, limits, success evidence, deliberate carry-forward, and non-negotiable rulings. Never interview, notify, or address the owner from the producer task.
5. Refuse with the exact missing file, field, pushed close, or owner ruling. Do not repair an earlier session, silently reuse its prompt, or accept an owner decision that exists only in chat.

## ITS OWN JOB

Validate the supplied prompt in the owner's language and save it through `koda session new <prompt-file>`. Do not draft or reinterpret it in the producer task. A temporary source file may be used only as a disposable conduit; the durable contract is the copied `session-prompt.md` inside the new session.

The session prompt must have this shape:

```markdown
# Session prompt

## Owner intent
<What this session is for and why it matters>

## In scope
- <Included outcome>

## Out of scope
- <Explicit limit>

## Success evidence
- <What a stranger can check on disk>

## Constraints and owner rulings
- <Decision or constraint>

## Prior session carry-forward
- Previous close: <relative close.md path, or none for the first session>
- Previous summary: <relative summary path, or none>
- Carried forward by owner: <specific item, or none>
- Deliberately not carried: <specific item, or none>

## Relay handover
- Configured receiver: <first phase name read from state.json>
- Ground prepared: <what the receiver may rely on>
- Open items: <none, or explicit unresolved owner question>
```

Do not hardcode `brief` or any other receiver. Read the first phase from the newly created session's `state.json`. Prepare that receiver without starting its work.

## HANDOVER OBLIGATION

Before stopping, verify from disk that:

- the dated session folder is the next valid number;
- `session-prompt.md` exists and is non-empty;
- `state.json` snapshots the configured phase chain with `currentPhaseIndex: 0` and an empty `advances` list;
- `approvals.md`, `phases/`, and `reviews/` exist;
- no phase artifact, review, approval entry, or advancement was created by this skill;
- any prior-session carry-forward cites the pushed close and summary and reflects the owner's deliberate choice;
- the configured receiver named in the prompt equals `state.json.phases[0].name`.

Report the session path and configured receiver. Leave the new session at its first declared phase.
