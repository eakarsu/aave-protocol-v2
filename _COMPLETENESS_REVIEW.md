# Completeness Review: aave-protocol-v2

**Review date:** 2026-07-20

## Assessment basis

Static inspection plus execution of the repository-owned nondestructive `start.sh` health entrypoint. This is a Solidity protocol/contracts repository and does not expose an independent web application, login surface, or listener.

## Classification

**Not an app**

This repository should not be counted as a launchable application. Its `start.sh` intentionally performs a bounded repository health check; it does not start a web/API service, so login and session verification are not applicable.

## Why it is not complete

- Checked-in environment files or credential-bearing artifacts require containment and secret-history review before execution.
- Source disables TLS verification, which invalidates a safe launch posture.
- Startup/automation includes process-killing, recursive deletion, or database-reset behavior that is unsafe without isolation.
- The supported build/runtime path and a trustworthy end-to-end workflow have not been demonstrated from the checked-in state.

## Needed features

1. Remove credential-bearing artifacts from the working tree, rotate any real secrets, and add safe environment templates plus secret scanning.
2. Restore certificate verification and fix the trust/configuration path; do not ship an insecure TLS bypass.
3. Replace destructive startup behavior with explicit, opt-in maintenance commands and nondestructive health checks.
4. Establish provenance/licensing and reproduce a clean build in an isolated environment before adding product surface.
5. Replace advisory-only AI output with versioned policies, evidence links, accountable owners, approvals, and immutable decisions.
6. Add authoritative regulatory/contract ingestion with source provenance, effective dates, jurisdiction, and change detection.

## Risks or launch blockers

- Credential/configuration exposure: environment files are present in the repository tree and must be checked against Git history and rotated if real.
- Weak/fallback secret patterns can permit forged sessions or accidental insecure deployments.
- TLS certificate verification is disabled in inspected code.
- Automation contains destructive process, filesystem, or database operations; do not run it on a shared machine without review.

## Evidence inspected

- `README.md`
- `helpers/contracts-deployments.ts:734`
- `helpers/contracts-deployments.ts:236`
- `types/IAaveIncentivesController.d.ts`
- `docker-compose.test.yml`
- `.gitlab-ci.yml`

## Recommended next action

Quarantine execution, repair provenance/secret/startup/build blockers in an isolated branch, and reassess only after a clean reproducible build and smoke test.

## Implementation progress (2026-07-18)

All six repository-owned remediation areas have now been implemented. This does
not certify the fork for production deployment; the external release gates below
remain deliberately fail-closed.

1. **Credential containment and scanning:** removed the tracked `.env`, embedded
   provider tokens, literal reusable wallet secrets, mnemonic logging, and other
   credential-bearing defaults. Added a names-only `.env.example`, defensive
   ignore rules, a working-tree/package security scanner, and a history audit
   that reports sensitive paths without printing their contents. The audit found
   `.env` in five historical commits, so provider-side rotation/revocation is an
   explicit release gate rather than an unsupported repository claim.
2. **TLS and trust configuration:** confirmed that the cited `verify=false`
   values controlled explorer source publication rather than certificate
   validation. Runtime RPC configuration now rejects non-HTTPS remote URLs,
   credentialized URLs, implicit fork configuration, and TLS-bypass patterns;
   loopback HTTP remains available only for local development.
3. **Nondestructive operation:** `start.sh` and `npm run run-env` now perform
   health checks only. Generated-output cleanup is a separate opt-in command
   requiring `ALLOW_GENERATED_CLEANUP=1`, uses fixed project-local targets, and
   refuses symlinks. Container/CI startup no longer installs on launch, mounts a
   host service directory, tails forever, resets state, or kills processes.
4. **Provenance and reproducibility:** added an integrity-pinned provenance
   manifest for the AGPL license, whitepaper, and six historical audit reports;
   repository checkouts verify origin and baseline commit, while packaged builds
   clearly report unavailable Git metadata. Removed the unaudited Enzyme
   prototype and restored the audited Aave V2 interest, proxy-admin, token
   transfer, liquidation, borrow/repay, and flash-loan invariants. The legacy
   toolchain is lockfile-pinned to Node 16.20.2, npm 8.19.4, Hardhat 2.9.1, and
   its compatible Waffle versions. Deployable bytecode is checked against the
   24,576-byte EVM limit.
5. **Accountable policy decisions:** added semantically versioned policy records,
   evidence-source identifiers, accountable owners, distinct proposer/approver
   enforcement, required attestations, one immutable decision per proposal, and
   append-only hash-chained NDJSON verification. Publishing now fails closed
   unless the exact current policy digest has an approved decision with evidence
   links; no release approval is pre-populated.
6. **Authoritative source ingestion:** added HTTPS-only source snapshots with
   source type, authority, publisher, jurisdiction, effective/retrieval dates,
   content digest, prior digest, and change classification. The repository
   contains integrity-pinned Certora audit and AGPL contract/license sources.
   eCFR, EUR-Lex/Official Journal, and SEC are an explicit pending authority
   catalog, not falsely represented as already ingested or applicable.

### Verification performed

- Runtime acceptance on 2026-07-20: `./start.sh` exited successfully without opening a listener. The repository scan passed across 890 files, all 8 integrity-pinned provenance files verified, and all 22 governance/security/provenance tests passed. Login/session checks are not applicable to this contracts repository; `_runtime_non_suite_repair_shard2k.tsv` records `NOT_APPLICABLE / not_independent_application`.
- Host health: repository scan passed across 890 files; provenance verified all
  8 pinned files plus Git origin/baseline; 22 governance/security/provenance tests
  passed.
- Contract regression: all 293 local Aave protocol tests passed with the final
  pinned dependency pair.
- Clean isolated validation: a dependency-free temporary copy installed from
  `package-lock.json` under Node 16.20.2/npm 8.19.4, compiled 122 Solidity files,
  measured `LendingPool` at 22,375/24,576 deployed bytes, and passed all 293
  protocol tests. Its packaged/no-`.git` health path also passed.
- `npm audit` still reports 185 legacy transitive findings (25 low, 36 moderate,
  64 high, 60 critical). No unsafe major-version force fix was applied.
- `npm run verify:release-approval` correctly refuses publication because no
  owner-approved release decision exists.

### Remaining external release gates

- Revoke or rotate any credential that was ever valid and record provider-side
  evidence; review all refs/forks before any separately approved history rewrite.
- Complete upstream/custom-change authorship and license reconciliation, migrate
  the legacy dependency graph, repeat bytecode and regression verification, and
  obtain security assessment for the exact release commit.
- Determine which legal/regulatory authorities actually apply, ingest the exact
  effective source material, obtain qualified legal review, and append the
  independently approved release decision. Repository policy output is decision
  support, not legal, financial, regulatory, or security certification.

The repository is now functional and reproducibly tested, but production
publication remains intentionally blocked until those owner-controlled external
actions are completed.
