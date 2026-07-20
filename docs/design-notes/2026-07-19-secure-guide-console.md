# Secure persistent Guide console

**Date:** 2026-07-19
**Status:** implemented locally; pushed binding and owner recovery observation pending

## Decision

Koda-C opens its long-lived Guide through `koda guide open`, backed by repeated
`codex exec` / `codex exec resume` turns rather than a raw interactive `codex -C`
window. The user receives one ordinary `guide>` conversation. Koda saves the
context ID and raw events inside the project and resumes that same Guide later.

This is still a workflow, not a model wrapper. Codex supplies the Guide judgment;
Koda supplies the durable context binding, permissions, disk preflight, and narrow
trusted actions.

## Authority split

- The Guide model may read the project and write only `docs/guide`, configured
  continuity files, and exact Guide claims.
- Active session paths, Git metadata, project instructions/config, `.env`, parent
  files, network, ambient user config/rules, and approval escalation stay outside
  its authority.
- Koda's controller writes `.koda/guide` state and performs a mechanically eligible
  numeric session recovery. `1` acts; `2` preserves the pause. Ambiguous targets
  refuse instead of using recency.
- Producer and Reviewer remain separate persistent contexts. Opening Guide never
  opens either session role.

## Why not raw interactive Codex

The tested Codex CLI can apply strict named permission profiles to non-interactive
`exec` turns and can ignore both user config and user/project command rules. The raw
interactive entry did not offer the same controlled automation flags in the tested
version. Repeated exec turns therefore create the honest boundary while preserving
one context through `resume`.

This follows the current official Codex permission and command-rule documentation:
[permissions](https://learn.chatgpt.com/docs/permissions) and
[rules](https://learn.chatgpt.com/docs/agent-configuration/rules).

## What the live probe changed

The real runtime, not the fake integration, found three implementation defects:

1. `--color` was placed after `exec resume`; real Codex rejected it.
2. Git tried to read blocked global user configuration before reporting local truth.
3. The trusted Koda CLI could execute but could not read its exact integrity proof.

Koda corrected the option order, supplies a no-global/no-system Git environment to
model children, and derives exact read-only toolkit files from the verified
integrity manifest. The same Guide context then passed the boundary probe and the
end-to-end console test. Failures and corrections are preserved in the testing and
security records.

## Honest remainder

The current trusted numeric action handles saved session recovery, which is the
next owner test. A complete future-session publisher must similarly turn Guide
confirmation, exact-path Git publication, staffing resolution, and launch into
plain owner choices without handing broad Git authority to the Guide model. That
larger ceremony is not falsely claimed complete here.
