# Security audit — exact owner acknowledgement recovery

- Date: 2026-07-21
- Scope: migration of one pre-fix multi-part acknowledgement failure into the
  existing numbered Guide recovery path
- Status: **POST-PUSH PASS — TOOLKIT PROMOTED**
- Preserved launch: `1c2a5c0f-d578-4d64-822b-ee99fa184133`
- Complete local regression: [267/267](../../test-results/2026-07-21-owner-ack-recovery-bootstrap-refusal.md)
- Unchanged pushed regression: [267/267](../../test-results/2026-07-21-owner-ack-recovery-pushed.md)
- Promoted release regression: [267/267](../../test-results/2026-07-21-owner-ack-recovery-release.md)

## Finding

The repaired v26 controller could process receipt-plus-comments and
receipt-plus-ruling input, but the saved pre-fix job carried a more detailed error
than the one historical receipt-mismatch recovery allowed. Treating every failed
Reviewer job as recoverable would weaken the gate and permit unrelated crashes to
inherit an owner decision point.

## Correction

Koda-C recognizes only the exact old Node unsettled-await signature emitted after
the review code matched. It then re-derives the recovery authority from disk. The
runtime, failed job, and Reviewer state must carry the same error. Launch and
session binding, current phase, expected review path, job identity, role models,
Reviewer context, Producer context, prior gate count, and owner acknowledgement
count must agree. The current artifact and review must remain valid and bound; the
only absent authority may be the current receipt acknowledgement (plus the normal
blocking condition for `DISCUSS`).

The recovery does not write an approval, reconstruct comments, advance a phase,
replace a model context, or create a session. It only authorizes the existing
Reviewer-first role launchers to reopen the same decision. The owner must still
read and acknowledge again, and the ordinary gate rechecks the exact receipt,
comments or ruling, artifact hash, review, and ledger from disk.

## Adversarial result

- A changed error signature receives no recovery classification.
- A changed artifact refuses as stale reviewed evidence.
- A changed job ID refuses against Reviewer state.
- A changed Reviewer context ID refuses against the saved runtime.
- An already-written approval refuses because the receipt is no longer
  unacknowledged.
- The exact valid case restores Reviewer before Producer and preserves both role
  context IDs.

No network access, dependency, shell evaluation, broad filesystem grant,
clipboard behavior, credential transport, or model permission was added. The
same-user local-state boundary remains unchanged: a user able to rewrite every
runtime and project file can fabricate evidence, while Koda-C's contract is to
detect inconsistent or incomplete disk state and refuse to guess.

Toolkit capability `bound-owner-ack-recovery-v27` binds repair/test commit
`894a747`, the exact 267-check post-push transcript, and every changed source and
compiled runtime file. Owner observation is still reported separately; it is not
inferred from deterministic tests.

The promoted manifest commit `a496742` then passed the unchanged **267/267**
release suite, transcript SHA-256
`68d0df3f3167566f41ae54b56824bb181bb388bef14f1e04f54e373d8b083269`.
