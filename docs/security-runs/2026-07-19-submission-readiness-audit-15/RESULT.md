# Submission-readiness security audit 15

- **Date:** 2026-07-19 (America/New_York)
- **Pushed commit inspected:** `eed2084fc80b86855ab9b3fbf03d584945409905`
- **Scope:** public clone, package lifecycle and contents, dependencies, secrets,
  filesystem links, project sandbox, terminal launch environment, and judge demo
- **Production session touched:** no
- **Verdict:** PASS WITH DOCUMENTED TRUST BOUNDARIES

## Results

- A public HTTPS clone succeeded without credentials and passed `git fsck --full
  --no-dangling`.
- The source-controlled executable ran without building. `package.json` has no
  `preinstall`, `install`, or `postinstall` hook and declares no runtime or
  development dependency.
- A temporary production lockfile and isolated npm cache reported **zero known
  vulnerabilities**: zero info, low, moderate, high, and critical findings.
- A real packed tarball installed and ran the plain-JavaScript CLI. The isolated
  dry-run reported 1,009,289 compressed bytes, 4,816,071 unpacked bytes, 797
  declared file entries, and zero bundled dependencies.
- The tarball contains the root README, GPLv3 license, and repository-local skills.
  It contains no `.git`, `.koda`, `.env`, `.DS_Store`, `node_modules`, or nested
  package tarball path.
- The targeted suite passed **19/19**. It found no committed symbolic link or
  common live-credential signature; proved the project-scoped role sandbox and
  read-only toolchain capability; rejected ambient credentials, parent context
  identity, user command rules, and terminal-dependent launcher bytes; and ran an
  executable clean-environment Ghostty launcher test.
- The exact no-build demo wrote only to its explicit external temporary project.
  The public checkout stayed clean after the demo and package tests.
- The fully assembled local submission surface then passed the complete
  **230/230** suite in the
  [named transcript](../../test-results/2026-07-19-submission-readiness-final.md).
- The same assembled surface passed **230/230** again after push at `91729b0` in
  the [post-push transcript](../../test-results/2026-07-19-submission-readiness-pushed.md).

## Failures handled safely

The first default-cache package probe and the literal default-cache `npx` demo
stopped in npm because the local global cache contains root-owned entries. The
audit did not run `sudo`, change ownership, relax a test, or modify that cache.
Package inspection used an isolated cache. The primary judge path was simplified
to the committed binary so that unrelated npm cache health is not a safety or UX
dependency.

One temporary audit setup command also named a relative source file from the
wrong working directory and failed without mutation. The corrected command used
the exact repository path.

## Trust boundaries that remain

- Hashes and Git history provide integrity bindings, not signatures or protection
  from a malicious same-user repository owner.
- A repository's configured Git hooks may run during the explicitly requested
  relay commit/push ceremonies. Unfamiliar projects and remotes must be inspected.
- The owner receipt is evidence, not a secret. The macOS review reader copies it
  to the system clipboard; other local applications may observe clipboard data.
- Managed Codex role commands are project-scoped, but Codex itself uses its home
  directory for authentication and thread storage outside the model command
  sandbox. A manually started raw Codex task has its own permissions.
- Ghostty is an optional convenience adapter. Its automatic path is tested and
  uses a deterministic clean launcher, but manual terminals remain available and
  the gate does not depend on GUI automation.
- Same-user replacement between a final file check and external execution is a
  local TOCTOU boundary. Koda does not claim hostile-writer isolation.

No new dependency, install hook, credential path, external write permission,
network feature, or security exception was introduced by submission polish.
