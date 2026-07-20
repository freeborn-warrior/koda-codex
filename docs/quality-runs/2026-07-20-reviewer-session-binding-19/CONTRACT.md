# Sealed independent review contract — Reviewer session binding

- Written: 2026-07-20
- Review mode: fresh, read-only Codex context
- Intended reviewer: GPT-5.6 Terra, medium effort
- Verdict vocabulary: `APPROVE` or `REVISE`
- This contract must be committed before the review begins.

## Review object

Judge the complete visible startup transition introduced after owner-observed launch
`115c716e-1c9c-43c5-8e5d-edead043b29a`:

1. Reviewer may become visible before Producer but cannot claim active-session input.
2. Early terminal input waits in the same process and is consumed only after a real
   session binds.
3. Reviewer state records the exact session identity it validated.
4. Producer cannot begin Brief work until the live Reviewer binds that same identity.
5. Guide cannot report successful visible launch from process locks alone.
6. Existing formal review, recovery, interruption, direction, and receipt behavior
   remains intact.

## Required checks

- Trace initialization and the main loop in `scripts/run-relay-reviewer-window.ts`.
- Trace Producer session opening and its new Reviewer-binding boundary in
  `scripts/execute-relay-run.ts`.
- Trace Guide's final visible readiness predicate in `src/ghostty.ts` and its built
  `dist/ghostty.js` output.
- Confirm missing, malformed, failed, and cross-session state refuse rather than
  becoming launch success.
- Confirm early input cannot invoke a model or create direction evidence before the
  session exists, but is not discarded during the ordinary startup race.
- Inspect the owner-observed incident, focused failures, exact race test, complete
  local/post-push transcripts, and public wording.
- Distinguish process-visible, session-bound, Reviewer-ready, and human-rehearsed
  claims. The final fresh Ghostty rehearsal must remain explicitly pending.

## Verdict rule

`APPROVE` only if the complete transition is coherent, fail-closed, preserves the
owner's early question, and does not overclaim the remaining human proof. Use
`REVISE` for any correctness, identity-binding, liveness, recovery, security,
regression, or evidence-claim defect. Cosmetic preferences do not justify `REVISE`.

Every material finding must cite repository paths. A vague blocking verdict is not
a valid finding.
