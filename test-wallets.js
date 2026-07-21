const crypto = require('crypto');

const balance = '1000000000000000000000000';

// Local test keys are derived at runtime so reusable private-key literals are not
// stored in source. These accounts are test-only and must never hold real funds.
const localTestKey = (index) =>
  `0x${crypto
    .createHash('sha256')
    .update(`aave-protocol-v2-local-test-wallet-${index}`)
    .digest('hex')}`;

module.exports = {
  accounts: [
    {
      secretKey: localTestKey(0),
      balance,
    },
    {
      secretKey: localTestKey(1),
      balance,
    },
    {
      secretKey: localTestKey(2),
      balance,
    },
    {
      secretKey: localTestKey(3),
      balance,
    },
    {
      secretKey: localTestKey(4),
      balance,
    },
    {
      secretKey: localTestKey(5),
      balance,
    },
    {
      secretKey: localTestKey(6),
      balance,
    },
    {
      secretKey: localTestKey(7),
      balance,
    },
  ],
};
