# First-use UX audit 05 — one-key routine flow

**Date:** 2026-07-19  
**Verdict:** LOCAL MECHANICS PASS; HUMAN OBSERVATION STILL REQUIRED

## User contract audited

Routine control should never require Kristian—or a first-time judge—to remember a
command, infer a hidden second step, or type magic words. Free text remains only
where a real conversation or owner direction is intended. The receipt remains an
intentional exact-paste ceremony because removing it would remove the product's
proof boundary.

## Improvements

- Guide now reconstructs visible role health from disk and process locks. It says
  whether Reviewer and Producer are actually running instead of treating “Ghostty
  accepted the request” as success.
- Initial launch is ordered: Reviewer must become ready before Producer is opened;
  Producer must become ready before Guide reports a successful launch.
- Recovery is role-specific. A live role is left alone and only the missing role may
  reopen. Duplicate Producer and Reviewer processes refuse mechanically.
- Active, paused, missing-role, and saved-error states give the owner numbered Guide
  choices. Raw `node`, npm, path, and relay-resume commands are hidden from the
  ordinary owner journey.
- Review-file and clipboard failures no longer end both role processes. Reviewer
  stays at the same decision point and offers numbered retry, back, or safe-stop
  choices.
- Workflow halt uses numbered confirmation instead of requiring the owner to type a
  literal `HALT` token.
- The live status view now names both role processes, including stale lock evidence.

## One-key boundary

Numbered choices cover launch, recover, acknowledge, reread, return, safe stop, and
halt confirmation. Text is still appropriate for:

- speaking with Guide about project direction;
- speaking with Reviewer about the active session;
- entering actual direction when the owner deliberately chooses discussion; and
- pasting the unique receipt after reading the complete review.

The receipt copy/paste cannot honestly become an invisible automatic action: the
gate is specifically proving that the unique review phrase entered the owner's
decision loop. It can be made clearer and retryable, but not removed without
weakening the product.

## Evidence and limits

Deterministic tests pass **204/204** locally. They include real child processes,
pseudo-terminals, process locks, malformed paths, launch-order mutations, and real
single/plural Guide integrations. The corrected coverage suite also passes
**204/204**.

These checks cannot prove that Ghostty's actual window arrangement, macOS permission
dialogs, font size, or wording feel clear to a person. Kristian's preserved live
session therefore remains paused at Brief with zero acknowledgement and zero
advancement until the pushed repair is ready for one fresh observation.
