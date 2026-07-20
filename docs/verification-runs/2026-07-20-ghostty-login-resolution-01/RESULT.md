# Owner-observed Ghostty login-resolution incident

**Observed:** 2026-07-20 at 15:21 America/New_York  
**Launch:** `b6e50ec4-ddd8-400e-a734-10ba12a28f21`  
**Result:** FAIL — REVIEWER DID NOT START; PRODUCER WITHHELD

## What Kristian saw

The opened window was titled `Koda-C Reviewer — b6e50ec4` and displayed:

```text
login: launch-reviewer.sh: No such file or directory

Ghostty failed to launch the requested command:

/usr/bin/login -q -flp freeborn ./.koda/runs/b6e50ec4-ddd8-400e-a734-10ba12a28f21/launch-reviewer.sh
```

The supplied HEIC screenshot has SHA-256
`76a1adb8f00ac1c4b04fe06976cd599064c33dbfc448af657cb0c02396caf65a`.
The screenshot itself remains owner-held and is not copied into the public repo.

## Disk state after refusal

- Guide context `019f80f9-3e6d-7d41-9e1c-b99ebe549004` remained open and ready.
- Runtime status remained `PREPARED`.
- Reviewer thread ID: null.
- Producer thread ID: null.
- Runtime error: Reviewer did not become ready; Producer was not opened.
- `docs/sessions/` contained only `.gitkeep`.
- The isolated project was clean and exactly synchronized with its local origin.
- No review, receipt, acknowledgement, gate advancement, or session artifact was
  created.

## Cause

Koda intentionally handed Ghostty one launcher token, but made it project-relative.
Ghostty then invoked macOS `/usr/bin/login`, which changed directory before command
resolution. The separate `--working-directory=<project>` option did not make the
relative `-e` command survive that login boundary.

The automated test had required the same broken relative form. Its fake opener did
not reproduce the login wrapper, so green tests falsely reinforced the defect.

## Correction and present boundary

Koda now passes one absolute launcher token and verifies it is contained inside
the project's `.koda/runs/` directory. Both role launchers remain mode 700 and keep
the existing clean-environment and content-integrity protections. A named mutation
proves the old relative token changes meaning after a directory change while the
new absolute Reviewer and Producer tokens do not.

This record does not claim a fresh Ghostty window launch passed. That human-visible
proof remains owed after complete and post-push verification.
