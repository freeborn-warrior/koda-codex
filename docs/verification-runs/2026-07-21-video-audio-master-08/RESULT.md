# Build Week narration master — result 08

**Date:** 2026-07-21  
**Status:** MECHANICAL PASS — OWNER PLAYBACK OPEN

## Scope

Fit Kristian's twelve interval-named English Voice Memos to the existing silent
2:24 picture lock, create a voice-only audio mix, mux a candidate submission file,
and verify the result without altering any original recording or picture source.

## Inputs and outputs

- Untouched 30:39 source SHA-256:
  `b4a2f0627d3ce951f052769e2eaf656958d96f2d2d8428e241bc43b46d56c3fc`
- Silent picture-lock v04 SHA-256:
  `12383dab0b780d3d9e8c82d2f75a7b1b970bd17b67835269e8af3ff9d2e880f4`
- Render script SHA-256:
  `68fac7275f2a4b52edbd85f28bec26f54f8aa8e483fdda4e347715d69c983c5d`
- Narration mix SHA-256:
  `aa4f9b997536c88bbb7eddc6ab77bb77bed4d400595fd1a2afac47fd0b922b79`
- Candidate master SHA-256:
  `e0f021c07c8d7f8cf12e8f19d6213cea4684552c2be64ad66f3e3d425ae728f7`

The media and render helper remain inside the ignored repository-local
`.koda/video/` workspace. They are submission production files, not shipped npm
package content. The public repository preserves this result and the narration
contract without publishing Kristian's raw Voice Memos metadata.

## Timing and treatment

Silence detection identified the deliberate room tone at the start and end of
each source part. Those outer silences were trimmed with a small safety margin.
Parts 2, 3, 5, 7, 8, and 9 received time fitting between approximately 2% and
22%; all other speech retained recorded speed. Natural internal pauses were kept.
Each part received a 70 Hz high-pass and light loudness normalization before the
complete voice track received its final loudness pass. No music, stock audio,
synthetic voice, or aggressive noise reduction was added.

## Mechanical result

- Duration: **144.000 seconds**, below the 180-second hard maximum.
- Picture: H.264, 2560×1440, BT.709.
- Audio: AAC LC, stereo, 48 kHz.
- Integrated loudness: **-16.3 LUFS**.
- Loudness range: **3.3 LU**.
- True peak after AAC encoding: **-1.3 dBFS**.
- Full audio/video decode: **PASS**.
- Decoded-frame comparison between picture-lock v04 and the candidate: **IDENTICAL**.
- Final metadata contains standard MP4 container and FFmpeg encoder tags only;
  no Voice Memos UUID, source creation time, author, title, or comment survived.

## Failures retained

1. The first filter expression contained literal continuation characters and
   refused before producing a usable file.
2. The first finite-timeline attempt used an `apad` form that yielded only 0.15
   seconds. It was discarded and replaced with an explicit 143.966667-second
   silent base track.
3. The first full-length render measured -15.5 LUFS but reached +0.3 dBFS true
   peak after AAC encoding. It was rejected. The final finite loudness pass
   measures -16.3 LUFS and -1.3 dBFS true peak.

No source was overwritten during these attempts.

## Open human check

Mechanical analysis cannot judge whether Kristian likes the pacing, edits, or
sound of his voice. Before upload he must watch the candidate from beginning to
end with sound, confirm every spoken section is complete and intelligible on
ordinary speakers, and either approve it or name exact timestamps for revision.
