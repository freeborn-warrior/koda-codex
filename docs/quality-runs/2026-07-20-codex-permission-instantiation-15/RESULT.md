# Quality audit 15 — Codex permission instantiation

**Date:** 2026-07-20  
**Result:** LOCAL STARTUP CONTRACT PASSES; LIVE OWNER GUIDE RUN OWED

## Finding

Koda's earlier installed-client preflight was superficial. `codex --version` did
not instantiate a named filesystem profile, so a malformed profile passed every
automated check and then failed in the owner's real Guide window.

## Correction quality

- The generated filesystem policy uses one explicit TOML inline table accepted by
  the installed Codex parser.
- The starter now invokes Codex's offline `sandbox -P` execution path for both the
  Guide and session-role profiles before it creates a demo project.
- The probe starts no model, makes no network request, and executes only
  `/usr/bin/true`; success requires profile deserialization and sandbox application.
- An incompatible profile fails before Git initialization or launch evidence.
- The one-command owner journey gains no extra prompt or manual step.
- The fixture specifically rejects the two serialization forms already shown to
  be misleading or incompatible.
- The permission table has a conservative 2,000-byte ceiling; fixed public code
  groups may compact to read-only roots, but the toolkit root, all of `docs`,
  `.koda`, and sibling projects remain ungranted.

## Evidence

- Installed Codex CLI 0.144.6 instantiated and applied both generated profiles:
  **Guide exit 0; role exit 0**.
- Focused changed slice: **35/35 passed**.
- Complete local suite: **244/244 passed**.
- Exact full-session preparation reached `READY — FULL SESSION` with an isolated
  locally pushed project and no model or Ghostty launch.
- Named evidence:
  [development record](../../test-results/2026-07-20-codex-permission-instantiation-development-failures.md)
  [installed-client proof](../../test-results/2026-07-20-codex-permission-instantiation-installed-cli.md),
  and [local transcript](../../test-results/2026-07-20-codex-permission-instantiation-bounded-local.md).

## Boundary

This proves the exact installed offline configuration path that previously failed.
It does not claim a networked Guide model turn succeeded. That final connection and
human usability remain owner-observed evidence.
