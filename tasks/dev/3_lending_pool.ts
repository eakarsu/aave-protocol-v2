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

task('dev:deploy-lending-pool', 'Deploy lending pool for dev enviroment')
  .addFlag('verify', 'Verify contracts at Etherscan')
  .addParam('pool', `Pool name to retrieve configuration, supported: ${Object.values(ConfigNames)}`)
  .setAction(async ({ verify, pool }, localBRE) => {
    console.log('dev:deploy-lending-poolXXXXX');
    await localBRE.run('set-DRE');
    const addressesProvider = await getLendingPoolAddressesProvider();
    const poolConfig = loadPoolConfig(pool);

    const lendingPoolImpl = await deployLendingPool(verify);
    console.log('lendingPoolImpl');

    // Set lending pool impl to Address Provider
    await waitForTx(await addressesProvider.setLendingPoolImpl(lendingPoolImpl.address));
    console.log('addressesProvider');

    const address = await addressesProvider.getLendingPool();
    const lendingPoolProxy = await getLendingPool(address);
    console.log('lendingPoolProxy');

    await insertContractAddressInDb(eContractid.LendingPool, lendingPoolProxy.address);

    const lendingPoolConfiguratorImpl = await deployLendingPoolConfigurator(verify);
    console.log('lendingPoolConfiguratorImpl');

    // Set lending pool conf impl to Address Provider
    await waitForTx(
      await addressesProvider.setLendingPoolConfiguratorImpl(lendingPoolConfiguratorImpl.address)
    );

    const enzymeLendingPoolImpl = await deployEnzymeLendingPool(verify);
    const id1 = utils.keccak256(utils.toUtf8Bytes('EnzymeLendingPoolManagerId'));
    await waitForTx(await addressesProvider.setAddress(id1, enzymeLendingPoolImpl.address));
    const enzymeBridgeImpl = await deployEnzymeBridge(verify);
    const id2 = utils.keccak256(utils.toUtf8Bytes('EnzymeBridgeId'));
    await waitForTx(await addressesProvider.setAddress(id2, enzymeBridgeImpl.address));
    const lendingPoolConfiguratorProxy = await getLendingPoolConfiguratorProxy(
      await addressesProvider.getLendingPoolConfigurator()
    );
    await insertContractAddressInDb(
      eContractid.LendingPoolConfigurator,
      lendingPoolConfiguratorProxy.address
    );

    // Deploy deployment helpers
    await deployStableAndVariableTokensHelper(
      [lendingPoolProxy.address, addressesProvider.address],
      verify
    );
    await deployATokensAndRatesHelper(
      [lendingPoolProxy.address, addressesProvider.address, lendingPoolConfiguratorProxy.address],
      verify
    );
    await deployATokenImplementations(pool, poolConfig.ReservesConfig, verify);
  });
