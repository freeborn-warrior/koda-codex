# Koda-C demo

## One-minute mechanical proof

This fixture proves the gate and receipt without invoking a model. Run it from the repository root with Node.js 22.18+:

For a zero-build first check, run `node dist/cli.js --help`. The primary fixture
uses that same committed binary, so npm cache or network state cannot obscure the
gate. Packaging has its own real-tarball installation test in the full suite.

```bash
KODA_DEMO_DIR=$(mktemp -d /tmp/koda-c-demo.XXXXXX)
node dist/cli.js init "$KODA_DEMO_DIR" --demo
cd "$KODA_DEMO_DIR"
```

The initializer prints an exact `advance` command. Paste it. Koda-C refuses because the review exists but its receipt is not in the ledger:

```text
GATE CLOSED — BRIEF
✗ The current review receipt has not been quoted into the approval ledger.
Nothing advanced.
```

Read the review—including its findings and final receipt:

```bash
tail -n 14 docs/sessions/*/reviews/01-brief-review.md
```

Paste the exact `approve` command Koda-C printed. It prompts:

```text
Paste the exact RECEIPT line:
```

Copy the review's complete final line, beginning with `RECEIPT:`, and press Enter. Koda-C records the approver, verdict, review ID, and receipt in `approvals.md` without printing the receipt for you.

Paste the exact `advance` command it prints. The same gate now reports:

```text
GATE OPEN — BRIEF
✓ Advanced with artifact, review, APPROVE, and exact receipt proof.
Next phase: orient
```

Expected time after the first package run: about one minute.

## Manual two-Codex-task collaboration (advanced)

This explains the underlying operating architecture, not the recommended first-use
route. For the current complete owner experience, use the
[Quick Start](QUICKSTART.md#path-b--run-a-complete-three-context-session) and run
`npm run demo:session`.

The repository's genuine full relay has proved one persistent Producer and a
separate persistent Reviewer across all six phases. The current runtime adds an
ongoing Guide beside those two roles and gives Reviewer the owner-facing session
conversation. Kristian's fresh July 20 run completed Brief through Summary,
recovered an unplanned Orient `REVISE`, recorded seven acknowledgements, pushed
immutable close, and returned the result to Guide. The
[owner-visible result](verification-runs/2026-07-20-owner-full-session-05/RESULT.md)
is the current human proof; the manual setup below remains useful for understanding
or adapting the lower-level relay.

### Setup

Create a clean Koda-C project and open the first session. Both Codex tasks must have access to the same project folder. They must not share conversational context.

### Producer task/window

Give the producer task only the project files and the relevant repository-local producer skill:

```text
Read <repo>/.agents/skills/koda-c-session/SKILL.md completely and use it to open this Koda-C project from my written contract. For later phases, use only the Koda-C producer skill whose phase is current on disk. Stop at every review handover.
```

The producer skill performs its ENTRY CHECK, writes its own artifact, verifies its HANDOVER OBLIGATION, and stops. `koda status` shows the current phase still active and the review proof missing. When the gate later activates another phase, explicitly invoke that phase's skill; do not rely on a previous skill carrying across the relay.

### Reviewer task/window

Open a fresh Codex task with the same project folder and no producer transcript:

```text
Read <repo>/.agents/skills/koda-c-review/SKILL.md completely. Independently review the current Koda-C phase using only its artifact and cited files. Write the review to disk before reporting, and do not quote the receipt in chat.
```

The reviewer creates the protected review, verifies cited evidence, writes one of the five verdicts, and reports only its path and verdict.

### Owner and gate

Kristian reads the review file in full, copies its final receipt into the printed `approve` command, and runs `advance`.

- Allowed verdict: the CLI activates the next phase from `state.json`; the producer task loads that phase's producer skill.
- REVISE or REJECT: the producer remains in the same phase, records the receipt, revises, and hands back for a fresh review.
- DISCUSS: Kristian records a ruling with the receipt; the same phase receives a fresh definitive review.

The reviewer task stays separate and may review every phase with the one shared skill, explicitly invoked for each new review handoff.

This separate-task setup is observable independence evidence, not a claim that `SKILL.md` creates a file or tool permission boundary. Koda-C enforces the disk gate; Codex permissions or future trusted hooks would be needed for stronger runtime confinement.

## Full close proof

For the complete prepare → Git → verify sequence, read the committed [dogfood transcript](dogfood/TRANSCRIPT.md). It shows:

1. phase gate refusal without review;
2. receipt gate refusal without owner quote;
3. successful advancement;
4. `CLOSE PREPARED — NOT CLOSED`;
5. the exact Git add and commit commands printed by Koda-C;
6. closure refusal before the first push;
7. the exact branch/upstream push command;
8. final `SESSION CLOSED` from both close and status.

## Camera notes for Kristian

- Use a large terminal font and keep the refusal output centered.
- Pause after `Nothing advanced.`—that is the product's money moment.
- Read one review finding aloud before copying the receipt so the ritual is visible.
- Do not type commands from memory; paste what Koda-C prints.
- Keep the one-minute proof separate from the two-task architecture explanation.
