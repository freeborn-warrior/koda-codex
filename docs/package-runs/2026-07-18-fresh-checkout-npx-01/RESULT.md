# Fresh-checkout local npx proof — run 01

- Date: 2026-07-18
- Repository: `https://github.com/freeborn-warrior/koda-codex.git`
- First tested commit: `4d0b959b83d87abe133edbdb9714bcc42b405b8b`
- Platform: macOS arm64
- Node: `v26.0.0`
- Command: `npx --yes . --help`
- Current result: **REVISE — corrected public re-check pending**

## What happened

A new shallow clone needed no dependency installation and printed the complete
Koda help successfully. The command nevertheless changed the tracked mode of
`dist/cli.js` from `100644` to `100755`. That makes the checkout dirty and fails
Koda's stronger no-hidden-setup claim.

The source correction makes the binary executable in the build and in Git. Two
permanent package checks now require the executable state and prove that the
exact local command cannot change the copied package source. The complete local
suite passes 81/81 in
[`2026-07-18-clean-local-npx-final.md`](../../test-results/2026-07-18-clean-local-npx-final.md).

The result remains REVISE until the correction exists on the public branch and
the same shallow-clone command leaves that checkout clean. The failed attempt is
kept beside the future corrected attempt rather than overwritten.
