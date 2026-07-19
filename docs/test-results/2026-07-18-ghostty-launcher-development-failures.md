# Ghostty launcher — development failures

**Date:** 2026-07-18

These failures are preserved because the CLI experience and its tests are product behavior, not disposable scaffolding.

## Top-level help hid the new launch path

The first focused run after the deterministic Ghostty adapter passed 25/26. The adapter tests, real-project relay, and package checks passed. The failure was the built-binary journey assertion: `node dist/cli.js --help` did not contain `--open ghostty` because the top-level help still listed only `guide <status|confirm|cancel|bind|verify>`. Nested `koda guide --help` knew about `launch`, but a new human could not discover it from the CLI entrance.

The assertion was not removed or redirected. Top-level help now includes `guide launch` and its opt-in Ghostty route. The generated distribution is rebuilt from source before the corrected run.
