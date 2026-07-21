# Koda-C Build Week video script

**Picture-lock target:** 2:24

**Hard maximum:** under 3:00

**Format:** one real 30:39 Koda-C session; speed-ramped rather than uniformly
accelerated; Kristian's English voiceover is fitted to the unchanged picture
lock; no music

## Source truth

- Untouched source: `.koda/video/koda-c-full-session-original-2026-07-20.mov`
- Editing duplicate: `.koda/video/koda-c-full-session-edit-source-2026-07-20.mov`
- Source SHA-256:
  `b4a2f0627d3ce951f052769e2eaf656958d96f2d2d8428e241bc43b46d56c3fc`
- Source duration: 30:39.542
- Source audio: none
- Voice originals: twelve untouched `.m4a` parts under `.koda/video/voice/`, named
  for their intended output intervals from `01-000-008` through `12-134-144`
- Selected narration render: `.koda/video/analysis/render-narration-v02.sh`
- Selected narration mix: `.koda/video/koda-c-build-week-narration-mix-v02.m4a`
- Owner-approved submission master: `.koda/video/koda-c-build-week-submission-v02.mp4`
- Master SHA-256:
  `9d0783aaef627d50cf4080837c3f2fe847a9bf12f2ad4a9729236a0e68e39a4e`
- Master duration: 2:24.000
- Master audio: AAC stereo, 48 kHz, -16.3 LUFS integrated, -1.4 dBFS true peak
- Owner playback: v02 selected on 2026-07-21 as substantially better than v01
- Entry command: `npm run demo:session`
- Guide launch: `e974b805-fac5-4648-a9e2-b66348effa47`
- Koda-C session: `2026-07-20-01`
- Producer: GPT-5.6 Sol / medium
- Reviewer: GPT-5.6 Terra / medium
- Outcome: six phases, seven owner acknowledgements, one unplanned Orient
  `REVISE`, corrected artifact, fresh `APPROVE`, pushed immutable close, and
  return to Guide
- Preserved result:
  [`verification-runs/2026-07-20-owner-full-session-05/RESULT.md`](verification-runs/2026-07-20-owner-full-session-05/RESULT.md)

The `REVISE` was not planted or predetermined. The reviewer found that the
Orient artifact claimed no test suite existed even though its cited evidence
proved only that no implementation existed. The corrected artifact narrowed the
claim to what the files supported and received a fresh review.

## Official-rule coverage

| Requirement | Where this video satisfies it |
|---|---|
| Under three minutes | The verified picture duration is 2:23.967. Narration must fit the existing picture; the export may not add time. |
| Clear demo | The visible material is one genuine `npm run demo:session` execution, including live role windows, a blocking verdict, owner acknowledgement, phase advancement, Git close, and Guide return. It is not a slide presentation. |
| Audio | Kristian's twelve English voice parts are trimmed, pause-compressed, lightly time-fitted, normalized, and muxed into the 2:24 v02 master. Mechanical audio and decode QA pass, and Kristian selected v02 after playback. |
| What was built | 0:16–1:31 explains the plain-file workflow, Guide/Producer/Reviewer roles, evidence, verdict, receipt, gate, correction, and example Markdown heading reporter. |
| How Codex and GPT-5.6 were used | 1:31–1:59 explicitly explains Kristian's role, GPT-5.6 Codex's engineering work, the Sol Producer/Terra Reviewer pairing, and the sealed Sol/Terra/Luna reviewer tests. |
| No third-party trademarks or unlicensed copyrighted material | No unrelated third-party brand or logo is presented. The edit contains no music, stock imagery, or borrowed artwork. Its two typefaces are permitted under the SIL Open Font License 1.1, and the unrelated macOS menu/status bar is masked. |
| Functions as depicted | The recording is bound to launch `e974b805-fac5-4648-a9e2-b66348effa47` and its pushed evidence. The current release still provides that automatic Ghostty workflow. Later runtime work added a separately tested manual-terminal launch surface over the same session, role, evidence, review, and gate contract; it did not turn the recorded behavior into an unavailable path. |

## Edit contract

- Say plainly that this is one real 30-minute session compressed.
- Keep the live `REVISE` and corrected approval/acknowledgement at readable
  speed; compress the other work.
- Never cut a failure so it appears successful.
- Keep phase labels and source-session timestamps visible so acceleration is
  never hidden from the viewer.
- Use the full three-window view to establish Guide, Producer, and Reviewer.
  Crop only when the review text itself is evidence.
- Do not expose protected review metadata or treat the short review code as a
  secret. The code is a usability token; the receipt remains the disk-bound gate
  evidence.
- Strip source metadata from the public export and use standard H.264/BT.709 for
  broad playback compatibility.
- Add only Kristian's narration. No unrelated third-party trademark, music,
  stock imagery, or borrowed visual asset is needed.

## Picture timeline

| Output | Source | Speed | Visible story |
|---|---|---:|---|
| 0:00–0:08 | 00:00–00:16 | 2× | Guide and title: one real 30:39 session |
| 0:08–0:16 | 00:16–01:40 | 10.5× | Guide launches separate Reviewer and Producer contexts |
| 0:16–0:23 | 01:40–03:32 | 16× | Brief → review → gate |
| 0:23–0:29 | 03:32–06:05 | 25.5× | Orient inspects the actual ground |
| 0:29–0:32 | 06:05–06:40 | 11.67× | Reviewer examines Orient |
| 0:32–0:50 | 06:40–06:58 | 1× | Unplanned `REVISE`; gate stays closed |
| 0:50–0:56 | 06:58–09:00 | 20.33× | Producer corrects Orient |
| 0:56–0:58 | 09:00–09:10 | 5× | Fresh review starts |
| 0:58–1:23 | 09:10–09:35 | 1× | Fresh `APPROVE`, owner acknowledgement, gate opens |
| 1:23–1:31 | 09:35–12:50 | 24.38× | Plan |
| 1:31–1:43 | 12:50–19:00 | 30.83× | Produce and deterministic checks |
| 1:43–1:51 | 19:00–23:25 | 33.13× | Live evidence |
| 1:51–1:59 | 23:25–27:00 | 26.88× | Summary |
| 1:59–2:09 | 27:00–29:05 | 12.5× | Commit, push, immutable close |
| 2:09–2:14 | 29:05–30:20 | 15× | Return to Guide |
| 2:14–2:24 | 30:20–30:39 | 1.95× | Guide verifies the completed session |

## Timed voiceover

The text below is written to leave breathing room inside the 2:24 picture at a
calm conversational pace. Read naturally rather than racing to hit every visual
cut.

### 0:00–0:08 — establish the real demo

> You're watching Koda-C actually run: one real thirty-minute session,
> compressed to two minutes twenty-four.

### 0:08–0:16 — the lived problem

> I'm Kristian. I built it after I once approved work whose review I never read.
> The review existed; it just never entered the decision.

### 0:16–0:32 — the product

> Koda-C is a plain-file workflow—a relay between three roles. Guide holds the
> project; Producer works; Reviewer is the owner conversation. Each phase writes
> evidence to disk. The verdict controls movement, while a receipt proves the
> review entered the decision loop.

### 0:32–0:50 — the unstaged refusal

> This wasn't staged. During Orient, the artifact said no test suite existed,
> but its evidence proved only that no implementation existed. The reviewer
> returned REVISE. The producer stayed blocked. No approval, no receipt, no
> advance.

### 0:50–0:58 — correction

> The producer corrected the claim against cited evidence and handed back a
> fresh artifact. Koda-C required a fresh review.

### 0:58–1:23 — acknowledgement and gate

> Now the reviewer approves the corrected work. I read the review and type its
> eight-character code. The code is not a secret, and it cannot prove
> comprehension. It resolves to the full receipt on disk. Koda-C then rechecks the
> artifact, review hash, verdict, and receipt before the gate opens.

### 1:23–1:31 — the complete session

> Here, the work is a Markdown heading reporter. Plan, Produce, Live, and Summary
> repeat the same handoff.

### 1:31–1:51 — how Codex and GPT-5.6 built it

> This was my first Codex project, built during OpenAI Build Week in roughly
> fifty-one elapsed hours—not a benchmark. I brought the method and product
> decisions. I used GPT-5.6 Codex as the engineer for the CLI, ten skills, relay,
> security boundaries, and over two hundred and fifty checks.

### 1:51–1:59 — models as test subjects

> We tested Sol, Terra, and Luna as reviewers against sealed fixtures. This run
> pairs Sol Producer with Terra Reviewer.

### 1:59–2:09 — immutable close

> At close, session evidence and output are committed, pushed, and reverified
> against Git before Koda-C will call the work done.

### 2:09–2:14 — project continuity

> The pushed result returns to Guide, which now knows where the project stands.

### 2:14–2:24 — final line

> Koda-C: the verdict controls movement; the receipt proves the review entered
> the loop. The discipline lives in the workflow.

## Narration recording

Completed on 2026-07-21 as twelve interval-named Voice Memos. The untouched
recordings remain beside the rendered mix inside the ignored repository-local
video workspace. v02 shortens detected sentence gaps before applying smaller tempo
changes; Kristian selected it over v01 after playback. The steps below remain the
recording contract that produced the source parts.

1. Watch the silent picture once before recording.
2. Record in a quiet room with headphones, no music, and the microphone 15–20 cm
   away. A phone voice recorder is sufficient if the room is quiet.
3. Leave two seconds of room tone before the first line and after the last.
4. Record one complete take, then a second safety take. Do not record line by
   line unless a clean complete take is impossible.
5. Save the untouched voice recording inside `.koda/video/` before editing it.
6. Add light loudness normalization only; do not use aggressive noise removal
   that makes the voice metallic.

## Final export checks

- Duration is below 3:00.
- English narration is intelligible on phone speakers.
- The opening explicitly identifies the footage as Koda-C actually running.
- `REVISE`, the unsupported claim, corrected `APPROVE`, and the gate behavior are
  readable at 1080p.
- The narration explicitly says Koda-C, Codex, GPT-5.6, Sol, Terra, and Luna.
- The source acceleration is disclosed and the real-session timestamps remain
  visible.
- The file contains no credential, notification, unrelated terminal history,
  hidden receipt metadata, source author metadata, unrelated third-party
  trademark, copyrighted music, borrowed graphic asset, or unintended audio.
- The public YouTube URL plays while signed out.
