# Security audit 07 — owner ceremony and visible recovery

**Date:** 2026-07-19  
**Result:** PASS WITH EXISTING LOCAL-USER AND HUMAN-PROOF BOUNDARIES

## New surfaces reviewed

- numbered Reviewer reading/decision/retry ceremony;
- exact legacy owner-receipt recovery;
- one-action Guide-to-Ghostty recovery;
- bounded atomic waiting-direction read;
- toolkit skill and owner-facing status changes.

## Findings and repairs

The first implementation passed the exact receipt to `koda approve` as a process
argument. Although a receipt is evidence rather than a secret, same-user process
inspection could observe it, and owner comments/rulings are more sensitive. Receipt,
comments, and rulings now travel over the child process's stdin. A permanent security
test refuses their addition to arguments or production environment variables.

The recovery route accepts only the exact historical runtime status and exact failed
job shape. It requires ordinary files, an existing visible launch, no live Reviewer
lock, and no prior `RECOVERY.json`. The immutable recovery record binds the current
verified toolkit snapshot before GUI mutation. Reviewer opens first; Producer cannot
open until Reviewer has a live lock and the same job reaches `AWAITING_OWNER`.
Duplicate recovery refuses.

Wrong receipt, invalid choice, empty question, abandoned halt, or stop-for-now writes
no approval. Unknown waiting-direction entries still refuse immediately; only Koda's
exact atomic temporary filename receives a bounded retry, and a persistent one
refuses after 250 ms.

## Checks

- Complete ordinary suite: 194/194.
- Complete coverage suite: 194/194, including 100% lines in the environment sanitizer.
- Expanded owner-error/security slice: 73/73.
- Credential-signature scan: no tracked finding.
- Tracked symbolic-link scan: none.
- Executed hostile-environment launcher: credentials, parent context ID, and
  `NODE_OPTIONS` absent from the child.
- Isolated real package dry-run: passed; no install hooks or dependencies.
- Isolated npm audit with a temporary lockfile: zero vulnerabilities.
- `git diff --check`: passed.
- `git fsck --full`: reachable history valid; only recoverable dangling development
  objects were named.

## Boundaries

The system clipboard may be visible to other local applications. The integrity
manifest is not a signature. A same-user attacker can replace the verifier and all
bound evidence together or race between final verification and Ghostty execution.
The recovery record lives in ignored project-local runtime state until the session
returns durable evidence to Guide. These are unchanged local-workflow boundaries, not
remote-security claims.

No critical or high unmitigated code finding remains in this delta. Real Ghostty
recovery is not called a pass until Kristian observes it; deterministic tests cannot
prove window placement, macOS permission presentation, or first-time comprehension.
