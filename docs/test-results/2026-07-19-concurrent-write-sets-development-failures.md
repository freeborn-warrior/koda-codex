# Concurrent write-set development failures

**Date:** 2026-07-19

No failure below was removed by weakening a product condition.

## Superseded broad-staging assertion

The first related regression passed 30/31. One static relay test still required
the old `git add -A` implementation. The owner ruling explicitly forbids that
behavior. The assertion was replaced with positive requirements for the
Git-operation lock, owned-path enumeration, exact external/session staging, and
close-only staging. The real relay integration remained unchanged and passed.

## Forged Guide-return commit diagnostic

The injected recovery test wrote an all-zero commit ID. Git rejected that object
before Koda emitted its stable product refusal, so the integration failed on
wording despite correctly stopping. Recovery now checks object existence first
and reports that the bound close commit is no longer in current history. The
test's corrupt input and refusal requirement remained intact.

## Symlink mutation reached Git first

The first linked-parent claim mutation refused, but `git check-ignore` produced a
generic error before Koda's containment check. Claim preflight now validates every
existing path component before calling Git. The same mutation then refused by
naming the symbolic-link component.

## Concurrent `.koda` creation race

The first simultaneous same-path claim test proved both claims could not land, but
the losing call observed a raw `.koda` `EEXIST` race instead of the lock owner.
Project-local lock-parent creation now treats atomic `EEXIST` as the expected
competing creator, then proceeds to the lock record. The unchanged concurrency
test now sees exactly one successful claim, one named lock refusal, and a later
named path-overlap refusal.

## Security hardening during the same milestone

The review added post-stage index-blob verification to close the working-tree
verify/stage gap, rejected linked `.koda` lock parents, rejected linked output-path
components, made claim acquisition atomic, and added staged-crash refusal. None of
these corrections removed an earlier gate, receipt, close, direction, reviewer,
package, or status-truth test.

## External output was initially relay-verified, not independently close-verified

The pre-final review found that exact relay finalization verified and staged every
claimed external output, while a direct `koda session close` check still inspected
only the session directory. A caller bypassing the relay could therefore push
`close.md` and the write-set record while leaving a claimed deliverable
uncommitted. Close now independently re-hashes every claim and requires its exact
clean committed state in addition to the existing pushed-branch proof. The new
mutation pushes the session evidence while deliberately omitting `src/output.js`;
close and the next-session ceremony both refuse by naming that path. No prior
assertion changed.

## Reviewer handback initially reconciled instead of verified

A pre-final provenance pass found that the common model-turn completion hook
reconciled external hashes after both Producer and Reviewer turns. That could
legitimize a Reviewer-side output mutation instead of treating it as a conflict.
Producer completion still records its own post-work bytes; Reviewer completion
now only verifies those already-recorded bytes and refuses any change. The relay
wiring assertion and existing same-path mutation check preserve that distinction.

## Guide overlap initially compared only exact spellings

Session/session claims used parent-and-child overlap checks, but the first
Guide/session branch compared only exact strings. Two missing paths such as
`src/future.js` and `src/future.js/child.js` could therefore be reserved by
different actors before either existed. Guide/session claims now use the same
bidirectional overlap rule. The planted child-path claim refuses and names the
Guide path.

## Skill validator launcher was not executable

The first direct invocation of the system `quick_validate.py` file exited 126
because that installed script lacks its executable bit. It was rerun explicitly
through `python3` without changing the skill or validator and reported `Skill is
valid!`; the repository's eleven skill-contract checks passed as well.
