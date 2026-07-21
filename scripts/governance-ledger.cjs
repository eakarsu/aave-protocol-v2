#!/usr/bin/env node
'use strict';

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const {
  appendRecord,
  createDecision,
  createProposal,
  createSourceRecord,
  detectSourceChange,
  readLedger,
  validateSourceRegistry,
  verifyLedger,
} = require('../governance/policy-ledger.cjs');

const root = path.resolve(__dirname, '..');
const ledgerRoot = path.join(root, 'governance', 'ledgers');
const registry = require('../governance/sources/source-registry.json');

function fail(message) {
  console.error(message);
  process.exit(2);
}

function projectFile(candidate, mustExist = true) {
  const resolved = path.resolve(root, candidate);
  if (resolved !== root && !resolved.startsWith(`${root}${path.sep}`)) fail('Path escapes project root');
  if (mustExist && !fs.existsSync(resolved)) fail(`File not found: ${candidate}`);
  return resolved;
}

function ledgerFile(name) {
  if (!/^[a-z0-9][a-z0-9_-]*\.ndjson$/.test(name || '')) {
    fail('Ledger name must match [a-z0-9][a-z0-9_-]*.ndjson');
  }
  return path.join(ledgerRoot, name);
}

function loadJson(candidate) {
  return JSON.parse(fs.readFileSync(projectFile(candidate), 'utf8'));
}

function head(records) {
  return records.length ? records[records.length - 1].recordHash : null;
}

function help() {
  console.log(`Usage:
  governance-ledger.cjs verify <ledger.ndjson>
  governance-ledger.cjs ingest <ledger.ndjson> <metadata.json> <content-file> <actor-id>
  governance-ledger.cjs propose <ledger.ndjson> <policy.json> <actor-id>
  governance-ledger.cjs decide <ledger.ndjson> <proposal-hash> <decision.json> <approver-id>

All ledger writes are append-only and restricted to governance/ledgers.`);
}

const [command, ...args] = process.argv.slice(2);
try {
  if (!command || command === 'help') {
    help();
  } else if (command === 'verify') {
    const records = readLedger(ledgerFile(args[0]));
    const result = verifyLedger(records);
    console.log(`Ledger verified (${result.records} record(s), head ${result.head || 'empty'}).`);
  } else if (command === 'ingest') {
    if (args.length !== 4) fail('ingest requires ledger, metadata, content, and actor');
    const file = ledgerFile(args[0]);
    const records = readLedger(file);
    verifyLedger(records);
    const metadata = loadJson(args[1]);
    const contentFile = projectFile(args[2]);
    const contentSha256 = crypto.createHash('sha256').update(fs.readFileSync(contentFile)).digest('hex');
    const previous = [...records]
      .reverse()
      .find((record) => record.type === 'source-ingested' && record.payload.sourceId === metadata.sourceId);
    const snapshot = {
      ...metadata,
      contentPath: path.relative(root, contentFile),
      contentSha256,
      ...(previous ? { previousContentSha256: previous.payload.contentSha256 } : {}),
    };
    const change = detectSourceChange(previous && previous.payload, snapshot);
    snapshot.changeKind = change.kind;
    snapshot.changedFields = change.changedFields || [];
    const record = createSourceRecord(snapshot, args[3], head(records));
    appendRecord(file, record);
    console.log(`Source snapshot appended (${change.kind}, record ${record.recordHash}).`);
  } else if (command === 'propose') {
    if (args.length !== 3) fail('propose requires ledger, policy, and actor');
    const file = ledgerFile(args[0]);
    const records = readLedger(file);
    verifyLedger(records);
    const known = validateSourceRegistry(registry);
    records
      .filter((record) => record.type === 'source-ingested')
      .forEach((record) => known.add(record.payload.sourceId));
    const record = createProposal(loadJson(args[1]), args[2], head(records), undefined, known);
    appendRecord(file, record);
    console.log(`Policy proposal appended (${record.recordHash}).`);
  } else if (command === 'decide') {
    if (args.length !== 4) fail('decide requires ledger, proposal hash, decision, and approver');
    const file = ledgerFile(args[0]);
    const records = readLedger(file);
    verifyLedger(records);
    const proposal = records.find(
      (record) => record.type === 'policy-proposed' && record.recordHash === args[1]
    );
    if (!proposal) fail('Proposal not found in ledger');
    const record = createDecision(proposal, loadJson(args[2]), args[3], head(records));
    appendRecord(file, record);
    console.log(`Decision appended (${record.recordHash}).`);
  } else {
    fail(`Unknown command: ${command}`);
  }
} catch (error) {
  fail(error.message);
}
