# Legacy dependency security status

The reproducible validation toolchain is pinned to Node 16.20.2, npm 8.19.4,
Hardhat 2.9.1, and the original compatible Waffle 2.0.0/3.0.2 pair. This keeps
the historical Aave V2 test semantics deterministic, but it is a legacy build
environment, not a production runtime.

On 2026-07-19, a clean `npm ci` completed from `package-lock.json`. npm reported
185 transitive findings: 25 low, 36 moderate, 64 high, and 60 critical. No
`npm audit fix --force` was applied because it would replace core blockchain
tooling across major versions without a migration and could invalidate the
historical contract tests and audit relationship.

Production publication remains blocked until an accountable owner funds and
approves a Hardhat/dependency migration, reviews the resulting audit graph,
re-runs all tests and bytecode checks, and obtains security review for the exact
release commit. The CI container exists to reproduce validation only; it is not
an endorsement of the end-of-life Node runtime for an exposed service.
