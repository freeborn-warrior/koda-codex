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

Core writes are limited to the directory given to `koda init` and the active
project's configured session folder:

- `init` creates `koda.config.json` and the sessions directory;
- `session new` creates one dated session, its copied prompt, ledger, and state;
- `review new`, `approve`, and `advance` write their named review, ledger, and
  state artifacts atomically;
- the first `session close` writes immutable `close.md`; the second only verifies
  disk and Git state.

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

`relay:*` and `reviewer:*` are competition/development harnesses, not quiet core
commands. They can launch Codex models, incur model usage, and—in the prepared
disposable relay project—commit and push to its nested test remote. The relay also
removes only its verified nested runtime `.git` and `.runtime` directories after
capturing a restorable bundle. Resolved-path checks now refuse a run project,
runtime, review, or CLI that escapes its prepared run folder or this checkout.
Owner-direction handbacks add the same containment rule inside the active session:
their root and phase directory must be real directories resolving beneath that
session, and every handback must be a regular file. A linked parent directory
cannot redirect even the initial atomic write.

Run those scripts only against a run folder created by the matching preparation
command in a trusted checkout. Do not execute a modified `RUN.json` received from
someone else. Codex subprocesses inherit the launcher's environment because they
must inherit Codex authentication; do not launch the harness from a shell holding
unrelated secrets. The core `koda` CLI itself never launches a model.

Git commit and push may execute hooks already configured in a repository. That is
normal Git behavior, but it is why the core prints those commands instead of
silently running them. Inspect unfamiliar repository hooks and remotes first.

## Concurrency and recovery

Atomic file replacement prevents partial JSON or ledger writes, and run-folder
preparation now uses an atomic create so competing preparations refuse instead of
sharing a folder. There is not yet a project-wide mutation lock. Do not run two
core mutation commands simultaneously; the current relay supervisor serializes
them. A mature two-window interface must add recoverable mutation serialization
before claiming safe concurrent operation.

Ctrl-C may leave a prepared or paused relay, but its status and thread IDs remain
on disk for the documented resume path. Never delete or recreate a paused run to
make its state look cleaner.

## Current audit result

The dated local audit checks package lifecycle metadata, dependency absence,
tracked symbolic links, common committed credential signatures, destructive
call sites, real package contents, and all 93 functional/security checks.
The result and limitations live in
[`security-runs/2026-07-18-local-audit-01/RESULT.md`](security-runs/2026-07-18-local-audit-01/RESULT.md).
Later evidence classes retain their own adversarial checks in the current full
suite; the latest named transcript is linked from the README.
