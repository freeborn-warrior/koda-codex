# Pre-submission concurrency development failures

**Date:** 2026-07-19  
**Status:** Preserved and corrected without weakening a test

## 1. Live lock release leaked `ENOENT`

The first complete regression after the owner selected a representative
verification project passed **176/177**. The four-process plural-runtime case
failed when Producer B reached close:

```text
RELAY PAUSED — ENOENT: no such file or directory, realpath
'.../project/.koda/git-operation.lock'
```

One relay released the short Git-operation lock after its sibling had observed
the lock directory but before that sibling resolved the path for containment.
The contender treated normal cooperative release as corrupt state instead of
retrying acquisition.

The repair makes disappearance during every contention-inspection boundary a
retry while preserving refusal for a present symlink, non-directory, corrupt
record, live owner, or stale owner with staged residue. A deterministic mutation
now removes the lock after `lstat` and before `realpath` and requires successful
reacquisition.

## 2. Test-authoring import failure

The first focused repair run passed **14/15** because the new mutation used
`lstat` without importing it. This was a test-authoring error, not a product
failure. The import was added; no assertion or refusal was removed. The focused
lock/write-set/plural suite then passed **15/15**, followed by three independent
plural-runtime repetitions.

## 3. Guide archive ownership appeared after its bytes

The first durable full rerun after the lock repair passed **177/178**. The
preserved transcript is
[the failed durable run](2026-07-19-pre-submission-lock-race-final.md). Producer B
correctly refused because Producer A's Guide archive files appeared as dirty
project paths before any visible ownership covered them:

```text
Unclaimed project mutation has ambiguous provenance; declare it before writing:
docs/guide/runs/<launch-id>/GIT-EVIDENCE.json, ...
```

The bytes were legitimate, but their ownership publication was too late. Guide
now owns its configurable `runs/` and `returns/` namespaces from project setup,
before any runtime writes them. Session validation recognizes descendants of
those namespaces while continuing to reject a control file outside them. Runtime
paths are derived from the configured Guide root rather than hard-coded to
`docs/guide`.

The focused suite passed **16/16** after this repair, including both new
mutations, and three further independent plural-runtime repetitions completed.
The complete suite and durable rerun subsequently passed **179/179**. Their
[named transcript](2026-07-19-pre-submission-concurrency-repairs-final.md) is
recorded separately rather than rewriting these failures.
