'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const { verify } = require('./verify.cjs');

test('provenance manifest and available repository metadata verify', () => {
  const result = verify();
  assert.equal(result.integrityFiles, 8);
  assert.equal(result.gitMetadataVerified, fs.existsSync(path.resolve(__dirname, '..', '.git')));
});
