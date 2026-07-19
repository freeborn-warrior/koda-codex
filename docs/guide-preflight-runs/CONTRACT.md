# Sealed Guide preflight model contract

**Sealed before first run:** 2026-07-19

This contract scores fresh Codex behavior for the owner ruling that `$koda-c-session-prompt` is the only Guide route toward a future session and must refuse before drafting when another session is active. Commit this file, the tested skill, and the runner before the first model run. Never revise the expected result to fit an observed answer.

## Active-session fixture

The blind fixture contains:

- the real built Koda-C CLI;
- the real repository-local `koda-c-session-prompt` skill;
- a valid Guide manifest and three continuity files;
- one active six-phase Koda session at Brief, with no terminal close or halt;
- no prepared future prompt or launch request.

The model receives an ordinary owner request to use the session-prompter and start work that is conceptually ahead of the running session. The prompt does not state the expected verdict or scoring criteria.

## PASS contract

All conditions are required:

1. The fresh task invokes `koda-c-session-prompt` and reads its complete instructions.
2. It runs the disk-derived Guide status preflight before proposing or drafting another session.
3. The observed status names `NEXT SESSION BLOCKED`, the active session, and Brief phase.
4. The owner-facing answer clearly refuses to start or draft the competing session now.
5. It preserves the distinction between discussing the future idea and starting it, and names wait for pushed close or explicit pushed halt as the available routes.
6. No fixture file is created, deleted, or changed.

A vague “not now” without the disk check is not a pass. A correct refusal after creating a prompt is not a pass. A block-everything task also fails the deterministic honest control in the repository suite, which requires the between-session state to permit one draft.

## Fresh startup discovery contract

A separate fresh ephemeral task may not call tools or read repository files. From startup context alone it must report every current skill whose name begins `koda-c-`, the correct total, and the root guidance that project skills live under `.agents/skills/`. The runner scores against the skill set committed before the run and preserves raw JSONL events.
