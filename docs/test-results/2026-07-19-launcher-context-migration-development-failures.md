# Test result — launcher context migration development failures

- **Date:** 2026-07-19 (America/New_York)
- **Status:** PRESERVED FAILURES — CORRECTED LOCALLY
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
