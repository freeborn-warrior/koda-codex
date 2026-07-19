# Interruption recovery — process stop without workflow drift

**Date:** 2026-07-19  
**Status:** Implemented and deterministically exercised; owner-observed Ghostty proof remains pending

## Product distinction

Koda-C is a workflow, not a wrapper. The CLI and terminal windows are its current mechanical surface. The product is the movement of separate roles, frozen inputs, disk evidence, review, owner engagement, gates, session closure, and project continuity.

The owner-ruling that **halt is the only interrupt** describes workflow direction: no one may pause a phase, inject a changed contract, and resume it. Ctrl-C is different. It stops an operating-system process. It must not become a hidden direction channel, void a phase, approve work, or imply that a half-written artifact completed.

## Implemented contract

When Ctrl-C or process termination arrives during a Producer or Reviewer model turn:

1. The supervisor forwards termination to the active Codex child. If the child ignores the first signal for two seconds, the supervisor force-stops that exact child.
2. Partial JSONL events and stderr are saved under the run folder.
3. The observed persistent Codex context ID, role, turn, purpose, signal, time, and evidence filenames are written as named interruption state.
4. Any artifact or handback possibly written during that turn is explicitly untrusted.
5. A restart resumes the same context and runs a reconciliation turn before normal disk routing may continue.
6. The reconciliation reloads the applicable repository-local skill, re-runs entry checks, re-reads frozen inputs, and finishes or replaces only the interrupted handback. It cannot approve, advance, quote a receipt, or begin another phase.
7. If no persistent context ID was observed, automatic replacement refuses. Koda-C will not silently create a different worker and call that continuity.

For Window B, an interrupted formal or consultation job returns from `RUNNING` to `PENDING`; partial output cannot become `COMPLETE`. An interrupted owner conversation stores the exact owner message and reconstructs the standard reviewer prompt on restart. It does not persist or replay a mutable free-form model prompt blob. If the recovered answer classifies actionable direction, the normal waiting-direction artifact is written before Producer can receive it.

Ctrl-C at a safe Window A disk boundary records `PAUSED_BY_OWNER` and an exact resume command. Stopping idle Window B releases its process lock. Neither action changes phase inputs or creates workflow-level halt evidence.

## Exercised cases

- Producer writes a planted partial Brief, is interrupted, and may reach the Reviewer only after the same context replaces it with a completed artifact.
- Formal Reviewer writes a planted partial review, is interrupted, returns the disk job to `PENDING`, and completes only after the same context reconciles it.
- Conversational Reviewer is interrupted while handling owner direction, resumes the same context, and preserves exactly one disk-bound waiting direction.
- A first-turn worker emits no context ID and ignores soft termination. The bounded force-stop works, the partial artifact remains visibly untrusted, and restart refuses without spawning a replacement.

## Remaining boundary

The supervisor signals the direct Codex child and relies on Codex to clean up subprocesses it owns. This is not an operating-system process-tree sandbox. A future daemon or cross-platform runtime should use platform-specific process groups and crash supervision before claiming unattended service operation.

The owner-observed three-context Ghostty run still owes the human proof that these messages and resume actions are understandable under real interruption.

