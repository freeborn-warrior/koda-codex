# Koda-C safety and threat boundaries

Koda-C's core CLI is intentionally small: dependency-free JavaScript on Node.js
22.18 or newer, no install or post-install hooks, no daemon, no database, and no
network call. It reads Git state during close, but it does not commit or push.
The close command prints the exact Git commands for the repository owner to run.

This document distinguishes that core from the model-testing relay scripts that
also ship in the competition repository.

## What installation and core commands do

`npx --yes . --help` in a source checkout invokes npm's `prepack` step. Koda's
build script deletes and recreates only the checkout's own validated `dist/`
directory, then makes the CLI binary executable. The public-checkout proof shows
that the final tracked and untracked state remains clean. A packed installation
has no `preinstall`, `install`, or `postinstall` script and no runtime dependency.

Core writes are limited to the directory given to `koda init`, the active
project's configured session folder, Guide evidence under the configured docs
parent, and ignored project-local runtime under `.koda/`:

- `init` creates `koda.config.json` and the sessions directory;
- `session new` creates one dated session, its copied prompt, ledger, and state;
- `review new`, `approve`, and `advance` write their named review, ledger, and
  state artifacts atomically;
- the first `session close` writes immutable `close.md`; the second only verifies
  disk and Git state.
- `guide confirm`, `cancel`, and `bind` write their named durable evidence;
- `guide launch` writes only ignored `.koda/runs/<launch-id>/` rendezvous state
  after verifying a clean pushed project and one exact confirmed request.
- explicit `guide launch ... --open ghostty` additionally invokes macOS
  `/usr/bin/open` twice with argument arrays to request labeled Reviewer then
  Producer windows. It does not build or evaluate a shell command string.

Koda refuses a configured sessions directory that resolves outside the project.
Session state must retain valid configured phase names. Artifacts, reviews,
ledgers, state, close evidence, and all other files bound into close must be
ordinary files inside the session; symbolic links and special files refuse.

Close now checks both halves of the promise: every session file is in the digest,
and every one is tracked by Git. An ignored file cannot create a locally complete
but remotely incomplete session. The session must also be clean, committed, on a
named branch with an upstream, and zero commits ahead of that upstream.

## What Koda protects against

- accidental advancement without an artifact, review, allowed verdict, exact
  receipt acknowledgement, or intact earlier gate;
- stale review after the reviewed artifact changes;
- editing the review after its receipt was acknowledged;
- reused receipts, malformed or duplicate generated markers, corrupted ledger or
  state, path-like phase names, linked evidence, and ignored close evidence;
- starting another session before the prior immutable close is committed and
  represented in the local upstream-tracking history.

All of those conditions are re-derived from disk. They are covered by deliberate
mutation tests rather than trusted cached status.

## What Koda does not prove

The hashes are integrity bindings, not signatures. Anyone who can rewrite the
repository as the same operating-system user can fabricate a new internally
consistent artifact, review, ledger, state, and Git history. Koda does not
authenticate a human identity or defend against a malicious repository owner.

The receipt proves that the unique review phrase entered the decision record. It
does not prove comprehension. The receipt is evidence, not a secret; the macOS
reader copies it to the system clipboard, where other local applications may be
able to observe it.

`SKILL.md` narrows role behavior but is not a permission boundary. Markdown,
source files, and prompts can contain prompt-injection instructions. Use Codex's
sandbox and approval controls, keep credentials out of project files, and treat
model-written findings as untrusted until the mechanical gate and human decision
loop complete.

## Relay and test-harness boundary

The relay scripts are not quiet core commands. They can launch Codex models,
incur model usage, commit, and push. In `fixture-copy` mode they operate on the
prepared disposable project and remove only that verified nested `.git` and
`.runtime` after capturing a restorable bundle. In `guide-project` mode they
operate on the actual project: they commit and push produced output, immutable
close, the tracked runtime archive, and the machine-readable Guide return. That
mode never removes or replaces the project's `.git` directory.

Producer, reviewer, and status use one resolved-path implementation. Fixture
paths must remain inside the prepared run. A real-project run must be one direct
child of that project's ignored `.koda/runs/`, resolve back to that exact project,
and use the trusted CLI shipped by the same Koda-C package. Archive and return
parents must be real contained directories; linked or changed recovery evidence
refuses. Owner-direction handbacks add the same containment rule inside the active session:
their root and phase directory must be real directories resolving beneath that
session, and every handback must be a regular file. A linked parent directory
cannot redirect even the initial atomic write.

Run those scripts only against a run folder created by `relay:prepare` or a
pushed `koda guide launch` in a trusted project. Do not execute a modified
`RUN.json` received from someone else. Codex subprocesses inherit the launcher's environment because they
must inherit Codex authentication; do not launch the harness from a shell holding
unrelated secrets. Without the explicit Ghostty option, the core `koda` CLI
does not launch a model. With it, Koda asks Ghostty to run the same documented
role commands that would otherwise be started manually.

Git commit and push may execute hooks already configured in a repository. The
core close command only prints Git instructions; the explicitly started relay
supervisor executes its documented commits and pushes. Inspect unfamiliar
repository hooks and remotes before starting a real-project relay.

The Ghostty adapter is deliberately opt-in. It records launch intent before the
first GUI request and refuses automatic opening for an existing runtime, even if
only one prior request appeared to succeed. It passes only the current `PATH` and
the resolved Codex executable location explicitly to the role command; it never
serializes arbitrary environment variables into a shell line. A failed request
leaves the runtime prepared and names `koda guide status` as manual recovery.

## Concurrency and recovery

Atomic file replacement prevents partial JSON or ledger writes, and run-folder
preparation now uses an atomic create so competing preparations refuse instead of
sharing a folder. There is not yet a project-wide mutation lock. Do not run two
core mutation commands simultaneously; the current relay supervisor serializes
them. A mature two-window interface must add recoverable mutation serialization
before claiming safe concurrent operation.

Ctrl-C may leave a prepared or paused relay, but its status and thread IDs remain
on disk for the documented resume path. `FINALIZING_GUIDE_RETURN` stages ignored
evidence before tracked mutation and resumes only when tracked bytes and unrelated
project state still match. It also binds the exact pushed close commit and refuses
if project history moves before recovery. Linked runtime records refuse as unsafe
state. Never delete or recreate a paused run to make its state
look cleaner.

## Current audit result

The dated local audit checks package lifecycle metadata, dependency absence,
tracked symbolic links, common committed credential signatures, destructive
call sites, real package contents, and the then-current functional/security suite.
The result and limitations live in
[`security-runs/2026-07-18-local-audit-01/RESULT.md`](security-runs/2026-07-18-local-audit-01/RESULT.md).
Later evidence classes retain their own adversarial checks in the current full
suite; the latest named transcript is linked from the README.
