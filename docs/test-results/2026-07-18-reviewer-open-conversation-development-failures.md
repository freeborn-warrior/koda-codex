# Open Reviewer conversation — development failures

**Date:** 2026-07-18

## Shared-skill trigger exceeded its context budget

The first focused run passed 20/21. Both new runtime tests passed, including the adversarial active-direction case, and the inherited separate-process relay still completed through pushed close. The only failure was the existing skill-index guard: expanding the shared reviewer's trigger description made it 244 characters, over the repository's 220-character progressive-disclosure limit.

No limit or behavioral assertion changed. The first shortening was still 229 characters and the next focused run correctly failed the same single guard while every runtime test passed again. The wording was tightened a second time to the same four modes within budget. The body retains the complete entry, job, and handover boundaries for owner conversation.

## First pseudo-terminal harness could not acquire a terminal

After the pipe-driven runtime tests passed, a macOS PTY check was added for the real `reviewer> ` input path. Its first run passed 13/14. `/usr/bin/script` exited before Koda started because Node's test runner exposes its captured input as a socket and BSD `script` requires a terminal for `tcgetattr/ioctl`.

The product was unchanged. The PTY fixture now uses the installed `/usr/bin/expect`, which allocates the child terminal directly, waits for the real prompt, sends one owner line, and waits for clean process exit.

The first Expect run still failed before Koda started. The macOS Expect 5.45 `spawn` command does not accept the `--` option separator used by the fixture; it printed `bad flag "--"` while its Tcl program still exited zero, leaving captured stdout empty. The platform-specific launcher was corrected to `spawn <node> <script>`. The prompt, question, clean-exit, and non-mutation assertions were retained unchanged.
