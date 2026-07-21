# OpenAI Build Week submission form

Paste-ready copy for the final Devpost form. Re-read the project story once in
Kristian's own voice before submission; the factual claims below are bounded by
the repository's current evidence at commit `d44fc62e0043f4e634f5087123ccaa255c03d7e4`.

## Codex Session ID

```text
019f752a-027a-7373-a1a2-d8fe27af8a04
```

This is the Codex task that began the Koda-C build on July 18 and contains the
majority of the core engineering collaboration. It is not a Koda-C Guide launch,
relay, review, or produce-session ID.

## About the project

```markdown
## Inspiration

I am a designer and imaginator, not a coder. While directing products written in C++, Swift, and Rust, I developed a working rhythm that stopped AI-assisted projects from repeatedly losing their ground: session prompt, Brief, Orient, Plan, Produce, Live, Summary, then push, with independent review between phases.

The review was the hard part. I could ask a second LLM context to review work I could not reliably inspect myself, but completing a session meant manually copying artifacts and reviews between chats. Worse, a review could exist without ever entering the decision that moved the work forward. I built Koda-C after I once approved work whose review I had not actually read. The review existed; it just never entered my decision loop.

## What Koda-C does

Koda-C is a dependency-free, plain-file workflow for AI-produced work. A phase cannot advance until four facts agree on disk:

1. the phase artifact exists and is non-empty;
2. an independent review is bound to the artifact's current content hash;
3. the verdict permits movement; and
4. that review's unique receipt appears in the owner's approval ledger.

The gate re-derives those facts from ordinary files every time. If an artifact changes after review, the review becomes stale. If a review says `REVISE`, the receipt cannot override it. If a receipt belongs to another phase or review, it refuses. Every refusal names the condition that failed.

The receipt does not prove comprehension, and Koda-C says that plainly. It raises the floor: ignoring a review is no longer a passive omission. The verdict controls movement; the receipt proves the review entered the loop.

The complete reference workflow has three persistent, separated contexts. Guide holds the project across sessions. Producer is visible but owner-input-closed. Reviewer is the owner's session conversation and independently reviews every phase. Their shared truth is on disk, not in copied chat memory.

## How Kristian, Codex, and GPT-5.6 built it

Koda-C is my first project built with Codex. Work began Saturday morning, July 18, 2026. A competition-ready core and the first successful complete session were reached roughly 51 elapsed hours later—not continuous work and not a controlled speed benchmark. We continued hardening the recovery paths and judge experience afterward.

I brought the phase method, the original failure, and the product decisions: one persistent reviewer, review receipts, frozen phase inputs, boundary-only direction, immutable Git close, owner acknowledgement at every gate, and honest limitations. I explicitly let Codex choose its own engineering order. The discipline lives in the product, not in the process that made it.

GPT-5.6 Codex translated those decisions into the dependency-free CLI, repository-local skills, Guide/Producer/Reviewer relay, permission profiles, recovery mechanics, mutation tests, security boundaries, documentation, and durable evidence. The recorded session used GPT-5.6 Sol as Producer and GPT-5.6 Terra as the persistent Reviewer. Sol, Terra, and Luna were also run as reviewers against sealed fixtures whose expected results were committed before testing.

The current deterministic suite contains 267 checks. It deliberately breaks gate conditions, attacks receipt binding, mutates files behind the CLI's back, exercises stale reviews, validates every printed recovery command, and tests both Ghostty and manually opened terminal windows over the same runtime.

## The session in the video

The video compresses one real 30-minute session to 2 minutes 24 seconds. The Reviewer found an unsupported claim and returned `REVISE`. That was not staged. Producer remained blocked, corrected the artifact, received a fresh independent review, and only then passed the gate. The repository preserves the artifact, both reviews, approvals, transcript, and pushed close.

## Challenges and lessons

The hardest work was not making a gate refuse in a unit test. It was making the complete human journey recover safely from real mistakes and first-use conditions: terminal permissions, role-start ordering, context binding, malformed acknowledgement input, changed toolkit evidence, closed windows, and a non-technical owner who should never become the transport layer between agents.

We kept the failures. Each owner-visible break became a dated incident, a repair, a regression test, and a post-push transcript. The test suite evolved with the product instead of staying frozen around the first implementation.

One striking observation was that model serving itself was not our bottleneck. Across repeated Sol, Terra, and Luna runs, OpenAI served the models efficiently enough that the limiting work was orchestration, provenance, recovery, security, and human clarity. The deeper lesson was that capable models do not remove the need for workflow design; their speed makes trustworthy boundaries more important.

## What comes next

The long-term direction is a compiled, headless Rust core with interfaces kept separate. A macOS client may come first, but terminal, browser, editor, mobile, and remote interfaces should all connect to the same evidence contract. The disk-separated roles also leave room for future adapters in which different providers occupy Producer and Reviewer. That is a future direction, not a claim about this Codex-only release.
```

## Built with

Add these tags where Devpost accepts them; there is no need to fill all 25 slots.

```text
OpenAI Codex
GPT-5.6
Node.js
TypeScript
JavaScript
Git
GitHub
Markdown
CLI
macOS
Ghostty
```

If the tag picker offers specific GPT-5.6 variants, also add `GPT-5.6 Sol`,
`GPT-5.6 Terra`, and `GPT-5.6 Luna`.

## Try it out links

Primary link already entered:

```text
https://github.com/freeborn-warrior/koda-codex
```

Add a second link:

```text
https://github.com/freeborn-warrior/koda-codex/blob/main/docs/QUICKSTART.md
```

Optional third link:

```text
https://github.com/freeborn-warrior/koda-codex/blob/main/docs/PROCESS.md
```

Add the public YouTube URL as another link only after the final upload exists.

## Project media

Four 3:2, sub-5 MB images are ready in `.koda/video/devpost-gallery/`:

1. `01-koda-c-hero.png` — branded first image;
2. `02-three-context-session.png` — unaltered Guide, Producer, and Reviewer view;
3. `03-unstaged-revise.png` — the real blocking verdict;
4. `04-corrected-approve.png` — the corrected review and reopened gate.

Upload them in that order.

## Private judge-testing field

```text
Public repository: https://github.com/freeborn-warrior/koda-codex

No credentials, API key, account, hosted service, or private access is required for the fast mechanical test.

Start here: https://github.com/freeborn-warrior/koda-codex/blob/main/docs/QUICKSTART.md

Use Path A for the one-minute gate proof. It requires Node.js 22.18+ and Git, but no npm install, build, model, Codex login, or Ghostty. The repository generates its own sample project and prints every next command.

Use Path B for the complete Guide/Producer/Reviewer session. That path requires Codex CLI signed in and enough model time for a real six-phase run. The recorded automatic-window route was tested on macOS 26.5.1 arm64 with Ghostty. The same bound session can also be started in terminal windows opened manually.

The current public README documents both routes, platform boundaries, security model, and preserved evidence. The deterministic suite runs with `npm test` and currently contains 267 checks.
```

## Developer-tool installation and testing field

```text
Koda-C is a public, dependency-free command-line developer tool.

Repository:
https://github.com/freeborn-warrior/koda-codex

Requirements:
- Node.js 22.18 or newer
- Git
- No npm install, build, API key, account, or sample-data download is required for the fast test

Tested platform:
- macOS 26.5.1 arm64
- Node.js 26.0.0
- Apple Git 2.50.1

Other operating systems are not claimed as certified. The core uses ordinary files and has no macOS filesystem dependency, but the full model workflow has only been personally exercised on macOS.

Clone and verify the committed CLI:

    git clone https://github.com/freeborn-warrior/koda-codex.git
    cd koda-codex
    node dist/cli.js --help

Run the one-minute mechanical proof:

    KODA_DEMO_DIR=$(mktemp -d /tmp/koda-c-demo.XXXXXX)
    node dist/cli.js init "$KODA_DEMO_DIR" --demo
    cd "$KODA_DEMO_DIR"

Koda-C prints the next command. Follow its printed commands. The first advance must refuse because the approving review's receipt has not entered the ledger. Read the review, run the printed approval command, enter its exact final `RECEIPT:` line, then run the printed advance command again. The same gate opens.

Complete instructions:
https://github.com/freeborn-warrior/koda-codex/blob/main/docs/QUICKSTART.md

Complete deterministic suite:

    npm test

To reproduce the recorded three-window workflow on the tested setup, install and sign in to Codex CLI, install Ghostty, run `npm run demo:session`, and choose the automatic Ghostty launch. The Quick Start also documents a manual-terminal launch over the same session and gates.
```

## Final form checklist

- Video: confirm the public YouTube URL opens while signed out and reports less
  than three minutes.
- Voiceover: already covers what Koda-C is, Codex's engineering role, and the
  GPT-5.6 Producer/Reviewer/model-fixture use.
- Codex Session ID: use the value at the top of this file.
- Repository: it is public, so the private-repository sharing requirement does
  not apply.
- README: contains setup, testing paths, platform support, Codex acceleration,
  GPT-5.6 use, and evidence.
- Developer tool: both the one-minute no-model test and complete model session
  are documented.
- Team: Kristian is the sole entrant, so there are no teammate invitations.
- Category: select `Developer Tools`.
- Submission: after previewing, submit rather than leaving it as a draft.
