# Exact work attribution and short Git lock

**Date:** 2026-07-19
**Status:** Implemented and deterministically tested; plural live runtimes remain separate work

## Result

Koda no longer treats a dirty project as one undifferentiated session output.
The active session owns its session directory implicitly and must reserve every
external output before mutation with:

```text
koda work claim <path> [path...] --session <session-id>
```

Guide continuity files are implicitly Guide-owned. Guide reserves any additional
project path with:

```text
koda guide claim <path> [path...]
```

The producer skill makes the session claim part of Produce entry behavior. Claims
must start from a clean regular file or a safely contained missing file. Ignored
paths, linked components, noncanonical aliases, Guide/session overlap,
session/session overlap, unclaimed mutations, and ambiguous session identity all
refuse with named disk state.

## Hash and Git binding

Each external session claim records its clean before SHA-256 and the post-work
SHA-256 observed when the model turn hands back. Immediately before staging, the
supervisor rechecks the working-tree bytes. Immediately after staging, it hashes
the actual index blob and requires that blob to match the recorded post-work hash.
Deletion is represented by a null post-work hash. Rename requires both old and new
paths and is tested as delete plus add.

The relay stages only current session files and external paths in that session's
write set. Close stages only `close.md`. Guide return stages only its named archive
and return paths. No active relay code uses `git add -A`.

Immutable close does not trust the relay to have done this correctly. It re-reads
the write set, re-hashes every external output, checks deletion state, and requires
each path to be clean and committed while the branch is pushed. A session whose
own close evidence is pushed but whose claimed deliverable was omitted remains
open and names the omitted path.

`.koda/git-operation.lock/LOCK.json` is an atomic, project-local, linked-parent-
refusing critical section. It serializes write-claim acquisition and relay-owned
Git stage/commit/push, not model work or ordinary non-conflicting editing. A live
owner refuses by name. A dead owner recovers automatically only with an empty
index; staged crash residue refuses rather than guessing.

## What this permits

- Guide may update manifest continuity files while Produce works.
- Guide may reserve and update an additional unrelated file.
- Independent sessions may reserve disjoint output paths.
- Unrelated staged, unstaged, or untracked work is excluded from the session
  commit and does not falsify pushed session close.
- A newer sibling commit may appear after close; Guide return remains valid while
  the bound close commit is still an ancestor of current history.

## Honest boundary

This is cooperative same-worktree provenance, not hostile-writer isolation. A
same-user process can bypass Koda. A mutation after the Producer's post-work
observation is caught; a mutation during the model turn can be observed as part of
that turn because ordinary filesystem metadata does not authenticate authorship.
Manual Git commands and third-party tools do not honor Koda's lock. Strong hostile
separation would require worktrees, OS identities, or a service boundary.

Session state and non-conflicting disk mutation are now plural. Guide runtime
discovery and preparation still admit only one live Producer/Reviewer pair; that
is the next concurrency implementation, not a write-attribution limitation.
