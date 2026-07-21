# Build Week narration master — result 09

**Date:** 2026-07-21  
**Status:** OWNER-APPROVED MASTER — PUBLICATION OPEN

## Owner selection

Kristian reviewed both rendered versions and selected v02 as sufficient and
substantially better than v01. v01 remains untouched as a mechanically valid
fallback; v02 is the submission master.

## Editorial change from v01

v02 applies silence-first fitting. After outer room tone is trimmed, pauses at
least 250 ms long are shortened to 150 ms before tempo changes are calculated.
This preserves a detectable natural pause while reducing acceleration:

| Part | v01 tempo | v02 tempo |
|---|---:|---:|
| Lived problem | 1.1843× | 1.1069× |
| Product explanation | 1.2197× | 1.1455× |
| Correction | 1.0212× | 1.0000× |
| Complete session | 1.0469× | 1.0000× |
| Codex and GPT-5.6 | 1.1119× | 1.0252× |
| Model tests | 1.1135× | 1.0936× |

All other parts remain at recorded speed in both versions.

## Selected files

- Render helper: `.koda/video/analysis/render-narration-v02.sh`
- Audio mix: `.koda/video/koda-c-build-week-narration-mix-v02.m4a`
- Master: `.koda/video/koda-c-build-week-submission-v02.mp4`

SHA-256:

- Render helper:
  `4302f4b40aaa269e99be5dca213262bb0fc197b459573a36129952526487af30`
- Audio mix:
  `926c56d4e461d7d58bb22f9f0927efd15b5ace79302b9614e73a10257d2ade29`
- Master:
  `9d0783aaef627d50cf4080837c3f2fe847a9bf12f2ad4a9729236a0e68e39a4e`

The ignored repository-local media workspace keeps the original Voice Memos,
both candidates, and both render helpers together. Raw Voice Memos metadata is not
published in the repository or carried into the selected master.

## Mechanical checks

- Duration: **144.000 seconds**, below the 180-second hard maximum.
- Picture: H.264, 2560×1440, BT.709.
- Audio: AAC LC, stereo, 48 kHz.
- Integrated loudness: **-16.3 LUFS**.
- Loudness range: **3.1 LU**.
- True peak after AAC encoding: **-1.4 dBFS**.
- Full audio/video decode: **PASS**.
- Decoded-frame comparison with picture-lock v04: **IDENTICAL**.
- Final metadata contains standard MP4 container and FFmpeg encoder tags only;
  no Voice Memos UUID, source creation time, author, title, or comment survived.
- The complete repository suite, including the exact master filename, hash,
  duration, loudness, peak, and owner-selection assertions, passed **264/264** in
  [`../../test-results/2026-07-21-owner-comments-local.md`](../../test-results/2026-07-21-owner-comments-local.md).

## Remaining external actions

Upload this exact v02 master to YouTube, verify public signed-out playback, place
the URL in Devpost, and preserve the submission receipt. Those are publication
actions, not further media editing requirements.
