# Concurrent project work and Git provenance — owner ruling

**Date:** 2026-07-19  
**Status:** Owner-set product model; write-set, Git-lock, and plural runtime mechanics implemented and mutation-tested; owner-observed multi-runtime use pending

## Owner ruling

An active Produce session does not own the whole project's working tree. Kristian
must be able to keep a separate Guide conversation open during Produce and may,
with Guide, add or remove backlog items or change the product and working plans
when those changes do not alter the active session's frozen contract. Other
project work may also change files while Produce continues.

Therefore the whole-project exclusive mutation lease proposed during the security
audit is rejected. Koda must not solve provenance by making the rest of the
project read-only for the lifetime of a session.

## Required invariant

Concurrent project work is allowed; ambiguous authorship is not.

- Every bounded workstream has a durable identity and frozen entry snapshot.
- Every workstream owns an exact declared write set: added, modified, renamed,
  and deleted paths, with before/after hashes where applicable.
- Pre-close Git staging names only that workstream's validated paths. `git add -A`
  is forbidden for an attributable session commit.
- Unrelated dirty files may exist and must neither enter nor falsely block that
  session's commit.
- Two workstreams claiming the same path create a named conflict and stop for an
  integration decision; Koda never guesses which bytes belong to whom.
- Git index/commit/push operations use one short recoverable repository lock.
  The lock serializes the Git ceremony, not thinking, conversation, or ordinary
  non-conflicting file work.
- The active Produce phase remains judged against its frozen entry. A Guide edit
  does not become Producer input merely because it exists in the same project.

The likely implementation combines an exact session write-set manifest with
compare-before-stage checks and a recoverable Git-operation journal. A later
worktree/branch adapter may provide stronger isolation for several long-running
writers without changing the file-and-gate contract.

## Project and session model

Kristian clarified that Produce is one **session kind**, not the project's one
global session. Explore, Research, Architecture, Triage, Produce, and later kinds
are sibling bounded sessions beneath one project-level Guide. Several formal Koda
sessions may be active concurrently when their declared dependencies and file
claims do not conflict. Each active session retains its own persistent Producer
and owner-facing Reviewer contexts, phase config, artifacts, receipts, directions,
and terminal close or halt.

This explicitly replaces the earlier global interpretation of "a new session
cannot start before the previous session closes." The preserved invariant is
dependency-scoped:

- a session whose contract depends on another session's result cannot start until
  that prerequisite has immutable pushed close or halt evidence;
- an independent sibling session may start while another remains active;
- a session's own successor cannot bypass its unresolved predecessor;
- Guide owns the project-level dependency graph and must refuse a proposed launch
  whose claimed independence is contradicted by its prompt or file claims.

The CLI, Guide confirmation, skills, and relay now implement explicit session
identity, kinds, terminal dependencies, aggregate session/runtime status, and
exact session/Guide write claims. Session claims bind before and post-work
SHA-256, overlapping active claims refuse, unclaimed mutation refuses, and the
relay stages only owned paths under a short recoverable Git-operation lock.
Several launch-ID runtimes may coexist, each with one persistent Producer and
Reviewer pair. Simultaneous session directory allocation is atomic, generic
runtime selection refuses ambiguity, and exact run-root commands keep each
process pair bound to its own session.

## Tests required before the new Git claim ships

- unrelated staged Guide change survives and is excluded from session commit;
- unrelated unstaged and untracked changes survive and are excluded;
- allowed waiting-direction evidence is attributed to the correct session;
- intended new, modified, renamed, and deleted paths commit correctly;
- changed-since-entry and same-path claims refuse by name;
- competing Git ceremonies serialize and recover after process termination;
- session close proves its exact evidence is pushed without requiring unrelated
  work to disappear;
- status derives every attribution and conflict directly from disk.
- an independent sibling session may start while another is active;
- a declared or discovered dependent session refuses until its prerequisite has
  pushed terminal evidence;
- every mutating command refuses ambiguity when more than one session is active
  and no explicit session ID was supplied;
- aggregate status names every active session, kind, dependency, phase, contexts,
  write claims, and next safe action without guessing a default.

All write-attribution and plural-runtime bullets above now have deterministic
coverage, including a four-process real-Git run of two session pairs through
distinct receipts, pushed closes, and Guide returns. Kristian's visible
Guide-edit-during-session and multi-pair Ghostty proofs remain human tests.
Same-user processes can still bypass Koda and edit
a claimed path during a model turn; the post-work hash catches later mutation but
cannot authenticate who authored bytes observed within that turn.
