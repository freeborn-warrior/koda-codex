# Guide continuity development failures and corrections

**Date:** 2026-07-18

These focused runs happened while the Guide continuity state machine was being built. They are preserved separately from the final complete per-test transcripts so the successful result does not erase what the tests found.

## Focused run 1 — filesystem alias defect

Command:

```text
npm run build && node --test tests/guide.test.ts tests/skill.test.ts tests/security.test.ts
```

Result: **17 passed, 2 failed, 19 total.**

Failed tests:

- `GUIDE GIT HANDOVER: a confirmed but uncommitted request refuses launch`
- `GUIDE RELAY: pushed confirmation opens the exact session and records its binding`

Both failures reported every legitimate file as outside the Git repository. The test projects were created through macOS's `/tmp` alias, while `git rev-parse --show-toplevel` resolved to `/private/tmp`. `checkGitFilesPushed` canonicalized the repository root but compared it with non-canonical evidence paths.

Correction: resolve each existing evidence path through `realpathSync` before containment comparison. No assertion changed. The identical focused set then passed **19/19**.

## Focused run 2 — package entry-point regression

Command:

```text
npm run build && node --test tests/guide.test.ts tests/skill.test.ts tests/security.test.ts tests/package.test.ts
```

Result: **22 passed, 1 failed, 23 total.**

Failed test:

- `PACKAGED NPX SUITE: the documented local npx command does not mutate its checkout`

Adding `koda-guide` as a second npm binary made the already-proved `npx --yes . --help` command ambiguous. npm refused with `could not determine executable to run`. This was a public entry-path regression, not a documentation inconvenience.

Correction: preserve one public `koda` executable and expose Guide operations as `koda guide status|confirm|cancel|verify`. The packaging assertion remained unchanged. The corrected focused set passed **23/23**.

## Final adversarial addition

A final threat review found that a linked `docs/guide/bindings` directory could make binding fail only after session creation. The product now preflights that directory before creating session state. A one-condition mutation redirects it outside the project, requires the named refusal, and proves both the session directory and redirected target remain empty. The expanded focused set passed **24/24**.

The threat review then exposed the deeper design issue: a Guide-level binding directory would sit outside the session folder committed by the immutable close ceremony. Before commit, the binding artifact moved to `<session>/guide-launch.json`, where close naturally hashes and pushes it. The redirect attack disappeared with the directory, the test was replaced by corruption/status truth against the session-local evidence, and an explicit `koda guide bind` recovery test now covers interruption between session creation and binding. The older 123-check transcripts remain accurate evidence of the superseded intermediate implementation; the later final transcript is authoritative for the current design.

## Complete results

- Before the binding-directory mutation, the complete suite passed **122/122** in [the first full Guide transcript](2026-07-18-guide-continuity-final.md).
- After the preflight refusal was added, the complete suite passed **123/123** in [the security-final Guide transcript](2026-07-18-guide-continuity-security-final.md).

No gate, receipt, package, relay, or safety assertion was weakened. The two implementation defects were fixed in product code, and the new security condition added a test rather than replacing one.

## Documentation assertion update

After README was updated to cite the new 123-check evidence, the focused skill/submission run passed 9/10. `JUDGE JOURNEY SUITE: video and submission documents preserve every live rule` still required the previous literal `112-check transcript`. The saved 123-check result already existed, so the assertion was strengthened to require the exact new label and result path. No product behavior or submission requirement was removed.

The corrected focused set passed 10/10, the new skill again passed the system validator, and the complete suite passed 123/123 in [the documentation-final transcript](2026-07-18-guide-continuity-docs-final.md).

## Generated-file hygiene correction

The first staged `git diff --cached --check` refused 149 trailing-space lines in the newly generated plain JavaScript. Node's type stripper had replaced interface/type syntax with spaces, and the build preserved those spaces. The build now removes trailing horizontal whitespace from every generated line before writing `dist/`. A rebuild left zero matches, `git diff --check` passed, and the complete suite remained 124/124 in [the build-hygiene transcript](2026-07-18-guide-build-hygiene-final.md).
