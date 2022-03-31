import { task } from 'hardhat/config';
import {
  getAaveProtocolDataProvider,
  getLendingPoolAddressesProvider,
  getLendingPoolConfiguratorProxy,
  getWETHGateway,
} from './../../helpers/contracts-getters';

import { DRE, notFalsyOrZeroAddress, setDRE, waitForTx } from '../../helpers/misc-utils';
import { exit } from 'process';
import { ethers } from 'ethers';

//Example usage
//In order to run, in hardhat confing file, we need to remove accounts in localhost network section
//Pick a mainnet user who has weth because he/she must have gas cost for transfer operation
//npx hardhat unpause  --localuseraddress 0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266 --hardhathost http://localhost:8545

task('unpause', 'Unpause Pool')
  .addParam('localuseraddress', 'Local user')
  .addParam('hardhathost', 'hardhat host')
  .setAction(async ({ localuseraddress, hardhathost }, localBRE) => {
    try {
      await localBRE.run('set-DRE');
      console.log(
        'localBRE.ethers.provider.connection.url:' + localBRE.ethers.provider.connection.url
      );

      localBRE.ethers.provider = new ethers.providers.JsonRpcProvider(hardhathost);

      //Fix pool
      const signers = await localBRE.ethers.getSigners();
      const localUser = signers.find(async (x) => (await x.getAddress()) == localuseraddress);
      if (localUser) {
        //Fix pool
        DRE.network.name = 'localhost';
        const addressesProvider = await getLendingPoolAddressesProvider();
        const lpc = await getLendingPoolConfiguratorProxy(
          await addressesProvider.getLendingPoolConfigurator()
        );
        //Unpause pool
        await lpc.setPoolPause(false);
      }
    } catch (err) {
      console.error(err);
      exit(1);
    }
  });
