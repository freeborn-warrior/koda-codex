# Bounded Guide startup — development failures

**Date:** 2026-07-20

This record preserves the failures found while repairing the owner-observed Guide
startup. No gate, receipt, or security test was weakened to create the final pass.

## Trigger

During a screen recording, Guide spent several minutes inspecting project evidence
and then printed `GUIDE CLOSED SAFELY — readline was closed`. The terminal returned
to the shell without explaining whether the Guide turn or persistent context had
survived. The saved turn later showed 821,942 input tokens and broad archive reads.

## Deterministic development failures

- The first new focused test could not import `guideStartupPrompt`; this was an
  expected red test before the bounded prompt existed.
- After the first implementation, **10/13** Guide tests passed. The integrity seal
  correctly refused changed launch files before the new subprocess cases could run.
- With provisional local hashes, **11/13** passed. One visibility assertion still
  required the old no-status presentation, and closed input exposed an unsettled
  top-level await.
- After adding an explicit preflight, **12/13** passed. Node did not observe terminal
  EOF until the input stream was consumed.
- Adding an input-lifecycle watcher produced **13/13**. Updating the local Guide skill
  then correctly made the integrity seal refuse three subprocess tests until its
  new hash was present; the combined Guide/skill slice subsequently passed **24/24**.

## Real-model failures and correction

- The first automated real smoke attempt was blocked by the desktop task sandbox:
  the Codex app-server client returned `Operation not permitted`. This was a test
  environment refusal, not a Koda pass.
- The first permitted Sol/medium run proved the new progress heartbeat but exposed
  another product flaw: Guide tried to execute `koda guide status` inside the model
  sandbox. The same command took under one second in the trusted controller but the
  model-side operation held the turn for about 191 seconds.
- Koda now runs status in the trusted controller before every Guide turn and supplies
  the exact output as a JSON-escaped, explicitly untrusted data string. The model is
  told not to rerun it.
- The corrected Sol/medium startup resumed the same context, performed seven bounded
  checks, displayed a 30-second heartbeat, returned to `guide>` in about 41 seconds,
  and closed cleanly with `q`. No archive scan, state mutation, new session, Producer,
  or Reviewer was created.

## Audit setup failure

The first package-summary parser expected npm's stdout to contain only JSON. The
package `prepack` build correctly printed its own line first, so parsing failed with
`Unexpected token 'B'`. The corrected parser located npm's JSON result after the
build output; no package rule or file list was changed.

## Corrected local state

- Focused Guide, skill, security, and integrity slice: **42/42 passed**.
- Complete durable suite: **238/238 passed**.
- Coverage suite: **238/238 passed**; **87.04% lines, 71.55% branches, and 85.74%
  functions** overall.
- Real Sol/medium startup: bounded pass with visible progress and clean close.
