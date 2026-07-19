# First-use UX audit 04 — one missing role

**Date:** 2026-07-19  
**Result:** MECHANICAL REPAIR PASS; OWNER OBSERVATION STILL REQUIRED

The live recovery made one failure unmistakable: opening two windows is not enough.
Both roles must actually rejoin the same disk handover before Guide reports success.

For the preserved session, Reviewer is already correct and still waiting at Brief.
The failed Producer window may be closed. Guide now presents only:

```text
REVIEWER RECOVERED — the existing owner decision is still open and nothing advanced.

SESSION RECOVERY READY
1. Reopen only the missing Producer
2. Not now
```

Choice 1 opens no duplicate Reviewer and requires Producer to reach its visible
waiting state before Guide calls recovery successful. Producer says it is restoring
the existing formal-review handover and waits; it does not manufacture a second
owner decision.

The prior test's weakness is now explicit: mocked Ghostty acceptance did not prove a
role process survived startup. Recovery tests now include the actual Producer process
and a disk readiness handshake. The complete and coverage suites pass 199/199. The
unchanged suite also passed 199/199 after repair commit `9d4eaa7` was pushed, and its
[durable transcript](../../test-results/2026-07-19-producer-rejoin-pushed.md) is bound
by toolkit capability `ghostty-partial-recovery-v4`. Kristian's next observation is
still required before the flow is called human-proved.
