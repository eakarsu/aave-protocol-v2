# Governance evidence pipeline

The pipeline records authoritative-source snapshots, detects source changes,
validates versioned policies, separates proposal from approval, and writes
decisions to hash-chained NDJSON. Editing or reordering a prior line breaks
verification. This is decision-support infrastructure, not an automated legal
opinion or release authorization.

`source-registry.json` integrity-pins evidence already present in the repository.
Its authority catalog is an explicit ingestion queue; a URL alone is not treated
as ingested evidence. Operators must retrieve authoritative content through an
approved network path and capture its effective date and jurisdiction.

Use `node scripts/governance-ledger.cjs help` for the bounded CLI. Ledger writes
are restricted to `governance/ledgers/*.ndjson`. Proposals and decisions require
explicit actor identifiers; a distinct approver and all policy attestations are
enforced. External identity, legal review, and source-authority validation remain
deployment controls outside this repository.

The publish workflow also runs `npm run verify:release-approval`. It fails closed
unless `governance/ledgers/release.ndjson` contains a hash-valid approval for the
exact current policy digest with evidence links. The repository intentionally
contains no pre-approved release decision.
