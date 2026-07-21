# Build Week branded silent picture-lock verification 07

**Date:** 2026-07-20

**Verdict:** PASS — the genuine owner session has a verified, branded silent
picture lock at 2:23.967. English voiceover, final audio mux, full playback with
sound, and public upload remain owner-facing submission work.

## Bound source

- Untouched recording:
  `.koda/video/koda-c-full-session-original-2026-07-20.mov`
- Editing duplicate:
  `.koda/video/koda-c-full-session-edit-source-2026-07-20.mov`
- Both SHA-256:
  `b4a2f0627d3ce951f052769e2eaf656958d96f2d2d8428e241bc43b46d56c3fc`
- Source duration: `1839.541667` seconds (`30:39.542`)
- Source geometry: `3024×1964`
- Source audio: none

The duplicate remained byte-identical to the untouched recording throughout the
edit. Generated media stayed inside the ignored `.koda/video/` workspace.

## Verified picture lock

- File: `.koda/video/koda-c-build-week-picture-lock-v04.mp4`
- SHA-256:
  `12383dab0b780d3d9e8c82d2f75a7b1b970bd17b67835269e8af3ff9d2e880f4`
- Duration: `143.966667` seconds (`2:23.967`)
- Size: `21,345,511` bytes
- Codec: H.264 High, `2560×1440`, 30 fps, `yuv420p`
- Playback color metadata: BT.709 limited range
- Streams: one video stream; no audio, subtitle, or other stream

## Branded visual system

The overlays follow the supplied Prylar/Prata design direction without copying
an external artwork or layout:

- [Schibsted Grotesk](https://github.com/schibsted/schibsted-grotesk) for
  display text and [JetBrains Mono](https://www.jetbrains.com/lp/mono/) for
  evidence/time labels; both official sources permit use under the SIL Open Font
  License 1.1;
- dark surfaces `#1A1D22`, `#25282E`, and `#3D4047`;
- Koda-C's single saffron accent `#DDB073`, with the dark saffron wash `#36312A`;
- sentence-case interface copy, exact `Koda-C` naming, hairline frames, crosshair
  registration marks, and a two-pixel corner-radius cap;
- the same saffron language for both `REVISE` and `APPROVE`, so verdicts do not
  become a competing red/green brand system.

The unrelated macOS menu/status bar is masked for the full edit. Launch and
return frames preserve the real role window while replacing exposed desktop
wallpaper with the documented Koda-C background. No stock imagery, borrowed
artwork, background music, environment dump, notification, or credential was
introduced.

## Editorial truth

The cut remains one continuous real `npm run demo:session` execution. It shows
Guide launching separate persistent Producer and Reviewer contexts, all six
phases, the unstaged Orient `REVISE`, the exact unsupported inference, Producer
correction, a fresh review, owner acknowledgement, deterministic work, live
evidence, pushed immutable close, and return to Guide. The refusal and corrected
acknowledgement run at readable speed; accelerated sections carry phase and
source-session time labels.

## Official-rule coverage

| Requirement | Verified state |
|---|---|
| Under three minutes | PASS — `2:23.967`; audio may not extend the picture. |
| Clear product demo | PASS — one genuine session is visibly running; this is not a slide presentation. |
| What was built | PASS in the timed script: workflow, roles, files, verdict, receipt, gates, and example output. |
| How Codex and GPT-5.6 were used | PASS in the timed script: Codex engineering, Sol Producer, Terra Reviewer, and sealed Sol/Terra/Luna reviewer tests. |
| No third-party trademarks or unlicensed copyrighted material | PASS for picture: no unrelated brand or logo, music, stock imagery, or borrowed artwork; both typefaces are OFL-1.1 licensed and unrelated desktop chrome is masked. |
| Functions as depicted | PASS — every runtime event is bound to the preserved successful launch and pushed evidence. |
| Audible English narration | PENDING — mandatory before the public export can be called complete. |

## Checks performed

- The live [Devpost rules](https://openai.devpost.com/rules) and
  [OpenAI Build Week page](https://openai.com/build-week/) were checked again on
  2026-07-20 before finalizing the coverage table.
- Full-file decode to a null sink completed with no error.
- Media inspection confirmed duration, size, codec, profile, geometry, frame
  rate, pixel format, BT.709 tags, and the absence of an audio stream.
- An 18-frame contact sheet sampled the complete edit every eight seconds.
- Full-resolution launch, live `REVISE`, fresh `APPROVE`, Guide return, and ending
  frames were inspected.
- A first branded candidate was retained as v03 after visual QA found a narrow
  exposed wallpaper strip beside Guide. The strip was removed in v04, which was
  rendered, decoded, sampled, and inspected again. No test or claim was weakened.
- The timed English voiceover contains 316 words, about 132 words per minute over
  2:24. Its exact count is informational; the spoken claim uses “over two hundred
  and fifty checks” so later legitimate suite growth cannot stale the audio.

## Remaining submission boundary

This result does not call the public video complete. Kristian still needs to
record the narration and safety take from
[`VIDEO-SCRIPT.md`](../../VIDEO-SCRIPT.md). The selected take must then be
normalized, muxed without music into a new export, watched from beginning to end
with sound, checked on phone speakers, uploaded publicly, and verified while
signed out.
