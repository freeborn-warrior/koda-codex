# First-use recovery polish — development record

**Date:** 2026-07-19  
**Scope:** visible-role liveness, ordered Ghostty startup, Guide-owned recovery,
and recoverable owner input

This record preserves every failure encountered while tightening the live session
experience after the Producer rejoin incident. None of these attempts is promoted
as pushed toolkit proof.

## Owner-observed starting point

Before Kristian pasted any recovery wording, the persistent Guide correctly read
the project files and reported that session `2026-07-19-02` was paused. That is
positive continuity evidence: Guide did not need chat memory or a technical status
report from the owner to discover the active session. The later failure was lower in
the stack—Producer rejoin—not a loss of project-level Guide truth.

## Development failures

1. **Owner-error test capture: 4/6.** The new Reviewer behavior and disk state were
   correct, but `/usr/bin/expect` combined the child process's stderr with its
   captured output while the assertions inspected stdout alone. The test was
   corrected to inspect the combined terminal stream. The two affected cases then
   passed **2/2**. No product condition was removed.
2. **First complete suite after Producer ownership: 203/204.** The real Guide relay
   integration correctly left the new ephemeral `.producer-window.lock` in the run
   while the Producer was alive. The archive validator still allowed only the
   existing Reviewer lock, so finalization refused. The allowlist was extended by
   exactly the new named Producer lock; arbitrary runtime dirt still refuses.
   Single- and plural-runtime integrations then passed **2/2**.
3. **Initial package dry-run: invalid environment attempt.** npm tried to use a
   root-owned user cache and failed before measuring the package. The corrected run
   used a private task cache and succeeded. The first failure is not a package
   failure and is not reported as a pass.
4. **Initial audit command: invalid audit attempt.** `npm audit` in the repository
   refused because this intentionally dependency-free project does not keep a lock
   file. A private temporary copy of `package.json` generated an isolated lockfile
   with scripts disabled and offline, then reported zero vulnerabilities. The
   lockfile was not added to the product.
5. **Fresh full-suite rerun: intentional integrity refusal plus a real retirement
   race.** Restoring the previously pushed manifest before the code commit correctly
   made Guide tests refuse the changed launch surface. In the same run, the Producer
   recovery test exposed a separate `ENOENT`: the process retired its lock after
   status observed the directory but before status read `OWNER.json`. Role status now
   returns “not running” only when the lock itself disappeared during that probe; an
   existing lock with missing/corrupt owner evidence still refuses.

## Corrected local results

- Focused relay and status slice: **24/24**.
- Guide, relay, security, and integrity slice: **71/71**.
- Complete living suite: **204/204**.
- Coverage suite: **204/204**, with 89.03% lines, 68.92% branches, and 86.94%
  functions overall. `gate.ts` remained at 97.51% lines, 98.73% branches, and 100%
  functions.
- Private-cache package dry-run: pass; 896,230 bytes compressed, 4,289,377 bytes
  unpacked, 760 files.
- Isolated dependency-free audit: zero vulnerabilities.
- `git diff --check`: pass.
- `git fsck --no-reflogs --full`: no missing or corrupt reachable object; dangling
  development objects only.

## What the new mutations prove

- A live Producer owns one session window; a duplicate Producer refuses.
- A dead Producer lock is recoverable, while a live lock is not stolen.
- Linked or non-directory Reviewer and Producer lock paths refuse without touching
  outside evidence.
- Ghostty never opens Producer until Reviewer has created its live lock and role
  state.
- Ghostty never reports startup success until Producer has created its live lock and
  moved beyond prepared state.
- A failed review reader or clipboard copy stays at the same owner decision and
  offers numbered recovery; it does not terminate the session or mutate the ledger.
- Guide reports the exact missing role from process evidence and keeps raw recovery
  commands away from the owner-facing surface.

Pushed-code proof is deliberately separate: repair commit `153814a` reached
`origin/main` before the unchanged **204/204** suite produced the
[durable transcript](2026-07-19-first-use-recovery-polish-pushed.md).
