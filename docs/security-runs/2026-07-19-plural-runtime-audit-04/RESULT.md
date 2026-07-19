# Plural runtime security audit — 2026-07-19 — run 04

- Status: **PASS WITH DOCUMENTED SAME-USER, BOUNDED-WAIT, HOOK, AND LIVE-HUMAN BOUNDARIES**
- Platform: macOS arm64
- Scope: plural runtime registry, simultaneous session allocation, explicit run
  routing, four-process relay, write-claim conflict serialization, shared Git
  index lock, immutable close, package/static integrity, and inherited threats

## Result

The former one-unfinished-runtime guard is removed without introducing implicit
runtime selection. `.koda/runs/<launch-id>/RUN.json` is the authority for each
pair. Guide status validates and lists all records. Producer, Reviewer, and detail
commands contain an exact run-root argument; generic discovery still refuses when
more than one active run would make selection ambiguous.

Two simultaneous session allocations receive distinct directories. Two live
Producer/Reviewer pairs complete in the same real Git project with four distinct
context IDs, distinct session bindings and artifacts, exact owner acknowledgements,
serialized exact-path commits, pushed closes, and separate Guide returns. The
repository finishes clean and zero commits ahead of upstream. Each session's
closure is independently proved by comparing its exact tree and claimed outputs
to upstream, so a sibling's temporary local-ahead state cannot falsify it.

## Checks

| Area | Result | Evidence |
|---|---|---|
| Runtime registry | PASS | Multiple valid unfinished run records enumerate; corrupt, linked, or launch-ID-mismatched records still refuse. |
| Explicit routing | PASS | Every plural Guide command embeds one run root; no active pair is chosen by latest timestamp. |
| Session allocation | PASS | Atomic directory creation gives simultaneous starts distinct dated IDs. |
| Context separation | PASS | Four-process proof requires distinct Alpha/Beta Producer/Reviewer context IDs. |
| Session separation | PASS | Both artifacts cite their own bound session and the other session remains untouched. |
| Write conflicts | PASS | Claim acquisition waits for the short lock, rechecks under lock, and same-path contention ends in a named overlap refusal. |
| Git serialization | PASS WITH BOUNDED WAIT | Relay ceremonies wait up to 30 seconds, require a zero-ahead base, stage exact paths, verify staged blobs, push, and release. Lock ownership publishes atomically and Git reads disable optional index refresh. A malicious live lock can delay a caller until that bound expires. |
| Immutable close | PASS | Each concurrent session independently revalidates its session directory and external claims against upstream; unrelated local-ahead commits do not count as that session's evidence. |
| Unrelated dirt | PASS | Exact staging prevents one pair from sweeping the other pair's in-flight files into its commit. |
| Package lifecycle | PASS | Isolated-cache `npm pack --dry-run --json` rebuilt eighteen dependency-free JavaScript files; the package retains no runtime dependencies or install hook. |
| Repository integrity | PASS WITH RECOVERABLE DEBRIS | `git diff --check` passed. `git fsck --full` reported unreachable dangling blobs/trees left by prior Git history operations, but no missing or corrupt reachable object; `git fsck --connectivity-only --no-dangling` completed cleanly. The inherited tracked-symlink and common-credential scans pass in the 177-check suite. |
| Human runtime | NOT YET CLAIMED | No real Ghostty windows or live model were launched in this deterministic audit. |

## Threat boundaries retained

1. Same-user processes can bypass Koda's cooperative claims and lock. Koda proves
   byte relationships and refusal behavior, not authenticated authorship.
2. Git hooks and remotes run with the authority of the user starting the relay.
3. The 30-second wait is bounded serialization, not a distributed lock or
   denial-of-service defense.
4. Ctrl-C terminates direct model children; service-grade descendant containment
   remains separate work.
5. Automatic Ghostty opening is macOS-specific and still needs Kristian's visible
   usability proof.
6. Koda refuses a Git ceremony when earlier unpushed commits already exist, so it
   never silently pushes an unrelated local commit as part of a session operation.

## Verdict

Plural local runtimes are mechanically supported for trusted cooperative project
work. Do not claim hostile-writer isolation, cross-machine locking, hook
sandboxing, provider independence, or owner-observed multi-window usability. The
complete unchanged suite passed 177/177 again after commit `f2b1356` was pushed.
