# Codex permission-profile development failures

**Date:** 2026-07-20

> **Superseded failure record.** This file records the first attempted repair.
> That repair was not sufficient: its `codex --version` preflight did not
> instantiate `FilesystemPermissionToml`, and its quoted dotted keys became
> literal filesystem paths when the real Guide started. Current truth is in the
> [permission-instantiation record](2026-07-20-codex-permission-instantiation-development-failures.md).

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

## First attempted corrections

1. Replaced the whole `filesystem={...}` override with one dotted override per
   intended filesystem entry. This was later proved incompatible because quoted
   dotted keys were interpreted as literal paths.
2. Added a mutation assertion forbidding the obsolete whole-table form.
3. Added two `codex --version` invocations under the generated arguments. This
   checked command-line parsing only; it did not load the named profile.
4. Added a fake-Codex integration contract that rejects the obsolete form and
   proves both profiles were preflighted.
5. Reordered Guide failure classification so a nonzero process exit reports the
   first sanitized stderr line before checking for a missing context identifier.
6. Added a regression that exits before `thread.started` and requires the primary
   configuration error to remain owner-visible.

## What this attempt actually proved

- Focused deterministic suite: **35/35 passed**.
- Installed Codex CLI 0.144.6 accepted the surrounding command-line arguments,
  but the check never instantiated either generated filesystem profile.
- The starter reached `READY — FULL SESSION` without starting a model; this did
  not prove the later Guide process could deserialize the profile.
- Complete suite: **242/242 passed**.
- A real model turn from this build task was denied by its external-data policy;
  the denial was honored and is not represented as a product pass.

The owner's next real Guide run refused with
`data did not match any variant of untagged enum FilesystemPermissionToml`.
Therefore this attempt is a **FAIL**, despite its green automated suite.
