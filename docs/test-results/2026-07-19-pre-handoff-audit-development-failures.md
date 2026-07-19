# Pre-handoff audit — development failures

**Date:** 2026-07-19  
**Status:** PRESERVED FAILURES; CORRECTED DETERMINISTIC SUITE PASS

This record keeps the failures found while auditing Koda-C before asking Kristian to
resume the owner-observed Ghostty session. Neither failure is scored as a model result,
and neither was removed by weakening a requirement.

## Fresh-context attempt 03 — invalid host environment

The sealed Sol/low discovery command exited before a Codex task existed. This
builder's restricted host denied writes to Codex's own state database and prevented
its in-process app-server client from initializing. The run produced no model answer,
made zero tool calls, and discovered zero skills.

The immutable failed attempt is preserved under
[`docs/discovery-runs/2026-07-19-fresh-codex-startup-03/`](../discovery-runs/2026-07-19-fresh-codex-startup-03/RESULT.md).
It is an invalid execution attempt, not a Koda-C or Sol failure.

Inspection then found a separate security defect: the runner inherited the parent
terminal's full environment. No credential value appears in the preserved attempt,
but a fresh model must not receive ambient credentials or the parent Codex context.
The corrected runner uses the same tested environment allowlist as the live relay and
has a permanent security assertion. Its next attempt uses a new evidence ID.

## Fresh-context attempt 04 — executable resolution after sanitization

The first pushed correction stripped the environment as intended, then tried to spawn
the bare word `codex` after replacing the ambient `PATH`. The operating system returned
`ENOENT`; no model task or thread existed, no tool ran, and no model answer was
produced. The immutable attempt is preserved under
[`docs/discovery-runs/2026-07-19-fresh-codex-startup-04/`](../discovery-runs/2026-07-19-fresh-codex-startup-04/RESULT.md).

The runner now resolves Codex to a canonical absolute executable using the parent
shell before applying the child environment allowlist. A permanent assertion requires
both steps. The next attempt uses another new evidence ID; attempt 04 is not scored.

## Complete suite — concurrent Git-lock release race

The first complete run after the runner correction passed **194/195**. The failing
test was the real four-process plural-runtime integration. Two independent sessions
reached close concurrently. One old lock owner removed `LOCK.json`; before it removed
the now-empty public lock directory, a waiter atomically renamed its pending lease
into that path. The retiring process then received `ENOTEMPTY` and paused Producer B
with a technical error. No session crossed streams and no gate falsely advanced, but
the workflow was not resilient.

The lock now atomically moves the verified old lease to its own token-bound retired
path before cleanup. A new owner may acquire the public path immediately, and the old
owner deletes only its private retired evidence. Cleanup removes only the expected
`LOCK.json` and empty directory; unexpected files refuse rather than being deleted
recursively.

A new deterministic mutation interleaves exactly those steps: retire A, acquire B,
finish A's cleanup, prove B still owns the lock. A second mutation proves a corrupt
disk token cannot become a path or change an outside file. The focused work-set plus
live plural runtime passed **18/18**. The corrected complete suite passed **197/197**.

## Current boundary

The corrected code and sealed fresh-model retry must be committed and pushed before
the new model task runs. Coverage, packaging, security scans, and fresh-context
evidence remain part of the final pre-handoff audit.
