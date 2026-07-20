# Owner review ceremony incident — pager and clipboard path

**Observed:** 2026-07-20

**Launch:** `6371ade2-3002-42aa-87ab-a613220b7eab`

**Session:** `2026-07-19-02`

**Result:** HUMAN UX FAILURE — GATE REMAINED CLOSED

The recovered Reviewer returned to the same approved Brief review and persistent
context. The owner-facing ceremony still failed as a usable product experience.

The review opened through a terminal pager that reported `terminal is not fully
functional`. Returning from it required undocumented terminal knowledge. Selecting
acknowledgement then depended on an automatically copied long receipt and a second
paste action. Copying terminal output while asking for help replaced that clipboard
value, and Ghostty correctly displayed a safety warning because the replacement
looked like executable terminal text. The owner could not tell which interaction
layer was active or whether Paste would acknowledge the review or execute unrelated
text.

The gate behaved correctly throughout:

- the mismatched paste was refused;
- the approval ledger remained empty;
- the phase remained Brief, 1/6;
- no artifact, review, verdict, or phase was accepted through the failed ceremony;
- the saved owner decision and both model-context identities remained on disk; and
- Guide, Reviewer, and Producer were later closed without advancement.

No credential, receipt value, or screenshot is stored in this repository record.
This is not a successful recovery and must not be represented as one.

## Replacement contract

- The complete human-facing review prints inline in Reviewer. There is no pager,
  `(END)`, `q`, terminal-mode warning, or subprocess reader.
- Protected machine metadata remains on disk but is omitted from the human display.
- A deterministic eight-character review code appears only beneath the displayed
  review. The owner types that code; Koda resolves it to the review's exact full
  receipt and passes that receipt to the unchanged core approval command over stdin.
- The macOS clipboard is neither read nor written. There is no Command-V step or
  paste-safety dialog in the managed acknowledgement path.
- Wrong, empty, old, or changed codes write nothing and remain recoverable.
- The core gate still stores and byte-validates the complete receipt. The short code
  is an owner-interface token, not a weaker ledger format and not proof of cognition.
- Guide, Reviewer, and Producer use one shared terminal design language: bounded
  message panels, blank space between ideas, and numbered choices only where owner
  input is accepted. Producer says `NO ACTION NEEDED — watch only`.

The replacement requires deterministic tests, a complete recorded suite, security
and package review, pushed integrity evidence, and only then another owner test.
