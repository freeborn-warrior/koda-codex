# Owner steps — three-window verification

**Current state:** verified launch `bf91c29d-a7a3-4cd5-8118-80b186d7a790` is
committed and pushed. No runtime, model, session, or Ghostty role window exists.

## Step 1 — open Guide

Open one new Ghostty window. Paste this entire command as one line and press
Return once:

```bash
codex -C "/Users/freeborn/Dev/koda-codex/.koda/verification-projects/2026-07-19-markdown-headings-01/project" -m gpt-5.6-sol -c 'model_reasoning_effort="medium"' 'Act as this project’s persistent Guide. Read the repository guidance and explicitly use koda-c-session-prompt. Reconstruct truth from disk, run node /Users/freeborn/Dev/koda-codex/dist/cli.js guide status, report the exact verified launch ID and whether it is safe to launch, then wait for Kristian. Do not prepare a runtime, open Ghostty windows, create a session, or alter project files.'
```

This opens only Window G. If Codex asks whether you trust the project, choose the
option that trusts this project. Do not type a launch command at the Codex prompt.
Wait until Guide reports status, then tell Codex what it said or paste the visible
message back to the current Koda-C conversation for the next single step.

## What must not exist after Step 1

- no Reviewer window;
- no Producer window;
- no Koda session;
- no runtime preparation;
- no model acting as Producer or Reviewer.

Later steps are intentionally withheld here until Step 1 is observed. Kristian
receives one action at a time; recovery depends on the state that actually appears.
