'use strict';

const { execFileSync } = require('child_process');
const path = require('path');

const root = path.resolve(__dirname, '..');
const sensitivePaths = ['.env', '.npmrc'];
let found = false;

for (const file of sensitivePaths) {
  const commits = execFileSync('git', ['log', '--all', '--format=%H', '--', file], {
    cwd: root,
  })
    .toString('utf8')
    .trim()
    .split('\n')
    .filter(Boolean);
  if (commits.length) {
    found = true;
    console.log(`${file}: present in ${commits.length} historical commit(s)`);
  }
}

if (!found) console.log('No historical commits found for the sensitive path list.');
console.log('Historical presence is a rotation/revocation gate; this command does not prove rotation.');
