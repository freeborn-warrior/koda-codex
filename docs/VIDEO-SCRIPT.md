# Koda-C video script

**Target length:** 2:40

**Hard maximum:** under 3:00

**Format:** silent high-quality Ghostty source capture, edited to time, with
Kristian's English voiceover added afterward

This is an editing script, not another product test. First record the complete
session at normal speed without narration; then record the short mechanical gate
fixture separately. Build the final sub-three-minute video from those real source
captures with voiceover. Never speed up or cut across a failure in a way that makes
it look successful.

## Before recording

1. Use a fresh checkout of the intended submission commit.
2. Set Ghostty to a large readable font and a high-contrast theme.
3. Make the terminal roughly 90 characters wide so Koda's lines do not wrap.
4. Hide notifications, menu-bar distractions, bookmarks, unrelated tabs, shell
   history, usernames, tokens, and personal paths where practical.
5. Do not play music. Capture system audio off; add only the English voiceover in
   the edit.
6. Complete one off-camera rehearsal from the intended checkout.
7. Start from the repository root with a clean `git status` and no old Koda role
   processes or confusing Ghostty tabs.
8. Record the complete `npm run demo:session` journey at normal speed: Guide,
   Reviewer `STARTING SESSION` → `SESSION READY`, watch-only Producer, phase
   handovers, at least one review decision, pushed close, and return to Guide.
9. Record the one-minute mechanical fixture as a separate source clip.
10. Keep this script on a phone or second display outside the capture.

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
node dist/cli.js init "$KODA_DEMO_DIR" --demo
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

## Shot 6 — show the complete human workflow, 1:52–2:19

Screen: use the real full-session recording as a 6×–12× montage. Pause briefly on
these truthful moments: Reviewer `STARTING SESSION`, Reviewer `SESSION READY`, one
phase-aware Producer panel, one Reviewer decision, and immutable pushed close.
Keep all three contexts visible where practical. Do not show a receipt or hidden
metadata.

Narration:

> The complete workflow keeps three independent contexts visible. Guide holds the
> project path, Producer works watch-only through six phases, and Reviewer is the
> only session conversation I use. Reviewer does not open input until Producer's
> exact disk session is bound. Every phase then returns through independent review,
> my acknowledgement, and the same mechanical gate before pushed close.

If the fresh session has an interesting real revision, show it. Never imply a
revision occurred if that run approved cleanly.

## Shot 7 — committed evidence, 2:19–2:36

Screen: return to the repository and show the newest complete result plus recent
history:

```bash
sed -n '1,12p' docs/test-results/2026-07-20-reviewer-session-binding-review-release.md
git log --oneline -6
```

Narration:

> I brought the product discipline and made the calls about roles, gates, owner
> attention, and honest limits. GPT-5.6 Codex implemented the CLI, ten skills,
> relay, security boundaries, and two hundred and fifty-two checks. Fresh
> Terra independently approved the final startup repair. We kept every failed
> attempt and correction in dated Git history—including the owner-visible failures
> that made the workflow sharper.

## Final line, 2:36–2:43

Screen: return to the refusal/open pair or Koda help.

> Koda-C: the verdict controls movement; the receipt proves the review entered the
> loop.

Stop recording. Do not add an animated outro.

## If something goes wrong on camera

- If initialization fails, stop and restart from a clean checkout; do not repair
  the disposable fixture on camera.
- If the complete three-context session fails, preserve it as failure evidence but
  do not use it as the video's successful-session montage. Fix, reverify, and record
  a fresh attempt from the beginning.
- If a path wraps, widen the terminal; do not shrink the font below readability.
- If the wrong text is pasted, restart the disposable fixture. Do not edit its
  ledger or state to fake the intended output.
- Do not run the full suite on camera. Use the exact saved transcript in Shot 7.
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
