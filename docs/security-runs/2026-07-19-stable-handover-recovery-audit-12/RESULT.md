# Security audit 12 — stable owner-handover recovery

**Date:** 2026-07-19  
**Verdict:** PUSHED-CODE AND MANIFEST SECURITY PASS; POST-PUSH CHECK AND HUMAN OBSERVATION PENDING

## Scope

This delta audits the optional Ghostty adapter's recovery path at any stable formal,
repair, or fresh owner decision. Ghostty is not required by the gate or relay: users
may open terminals and start the bound roles manually. The adapter exists only to
arrange the same file-backed workflow on macOS.

The preserved live verification project was not mutated or launched during this
work.

## New fail-closed properties

- **No incident-specific privilege:** recovery no longer depends on the historical
  empty-receipt error. A stable owner handover must contain a complete
  `AWAITING_OWNER` Reviewer job before any missing role is opened.
- **Reviewer-job schema:** ID, kind, phase, purpose, prompt, expected path,
  timestamps, status, error, and completion shape are validated. Missing or unsafe
  job evidence refuses by name.
- **Bound recovery identity:** new recovery evidence binds Reviewer job ID, kind,
  phase, and expected path. Changing only that job after recovery causes a named
  refusal instead of reusing the old authority.
- **Ordered restoration:** when both visible roles are absent, Reviewer is requested
  and must reach the existing owner decision before Producer is requested.
- **Retry after recovery failure:** only Koda's exact named launch/readiness failures,
  paired with a valid recovery record and valid Reviewer job, can reopen the recovery
  route. Arbitrary saved errors do not qualify.
- **No gate mutation:** role recovery writes runtime evidence only. It cannot write
  an owner receipt, approve a review, advance a phase, alter the reviewed artifact,
  or change the frozen phase contract.
- **No credential regression:** the existing real executable hostile-environment
  assertions remain part of the 210-check suite. Recovery adds no ambient variable,
  receipt, ruling, or parent context identity to child arguments or environment.

## Verification

- Focused Guide suite: 39/39.
- Complete deterministic suite: 210/210.
- Coverage suite: 210/210 at 89.08% lines, 69.65% branches, and 86.65% functions.
- Package dry-run: dependency-free; 934,672 compressed bytes, 4,511,133 unpacked
  bytes, 770 files, zero bundled dependencies.
- Credential, child-environment, argument, symlink, toolkit-integrity, and gate tests:
  pass as members of the complete suite.
- Diff whitespace, tracked-symlink scan, and reachable Git connectivity: pass.
- Development failures remain in the
  [development record](../../test-results/2026-07-19-stable-handover-recovery-development-failures.md).
- Repair commit `93efd1a` reached `origin/main`; the unchanged complete suite passed
  210/210 in the [pushed transcript](../../test-results/2026-07-19-stable-handover-recovery-pushed.md).
  Toolkit capability `ghostty-stable-handover-recovery-v8` binds that evidence.
- The complete manifest regression passed 210/210 after current README, submission,
  project, backlog, working-plan, UX, security, and Ghostty boundary updates.

## Residual boundaries

- This is a local same-user workflow, not a hostile multi-user sandbox. A malicious
  same-user process can alter ignored runtime files; Koda detects named corruption
  where specified but cannot make the local account adversary-proof.
- PID liveness remains an operational duplicate-avoidance signal, not cryptographic
  process identity.
- Two truly simultaneous Guide recovery mutations are not yet serialized by a
  dedicated runtime lock. This remains a future interface/concurrency hardening item;
  it does not grant gate authority, but it could request duplicate windows under a
  deliberately concurrent same-user invocation.
- Koda can verify request order and disk readiness, not whether macOS visibly focused
  or arranged windows correctly. Human observation remains separate evidence.
