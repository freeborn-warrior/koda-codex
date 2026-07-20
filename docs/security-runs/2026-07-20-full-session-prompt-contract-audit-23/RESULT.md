# Security audit 23 — prompt/launch semantic binding

**Date:** 2026-07-20  
**Result:** LOCAL PASS; NO ACCESS BOUNDARY EXPANSION

## Integrity question

Can an owner-confirmed prompt describe one session relationship while the trusted
launcher opens another?

## Result

For every explicit structured handover field present in a Guide prompt, Koda now
compares the declared session kind, relationship, and ordered dependency IDs with
the computed launch request during confirmation and again during verification.
Mismatch refuses before launch evidence or role windows can be trusted.

The validator reads only the already bounded prompt bytes. It adds no executable,
filesystem, network, model, Git, or environment capability. Existing hash, push,
containment, role separation, receipt, and gate checks remain unchanged.

## Adversarial evidence

- A first-session prompt deliberately says `continuation` while the computed mode
  is `independent`.
- Confirmation refuses with both declared and computed modes in the reason.
- No launch file is written.
- The corrected bundled prompt opens exactly one bound independent session.
- Expanded Guide, Quick Start, real/plural runtime, security, and integrity slice:
  **68/68 passed**.

Complete and post-push regression remain required before human handoff.
