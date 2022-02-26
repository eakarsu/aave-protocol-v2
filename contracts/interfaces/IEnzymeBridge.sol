// SPDX-License-Identifier: GPL-3.0

/*
    This file is part of the Enzyme Protocol.

    (c) Enzyme Council <council@enzyme.finance>

    For the full license information, please view the LICENSE
    file that was distributed with this source code.
*/

pragma solidity 0.6.12;

import {ILendingPoolAddressesProvider} from './ILendingPoolAddressesProvider.sol';
import {DataTypes} from '../protocol/libraries/types/DataTypes.sol';

interface IEnzymeBridge {
  function initialize(ILendingPoolAddressesProvider provider, address commonFundOwner) external;

  function deposit(
    address owner,
    address asset,
    uint256 amount
  ) external returns (address, address);

  function createNewFund(address _denominationAsset) external returns (address, address);

  function isFundExistForUser(address _fundOwner) external returns (bool);

  function isCommonFundExist(address _asset) external returns (bool);

  function borrow(
    address asset,
    uint256 amount,
    uint256 interestRateMode,
    address user,
    uint256 reservesCount
  ) external returns (address, address);
}
