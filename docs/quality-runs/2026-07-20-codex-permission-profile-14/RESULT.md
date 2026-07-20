# Quality audit — installed Codex permission profile

**Date:** 2026-07-20  
**Result:** SUPERSEDED — AUTOMATED CHECK DID NOT INSTANTIATE THE PROFILE

> This audit described an intermediate repair as a pass. The owner's next real
> run proved that conclusion false. See
> [quality audit 15](../2026-07-20-codex-permission-instantiation-15/RESULT.md).

## Finding

The first-use path failed before Guide started because the generated permission
profile was not accepted by the installed Codex parser. Koda then displayed a
secondary missing-context symptom instead of the primary configuration error.

## Intermediate correction

- Generated arguments attempted a dotted permission-profile structure, but quoted
  dotted path keys became literal paths in the real parser.
- The installed executable was invoked with `--version`; that path did not load
  either Guide or session-role filesystem profile.
- The obsolete serialization is a named mutation condition in the test suite.
- Primary process stderr is sanitized, shown immediately, and preserved completely
  on disk. Missing context is evaluated only after a successful process exit.
- The same one-command user path remains; no new owner step was added.

## Evidence

- Focused suite: **35/35 passed**.
- Complete suite: **242/242 passed**.
- Codex CLI 0.144.6 accepted the surrounding arguments without instantiating the
  read-only Guide or write-capable role profiles.
- A no-model full-session preparation ended clean, pushed, and launch-ready.

## Boundary

The owner's next Ghostty run supplied the missing evidence and failed during
`FilesystemPermissionToml` deserialization. This audit must not be used as current
startup proof.
