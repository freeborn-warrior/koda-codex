# Test result — secure Guide console development failures

- **Date:** 2026-07-19 (America/New_York)
- **Status:** PRESERVED FAILURES — CORRECTED LATER
- **Production verification session mutated:** no

## Focused run 1

- **Result:** 50 passed, 41 failed, 91 total.
- One new first-use fixture omitted its configured `docs/sessions` directory.
- The other forty Guide failures all named the same expected development
  condition: changed critical toolkit files no longer matched the prior pushed
  integrity seal.
- Correction: create the required fixture directory and locally bootstrap exact
  hashes for the changed critical surface before rerunning. No assertion was
  removed or weakened.

## Persistent-console integration run 1

- **Result:** 6 passed, 1 failed, 7 total.
- The fixture wrote `q` before the console reached its input boundary; the
  read-line stream closed instead of exercising a normal owner exit.
- Correction: wait for the visible `guide>` prompt, then send `q`. The same
  seven-test slice passed 7/7.

## Integrity refusals during hardening

Two later 7-test and 19-test slices correctly refused the subprocess integration
after `src/guide-console.ts` changed but before its local integrity hash was
updated. Each refusal named that exact file. After rebuilding and refreshing
the local development hash, the Guide/security slice passed 19/19.

The later session-evidence overlap guard changed the same critical source and
distribution files. The first 9-test console rerun therefore passed 8/9 and
refused the subprocess integration at `src/guide-console.ts`. After refreshing
only those two development hashes, the identical slice passed 9/9. This was the
integrity mechanism working as designed.

## Complete-suite recovery race

- **Result:** 226 passed, 1 failed, 227 total.
- During one real concurrent cleanup, Producer inspected its lock after Reviewer
  had removed `OWNER.json` but before the lock directory itself disappeared. The
  read received `ENOENT` and the recovery test failed instead of guessing.
- Correction: the status reader now retries that bounded transient state across
  event-loop turns, accepts complete disappearance as absence, and still refuses
  a persistent lock with a missing or malformed owner. The focused recovery slice
  passed 20/20, then the unchanged complete suite passed 228/228. The later
  session-write refusal added one test and the coverage suite passed 229/229.

## Package-audit setup refusal

Running `npm audit` directly in the source checkout refused with `ENOLOCK`; this
dependency-free repository intentionally has no lockfile. Koda did not create one
in the checkout. It copied only `package.json` to a temporary directory, generated
an isolated lockfile with scripts disabled, and reran the production audit there.
That audit reported zero vulnerabilities. The setup refusal remains recorded here
instead of being omitted from the result.

## Final judge-link assembly refusal

The first 72-test Guide/security/submission/integrity slice passed 71/72. Updating
the judge path to the new persistent-Guide probe had accidentally replaced the
existing Producer/Reviewer project-boundary probe. The unchanged submission test
named the missing link. The README now carries both distinct security proofs; no
assertion was removed or weakened.

## Real Codex failures

- The first live model probe stopped on a malformed patch hunk before testing
  the security contract.
- The first real context resume found a product bug: Koda passed the outer
  `--color` option to the `resume` subcommand. Real Codex refused it.
- Koda corrected the option ordering, added a regression, and resumed the same
  context successfully. The complete boundary outcome is preserved in
  [security audit 14](../security-runs/2026-07-19-secure-guide-console-boundary-14/RESULT.md).

These failures remain evidence because the product's test discipline includes
setup, integration, integrity, and real-runtime mistakes—not only green runs.
