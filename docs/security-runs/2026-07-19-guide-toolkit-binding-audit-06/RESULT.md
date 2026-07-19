# Security audit 06 — Guide toolkit integrity binding

**Date:** 2026-07-19
**Scope:** `src/toolkit-integrity.ts`, Guide confirmation/verification, the
repository-local session-prompter, the toolkit integrity manifest, package
contents, and the unconfirmed verification retry.
**Result:** PASS WITH EXPLICIT LOCAL-TRUST BOUNDARY

## Why this audit exists

The owner was asked to copy implementation paths, commits, test totals, and
evidence references into Guide. Replacing that manual relay with a machine check
is only safer if the machine check fails closed and cannot overstate the evidence
it hashes.

## Controls verified

- The manifest is a contained real regular JSON file with a validated schema.
- Every critical path is toolkit-relative, unique, contained after `realpath`,
  non-empty, a regular file, and byte-matched by SHA-256.
- The evidence transcript is separately hashed and must say PASS, name the same
  recorded time and tested commit, and contain equal test/pass totals with zero
  failures. A manifest cannot claim 999 tests while hashing a 181-test result.
- Linked evidence refuses before content use. Changed critical code refuses and
  names its path.
- New launch requests include the capability, integrity-manifest hash, repair
  anchor, tested commit, exact test total, and evidence hash. A changed snapshot
  refuses as stale before project launch verification continues.
- Historical launch files remain readable for disk history, but an old pending
  request without toolkit evidence cannot verify or launch; it must be cancelled
  and reconfirmed.
- `koda-c-session-prompt` and root/project guidance forbid using the owner as the
  technical transport layer. The live retry draft contains no copied absolute
  repository path, Git blob, or evidence commit.
- The real package installation test passes with the manifest, evidence, source,
  built verifier, and project-local skills included.
- The tracked credential-signature scan, linked-file scan, clean model-child
  environment test, and executable Ghostty launcher test remain green.

## Adversarial results

- Changed critical file: REFUSED with the exact file named.
- Linked evidence: REFUSED as not a real regular file.
- Inflated manifest test count: REFUSED because the hashed transcript contradicts
  the claim.
- Changed launch-bound manifest hash: REFUSED as stale.
- Missing toolkit binding on a pending historical request: REFUSED with cancel and
  reconfirm recovery.

The final complete deterministic suite passed **187/187**, including package and
security checks. Every named result is preserved in
[`../../test-results/2026-07-19-guide-toolkit-integrity-final.md`](../../test-results/2026-07-19-guide-toolkit-integrity-final.md).

## Findings

No new unmitigated code-level critical or high finding was found.

The remaining boundary is deliberate and unchanged: these hashes are integrity
bindings, not signatures. A same-user attacker who can replace the verifier,
manifest, critical files, and evidence together can manufacture a consistent
installation. Packaged installs may lack `.git`, so the tested commit is matched
to the hashed transcript rather than authenticated from a local object database.
The existing same-user replacement window between final verification and Ghostty
execution also remains. Stronger guarantees require signed releases, operating-
system isolation, or a service boundary and are outside this local workflow's
current claim.

## Human boundary

This audit proves neither cognition nor a usable real Ghostty experience. It
proves that the owner no longer has to carry technical evidence and that launch
truth becomes stale when its disk-bound toolkit proof changes. The fresh
owner-observed three-window retry is still required before the incident can close.
