# Markdown heading reporter project guidance

## Purpose

Build one small, inspectable software deliverable through the complete Koda-C
workflow. This is a genuine demonstration project: no phase verdict or revision
path is predetermined.

## Product constraints

- Require Node.js 22.18 or newer and use no package dependency.
- Work only from the owner requirements and evidence committed in this project.
- Keep the input Markdown file unchanged and keep the command entirely offline.
- Preserve source, tests, live output, reviews, receipts, and session evidence
  inside this project.
- Treat setext headings, recursive traversal, standard input, network access,
  publishing, and performance claims as out of scope.

## Koda runtime

- Use the explicit `KODA_SESSION_ID`; never infer the latest session.
- Invoke the matching repository-local Koda skill at every handoff.
- Producer never approves, advances, writes a review, quotes a receipt, or speaks
  directly to the owner after session start.
- Reviewer remains the only owner-facing session context and records every
  actionable handback on disk.
- Direction recorded during a phase waits for the next successful gate. Explicit
  immutable halt is the only interrupt; never pause-inject-resume.
- Session close is true only after its immutable evidence is committed and pushed
  to the configured local demonstration upstream.

## Verification

- Run the real command against saved fixtures.
- Save deterministic checks and raw live evidence in the project.
- Record failures honestly. Never weaken a test to make the run look successful.
