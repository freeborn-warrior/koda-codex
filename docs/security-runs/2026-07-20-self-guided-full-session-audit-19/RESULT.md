# Security audit 19 — self-guided full-session entry

**Date:** 2026-07-20  
**Result:** PASS WITH DOCUMENTED MODEL AND TERMINAL BOUNDARIES

## Scope

This audit covers the new complete-session preparation script, Guide-to-role launch
bridge, packaged release surface, and the existing managed Codex boundaries. It
does not claim that Ghostty or Codex CLI themselves are sandbox boundaries.

## Preparation boundary

- The destination must be a new empty directory and cannot be filesystem root.
- Only the bounded full-session template and the ten repository-local Koda skills
  are copied.
- Owner names reject control characters and unreasonable length.
- Git preparation uses `/usr/bin/git`, an isolated project-contained home, a
  minimal `PATH`/locale, explicit repository paths, and a local bare upstream.
- Ambient `GIT_DIR` and `GIT_INDEX_FILE` values are deliberately planted in the
  integration test. Preparation still writes only inside the selected project and
  its local upstream; the hostile external paths remain absent.
- Prompt confirmation is committed and pushed before Guide may report the launch
  ready. Guide choice `1` re-enters the trusted launch command, which revalidates
  the launch rather than trusting model prose.

## Runtime boundary

- Guide, Producer, and Reviewer receive project-scoped permission profiles and do
  not inherit ambient credentials or the parent Codex context identity.
- Producer remains owner-input-closed. Owner input enters through Reviewer and is
  persisted at a gate boundary; halt remains the sole interrupt.
- Review codes are only a human-friendly reference. The trusted controller resolves
  the current code to the exact receipt from disk, and the unchanged gate rechecks
  artifact, artifact hash, review, verdict, and complete receipt.
- Visible model text is sanitized for terminal controls and bidirectional override
  characters without altering evidence bytes on disk.
- Ghostty is an optional macOS display adapter. Its automation permission can open
  windows, so it must be treated as a visible launcher capability, not as proof of
  filesystem confinement.

## Package and repository checks

- Complete regression suite: **241/241 passed**.
- Security tests include credential-signature scanning, symlink refusal, strict
  role environments, argument/environment receipt exclusion, launcher sanitization,
  and project-boundary probes.
- Package dry-run with an isolated cache: **840 files**, **0 bundled dependencies**.
- Production-only lock audit in a disposable directory: **0 vulnerabilities**.
- Coverage: **86.68% lines, 71.47% branches, 85.59% functions**.
- The primary run path uses committed JavaScript and requires no installation hook.

## Observed refusal

The first package dry-run refused because the user's normal npm cache contains
root-owned files. The inspection was repeated in a disposable cache. This does not
affect the documented committed-binary path, and no permission repair was attempted
on the owner's machine.

## Remaining risks and claims not made

- A malicious or compromised model provider, Codex CLI, terminal application, Git,
  Node.js, or operating system is outside Koda-C's trust guarantee.
- Files the owner deliberately places inside a project may be readable to the
  project's managed roles according to their explicit profile.
- Git history scanning and credential-pattern tests reduce accidental publication
  risk but cannot mathematically prove that no secret exists.
- The repository is still private at audit time. It must be rechecked after the
  owner makes it public.

No new high- or medium-severity Koda-C vulnerability was found in this surface.
