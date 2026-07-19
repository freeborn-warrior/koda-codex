# Koda-C safety and threat boundaries

Koda-C's core CLI is intentionally small: dependency-free JavaScript on Node.js
22.18 or newer, no install or post-install hooks, no daemon, no database, and no
network call. It reads Git state during close and halt, but it does not commit or push.
The close and halt commands print the exact Git commands for the repository owner to run.

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
- `direction wait` writes one bound regular-file direction record under the
  active session; advancement is the only operation that releases its ID;
- `work claim` writes the selected session's exact external output claims before
  mutation; `guide claim` reserves additional Guide paths outside its manifest;
- the first `session halt` writes immutable `halt.md`; its printed Git steps
  must run before the second invocation can verify terminal halt;
- the first `session close` writes immutable `close.md`; the second only verifies
  disk and Git state.
- `guide confirm`, `cancel`, and `bind` write their named durable evidence;
- `guide launch` writes only ignored `.koda/runs/<launch-id>/` rendezvous state
  after verifying pushed confirmation evidence, an empty shared Git index, and
  one exact confirmed request. Unrelated unstaged claimed work may remain.
- explicit `guide launch ... --open ghostty` additionally invokes macOS
  `/usr/bin/open` twice with argument arrays to request labeled Reviewer then
  Producer windows. It does not build or evaluate a shell command string.

Koda refuses a configured sessions directory that resolves outside the project.
Session state must retain valid configured phase names. Artifacts, reviews,
ledgers, state, directions, halt/close evidence, and all other bound files must be
ordinary files inside the session; symbolic links and special files refuse.

Close now checks both halves of the promise: every session file is in the digest,
and every one is tracked by Git. An ignored file cannot create a locally complete
but remotely incomplete session. The session must also be clean and committed on
a branch with an upstream, and its exact session tree plus every claimed external
output must match that upstream. Unrelated sibling commits may be locally ahead
without falsifying this session's pushed evidence.

## What Koda protects against

- accidental advancement without an artifact, review, allowed verdict, exact
  receipt acknowledgement, or intact earlier gate;
- stale review after the reviewed artifact changes;
- editing the review after its receipt was acknowledged;
- reused receipts, malformed or duplicate generated markers, corrupted ledger or
  state, path-like phase names, linked evidence, and ignored close evidence;
- using waiting direction before its gate release or omitting a released
  direction from the receiving artifact;
- starting another session before the prior immutable close or explicit halt is
  committed and represented in the local upstream-tracking history.

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
refuses. Waiting-direction evidence has the same containment rule inside the active
session: its root must be a real directory resolving beneath that session, and
every numbered direction must be a regular file. A linked parent directory cannot
redirect even the initial atomic write.

The persistent Reviewer accepts owner conversation between formal handoffs.
Ordinary explanation remains read-only, while a `WAIT FOR GATE` classification
causes the trusted runtime to write the exact owner words and model classification
as waiting evidence. Classification does not steer Producer: the current phase
entry remains frozen and only advancement releases direction. Explicit `h` is a
separate owner action that makes the Reviewer runtime prepare, session-stage,
commit, push, and verify `halt.md`; it refuses unrelated pre-staged changes. The
historical same-phase owner-handback route was removed.

Run those scripts only against a run folder created by `relay:prepare` or a
pushed `koda guide launch` in a trusted project. Do not execute a modified
`RUN.json` received from someone else. Codex subprocesses inherit the launcher's environment because they
must inherit Codex authentication; do not launch the harness from a shell holding
unrelated secrets. Without the explicit Ghostty option, the core `koda` CLI
does not launch a model. With it, Koda asks Ghostty to run the same documented
role commands that would otherwise be started manually.

Git commit and push may execute hooks already configured in a repository. The
core close and halt commands only print Git instructions; the explicitly started relay
supervisor and explicit Reviewer halt ceremony execute their documented commits and pushes. Inspect unfamiliar
repository hooks and remotes before starting a real-project relay.

The real-project relay no longer uses `git add -A`. Before mutation, Produce must
declare external paths with `koda work claim`; Guide may reserve new paths with
`koda guide claim`, while its manifest continuity files are implicitly reserved.
Active Guide/session and session/session overlap refuses by name. Each session
claim records the clean before hash and the post-work hash. The relay rechecks the
post-work hash under the Git-operation lock, stages only current session files and
claimed external paths, verifies the staged name set, commits, and pushes. Guide
return uses the same lock and exact-path staging. Unrelated claimed, unstaged, or
untracked work remains excluded and does not falsify session close.

This is provenance discipline, not operating-system isolation. A process running
as the same user can ignore Koda and edit a claimed file. Mutation after the
Producer's recorded handoff is caught by the post-work hash; mutation during the
model turn may be observed as that turn's output because the filesystem does not
identify the author. Manual Git commands and third-party tools also do not honor
Koda's lock. Stronger hostile-writer isolation would require separate worktrees,
OS identities, or a service boundary.

The Ghostty adapter is deliberately opt-in. It records launch intent before the
first GUI request and refuses automatic opening for an existing runtime, even if
only one prior request appeared to succeed. It passes only the current `PATH` and
the resolved Codex executable location explicitly to the role command; it never
serializes arbitrary environment variables into a shell line. A failed request
leaves the runtime prepared and names `koda guide status` as manual recovery.

## Concurrency and recovery

Atomic file replacement prevents partial JSON or ledger writes. Session-directory
allocation and run-folder preparation use atomic creates, so simultaneous starts
receive distinct identities and competing preparation cannot share a folder.
Runtime discovery enumerates exact launch IDs; generic selection refuses when
several unfinished runs would make the target ambiguous. A real four-process test
drives two independent Producer/Reviewer pairs through separate receipts, pushed
closes, and Guide returns in one project.

`.koda/git-operation.lock/LOCK.json` serializes only relay-owned stage/commit/push
ceremonies. Live relay callers wait for a bounded 30 seconds so a sibling's short
Git operation can finish; other callers refuse immediately by default. A dead
owner is recovered automatically only when the shared index is empty; staged
crash residue refuses rather than guessing which operation owns it. Ordinary
non-conflicting file work continues outside the lock. Core mutation commands
still rely on atomic files rather than one global transaction, so callers must
not concurrently mutate the same session evidence.

Lock contention treats disappearance during inspection as a normal cooperative
release and retries; a present linked, non-directory, corrupt, or staged stale
lock still refuses. Guide owns its configured `runs/` and `returns/` namespaces
before runtime evidence is written, so another active session cannot mistake a
legitimate concurrent Guide archive for unclaimed project mutation. Exact
staging remains narrowed to the selected launch's archive and return paths.

Ctrl-C during a model turn terminates the direct Codex child, force-stops that
child after two seconds if soft termination is ignored, preserves partial event
and stderr evidence, and binds the interruption to its observed context ID. Any
possible handback stays untrusted until that same context completes a
skill-backed reconciliation. Reviewer jobs return to `PENDING`; missing context
identity refuses automatic replacement. The direct-child signal is not a
platform process-tree sandbox, so service-grade orphan cleanup remains a future
runtime concern. `FINALIZING_GUIDE_RETURN` stages ignored
evidence before tracked mutation and resumes only when staged bytes still match
and the bound pushed close remains an ancestor of current history. Unrelated dirty
work may remain; exact return staging excludes it. Linked runtime records refuse as unsafe
state. Never delete or recreate a paused run to make its state
look cleaner.

## Current audit result

The dated local audits check package lifecycle metadata, dependency absence,
tracked symbolic links, common committed credential signatures, destructive
call sites, real package contents, and the then-current functional/security suite.
The latest whole-product result and the earlier hardening baseline live in
[`security-runs/2026-07-19-whole-product-audit-02/RESULT.md`](security-runs/2026-07-19-whole-product-audit-02/RESULT.md)
and [`security-runs/2026-07-18-local-audit-01/RESULT.md`](security-runs/2026-07-18-local-audit-01/RESULT.md).
Later evidence classes retain their own adversarial checks in the current full
suite. The exact concurrent-write audit, including independent immutable-close
verification of claimed external outputs, lives in
[`security-runs/2026-07-19-concurrent-mutation-audit-03/RESULT.md`](security-runs/2026-07-19-concurrent-mutation-audit-03/RESULT.md);
the plural-runtime follow-up lives in
[`security-runs/2026-07-19-plural-runtime-audit-04/RESULT.md`](security-runs/2026-07-19-plural-runtime-audit-04/RESULT.md).
The latest named full-suite transcript is linked from the README.
