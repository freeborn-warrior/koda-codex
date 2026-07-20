import { runGuideConsole } from "./guide-console.ts";

function option(args: string[], name: string): string | null {
  const index = args.indexOf(name);
  if (index === -1) return null;
  const value = args[index + 1];
  if (!value || value.startsWith("--")) throw new Error(`${name} needs a value.`);
  args.splice(index, 2);
  return value;
}

try {
  const args = process.argv.slice(2);
  const model = option(args, "--model");
  const effort = option(args, "--effort");
  const producerModel = option(args, "--producer-model");
  const producerEffort = option(args, "--producer-effort");
  const reviewerModel = option(args, "--reviewer-model");
  const reviewerEffort = option(args, "--reviewer-effort");
  if (args.length) throw new Error(`Unknown Guide console option: ${args[0]}`);
  await runGuideConsole({ model, effort, producerModel, producerEffort, reviewerModel, reviewerEffort });
} catch (error) {
  console.error(`GUIDE CLOSED SAFELY — ${error instanceof Error ? error.message : String(error)}`);
  process.exitCode = 1;
}
