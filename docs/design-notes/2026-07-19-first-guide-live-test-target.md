# First Guide live-test target

**Date:** 2026-07-19  
**Status:** Resolved — self-hosting deferred until after submission

## Entry-check result

The repository-local `koda-c-session-prompt` skill was invoked from the Guide
context before preparing the first owner-observed three-window test. Its required
disk preflight refused correctly:

```text
ERROR: No koda.config.json found. Run `koda init` first.
```

Koda-C was intentionally built using Codex's ordinary engineering workflow. Its
construction history was never retrofitted into Koda sessions, and the repository
therefore has no project config or `docs/guide/project.json`. The existing empty
`docs/sessions/` directory is not active session evidence.

No prompt, confirmation, launch request, runtime, or session was created after
this refusal.

## Recommended choice: forward-only Koda-C self-hosting

Initialize this repository as a Guide project now, then use Koda-C for one small,
real improvement to Koda-C's human-facing terminal experience. This would not
pretend the earlier build followed Koda. It would begin a new, honestly dated
forward-only use of the finished workflow and give the live test meaningful
software work rather than another planted fixture.

Initialization would add only current and future truth:

- root `koda.config.json`;
- `docs/guide/project.json` indexing `docs/PROJECT.md`, `docs/BACKLOG.md`, and
  `docs/WORKING-PLAN.md`;
- Guide prompt, launch, return, and archive directories as ordinary evidence;
- the first real session under `docs/sessions/`, opened only after Kristian
  confirms its exact prompt.

The first bounded prompt should improve one observable CLI/Reviewer usability
problem found during the three-window run. The session must use the existing six
producer phases and shared Reviewer, preserve owner acknowledgement at every
gate, and close only after pushed immutable evidence.

## Alternative: disposable external test project

A separate temporary Guide project avoids adding Koda state to this repository.
It proves launch mechanics but has less product value: its work is artificial,
its continuity ends after the test, and it repeats the fixture character already
covered deterministically.

## Owner ruling

Kristian chose not to initialize Koda-C itself before the contest submission.
The current build is moving quickly, and changing the submission repository into
its own first managed project would combine product validation with an adoption
decision. Self-hosting remains valuable future work, not rejected product
direction.

Before submission, Koda-C will instead exercise the complete current workflow in
a fresh representative verification project. Every durable input, transcript,
result, snapshot, and Git proof remains in this repository. The root Koda-C
repository receives no live `koda.config.json`, Guide manifest, or retrofitted
session history.

The detailed scope and consequences are recorded in the
[pre-submission verification ruling](2026-07-19-pre-submission-verification-ruling.md).
