# Codex permission-profile development failures

**Date:** 2026-07-20

## Owner-observed refusal

The complete-session starter prepared its isolated project successfully, then the
secure Guide closed with `The Guide turn emitted no persistent context identifier.`
The preserved stderr showed the primary failure occurred earlier: Codex CLI 0.144.6
could not deserialize Koda's generated filesystem permission profile.

The owner did nothing wrong. No Guide context, Producer, Reviewer, receipt, or
phase advancement was created.

## Test-design failure

The existing security test checked that the generated argument string contained
all intended paths and access levels. Guide process tests used fake Codex children
to prove context persistence and recovery. Those tests proved Koda's intent and
controller behavior but never submitted the exact configuration to the installed
Codex parser. A syntactically plausible but incompatible profile therefore passed.

## Corrections

1. Replaced the whole `filesystem={...}` override with one dotted override per
   documented filesystem entry, including nested `:workspace_roots` rules.
2. Added a mutation assertion forbidding the obsolete whole-table form.
3. Added two preflight invocations—read-only Guide and write-capable role—against
   the actual installed Codex executable before the starter creates its target.
4. Added a fake-Codex integration contract that rejects the obsolete form and
   proves both profiles were preflighted.
5. Reordered Guide failure classification so a nonzero process exit reports the
   first sanitized stderr line before checking for a missing context identifier.
6. Added a regression that exits before `thread.started` and requires the primary
   configuration error to remain owner-visible.

## Verification

- Focused deterministic suite: **35/35 passed**.
- Installed Codex CLI 0.144.6 parsed both generated profiles successfully.
- One no-model starter preflight reached a clean pushed `READY — FULL SESSION`.
- Complete suite: **242/242 passed**.
- A real model turn from this build task was denied by its external-data policy;
  the denial was honored and is not represented as a product pass.
