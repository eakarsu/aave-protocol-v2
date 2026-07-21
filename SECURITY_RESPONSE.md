# Security containment and rotation gate

The 2026-07-19 remediation removed the tracked `.env`, embedded RPC-provider
tokens, reusable private-key literals, secret logging, and a committed local
mnemonic. `.env.example` contains names only, while `.gitignore` prevents local
secret files and common key containers from being tracked.

`npm run security:scan` fails on tracked environment files, TLS-verification
bypasses, credentialized provider URLs, literal private keys or mnemonics, and
secret logging. `npm run security:history` reports whether known sensitive paths
appear in history without printing their contents.

## External action still required

Repository changes cannot prove provider-side revocation. An accountable owner
must revoke or rotate every credential that was ever valid, review all Git refs
and forks, record provider audit evidence, and approve any history rewrite. Until
that evidence exists, production deployment remains blocked. No history was
rewritten by this remediation.

The review's cited `verify=false` occurrences select whether deployment source is
submitted for explorer verification. They are not TLS controls. RPC URLs now
require HTTPS except for loopback development endpoints, and no certificate
verification bypass is permitted by the repository scan.
