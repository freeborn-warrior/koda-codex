# Local safety audit — 2026-07-18 — run 01

- Status: **PASS WITH DOCUMENTED BOUNDARIES**
- Platform: macOS arm64
- Node: `v26.0.0`
- Scope: core package, disk paths, immutable close, relay/reviewer harnesses,
  committed secret signatures, package contents, and concurrency boundary

## Findings corrected during the audit

1. **Ignored close evidence — fixed.** `close.md` bound every disk file, but Git
   closure previously proved only that `state.json` was tracked and that ordinary
   status was clean. An ignored session file could therefore be hashed locally
   but absent upstream. Closure now enumerates every session file and requires
   each one to be tracked. The planted ignored-file mutation refuses by name.
2. **Linked/path-like evidence — fixed.** A configured sessions symlink or a
   corrupted phase name could resolve evidence beyond its declared plain-file
   location. Project sessions must now resolve inside the root; state phase names
   are revalidated; session evidence must be regular files/directories. Separate
   artifact, review, ledger, close, and config mutations prove refusal.
3. **Ambiguous generated metadata — fixed.** Duplicate `KODA_REVIEW` or
   `KODA_CLOSE` markers no longer let a parser silently choose the first marker.
4. **Harness path trust — fixed.** Relay execution, owner review reading, and
   reviewer fixture execution resolve prepared paths and refuse escape through a
   symlink or altered `RUN.json`. Relay preparation atomically owns a new run
   folder instead of allowing competing preparation to share one.
5. **Atomic-write residue — fixed.** Failed atomic writes now attempt to remove
   their uniquely named temporary file; close binds rather than silently ignores
   any residue that really remains.

## Package and repository observations

- `npm pack --dry-run --json` completed after the local prepack build.
- Audit dry-run snapshot before the final transcript: 387,480 packed bytes,
  1,935,561 unpacked bytes, and 547 entries. Adding this final evidence changes
  archive byte counts without changing runtime behavior.
- Runtime dependencies: none.
- Install lifecycle hooks (`preinstall`, `install`, `postinstall`): none.
- Package binary: `dist/cli.js`, mode `0755`.
- Repository symbolic links: none.
- Common private-key, AWS, GitHub, OpenAI, and Slack credential signatures: none
  in tracked text. Binary bundle content was identified by NUL bytes and not
  interpreted as text.
- Destructive calls are limited to the validated local `dist/` rebuild,
  disposable dogfood evidence regeneration, temporary directories, and the
  realpath-constrained nested relay runtime after its history bundle is verified.

## Deliberate limitations, not hidden passes

- Hashes are not signatures; a malicious same-user repository writer can forge a
  coherent history.
- The receipt does not prove comprehension or identity.
- Skills are behavior instructions, not filesystem permissions or a defense
  against prompt injection.
- Model harnesses inherit the launch environment and can incur usage; run them
  only from a trusted checkout without unrelated secrets in the shell.
- Core mutations are not yet guarded by a project-wide inter-process lock. The
  current supervisor serializes them; simultaneous manual mutations are outside
  the safe claim.
- Git commit/push can run repository hooks. The core prints these commands and
  leaves their execution to the owner.

The complete explanation for a non-technical owner is in
[`docs/SECURITY.md`](../../SECURITY.md). All 93 named checks passed in the
[`security-hardening transcript`](../../test-results/2026-07-18-security-hardening-final.md).
