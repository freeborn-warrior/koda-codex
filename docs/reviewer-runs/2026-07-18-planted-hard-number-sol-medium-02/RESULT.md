# Reviewer fixture result — 2026-07-18 — planted-hard-number — sol — medium — 02

- Status: RUN_FAILED
- Date: 2026-07-18
- Fixture: planted-hard-number
- Model variant: gpt-5.6-sol
- Effort: medium
- Verdict: NOT RUN
- Expected behavior: sealed in the source fixture metadata; not evaluated because the model request was refused
- Caught/missed: not evaluated
- False positive: not evaluated
- Review path: none
- Codex event log: [`CODEX-EVENTS.jsonl`](CODEX-EVENTS.jsonl)
- Stderr: [`CODEX-STDERR.txt`](CODEX-STDERR.txt)

Codex created a fresh ephemeral thread, then the service refused `gpt-5.6-sol` because Codex CLI 0.139.0 was too old. No model turn completed and no review was written. The CLI was upgraded to 0.144.6 before preparing a new run; this failed run remains evidence and is not reused.
