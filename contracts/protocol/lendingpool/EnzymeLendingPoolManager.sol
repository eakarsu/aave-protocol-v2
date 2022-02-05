// SPDX-License-Identifier: agpl-3.0
pragma solidity 0.6.12;

import {LendingPoolStorage} from './LendingPoolStorage.sol';
import {DataTypes} from '../libraries/types/DataTypes.sol';
import {Errors} from '../libraries/helpers/Errors.sol';
import {ReserveConfiguration} from '../libraries/configuration/ReserveConfiguration.sol';
import 'hardhat/console.sol';

contract EnzymeLendingPoolManager is LendingPoolStorage {
  using ReserveConfiguration for DataTypes.ReserveConfigurationMap;

  function makeEnzymePool(address fromAsset, address toAsset) external {
    DataTypes.ReserveData memory reserve;
    reserve.liquidityIndex = _reserves[fromAsset].liquidityIndex;
    reserve.variableBorrowIndex = _reserves[fromAsset].variableBorrowIndex;
    reserve.currentLiquidityRate = _reserves[fromAsset].currentLiquidityRate;
    reserve.currentVariableBorrowRate = _reserves[fromAsset].currentVariableBorrowRate;
    reserve.currentStableBorrowRate = _reserves[fromAsset].currentStableBorrowRate;
    reserve.lastUpdateTimestamp = _reserves[fromAsset].lastUpdateTimestamp;
    reserve.aTokenAddress = _reserves[fromAsset].aTokenAddress;
    reserve.stableDebtTokenAddress = _reserves[fromAsset].stableDebtTokenAddress;
    reserve.variableDebtTokenAddress = _reserves[fromAsset].variableDebtTokenAddress;
    reserve.interestRateStrategyAddress = _reserves[fromAsset].interestRateStrategyAddress;
    reserve.configuration.data = _reserves[fromAsset].configuration.data;
    reserve.configuration.setBorrowingEnabled(true);
    reserve.configuration.setStableRateBorrowingEnabled(true);
    _reserves[toAsset] = reserve;
    _addReserveToList(toAsset);
  }

  function _addReserveToList(address asset) internal {
    uint256 reservesCount = _reservesCount;
    console.log('_addReserveToList-reservesCount:%d', reservesCount);
    console.log('_addReserveToList-_maxNumberOfReserves:%d', _maxNumberOfReserves);
    //require(reservesCount < _maxNumberOfReserves, Errors.LP_NO_MORE_RESERVES_ALLOWED);

    bool reserveAlreadyAdded = _reserves[asset].id != 0 || _reservesList[0] == asset;

    if (!reserveAlreadyAdded) {
      _reserves[asset].id = uint8(reservesCount);
      _reservesList[reservesCount] = asset;

      _reservesCount = reservesCount + 1;
    }
  }
}
