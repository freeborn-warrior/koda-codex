# Stable-handover recovery — development failures

**Date:** 2026-07-19  
**Status:** PRESERVED DEVELOPMENT EVIDENCE; NOT PROMOTED AS A PASS

This record preserves every observed failure while expanding visible-window recovery
from the historical Brief receipt incident to any stable owner decision.

## Failure 1 — inconsistent old liveness fixture

- **Run:** focused Guide suite.
- **Result:** 36/37 passed.
- **Named failure:** `GUIDE VISIBLE ROLE STATUS: disk liveness reports a missing Producer instead of pretending the session is active`.
- **Reason:** the old generic liveness fixture labeled the runtime
  `AWAITING_REVIEWER_WINDOW` but did not create the reviewer job required by that
  state. The new fail-closed recovery classifier correctly refused the contradiction.
- **Correction:** the generic fixture now uses `RUNNING`, which is the state it was
  intended to model. Stable owner-handover fixtures separately create and bind a
  real `AWAITING_OWNER` reviewer job. No product requirement or refusal was removed.

## Failure 2 — locally changed code versus the prior integrity hash

- **Run:** focused Guide suite after a further recovery edit and rebuild.
- **Result:** 2/38 passed and 36 refused.
- **Reason:** `docs/toolkit-integrity.json` still carried the immediately preceding
  local source and distribution hashes. Every Guide consumer that depended on the
  launch surface refused `src/ghostty.ts` as changed.
- **Correction:** the two local hashes were updated solely to bootstrap development
  verification. The release manifest will be rebound only after the repair is
  committed, pushed, and rerun unchanged.
- **Integrity meaning:** this is expected fail-closed behavior and is not counted as
  a product regression or a successful test run.

## Corrected local results

- Focused Guide suite: **39/39**.
- Complete deterministic suite: **210/210**.
- Coverage suite: **210/210**, at **89.08% lines, 69.65% branches, and 86.65%
  functions** overall.
- Package dry-run: **PASS**, dependency-free, 934,672 compressed bytes, 4,511,133
  unpacked bytes, 770 files, zero bundled dependencies.
- Diff whitespace, tracked-symbolic-link scan, and reachable Git connectivity:
  **PASS**.

These are local development results. They do not become toolkit release evidence
until the unchanged repair commit is pushed and the complete suite is recorded from
that pushed base.
