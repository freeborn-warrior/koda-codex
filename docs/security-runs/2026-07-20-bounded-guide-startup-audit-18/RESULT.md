# Bounded Guide startup security audit 18

**Date:** 2026-07-20

**Scope:** Trusted status transfer, Guide input lifecycle, in-progress evidence,
filesystem containment, package contents, dependency exposure, and unchanged gate
security after the startup repair.

**Result:** PUSHED PASS WITH STATED BOUNDARIES

## Security properties

- The trusted controller derives Guide status from the same fail-closed disk checks
  used by `koda guide status`. The model does not become status authority.
- Status enters the prompt as a JSON-escaped string explicitly labeled untrusted
  project data. It is not interpolated into a shell command.
- Guide startup remains `--ask-for-approval never`, ignores ambient rules and user
  config, disables web search and network, strips ambient credentials, and retains
  only named project reads plus exact Guide-owned writes.
- Owner input is not accepted or queued while the initial Guide check runs. A closed
  input stream cannot become a partial message, approval, recovery choice, or state
  mutation.
- In-progress event and stderr files use exclusive creation and mode `0600`. An
  existing regular file or symbolic link refuses before the model starts; Koda never
  overwrites or follows it. A mutation test confirms the linked target is unchanged.
- A failed or interrupted turn retains its partial/final raw evidence and named
  failure state. Successful completion preserves the same validated context ID.
- Artifact hashing, review binding, blocking verdicts, receipt acknowledgement,
  waiting-direction release, immutable halt, and pushed close are unchanged.

## Verification

- Focused Guide/skill/security/integrity slice: **42/42 passed**.
- Complete deterministic and adversarial suite: **238/238 passed**.
- Coverage suite: **238/238 passed**.
- Repository symlink scan: none found.
- `git diff --check`: passed.
- `git fsck --full --no-dangling`: passed.
- Isolated production lockfile audit: zero vulnerabilities at every severity.
- Package dry-run: 1,250,514 compressed bytes, 5,356,114 unpacked bytes, 819 entries,
  and zero bundled dependencies. Required README, GPLv3 license, compiled CLI, and
  project-local Guide skill are present; `.git`, `.koda`, `.env`, `.DS_Store`,
  `node_modules`, and nested tarballs are absent.
- Repair commit `8c126ea` and evidence commit `104dbbe` reached `origin/main`.
  The unchanged full suite passed **238/238** afterward; toolkit capability
  `bounded-guide-startup-v15` binds that post-push transcript.
- The judge-facing release assembly reached `e31ef7e` and passed the unchanged
  complete suite **238/238** again.

## Honest boundaries

- Project-local raw Guide event files may contain authorized project evidence. They
  are private diagnostic records, not sanitized public telemetry.
- JSON escaping and instruction labeling reduce prompt-boundary ambiguity; they do
  not make an untrusted model a security authority. Deterministic Koda code still
  revalidates every mutation.
- Exclusive evidence files prevent overwrite and symlink following. They do not
  defend against a malicious same-user process that can replace the entire checkout
  or executable.
- Model latency and reasoning quality are not security proofs. Gate and mutation
  evidence remain authoritative.
