# Owner review ceremony UX audit 10

**Date:** 2026-07-20

**Scope:** First-time human comprehension across the visible Guide, Reviewer, and
Producer terminal windows.

**Result:** MECHANICAL PASS — OWNER OBSERVATION PENDING

## Failure being repaired

The preserved owner run reached a valid APPROVE Brief, but its ceremony crossed too
many terminal interaction layers: an external pager, hidden `q`, a clipboard write,
a second paste step, and Ghostty's paste-safety warning. The owner could not tell
where input belonged or what one action would do. Koda correctly refused the bad
paste and moved nothing, but safe failure alone was not a usable product.

## Current interaction contract

- All three visible roles use the same separator, spacing, title, and message
  boundaries.
- Guide and Reviewer use numbered choices only when they accept owner action.
- Producer never displays a fake choice; it explicitly says
  `NO ACTION NEEDED — watch only` at every owner-free wait.
- Reviewer prints the complete review in its own window. There is no reader mode,
  `(END)`, `q`, clipboard operation, Command-V step, or paste warning.
- The owner reads normally, chooses `1. ACKNOWLEDGE`, and types the visible
  eight-character review code. Questions, rereading, safe stop, and permanent halt
  are distinct numbered choices with consequences.
- Wrong input changes nothing and remains at an actionable numbered choice.
- Handoffs name the receiving role, current phase, disk artifact, and whether the
  owner needs to act.
- Model progress, refusals, interruptions, recovery, halt, and completion return to
  the same visual language instead of dropping into raw prose.

## Deterministic evidence

- Complete Guide/Reviewer/Producer window slice: **33/33 passed**.
- Real-project/interruption/security slice: **18/18 passed**.
- Final focused Guide/Reviewer/security/integrity slice: **48/48 passed**.
- Complete product suite: **232/232 passed**.
- The test matrix covers real pseudo-terminal entry, valid code, wrong code, another
  review's valid code, reread, discussion, waiting direction, halt, recovery,
  interruption, pushed close, and all three role surfaces.

## What this proves and what it does not

The tests prove the implemented text, choices, disk effects, retries, and security
properties. They cannot prove that a first-time person understands the experience.
The exact implementation is pushed at `c1d55ea`, its unchanged 232/232 transcript
is integrity-bound, and Kristian may now reopen the same unacknowledged Brief to
judge the actual Ghostty experience.

That observation must not be staged as success. A confusing instruction, duplicate
window, hidden interaction layer, unexpected exit, or unclear role remains a product
failure even if the gate safely refuses.
