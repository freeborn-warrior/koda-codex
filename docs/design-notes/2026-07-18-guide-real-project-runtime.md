# Guide-launched real-project runtime

**Date:** 2026-07-18
**Status:** Deterministic two-process session backend proved; three-context live-model owner experience pending

## What changed

The Guide can now turn one pushed `READY_TO_LAUNCH` request into one real-project relay runtime:

```text
koda guide launch
  → .koda/runs/<launch-id>/RUN.json
  → visible Window B reviewer command
  → visible Window A producer command
  → confirmed prompt opens the Koda session
  → phase relay and immutable pushed close
  → docs/guide/runs/<launch-id>/
  → docs/guide/returns/<launch-id>.json
  → return commit and push
```

The command requires explicit producer and reviewer model/effort assignments. It does not yet implement per-phase staffing.

## Safety boundary

The earlier relay fixture deliberately nested and later removed a disposable fixture `.git` directory after creating a restorable bundle. That behavior is correct only for copied fixtures.

Real-project mode is explicitly separate:

- transient rendezvous state lives under ignored `.koda/runs/` inside the project;
- the project must be clean, on a pushed upstream, and actually ignore `.koda/` before preparation;
- the run path must resolve as one direct child of that project's `.koda/runs/` directory;
- producer, reviewer, and status share one path resolver and accept only this package's trusted CLI;
- produced session files and immutable close are committed and pushed normally;
- the real project's `.git` directory is never removed or replaced;
- selected runtime evidence and a machine-readable Guide return are copied to tracked `docs/guide/`, committed, and pushed after close.

The archive omits the machine-local CLI path. The ignored runtime remains available for local recovery and status.

## Recovery

`koda guide status` derives the active or most recent runtime directly from `.koda/runs/`. For an unfinished run it prints the exact Window B, Window A, and read-only detail commands. Corrupt or ambiguous runtime state refuses instead of falling back to launch prose.

Guide return uses a staged finalization state. If execution stops after staging but before tracked project mutation, `RUN.json` remains `FINALIZING_GUIDE_RETURN`. Resuming Window A rebuilds the deterministic staging snapshot, refuses changed or unrelated project files, commits only the named archive and return artifact, pushes, and then marks the runtime complete.

## Proof and honest limit

The deterministic integration test used two separate Node.js processes and distinct fake Codex thread identities. It exercised the real Koda CLI, confirmed Guide binding, artifact/review/receipt gate, Git remote, close ceremony, injected return-stage interruption, resume, tracked archive, return commit, push, and unchanged real `.git` repository. No gate, Git, or close check was stubbed.

No live model was called. The current backend prints two exact session-context commands; it does not yet arrange the ongoing Guide, Producer, and Reviewer as one three-context Ghostty/Codex experience. Kristian's live visible test remains required before claiming the full Guide-started owner experience.
