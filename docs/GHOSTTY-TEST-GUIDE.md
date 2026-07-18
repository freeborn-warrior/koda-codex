# First Koda-C full-relay test in Ghostty

This guide is for Kristian's first genuine owner-acknowledged relay. The prepared run uses Sol at medium effort as producer and Terra at medium effort as reviewer:

```text
docs/relay-runs/2026-07-18-software-clean-sol-medium-terra-medium-01
```

The two Codex contexts are independent but bound to the same disk-backed relay run and Koda session. Window A is the supervisor. Window B is currently a simple owner review reader; it is not yet the future interactive reviewer conversation.

## Window A — start or resume

From the repository:

```bash
cd /Users/freeborn/Dev/koda-codex
```

Start or resume the prepared run:

```bash
npm run relay:execute -- "docs/relay-runs/2026-07-18-software-clean-sol-medium-terra-medium-01"
```

Leave Window A alone while it prints producer and reviewer turns. Move to Window B only when A prints `OWNER ACKNOWLEDGEMENT REQUIRED` and waits for a receipt.

## Window B — one command whenever A waits

Move to the repository once if needed:

```bash
cd /Users/freeborn/Dev/koda-codex
```

This is the one Window B command used for every phase review:

```bash
npm run relay:review
```

The command finds the one relay run whose status is `AWAITING_OWNER_RECEIPT`, derives its current session and phase from disk, and opens that exact review. It refuses rather than guessing if no run or more than one run is waiting.

When the review opens:

1. Read the verdict and every finding.
2. Press Space to move down when needed.
3. Read through the final receipt line.
4. Press `q` when finished.

The helper then re-reads the review, refuses if it changed while open, and copies the exact receipt to the macOS clipboard without printing it or sending it to either model context.

Return to Window A, press Command–V, then press Return. That is the complete owner acknowledgement action.

If the verdict is non-blocking, the gate advances and the producer begins the next configured phase automatically. If it is blocking, the same producer context receives the acknowledged disk handback, revises the artifact, and the same reviewer context performs a fresh review. Run `npm run relay:review` again when Window A waits again.

## One-session invariant

The normal product state has one active session, one current phase, and at most one review awaiting owner acknowledgement. Producer and reviewer share the run ID and session ID through files, never through assumed conversational memory. A new Koda session cannot open until the prior session is closed at a pushed Git commit.

The helper's multiple-waiter refusal is corruption and operator-error protection for this test repository, which can contain several archived or prepared fixture projects. It is not an expected owner workflow.

## What this bridge proves—and does not

This run proves that two distinct persistent Codex thread IDs can relay artifacts and handbacks through one disk-backed session while Koda independently controls advancement. The supervisor resumes the contexts in turn; it does not yet show two visible conversations waiting concurrently.

The intended product experience is simpler: Kristian speaks only with the reviewer, records approval or discusses a product decision there, Koda verifies the resulting disk evidence, and the producer resumes automatically. The reviewer never gains authority to bypass the gate. Window B's one-command reader is an interim bridge toward that interface.

## If Window A pauses

Do not delete the run. Do not run `relay:prepare` again. Resume with:

```bash
npm run relay:execute -- "docs/relay-runs/2026-07-18-software-clean-sol-medium-terra-medium-01"
```

If the pause names an owner consultation instead of a receipt, stop and report only the named question and response-file path. Never send a receipt through chat.

## Successful ending

Success exists only when Window A prints `RELAY COMPLETE`. Then Window B may inspect:

```bash
sed -n '1,240p' docs/relay-runs/2026-07-18-software-clean-sol-medium-terra-medium-01/RESULT.md
```

The result must say `Status: COMPLETE`, show distinct producer and reviewer thread IDs, record all six phase advancements and owner acknowledgements, and name the pushed close commit. A prepared folder, a model exit, or `6/6 phases` without close evidence is not success.

## Safety boundaries

- Never paste a review receipt into Codex chat or documentation.
- Do not manually edit artifacts or reviews during the run.
- Do not manually run Koda approval or advancement commands outside Window A's prompt.
- Do not start another run while this run is active.
