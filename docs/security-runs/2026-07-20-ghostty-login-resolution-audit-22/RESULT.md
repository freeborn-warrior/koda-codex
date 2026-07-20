# Security audit 22 — absolute Ghostty role command

**Date:** 2026-07-20  
**Result:** LOCAL PASS; CONTAINMENT PRESERVED

## Security question

Does changing Ghostty's role token from project-relative to absolute permit command
substitution, path escape, or broader data access?

## Result

No. Koda builds the absolute path itself from the verified project runtime and
refuses unless the result remains beneath `<project>/.koda/runs/`. Ghostty receives
one executable token after `-e`, not a shell expression or loose role arguments.

The change does not alter:

- mode-700 launcher creation and regular-file checks;
- changed, linked, or concurrently replaced launcher refusal;
- `env -i` child startup and the role environment allowlist;
- credential and parent-context stripping;
- Reviewer-before-Producer readiness;
- duplicate and partial-launch refusal.

## Adversarial evidence

- A named login-resolution mutation proves the superseded relative command resolves
  away from the project after a directory change.
- Both current absolute role commands remain unchanged under the same mutation.
- Each returned command is an existing mode-700 file below the exact run directory.
- Focused Guide, Quick Start, role-security, and integrity slice: **82/82 passed**.
- Complete local suite: **245/245 passed**.
- Unchanged post-push suite: **245/245 passed**.

The fresh owner-visible Ghostty launch remains a separate product proof.
