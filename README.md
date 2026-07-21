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

Install by cloning the public repository. No `npm install` or build is required:

```bash
git clone https://github.com/freeborn-warrior/koda-codex.git
cd koda-codex
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

## Run the complete session

The one-minute path proves the mechanical gate. The complete human workflow uses
one persistent Guide, one visible watch-only Producer, and one separate
owner-facing Reviewer across all six phases and pushed close.

On macOS with Ghostty and a signed-in Codex CLI, one repository command prepares
an isolated project, shows the exact prompt for confirmation, creates its own
local Git upstream, and opens Guide:

```bash
npm run demo:session
```

From that point Koda presents the choices. This chat or a separate command sheet
is not part of the operating loop. See the [nontechnical Quick Start](docs/QUICKSTART.md)
and the consequence-oriented [Command Manual](docs/COMMAND-MANUAL.md).

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

The engine remains headless by design. This competition entry implements it in
TypeScript and dependency-free JavaScript; the intended long-term core is a
headless Rust engine, not a permanent TypeScript runtime. A future macOS, browser,
editor, or remote interface would be a separate client of the same plain-file and
command contract. An interface may present and request actions, but it never
becomes gate truth or owns the workflow.

In the managed Reviewer window, the complete human-facing review prints inline.
Its final eight-character `REVIEW CODE` is the only acknowledgement text the owner
types. Koda binds that code to the current review's complete receipt and still sends
the exact receipt—not the short code—to the unchanged mechanical gate. No pager,
clipboard, or terminal paste is involved.

Guide, Reviewer, and Producer use the same visibly bounded terminal panels and
spacing. Numbered choices appear only where owner input is accepted; Producer
states `NO ACTION NEEDED — watch only`. All managed model and review text is
sanitized for terminal control and bidirectional-override characters before it is
displayed, while the evidence bytes on disk remain unchanged.

Default progress is phase-aware and concise: successful low-level commands remain
in the project-local event record and appear as one check total, while failures stay
visible. Ordinary Reviewer conversation shows a thinking boundary and then its
direct final answer instead of flooding the owner with procedural inspection.

## Evidence, not promises

- The current [252-check post-push Reviewer/session-binding transcript](docs/test-results/2026-07-20-reviewer-session-binding-pushed.md)
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
- The [bounded Guide startup quality audit](docs/quality-runs/2026-07-20-bounded-guide-startup-12/RESULT.md)
  and [security audit](docs/security-runs/2026-07-20-bounded-guide-startup-audit-18/RESULT.md)
  preserve the owner-observed failure, real-model correction, honest latency
  boundary, and 238-check regression proof.
- The [self-guided full-session quality audit](docs/quality-runs/2026-07-20-self-guided-full-session-13/RESULT.md)
  and [security audit](docs/security-runs/2026-07-20-self-guided-full-session-audit-19/RESULT.md)
  cover the single-command entry, human choices, hostile Git environment, package,
  and the remaining real-human boundary.
- The [Codex permission-instantiation quality audit](docs/quality-runs/2026-07-20-codex-permission-instantiation-15/RESULT.md)
  and [security audit](docs/security-runs/2026-07-20-codex-permission-instantiation-audit-21/RESULT.md)
  preserve both real first-use refusals, the false `--version` proof, and the
  installed CLI's actual fail-before-creation sandbox/profile check.
- The [Ghostty login-resolution incident](docs/verification-runs/2026-07-20-ghostty-login-resolution-01/RESULT.md),
  [quality audit](docs/quality-runs/2026-07-20-ghostty-login-resolution-16/RESULT.md),
  and [security audit](docs/security-runs/2026-07-20-ghostty-login-resolution-audit-22/RESULT.md)
  preserve the later real-window failure, the incorrect relative-path test, and
  the absolute project-contained correction.
- The [full-session prompt-contract incident](docs/verification-runs/2026-07-20-full-session-prompt-contract-02/RESULT.md),
  [quality audit](docs/quality-runs/2026-07-20-full-session-prompt-contract-17/RESULT.md),
  and [security audit](docs/security-runs/2026-07-20-full-session-prompt-contract-audit-23/RESULT.md)
  preserve the later Producer refusal, the known contradiction that was
  reintroduced into the bundled demo, and the new pre-window mechanical check.
- The [integrated Producer-role incident](docs/verification-runs/2026-07-20-integrated-role-preflight-03/RESULT.md),
  [quality audit](docs/quality-runs/2026-07-20-integrated-role-preflight-18/RESULT.md),
  and [security audit](docs/security-runs/2026-07-20-integrated-role-preflight-audit-24/RESULT.md)
  preserve the next owner-visible refusal, the missing whole-journey test, its
  failed 232/248 regression, native Git/XDG correction, and promoted 250-check proof.
- The [Reviewer session-binding incident](docs/verification-runs/2026-07-20-reviewer-session-binding-race-04/RESULT.md),
  [fresh independent review](docs/quality-runs/2026-07-20-reviewer-session-binding-19/REVIEW.md),
  and [security audit](docs/security-runs/2026-07-20-reviewer-session-binding-audit-25/RESULT.md)
  preserve the later false-ready prompt, the exact owner question that exposed it,
  and the 252-check local plus unchanged post-push repair. Terra/medium returned
  `APPROVE`. The subsequent [fresh owner-visible result](docs/verification-runs/2026-07-20-owner-full-session-05/RESULT.md)
  completed all six phases, encountered an unplanned Orient `REVISE`, required a
  corrected artifact and fresh review, recorded seven owner acknowledgements, and
  returned a pushed immutable close to Guide.
- Failed first-use attempts and their repairs remain in dated files and Git
  history. The same optional three-window launch later recovered its persistent
  contexts, completed all six phases with six owner acknowledgements, pushed
  immutable close, and returned its archive to Guide. The complete restorable
  [owner-observed result](docs/verification-runs/2026-07-19-markdown-headings-01/RESULT.md)
  preserves the failures and final pass together.

## How Codex and GPT-5.6 built it

Koda-C was Kristian's first project built with Codex, created as an entry for
OpenAI's Build Week. Work began Saturday morning, July 18, 2026; the state
documented here was reached by Monday morning, July 20—roughly 51 elapsed
hours, neither continuous work nor a controlled speed benchmark. The
repository's dated decisions, failures, repairs, tests, and completed sessions
preserve what that first collaboration actually produced.

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

## Future direction

The production direction is a compiled, headless Rust core with its human
interfaces kept separate. A native macOS client may be the first richer interface,
but terminal, browser, editor, mobile, and remote clients should all connect through
the same bounded workflow contract rather than absorbing the engine.

The disk-separated seats also leave room for future runtime adapters: Codex CLI
could occupy Producer while Claude Code occupies Reviewer, or the reverse. That is
architectural direction, not a claim about the current release. Today's managed
runner is Codex-only, and any additional provider must prove isolation, permissions,
recovery, and review quality before Koda-C trusts it.

## Judge and contributor map

- [Quick Start: one-minute gate or complete session](docs/QUICKSTART.md)
- [Command Manual](docs/COMMAND-MANUAL.md)
- [Full product README](docs/README.md)
- [Demo and camera path](docs/DEMO.md)
- [Submission checklist](docs/SUBMISSION-CHECKLIST.md)
- [Testing ledger](docs/TESTING.md)
- [Project state](docs/PROJECT.md) and [visible backlog](docs/BACKLOG.md)
- [Original owner contract](docs/origin/2026-07-18-owner-contract.md)

Koda-C is licensed under GPL-3.0-only.

Copyright (C) 2026 Kristian Bengtsson
