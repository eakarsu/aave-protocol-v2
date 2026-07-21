'use strict';

const assert = require('node:assert/strict');
const fs = require('fs');
const os = require('os');
const path = require('path');
const test = require('node:test');
const ledger = require('./policy-ledger.cjs');
const registry = require('./sources/source-registry.json');
const policy = require('./policies/protocol-change-policy.v1.json');

const at1 = '2026-07-19T10:00:00Z';
const at2 = '2026-07-19T11:00:00Z';
const at3 = '2026-07-19T12:00:00Z';
const sources = () => ledger.validateSourceRegistry(registry);
const proposal = () => ledger.createProposal(policy, 'proposer-1', null, at1, sources());
const approval = (p, previous = p.recordHash) =>
  ledger.createDecision(
    p,
    {
      outcome: 'approved',
      rationale: 'All required reviews supplied.',
      attestations: ['security-review', 'source-change-review', 'license-review'],
      evidenceLinks: ['https://example.invalid/review/1'],
    },
    'approver-1',
    previous,
    at2
  );

test('source registry accepts integrity-pinned evidence and pending authorities', () => {
  assert.ok(sources().has('aave-v2-certora-2020'));
  assert.ok(sources().has('agpl-3.0-license'));
  assert.equal(registry.sources.find((source) => source.sourceId === 'agpl-3.0-license').sourceType, 'contract');
});

test('source snapshots reject unsupported source types', () => {
  const source = { ...registry.sources[0], sourceType: 'blog-post' };
  assert.throws(() => ledger.validateSourceSnapshot(source), /sourceType/);
});

test('source snapshots require HTTPS', () => {
  const source = { ...registry.sources[0], sourceUrl: 'http://example.invalid/source' };
  assert.throws(() => ledger.validateSourceSnapshot(source), /HTTPS/);
});

test('source snapshots require jurisdiction', () => {
  const source = { ...registry.sources[0], jurisdiction: '' };
  assert.throws(() => ledger.validateSourceSnapshot(source), /jurisdiction/);
});

test('source snapshots require effective and retrieval timestamps', () => {
  const source = { ...registry.sources[0], effectiveAt: '2026-07-19' };
  assert.throws(() => ledger.validateSourceSnapshot(source), /ISO-8601/);
});

test('source change detection distinguishes content changes from refreshes', () => {
  const source = registry.sources[0];
  assert.equal(ledger.detectSourceChange(source, { ...source }).kind, 'metadata-refresh');
  const changed = { ...source, contentSha256: 'a'.repeat(64) };
  assert.deepEqual(ledger.detectSourceChange(source, changed).changedFields, ['contentSha256']);
});

test('new source is marked as initial ingestion', () => {
  assert.equal(ledger.detectSourceChange(null, registry.sources[0]).kind, 'initial-ingestion');
});

test('policy requires semver, accountable owner, evidence, and rules', () => {
  assert.equal(ledger.validatePolicy(policy, sources()).policyId, 'protocol-change-control');
  assert.throws(() => ledger.validatePolicy({ ...policy, version: '1' }, sources()), /semver/);
});

test('policy rejects unknown evidence', () => {
  assert.throws(
    () => ledger.validatePolicy({ ...policy, evidenceSourceIds: ['unknown'] }, sources()),
    /unknown evidence/
  );
});

test('policy requires independent approval controls', () => {
  const invalid = { ...policy, approvalRequirements: { ...policy.approvalRequirements, distinctFromProposer: false } };
  assert.throws(() => ledger.validatePolicy(invalid, sources()), /distinct/);
});

test('proposal captures immutable policy and evidence digests', () => {
  const record = proposal();
  assert.equal(record.type, 'policy-proposed');
  assert.match(record.payload.policySha256, /^[0-9a-f]{64}$/);
  assert.equal(record.previousHash, null);
});

test('decision requires an independent approver', () => {
  const p = proposal();
  assert.throws(
    () => ledger.createDecision(p, { outcome: 'rejected', rationale: 'No' }, 'proposer-1', p.recordHash, at2),
    /distinct/
  );
});

test('decision requires every policy attestation', () => {
  const p = proposal();
  assert.throws(
    () =>
      ledger.createDecision(
        p,
        { outcome: 'approved', rationale: 'Incomplete', attestations: ['security-review'] },
        'approver-1',
        p.recordHash,
        at2
      ),
    /missing attestation/
  );
});

test('valid proposal and decision form a verified hash chain', () => {
  const p = proposal();
  const d = approval(p);
  assert.deepEqual(ledger.verifyLedger([p, d]), { records: 2, head: d.recordHash });
});

test('release approval requires the exact policy digest and evidence links', () => {
  const p = proposal();
  const d = approval(p);
  assert.equal(ledger.requireApprovedPolicy([p, d], policy).recordHash, d.recordHash);
  assert.throws(
    () => ledger.requireApprovedPolicy([p, d], { ...policy, rules: [...policy.rules].reverse() }),
    /no approved decision/
  );
  const withoutEvidence = ledger.createDecision(
    p,
    {
      outcome: 'approved',
      rationale: 'No evidence supplied.',
      attestations: ['license-review', 'security-review', 'source-change-review'],
      evidenceLinks: [],
    },
    'approver-1',
    p.recordHash,
    at2
  );
  assert.throws(() => ledger.requireApprovedPolicy([p, withoutEvidence], policy), /evidence links/);
});

test('tampering with a decision is detected', () => {
  const p = proposal();
  const d = approval(p);
  d.payload.rationale = 'Tampered';
  assert.throws(() => ledger.verifyLedger([p, d]), /hash mismatch/);
});

test('reordering records is detected', () => {
  const p = proposal();
  const d = approval(p);
  assert.throws(() => ledger.verifyLedger([d, p]), /hash chain/);
});

test('a proposal may have only one immutable decision', () => {
  const p = proposal();
  const d1 = approval(p);
  const d2 = ledger.createDecision(
    p,
    {
      outcome: 'rejected',
      rationale: 'Second outcome',
      attestations: ['license-review', 'security-review', 'source-change-review'],
    },
    'approver-2',
    d1.recordHash,
    at3
  );
  assert.throws(() => ledger.verifyLedger([p, d1, d2]), /more than one decision/);
});

test('appendRecord preserves prior lines and verifies the resulting ledger', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'aave-ledger-'));
  const file = path.join(dir, 'test.ndjson');
  const p = proposal();
  ledger.appendRecord(file, p);
  const before = fs.readFileSync(file, 'utf8');
  ledger.appendRecord(file, approval(p));
  const after = fs.readFileSync(file, 'utf8');
  assert.ok(after.startsWith(before));
  assert.equal(ledger.verifyLedger(ledger.readLedger(file)).records, 2);
});

test('appendRecord refuses records that do not extend the current head', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'aave-ledger-head-'));
  const file = path.join(dir, 'test.ndjson');
  const p = proposal();
  ledger.appendRecord(file, p);
  const unrelated = ledger.createSourceRecord(registry.sources[0], 'ingestor', null, at2);
  assert.throws(() => ledger.appendRecord(file, unrelated), /extend ledger head/);
});
