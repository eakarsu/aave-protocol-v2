# Provenance and licensing

This checkout identifies itself as `@aave/protocol-v2` and declares the GNU
Affero General Public License, version 3 or later. The checked-in license,
whitepaper, and audit reports are integrity-pinned in
`provenance/manifest.json`; `npm run provenance:verify` always verifies their
hashes and manifest constraints. In a repository checkout it also verifies the
Git origin and recorded baseline commit. In a packaged/container context where
`.git` is intentionally absent, it reports that limitation instead of claiming
those repository checks ran.

The configured origin is the `eakarsu/aave-protocol-v2` fork. README attribution
and package metadata identify Aave as the upstream author, but this remediation
did not establish a complete commit-by-commit reconciliation with the official
Aave repository. The unfinished Enzyme integration was removed from deployable
sources. Its historical commits remain subject to authorship, notice, and
license review and must not be reintroduced without the controls in
`EXPERIMENTAL_ENZYME_INTEGRATION.md`.

The included historical audit reports apply to the audited Aave V2 baseline,
not automatically to later fork modifications. They are evidence, not a current
security certification. Production release remains blocked until the exact
release commit receives an owner-approved provenance reconciliation, license
review, security review, dependency migration, and applicable external audit.
See `DEPENDENCY_SECURITY.md` for the verified legacy toolchain and unresolved
npm audit findings.
