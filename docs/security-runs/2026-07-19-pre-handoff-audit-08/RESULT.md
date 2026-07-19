# Security audit 08 — final pre-handoff surface

**Date:** 2026-07-19  
**Result:** PASS WITH EXPLICIT LOCAL-USER, HOST-PERMISSION, AND HUMAN-PROOF BOUNDARIES

## Scope

This audit covers the complete competition surface before Kristian is asked to
resume the preserved Ghostty session: the dependency-free CLI, Guide launch and
recovery, Producer/Reviewer model children, owner acknowledgement, Git mutation
serialization, package contents, repository evidence, and fresh-model test harness.

## Findings and repairs

Four real defects were found and corrected without weakening a test:

1. Fresh discovery and Guide-preflight model children inherited the builder's
   ambient environment. They now use the same credential- and context-stripping
   allowlist as relay roles. A permanent security assertion covers the harness.
2. That sanitization removed the ambient `PATH` while the harness still spawned the
   bare name `codex`. The runner now resolves one canonical absolute executable
   before creating the clean child environment.
3. A concurrent Git-lock release could remove or collide with a newly acquired
   owner's directory. Release now atomically retires only the verified old lease
   before exact cleanup. A deterministic interleaving proves the new owner survives.
4. A corrupt disk-supplied lock token could have influenced the retired-path name.
   Tokens must now be UUIDs, and a mutation proves traversal input cannot touch an
   outside file.

The prior owner-ceremony repair remains intact: receipts, comments, and rulings use
stdin rather than process arguments or environment variables; an empty or changed
receipt leaves the gate shut and returns to a numbered retry; and exact historical
recovery reopens Reviewer before Producer without replacing either context.

## Verification

- Ordinary complete suite: **197/197**.
- Coverage suite: **197/197**, 89.17% lines, 68.53% branches, and 87.02% functions
  overall. The gate engine remains at 97.51% lines, 98.73% branches, and 100%
  functions; the environment sanitizer remains at 100% for all three measures.
- Pushed-audit durable suite:
  [197/197](../../test-results/2026-07-19-pre-handoff-manifest-pushed.md) at base
  commit `4e3b7df`.
- Final integrity/skill/security/submission slice after documentation updates:
  **25/25**.
- Fresh skill discovery: **PASS**, all ten local skills, zero tools and zero reads.
- Fresh plural-session Guide preflight: **PASS**, no mutation and an owner-readable
  distinction between discussion now and dependent start after pushed close/halt.
- Final package dry-run: **PASS**; no runtime dependency or install hook, 879.5 kB
  compressed, 4.2 MB unpacked, and 755 evidence-inclusive files.
- Corrected isolated lockfile audit: **0 vulnerabilities**.
- Tracked credential-signature scan: no finding.
- Tracked symbolic-link scan: none.
- `git diff --check`: passed.
- `git fsck --full`: no missing or corrupt reachable object; only recoverable
  dangling development trees/blobs were named.

One initial audit command changed into the temporary directory before copying this
project's `package.json`; its pack/copy steps failed and the resulting empty-package
zero-vulnerability result was invalid. It is not counted. The corrected audit copied
the project manifest explicitly before generating the lockfile and returned zero
vulnerabilities.

A later display-only attempt piped `npm pack --json` directly into a parser, but the
package's honest prepack build notice preceded the JSON and made that parser fail.
The build itself succeeded. The corrected size-only measurement used the already
built output with lifecycle scripts disabled and produced the final numbers above;
the full packaged-install test still exercises prepack normally.

## Boundaries

This is a local workflow, not a hostile multi-user security boundary. A same-user
attacker who can replace the verifier and all bound evidence together can defeat an
unsigned integrity manifest. Git hooks, remotes, the system clipboard, Codex host
permissions, and terminal/application access remain outside the gate's authority.
Koda strips child environments and avoids secrets in arguments, but it cannot revoke
a credential already exposed elsewhere or prove another local application did not
read the clipboard.

Generic engineering failures still print technical recovery diagnostics. The
owner-facing Guide and Reviewer paths cover the known first-use mistakes, but a new
unexpected crash may still require technical diagnosis. Actual Ghostty recovery,
window placement, host permission presentation, and comprehension remain human proof
and are not represented as mechanically passed.

No critical or high unmitigated code finding remains in the audited surface.
