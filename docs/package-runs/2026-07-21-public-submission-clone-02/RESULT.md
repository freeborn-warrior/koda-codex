# Public submission clone proof

- Date: 2026-07-21
- Repository: `https://github.com/freeborn-warrior/koda-codex`
- Commit: `c918bc0876874fe058505180125701f4c10c4a6f`
- Result: **PASS**

## What was proved

A fresh unauthenticated clone was created outside the development checkout at
`/tmp/koda-public-judge.7h121R/checkout`. It resolved the public `main` branch to
the commit above without relying on the owner's working tree.

From that clone, the committed `dist/cli.js` printed help without installation or
rebuilding. A generated demo project then exercised the documented mechanical
path: the first advancement refused because the current review receipt was absent
from the ledger; entering the exact receipt through the printed approval route and
running advancement again opened the Brief gate and activated Orient.

The clone remained clean afterward. A later read-only recheck on 2026-07-21 still
resolved the same commit and returned an empty short Git status.

## Boundary

This proves public repository access and the no-build deterministic judge path.
It does not prove the separate Codex/Ghostty full-session experience, which has its
own preserved owner-visible result and recording.
