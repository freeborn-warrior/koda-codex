# Codex permission instantiation — development record

**Date:** 2026-07-20  
**Current result:** LOCAL PASS; PUSHED PROOF PENDING

## The second owner-observed refusal

After an earlier repair was described as successful, the real Guide still closed:

```text
Error loading config.toml: data did not match any variant of untagged enum FilesystemPermissionToml
```

The owner did nothing wrong. No Guide context, Producer, Reviewer, receipt, or
phase advancement was created.

## Why the green proof was false

The first repair used `codex --version` as its installed-client preflight. That
command accepted the surrounding CLI arguments but did not instantiate the named
filesystem permission profile. The repair also serialized special paths as quoted
dotted keys. When Codex's real sandbox parser loaded the profile, those keys were
not interpreted as the intended `:minimal` and `:workspace_roots` entries.

The complete 242-test suite passed because its fake Codex process reproduced the
same shallow contract. The tests proved Koda called Codex, not that Codex could
deserialize and apply the profile. Calling that fixed was incorrect.

## Correction

1. Serialize the complete filesystem value as a TOML inline table with explicit
   whitespace and quoted table keys.
2. Keep the same least-privilege policy: Guide read-only except named continuity
   writes; session roles project-write; `.git`, `.agents`, and `.codex` read-only;
   environment files denied; trusted runtime paths explicitly read-only; network
   disabled.
3. Before project creation, execute the installed Codex CLI's offline sandbox path
   for both generated profiles: `codex sandbox -P <profile> -- /usr/bin/true`.
   This starts no model and makes no network request, but it must deserialize and
   apply `FilesystemPermissionToml`.
4. Make the Quick Start integration fixture reject the quoted-dotted form and
   require both actual sandbox/profile invocations.
5. Keep every exact integrity hash check, but collapse fixed public runtime-code
   groups into bounded read-only permission roots so the Guide's dynamic TOML value
   stays below a tested 2,000-byte ceiling. Do not grant the toolkit root, all of
   `docs`, `.koda`, home files, or sibling projects.

## Evidence so far

- Installed Codex CLI: **0.144.6**.
- Actual offline Guide profile instantiation: **exit 0**, 1,078-byte permission
  argument.
- Actual offline session-role profile instantiation: **exit 0**, 409-byte
  permission argument.
- The newly added bounded-root and size-ceiling regressions pass in the focused
  Guide, security, Quick Start, and integrity suite.
- Complete local suite: **244/244 passed** in the
  [named transcript](2026-07-20-codex-permission-instantiation-bounded-local.md).
- The [installed-client transcript](2026-07-20-codex-permission-instantiation-installed-cli.md)
  preserves the Guide-only oversized failure and the final two-profile pass.
- The exact no-model full-session starter repeated those checks and reached a
  clean, locally pushed `READY — FULL SESSION` project.

This is stronger automated evidence than the failed `--version` check. It is not
called a live Guide pass: the remaining networked model connection still belongs to
the fresh owner-visible run.
