# Security audit 10 — visible-role ownership and recovery

**Date:** 2026-07-19  
**Verdict:** LOCAL SECURITY CHECKS PASS; PUSHED AND HUMAN PROOF PENDING

## Threats checked

- **Duplicate role ownership:** Reviewer and Producer each hold a session-local
  process lock. A second live process cannot claim the same role.
- **Stale ownership:** a dead recorded process may be recovered explicitly; a live
  process may not be replaced.
- **Linked lock evidence:** a symlink or non-directory at either role-lock path
  refuses. Recovery never follows it or deletes an outside owner file.
- **False launch success:** Reviewer readiness is required before Producer opens,
  and Producer readiness is required before Guide reports success. Both waits are
  bounded.
- **Partial failure containment:** if Reviewer fails to become ready, Producer is
  never opened. If Producer fails, Reviewer remains open and Guide reports the
  missing role instead of duplicating the session.
- **Ambient secrets:** the existing allowlisted child environment tests remain
  green. Role readiness adds no environment rendering or credential transport.
- **Archive integrity:** only the two exact ephemeral role-lock directories are
  admitted during finalization; similarly named or arbitrary files still refuse.

## Tests

- Focused Guide, relay, security, and integrity slice: **71/71**.
- Complete suite: **204/204**.
- Coverage suite: **204/204** at 89.03% lines, 68.92% branches, and 86.94%
  functions overall.
- Dependency-free package dry-run with a private npm cache: pass; 896,230 bytes
  compressed, 4,289,377 bytes unpacked, 760 files.
- Isolated lockfile audit with scripts disabled and offline: zero vulnerabilities.
- Diff whitespace: pass.
- Reachable Git object validation: pass; dangling development objects only.

The initial npm package attempt failed on an unrelated root-owned user cache, and
the initial repository audit command lacked a lockfile. Both invalid attempts are
preserved in the linked development record rather than being represented as product
failures or successful audits.

## Boundary

PID liveness proves only that the expected local process exists. It does not prove a
window is visible, readable, or correctly arranged on the owner's display. It also
cannot suppress macOS or Codex host permission prompts. Those remain explicit human
observations, while the gate and role identity continue to fail closed.

See the [development record](../../test-results/2026-07-19-first-use-recovery-polish-development-failures.md).
