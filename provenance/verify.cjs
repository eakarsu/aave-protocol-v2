'use strict';

const assert = require('assert');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const root = path.resolve(__dirname, '..');

function digest(file) {
  return crypto.createHash('sha256').update(fs.readFileSync(path.join(root, file))).digest('hex');
}

function verifyGitMetadata(manifest) {
  if (!fs.existsSync(path.join(root, '.git'))) return false;
  const head = execFileSync('git', ['rev-parse', 'HEAD'], {
    cwd: root,
    stdio: ['ignore', 'pipe', 'pipe'],
  })
    .toString()
    .trim();
  assert.equal(head, manifest.baselineCommit, 'baseline commit does not match HEAD');
  const origin = execFileSync('git', ['remote', 'get-url', 'origin'], {
    cwd: root,
    stdio: ['ignore', 'pipe', 'pipe'],
  })
    .toString()
    .trim();
  assert.equal(origin.replace(/\.git$/, ''), manifest.origin.replace(/\.git$/, ''));
  return true;
}

function verify(manifest = require('./manifest.json')) {
  assert.equal(manifest.schemaVersion, 1);
  assert.match(manifest.origin, /^https:\/\/github\.com\//);
  assert.match(manifest.baselineCommit, /^[0-9a-f]{40}$/);
  assert.equal(manifest.license.expression, 'AGPL-3.0-or-later');
  const files = [manifest.license, ...manifest.evidence];
  assert.ok(files.length >= 2);
  for (const entry of files) {
    assert.equal(digest(entry.path), entry.sha256, `${entry.path} digest mismatch`);
  }
  assert.ok(manifest.releaseGates.length >= 3);
  return { integrityFiles: files.length, gitMetadataVerified: verifyGitMetadata(manifest) };
}

if (require.main === module) {
  const result = verify();
  const repositoryStatus = result.gitMetadataVerified
    ? 'Git origin and baseline verified'
    : 'packaged context; Git metadata unavailable';
  console.log(`Provenance manifest verified (${result.integrityFiles} integrity-pinned files; ${repositoryStatus}).`);
}

module.exports = { digest, verify, verifyGitMetadata };
