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
- `guide status` and `guide confirm` first validate the installed toolkit
  integrity manifest, its hashed post-push transcript, the transcript's PASS/base
  commit/test totals, and every named critical regular file. New launch requests
  freeze that toolkit snapshot; `guide verify` refuses changed proof as stale;
- `guide launch` writes only ignored `.koda/runs/<launch-id>/` rendezvous state
  after verifying pushed confirmation evidence, an empty shared Git index, and
  one exact confirmed request. The runtime binds the confirming owner's display
  name for status and approval records; empty, overlong, or terminal-control-
  character names refuse. Unrelated unstaged claimed work may remain.
- explicit `guide launch ... --open ghostty` additionally invokes macOS
  `/usr/bin/open` twice to request labeled Reviewer then Producer windows. Each
  request gives Ghostty exactly one absolute, project-contained, mode-700 launcher
  token. The absolute form is required because Ghostty's macOS login wrapper changes
  directory before executing it; loose role-command arguments are never passed
  through `open --args`.

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

The toolkit integrity manifest has the same boundary. It catches accidental,
partial, stale, empty, linked, or inconsistent installation changes and prevents
the owner from acting as an evidence courier. It is not a signed release or a
defense against a same-user attacker who replaces the verifier, manifest, critical
files, and evidence together. The packaged runtime may not contain `.git`, so its
tested-commit field is checked against the hashed transcript rather than resolved
through a local Git object database.

The receipt proves that the unique review phrase entered the decision record. It
does not prove comprehension. The receipt is evidence, not a secret. The managed
Reviewer prints the human-facing review inline, omits protected machine metadata,
and displays a deterministic eight-character code beneath it. The owner types that
code; the trusted controller compares it with the current review, rechecks that the
review did not change, and passes the current complete receipt plus any comments or
ruling to the deterministic CLI over stdin. The system clipboard and external pager
are not used. The acknowledgement does not enter model chat, child-process
arguments, production environment variables, or durable event logs. Anyone able to
rewrite the same-user controller could bypass this ceremony, just as they could
rewrite the core verifier; the code is a usability token, not authentication or a
cryptographic signature.

Inline terminal display creates a separate untrusted-output boundary. Before any
managed Guide, Reviewer, or Producer panel reaches the terminal, Koda removes C0
and C1 controls other than line breaks and tabs, plus Unicode bidirectional
override/isolate characters. A review containing escape, bell, or bidirectional
control bytes therefore cannot rename a window, conceal or reorder visible text,
or execute terminal control sequences through the managed renderer. Sanitization
is display-only: the original review remains byte-for-byte intact on disk, its hash
and receipt binding do not change, and the core gate continues to validate those
original bytes. This does not make arbitrary terminal emulators or model output
outside Koda's managed renderer safe.

`SKILL.md` narrows role behavior but is not a permission boundary. Markdown,
source files, and prompts can contain prompt-injection instructions. Use Codex's
sandbox and approval controls, keep credentials out of project files, and treat
model-written findings as untrusted until the mechanical gate and human decision
loop complete.

## Codex role containment

Koda-launched Producer and Reviewer turns now use a named Codex permission
profile instead of the legacy `workspace-write` preset. Model-generated commands
may read and write the active project, but `.git`, `.agents`, and `.codex` remain
read-only and project `.env` files are denied. Ordinary home files and sibling
projects are not readable. Network and web search are disabled, login shells are
disabled, user configuration is ignored, approval is `never`, and strict config
makes an older Codex client refuse rather than silently discard the profile.

The allowlist also contains the exact installed Codex executable, the compiled
Koda runtime and its one package manifest, the exact verified toolkit manifest
and bound test evidence, and the current Node and Git toolchain roots.
On the tested Homebrew macOS installation that toolchain root is `/opt/homebrew`,
read-only. Those are execution dependencies, not project workspaces; Koda grants
no write access to them. The permission-profile mechanism is currently marked
beta by OpenAI, so the release must keep a real boundary probe alongside the
deterministic argument tests and must never fall back silently to broad-read
`workspace-write`.

A live ephemeral Sol/low probe proved project write, sibling/parent read denial,
`.git` write denial, project `.env` read denial, and trusted Koda CLI execution.
A no-model network mutation failed DNS resolution under the same profile. A
planted required project-local MCP server did not load when the role used
`--ignore-user-config`. The failed intermediate probes are preserved too: the
first strict profile omitted Koda's package manifest and Codex executable; the
second still omitted the Homebrew toolchain and could not execute Koda. See the
[dated boundary result](security-runs/2026-07-19-project-boundary-probe-13/RESULT.md).

`koda guide open` applies a separate named profile to the persistent Guide. The
Guide reads the project but may write only the configured `docs/guide` directory,
manifest continuity files, and explicit Guide claims. Active session folders,
`.git`, `.agents`, and `.codex` remain read-only; `.env`, ordinary sibling/home
files, network, web search, login shells, user config, ambient command rules, and
approval escape are denied. Koda's controller—not the Guide model—writes ignored
`.koda/guide` identity/event state and performs an exact eligible numeric recovery.
The controller refuses a duplicate Guide and refuses to guess when several
sessions are recoverable.

The Guide's trusted Koda CLI must revalidate toolkit integrity. Its profile grants
only the exact manifest, bound test transcript, and critical files returned by a
successful controller-side verification—not the whole Koda-C development checkout.
Model-child Git reads use repository-local `.git/config` while global/system config,
terminal credential prompting, and optional locks are disabled. Koda resolves the
native Git executable before entering the sandbox so macOS's xcrun shim cannot
probe blocked developer caches. Each role receives a private `<run>/.xdg`
configuration directory; Guide-return archival omits it only when it is a real,
empty directory. Trusted relay
commit/push processes use a different environment and retain the repository's
normal configured Git behavior.

A persistent live Sol/low probe proved Guide-owned write, active-session write
denial, parent read denial despite a planted `allow` command rule, project `.env`
read denial, Git write denial, network denial, trusted Koda execution, and same-ID
resume. An end-to-end console run used the local skill, revalidated toolkit status,
reached `guide>`, and closed without opening either session role. See the
[dated Guide boundary result](security-runs/2026-07-19-secure-guide-console-boundary-14/RESULT.md).

A manually started raw interactive Codex task remains governed by its own launch
permissions and is not the managed Koda Guide entry. Codex itself still uses its
home directory for authentication and persistent thread storage; those client-
internal reads and writes sit outside the model command sandbox. Koda binds the
context ID and turn evidence inside the project but does not claim that Codex
stores nothing elsewhere.

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
`RUN.json` received from someone else. Guide-launched role files immediately
clear ambient state with `/usr/bin/env -i`; Codex subprocesses independently
receive an allowlist containing safe terminal identity, a fixed executable path,
their bound session ID, and `HOME` so Codex can find its own authentication.
Ambient API credentials, parent context IDs, arbitrary project variables, and
Node startup options are excluded. Do not reintroduce blanket environment
inheritance to support a custom provider; add and review the smallest explicit
capability instead. Their command sandbox then applies the project-scoped profile
above. Without the explicit Ghostty option, the core `koda` CLI does not launch a
model.

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

The Ghostty adapter is deliberately opt-in and is not required by the gate or
relay. Without `--open ghostty`, Guide prepares the same bound runtime and prints
the exact Reviewer-first and Producer-second terminal commands for manually opened
windows. Automatic Ghostty opening records launch intent before the
first GUI request and refuses automatic opening for an existing runtime, even if
only one prior request appeared to succeed. The first live implementation proved
that a mocked argument vector was insufficient: loose tokens created extra tabs
and an ambient credential was rendered. The repaired adapter passes one private
launcher path after `-e`. That file uses fixed shell quoting and an explicit clean
environment before starting the exact role command. Locale, terminal, color, and
executable-search path values are deterministic rather than inherited from whichever
surface opens Guide. An older launcher is replaced only after strict full-structure parsing proves
its exact project, executables, script, arguments, quoting, and allowlisted
environment order; both roles are inspected first, replacement is atomic, and the
old/new hashes are recorded. Changed, linked, arbitrary, or replaced launchers still
refuse during request construction. A failed request leaves the runtime
prepared and returns the owner to Guide, which derives the safe numbered recovery
choice without asking the owner to reconstruct a role command. Same-user replacement
between the final content check and external execution remains a local TOCTOU
boundary, not hostile-writer isolation.

Visible recovery remains narrower than general process restart. It accepts the exact
legacy empty-receipt failure or any stable formal, repair, or fresh
`AWAITING_OWNER` handover. The Reviewer job's full schema is checked; recovery binds
its ID, kind, phase, and expected path beside the current verified toolkit. Changed,
missing, linked, corrupt, unsafe, or unrelated job evidence refuses. Live role locks
derive the missing set: Reviewer opens first when absent, and Producer opens only
after Reviewer reaches the same owner decision. Exact Koda window/readiness failures
remain retryable, successful attempts append to the recovery history, and a live role
is never deliberately duplicated. Recovery cannot record a receipt or advance a gate.
New role ownership is published as complete mode-600 JSON through a same-filesystem
no-clobber hard link, so status cannot observe a public lock name before its owner
bytes exist. Readers retain strict support for the earlier directory-plus-owner shape
held by an already-running window; links, non-files, malformed owners, live duplicates,
and changed stale locks refuse.

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
The first live-launch incident is preserved without its credential or receipt in
[`security-runs/2026-07-19-ghostty-launch-integrity-incident/RESULT.md`](security-runs/2026-07-19-ghostty-launch-integrity-incident/RESULT.md),
and the whole-product repair delta is audited in
[`security-runs/2026-07-19-ghostty-repair-audit-05/RESULT.md`](security-runs/2026-07-19-ghostty-repair-audit-05/RESULT.md).
The Guide/toolkit handover delta and its remaining local-trust boundary are
audited in
[`security-runs/2026-07-19-guide-toolkit-binding-audit-06/RESULT.md`](security-runs/2026-07-19-guide-toolkit-binding-audit-06/RESULT.md).
The numbered owner ceremony, stdin-only receipt transport, and exact visible recovery
are audited in
[`security-runs/2026-07-19-owner-ceremony-recovery-audit-07/RESULT.md`](security-runs/2026-07-19-owner-ceremony-recovery-audit-07/RESULT.md).
The current stable-handover and optional-adapter boundary is audited in
[`security-runs/2026-07-19-stable-handover-recovery-audit-12/RESULT.md`](security-runs/2026-07-19-stable-handover-recovery-audit-12/RESULT.md).
The stricter Codex filesystem, toolchain, network, and project-config boundary is
proved in
[`security-runs/2026-07-19-project-boundary-probe-13/RESULT.md`](security-runs/2026-07-19-project-boundary-probe-13/RESULT.md).
The managed persistent Guide's narrower claimed-write boundary and real same-context
resume are proved in
[`security-runs/2026-07-19-secure-guide-console-boundary-14/RESULT.md`](security-runs/2026-07-19-secure-guide-console-boundary-14/RESULT.md).
The live terminal-context launcher mismatch and its fail-closed migration contract
are preserved in
[`verification-runs/2026-07-19-markdown-headings-01/LAUNCHER-CONTEXT-MISMATCH-INCIDENT.md`](verification-runs/2026-07-19-markdown-headings-01/LAUNCHER-CONTEXT-MISMATCH-INCIDENT.md).
The final public-clone, package-lifecycle, no-build demo, current role-boundary,
and zero-vulnerability delta is recorded in
[`security-runs/2026-07-19-submission-readiness-audit-15/RESULT.md`](security-runs/2026-07-19-submission-readiness-audit-15/RESULT.md).
The inline review-code ceremony, shared three-window renderer, terminal-control
mutation, package contents, and zero-vulnerability delta are recorded in
[`security-runs/2026-07-20-owner-review-ceremony-audit-16/RESULT.md`](security-runs/2026-07-20-owner-review-ceremony-audit-16/RESULT.md).
The exact restricted first-session composition, native-Git/XDG containment, and
empty-scratch archive mutation are recorded in
[`security-runs/2026-07-20-integrated-role-preflight-audit-24/RESULT.md`](security-runs/2026-07-20-integrated-role-preflight-audit-24/RESULT.md).
The latest named full-suite transcript is linked from the README.
