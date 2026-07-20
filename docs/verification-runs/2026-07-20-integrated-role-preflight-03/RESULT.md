# Integrated Producer-role preflight — result

- Date: 2026-07-20
- Status: **POST-PUSH PASS — FRESH OWNER-VISIBLE RUN PENDING**
- Owner-observed launch: `02f73292-d90a-4f33-8369-35ec4e296614`
- Failed local suite: [232/248](../../test-results/2026-07-20-integrated-role-preflight-local.md)
- Corrected local suite: [250/250](../../test-results/2026-07-20-integrated-role-preflight-local-04.md)
- Unchanged post-push suite: [250/250](../../test-results/2026-07-20-integrated-role-preflight-pushed.md)
- Fresh owner-visible full session: still required

## What the owner found

The fresh recording attempt reached the visible Producer, but the Producer did
not create a session. It stopped with a named refusal because
`docs/toolkit-integrity.json` was not readable inside the actual restricted role
sandbox. The run remained fail-closed: no session, phase, review, approval,
receipt, or advancement was created.

The affected disposable project is preserved under the ignored repository-local
runtime at `.koda/full-session-demos/`. It is not submission evidence and does
not enter the tracked project history.

## Why the earlier proof was insufficient

The Quick Start test executed the correct `session new` command directly in the
prepared project. A separate check instantiated the Codex role permission
profile. Neither check executed that command *through* that profile. Both
components passed while their composition failed.

The corrected acceptance boundary is the user journey: the bundled project,
confirmed prompt, installed Codex client, exact restricted Producer profile,
verified external toolkit proof, and real first `session new` command must work
together before Koda prints `READY`.

## Repair

- One proof-binding permission helper now obtains the verified toolkit paths and
  gives them to every live Producer and Reviewer turn. Call sites cannot silently
  omit that evidence.
- Quick Start clones the prepared project into a temporary scratch project and
  runs the exact first-session command through the actual `koda_project` profile.
  It requires exactly one bound session, removes the scratch project, and only
  then prints `READY`.
- The role sandbox receives the resolved native Git toolchain rather than the
  macOS `/usr/bin/git` xcrun shim.
- Model Git reads use disabled global/system configuration and a private
  project-run XDG directory. Ambient credentials and parent Codex identity remain
  excluded.
- Immutable Guide-return archival ignores that one scratch directory only when
  it is a real, empty directory. A linked, special, or non-empty path refuses.

## Cause-and-effect runs

1. The first complete local regression preserved **16 failures**: one runtime
   variable omission plus stale source-contract assertions caused relay,
   interruption, conversation, and plural-runtime checks to refuse. This was not
   represented as a pass.
2. After binding the Reviewer runtime path and updating assertions to require the
   stronger helper, 39/41 affected relay checks passed. The remaining two exposed
   the new empty XDG directory colliding with fail-closed archive enumeration.
3. After the archive rule was narrowed to an empty real `.xdg` directory, the
   real-project relay and two simultaneous Producer/Reviewer pairs passed 5/5.
4. The first corrected local suite passed **249/249**. Adding the explicit
   non-empty/symbolic-link XDG archive mutation and changing protected Quick Start
   instructions then produced another honest manifest-refusal run. After rebinding
   that exact documentation hash, the complete corrected suite passed **250/250**.

## Installed-client checks

- The exact restricted first-session Quick Start completed with exit 0 in
  **0.75 seconds** on Codex CLI 0.144.6. It created one session in a temporary
  clone, removed that clone, printed `READY — FULL SESSION`, and opened no model
  or Ghostty window.
- A downstream selection of 67 lifecycle, mutation, receipt, stale-review,
  status-truth, halt, direction, concurrency, and close checks first passed in
  about **456 seconds** but emitted repeated macOS xcrun/cache warnings. That run
  is classified as a quality failure despite its green assertions.
- Resolving native Git outside the model sandbox reduced the same selection to
  about **2.4 seconds**, but Git still attempted ambient `~/.config` access. That
  run is also classified as a quality failure.
- With both native Git and project-contained XDG configuration, the selection
  passed **67/67 in about 2.5 seconds** with no xcrun, developer-cache, or ambient
  Git-config warning.

## Honest boundary

This record proves the formerly missing role-sandbox composition and the
deterministic downstream mechanics. It does not claim that a new visible Sol
Producer and Terra Reviewer have completed all six phases after this repair.
That final owner-observed rehearsal remains the next human proof.
