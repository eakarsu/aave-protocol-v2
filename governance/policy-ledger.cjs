'use strict';

const crypto = require('crypto');
const fs = require('fs');

const RECORD_TYPES = new Set(['source-ingested', 'policy-proposed', 'decision']);
const DECISIONS = new Set(['approved', 'rejected']);
const SOURCE_TYPES = new Set(['regulation', 'contract', 'audit', 'policy']);

function canonical(value) {
  if (Array.isArray(value)) return `[${value.map(canonical).join(',')}]`;
  if (value && typeof value === 'object') {
    return `{${Object.keys(value)
      .sort()
      .map((key) => `${JSON.stringify(key)}:${canonical(value[key])}`)
      .join(',')}}`;
  }
  return JSON.stringify(value);
}

function sha256(value) {
  return crypto.createHash('sha256').update(value).digest('hex');
}

function requireText(value, field) {
  if (typeof value !== 'string' || value.trim() === '') throw new Error(`${field} is required`);
  return value;
}

function requireIso(value, field) {
  requireText(value, field);
  if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?Z$/.test(value)) {
    throw new Error(`${field} must be an ISO-8601 UTC timestamp`);
  }
  if (Number.isNaN(Date.parse(value))) throw new Error(`${field} is invalid`);
  return value;
}

function requireHttps(value, field) {
  requireText(value, field);
  const parsed = new URL(value);
  if (parsed.protocol !== 'https:') throw new Error(`${field} must use HTTPS`);
  if (parsed.username || parsed.password) throw new Error(`${field} must not contain credentials`);
  return value;
}

function validateSourceSnapshot(source) {
  if (!source || typeof source !== 'object') throw new Error('source snapshot is required');
  requireText(source.sourceId, 'sourceId');
  if (!SOURCE_TYPES.has(source.sourceType)) throw new Error('sourceType is unsupported');
  requireText(source.authorityId, 'authorityId');
  requireText(source.title, 'title');
  requireText(source.publisher, 'publisher');
  requireHttps(source.sourceUrl, 'sourceUrl');
  requireText(source.jurisdiction, 'jurisdiction');
  requireIso(source.effectiveAt, 'effectiveAt');
  requireIso(source.retrievedAt, 'retrievedAt');
  if (!/^[0-9a-f]{64}$/.test(source.contentSha256 || '')) {
    throw new Error('contentSha256 must be a lowercase SHA-256 digest');
  }
  if (source.previousContentSha256 && !/^[0-9a-f]{64}$/.test(source.previousContentSha256)) {
    throw new Error('previousContentSha256 must be a lowercase SHA-256 digest');
  }
  requireText(source.contentPath, 'contentPath');
  return source;
}

function detectSourceChange(previous, incoming) {
  validateSourceSnapshot(incoming);
  if (!previous) return { changed: true, kind: 'initial-ingestion' };
  validateSourceSnapshot(previous);
  if (previous.sourceId !== incoming.sourceId) throw new Error('sourceId cannot change');
  const changedFields = [
    'contentSha256',
    'effectiveAt',
    'sourceUrl',
    'jurisdiction',
    'sourceType',
    'authorityId',
  ].filter(
    (field) => previous[field] !== incoming[field]
  );
  return {
    changed: changedFields.length > 0,
    kind: changedFields.length ? 'source-change' : 'metadata-refresh',
    changedFields,
  };
}

function validateSourceRegistry(registry) {
  if (!registry || registry.schemaVersion !== 1) throw new Error('unsupported source registry');
  const ids = new Set();
  for (const source of registry.sources || []) {
    validateSourceSnapshot(source);
    if (ids.has(source.sourceId)) throw new Error(`duplicate sourceId: ${source.sourceId}`);
    ids.add(source.sourceId);
  }
  for (const authority of registry.authorityCatalog || []) {
    requireText(authority.authorityId, 'authorityId');
    requireText(authority.publisher, 'publisher');
    requireHttps(authority.sourceUrl, 'sourceUrl');
    if (!Array.isArray(authority.jurisdictions) || !authority.jurisdictions.length) {
      throw new Error('authority jurisdictions are required');
    }
    if (authority.ingestionStatus !== 'pending') throw new Error('catalog entries must be pending');
  }
  return ids;
}

function validatePolicy(policy, knownSourceIds = new Set()) {
  if (!policy || policy.schemaVersion !== 1) throw new Error('unsupported policy schema');
  requireText(policy.policyId, 'policyId');
  if (!/^\d+\.\d+\.\d+$/.test(policy.version || '')) throw new Error('version must be semver');
  requireIso(policy.effectiveAt, 'effectiveAt');
  requireText(policy.owner && policy.owner.ownerId, 'owner.ownerId');
  requireText(policy.owner && policy.owner.displayName, 'owner.displayName');
  if (!Array.isArray(policy.evidenceSourceIds) || !policy.evidenceSourceIds.length) {
    throw new Error('evidenceSourceIds are required');
  }
  for (const sourceId of policy.evidenceSourceIds) {
    if (!knownSourceIds.has(sourceId)) throw new Error(`unknown evidence source: ${sourceId}`);
  }
  if (!Array.isArray(policy.rules) || !policy.rules.length) throw new Error('policy rules are required');
  const ruleIds = new Set();
  for (const rule of policy.rules) {
    requireText(rule.ruleId, 'ruleId');
    requireText(rule.control, 'control');
    requireText(rule.rationale, 'rationale');
    if (ruleIds.has(rule.ruleId)) throw new Error(`duplicate ruleId: ${rule.ruleId}`);
    ruleIds.add(rule.ruleId);
  }
  const approvals = policy.approvalRequirements || {};
  if (!approvals.distinctFromProposer) throw new Error('approver must be distinct from proposer');
  if (!Array.isArray(approvals.requiredAttestations) || !approvals.requiredAttestations.length) {
    throw new Error('required attestations are required');
  }
  return policy;
}

function recordHash(record) {
  const material = { ...record };
  delete material.recordHash;
  return sha256(canonical(material));
}

function createRecord(type, payload, actorId, previousHash = null, occurredAt = new Date().toISOString()) {
  if (!RECORD_TYPES.has(type)) throw new Error(`unsupported record type: ${type}`);
  requireText(actorId, 'actorId');
  requireIso(occurredAt, 'occurredAt');
  if (previousHash !== null && !/^[0-9a-f]{64}$/.test(previousHash)) {
    throw new Error('previousHash is invalid');
  }
  const record = { schemaVersion: 1, type, occurredAt, actorId, previousHash, payload };
  record.recordHash = recordHash(record);
  return record;
}

function createSourceRecord(snapshot, actorId, previousHash, occurredAt) {
  validateSourceSnapshot(snapshot);
  return createRecord('source-ingested', snapshot, actorId, previousHash, occurredAt);
}

function createProposal(policy, actorId, previousHash, occurredAt, knownSourceIds) {
  validatePolicy(policy, knownSourceIds);
  return createRecord(
    'policy-proposed',
    {
      policyId: policy.policyId,
      policyVersion: policy.version,
      policySha256: sha256(canonical(policy)),
      ownerId: policy.owner.ownerId,
      evidenceSourceIds: [...policy.evidenceSourceIds],
      requiredAttestations: [...policy.approvalRequirements.requiredAttestations],
    },
    actorId,
    previousHash,
    occurredAt
  );
}

function createDecision(proposal, input, approverId, previousHash, occurredAt) {
  if (!proposal || proposal.type !== 'policy-proposed') throw new Error('proposal record is required');
  if (proposal.actorId === approverId) throw new Error('approver must be distinct from proposer');
  if (!DECISIONS.has(input.outcome)) throw new Error('outcome must be approved or rejected');
  requireText(input.rationale, 'rationale');
  const attestations = [...new Set(input.attestations || [])].sort();
  for (const required of proposal.payload.requiredAttestations) {
    if (!attestations.includes(required)) throw new Error(`missing attestation: ${required}`);
  }
  return createRecord(
    'decision',
    {
      proposalHash: proposal.recordHash,
      policyId: proposal.payload.policyId,
      policyVersion: proposal.payload.policyVersion,
      outcome: input.outcome,
      rationale: input.rationale,
      attestations,
      evidenceLinks: [...new Set(input.evidenceLinks || [])].sort(),
    },
    approverId,
    previousHash,
    occurredAt
  );
}

function verifyLedger(records) {
  let previousHash = null;
  const proposals = new Map();
  const decisions = new Set();
  for (const [index, record] of records.entries()) {
    if (record.schemaVersion !== 1 || !RECORD_TYPES.has(record.type)) {
      throw new Error(`record ${index} has unsupported schema or type`);
    }
    requireIso(record.occurredAt, `record ${index} occurredAt`);
    requireText(record.actorId, `record ${index} actorId`);
    if (record.previousHash !== previousHash) throw new Error(`record ${index} breaks hash chain`);
    if (record.recordHash !== recordHash(record)) throw new Error(`record ${index} hash mismatch`);
    if (record.type === 'source-ingested') validateSourceSnapshot(record.payload);
    if (record.type === 'policy-proposed') proposals.set(record.recordHash, record);
    if (record.type === 'decision') {
      const proposal = proposals.get(record.payload.proposalHash);
      if (!proposal) throw new Error(`record ${index} references an unknown proposal`);
      if (proposal.actorId === record.actorId) throw new Error(`record ${index} lacks independent approval`);
      if (!DECISIONS.has(record.payload.outcome)) throw new Error(`record ${index} has an invalid outcome`);
      requireText(record.payload.rationale, `record ${index} rationale`);
      if (!Array.isArray(record.payload.attestations)) {
        throw new Error(`record ${index} attestations are invalid`);
      }
      if (!Array.isArray(record.payload.evidenceLinks)) {
        throw new Error(`record ${index} evidence links are invalid`);
      }
      if (decisions.has(record.payload.proposalHash)) throw new Error('proposal has more than one decision');
      for (const required of proposal.payload.requiredAttestations) {
        if (!record.payload.attestations.includes(required)) {
          throw new Error(`record ${index} is missing attestation: ${required}`);
        }
      }
      decisions.add(record.payload.proposalHash);
    }
    previousHash = record.recordHash;
  }
  return { records: records.length, head: previousHash };
}

function requireApprovedPolicy(records, policy) {
  verifyLedger(records);
  const proposals = new Map(
    records
      .filter((record) => record.type === 'policy-proposed')
      .map((record) => [record.recordHash, record])
  );
  const decision = records.find((record) => {
    if (record.type !== 'decision' || record.payload.outcome !== 'approved') return false;
    const proposal = proposals.get(record.payload.proposalHash);
    return (
      proposal &&
      proposal.payload.policyId === policy.policyId &&
      proposal.payload.policyVersion === policy.version &&
      proposal.payload.policySha256 === sha256(canonical(policy))
    );
  });
  if (!decision) throw new Error(`no approved decision for ${policy.policyId}@${policy.version}`);
  if (!decision.payload.evidenceLinks.length) throw new Error('approved release decision requires evidence links');
  return decision;
}

function readLedger(file) {
  if (!fs.existsSync(file)) return [];
  const content = fs.readFileSync(file, 'utf8').trim();
  return content ? content.split('\n').map((line) => JSON.parse(line)) : [];
}

function appendRecord(file, record) {
  const existing = readLedger(file);
  verifyLedger(existing);
  const expectedPrevious = existing.length ? existing[existing.length - 1].recordHash : null;
  if (record.previousHash !== expectedPrevious) throw new Error('record does not extend ledger head');
  verifyLedger([...existing, record]);
  fs.appendFileSync(file, `${JSON.stringify(record)}\n`, { encoding: 'utf8', flag: 'a' });
  return record.recordHash;
}

module.exports = {
  appendRecord,
  canonical,
  createDecision,
  createProposal,
  createSourceRecord,
  detectSourceChange,
  readLedger,
  recordHash,
  requireApprovedPolicy,
  sha256,
  validatePolicy,
  validateSourceRegistry,
  validateSourceSnapshot,
  verifyLedger,
};
