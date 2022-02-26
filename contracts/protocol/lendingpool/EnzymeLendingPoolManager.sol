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
    //new pool from existing token pool has aToken address that is vault address as well
    reserve.aTokenAddress = toAsset;
    reserve.stableDebtTokenAddress = _reserves[fromAsset].stableDebtTokenAddress;
    reserve.variableDebtTokenAddress = _reserves[fromAsset].variableDebtTokenAddress;
    reserve.interestRateStrategyAddress = _reserves[fromAsset].interestRateStrategyAddress;
    reserve.configuration.data = _reserves[fromAsset].configuration.data;
    console.log('makeEnzymePool:Set addresses');
    reserve.configuration.setBorrowingEnabled(true);
    reserve.configuration.setStableRateBorrowingEnabled(true);
    console.log('makeEnzymePool:set calls');
    _reserves[toAsset] = reserve;
    console.log('makeEnzymePool:Set reserve');
    _addReserveToList(toAsset);
    console.log('makeEnzymePool:Set _addReserveToList');
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
