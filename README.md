# Koda-C

**The verdict controls movement. The receipt proves the review entered the loop.**

Koda-C is a dependency-free, plain-file workflow for AI-produced work. It refuses
to advance a phase until four facts agree on disk: the artifact exists, an
independent review is bound to its current bytes, the verdict permits movement,
and the review's unique receipt appears in the owner's approval ledger.

It was built for a specific failure. A review can exist, be delivered, and still
never enter the decision that moves the work forward. Koda-C separates those two
proofs instead of treating review delivery as acknowledgement.

## Try the refusal in one minute

Requirements: Node.js 22.18+ and Git. The tested release platform is macOS
26.5.1 arm64 with Node.js 26.0.0 and Apple Git 2.50.1. Other platforms are not
claimed as tested.

From a fresh checkout:

```bash
node dist/cli.js --help
KODA_DEMO_DIR=$(mktemp -d /tmp/koda-c-demo.XXXXXX)
node dist/cli.js init "$KODA_DEMO_DIR" --demo
cd "$KODA_DEMO_DIR"
```

Run the exact `advance` command printed by Koda. The approving review already
exists, but its receipt has not entered the ledger, so the gate says:

```text
GATE CLOSED — BRIEF
✗ The current review receipt has not been quoted into the approval ledger.
Nothing advanced.
```

Read the review, use the exact `approve` command Koda printed, paste its complete
final `RECEIPT:` line when prompted, and run the printed `advance` command again.
The same gate opens and activates `orient`. The complete copy-and-paste path is in
the [one-minute demo](docs/DEMO.md#one-minute-mechanical-proof).

`npx --yes . --help` is separately tested as the local package path. It is not
required for this primary demo, so a damaged or cold npm cache cannot obscure the
gate itself.

## What ships

- A small CLI whose gate and status truth are re-derived from ordinary files.
- A configurable reference relay: Brief → Orient → Plan → Produce → Live → Summary.
- Seven producer skills, one shared reviewer skill, a session-prompt skill, and an
  immutable Git-verified close ceremony under the repository-local `.agents/` path.
- Artifact/review hashing, earlier-gate revalidation, waiting-direction binding,
  exact write claims, and fail-closed recovery.
- Mutation, adversarial receipt, stale-review, status-truth, package, concurrency,
  security, and printed-command tests.
- Sealed reviewer fixtures used to compare GPT-5.6 Sol, Terra, and Luna without
  changing the scoring contract after a run.

The core does not require Ghostty or a model. Ghostty is an optional macOS adapter
that makes the Guide, Producer, and Reviewer visible in separate windows. The
same disk relay can be started from manually opened terminals.

## Evidence, not promises

- The current [230-check post-push transcript](docs/test-results/2026-07-19-atomic-role-locks-pushed.md)
  is hash-bound by the toolkit integrity manifest.
- A [genuine six-phase relay](docs/relay-runs/2026-07-18-software-clean-sol-medium-terra-medium-01/RESULT.md)
  used one persistent Sol producer and a separate persistent Terra reviewer. It
  encountered an unplanned Summary `REVISE`, recovered through a fresh review,
  received seven owner acknowledgements, and reached pushed immutable close.
- The [reviewer model matrix](docs/MODEL-TEST-MATRIX.md) separates specific defect
  catch from verdict temperament and preserves every scored run.
- The [security boundary](docs/SECURITY.md) states what installation, the core,
  managed Codex roles, and the optional relay can and cannot do.
- The final [public-clone UX audit](docs/quality-runs/2026-07-19-submission-readiness-09/RESULT.md)
  and [submission security audit](docs/security-runs/2026-07-19-submission-readiness-audit-15/RESULT.md)
  preserve the literal judge path, package contents, zero-vulnerability result,
  failure handling, and remaining human work.
- Failed first-use attempts and their repairs remain in dated files and Git
  history; the current optional three-window recovery still awaits its final
  owner-observed completion and is not represented as finished proof.

## How Codex and GPT-5.6 built it

Kristian Bengtsson developed the underlying phase method while directing C++,
Swift, and Rust products as a designer: session prompt, brief, orient, plan,
produce, live, summary, then push, with independent review between phases. He
made the product decisions about the receipt, one shared reviewer, the
producer/reviewer relay, owner-facing reviewer, immutable Git close, model tests,
and honest limits.

GPT-5.6 Codex translated those rulings into the CLI, repository-local skills,
relay runtime, tests, model fixtures, security hardening, and inspectable evidence.
Kristian explicitly chose to let Codex build in its own engineering order: the
discipline lives in the product, not in the process that made it. Dated commits
and recorded failed tests preserve that collaboration instead of retrofitting it
into a cleaner story.

The receipt does **not** prove comprehension. It raises the floor: ignoring a
review is no longer a passive omission; bypassing it requires deliberately opening
the review and taking its unique phrase. Koda-C is evidence discipline, not
mind-reading or a cryptographic identity system.

## Judge and contributor map

- [Full product README](docs/README.md)
- [Demo and camera path](docs/DEMO.md)
- [Submission checklist](docs/SUBMISSION-CHECKLIST.md)
- [Testing ledger](docs/TESTING.md)
- [Project state](docs/PROJECT.md) and [visible backlog](docs/BACKLOG.md)
- [Original owner contract](docs/origin/2026-07-18-owner-contract.md)

Koda-C is licensed under GPL-3.0-only.

Copyright (C) 2026 Kristian Bengtsson
