# Test result — launcher context migration development failures

- **Date:** 2026-07-19 (America/New_York)
- **Status:** PRESERVED FAILURES — CORRECTED AND PUSHED
- **Production session mutated:** no

## Human recovery refusal

Kristian selected recovery twice. Both attempts stopped at the unchanged saved
launcher and said `RECOVERY PAUSED SAFELY`; neither wrote a receipt, advanced the
Brief, opened a role, or closed Guide. The full sanitized event and root cause are
preserved in the [verification incident](../verification-runs/2026-07-19-markdown-headings-01/LAUNCHER-CONTEXT-MISMATCH-INCIDENT.md).

## First focused development run

- **Result:** 15 passed, 41 failed, 56 total.
- The new deterministic-launcher security test passed. Every Guide failure named
  the expected development condition: `src/ghostty.ts` no longer matched the prior
  pushed integrity seal.
- After rebuilding and refreshing only the four changed source/distribution hashes,
  the unchanged Guide/security slice passed **56/56**. No gate or launcher-tamper
  assertion was removed or weakened.

## Corrected local run

The complete suite passed **230/230**. It now includes fixed launcher bytes across
host terminal environments, exact legacy-shape acceptance, malicious script-path
refusal, two-launcher prevalidation, atomic replacement, migration hash evidence,
and the existing arbitrary-tamper refusal.

Coverage passed **230/230** at **87.70% lines, 70.84% branches, and 85.94%
functions** overall. The dependency-free package dry-run passed at 994,236
compressed bytes, 4,750,526 unpacked bytes, 794 files, and zero bundled
dependencies. An isolated production lockfile audit found zero vulnerabilities.
Whitespace, tracked-symlink, and reachable-object checks passed.

Repair commit `461824b` reached `origin/main`, then the unchanged complete suite
passed **230/230** in the
[pushed transcript](2026-07-19-deterministic-launcher-migration-pushed.md).

During evidence assembly, the focused submission/security/integrity run passed
**19/20**. The one refusal named an obsolete judge-path assertion still requiring
the prior 229-check README link after the new 230-check proof was promoted. The
assertion was advanced to require the stronger current proof; no product, gate, or
security condition was relaxed.

The next complete run passed **229/230** and exposed a genuine role-lock publication
race: under load, status could observe the prior lock directory before its
`OWNER.json` existed. Role ownership now publishes complete bytes atomically through
a no-clobber same-filesystem link while continuing to read the legacy directory
shape held by the live Reviewer. The first focused run of that repair passed
**19/20** because its new regular-file assertion omitted the `lstat` import. Adding
the missing import changed no product or refusal condition.

The corrected role-protocol slice passed **20/20**, the combined
Guide/role/security/integrity slice passed **81/81**, and the complete and coverage
suites each passed **230/230**. Coverage is **87.60% lines, 70.93% branches, and
86.04% functions** overall. The dependency-free package dry-run passed at 1,001,772
compressed bytes, 4,782,431 unpacked bytes, 795 files, and zero bundled dependencies.
