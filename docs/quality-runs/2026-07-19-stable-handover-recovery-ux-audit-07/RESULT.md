# First-use UX audit 07 — stable handover and optional terminal adapter

**Date:** 2026-07-19  
**Verdict:** PUSHED DETERMINISTIC FLOW PASS; OWNER OBSERVATION PENDING

## Product boundary

Ghostty is not Koda-C. Koda-C is the file-backed workflow, separate Producer and
Reviewer contexts, review/receipt gate, and session ceremony. The Ghostty code is an
optional macOS adapter that can open those visible contexts automatically. A user may
instead open the windows manually and start the bound roles; the same files and gates
remain authoritative.

The adapter receives extra scrutiny because it is currently the advertised
first-use convenience path and because the live test exposed launch, credential, and
recovery failures there. That scrutiny must not turn one terminal application into a
product prerequisite.

## Owner journey now covered

At any stable owner decision—not only the original Brief incident—Guide can inspect
which visible seats still exist and offer only:

1. reopen the session safely;
2. not now.

The owner does not select a run, role, path, model command, receipt, or recovery
command. Koda binds the exact Reviewer job, opens only missing roles, restores
Reviewer before Producer, and checks that each reaches the existing decision point.

If a requested window fails to become ready, the later role stays closed. Returning
to Guide presents the same small recovery choice again; a recovery attempt does not
become a new dead end. If the Reviewer job changed, Guide refuses and names the
binding problem rather than guessing which decision the owner meant.

## Evidence and honest limit

- Focused Guide suite: 39/39.
- Complete deterministic suite: 210/210.
- Coverage suite: 210/210 at 89.08% lines, 69.65% branches, and 86.65% functions.
- The live verification project remained untouched at its existing Brief decision.
- Development failures are preserved in the
  [development record](../../test-results/2026-07-19-stable-handover-recovery-development-failures.md).
- Repair commit `93efd1a` reached `origin/main`; its unchanged
  [210-check transcript](../../test-results/2026-07-19-stable-handover-recovery-pushed.md)
  is bound by toolkit capability `ghostty-stable-handover-recovery-v8`.
- The complete current-document and manifest regression passed 210/210.
- Evidence commit `83bc605` reached `origin/main`; the post-push Guide, security,
  submission, and toolkit-integrity slice passed 53/53.
- The shipped Guide then reconstructed the preserved live project read-only and
  displayed exactly `1` reopen only the missing Producer / `2` not now. It exposed
  no role command and launched nothing.

Mechanical tests prove state classification, minimal choices, job binding, opening
order, readiness refusal, and retry. They cannot prove that Ghostty feels clear,
places windows well, avoids an unforeseen macOS dialog, or that a first-time human
understands the full six-phase ceremony. Kristian's continued session remains the
required human evidence.
