import { task } from 'hardhat/config';
import { deployAllMockTokens } from '../../helpers/contracts-deployments';

task('dev:deploy-mock-tokens', 'Deploy mock tokens for dev enviroment')
  .addFlag('verify', 'Verify contracts at Etherscan')
  .setAction(async ({ verify }, localBRE) => {
    console.log('dev:deploy-mock-tokens.Deploy mock tokens ');
    await localBRE.run('set-DRE');
    await deployAllMockTokens(verify);
  });
