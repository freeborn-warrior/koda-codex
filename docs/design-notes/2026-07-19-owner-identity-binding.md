# Owner identity belongs to the launch

**Date:** 2026-07-19

## Finding

The Guide launch already recorded `confirmedBy`, but the later relay ignored it.
Several runtime messages, prompts, and approval commands instead named Kristian
directly. That was appropriate for historical evidence about this project and wrong
for reusable product behavior: another owner could confirm a launch and still see
Kristian addressed in their Reviewer window and recorded in their approval ledger.

## Decision

The personal quality is worth preserving. Koda should address an owner by the name
that owner chose, not make every experience anonymous. The source of truth is the
immutable Guide confirmation:

1. `koda-c-session-prompt` resolves the owner's display name from project guidance,
   an earlier verified launch, or explicit Guide conversation. If none exists, it
   asks once and never guesses the toolkit author's identity.
2. `koda guide confirm --owner <name>` binds that name to the launch.
3. New version-2 runtime state copies the bound name into `RUN.json`.
4. Status, safe-pause messages, recovery, and deterministic approval all use that
   runtime binding. The approval ledger therefore records the confirming owner.

The owner name is attribution, not authentication. Koda still cannot prove who is
at the keyboard. It can prove that the same disk-bound attribution flowed through
the launch and receipt ceremony.

## Compatibility and safety

The preserved owner-observed retry is a version-1 runtime created before this field
existed. Version 1 remains readable and maps to Kristian, which is the only identity
the shipped legacy relay ever recorded. New runtimes require version 2 plus a
non-empty owner binding; deleting only that field produces a named refusal.

Owner names are trimmed, limited to 120 characters, and may contain no terminal
control characters. This prevents a display name from injecting terminal escape
sequences or additional lines into owner-visible output. The same validation now
protects Guide confirmation, cancellation, and approval attribution.

## Evidence

- A non-Kristian Guide integration runs separate Producer and Reviewer processes,
  closes through the real receipt gate, and records `Ada Owner` in the ledger.
- A Reviewer-window test independently records `Ada Owner` from a version-2 run.
- Removing the version-2 owner binding refuses by name.
- A control-character owner name refuses before any launch directory is created.
- A deliberate version-1 compatibility test preserves the existing paused session.

The first development slice passed 54/55 because its refusal assertion tried to
list the deliberately uncreated launch directory. The product refusal had already
succeeded. Correcting that test to assert the directory is absent produced 55/55;
the complete local suite then passed 213/213 without weakening any gate condition.
