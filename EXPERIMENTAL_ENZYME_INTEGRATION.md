# Excluded Enzyme prototype

This fork previously placed an unfinished Enzyme bridge and lending-pool manager
inside the deployable Solidity tree. The prototype changed Aave reserve custody,
disabled core interest accounting, bypassed proxy-admin authorization, weakened
safe token transfers, and contained extensive development logging. It was not
covered by the included Aave audit reports and had no complete provenance or
license reconciliation.

The 2026-07-19 remediation removed that prototype from `contracts/`, deployment
tasks, generated factories, and the supported Aave execution path. The source is
recoverable from repository history, including the integration commits beginning
with `bb230ac5` and `5dbc82d6`; those commits are historical evidence, not an
approved implementation or release source.

Reintroducing any Enzyme integration requires a separate design, threat model,
license and provenance review, explicit accountable owner, isolated contracts,
new invariant and integration tests, and an audit scoped to the exact release
commit. It must not overload the Aave aToken custody model or disable standard
debt accrual and upgrade authorization.
