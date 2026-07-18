# Reviewer fixture result — 2026-07-18 — planted-hard-number — terra — medium — 01

- Status: RUN_FAILED
- Date: 2026-07-18
- Fixture: planted-hard-number
- Model variant: gpt-5.6-terra
- Effort: medium
- Verdict: NOT RUN
- Expected behavior: sealed in the source fixture metadata; not evaluated because Codex could not initialize
- CATCH score: NOT RUN
- VERDICT score: NOT RUN
- False positive: not evaluated
- Secondary execution observations: desktop sandbox denied Codex state-database initialization
- Review path: none
- Codex event log: [`CODEX-EVENTS.jsonl`](CODEX-EVENTS.jsonl)
- Stderr: [`CODEX-STDERR.txt`](CODEX-STDERR.txt)

The desktop workspace sandbox allowed writes inside the fixture but denied Codex CLI access to its state database under `.codex`, so the in-process client could not initialize. No task or model turn began and no review was written. A new fixture copy must be prepared and executed with the required Codex state permission; this failed run remains evidence and is not reused.
