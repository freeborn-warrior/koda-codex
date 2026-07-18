# Koda-C video script

**Target length:** 2:35

**Hard maximum:** under 3:00

**Format:** Ghostty terminal capture, large type, Kristian narrating in English

This is a recording script, not another product test. Perform one silent
rehearsal first. Use the commands Koda prints; do not type long commands from
memory while recording.

## Before recording

1. Use a fresh checkout of the intended submission commit.
2. Set Ghostty to a large readable font and a high-contrast theme.
3. Make the terminal roughly 90 characters wide so Koda's lines do not wrap.
4. Hide notifications, menu-bar distractions, bookmarks, unrelated tabs, shell
   history, usernames, tokens, and personal paths where practical.
5. Do not play music. Record only voice and terminal output.
6. Warm npm's local package cache by completing one off-camera rehearsal.
7. Start from the repository root with a clean `git status`.
8. Keep this script on a phone or second display outside the capture.

## Shot 1 — the problem and product, 0:00–0:28

Screen: terminal cleared; run:

```bash
node dist/cli.js --help
```

Narration:

> I'm Kristian Bengtsson. I design products, but I don't read the C++, Swift,
> Rust, or Node code that agents produce for me. My real failure wasn't that a
> review was missing. A review existed, and the work moved on without anyone
> reading it. Koda-C is a plain-file relay that separates two proofs: the verdict
> decides whether work may move, and the receipt proves the review entered the
> owner's decision loop.

## Shot 2 — create the fixture, 0:28–0:47

Screen: paste these first two lines, then paste the `cd` line printed by Koda:

```bash
KODA_DEMO_DIR=$(mktemp -d /tmp/koda-c-demo.XXXXXX)
npx --yes . init "$KODA_DEMO_DIR" --demo
```

Narration:

> This is a real disposable Koda project from the public checkout. The artifact
> and an approving review already exist. The receipt has deliberately not been
> entered.

## Shot 3 — the money moment, 0:47–1:08

Screen: paste the exact `advance` command Koda printed. Stop moving the pointer
when this appears:

```text
GATE CLOSED — BRIEF
✗ The current review receipt has not been quoted into the approval ledger.
Nothing advanced.
```

Narration:

> The review says approve, but that is not enough. Koda re-reads disk and refuses
> because delivery is not acknowledgement. Nothing advanced.

Pause silently for two seconds on `Nothing advanced.`

## Shot 4 — read and acknowledge, 1:08–1:37

Screen: show the review:

```bash
tail -n 14 docs/sessions/*/reviews/01-brief-review.md
```

Read one finding aloud. Select and copy the complete final `RECEIPT:` line. Paste
the exact `approve` command printed by Koda, press Return, paste the receipt at
the prompt, and press Return.

Narration:

> I read the finding, then quote this review's unique final receipt. Koda records
> the review ID, verdict, approver, receipt, and full review hash in a readable
> ledger. This does not prove comprehension. It makes not-reading a deliberate
> bypass instead of a passive omission.

## Shot 5 — the same gate opens, 1:37–1:52

Screen: paste the exact `advance` command Koda prints.

```text
GATE OPEN — BRIEF
✓ Advanced with artifact, review, APPROVE, and exact receipt proof.
Next phase: orient
```

Narration:

> The same command now opens the gate from evidence on disk and activates the
> next configured phase.

## Shot 6 — prove this is more than one fixture, 1:52–2:15

Screen: return to the repository and show the top of the genuine relay result:

```bash
cd -
sed -n '1,22p' docs/relay-runs/2026-07-18-software-clean-sol-medium-terra-medium-01/RESULT.md
```

Narration:

> We also ran a full six-phase session with one persistent Sol producer and a
> separate persistent Terra reviewer. The reviewer found an unplanted false claim
> in Summary, returned REVISE, and the same contexts recovered through a fresh
> review. Seven real acknowledgements produced six advances and a verified pushed
> close.

## Shot 7 — collaboration and close, 2:15–2:38

Screen: show the test total and final Git history:

```bash
git log --oneline -6
npm test
```

If the full suite threatens the time limit, use the saved result instead:

```bash
sed -n '1,16p' docs/test-results/2026-07-18-security-hardening-final.md
```

Narration:

> I brought the product discipline and made the calls about roles, gates, owner
> attention, and honest limits. GPT-5.6 Codex implemented the CLI, nine skills,
> relay, security fixes, and ninety-six checks. We kept every failed attempt and
> correction in dated Git history. The discipline lives in the tool; I chose to
> let Codex build it in its own engineering order.

## Final line, 2:38–2:45

Screen: return to the refusal/open pair or Koda help.

> Koda-C: the verdict controls movement; the receipt proves the review entered the
> loop.

Stop recording. Do not add an animated outro.

## If something goes wrong on camera

- If npm pauses, stop and restart after an off-camera cache warmup.
- If a path wraps, widen the terminal; do not shrink the font below readability.
- If the wrong text is pasted, restart the disposable fixture. Do not edit its
  ledger or state to fake the intended output.
- If the full test suite runs longer than the remaining video time, use the saved
  transcript command in Shot 7.
- If audio clips or a notification appears, record again; do not try to hide a
  broken segment with music.

## Export check

- Duration is below 3:00.
- Voice is audible on phone speakers.
- `GATE CLOSED`, `Nothing advanced`, and `GATE OPEN` are readable at 1080p.
- The narration says Codex and GPT-5.6 explicitly.
- The video shows working functionality, not only slides or prose.
- No receipt from a real project, credential, personal notification, or unrelated
  terminal history appears.
- The YouTube visibility is Public and the URL works while signed out.
