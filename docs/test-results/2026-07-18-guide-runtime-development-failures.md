# Guide real-project runtime — development failures

**Date:** 2026-07-18

These failures are preserved because the tests are part of the product contract. No timeout was lengthened and no gate, close, receipt, containment, or Git assertion was removed to obtain a pass.

## Shared path resolver changed a static implementation assertion

The first focused run passed 30/31. The behavioral two-process session passed, but `relay-runner.test.ts` still searched `execute-relay-run.ts` for its former inline `realpath(projectCandidate)` statement. Path validation had moved into `relay-run-location.ts` so producer, reviewer, and status would share one implementation.

The assertion was not deleted. It was redirected and strengthened to require:

- every runner calls `resolveRelayRunPaths`;
- fixture project and runtime are both canonicalized with `realpath`;
- Guide runs refuse linked or outside-project resolution;
- only the same package's trusted source or built CLI is accepted.

The next focused run again passed 30/31 because a second static trusted-CLI assertion still pointed at the old file. It was redirected to the shared resolver. The following focused run passed 18/18.

## Reviewer test mode was not activated in the new real-project fixture

The first real-project integration attempt timed out after 20 seconds. Window A opened the confirmed session, produced Brief, posted the formal-review job, and waited. The test initially reported only Window A output.

The harness was improved so an early reviewer exit or a later producer timeout includes Window B's saved output. Two diagnostic reruns reproduced the same 20-second timeout. The complete reviewer output showed the cause: Window B had created and presented an APPROVE review, then correctly waited at `Press Return to open the complete review.` The integration environment set the receipt-test variables but omitted `KODA_RELAY_RUNS_ROOT`, which is the existing explicit guard that enables non-human receipt input in tests. This was a test-fixture error, not a runtime or gate failure.

The fixture now points `KODA_RELAY_RUNS_ROOT` at that real project's `.koda/runs/` only for deterministic owner-input simulation. The unchanged product flow then passed in about four seconds.

## Return finalization was deliberately interrupted

After the normal real-project flow passed, the permanent integration test injected one interruption after ignored Guide-return staging and before any tracked project mutation. Expected observations were all asserted:

- Window A exited with the named interruption;
- runtime state remained `FINALIZING_GUIDE_RETURN`;
- the actual project remained clean;
- the project's `.git` directory still existed;
- the same Window B reviewer process remained alive;
- rerunning Window A rebuilt the same staging bytes, committed and pushed only the named archive and Guide return, marked runtime complete, and let Window B close.

The recovered integration passed. The complete repository suite then passed 128/128 before the final runtime-status mutation was added.

## Linked runtime mutation fixture initially missed its parent directory

The first focused run after adding a linked-`RUN.json` mutation passed 20/21. The new test stopped during setup because it tried to create `<project>/.koda/runs/<launch-id>` before creating the ignored `.koda/runs/` parent. No product code or refusal assertion ran.

The fixture now creates that exact contained parent chain recursively. The assertion remains unchanged: a symbolic-link runtime record must refuse as missing or non-regular state rather than be followed.
