# Security audit — dual Ghostty and manual-terminal launch

- Date: 2026-07-21
- Scope: shared role-launcher extraction, manual command display, Ghostty coexistence,
  duplicate-role refusal, recovery routing, path quoting, environment isolation,
  launcher migration/tamper checks, platform and same-user threat boundaries
- Status: **POST-PUSH PASS — TOOLKIT PROMOTED**
- Initial integrity-enabled full regression: **258/262** with four named corrections
- Corrected local regression: [262/262](../../test-results/2026-07-21-manual-terminal-local.md)
- Unchanged pushed regression: [262/262](../../test-results/2026-07-21-manual-terminal-pushed.md)
- Promoted release regression: [262/262](../../test-results/2026-07-21-dual-launch-release.md)

## Architecture finding

The security-sensitive role-launcher generator is no longer part of the Ghostty
adapter. `src/role-launchers.ts` creates and validates the Reviewer and Producer
launchers. `src/ghostty.ts` only asks the optional macOS adapter to open windows
with those files. Manual mode prints those same bound launcher paths for terminals
the owner opens. The two interfaces therefore do not maintain competing process,
environment, or session implementations.

## Verified controls

- Both launchers are regular project-contained files under the exact launch-ID
  runtime, written mode `0700`, with fixed absolute project, toolkit-script, and
  runtime paths.
- Every shell word is single-quoted with embedded quote handling. Ghostty receives
  one absolute launcher token rather than a shell command string. Manual mode shows
  only that quoted launcher path, not the underlying command or owner evidence.
- The launcher executes through `/usr/bin/env -i` with the existing allowlisted
  role environment. Ambient API keys, parent Codex thread identity, `NODE_OPTIONS`,
  and unapproved terminal state do not reach the child.
- Existing launchers are accepted only when their complete generated structure,
  environment-key order, executable, script, and arguments match the exact runtime.
  Linked, structurally changed, or replaced launchers refuse by name. Compatible
  legacy environment bytes may migrate atomically and leave a migration record.
- Manual-to-Ghostty switching is allowed only before either role is alive. A
  recorded Ghostty launch refuses manual start, and either live role makes both
  surfaces refuse duplicate role processes.
- Status reads the same role locks for both surfaces. It distinguishes prepared,
  Reviewer-first manual startup, active, paused, and missing-role states from disk.
- Recovery remains controller-selected. Ghostty reopens only missing windows;
  manual recovery revalidates the toolkit and existing run-bound launchers, then
  reprints only the missing role or roles in Reviewer-first order. Neither path
  acknowledges a review, advances a phase, or creates another session.
- The final printed read-only status line executes successfully through POSIX
  `/bin/sh`; explanatory prose no longer follows it as though it were a command.

## Regression and mutation result

The unchanged pushed branch commit `f3b93fa` passed all **262/262** tests. Toolkit
capability `dual-launch-surface-v25` binds that commit, its transcript, count, and
every protected launch file. Promoted commit `c7c7cb0` then passed the complete
**262/262** suite again without changing the protected implementation. This
includes gate and receipt mutations, stale-review and status truth, printed-command
execution, Guide/runtime integration, two-process session closure, clean launcher
execution, credential scanning, symlink refusal, sandbox permissions, duplicate
launch refusal, launch-surface coexistence, and default manual recovery commands.

The first complete integrity-enabled run is intentionally preserved. Its four
failures caught one executable-hint ordering defect, one exact wording mismatch,
and two tests that changed the configured Codex executable between interfaces and
therefore activated the intended tamper refusal. No gate, verifier, environment
filter, or tamper condition was weakened to correct them.

## Remaining boundary

The manual interface makes the owner the terminal operator, not an evidence
courier. It cannot prevent the same operating-system user from replacing a
launcher after Koda-C validates it but before that user executes it. Stronger
protection against a hostile same-user concurrent writer requires a separate OS
identity, service boundary, or signed executable and remains outside the current
security claim. The release remains personally exercised only on macOS 26.5.1
arm64; “terminal-independent” describes the terminal application, not a new
cross-platform certification.

No new network capability, dependency, clipboard path, owner-secret transport,
filesystem root, model permission, or automatic third-party terminal integration
was added.
