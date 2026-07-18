# Reviewer fixture result — 2026-07-18 — planted-hard-number — sol — medium — 01

- Status: RUN_FAILED
- Date: 2026-07-18
- Fixture: planted-hard-number
- Model variant: gpt-5.6-sol
- Effort: medium
- Verdict: NOT RUN
- Expected behavior: sealed in the source fixture metadata; not evaluated because Codex never started
- Caught/missed: not evaluated
- False positive: not evaluated
- Review path: none
- Codex event log: [`CODEX-EVENTS.jsonl`](CODEX-EVENTS.jsonl)
- Stderr: [`CODEX-STDERR.txt`](CODEX-STDERR.txt)

The Codex CLI rejected `-a never` because that global option was placed after the `exec` subcommand. No model request began and no review was written. The executor was corrected to place `--ask-for-approval never` before `exec`; this failed run remains evidence and is not reused.
