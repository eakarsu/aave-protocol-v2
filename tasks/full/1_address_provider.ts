import { task } from 'hardhat/config';
import { deployLendingPoolAddressesProvider } from '../../helpers/contracts-deployments';
import { notFalsyOrZeroAddress, waitForTx } from '../../helpers/misc-utils';
import {
  ConfigNames,
  loadPoolConfig,
  getGenesisPoolAdmin,
  getEmergencyAdmin,
} from '../../helpers/configuration';
import { getParamPerNetwork } from '../../helpers/contracts-helpers';
import { eNetwork } from '../../helpers/types';

task(
  'full:deploy-address-provider',
  'Deploy address provider, registry and fee provider for dev enviroment'
)
  .addFlag('verify', 'Verify contracts at Etherscan')
  .addParam('pool', `Pool name to retrieve configuration, supported: ${Object.values(ConfigNames)}`)
  .addFlag('skipRegistry')
  .setAction(async ({ verify, pool, skipRegistry }, DRE) => {
    await DRE.run('set-DRE');
    const poolConfig = loadPoolConfig(pool);
    const { MarketId } = poolConfig;
    console.log('full:deploy-address-provider:poolConfig:' + JSON.stringify(poolConfig));
    // 1. Deploy address provider and set genesis manager
    const addressesProvider = await deployLendingPoolAddressesProvider(MarketId, verify);
    console.log('full:deploy-address-provider:2:skipRegistry:' + skipRegistry);

    // 2. Add to registry or setup a new one
    if (!skipRegistry) {
      const providerRegistryAddress = getParamPerNetwork(
        poolConfig.ProviderRegistry,
        <eNetwork>DRE.network.name
      );
      console.log(
        'full:deploy-address-provider:providerRegistryAddress:' +
          JSON.stringify(providerRegistryAddress) +
          ': addressesProvider.address' +
          addressesProvider.address
      );

      await DRE.run('add-market-to-registry', {
        pool,
        addressesProvider: addressesProvider.address,
        deployRegistry: !notFalsyOrZeroAddress(providerRegistryAddress),
      });
      console.log('full:deploy-address-provider:add-market-to-registry');
    }
    console.log('3. Set pool admins:add-market-to-registry after');

    // 3. Set pool admins
    await waitForTx(await addressesProvider.setPoolAdmin(await getGenesisPoolAdmin(poolConfig)));
    console.log('3. Set pool admins before XX');

    await waitForTx(await addressesProvider.setEmergencyAdmin(await getEmergencyAdmin(poolConfig)));

    console.log('Pool Admin', await addressesProvider.getPoolAdmin());
    console.log('Emergency Admin', await addressesProvider.getEmergencyAdmin());
  });
