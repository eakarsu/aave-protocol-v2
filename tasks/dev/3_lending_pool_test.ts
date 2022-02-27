import { task } from 'hardhat/config';
import {
  deployATokenImplementations,
  deployATokensAndRatesHelper,
  deployLendingPool,
  deployLendingPoolConfigurator,
  deployStableAndVariableTokensHelper,
  deployEnzymeLendingPool,
  deployEnzymeBridge,
} from '../../helpers/contracts-deployments';
import { eContractid } from '../../helpers/types';
import { waitForTx } from '../../helpers/misc-utils';
import {
  getLendingPoolAddressesProvider,
  getLendingPool,
  getLendingPoolConfiguratorProxy,
} from '../../helpers/contracts-getters';
import { insertContractAddressInDb } from '../../helpers/contracts-helpers';
import { ConfigNames, loadPoolConfig } from '../../helpers/configuration';
import { ethers, utils } from 'ethers';

task('dev:test:deploy-lending-pool', 'Deploy lending pool for dev enviroment')
  .addFlag('verify', 'Verify contracts at Etherscan')
  .addParam('pool', `Pool name to retrieve configuration, supported: ${Object.values(ConfigNames)}`)
  .setAction(async ({ verify, pool }, localBRE) => {
    console.log('dev:test:deploy-lending-pool');
    await localBRE.run('set-DRE');
    const addressesProvider = await getLendingPoolAddressesProvider();
    const poolConfig = loadPoolConfig(pool);
    console.log('Lending Pool redeployed');

    const lendingPoolImpl = await deployLendingPool(verify);
    console.log('after deployLendingPool');

    const enzymeBridgeImpl = await deployEnzymeBridge(verify);
    console.log('deployEnzymeBridge');

    const id = ethers.utils.formatBytes32String('EnzymeBridgeId');
    await waitForTx(await addressesProvider.setAddress(id, enzymeBridgeImpl.address));
    console.log('Enzyme Bridge redeployed');
  });
