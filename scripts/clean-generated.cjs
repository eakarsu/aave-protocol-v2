'use strict';

const fs = require('fs');
const path = require('path');

if (process.env.ALLOW_GENERATED_CLEANUP !== '1') {
  console.error('Refusing cleanup. Re-run with ALLOW_GENERATED_CLEANUP=1.');
  process.exit(2);
}

const root = fs.realpathSync(path.resolve(__dirname, '..'));
const generated = ['artifacts', 'cache', 'types'];

for (const name of generated) {
  const target = path.join(root, name);
  if (path.dirname(target) !== root) throw new Error(`Unsafe cleanup target: ${target}`);
  if (!fs.existsSync(target)) continue;
  const stat = fs.lstatSync(target);
  if (stat.isSymbolicLink()) throw new Error(`Refusing to remove symlink: ${target}`);
  fs.rmSync(target, { recursive: true, force: false });
  console.log(`Removed generated directory: ${name}`);
}
