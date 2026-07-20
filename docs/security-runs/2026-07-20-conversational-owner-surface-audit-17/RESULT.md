# Conversational owner surface security audit 17

**Date:** 2026-07-20

**Scope:** Phase-aware event rendering, final-answer-only owner conversation,
Reviewer skill integrity, package contents, repository hygiene, and unchanged gate
enforcement.

**Result:** PUSHED PASS WITH STATED BOUNDARIES

## Security properties preserved

- Display suppression is not evidence deletion. Complete Codex JSONL and stderr
  records remain project-local on disk; the human surface only removes repetitive
  successful command narration.
- Failed command executions remain visible. Koda cannot turn a failed check into a
  reassuring aggregate pass.
- Raw command text is withheld from the ordinary terminal surface, reducing
  accidental path or argument disclosure. This is presentation hardening, not a
  secrecy boundary; authorized project evidence still contains the diagnostic
  event.
- Final Reviewer answers pass through the existing receipt redactor and terminal
  control/bidirectional-character sanitizer before display.
- A Reviewer conversation that emits no final answer refuses by name. It cannot be
  recorded as a successful empty interaction.
- Formal review hashing, exact receipt validation, blocking verdicts, owner
  acknowledgement, waiting-direction binding, stale-review refusal, and immutable
  pushed close are unchanged.
- The repository-local `koda-c-review` skill is now a critical file in the toolkit
  integrity manifest. Skill drift invalidates launch proof instead of silently
  changing owner-facing behavior.

## Verification

- Complete deterministic and adversarial suite: **234/234 passed**, twice.
- Coverage: **87.75% lines, 71.44% branches, 86.14% functions** overall.
- Repository symlink scan: none found.
- `git diff --check`: passed.
- `git fsck --full --no-dangling`: passed.
- Isolated production package audit: zero vulnerabilities at every severity.
- Package dry-run: 1,234,384 compressed bytes, 5,244,660 unpacked bytes, 814
  entries, and zero bundled dependencies.
- Package contains GPLv3, root README, compiled CLI, local Reviewer skill, and the
  intentional one-minute demo fixture. It excludes `.git`, `.koda`, `.env`,
  `.DS_Store`, `node_modules`, and nested package artifacts.
- The unchanged pushed candidate passed **234/234** from commit `975678e`. Toolkit
  capability `conversational-owner-surface-v14` binds its transcript and critical
  Guide, Producer, Reviewer, renderer, permission, and skill bytes.

The first direct `npm audit` invocation refused with `ENOLOCK` because the source
repository intentionally has no lockfile. An isolated temporary copy then generated
a production-only lockfile without scripts and reported zero vulnerabilities. The
failed setup changed no repository file and is part of the audit record.

## Honest boundaries

- Concise output is not proof that the underlying model used sound reasoning. The
  review artifact, cited evidence, mutation tests, and gate remain the proof surface.
- Project-local event files may contain detailed diagnostic material. They are
  evidence for the repository owner, not sanitized public telemetry.
- Terminal sanitization covers Koda-managed rendering. It does not make arbitrary
  commands or unrelated terminal applications safe.
- Hashes detect changed bytes but are not signatures. A malicious same-user
  replacement of the repository or controller remains outside Koda's guarantee.
- The short review code and receipt show explicit engagement with the ceremony;
  neither proves cognition or comprehension.
