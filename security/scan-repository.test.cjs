'use strict';

const assert = require('node:assert/strict');
const test = require('node:test');
const { spawnSync } = require('child_process');
const path = require('path');

test('repository security scan passes the available repository files', () => {
  const result = spawnSync(process.execPath, ['security/scan-repository.cjs'], {
    cwd: path.resolve(__dirname, '..'),
    encoding: 'utf8',
  });
  assert.equal(result.status, 0, result.stdout + result.stderr);
  assert.match(result.stdout, /security scan passed/);
});
