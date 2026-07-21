#!/usr/bin/env node
'use strict';

const path = require('path');
const { readLedger, requireApprovedPolicy } = require('../governance/policy-ledger.cjs');
const policy = require('../governance/policies/protocol-change-policy.v1.json');

const ledgerFile = path.resolve(__dirname, '..', 'governance', 'ledgers', 'release.ndjson');

try {
  const decision = requireApprovedPolicy(readLedger(ledgerFile), policy);
  console.log(
    `Release approval verified (${policy.policyId}@${policy.version}, decision ${decision.recordHash}).`
  );
} catch (error) {
  console.error(`Release blocked: ${error.message}`);
  process.exit(1);
}
