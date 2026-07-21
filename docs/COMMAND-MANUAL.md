# Koda-C Command Manual

This manual explains what each command means, what it changes, and who normally
uses it. Syntax alone is not enough for a workflow whose central behavior is
refusal.

Examples below use `koda`. From a repository checkout, replace it with
`node /path/to/koda-codex/dist/cli.js`. Koda-C prints exact state-bound commands
whenever a human is expected to run one.

## Human entry commands

### `npm run demo:session`

Creates and opens the complete three-context demonstration described in the
[Quick Start](QUICKSTART.md#path-b--run-a-complete-three-context-session).

- **Writes:** one isolated ignored project under `.koda/full-session-demos/`.
- **Git:** initializes a repository and a separate local bare upstream, then
  commits and pushes the confirmed sample prompt.
- **Models:** opens a persistent Sol Guide; after Guide choice `1`, opens a Sol
  Producer and separate Terra Reviewer.
- **Does not:** install dependencies, use GitHub, modify the Koda-C worktree, or
  preselect review verdicts.

### `koda init [directory]`

Initializes only the headless gate files for a project.

- **Writes:** `koda.config.json` and the configured sessions directory.
- **Next:** create a non-empty session prompt and use `koda session new`.
- **Does not:** create project-specific skills, Guide continuity, Git history, or
  model contexts.

### `koda init [directory] --demo`

Creates the one-minute mechanical refusal fixture.

- **Writes:** configuration, one session, a Brief artifact, and an approving
  review whose receipt is deliberately absent from the ledger.
- **Does not:** launch a model or terminal window.

### `koda guide open [staffing options]`

Opens the persistent owner-facing project Guide.

```text
--model <model> --effort <effort>
--producer-model <model> --producer-effort <effort>
--reviewer-model <model> --reviewer-effort <effort>
```

- **Reads:** bounded Guide continuity and exact controller-supplied status.
- **Writes:** Guide conversation evidence and only Guide-claimed project files.
- **Numbered launch:** when exactly one pushed request is ready, choice `1` uses
  the supplied Producer/Reviewer staffing to open the two roles; choice `2`
  changes nothing.
- **Refuses:** partial staffing, duplicate Guide consoles, stale/corrupt state,
  unverified toolkit evidence, or ambiguous ready launches.

## Read-only truth

### `koda status [--session <session-id>]`

Re-derives the selected session's current phase and every gate condition from
disk. It does not trust cached conversational state and writes nothing.

### `koda guide status`

Re-derives project continuity, active sessions, ready launches, visible role
health, recoverable states, and toolkit readiness. It writes nothing.

### `koda guide verify`

Checks that the confirmed prompt, continuity snapshot, dependency evidence,
toolkit proof, commit, and upstream all still match. It writes nothing. Success
means the exact request is ready; it does not itself launch roles.

## Session creation and work ownership

### `koda session new <prompt-file> [relationship options]`

Opens a session from a non-empty prompt.

```text
--kind <kind>
--depends-on <session-id>
--independent
```

- **Writes:** the session prompt, `state.json`, approval ledger, and session
  structure.
- **Refuses:** an unfinished predecessor unless the owner explicitly classified
  a truly independent sibling, unresolved dependency evidence, or an active Guide
  launch whose prompt does not bind this session.

### `koda work claim <path> [path...] [--session <session-id>]`

Declares the exact project paths a session may change. This makes shared-worktree
mutation visible and allows close to prove those bytes were committed and pushed.

### `koda guide claim <path> [path...]`

Declares additional Guide-owned project paths. It refuses overlap with session
evidence. This is an advanced project-maintenance command, not an owner relay step.

## Review, acknowledgement, and movement

### `koda review new <phase> [--session <session-id>]`

Creates protected metadata and a unique receipt for a new review of the current
artifact bytes. The Reviewer writes the findings and verdict. Producer never runs
this command as a substitute for independent review.

### `koda approve <phase> [receipt] [--approver <name>] [--session <session-id>]`

Records attributable acknowledgement only when the complete receipt matches the
current review exactly. The managed Reviewer normally asks the owner for an
eight-character code and supplies the full receipt internally.

- **Writes:** one structured approval-ledger entry.
- **Does not:** advance the phase.
- **Refuses:** wrong, old, cross-phase, duplicated, malformed, or blocking-review
  receipts.

### `koda advance [--session <session-id>]`

Revalidates the complete chain from disk, then routes the current verdict.

- `APPROVE` or `APPROVE WITH COMMENTS`: activates the next configured phase.
- `REVISE` or `REJECT`: stays in the same phase for corrected work and a fresh
  review.
- `DISCUSS`: stays in phase for an owner ruling and fresh review.
- Any missing, empty, stale, corrupt, or mismatched condition: refuses and names
  that exact condition.

### `koda direction wait <owner-message-file> <classification-file> ...`

Records owner direction immediately while preserving frozen phase provenance.
The direction becomes Producer input only after the next successful gate and must
be cited by its receiving artifact. It never injects into the active phase.

## Stop, halt, and close

### `koda session halt [owner-direction-file] [--session <session-id>]`

Permanently voids the in-flight attempt. Halt is the only interrupt. Its immutable
artifact must be committed and pushed before a dependent successor can begin from
a fresh Brief.

### `koda session close [--session <session-id>]`

This command deliberately has two moments:

1. after every phase advances, it prepares immutable `close.md`;
2. after the bound files are committed and pushed, running it again verifies
   closure without rewriting the artifact.

Prepared, locally committed, unpushed, dirty, or changed evidence is not closed.

## Guide handover and runtime commands

These are normally invoked by Guide or the trusted controller, not copied by the
owner between windows.

### `koda guide confirm <prompt-file> --owner <name> ...`

Freezes the exact prompt, owner, session kind, relationship, dependencies,
continuity hashes, and toolkit proof into one immutable ready request.

### `koda guide cancel <launch-id> --owner <name> --reason <text>`

Immutably cancels a stale or unwanted unbound request. Cancellation must be
committed and pushed before another prompt is confirmed.

### `koda guide launch ... [--open ghostty]`

Revalidates the pushed request, snapshots role staffing, and prepares one runtime.
With the optional Ghostty adapter, Reviewer opens first and Producer opens only
after Reviewer readiness is proven.

### `koda guide recover --open ghostty`

Restores only the missing role or roles for the mechanically selected unchanged
session. It preserves context IDs, current review, receipt state, and phase. It
never blindly duplicates an already-running role.

### `koda guide bind <launch-id> <session-id>`

Binds the newly opened session to its exact confirmed launch if an interruption
occurred between session creation and automatic binding.

## Owner operating rule

The owner supplies intent and product decisions, not technical transport. During
a session, speak in Reviewer; between sessions, speak in Guide; watch Producer.
Do not carry commands, paths, hashes, commits, receipts, or evidence locations
between them. If Koda-C asks for that transport, treat it as a product defect.
