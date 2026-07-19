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

## Discovery 05 passed; active Guide preflight 02 had a stale fixture

Fresh Sol/low discovery 05 passed its full contract: all ten Koda-C skills, exact
repository-local placement guidance, zero tools, and zero repository reads.

The following Sol/medium Guide task started correctly and behaved conservatively. It
loaded the session-prompt skill, ran Guide status, inspected the active session, named
`2026-07-19-01` at Brief, refused to draft, and left every file unchanged. However,
the fixture predated toolkit integrity and omitted `docs/toolkit-integrity.json`.
Guide therefore stopped first at `TOOLKIT NOT READY`; the run could not reach the
sealed target's `NEXT SESSION BLOCKED` state or explain that the idea could be
discussed now while starting it required wait or halt.

This is recorded as an invalid fixture for the current entry contract, not a promoted
pass and not a model failure. The corrected fixture creates a minimal evidence file,
hashes it and the tested skill into a valid integrity manifest, and includes that state
in the before/after snapshot. A permanent test requires the fixture proof. New IDs are
used for both corrected runs.

The first credential-signature scan command for these new evidence folders began its
pattern with hyphens without the argument terminator, so `rg` treated the pattern as
an option and ran no scan. The corrected command used `--`; it completed with no
matching evidence file. No result was inferred from the failed invocation.

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
