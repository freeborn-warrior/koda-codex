# Guide continuity protocol

Koda-C's Guide is the project-level context above its bounded sessions. It can accompany a project through session 1, session 27, session 44, and beyond because its authoritative memory is a small set of steering files plus cited session evidence—not an indefinitely growing chat transcript.

## Project shape

For the default `sessionsDir` of `docs/sessions`, Guide evidence lives under `docs/guide/`:

```text
docs/
  PROJECT.md                 evolving purpose and product truth
  BACKLOG.md                 visible work and evidence state
  WORKING-PLAN.md            current direction and near-term sequence
  guide/
    project.json             index of this project's steering files
    prompts/                 bounded session-prompt drafts
    launches/                immutable owner-confirmed launch requests
    cancellations/           immutable owner cancellation of stale requests
    runs/                     pushed normal-close runtime archives returned to Guide
    returns/                  machine-readable closed-session handbacks to Guide
  sessions/                  bounded gated work episodes
    <session-id>/
      guide-launch.json      launch request → opened session identity
.koda/
  runs/<launch-id>/          ignored local rendezvous and recovery state
```

`project.json` is an index, not a cached status report:

```json
{
  "version": 1,
  "project": "Example project",
  "continuityFiles": [
    "docs/PROJECT.md",
    "docs/BACKLOG.md",
    "docs/WORKING-PLAN.md"
  ]
}
```

Projects may use different steering documents. The list is project-specific, must use regular repository-contained files, and must never point outside the project. Session order and state are always re-derived from `sessionsDir`.

## The continuity cycle

1. A Koda session reaches one pushed terminal state: normal immutable close after every phase, or explicit immutable halt while one phase is in flight.
2. Control returns to the Guide. After close, Guide reads the prompt, Summary or final artifact, material review evidence, and `close.md`. After halt, it reads the prompt, `halt.md`, state, and waiting directions; partial phase work never counts as approved.
3. The Guide reconciles the project document, backlog, working plan, decisions, risks, and any other configured steering files. A checked backlog item requires cited disk evidence.
4. Between sessions, Kristian and the Guide may explore or change direction. Settled changes move into the steering files; conversation alone is not truth.
5. Explicit `$koda-c-session-prompt` use is the only owner-facing route toward a future session. It first runs `koda guide status`. If a session or prepared runtime is in flight, it names `NEXT SESSION BLOCKED` and creates no draft; Guide may discuss or preserve the idea, but cannot open a conceptual parallel lane.
6. Kristian explicitly confirms the exact draft. `koda guide confirm` writes one immutable `READY_TO_LAUNCH` request that hashes the prompt, manifest, steering files, prior pushed close or halt, and prior carry-forward evidence. After halt, confirmation refuses unless the prompt cites the halt ID and every waiting direction ID. A stale request is never edited or deleted: `koda guide cancel` records the owner's reason, and that cancellation must be committed and pushed before another prompt can be confirmed.
7. The Guide handover is committed and pushed. `koda guide verify` refuses if any bound input changed, if Git evidence is missing, or if state is ambiguous.
8. `koda guide launch` revalidates the pushed handover, a clean pushed project, and ignored `.koda/` runtime before binding explicit producer/reviewer assignments into exactly one runtime. It prints the exact Window B reviewer, Window A producer, and read-only status commands. Explicit `--open ghostty` on macOS records one terminal-launch request, asks Ghostty for labeled Reviewer then Producer windows without a shell command string, and refuses to repeat automatic opening for an existing runtime. `koda-c-session` consumes only the confirmed prompt and records `guide-launch.json` inside the new session, so immutable close and Git bind the launch identity with the session it opened. If interruption occurs after session creation but before that write, `koda guide bind <launch-id> <session-id>` performs the same hash-checked recovery.
9. During the active session, Guide remains an ongoing project-level conversation and Reviewer remains the conversation about that bounded session. Producer stays visible with owner input closed. Direction from either owner-facing context is recorded immediately but waits outside the active phase contract until advancement. Explicit halt is the only interrupt. `koda guide status` re-derives the active runtime and safe resume commands from `.koda/runs/`; it never guesses from chat state.
10. After normal immutable pushed close, the supervisor stages selected runtime evidence, writes `docs/guide/returns/<launch-id>.json`, archives the transcript under `docs/guide/runs/<launch-id>/`, commits and pushes only those named files, then marks local runtime complete. After pushed halt, the runtime is terminal without claiming normal completion; Guide reconciles the halt directly from session evidence before confirming a fresh Brief. An interruption before normal return commit resumes from `FINALIZING_GUIDE_RETURN` and refuses changed or unrelated project files.

This makes Guide reconciliation after close different from launch confirmation. Project files are expected to evolve between sessions. Confirmation freezes only the exact snapshot authorized for one launch; a later edit requires fresh confirmation.

## What is and is not proved

The hashes prove which file bytes were confirmed and whether they remained unchanged through launch. Git proves that the handover entered dated, pushed project history. Neither proves cognitive understanding, the truth of a claim, or that the named confirmer was cryptographically authenticated. The review and owner relay raise the floor against passive omission; they do not pretend to read minds.

## Failure behavior

The Guide path fails closed and names the condition when:

- a steering file, manifest, prompt, required prior Summary, close/halt artifact, or waiting direction is absent, empty, linked, outside the repository, corrupt, or stale;
- the previous session is active, merely prepared, uncommitted, or unpushed;
- zero or multiple requests claim to be ready;
- the prompt, manifest, project steering snapshot, or prior-session evidence changes after confirmation;
- the handover files are not committed and pushed;
- an opened session does not contain the exact confirmed prompt.
- `.koda/` is not ignored, the project is dirty or ahead of upstream, another runtime is unfinished, or runtime state is corrupt or ambiguous;
- automatic Ghostty opening is requested for an existing runtime, the Codex executable is unavailable, the platform is unsupported, or either window request fails;
- a real-project runtime path does not resolve to its containing `.koda/runs/` project, or the trusted CLI changes;
- Guide return recovery encounters changed archive bytes, unexpected evidence, unrelated project changes, or unsafe linked directories.

The test suite evolves with this contract. Every new deterministic refusal condition receives a one-condition mutation test and named reason. Existing tests stay unless an explicit owner ruling changes the product contract; a test is never weakened merely to make a new implementation pass.
