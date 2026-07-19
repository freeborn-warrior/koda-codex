# Plural runtime development failures

**Date:** 2026-07-19

No product condition or inherited test was weakened to remove these failures.

## Fixture prompt omitted required handover sections

The first plural integration stopped before confirmation because its new prompt
omitted `## Prior session carry-forward` and `## Relay handover`. The Guide prompt
validator named the first missing heading. Both required sections were added to
the fixture; the validator was unchanged.

## Fixture project omitted the configured session directory

The second run reached session open and stopped because the fixture had not
created `docs/sessions/`. Project config correctly refused a sessions directory
that did not exist. The fixture setup now creates the configured directory before
launch; config containment remains unchanged.

## Headless Reviewer lacked its test clipboard adapter

The third run reached the real owner-receipt ceremony and paused because a
headless test process cannot use macOS `pbcopy`. The existing test-only clipboard
file was supplied separately to each runtime. Receipt creation, owner-read
confirmation, exact quote binding, model redaction, and production clipboard
behavior were not bypassed. The next run completed both pairs.

## Complete-suite run exposed global Git truth in a plural project

The first complete 177-test run passed 176 checks. One pair had already pushed
its own immutable close, but the sibling pair committed during its verification
window. The old closure check asked whether the entire branch was ahead of
upstream and falsely reported the first session as unpushed during the sibling's
short commit-to-push interval.

The check was not relaxed. It was made more exact: the complete session tree and
every externally claimed output must match upstream byte-for-byte. A new control
commits unrelated local Guide work without pushing it and proves that the already
pushed session remains closed. A new mutation commits a claimed output without
pushing it and proves close remains shut by name.

## Published lock directory briefly lacked its owner record

A concurrent focused run exposed the acquisition window between creating
`.koda/git-operation.lock/` and writing `LOCK.json`. The competing claim safely
refused, but it named corrupt owner evidence instead of the actual same-path
overlap. Lock acquisition now creates a unique pending directory, writes the
complete owner record there, and atomically renames that directory into the live
lock name. The same simultaneous-claim test now reaches one winner and one named
overlap refusal.

## Optional Git index refresh collided with a serialized commit

The same focused run also caught `git status` acquiring Git's optional
`index.lock` outside Koda's mutation lock while a sibling Guide-return commit was
starting. All Koda-owned Git invocations now set `GIT_OPTIONAL_LOCKS=0`; required
mutation locks still operate, while read-only status cannot refresh the shared
index behind the cooperative lock. Guide return and close metadata also bind the
latest commit touching their exact paths, not an incidental sibling HEAD.

The 45-second process liveness limit was retained. After these product fixes, the
focused concurrency set and the complete suite passed without extending or
removing the timeout.
