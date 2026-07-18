# Installed-style demo rehearsal — 2026-07-18

- Result: **PASS**
- Node: v26.0.0
- Platform: darwin arm64
- Working copy binary: `/Users/freeborn/Dev/koda-codex/dist/cli.js`
- Disposable project: `/tmp/koda-demo-final.8iw3PL`

The disposable project was initialized with `--demo`. Koda printed an `advance` command pointing to the built plain-JavaScript binary. Executing it produced:

```text
GATE CLOSED — BRIEF
✗ The current review receipt has not been quoted into the approval ledger.
Nothing advanced.
```

Koda printed this interactive recovery command:

```text
'/opt/homebrew/Cellar/node/26.0.0/bin/node' '/Users/freeborn/Dev/koda-codex/dist/cli.js' 'approve' 'brief' '--approver' 'Owner'
```

The command prompted for the exact final `RECEIPT:` line from the review. After that line was entered, Koda recorded the approval and printed:

```text
'/opt/homebrew/Cellar/node/26.0.0/bin/node' '/Users/freeborn/Dev/koda-codex/dist/cli.js' 'advance'
```

Executing that command verbatim produced:

```text
GATE OPEN — BRIEF
✓ Advanced with artifact, review, APPROVE, and exact receipt proof.
Next phase: orient
Write the artifact: docs/sessions/2026-07-18-01/phases/02-orient.md
```

The disposable project is not product evidence and is not committed. This result record, the automated tarball test, and the demo source fixture are the durable evidence.
