# Per-test result — 2026-07-18-owner-facing-relay-initial

- Result: **FAIL**
- Node: v26.0.0
- Platform: darwin arm64
- Command: `npm test`
- Totals: 65 tests; 63 passed; 2 failed

The 63 passing tests included every deterministic gate, mutation, receipt-adversarial, stale-review, review-binding, status-truth, package-install, printed-command, history, close, fixture-integrity, and newly added consultation/Ghostty-runner check. The complete names of those unchanged checks are preserved in the immediately corrected [65-test run](2026-07-18-owner-facing-relay-final.md).

The two failures were:

```text
FAIL skill index metadata stays concise, front-loaded, and trigger-specific
Reason: koda-c-review's expanded description began with "Answer", outside the tested front-loaded discovery verbs.

FAIL the shared reviewer keeps all phase criteria in one place
Reason: the reviewer still prohibited receipt disclosure, but the exact explicit sentence "Do not quote the receipt in chat." had been generalized and was no longer present.
```

No test was weakened. The skill description was changed to begin with `Review`, and the exact receipt prohibition was restored. The corrected complete suite passed 65/65.
