# Quality audit 17 — bundled full-session prompt contract

**Date:** 2026-07-20  
**Result:** POST-PUSH PASS; FRESH OWNER RUN OWED

## Product failure

The advertised one-command demo reached three windows but not a Koda session. A
known relationship contradiction had been corrected in an earlier one-off prompt
and then reappeared in the reusable demo template.

The previous Quick Start test ended at window requests. That was not the same user
journey the README promised and was too shallow to authorize another recording.

## Correction

- The bundled first prompt declares the independent launch it actually receives.
- Guide rejects explicit kind, relationship, or dependency disagreement before
  confirmation and before any role windows open.
- Quick Start consumes the real bundled prompt through one actual session open.
- The opened session must contain a binding to the exact confirmed Guide launch.
- The failed owner attempt is discarded, not recovered into a cleaner story.

## Current evidence

- Named prompt/launch mismatch mutation: pass.
- Exact bundled prompt → session open → Guide binding: pass.
- Focused Guide and Quick Start slice: **47/47 passed**.
- Expanded Guide, Quick Start, real/plural runtime, security, and integrity slice:
  **68/68 passed**.
- Complete local suite: **246/246 passed**.
- Unchanged post-push suite: **246/246 passed**.
- Promoted release suite: **246/246 passed**.

Fresh owner-visible proof remains open.
