# Reviewer fixture protocol

The reviewer skill is a product component, so it is tested for both capability and temperament. A reviewer must catch planted defects without learning the expected answer, and it must permit honest work instead of manufacturing findings to appear rigorous.

## Bounded first fixture set

- `planted-hard-number`: one unsupported five-second claim appears in an otherwise supported brief. Expected result: REVISE identifying that precise unsupported number.
- `honest-control`: every material brief claim is supported by its cited files. Expected result: APPROVE, or APPROVE WITH COMMENTS only for genuinely non-blocking comments.

The sealed expectations live in each source fixture's `fixture.json`, outside its `project/`. A reviewer task receives only a copied project and must not inspect the source fixture or any run result outside that project.

## Prepare a blind run

From the repository root, pin both model and effort:

```bash
npm run reviewer:prepare -- planted-hard-number gpt-5.6-sol medium
npm run reviewer:prepare -- honest-control gpt-5.6-sol medium
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
- exact planted finding caught or missed, or any false finding against the honest control.

Then add a chronological link and outcome to `docs/TESTING.md`. Failed, interrupted, or unavailable runs stay visible with their real status. `RUN.json`, `CODEX-EVENTS.jsonl`, and `CODEX-STDERR.txt` preserve execution facts; `RESULT.md` preserves the human-readable evaluation. Never silently convert an unrun fixture into a pass or assume a model variant from a product label.

## Ghostty model/effort comparison

Ghostty is the terminal surface, not the model host. Each printed execution command starts Codex inside it with one of the current GPT-5.6 model IDs:

- `gpt-5.6-sol`
- `gpt-5.6-terra`
- `gpt-5.6-luna`

The preparation command accepts `low`, `medium`, `high`, or `xhigh` effort. Begin with both fixtures at `medium` for each model. That creates six runs measuring two independent qualities:

- **Capability:** did the reviewer identify the one planted unsupported claim?
- **Temperament:** did it approve honest work without inventing a blocking defect?

Only expand effort levels after those six runs, preferably where results differ or a model fails. Max and Ultra are excluded from the first comparable matrix: current OpenAI guidance describes Ultra as automatic subagent delegation, which changes the experimental unit from one reviewer model to an orchestrated group.

## Expansion rule

Do not add more fixtures until target (a) is secure. Later candidates are one unsupported file claim and one comment that misdescribes adjacent code. The Sol/Terra/Luna and effort comparison uses these same fixtures so capability and temperament are measured against stable controls.
