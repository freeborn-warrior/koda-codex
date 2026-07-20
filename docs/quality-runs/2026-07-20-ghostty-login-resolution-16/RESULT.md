# Quality audit 16 — Ghostty login command resolution

**Date:** 2026-07-20  
**Result:** LOCAL FOCUSED PASS; FRESH OWNER WINDOW RUN OWED

## Product failure

The one-command journey reached Guide, but its first role window failed immediately
because Koda passed Ghostty a relative executable. The owner was again left with a
terminal error instead of the promised Reviewer/Producer experience.

## Why the test did not protect the user

The existing test checked argument count, labels, launcher mode, clean environment,
and role ordering, but explicitly asserted that the `-e` token began with
`./.koda/runs/`. Its fake window opener never changed directory. The test therefore
proved Koda's intended argument shape while missing Ghostty's real execution shape.

## Correction quality

- Owner steps are unchanged.
- Reviewer still opens before Producer.
- Ghostty still receives exactly one command token per role.
- The token is now absolute and mechanically contained inside the project runtime.
- Mode-700 launcher, clean environment, readiness, and duplicate protections remain.
- A named mutation verifies behavior after a login-style directory change.

## Evidence

- Owner incident: [real-window record](../../verification-runs/2026-07-20-ghostty-login-resolution-01/RESULT.md).
- Focused changed slice: **82/82 passed**.
- Real macOS login wrapper accepted a harmless absolute executable with exit 0.

Complete-suite, post-push, and fresh owner-window proof remain open.
