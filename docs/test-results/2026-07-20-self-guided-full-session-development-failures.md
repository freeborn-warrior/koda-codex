# Self-guided full-session development failures

**Date:** 2026-07-20

This record preserves the failures found while turning the already-proven relay
into a first-time-user path. None was removed from the story by changing a gate or
weakening a test.

## 1. The component suite did not seal the human journey

The gate, receipt, role isolation, recovery, Guide, Ghostty adapter, and a genuine
six-phase session all had direct evidence. They were not joined by one release test
requiring a fresh owner to enter through one command and continue without an
outside command courier. Kristian's recording attempts exposed that omission.

**Correction:** `npm run demo:session` now owns project preparation, prompt
confirmation, pushed local Git setup, Guide opening, and launch staffing. Once
Guide is open, its numbered controller invokes the trusted Reviewer/Producer
launch; no command has to be transported from another chat.

## 2. The first prepared project omitted an empty sessions directory

The initial full-session template copied meaningful files but not an empty
`docs/sessions/` directory. Guide correctly refused because its manifest named a
sessions root that did not exist.

**Correction:** the template carries `docs/sessions/.gitkeep`. The integration test
requires that file and runs `guide verify` in the prepared project.

## 3. The first copy implementation collided with its own target

The first preflight created the destination directory and then tried to copy the
template directory onto it. Node refused with `EEXIST`. No session or Git evidence
was created.

**Correction:** preparation copies the template's contents into the already-created
empty destination. A real temporary-project test now exercises the complete path.

## 4. Toolkit integrity correctly refused changed launch code

Before the new capability was sealed, the existing integrity manifest named older
Guide bytes. The broad suite failed closed instead of silently executing unbound
launcher code.

**Correction:** the new launch surface and first-use documents were added to the
critical-file manifest only after the focused behavior tests passed. The full
241-check transcript is hash-bound by `self-guided-full-session-v16`.

## 5. Preparation initially inherited ambient Git control variables

The starter invoked Git without constraining its environment. A caller's
`GIT_DIR`, `GIT_INDEX_FILE`, or user Git configuration could redirect or alter the
preparation ceremony.

**Correction:** preparation uses `/usr/bin/git`, a project-contained temporary
home, a minimal environment, and explicit repository paths. The integration test
plants hostile `GIT_DIR` and `GIT_INDEX_FILE` values and proves no outside target
is created or changed.

## 6. The first package inspection hit a damaged user npm cache

`npm pack --dry-run --json` refused with `EPERM` because the machine's normal npm
cache contains root-owned files. This was environmental, but it is still part of
the observed release process.

**Correction:** the package inspection was rerun with an isolated disposable
cache. It passed with 840 files, zero bundled dependencies, and no install hook.
The primary Quick Start remains a committed-binary path and never depends on an npm
download or a healthy user cache.

## Result

- Hardened full suite: **241/241 passed**.
- Coverage: **86.68% lines, 71.47% branches, 85.59% functions**.
- Package: **840 files**, zero bundled dependencies.
- Production dependency audit: **0 vulnerabilities**.
- Remaining boundary: a model-free test can prove deterministic preparation and
  controller routing, but only a fresh owner-visible run can prove that the live
  Codex/Ghostty experience is understandable in practice.
