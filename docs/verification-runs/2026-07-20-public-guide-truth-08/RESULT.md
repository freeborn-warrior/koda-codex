# Public guide truth and Koda-C naming

**Status:** POST-PUSH PASS — PROMOTED AS `public-guide-truth-v23`

## Owner contract

- The product name in prose is **Koda-C**.
- The lowercase executable remains `koda`.
- Current guides must describe the workflow a new user can actually run.
- macOS may be named as the only personally tested platform, but must not be
  misrepresented as a filesystem requirement.
- The reference phase skills must be distinguished from Koda-C's invariant gate.

## Defects found

1. Current documentation and user-facing runtime messages contained bare “Koda.”
2. `docs/DEMO.md` said final owner-observed completion was still pending after the
   fresh July 20 session had completed all six phases.
3. `docs/GHOSTTY-TEST-GUIDE.md` presented a July 19 recovery state as current
   onboarding rather than historical development evidence.
4. No compact public document explained which parts of the six-phase process are
   reference method and which mechanics remain invariant across projects.
5. The automated Ghostty demo's macOS requirement could be mistaken for a core or
   filesystem requirement.

## Resulting public path

The root README now opens with a direct map to:

- Quick Start;
- Process;
- Commands;
- Security; and
- License.

Quick Start is the only current onboarding route. Path A proves the headless gate
with Node.js and Git. Path B runs `npm run demo:session`; macOS is required only
for its optional automatic Ghostty window adapter. The historical Ghostty file is
retained as evidence but explicitly tells first-time users not to follow it instead
of Quick Start.

`docs/PROCESS.md` defines project, session, phase, the shipped reference chain,
the shared Reviewer role, invariant gate mechanics, and project-adaptable skills,
artifacts, criteria, staffing, and phase configuration. It does not claim the
future project-profile generator already exists.

## Verification

- Built the dependency-free `dist/` output from changed sources.
- Ran the committed CLI and Guide help; both use Koda-C and list the current verbs.
- Ran the real packaged-binary and tarball tests.
- Ran the exact no-window full-session preparation through the same restricted
  Guide and Producer profiles used by the Quick Start.
- Checked current public documents for bare product naming.
- Resolved every local link in the judge and entry guides.
- Passed the focused release slice **26/26** twice.
- Passed the complete suite **253/253**.
- Preserved two complete local transcripts, including the final
  [253/253 result](../../test-results/2026-07-20-public-guide-truth-final-local.md).
- `git diff --check` passed and every provisional toolkit file hash matched disk.

The complete suite's mutation, adversarial receipt, stale review, status truth,
printed command, security, package, concurrency, recovery, and full-session tests
remain present. No gate condition was weakened.

## Pushed proof

Commit `1d95af04e27a904679e61fe3baac06d9d64c148b` exactly matched
`origin/main` before the unchanged complete suite ran. All **253/253** tests passed
in the [post-push transcript](../../test-results/2026-07-20-public-guide-truth-pushed.md),
SHA-256
`c5fb7c6be73b090a52aa77b67634ac30b112c6012c3a346bb01e0a6222f6b1c0`.

Toolkit capability `public-guide-truth-v23` binds that exact commit, transcript,
count, and protected file set. A final release regression after this promotion is
kept as a separate proof rather than inferred here.

The first focused promotion run passed **28/31** because `verifiedAt` named the
promotion moment instead of the transcript's exact recorded time. Koda-C refused
Quick Start and both permission-path checks by name. The field was corrected to
`2026-07-21T03:15:22.013Z`; the verifier and tests were not changed.
The corrected focused run passed **31/31**, and the complete promoted local
[release suite](../../test-results/2026-07-20-public-guide-truth-release-local.md)
passed **253/253**.
