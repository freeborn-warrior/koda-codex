# Security audit 20 — installed Codex permission profile

**Date:** 2026-07-20  
**Result:** PASS; LEAST-PRIVILEGE INTENT PRESERVED

## Security question

Does correcting the Codex configuration format weaken the Guide, Producer, or
Reviewer boundary?

## Result

No permission was broadened. The correction changes serialization, not policy:

- Guide workspace root remains read-only except named Guide continuity files.
- Session roles retain only their intended project write boundary.
- `.git`, `.agents`, and `.codex` remain read-only to model commands.
- matching environment files remain denied;
- trusted toolkit, executable, and toolchain paths remain explicit read-only roots;
- network remains disabled;
- ambient user configuration and rules remain ignored;
- approval escalation and login shells remain disabled.

Each rule is now passed as an individual dotted configuration override. The
installed Codex CLI 0.144.6 parsed both profiles successfully. The starter performs
that parser check before any persistent target is created, so a future incompatible
Codex version fails early and names its own error.

## Regression evidence

- The test fixture refuses any argument containing the obsolete `filesystem={`
  form.
- Both Guide and role preflights must appear in the fixture log.
- A process that exits with a configuration error before emitting a context ID must
  show that primary error and must not claim only that an identifier is missing.
- Full security and product suite: **242/242 passed**.

## External boundary

An attempted real Guide model turn from the build task was denied because it would
send local project context to an external Codex service without separate explicit
authorization. The denial was honored. No policy bypass or indirect execution was
attempted.
