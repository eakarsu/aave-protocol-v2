'use strict';

const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const excludedDirectories = new Set(['.git', 'artifacts', 'cache', 'coverage', 'node_modules', 'types']);

function enumeratePackagedFiles(directory, prefix = '') {
  const files = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const relative = prefix ? `${prefix}/${entry.name}` : entry.name;
    if (entry.isDirectory()) {
      if (!(prefix === '' && excludedDirectories.has(entry.name))) {
        files.push(...enumeratePackagedFiles(path.join(directory, entry.name), relative));
      }
    } else if (entry.isFile()) {
      files.push(relative);
    }
  }
  return files;
}

let files;
try {
  files = execFileSync('git', ['ls-files', '--cached', '--others', '--exclude-standard', '-z'], {
    cwd: root,
    stdio: ['ignore', 'pipe', 'ignore'],
  })
    .toString('utf8')
    .split('\0')
    .filter(Boolean);
} catch (_) {
  files = enumeratePackagedFiles(root);
}

const failures = [];
const allowedEnv = new Set(['.env.example']);
for (const file of files) {
  if (!fs.existsSync(path.join(root, file))) continue;
  if ((file === '.env' || file.startsWith('.env.')) && !allowedEnv.has(file)) {
    failures.push(`${file}: tracked environment file`);
  }
}

const checks = [
  ['TLS verification bypass', new RegExp('NODE_TLS_REJECT_' + 'UNAUTHORIZED\\s*=\\s*["\\\']?0')],
  ['TLS verification bypass', new RegExp('reject' + 'Unauthorized\\s*:\\s*false')],
  ['TLS verification bypass', new RegExp('strict' + 'SSL\\s*:\\s*false')],
  ['literal private key', new RegExp('(privateKey|secretKey)\\s*[:=]\\s*["\\\']0x[0-9a-fA-F]{64}["\\\']')],
  ['literal mnemonic', new RegExp('mnemonic\\s*:\\s*["\\\'](?:[a-z]+\\s+){11}[a-z]+["\\\']', 'i')],
  ['credentialized provider URL', new RegExp('https://[^\\s"\\\']+/(?:v2|v3)/[A-Za-z0-9_-]{16,}')],
  ['secret logging', new RegExp('console\\.log\\s*\\([^\\n]*(mnemonic|privateKey|secretKey)', 'i')],
];

const skipped = new Set([
  'package-lock.json',
  'security/scan-repository.cjs',
  'security/scan-repository.test.cjs',
]);
for (const file of files) {
  if (skipped.has(file)) continue;
  const absolute = path.join(root, file);
  let content;
  try {
    content = fs.readFileSync(absolute, 'utf8');
  } catch (_) {
    continue;
  }
  if (content.includes('\0')) continue;
  for (const [label, pattern] of checks) {
    if (pattern.test(content)) failures.push(`${file}: ${label}`);
  }
}

if (failures.length) {
  console.error(`Repository security scan failed (${failures.length} finding(s)):`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`Repository security scan passed (${files.length} repository files).`);
