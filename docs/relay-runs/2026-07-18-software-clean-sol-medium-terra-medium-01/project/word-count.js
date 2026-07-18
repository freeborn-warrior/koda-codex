#!/usr/bin/env node

import { readFile } from 'node:fs/promises';

const args = process.argv.slice(2);

if (args.length !== 1) {
  process.stderr.write('word-count: usage: node word-count.js <text-file-path>\n');
  process.exitCode = 1;
} else {
  const source = args[0];

  readFile(source, 'utf8')
    .then((content) => {
      const trimmed = content.trim();
      const wordCount = trimmed === '' ? 0 : trimmed.split(/\s+/u).length;

      process.stdout.write(`${JSON.stringify({ source, wordCount })}\n`);
    })
    .catch((error) => {
      process.stderr.write(`word-count: cannot read "${source}": ${error.message}\n`);
      process.exitCode = 1;
    });
}
