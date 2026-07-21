# Build Week silent picture-lock verification 06

**Date:** 2026-07-20

**Verdict:** PASS — the real owner session has a verified silent 2:24 picture
lock. English voiceover, final audio mux, full playback with sound, and public
upload remain owner-facing submission work.

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
edit. All generated material stayed under this repository's ignored
`.koda/video/` workspace.

## Picture lock

- File: `.koda/video/koda-c-build-week-picture-lock-v01.mp4`
- SHA-256:
  `5ed9539f73f994f5d82c3eca3776b1b338488a7c9cff94de61eeaac69529e014`
- Duration: `143.966667` seconds (`2:23.967`)
- Size: `23,258,774` bytes
- Codec: H.264 High, `2560×1440`, 30 fps, `yuv420p`
- Playback color metadata: BT.709 limited range
- Streams: one video stream; no audio, subtitle, or other stream
- Container metadata: ordinary MP4 compatibility and encoder fields only;
  ReplayKit author and source creation-time metadata are absent

## Editorial truth

The cut uses one continuous real session rather than a staged fixture or a
collection of unrelated successes. It preserves:

1. Guide launch into separate persistent Reviewer and Producer contexts;
2. all six configured phase labels;
3. the unplanned Orient `REVISE` at readable speed;
4. the review's exact unsupported-claim finding;
5. Producer correction and a genuinely fresh review;
6. corrected `APPROVE` and the owner acknowledgement ceremony at readable speed;
7. deterministic Produce work and saved Live evidence;
8. commit, push, immutable close, and return to Guide.

Every accelerated section is labeled with its phase and source-session time.
The title states `30:39 → 2:24`. The refusal and corrected acknowledgement remain
at real time instead of being flattened into the montage.

## Checks performed

- The complete picture-lock file decoded to a null sink with no error.
- Media inspection confirmed the duration, geometry, codec, frame rate, pixel
  format, BT.709 tags, stream count, and removed source metadata.
- A full contact sheet sampled the cut every eight seconds.
- Dedicated full-resolution frames inspected the opening, live `REVISE`, fresh
  `APPROVE`, immutable close, and final Guide verification.
- The opening and closing mask the irrelevant local home path in macOS window
  chrome. The three role windows, model assignments, review findings, phase
  labels, and on-disk result remain visible.
- No environment dump, credential, notification, unrelated terminal history, or
  protected machine-only review metadata was found in the sampled frames. The
  final full playback remains a required human check before public upload.
- The timed voiceover in [`VIDEO-SCRIPT.md`](../../VIDEO-SCRIPT.md) contains
  324 words: exactly 2:24 at 135 words per minute, with natural overlap allowed
  across adjacent phase captions.

## Remaining submission boundary

This result does not call the public video complete. Kristian still needs to:

1. record the English narration and one safety take;
2. place the untouched audio inside `.koda/video/`;
3. let the edit bind, normalize, and mux that audio to a new final export;
4. watch the complete export from beginning to end with sound;
5. verify speech timing, text legibility, and phone-speaker intelligibility;
6. upload publicly to YouTube and verify playback while signed out.

The narration and edit contract are in
[`docs/VIDEO-SCRIPT.md`](../../VIDEO-SCRIPT.md). No synthetic voice or invented
session event was added by this verification.
