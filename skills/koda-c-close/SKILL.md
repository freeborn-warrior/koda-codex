---
name: koda-c-close
description: Prepare the immutable Koda session close artifact, commit and push the bound session, then verify official closure without writing a stale closed flag. Use after every configured phase has advanced and before any new session may begin.
---

# Koda-C Close

Perform the session-close ceremony outside the configurable phase chain. Git must occur between close preparation and close verification.

## ENTRY CHECK

1. Locate `koda.config.json`, the latest session, and `state.json`. Refuse if missing or invalid.
2. Require `currentPhaseIndex` and the advancement history to equal the declared phase count. Refuse if any phase remains active.
3. Verify the final advancement names the final configured phase and binds its review ID and receipt.
4. Run `git status`, identify the current branch and upstream, and verify the project has a usable Git repository. Refuse with the exact missing Git condition.
5. If `close.md` already exists, never edit or replace it. Proceed only to verification; any bound session-file change invalidates it and must be reverted.

## ITS OWN JOB

1. Run `koda session close` once. Require `CLOSE PREPARED — NOT CLOSED` and a generated `close.md`.
2. Read `close.md` without editing it. Verify its `KODA_CLOSE` metadata names the session, final phase, final review, final receipt, and SHA-256 of all other durable session files.
3. Run the exact Git commands printed by Koda. Commit the entire session folder, including `close.md`, with an honest close message, then push the current branch to its upstream.
4. Run `koda session close` again. The command must derive closure from the unchanged artifact, clean committed session, and pushed upstream.

The first call prepares evidence; it does not close the session. The Git commit and push are the state transition. The second call verifies that transition and writes nothing.

## HANDOVER OBLIGATION

Before stopping, require all of these proofs:

- `close.md` exists and its metadata matches the current completed state;
- every other session file still matches the hash bound by `close.md`;
- the entire session folder is tracked and clean;
- the close commit is present on the configured pushed upstream;
- `koda session close` reports `SESSION CLOSED`;
- `koda status` independently derives `SESSION CLOSED`.

Do not create a new session. Report the closed session ID, close artifact path, commit ID, branch, and pushed upstream. A later `koda-c-session` run may begin only after these proofs remain true.
