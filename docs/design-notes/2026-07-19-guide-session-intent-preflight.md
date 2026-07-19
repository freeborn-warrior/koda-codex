# Guide session-intent preflight

**Date:** 2026-07-19
**Status:** Deterministic and fresh Sol/medium behavior proved; owner-observed three-window proof pending

## Owner ruling

The only owner-facing route from Guide conversation to a future Koda session is explicit use of `$koda-c-session-prompt`. A later interface may render that invocation as a button or choice, but the current product keeps it visible in the CLI.

Invoking the skill is not permission to create a prompt. Its first action is a disk preflight. If a session, bound launch, close preparation, or other nonterminal path is already in flight, the skill must refuse before drafting and name what blocks it. A session that feels conceptually later, separate, or useful cannot become a parallel lane.

Guide may still explore the idea. If Kristian turns it into actionable direction for the active path, Guide preserves his exact words as `owner-via-guide` waiting evidence. That evidence enters Producer input only through the next successful gate. Otherwise the idea can remain project-level conversation until the current session returns. The only state transitions that free the path are:

1. wait for immutable normal close to be committed and pushed; or
2. explicitly halt through the owner-facing Reviewer, commit and push `halt.md`, then return through a fresh Brief.

Pause-inject-resume and concurrent project sessions remain forbidden.

## Enforcement layers

- The `koda-c-session-prompt` discovery description now applies to next-session intent even when the correct outcome is refusal.
- The skill runs `koda guide status` before creating or editing a prompt and repeats that check for later start intent.
- Guide status derives the latest session and runtime from disk. It prints `NEXT SESSION BLOCKED`, session/phase or launch state, the named failed terminal condition, and the two allowed transitions.
- `koda guide confirm` independently refuses an active or non-pushed prior session.
- `koda guide launch` refuses another unfinished runtime.
- `koda session new` independently refuses any prior session without pushed close or pushed halt.

The lower-level CLI commands remain visible for inspectability and recovery. They do not make ordinary Guide conversation launch authority: the intended owner ceremony is explicit skill invocation, exact draft confirmation, pushed launch evidence, and supervisor revalidation.

## Test shape

The permanent tests include both refusal and temperament controls:

- an active Brief causes preflight to refuse before drafting, naming session, phase, progress, and terminal condition;
- a project with no active session permits exactly one next-session draft;
- a pushed halt reopens the Guide path;
- a prepared runtime blocks competing drafting even before Producer opens the bounded session;
- no other repository skill contains the Guide confirmation route;
- the complete inherited suite remains intact.

These deterministic checks prove the files and commands expose the right truth. A sealed fresh Sol/medium task then received the ordinary “conceptually ahead” request, loaded the skill, ran Guide status, refused before drafting, named the active Brief and both terminal routes, and changed no fixture byte. The raw evidence lives under `docs/guide-preflight-runs/2026-07-19-sol-medium-01/`.

That one run does not prove that every possible natural-language phrase will trigger the skill in every model, or that the terminal experience is clear to Kristian. Owner-observed three-window testing remains required.
