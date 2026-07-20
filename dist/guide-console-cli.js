import { runGuideConsole } from "./guide-console.js";

function option(args          , name        )                {
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
  if (args.length) throw new Error(`Unknown Guide console option: ${args[0]}`);
  await runGuideConsole({ model, effort });
} catch (error) {
  console.error(`GUIDE CLOSED SAFELY — ${error instanceof Error ? error.message : String(error)}`);
  process.exitCode = 1;
}


//# sourceURL=/Users/freeborn/Dev/koda-codex/src/guide-console-cli.ts