// @ts-ignore
import { HardhatNetworkForkingUserConfig } from 'hardhat/types';
import {
  eAvalancheNetwork,
  eEthereumNetwork,
  eNetwork,
  ePolygonNetwork,
  eXDaiNetwork,
  iParamsPerNetwork,
} from './helpers/types';

require('dotenv').config();

const INFURA_KEY = process.env.INFURA_KEY || '';
const ALCHEMY_KEY = process.env.ALCHEMY_KEY || '';
const TENDERLY_FORK_ID = process.env.TENDERLY_FORK_ID || '';
const FORK = process.env.FORK || '';
const FORK_BLOCK_NUMBER = process.env.FORK_BLOCK_NUMBER
  ? parseInt(process.env.FORK_BLOCK_NUMBER, 10)
  : 0;
const UNCONFIGURED_RPC = 'https://rpc.invalid';
const GWEI = 1000 * 1000 * 1000;

const explicitRpc = (network: string): string =>
  process.env[`RPC_URL_${network.toUpperCase()}`] || '';

export const assertSafeRpcUrl = (rawUrl: string, network: string): string => {
  let parsed: URL;
  try {
    parsed = new URL(rawUrl);
  } catch (_) {
    throw new Error(`RPC URL for ${network} is not a valid URL`);
  }

  const localHost = parsed.hostname === 'localhost' || parsed.hostname === '127.0.0.1';
  if (parsed.protocol !== 'https:' && !(localHost && parsed.protocol === 'http:')) {
    throw new Error(`RPC URL for ${network} must use verified HTTPS (HTTP is local-only)`);
  }
  if (parsed.username || parsed.password) {
    throw new Error(`RPC URL for ${network} must not contain userinfo credentials`);
  }
  return parsed.toString();
};

const ethereumRpc = (network: eEthereumNetwork): string => {
  const configured = explicitRpc(network);
  if (configured) return assertSafeRpcUrl(configured, network);
  if (ALCHEMY_KEY) {
    const host = network === eEthereumNetwork.main ? 'eth-mainnet' : `eth-${network}`;
    return assertSafeRpcUrl(`https://${host}.g.alchemy.com/v2/${ALCHEMY_KEY}`, network);
  }
  if (INFURA_KEY) {
    const host = network === eEthereumNetwork.main ? 'mainnet' : network;
    return assertSafeRpcUrl(`https://${host}.infura.io/v3/${INFURA_KEY}`, network);
  }
  return UNCONFIGURED_RPC;
};

export const NETWORKS_RPC_URL: iParamsPerNetwork<string> = {
  [eEthereumNetwork.kovan]: ethereumRpc(eEthereumNetwork.kovan),
  [eEthereumNetwork.ropsten]: ethereumRpc(eEthereumNetwork.ropsten),
  [eEthereumNetwork.main]: ethereumRpc(eEthereumNetwork.main),
  [eEthereumNetwork.coverage]: 'http://127.0.0.1:8555',
  [eEthereumNetwork.hardhat]: 'http://127.0.0.1:8545',
  [eEthereumNetwork.buidlerevm]: 'http://127.0.0.1:8545',
  [eEthereumNetwork.tenderly]: explicitRpc(eEthereumNetwork.tenderly)
    ? assertSafeRpcUrl(explicitRpc(eEthereumNetwork.tenderly), eEthereumNetwork.tenderly)
    : TENDERLY_FORK_ID
    ? assertSafeRpcUrl(
        `https://rpc.tenderly.co/fork/${TENDERLY_FORK_ID}`,
        eEthereumNetwork.tenderly
      )
    : UNCONFIGURED_RPC,
  [ePolygonNetwork.mumbai]: explicitRpc(ePolygonNetwork.mumbai)
    ? assertSafeRpcUrl(explicitRpc(ePolygonNetwork.mumbai), ePolygonNetwork.mumbai)
    : 'https://rpc-mumbai.maticvigil.com/',
  [ePolygonNetwork.matic]: explicitRpc(ePolygonNetwork.matic)
    ? assertSafeRpcUrl(explicitRpc(ePolygonNetwork.matic), ePolygonNetwork.matic)
    : UNCONFIGURED_RPC,
  [eXDaiNetwork.xdai]: explicitRpc(eXDaiNetwork.xdai)
    ? assertSafeRpcUrl(explicitRpc(eXDaiNetwork.xdai), eXDaiNetwork.xdai)
    : 'https://rpc.xdaichain.com/',
  [eAvalancheNetwork.avalanche]: explicitRpc(eAvalancheNetwork.avalanche)
    ? assertSafeRpcUrl(explicitRpc(eAvalancheNetwork.avalanche), eAvalancheNetwork.avalanche)
    : 'https://api.avax.network/ext/bc/C/rpc',
  [eAvalancheNetwork.fuji]: explicitRpc(eAvalancheNetwork.fuji)
    ? assertSafeRpcUrl(explicitRpc(eAvalancheNetwork.fuji), eAvalancheNetwork.fuji)
    : 'https://api.avax-test.network/ext/bc/C/rpc',
};

export const buildForkConfig = (): HardhatNetworkForkingUserConfig | undefined => {
  if (!FORK) return undefined;
  if (!Object.prototype.hasOwnProperty.call(NETWORKS_RPC_URL, FORK)) {
    throw new Error(`Unsupported FORK network: ${FORK}`);
  }

  const url = NETWORKS_RPC_URL[FORK];
  if (!url || url === UNCONFIGURED_RPC) {
    throw new Error(`FORK=${FORK} requires a configured RPC URL or provider key`);
  }
  const forkMode: HardhatNetworkForkingUserConfig = {
    url: assertSafeRpcUrl(url, FORK),
  };
  if (FORK_BLOCK_NUMBER || BLOCK_TO_FORK[FORK]) {
    forkMode.blockNumber = FORK_BLOCK_NUMBER || BLOCK_TO_FORK[FORK];
  }
  return forkMode;
};

export const NETWORKS_DEFAULT_GAS: iParamsPerNetwork<number> = {
  [eEthereumNetwork.kovan]: 3 * GWEI,
  [eEthereumNetwork.ropsten]: 65 * GWEI,
  [eEthereumNetwork.main]: 65 * GWEI,
  [eEthereumNetwork.coverage]: 65 * GWEI,
  [eEthereumNetwork.hardhat]: 65 * GWEI,
  [eEthereumNetwork.buidlerevm]: 65 * GWEI,
  [eEthereumNetwork.tenderly]: 1 * GWEI,
  [ePolygonNetwork.mumbai]: 35 * GWEI,
  [ePolygonNetwork.matic]: 35 * GWEI,
  [eXDaiNetwork.xdai]: 1 * GWEI,
  [eAvalancheNetwork.avalanche]: 225 * GWEI,
  [eAvalancheNetwork.fuji]: 85 * GWEI,
};

export const BLOCK_TO_FORK: iParamsPerNetwork<number | undefined> = {
  [eEthereumNetwork.main]: 12406069,
  [eEthereumNetwork.kovan]: undefined,
  [eEthereumNetwork.ropsten]: undefined,
  [eEthereumNetwork.coverage]: undefined,
  [eEthereumNetwork.hardhat]: undefined,
  [eEthereumNetwork.buidlerevm]: undefined,
  [eEthereumNetwork.tenderly]: undefined,
  [ePolygonNetwork.mumbai]: undefined,
  [ePolygonNetwork.matic]: undefined,
  [eXDaiNetwork.xdai]: undefined,
  [eAvalancheNetwork.avalanche]: undefined,
  [eAvalancheNetwork.fuji]: undefined,
};
