'use strict';

const fs = require('fs');
const path = require('path');

const artifactPath = path.resolve(
  __dirname,
  '..',
  'artifacts',
  'contracts',
  'protocol',
  'lendingpool',
  'LendingPool.sol',
  'LendingPool.json'
);
const eip170Limit = 24_576;

if (!fs.existsSync(artifactPath)) {
  console.error('LendingPool artifact is missing. Run npm run compile first.');
  process.exit(2);
}

const artifact = JSON.parse(fs.readFileSync(artifactPath, 'utf8'));
if (typeof artifact.deployedBytecode !== 'string' || !artifact.deployedBytecode.startsWith('0x')) {
  throw new Error('Artifact has no deployed bytecode.');
}

const deployedBytes = (artifact.deployedBytecode.length - 2) / 2;
if (deployedBytes > eip170Limit) {
  console.error(`LendingPool deployed bytecode is ${deployedBytes} bytes; EIP-170 limit is ${eip170Limit}.`);
  process.exit(1);
}

console.log(`LendingPool deployed bytecode: ${deployedBytes}/${eip170Limit} bytes.`);
