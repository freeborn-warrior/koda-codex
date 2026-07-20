# Owner-observed full-session prompt-contract incident

**Observed:** 2026-07-20 16:08 America/New_York  
**Launch:** `e774b89e-c5f1-4cd9-b9f0-a2af4ee865c0`  
**Result:** FAIL — PRODUCER CORRECTLY REFUSED; NO SESSION CREATED

## What the owner saw

Producer displayed:

```text
RELAY PAUSED SAFELY

The producer turn did not create the one session bound to Guide launch
e774b89e-c5f1-4cd9-b9f0-a2af4ee865c0.
```

## Exact cause

The pushed Guide launch declared `launchMode: independent`. The shipped prompt's
handover declared `Launch relationship: continuation (first session with no
predecessor)`. Producer invoked `koda-c-session`, read both files, and refused to
reinterpret the contradiction.

This was a regression of a known issue. The representative verification prompt had
already been corrected on 2026-07-19, but that fix never reached the later bundled
full-session template and no test compared the two artifacts.

## Disk state

- Runtime status: `PAUSED_ERROR`.
- Producer context: created for one turn, then stopped.
- Reviewer context: not created.
- Sessions: none; only `docs/sessions/.gitkeep` existed.
- Owner acknowledgements: zero.
- Project Git: clean and exactly even with its isolated local origin.
- No phase artifact, review, receipt, approval, advancement, or close existed.

## Resolution boundary

The attempt is discarded because the owner needs a recording from a completely
fresh start. It will not be recovered or represented as a successful session.

The reusable demo prompt is corrected, the Guide core now checks explicit handover
fields against the launch before windows open, and Quick Start now proves actual
session creation and binding. A fresh owner-visible run remains required.
