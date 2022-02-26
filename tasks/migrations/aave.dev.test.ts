import { task } from 'hardhat/config';
import { checkVerification } from '../../helpers/etherscan-verification';
import { ConfigNames } from '../../helpers/configuration';
import { DRE, getDb, printContracts, printContractsTestEnzyme } from '../../helpers/misc-utils';

task('aave:dev:test', 'Deploy development enviroment')
  .addFlag('verify', 'Verify contracts at Etherscan')
  .setAction(async ({ verify }, localBRE) => {
    const POOL_NAME = ConfigNames.Aave;
    await localBRE.run('set-DRE');

    // Prevent loss of gas verifying all the needed ENVs for Etherscan verification
    if (verify) {
      checkVerification();
    }

    console.log('3. Deploy lending pool');
    await localBRE.run('dev:test:deploy-lending-pool', { verify, pool: POOL_NAME });

    console.log('\nFinished migration');
    await printContractsTestEnzyme();
  });
