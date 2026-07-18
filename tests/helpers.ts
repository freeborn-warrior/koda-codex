import { mkdir, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { mkdtemp, writeFile } from "node:fs/promises";

import { DEFAULT_CONFIG } from "../src/config.ts";
import { artifactPath, createSession, writeJsonAtomic } from "../src/project.ts";
import { createFreshReview, recordApproval } from "../src/receipt.ts";
import type { ProjectConfig, Verdict } from "../src/types.ts";

interface CleanupTest {
  after(callback: () => void | Promise<void>): void;
}

export async function temporaryRoot(test: CleanupTest, prefix = "koda-test-"): Promise<string> {
  const root = await mkdtemp(path.join(tmpdir(), prefix));
  test.after(async () => rm(root, { recursive: true, force: true }));
  return root;
}

export async function projectHarness(test: CleanupTest, phaseCount = 1) {
  const root = await temporaryRoot(test);
  const config: ProjectConfig = {
    ...DEFAULT_CONFIG,
    phases: DEFAULT_CONFIG.phases.slice(0, phaseCount).map((phase) => ({ ...phase })),
  };
  await writeJsonAtomic(path.join(root, "koda.config.json"), config);
  await mkdir(path.join(root, config.sessionsDir), { recursive: true });
  const session = await createSession(root, config, "# Session prompt\n\nBuild a tiny verified thing.\n");
  return { root, config, session };
}

export async function readyGate(
  test: CleanupTest,
  options: {
    verdict?: Verdict;
    approval?: boolean;
    comments?: string | null;
    ruling?: string | null;
    approver?: string;
  } = {},
) {
  const harness = await projectHarness(test);
  const phase = harness.session.state.phases[0];
  const artifact = "# Brief\n\nMake one checkable thing.\n";
  await writeFile(artifactPath(harness.session.directory, phase, 0), artifact, "utf8");
  const review = await createFreshReview(harness.session.directory, phase, 0, {
    verdict: options.verdict ?? "APPROVE",
    body: "# Peer review\n\nThe artifact is specific and checkable.",
  });
  if (options.approval !== false) {
    await recordApproval(harness.session.directory, {
      version: 1,
      phase: phase.name,
      reviewId: review.metadata.id,
      verdict: options.verdict ?? "APPROVE",
      receipt: review.metadata.receipt,
      approver: options.approver ?? "Kristian",
      comments: options.comments ?? null,
      ruling: options.ruling ?? null,
      recordedAt: new Date().toISOString(),
    });
  }
  return { ...harness, phase, artifact, review };
}
