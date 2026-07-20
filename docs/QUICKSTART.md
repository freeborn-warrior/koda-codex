# Koda-C Quick Start

This page has two paths. Choose the one that matches what you want to see.

## Path A — see the gate in about one minute

Use this when you want the smallest proof and do not want to launch a model.

Requirements: Node.js 22.18 or newer and Git.

From the Koda-C repository:

```bash
KODA_DEMO_DIR=$(mktemp -d /tmp/koda-c-demo.XXXXXX)
node dist/cli.js init "$KODA_DEMO_DIR" --demo
```

Koda prints the next command. Run it. The gate refuses because an approving
review exists but its receipt has not entered the approval ledger. Continue with
the exact commands Koda prints. The complete annotated version is in
[DEMO.md](DEMO.md#one-minute-mechanical-proof).

This path tests the headless gate only. It does not open Guide, Producer, or
Reviewer and does not require Ghostty or Codex CLI.

## Path B — run a complete three-context session

Use this when you want the complete human workflow:

```text
Guide stays open
  → Reviewer opens for owner conversation
  → Producer opens as watch-only
  → Brief → Orient → Plan → Produce → Live → Summary
  → every review requires owner acknowledgement
  → immutable close is committed and pushed
  → the result returns to Guide
```

Additional requirements:

- macOS with Ghostty installed;
- Codex CLI installed and signed in;
- permission for Ghostty to open the two role windows;
- enough model time for a real six-phase session.

No `npm install` is required. From the Koda-C repository, run one command:

```bash
npm run demo:session
```

Koda then owns the instructions:

1. It shows the exact sample session prompt.
2. Type the name you want in durable review and approval records.
3. Choose `1` to confirm or `2` to create nothing.
4. Koda creates an isolated project under `.koda/full-session-demos/`, gives it
   a separate local Git remote, confirms and pushes the prompt, and opens Guide.
5. Guide reconstructs the project from disk. When it displays `READY TO LAUNCH`,
   choose `1`. The trusted controller opens exactly one Reviewer and one Producer.

After launch:

- **Guide:** type normally for project-level conversation. It may remain open
  during the session.
- **Reviewer:** this is the session window you use. Read reviews, ask questions,
  and use its numbered choices.
- **Producer:** watch only. It says `NO ACTION NEEDED` whenever it does not accept
  owner input.

At an approved review, choose `1`, then type the displayed eight-character
`REVIEW CODE`. The controller resolves it to the review's complete unique receipt
and rechecks every gate condition. A wrong or old code changes nothing and keeps
the decision open.

The demo project cannot push into the Koda-C repository or GitHub. Its `origin`
is a local bare repository inside that disposable project. All model, runtime,
review, receipt, Git, and transcript evidence stays under the Koda-C repository's
ignored `.koda/` directory.

## If you make a mistake

- Follow the numbered choice shown in the window that accepts input.
- A wrong review code leaves the gate closed and lets you try again.
- `STOP SAFELY` preserves the decision point for later recovery.
- `HALT PERMANENTLY` ends that attempt and requires a fresh Brief; use it only
  when you intend to void the current phase.
- If a role window disappears, return to Guide and ask: `What is the current
  session state?` Guide derives the safe recovery from disk.
- Never paste a receipt, filesystem path, hash, commit, or recovery command
  between windows. Koda owns that transport.

## What the full-session demo does not claim

It is a real model run, so duration, wording, and review outcomes are not
pre-scripted. The sample product is intentionally small, but its six phases,
separate contexts, owner decisions, mechanical gates, and pushed close are real.
The bundled helper is a demonstration bootstrap, not a universal project-persona
generator. Real projects must adapt `AGENTS.md`, skills, evidence shapes, and
review criteria to their own purpose.

For every CLI verb and its consequence, see the [Command Manual](COMMAND-MANUAL.md).
