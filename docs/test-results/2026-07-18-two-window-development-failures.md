# Two-window runtime development failures

**Date:** 2026-07-18

These failures are preserved separately from the final named transcript because they occurred during local development runs that were not started through the recorder.

## Reversed exit-code assertions

- Command: `npm test`
- Result: **FAIL — 98/100**
- Product behavior: the exact receipt quote returned exit `0`; the deliberately wrong quote returned exit `1`, wrote no approval, and preserved a failed reviewer job.
- Test defect: the two new tests expected those exit codes in reverse.
- Failed tests:
  - `TWO-WINDOW RECEIPT: exact owner quote is recorded from Window B`
  - `TWO-WINDOW RECEIPT MUTATION: a wrong quote refuses and names the preserved failed job`
- Correction: swap only the expected process exit codes. No product path, receipt comparison, or refusal assertion changed.
- Corrected checks: the focused file passed 4/4, followed by the complete suite at 100/100.

## Stale documentation-contract assertion

- Command: `node --test tests/relay-runner.test.ts tests/relay-window.test.ts`
- Result: **FAIL — 7/8**
- Product behavior: the runtime documentation truthfully described the newly implemented first owner-facing slice.
- Test defect: the historical static contract still required the sentence that the harness did not provide an owner-facing reviewer interface at all.
- Failed test:
  - `FULL RELAY RUNNER: execution preserves two contexts and never automates owner receipt proof`
- Correction: replace the superseded static prose expectation with checks for the new producer/reviewer commands, atomic Window B handoff, persistent reviewer, exact owner quote, and explicit remaining free-form-discussion gap.
- Corrected checks: the same focused files passed 8/8.

## Final result

After adding the pending-job wake-up integration, symlink refusal, and inline receipt redaction, `npm run test:record -- 2026-07-18-two-window-runtime-final` passed **101/101**. Every final named result is preserved in [the full transcript](2026-07-18-two-window-runtime-final.md).

Neither failed run was hidden or converted into a pass by weakening product behavior.

## Full rendezvous test-actor corrections

The first separate-process rendezvous attempt passed the five existing two-window checks but timed out its sixth test after 20 seconds because the fake producer never recognized the real session prompt and therefore emitted no context ID or job. Once the assertion reported the saved producer stderr, the cause was explicit: the fake actor looked for the supervisor's display label rather than the actual prompt text. A second attempt exposed the same test-actor mistake for close preparation and verification. The fake actor's prompt recognition was corrected to the real `koda-c-session` and supervised-close instructions; no relay, gate, receipt, Git, or close behavior was bypassed. The same focused rendezvous then passed through pushed close in 3.08 seconds.

The first 102-check recorded run then passed 101/102. Its only failure was the local-link check because README pointed to that result file before the recorder had created it. The failed transcript is preserved at [`2026-07-18-two-window-rendezvous-final.md`](2026-07-18-two-window-rendezvous-final.md). With that file now present, the identical suite was recorded under a separate label and passed 102/102 at [`2026-07-18-two-window-rendezvous-corrected.md`](2026-07-18-two-window-rendezvous-corrected.md). The link assertion was not weakened.
