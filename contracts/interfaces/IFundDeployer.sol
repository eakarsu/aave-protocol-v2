// SPDX-License-Identifier: GPL-3.0

/*
    This file is part of the Enzyme Protocol.

    (c) Enzyme Council <council@enzyme.finance>

    For the full license information, please view the LICENSE
    file that was distributed with this source code.
*/

pragma solidity 0.6.12;

/// @title IFundDeployer Interface
/// @author Enzyme Council <security@enzyme.finance>
interface IFundDeployer {
  function getOwner() external view returns (address);

  function hasReconfigurationRequest(address) external view returns (bool);

  function isAllowedBuySharesOnBehalfCaller(address) external view returns (bool);

  function isAllowedVaultCall(
    address,
    bytes4,
    bytes32
  ) external view returns (bool);

  function createNewFund(
    address _fundOwner,
    string calldata _fundName,
    address _denominationAsset,
    uint256 _sharesActionTimelock,
    bytes calldata _feeManagerConfigData,
    bytes calldata _policyManagerConfigData
  ) external returns (address comptrollerProxy_, address vaultProxy_);

  function getVaultLib() external view returns (address);

  function getComptrollerLib() external view returns (address comptrollerLib_);
}
