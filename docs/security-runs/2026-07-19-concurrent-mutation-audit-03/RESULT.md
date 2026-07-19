# Concurrent mutation security audit — 2026-07-19 — run 03

- Status: **PASS WITH DOCUMENTED SAME-USER, MANUAL-GIT, HOOK, AND PLURAL-RUNTIME BOUNDARIES**
- Platform: macOS arm64
- Node: `v26.0.0`
- Scope: exact work claims, path containment, before/after hashing, Git index
  binding, short-lock recovery, package lifecycle, child processes, credentials,
  hooks, repository integrity, and the earlier interruption surface

## Executive result

The prior high-priority broad-staging finding is closed. The real-project relay
contains no `git add -A`; it commits only the selected session directory and that
session's exact claimed external paths. Unrelated Guide or sibling dirt is neither
included nor required to disappear. Before/post-work hashes, post-stage index-blob
hashing, same-path conflict refusal, atomic claim acquisition, and a short
project-local Git lock are mutation-tested.

Immutable close also revalidates those external claims independently of the relay.
A pushed session directory cannot close while a claimed deliverable remains
changed, uncommitted, absent from Git, or recorded without a post-work observation.

This audit found and fixed two redirect risks before release: a linked parent in
an output claim could alias two path spellings, and a linked `.koda` directory
could redirect lock evidence. Both now refuse component-by-component before any
write. The audit also closed the verify-to-stage gap by hashing the actual Git
index blob after exact staging. A final provenance pass changed Reviewer handback
from hash reconciliation to read-only verification and extended Guide/session
conflict checks from exact strings to parent-and-child overlap.

No runtime dependency, install hook, tracked symbolic link, common tracked live
credential signature, active non-sample Git hook, custom `core.hooksPath`, shell-
evaluated product input, or Git object corruption was found. `git fsck --full`
reported only ordinary unreachable objects from active development history.

## Checks and results

| Area | Result | Evidence |
|---|---|---|
| Runtime dependencies | PASS | `package.json` declares none; npm reports zero bundled dependencies. |
| Install lifecycle | PASS | No install hooks; isolated-cache dry-run pack rebuilt only validated repository-local `dist/`. |
| Package contents | PASS | Isolated-cache dry-run pack completed with 665 entries, zero bundled dependencies, and an executable CLI. |
| Work-claim containment | PASS | Absolute/parent traversal, ignored paths, linked components, non-files, noncanonical aliases, and bidirectional Guide/session or session/session overlap refuse. |
| Claim concurrency | PASS | One atomic lock surrounds conflict check plus write-set update; simultaneous same-path claims cannot both land. |
| Hash binding | PASS | Clean before hash, post-work hash, changed-after-handoff refusal, and actual staged-blob hash are checked. |
| Immutable close of external outputs | PASS | Pushed session evidence with a deliberately omitted claimed deliverable refuses and names that path; committing and pushing it opens close. |
| Exact Git mutation | PASS | Produced output, close, halt, and Guide return verify their exact staged name sets; broad relay staging is absent. |
| Lock containment/recovery | PASS WITH BOUNDARY | Linked `.koda` refuses; live owner refuses; dead owner recovers only with empty index; staged crash residue refuses. Simultaneous dead-lock recovery callers were not separately stress-tested. |
| Unrelated dirt | PASS | Guide/sibling changes may coexist, are excluded from session staging, and do not falsify pushed close. |
| Symbolic links | PASS | No tracked mode `120000`; session evidence, work claims, relay paths, and lock parents reject linked redirects. |
| Secrets | PASS WITH ENVIRONMENT BOUNDARY | Signature scan passes. Codex children still inherit the launch environment for authentication. |
| Hooks/remotes | DOCUMENTED TRUST BOUNDARY | This checkout has no active non-sample hook or custom hooks path. Explicit relay Git can run hooks configured by another project. |
| Same-user writer | OUTSIDE HARD SECURITY CLAIM | Files and hashes prove byte relationships, not OS identity or authorship during a model turn. |
| Plural live runtimes | NOT YET CLAIMED | Multiple active session records and disjoint writes work; Guide runtime preparation still admits one visible Producer/Reviewer pair. |

## Closed finding S-02-01 — broad pre-close staging

- Previous severity: high-priority product integrity
- State: **Closed by implementation and mutation proof**
- Replacement: exact predeclared session outputs, Guide reservations, before/post-
  work hashes, staged-blob verification, exact path staging, and short locked Git
  ceremonies.

## Remaining boundaries

1. A process with the same repository permissions can bypass Koda, rewrite plain
   evidence, or use manual Git. Koda is not an authentication or sandbox system.
2. A same-user edit after Producer handoff is detected. A same-user edit during
   the model turn may be included in that turn's observed bytes; the filesystem
   supplies no author identity.
3. Git hooks and remotes execute with the authority of the user who explicitly
   starts the relay. Inspect unfamiliar projects before launch.
4. Direct-child stop is not process-tree containment. Descendant cleanup remains
   a future service-runtime concern.
5. The lock makes cooperative claim/Git decisions atomic; it does not make the
   whole working tree read-only, and manual Git does not honor it.

## Verdict

Koda-C is suitable for trusted local-project use with cooperative Guide and
session work sharing one repository. The exact provenance claim is now supported
by the complete 174-check deterministic suite and real relay integration. Do not advertise hostile-
writer isolation, authenticated authorship, hook sandboxing, unattended service
containment, or simultaneous visible runtime pairs.
