# Security audit — multi-part owner acknowledgement

- Date: 2026-07-21
- Scope: `APPROVE WITH COMMENTS` and `DISCUSS` owner input, stdin sequencing,
  review-code binding, ledger atomicity, process arguments/environment, recovery,
  toolkit integrity, and regression impact
- Status: **POST-PUSH PASS — TOOLKIT PROMOTED**
- Owner-observed failed run: launch `1c2a5c0f-d578-4d64-822b-ee99fa184133`
- Corrected local regression: [264/264](../../test-results/2026-07-21-owner-comments-local.md)
- Unchanged pushed regression: [264/264](../../test-results/2026-07-21-owner-comments-pushed.md)
- Promoted release regression: [264/264](../../test-results/2026-07-21-owner-comments-release.md)

## Finding

The Reviewer controller correctly kept a full receipt and owner comments out of
child-process arguments and environment variables by sending them through stdin.
The CLI's default prompt adapter was not safe for more than one piped prompt: the
first short-lived readline interface could buffer both lines, leaving the second
interface on an exhausted stream. Node then terminated the unsettled top-level
await. The defect was availability and workflow integrity, not disclosure or gate
bypass.

In the live run, the exact review code matched before the child failed. Koda-C
wrote no partial approval entry, did not advance Produce, preserved the failed
Reviewer job and bound review, and reported the precise warning from disk. The
existing atomic ledger and gate therefore contained the failure.

## Correction and verified controls

- Non-terminal stdin is consumed once and queued line by line. Each CLI prompt
  receives one ordered value; missing lines resolve to empty input and trigger the
  existing named refusal rather than waiting indefinitely.
- Interactive terminal input retains the existing one-question interface and does
  not pre-read future owner actions.
- The Reviewer still receives only the eight-character review code from the owner,
  maps it to the complete bound receipt, and rechecks the disk review before
  invoking approval.
- Receipt, comments, and ruling remain absent from process arguments and inherited
  environment. They are not copied to the clipboard or printed as transport.
- `APPROVE WITH COMMENTS` writes the required comments only with the exact current
  receipt. `DISCUSS` writes the required owner ruling but remains a blocking verdict
  until fresh reviewed work exists.
- A wrong or old code, empty comments, empty ruling, changed artifact, stale review,
  or any existing gate mutation still refuses without advancement.
- Two controller-level tests cover both multi-part paths. The complete mutation,
  package, manual/Ghostty launch, recovery, status-truth, security, and close suite
  passes 264/264 from unchanged pushed commit `f77f10c`.

Toolkit capability `multi-part-owner-ack-v26` binds repair commit `4dc31b5`, the
pushed test commit, exact transcript hash/count, and changed source plus compiled
runtime. The earlier integrity refusals remain preserved; no verifier or security
assertion was weakened during bootstrap.

## Remaining boundary

Stdin protects owner values from ordinary process listings and environment dumps;
it is not a secret channel against the same operating-system user, a debugger, or
a compromised parent process. Review codes are usability tokens, not credentials.
Koda-C's claim remains evidence of engagement and exact disk binding, not proof of
comprehension or protection from deliberate same-user fraud.

No new network capability, dependency, filesystem root, model permission,
clipboard behavior, shell evaluation, or provider integration was introduced.
