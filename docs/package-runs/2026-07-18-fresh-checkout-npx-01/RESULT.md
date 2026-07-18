# Fresh-checkout local npx proof — run 01

- Date: 2026-07-18
- Repository: `https://github.com/freeborn-warrior/koda-codex.git`
- Failed commit: `4d0b959b83d87abe133edbdb9714bcc42b405b8b`
- Corrected commit: `6ed7d4470c51119bfd3ec341d404b006c15a5085`
- Platform: macOS arm64
- Node: `v26.0.0`
- Command: `npx --yes . --help`
- Final result: **PASS after a preserved REVISE**

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

After commit `6ed7d44` was pushed, a second new shallow clone recorded
`dist/cli.js` as executable before npm ran. The exact command printed Koda help,
and both tracked and untracked status were empty afterward. `git diff
--exit-code` and `git diff --cached --exit-code` also succeeded.

The desktop's restricted first invocation could not create npm's normal cache
directory and exited before Koda ran; that infrastructure-only attempt also
left the checkout clean. It is preserved separately and was repeated unchanged
with normal cache access rather than hidden or credited as a product result.

This run now passes. The failed checkout remains beside the corrected checkout
so the public result tells the complete packaging story.
