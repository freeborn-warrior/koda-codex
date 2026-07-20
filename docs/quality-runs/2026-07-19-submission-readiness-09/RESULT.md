# Submission-readiness UX audit

- **Date:** 2026-07-19 (America/New_York)
- **Pushed commit tested:** `eed2084fc80b86855ab9b3fbf03d584945409905`
- **Scope:** first repository contact, no-build demo, package install, judge links,
  current claims, and remaining human submission work
- **Active verification session touched:** no
- **Verdict:** MECHANICALLY READY; HUMAN REHEARSAL AND SUBMISSION REMAIN

## Literal judge path

A new public HTTPS clone completed without credentials. Its `HEAD` exactly matched
`origin/main` at the commit above. From that clone:

1. `node dist/cli.js --help` ran without installing or rebuilding anything.
2. `node dist/cli.js init <temporary-path> --demo` created a disposable fixture.
3. The printed `advance` command produced `GATE CLOSED — BRIEF` and `Nothing advanced.`
4. The complete final review receipt was entered through the printed approval
   command; Koda recorded it without supplying it to the owner.
5. The next printed `advance` command produced `GATE OPEN — BRIEF` and activated
   `orient`.
6. The public checkout remained byte-clean after the external fixture and after
   the package/security/judge test slice.

The fresh clone's package, security, license, and judge-document checks passed
**19/19**. Its real tarball installed and ran `koda`, initialized a demo, and
proved the refusal without relying on TypeScript execution.

After the judge-facing documents and audit records were assembled, the complete
local suite passed **230/230** and wrote the
[named transcript](../../test-results/2026-07-19-submission-readiness-final.md).

## Experience defects found and corrected

- **No root landing page:** GitHub and npm had no root README even though the
  competition explicitly asks the README to explain installation, testing, and
  Codex collaboration. The new root page leads with the receipt distinction,
  gives the exact one-minute path, states platform support and limitations, and
  routes to the deeper evidence.
- **Stale public totals:** The checklist still said 210 tests and the video script
  still narrated 179. Both now say 230 and link to the bound post-push transcript.
- **Demo coupled to npm cache health:** The literal `npx --yes . init` path stopped
  before Koda on this machine because its global npm cache contains root-owned
  entries. The primary demo now uses the already-committed JavaScript binary.
  Real tarball/npx behavior remains separately tested instead of being hidden.
- **Outdated reviewer description:** The demo still called Window B an interim
  reader. It now distinguishes the proved two-context relay, current persistent
  Guide/Reviewer runtime, and still-pending owner-observed recovery honestly.

## What a judge can understand without operating the full relay

- The problem and new primitive are visible in the first screen of the root README.
- The core refusal and successful advance take about one minute and invoke no model.
- The genuine six-phase relay, unplanned `REVISE`, model matrix, security boundary,
  failed first-use incidents, and current 230-check evidence are directly linked.
- Ghostty is explicitly optional. The visible three-context adapter is not allowed
  to become a prerequisite for understanding or testing the disk gate.

## Remaining human work

- Kristian performs the preserved live-session recovery after the final code is
  loaded, then completes or honestly stops that human verification.
- Kristian rehearses and records the under-three-minute video, runs `/feedback` in
  the primary build task, fills the Devpost fields, checks the public preview, and
  submits before the deadline.
- The root README should receive one final visual check in GitHub's rendered view.

Those items require owner presence or external submission authority. They are not
represented as completed by this audit.
