# UX result — secure Guide and recoverable owner flow

- **Date:** 2026-07-19 (America/New_York)
- **Scope:** first-use Guide opening, paused-session recovery, failed recovery,
  terminal ownership, and Ghostty dependence
- **Production session touched:** no
- **Verdict:** PUSHED MECHANICAL PASS; OWNER OBSERVATION PENDING

## The simplified path

The owner opens one long-lived Guide with one command:

```bash
koda guide open --model gpt-5.6-sol --effort medium
```

The installed-package equivalent is identical. During repository development the
same command may be invoked through `node dist/cli.js`. It opens neither Producer
nor Reviewer. The owner speaks normally at `guide>` and uses a displayed number
for a mechanical launch or recovery. Technical paths, hashes, launch IDs, test
counts, role commands, and receipts are not relay material for Guide.

For the preserved verification pause, `1` recovers the missing role or roles and
`2` leaves the session unchanged. If both windows are absent, Reviewer opens and
reaches the saved owner decision before Producer is requested. If one survives,
only the missing role is requested.

## Mistake and failure behavior

- An empty Guide entry says that nothing changed.
- A duplicate Guide console refuses by name.
- More than one recoverable session makes a bare number ambiguous and changes
  nothing.
- Unsafe or corrupt disk state refuses by name and leaves the Guide prompt open.
- A window/readiness recovery failure says `RECOVERY PAUSED SAFELY`, confirms that
  nothing was acknowledged or advanced, and keeps the same Guide open for retry.
- Closing Guide with `q` closes only Guide; project and session state remain on disk.
- Producer input remains closed. Active-session conversation remains in Reviewer.

## Terminal adapter boundary

Ghostty is an optional macOS convenience adapter, not part of the gate contract.
The workflow can be run in manually opened terminal windows. The competition route
uses Ghostty because it makes the three persistent roles visible, so its automatic
path still receives failure, duplication, ordering, and readiness tests.

## What is still honestly not simple enough

The secure console currently owns project conversation and deterministic recovery.
It does not yet turn the entire future prompt-confirmation, exact Git publication,
staff selection, and new-session launch ceremony into a single two-choice owner
interaction. That larger publisher is tracked work, not a hidden requirement for
resuming the already confirmed verification session.

The formal review still requires the owner to read the review and perform the one
disclosed receipt paste. Its numbered retry loop is implemented and tested, but the
corrected experience has not yet been re-observed by Kristian after the original
empty-receipt mistake. That human observation is the next test, not a presumed pass.
