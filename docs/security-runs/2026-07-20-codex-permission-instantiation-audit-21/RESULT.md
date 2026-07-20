# Security audit 21 — Codex permission instantiation

**Date:** 2026-07-20  
**Result:** POST-PUSH PASS; POLICY PRESERVED AND ACTUALLY INSTANTIATED

## Security question

Does making the installed Codex parser accept Koda's profiles broaden access or
replace enforcement with a syntax-only check?

## Result

No policy was broadened. The corrected serialization preserves:

- Guide workspace read-only access except named Guide continuity writes;
- session-role project write access;
- read-only `.git`, `.agents`, and `.codex`;
- denied matching environment files;
- explicit read-only trusted toolkit, Codex executable, and Node toolchain paths;
- disabled network and web search;
- disabled login shell, ambient user config/rules, and approval escape.

The new preflight uses the installed `codex sandbox -P` path, not a version or help
command. It starts no model and performs no network request. `/usr/bin/true` runs
only after Codex deserializes the named profile and applies the macOS sandbox.

The Guide permission argument remains below 2,000 bytes by collapsing only fixed
public code groups to read-only roots. It does not grant the Koda toolkit root, all
of `docs`, `.koda`, another project, or ordinary home files. The full integrity
verifier still hashes every exact manifest entry before those roots are returned.

## Adversarial coverage

- The fake installed client rejects the old unspaced inline value.
- It rejects quoted dotted filesystem keys.
- It requires one Guide and one role sandbox invocation with the correct profile.
- Primary configuration stderr remains owner-visible and sanitized.
- Full security and product suite: **244/244 passed**.
- The [installed-client proof](../../test-results/2026-07-20-codex-permission-instantiation-installed-cli.md)
  records the Guide-only oversized failure and final two-profile exit-0 result.

## Remaining boundary

Offline profile application is now proved. A fresh owner-visible Guide model turn
is still required before claiming the full human launch passes.
