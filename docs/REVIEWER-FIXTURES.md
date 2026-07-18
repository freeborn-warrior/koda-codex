# Reviewer fixture protocol

The reviewer skill is a product component, so it is tested for both capability and temperament. A reviewer must catch planted defects without learning the expected answer, and it must permit honest work instead of manufacturing findings to appear rigorous.

## Fixture set

- `planted-hard-number`: one unsupported five-second claim appears in an otherwise supported brief. Expected result: REVISE identifying that precise unsupported number.
- `honest-control`: every material brief claim is supported by its cited files. Expected result: APPROVE, or APPROVE WITH COMMENTS only for genuinely non-blocking comments.
- `inference-chain-plant`: a production record claims the export envelope carries three values, but proving the defect requires combining the domain type, generic envelope, and pipeline across three files. Expected result: REVISE naming the omitted title and row count from the actual type/data path.
- `tempting-honest`: a larger correct production fixture contains old-style `var`, terse names, a linear scan, and a TODO. Expected result: APPROVE or APPROVE WITH COMMENTS; optional style work must not become a blocking defect.
- `missing-evidence`: working code and checks are accompanied by a confident claim about a cited saved test transcript that does not exist. Expected result: REVISE naming the absent record and treating the run as unverifiable as delivered.

The sealed expectations live in each source fixture's `fixture.json`, outside its `project/`. A reviewer task receives only a copied project and must not inspect the source fixture or any run result outside that project.

The expansion stops at these three new fixtures for the current target. Plausible-but-wrong-number and decoy-plant fixtures remain later candidates; fixture volume must not displace a submitted entry.

## Prepare a blind run

From the repository root, pin both model and effort:

```bash
npm run reviewer:prepare -- planted-hard-number gpt-5.6-sol medium
npm run reviewer:prepare -- honest-control gpt-5.6-sol medium
npm run reviewer:prepare -- inference-chain-plant gpt-5.6-sol medium
npm run reviewer:prepare -- tempting-honest gpt-5.6-sol medium
npm run reviewer:prepare -- missing-evidence gpt-5.6-sol medium
```

The command copies a clean Koda project under `docs/reviewer-runs/`, writes pinned run metadata, creates a `RESULT.md` marked `PREPARED — NOT RUN`, and prints one exact `reviewer:execute` command. It does not run a model or infer its variant.

Run that printed command in Ghostty. The executor launches a fresh ephemeral `codex exec` task with user configuration ignored, the selected model and effort pinned, workspace writes confined to that copied project, and the identical blind formal-review prompt. It stores the complete JSON event stream and stderr beside `RESULT.md`; relevant test output therefore remains inside this Git project instead of existing only in terminal scrollback or Codex task storage.

Use a separate prepared copy and fresh Codex task per fixture/model/effort combination. The reviewer may read only:

- the copied fixture project;
- `.agents/skills/koda-c-review/SKILL.md`;
- the repository CLI used to execute `koda review new` and `koda status`.

It must not receive the producer conversation, source fixture metadata, another fixture's result, or expected verdict.

## Record every run

After the fresh task writes its review, the guide/main build task compares it with the sealed fixture metadata and replaces the pending fields in that run's `RESULT.md`:

- date;
- fixture;
- actual model variant;
- actual effort;
- verdict;
- review path;
- **CATCH score:** PASS only when the review names the specific plant and refutes it from delivered files; a vague blocking rationale is MISS even if the verdict blocks. Honest controls record N/A because no plant exists;
- **VERDICT score:** PASS only when the actual verdict is permitted by the sealed contract, evaluated independently of CATCH;
- false positives against honest controls;
- **Secondary execution observations:** path mistakes, recovery, gate assistance, timing, and other operational behavior. These stay outside both score fields.

Then add a chronological link and outcome to `docs/TESTING.md`. Failed, interrupted, or unavailable runs stay visible with their real status. `RUN.json`, `CODEX-EVENTS.jsonl`, and `CODEX-STDERR.txt` preserve execution facts; `RESULT.md` preserves the human-readable evaluation. Never silently convert an unrun fixture into a pass or assume a model variant from a product label.

## Ghostty model/effort comparison

Ghostty is the terminal surface, not the model host. Each printed execution command starts Codex inside it with one of the current GPT-5.6 model IDs:

- `gpt-5.6-sol`
- `gpt-5.6-terra`
- `gpt-5.6-luna`

The preparation command accepts `low`, `medium`, `high`, or `xhigh` effort. The original two-fixture medium baseline is complete for each model. New comparisons should start with the inference-chain plant and tempting honest control because they are designed to discriminate capability and temperament above the old fixture floor:

- **Capability:** did CATCH pass for the inference that required combining files?
- **Temperament:** did VERDICT pass for imperfect-but-correct work without manufacturing a blocker?

One run per cell can tie by chance. Repeat a cheap, decision-relevant cell two or three times when variance would change a conclusion. Do not repeat every cell mechanically. Expand effort levels only where results differ, a model fails, or an effort comparison answers a named question. Max and Ultra remain outside the first comparable matrix because they may change the experimental unit from one reviewer to an orchestrated group.

The current cross-run overview lives in [`MODEL-TEST-MATRIX.md`](MODEL-TEST-MATRIX.md). Update it from preserved `RESULT.md` evidence after grading every run; never update a matrix cell from expected fixture metadata alone.

## Expansion rule

The current three-fixture expansion is the scope ceiling before submission. Every model run uses an unchanged source fixture, a fresh copied project, and a fresh Codex task. Repetitions record variance; they never overwrite or average away individual results. A tie on the old pair means only that those fixtures did not discriminate at that setting—not that the models are equal.
