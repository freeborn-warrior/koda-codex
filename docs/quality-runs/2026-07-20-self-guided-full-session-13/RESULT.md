# Quality audit — self-guided full-session entry

**Date:** 2026-07-20  
**Result:** PASS FOR AUTOMATED RELEASE CHECKS; FRESH HUMAN RUN STILL OWED

## Release question

Can a first-time user begin the complete Koda-C workflow from one public command,
remain inside Koda for the operating decisions, and recover without using an
outside chat as a technical courier?

## What now works

- `npm run demo:session` is the single full-session entry.
- It asks for the owner's display name, prints the complete bounded prompt, and
  offers `1. Confirm and continue` or `2. Cancel`.
- It prepares a fresh project, ten repository-local skills, a local Git upstream,
  an initial pushed commit, and an immutable pushed launch confirmation.
- It verifies the exact launch before opening Guide.
- Guide receives Producer and Reviewer staffing at entry. Its saved numbered launch
  choice is handled by the trusted controller: `1` opens Reviewer then Producer;
  `2` changes nothing.
- The managed Reviewer owns all session conversation and presents numbered owner
  decisions. Producer remains visible and input-closed.
- The nontechnical Quick Start explains what each window is for, what the user will
  see, and how to stop or recover. The command manual records every lower-level
  command's caller, effect, and refusal behavior without making it the default path.

## Evidence

- Focused controller and starter tests pass.
- The complete named suite passes **241/241**.
- A real prepared project is clean, equals its local `origin/main`, contains the
  complete skill set, and passes `guide verify`.
- The test maps Guide choice `1` through the real launch command with a fake window
  adapter and observes exactly Reviewer then Producer; choice `2` opens nothing.
- Coverage is **86.68% lines, 71.47% branches, and 85.59% functions**.

## Honest boundary

Automated tests do not prove a person finds a live model's latency, wording, or
terminal choreography intuitive. Earlier attempts proved that component correctness
is insufficient. Koda-C is not represented as recording-ready until Kristian runs
this exact single-command path from a fresh owner perspective. Any new confusion is
a product defect or documentation defect to record, not a reason to coach around
the product from another chat.

## Verdict

The repository now has a coherent complete-session entry instead of a set of
correct but fragmented commands. It is ready for the final fresh human rehearsal,
not yet for claiming that rehearsal passed.
