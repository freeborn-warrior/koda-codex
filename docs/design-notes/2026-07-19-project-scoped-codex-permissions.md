# Project-scoped Codex permissions

**Date:** 2026-07-19
**Status:** implemented for Koda-managed Producer and Reviewer turns; Guide UX remains open

## Question

Can Koda honestly say that a Codex CLI role cannot act outside the project?

Not under the legacy `workspace-write` preset. That preset is a strong write
boundary, but it is not a project-only read boundary. It also does not by itself
express the external tools that a working project needs.

## Decision

Koda-managed Producer and Reviewer turns use a named Codex permission profile:

- the active workspace root is readable and writable;
- `.git`, `.agents`, and `.codex` are read-only;
- `**/*.env` below the project is denied;
- `:minimal` system paths are read-only;
- the exact compiled Koda directory and its package manifest are read-only;
- the exact installed Codex executable is read-only;
- the current Node toolchain root is read-only;
- network and web search are disabled;
- login shells are disabled;
- user config is ignored;
- approvals are `never`; and
- strict config makes an unsupported Codex client fail instead of falling back.

On the tested Homebrew macOS machine, Node links through several Homebrew
libraries, so the narrow usable toolchain capability is read-only
`/opt/homebrew`. On a non-Homebrew installation Koda derives the installed Node
version root from `process.execPath`.

## Why the policy includes external reads

“Project-only” cannot literally mean that a process reads no bytes elsewhere:
Node, Codex, the operating system, and Koda's installed runtime must execute. The
useful boundary is:

- no ordinary sibling repository or home-directory reads;
- no writes outside the project;
- no project Git/instruction/config mutation by the model;
- no ambient secrets;
- no network or web-search escape; and
- only named runtime/toolchain paths outside the project, read-only.

## Failed designs retained

The first live strict-profile probe allowed only `:minimal` and the project. It
correctly wrote inside and blocked a parent read, but Koda could not execute.

The second policy added the compiled Koda directory, package manifest, and Codex
binary. Project write, parent read denial, `.git` protection, and `.env` denial
passed, but Koda still could not execute because the Homebrew Node binary and its
linked libraries were outside `:minimal`.

No assertion was loosened. The final policy added the read-only Node toolchain
root and passed every original condition. A separate real HTTPS mutation failed
DNS resolution. A planted required project-local MCP server did not load under
the role's ignored-user-config launch.

## Boundary that remains

This policy controls model-generated commands in Koda-managed Producer and
Reviewer subprocesses. It does not control a Guide task that a person started
independently with ordinary `codex -C ...`; that task follows its own selected
Codex permissions. It also does not prevent the Codex client itself from using
its home directory for authentication and persistent thread storage.

The Guide needs a simple, human-quality secure launch experience before Koda can
make a whole-workflow containment claim. A long copied permission command is not
the answer. Until that product decision lands, documentation must say exactly
which seats Koda manages.

OpenAI currently labels permission profiles beta. Koda therefore keeps both
deterministic argument mutations and a real boundary probe, and must not retain a
silent legacy fallback.
