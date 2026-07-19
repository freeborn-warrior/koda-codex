# Owner ceremony and recovery — development failures

**Date:** 2026-07-19

No failed result below was deleted, relabeled as a pass, or repaired by weakening a
gate condition.

1. The live owner pressed Return at an ambiguous acknowledgement prompt. The receipt
   mismatch correctly wrote nothing, but Reviewer and Producer exited. This exposed a
   product UX and recovery failure, not a gate failure.
2. The first combined development set passed 28/56. Twenty-seven Guide checks
   correctly refused because protected launch files had changed while the integrity
   manifest still described the pushed release; the new pseudo-terminal ceremony
   also timed out because the first retry design returned to the full menu instead of
   remaining at the paste retry promised by its text.
3. After the retry loop was corrected, the focused relay/skill set passed 27/27.
4. The next Guide/relay/skill set passed 55/56. Duplicate recovery was checked after
   another runtime-state condition, so it named the less useful reason. Recovery now
   checks its immutable request record first; the focused recovery checks passed.
5. The first full suite passed 190/191. One static runner assertion still expected
   the superseded acknowledgement call shape. It was replaced with the stronger
   contract: literal precheck, exact deterministic CLI call, numbered UX, and named
   mismatch behavior.
6. The next full suite passed 190/191. A real concurrent waiting-direction write was
   observed between its atomic temporary-file creation and rename. Koda had treated
   its own bounded temporary filename as hostile. It now retries only that exact
   atomic filename for 250 ms; unknown entries still refuse immediately and a
   persistent Koda temporary file refuses by name. Focused direction/interruption
   checks passed 12/12.
7. The complete suite then passed 192/192.
8. Security review found that the first retry repair put the receipt in a child
   process argument. It was moved to stdin together with owner comments or rulings.
   The next focused set passed 39/66 because the integrity manifest again correctly
   rejected the newly changed protected script. After an explicitly temporary,
   uncommitted test-bootstrap hash update, the same set passed 66/66.
9. Expanded human-error and leak checks passed 73/73. The first complete suite passed
   194/194; coverage also passed 194/194 at 89.34% lines, 68.52% branches, and 86.97%
   functions.
10. A combined command later tried to locate root tests from inside the isolated
    verification project. Node named the missing files and ran zero tests. Rerunning
    from the repository root passed 63/63; no assertion or product file changed.
    The same working-directory mistake recurred once during post-push hash collection;
    `shasum` named the absent root paths and the command chain stopped before any
    mutation. Hash collection was rerun from the repository root.
11. The skill validator is not executable on this machine, so direct invocation
    returned permission denied. `python3 .../quick_validate.py` passed the same skill.
12. Default `npm pack --dry-run` could not write to Kristian's pre-existing,
    root-owned npm cache. An isolated cache passed. Default `npm audit` could not run
    because this dependency-free package intentionally has no lockfile; an isolated
    temporary package-lock audit reported zero vulnerabilities.
13. The final audit found that the fresh-model runner reused fixed historical output
    folders. A rerun could overwrite sealed raw evidence. The next runs use new IDs,
    and destination creation now refuses if the folder already exists.

The toolkit integrity manifest used during uncommitted testing was only a local
bootstrap so Guide tests could exercise the changed bytes. It must never be published
as release evidence until a pushed 194-check transcript binds the final code.
