#!/bin/sh
set -eu

# Startup is intentionally nondestructive: it validates repository-owned
# security, provenance, and governance controls without installing packages,
# deleting files, resetting databases, or starting privileged services.
exec npm run health
