# Security audit — Reviewer halt routing and terminal status truth

- Date: 2026-07-21
- Scope: conversational halt intent, confirmation, exact-path Git mutation,
  waiting-direction separation, pushed terminal truth, Guide recovery refusal,
  environment and permission regression
- Status: **POST-PUSH PASS — TOOLKIT PROMOTED**
- Complete local regressions: initial [258/258](../../test-results/2026-07-20-reviewer-halt-status-local.md)
  and final documented-tree [258/258](../../test-results/2026-07-21-reviewer-halt-status-final-local.md)
- Focused security, integrity, status, and halt slice: **33/33**
- Unchanged pushed regression: [258/258](../../test-results/2026-07-21-reviewer-halt-status-pushed.md)
- Promoted release regression: [258/258](../../test-results/2026-07-21-reviewer-halt-status-release.md)

## Incident

During a real submission rehearsal, the owner told the persistent Reviewer:
`Halt this session. The toolkit changed after launch; preserve that reason in the
halt evidence.` The model explained halt correctly but emitted the ordinary
`WAIT FOR GATE` boundary. The trusted controller therefore wrote a waiting
direction instead of opening the halt ceremony.

The waiting record preserved the exact owner words but never entered Producer
input because no later gate advanced. The live session was subsequently halted
through the existing verified halt engine. Its pushed halt commit is `cb8d372` and
its halt ID is `6cbb0460-a7fb-4308-a12f-e5a33df469ea`. Summary remained void.

## Repair findings

- Exact `/halt` and `Halt this session...` console forms are controller-routed and
  cannot be reclassified by a model.
- Less explicit natural language may be classified by the shared Reviewer skill
  only through `OWNER DIRECTION — HALT REQUESTED`.
- Both routes show the exact owner message and require a separate `1` confirmation;
  cancellation writes nothing.
- A confirmed halt reuses the established bound-session halt implementation. It
  stages only the exact session directory, refuses unrelated staging or existing
  unpushed commits, commits, pushes, and verifies immutable `halt.md`.
- A halt request never creates waiting-direction evidence. Ordinary conversation
  and wait-at-gate behavior remain unchanged.
- Guide and relay status now derive pushed halt truth from session evidence. A
  stale `PAUSED_ERROR` label cannot keep a terminal session apparently active, and
  recovery refuses because there is no active session to recover.
- Forged local `HALTED` or `COMPLETE` labels without corresponding pushed disk
  evidence still refuse. Normal close remains in Guide-return finalization until
  that separate ceremony completes.

## Security result

No new filesystem root, model permission, network capability, clipboard path,
environment inheritance, shell command string, or credential surface was added.
The owner reason is displayed through terminal sanitization but preserved exactly
in the hashed evidence. Git is invoked with argument arrays under the existing
short operation lock. The existing credential, symlink, role-environment,
toolkit-mutation, status-truth, and halt mutations pass.

## Remaining boundary

The deterministic suite proves the controller routes and mutations with real
processes and temporary Git remotes. The unchanged complete run from pushed repair
commit `53bebfc` is bound by toolkit capability `reviewer-halt-status-v24`. A
same-user attacker who replaces the controller, verifier, manifest, and evidence
together remains outside Koda-C's stated security claim.
