import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, statSync } from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const testDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(testDirectory, '..');
const commandPath = path.join(projectRoot, 'word-count.js');
const ordinaryPath = 'test/fixtures/ordinary.txt';
const emptyPath = 'test/fixtures/empty.txt';

function runCommand(...args) {
  return spawnSync(process.execPath, [commandPath, ...args], {
    cwd: projectRoot,
    encoding: 'utf8',
  });
}

test('reports the expected count for ordinary text without changing it', () => {
  const absolutePath = path.join(projectRoot, ordinaryPath);
  const before = readFileSync(absolutePath);
  const result = runCommand(ordinaryPath);
  const after = readFileSync(absolutePath);

  assert.equal(result.status, 0);
  assert.equal(result.stderr, '');
  assert.deepEqual(JSON.parse(result.stdout), {
    source: ordinaryPath,
    wordCount: 4,
  });
  assert.deepEqual(after, before);
});

test('reports zero for a zero-byte file without changing it', () => {
  const absolutePath = path.join(projectRoot, emptyPath);
  const before = readFileSync(absolutePath);
  const result = runCommand(emptyPath);
  const after = readFileSync(absolutePath);

  assert.equal(statSync(absolutePath).size, 0);
  assert.equal(result.status, 0);
  assert.equal(result.stderr, '');
  assert.deepEqual(JSON.parse(result.stdout), {
    source: emptyPath,
    wordCount: 0,
  });
  assert.deepEqual(after, before);
});

test('refuses a missing path with a clear error', () => {
  const missingPath = 'test/fixtures/missing.txt';
  const result = runCommand(missingPath);

  assert.notEqual(result.status, 0);
  assert.equal(result.stdout, '');
  assert.match(result.stderr, /^word-count: cannot read "test\/fixtures\/missing\.txt": .+\n$/);
});

test('refuses a missing argument', () => {
  const result = runCommand();

  assert.notEqual(result.status, 0);
  assert.equal(result.stdout, '');
  assert.equal(result.stderr, 'word-count: usage: node word-count.js <text-file-path>\n');
});

test('refuses more than one argument', () => {
  const result = runCommand(ordinaryPath, emptyPath);

  assert.notEqual(result.status, 0);
  assert.equal(result.stdout, '');
  assert.equal(result.stderr, 'word-count: usage: node word-count.js <text-file-path>\n');
});
