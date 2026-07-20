# Owner review ceremony security audit 16

**Date:** 2026-07-20  
**Scope:** Managed Guide, Reviewer, and Producer terminal output; inline review
acknowledgement; package contents; dependency metadata; preserved verification
session safety.  
**Result:** LOCAL PASS — PUSHED INTEGRITY PROOF PENDING

## Security-relevant changes

- The managed Reviewer no longer starts an external pager, reads or writes the
  system clipboard, or asks the owner to paste a receipt.
- It prints the human-facing review inline, hides protected machine metadata, and
  derives an eight-character display code from the current complete receipt.
- A matching current code causes the trusted controller to pass the complete exact
  receipt to the unchanged deterministic CLI over stdin. The short code never
  replaces the ledger receipt or weakens byte-literal gate validation.
- A wrong code, an old review's valid code, an empty code, or a review changed after
  display writes no ledger entry and advances no gate.
- Guide, Reviewer, and Producer now share one terminal renderer. It removes C0/C1
  controls other than line breaks and tabs, plus Unicode bidirectional
  override/isolate characters, before display. Evidence bytes on disk are not
  changed.

## Adversarial evidence

- A code derived from another review refuses and leaves the Reviewer job at
  `AWAITING_OWNER` with zero ledger writes.
- A planted review containing escape, bell, and bidirectional controls prints none
  of those controls, retains every original byte on disk, and still records the
  exact current receipt through the core gate.
- Full-receipt adversarial tests still cover stale, cross-phase, changed-word, and
  blocking-verdict cases. The mutation suite still breaks one gate condition at a
  time and requires the named refusal.
- Receipt and owner ruling data remain absent from child-process arguments,
  environment variables, model messages, and rendered progress logs.

## Verification

- Focused Guide/Reviewer/security/integrity suite: **48/48 passed**.
- Complete deterministic suite: **232/232 passed**.
- Coverage: **87.70% lines, 71.45% branches, 86.24% functions** overall; shared
  terminal renderer **100%**.
- Package dry-run: 1,036,827 compressed bytes; 4,977,358 unpacked bytes; 809
  entries; zero bundled dependencies.
- Real tarball contains GPLv3, README, compiled CLI, and local skill files; it
  excludes `.git`, `.koda`, `.env`, `.DS_Store`, `node_modules`, and nested
  tarballs.
- Isolated production lockfile audit: zero known vulnerabilities at every severity.
- `git diff --check`: passed.
- `git fsck --full --no-dangling`: passed.

The first temporary audit-copy attempt addressed `package.json` relative to the
temporary working directory and failed because that file was not there. The
explicit repository path succeeded. No product file or test changed during that
setup failure.

## Honest boundaries

- The receipt and short code show explicit engagement with the review ceremony;
  neither proves cognition or comprehension.
- Eight hexadecimal characters are a usable binding token, not a secret,
  authentication factor, signature, or hostile-user security boundary. The core
  persisted proof remains the complete receipt and review hash.
- Hashes and Git history detect inconsistency but are not signatures. A malicious
  same-user repository/controller replacement remains outside Koda's guarantee.
- Display sanitization covers Koda's managed renderer, not arbitrary model output
  printed outside it or arbitrary terminal applications.
- Ghostty remains optional. Its window adapter does not enlarge the core gate's
  trust claim.
- The preserved live verification project was not opened, edited, approved, or
  advanced during this audit.

The next required proof is to push the exact audited implementation, run the
unchanged complete suite against that pushed commit, and bind the transcript and
critical file hashes in `docs/toolkit-integrity.json` before human recovery.
