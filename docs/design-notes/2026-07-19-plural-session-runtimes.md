# Plural session runtimes

**Date:** 2026-07-19
**Status:** Deterministically implemented; owner-observed Ghostty proof pending

## Product result

One Koda project may now hold several unfinished runtime records under
`.koda/runs/<launch-id>/`. Each record names one confirmed launch, one bounded
session, one persistent Producer context, and one persistent owner-facing Reviewer
context. Guide status enumerates every active runtime and prints commands that
contain that runtime's exact directory; no command discovers a default when more
than one pair exists.

This preserves the role model:

- Guide remains the ongoing project-level conversation.
- Each active bounded session has its own visible non-interactive Producer.
- Each active bounded session has its own persistent Reviewer, which is the
  owner's only conversational interface to that session.
- The launch ID appears in automatic Ghostty window titles so two pairs remain
  visually distinguishable.

Plural runtime does not merge contexts, share Reviewer memory between sessions,
or make one session's conversation input to another.

## Concurrency mechanics

Session directory allocation now claims the dated sequence directory atomically.
Two simultaneous starts receive different session IDs rather than both selecting
the same “next” number. Relay startup resolves the session by its unique
`guide-launch.json` binding, never by comparing a before/after list that could
contain another concurrent session.

Runtime discovery validates every `RUN.json` independently and returns an ordered
set. Corrupt, linked, mismatched, or invalid records still make status refuse;
plurality is accepted only when every identity is valid. A convenience caller
that requests one runtime without a launch ID still refuses ambiguity.

Exact session write sets keep ordinary work disjoint. Claim acquisition waits
briefly for the project-local lock, then rechecks conflicts while holding it, so
simultaneous same-path claims end in one owner and one named overlap refusal.
Relay Git stage/commit/push ceremonies wait up to 30 seconds for another short
ceremony, then require a zero-ahead base, use exact paths, and release the lock.
The lock record is fully written before its directory name becomes visible, and
Git read operations disable optional index refreshes so they cannot race a
serialized commit. They do not lock model work.

Closure does not ask whether unrelated local commits exist. It proves that this
session's complete tree and every claimed output match upstream. Each close and
Guide return also records the latest commit touching its exact evidence paths,
not whichever sibling commit happens to be project HEAD at that instant.

## Deterministic proof

The plural integration creates two owner-confirmed independent launches in one
real temporary Git project, retains two unfinished runtime records, and starts
four OS processes:

```text
Guide project
├── Alpha Producer + Alpha Reviewer
└── Beta Producer  + Beta Reviewer
```

Both pairs run one complete gate through pushed immutable close and Guide return.
The proof requires four distinct persistent context IDs, two distinct session
IDs, session-specific artifact text, exact close/return commit bindings, clean
pushed Git, and two `COMPLETE` runtime records. Starting both pairs together
exercises the shared Git lock rather than a staged sequential substitute.

## Honest boundary

The four-process proof uses deterministic fake Codex children so it tests routing,
files, processes, receipts, Git serialization, and context identity without
spending or claiming live-model cognition. Kristian has not yet watched or driven
several simultaneous Ghostty session pairs. The submission demonstration still
needs only one Guide plus one Producer/Reviewer pair; plural runtime proves that
pair is not a global project singleton.
