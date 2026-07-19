# Security audit 11 — repeatable ordered recovery

**Date:** 2026-07-19  
**Verdict:** PUSHED DETERMINISTIC SECURITY PASS; HUMAN PROOF PENDING

## Scope

This audit covers the recovery state introduced after the real owner-receipt failure:
a formal review and owner decision remain bound on disk while one or both visible role
processes may be gone. The live verification project was read only; no receipt,
approval, phase change, role process, or session was created during this audit.

## Fail-closed properties

- **Exact handover:** automatic partial recovery requires the same formal, repair, or
  fresh reviewer job in `AWAITING_OWNER`. It accepts the preserved failed-rejoin
  state or the stable `AWAITING_REVIEWER_WINDOW` state; other saved errors refuse.
- **Disk-derived role set:** live lock evidence decides which role is missing. Koda
  opens no role that is already alive.
- **Ordered restoration:** when both roles are missing, Reviewer opens first. Producer
  is not requested until Reviewer reaches the existing owner decision.
- **Readiness mutation:** a deliberately unready Reviewer opens exactly one request,
  leaves Producer closed, and records a named failure.
- **Repeatability without blind duplication:** successful attempts are appended to
  `RECOVERY.json`. A later genuinely missing role can recover again, while two live
  roles make another automatic request refuse.
- **Lock disappearance race:** if a role retires its lock between the directory and
  owner-file probes, liveness reports that role absent. An extant lock with missing,
  linked, corrupt, or invalid ownership still refuses rather than being treated as
  safely absent.
- **Gate isolation:** recovery does not write the approval ledger, alter review bytes,
  or advance phase state. Reviewer-job identity guards and the normal gate remain in
  force.
- **Environment boundary:** the existing clean-environment assertions remain green;
  recovery adds no ambient credential, owner receipt, or ruling to child arguments or
  environment.

## Verification

- Focused Guide recovery suite: 35/35.
- Complete deterministic suite: 206/206.
- Coverage suite: 206/206 at 89.03% lines, 69.12% branches, and 86.46% functions.
- Bound pushed-code suite: [206/206](../../test-results/2026-07-19-repeatable-recovery-manifest-corrected.md)
  from repair commit `b9b63eb`, bound as toolkit capability
  `ghostty-repeatable-recovery-v7`.
- Final Guide, security, submission, and integrity slice: 49/49.
- Dependency-free package dry-run with private cache: pass; 932,472 bytes
  compressed, 4,495,542 bytes unpacked, 770 files, zero bundled dependencies.
- Credential-signature and committed-symbolic-link checks: pass.
- Diff whitespace check: pass.
- Reachable Git object validation: pass; only dangling development objects remain.

The first manifest regression intentionally remains recorded as a failure: an
inexact evidence timestamp caused every Guide consumer to refuse, and the submission
contract still required the superseded README evidence link. The correction copies
the transcript timestamp byte-for-byte and requires the new transcript plus this
audit; no recovery or gate assertion was weakened. See the
[failed run](../../test-results/2026-07-19-repeatable-recovery-manifest-assembly-failure.md).

## Residual boundaries

- PID liveness is a local operational signal, not cryptographic process identity. A
  sufficiently timed PID reuse by an unrelated same-user process could temporarily
  make a stale lock look alive; recovery would conservatively refuse or defer rather
  than open a duplicate. It cannot open the gate.
- Runtime files under `.koda/` protect against accidental and ordinary workflow
  faults, not a malicious same-user process rewriting ignored files. Gate evidence
  remains separately revalidated from session files and Git.
- Koda cannot prove that macOS displayed, focused, or arranged a requested window.
  The human Ghostty observation is still a separate proof.
- Direct-child termination is tested; operating-system descendant-tree containment
  remains a documented limit.
