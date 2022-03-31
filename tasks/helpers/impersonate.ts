import { task } from 'hardhat/config';
import { eEthereumNetwork, eNetwork, ICommonConfiguration } from '../../helpers/types';
import { ConfigNames, getTreasuryAddress, loadPoolConfig } from '../../helpers/configuration';
import * as marketConfigs from '../../markets/aave';
import * as reserveConfigs from '../../markets/aave/reservesConfigs';
import {
  getAaveProtocolDataProvider,
  getLendingPoolAddressesProvider,
  getWETHGateway,
  getLendingPoolConfiguratorProxy,
} from './../../helpers/contracts-getters';
import {
  authorizeWETHGateway,
  chooseATokenDeployment,
  deployDefaultReserveInterestRateStrategy,
  deployLendingPoolCollateralManager,
  deployStableDebtToken,
  deployVariableDebtToken,
  deployWalletBalancerProvider,
} from './../../helpers/contracts-deployments';
import { DRE, notFalsyOrZeroAddress, setDRE, waitForTx } from '../../helpers/misc-utils';
import { ZERO_ADDRESS } from './../../helpers/constants';
import { ethers, utils } from 'ethers';
import { getParamPerNetwork } from '../../helpers/contracts-helpers';
import { configureReservesByHelper, initReservesByHelper } from '../../helpers/init-helpers';
import { exit } from 'process';
import { MintableERC20Factory } from '../../types';

//Example usage
//In order to run, in hardhat confing file, we need to remove accounts in localhost network section
//Pick a mainnet user who has weth because he/she must have gas cost for transfer operation
//npx hardhat impersonate --mainnetuseraddress 0xE78388b4CE79068e89Bf8aA7f218eF6b9AB0e9d0  --tokenaddress  0x6B175474E89094C44Da98b954EedeAC495271d0F --amount 1000 --localuseraddress 0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266 --hardhathost http://localhost:8545
task('impersonate', 'Unlocking mainnet users')
  .addParam('mainnetuseraddress', 'User wallet address')
  .addParam('tokenaddress', 'Token contract address')
  .addParam('amount', 'How much you will transfer?')
  .addParam('localuseraddress', 'Local user')
  .addParam('hardhathost', 'hardhat host')
  .setAction(
    async (
      { mainnetuseraddress, localuseraddress, tokenaddress, amount, hardhathost },
      localBRE
    ) => {
      try {
        await localBRE.run('set-DRE');
        localBRE.ethers.provider = new ethers.providers.JsonRpcProvider(
          localBRE.ethers.provider.connection.url
        );
        const provider = new ethers.providers.JsonRpcProvider(hardhathost);
        console.log(
          'mainnetuseraddress:' +
            mainnetuseraddress +
            ':tokenaddress:' +
            tokenaddress +
            ':amount:' +
            amount +
            ':localuseraddress:' +
            localuseraddress
        );

        await provider.send('hardhat_impersonateAccount', [mainnetuseraddress]);
        const mainnetUser = provider.getSigner(mainnetuseraddress);
        console.log('Unlocked user:' + mainnetuseraddress);

        const token = await MintableERC20Factory.connect(tokenaddress, mainnetUser);
        const symbol = await token.symbol();
        console.log('symbol:' + symbol);

        if (symbol == 'WETH') {
          await mainnetUser.sendTransaction({
            to: localuseraddress,
            value: ethers.utils.parseEther(amount),
          });
          console.log(amount + ' ETH transferred');
        } else {
          await token.transfer(localuseraddress, amount);
          console.log('Transfer occured');
          const bal = await token.balanceOf(localuseraddress);
          console.log('User has ' + bal.toString() + ' tokens in his wallet now..');
        }

        const signers = await localBRE.ethers.getSigners();
        const localUser = signers.find(async (x) => (await x.getAddress()) == localuseraddress);
        if (localUser) {
          console.log('local user:' + (await localUser.getAddress()));
          const userBalance = await localUser.getBalance();
          console.log('Local user balance now:' + userBalance.toString());
        }
      } catch (err) {
        console.error(err);
        exit(1);
      }
    }
  );
