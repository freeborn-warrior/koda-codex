# Whole-product quality audit — 2026-07-19 — run 01

- Status: **DETERMINISTIC PASS WITH OWNER-OBSERVED PROOF AND CONCURRENCY IMPLEMENTATION PENDING**
- Platform: macOS arm64
- Node: `v26.0.0`
- Scope: gate engine, full six-phase workflow, Guide launch/return, separate Producer and Reviewer processes, owner acknowledgement, waiting direction, halt, interruption recovery, package, skills, evidence, and terminal language

## Outcome

The implemented product is internally coherent and the complete deterministic
suite passes without weakening an inherited condition. Koda-C now describes
itself accurately as a disk-backed workflow whose current mechanical surface is
a CLI, not as a wrapper around a model command. Its provider-separated seats are
recorded only as architectural possibility; the runner remains Codex-specific.

The interruption record is now one shared fail-closed schema used by both the
supervisor and status reader. Role, known turn purpose, positive turn number,
signal, exact UTC timestamp, role-bound evidence filenames, and context identity
are validated in one place. The new mutation control rejects a human-readable
but non-canonical date as well as unsafe purpose and mismatched evidence files.

## Evidence exercised

- `npm run build` emitted sixteen dependency-free JavaScript files.
- `node dist/cli.js --help` ran the committed binary and printed the complete
  command surface with the corrected workflow description.
- `npm test` passed all **157/157** named checks in the working tree.
- A real `npm pack --dry-run --json` with an isolated cache passed: 617,579
  packed bytes, 3,082,856 unpacked bytes, 649 entries, and zero bundled
  dependencies. The package includes the repository's tests, skills, scripts,
  documentation, and evidence by explicit policy; this is broad but inert.
- Git diff whitespace checks and repository object verification passed.
- The final durable coverage run is preserved in
  [`../../test-results/2026-07-19-whole-product-audit-final.md`](../../test-results/2026-07-19-whole-product-audit-final.md).
- The unchanged pushed milestone passed 157/157 again at `ee94d2d`; every name is
  preserved in [`../../test-results/2026-07-19-whole-product-audit-pushed-final.md`](../../test-results/2026-07-19-whole-product-audit-pushed-final.md).

The first package inspection against the machine's default npm cache failed with
an `EPERM` ownership error under the user's global `.npm` directory. Koda did not
change that external directory. Repeating the same inspection with a fresh local
cache passed; this is a machine configuration issue rather than a product pass
being inferred from a failed command.

## What is still honestly unproved

- Kristian has not yet watched the complete Guide + Producer + Reviewer Ghostty
  path start, converse, finish, and recover from Ctrl-C with live models.
- Deterministic child-process tests prove exact context-resume arguments and disk
  routing, not the quality of a live model's reconciliation prose.
- The existing sealed reviewer matrix proves its bounded fixtures, not general
  cognition or universal reviewer performance.
- The current package is intentionally comprehensive rather than minimal; a
  publish-focused package profile may later omit historical evidence without
  changing the source repository.

## Development failure retained

A final README evidence refresh initially replaced the independent 152-check
fresh-model transcript with the newer deterministic audit. The next complete
run passed 156/157 and refused because the judge path no longer linked that
separate proof. Both links now remain, and the evidence assertion was preserved
unchanged. The failure is recorded in
[`../../test-results/2026-07-19-whole-product-audit-development-failures.md`](../../test-results/2026-07-19-whole-product-audit-development-failures.md).

## Product decision surfaced by the audit

The real-project pre-close commit uses `git add -A`. A run begins clean, so the
supervised path is deterministic, but a tracked file edited independently by
Guide, owner, or another process during the active session could be swept into
the Producer's commit. Fixing that honestly requires choosing the intended
concurrency contract: an exclusive project mutation lease, an exact Producer
output manifest, or both. The issue is promoted to `BACKLOG.md` and the current
safe-use boundary is explicit in `SECURITY.md`; no policy was silently chosen
while the owner was asleep.

### Owner addendum

Kristian subsequently ruled that Guide and unrelated project work must be able
to change files while Produce runs. The whole-project exclusive lease is
therefore rejected. The chosen direction is exact per-workstream write sets,
same-path conflict refusal, exact-path Git staging, and a short recoverable lock
only around stage/commit/push. Kristian then confirmed the parent model: Produce,
Explore, Research, Architecture, Triage, and later kinds are sibling bounded
sessions, and independent siblings may be active concurrently. Implementation
and mutations remain pending; the current global session refusal is now an
explicit gap rather than the intended product rule.

## Verdict

The mechanics are ready for the next owner-observed three-window run. The live
human ceremony and the concurrent-provenance implementation remain distinct
work; neither is represented as already passed.
