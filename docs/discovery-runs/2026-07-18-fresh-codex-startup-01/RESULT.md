# Fresh Codex startup discovery — 2026-07-18 — Sol low — 01

- Status: PASS
- Model: `gpt-5.6-sol`
- Effort: low
- Context: fresh ephemeral Codex task with user configuration ignored
- Sandbox: read-only
- Tool calls: none
- Repository file reads: none
- Koda-C skills discovered from startup context: 9 of 9
- Root `AGENTS.md` guidance discovered from startup context: PASS
- Raw events: [`CODEX-EVENTS.jsonl`](CODEX-EVENTS.jsonl)
- Stderr: [`CODEX-STDERR.txt`](CODEX-STDERR.txt)

## Skills reported

1. `koda-c-brief`
2. `koda-c-close`
3. `koda-c-live`
4. `koda-c-orient`
5. `koda-c-plan`
6. `koda-c-produce`
7. `koda-c-review`
8. `koda-c-session`
9. `koda-c-summary`

## Guidance reported

The fresh task stated that repository-local skills must remain under `.agents/skills/` and Koda-C skills must not be installed globally while developing this project. That rule exists in root `AGENTS.md`; it was not supplied in the test prompt.

## Why this is discovery evidence

The prompt named no expected skill, no expected count, and no expected guidance text. It explicitly prohibited tools and repository reads. The event stream contains only one model message and no command, file-read, or file-change events. The response therefore came from startup-injected skill and repository guidance context rather than directory inspection performed during the task.
