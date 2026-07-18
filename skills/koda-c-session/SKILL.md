---
name: koda-c-session
description: Open a new Koda session from the owner's written purpose, limits, and success conditions, then verify its disk-backed starting state. Use when beginning new work in a Koda project before any configured phase artifact exists.
---

# Koda-C Session

Create the owner's opening contract and the mechanical start of one Koda session. Do not create a phase artifact, review, approval, or advancement.

## ENTRY CHECK

1. Locate the project root and read `koda.config.json` from disk. Refuse if it is missing, invalid, has no phases, or points outside the project.
2. Run `koda status` or inspect the configured sessions directory. If no session exists, continue. If one exists, run `koda session close` and refuse unless Koda confirms its immutable close is committed and pushed.
3. When a previous session exists, read its `close.md`, `state.json`, final summary artifact when declared, and any known gaps cited by that summary. Present proposed carry-forward items to the owner; do not silently inherit them.
4. Require the owner to state the new session's purpose, limits, success evidence, deliberate carry-forward, and any non-negotiable rulings. Ask for a ruling when those change what the product is; never invent one from conversation memory.
5. Refuse with the exact missing file, field, pushed close, or owner decision. Do not repair an earlier session or silently reuse its prompt.

## ITS OWN JOB

Draft the prompt in the owner's language, confirm any material interpretation with the owner, and save it through `koda session new <prompt-file>`. A temporary source file may be used only as a disposable conduit; the durable contract is the copied `session-prompt.md` inside the new session.

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
