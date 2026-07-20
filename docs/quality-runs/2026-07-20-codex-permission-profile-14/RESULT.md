# Quality audit — installed Codex permission profile

**Date:** 2026-07-20  
**Result:** PASS FOR LOCAL STARTUP CONTRACT; LIVE OWNER MODEL TURN OWED

## Finding

The first-use path failed before Guide started because the generated permission
profile was not accepted by the installed Codex parser. Koda then displayed a
secondary missing-context symptom instead of the primary configuration error.

## Correction quality

- Generated arguments now follow Codex's documented dotted permission-profile
  structure rather than supplying the filesystem table as one dynamic inline value.
- Both Guide and session-role profiles are parsed by the installed Codex executable
  before any demo directory, Git repository, or immutable launch is created.
- The obsolete serialization is a named mutation condition in the test suite.
- Primary process stderr is sanitized, shown immediately, and preserved completely
  on disk. Missing context is evaluated only after a successful process exit.
- The same one-command user path remains; no new owner step was added.

## Evidence

- Focused suite: **35/35 passed**.
- Complete suite: **242/242 passed**.
- Codex CLI 0.144.6 accepted read-only Guide and write-capable role profiles.
- A no-model full-session preparation ended clean, pushed, and launch-ready.

## Boundary

The build environment did not permit a real model turn to export project context
without separate authorization. The corrected installed parser and local startup
contract are proved; Kristian's next Ghostty run remains the live-model proof.
