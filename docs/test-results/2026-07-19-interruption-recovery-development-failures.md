# Development failures — interruption recovery

**Date:** 2026-07-19

These failures are retained because interruption recovery is product behavior, not test scaffolding.

## Focused run 1 — 2/3

- Producer same-context recovery: **FAIL** — the test timed out waiting for the formal-review handoff.
- Reviewer job same-context recovery: PASS.
- Missing-context refusal: PASS.

The timeout hid the supervisor's early exit, so the test harness was strengthened to race the expected handoff against process completion and report complete stdout/stderr when the process exits first.

## Focused run 2 — 2/3 with exact cause

The strengthened diagnostic showed Producer recovery resumed the correct context but the deterministic worker exited one because the recovery prompt did not itself name `reconcile interrupted turn`. That phrase appeared only in the human-facing turn purpose. The product prompt gained an explicit same-context reconciliation sentence; the behavioral assertion remained and accepts capitalization without changing the required meaning.

## Corrected and expanded focused run — 4/4

The corrected cases passed, then coverage expanded to an interrupted owner conversation. The missing-context mutation was also strengthened so the fake child ignores soft termination, proving the two-second force-stop path before Koda refuses context replacement.

No gate, receipt, verdict, stale-review, or prior relay assertion was removed or relaxed.

## Status-truth strengthening — 9/10

After the first complete 156-check pass, interruption status validation gained an unsafe-purpose mutation. The new condition refused, but auto-discovery incorrectly reported `No relay run exists` because it filtered the corrupt record out before explaining it. Status discovery now tracks invalid run directories and refuses `Corrupt or unsafe relay state exists` instead of treating corruption as absence. The inherited status test was strengthened to forbid the old absence message. The corrected focused status/interruption set passed 10/10.
