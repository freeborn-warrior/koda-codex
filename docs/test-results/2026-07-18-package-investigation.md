# Package investigation — 2026-07-18

- Result: **DEFECTS FOUND AND CORRECTED**
- Node: v26.0.0
- Platform: darwin arm64
- Scope: real npm tarball installation and installed printed-command execution

## Attempt 1 — incorrect tarball invocation

Running a packed `.tgz` as though it were the executable caused npm to try to execute the archive and fail with a permission error. This was a test-command error, not a product result. The rehearsal was corrected to install the tarball as a package and invoke its `koda` binary.

## Attempt 2 — installed native TypeScript

The corrected form was:

```text
npm exec --yes --package=<tarball> -- koda --help
```

It exposed a product defect: the package's binary pointed into TypeScript source. Node's native type stripping does not operate on TypeScript under `node_modules`, so the installed CLI failed before showing help.

## Correction 1 — plain-JavaScript package binary

`prepack` now builds every `src/*.ts` file into dependency-free plain JavaScript under `dist/`, and the package binary points to `dist/cli.js`. The installed help command then passed.

## Attempt 3 — stale printed source suffix

The installed demo initialized successfully, but a recovery hint still printed `dist/cli.ts`. The build transformed import specifiers but had missed the literal `new URL("./cli.ts", import.meta.url)` path used by command printing.

## Correction 2 — printed installed path

The build now rewrites local `.ts` path literals as well as import specifiers. The package test creates a real tarball, installs it through `npm exec`, runs `koda --help`, initializes a demo project, extracts the exact printed `dist/cli.js advance` command, executes it, and asserts the expected named gate refusal.

The corrected automated result is recorded per test in [2026-07-18-packaged-recovery-command-final.md](2026-07-18-packaged-recovery-command-final.md).
