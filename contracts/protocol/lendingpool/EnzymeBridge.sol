pragma solidity 0.6.12;

import 'hardhat/console.sol';
import {ILendingPoolAddressesProvider} from '../../interfaces/ILendingPoolAddressesProvider.sol';
import {IFundDeployer} from '../../interfaces/IFundDeployer.sol';
import {IEnzymeBridge} from '../../interfaces/IEnzymeBridge.sol';
import {IComptroller} from '../../interfaces/IComptroller.sol';
import {ILendingPool} from '../../interfaces/ILendingPool.sol';
import {IVault} from '../../interfaces/IVault.sol';
import {IEnzymeLendingPoolManager} from '../../interfaces/IEnzymeLendingPoolManager.sol';
import {IERC20} from '../../dependencies/openzeppelin/contracts/IERC20.sol';
import {DataTypes} from '../libraries/types/DataTypes.sol';
import {IAToken} from '../../interfaces/IAToken.sol';

pragma experimental ABIEncoderV2;

contract EnzymeBridge is IEnzymeBridge {
  address zeroAddress = 0x0000000000000000000000000000000000000000;
  uint256 manFee = 1000000000000000000000000030;
  uint256 entranceFee = 1000;
  uint16 perfFee = 1000;
  uint64 defaultPerfFeePeriod = 2592000;
  address _manFeeAddress = address(0);
  address _entranceFeeAddress = address(0);
  address _perfFeeAddress = address(0);
  address _commonFundOwner = address(0);
  address _lendingPool = address(0);
  address _fundDeployer = address(0);

  ILendingPoolAddressesProvider internal _addressesProvider;
  mapping(address => address) internal _vaults;
  mapping(address => address) internal _comptrollers;
  mapping(address => address) internal _commonVaults;
  mapping(address => address) internal _commonComptrollers;

  function initialize(ILendingPoolAddressesProvider provider, address commonFundOwner)
    external
    override
  {
    _addressesProvider = provider;
    bytes32 contractId = 'ManagementFeeId';
    _manFeeAddress = _addressesProvider.getAddress(contractId);
    console.log('_manFeeAddress:%s', _manFeeAddress);

    contractId = 'EntranceRateDirectFeeId';
    _entranceFeeAddress = _addressesProvider.getAddress(contractId);
    console.log('_entranceFeeAddress:%s', _entranceFeeAddress);

    contractId = 'PerformanceFeeId';
    _perfFeeAddress = _addressesProvider.getAddress(contractId);
    console.log('_perfFeeAddress:%s', _perfFeeAddress);

    contractId = 'FundDeployerId';
    _fundDeployer = _addressesProvider.getAddress(contractId);
    console.log('_fundDeployer:%s', _fundDeployer);

    contractId = 'EnzymeBridgeId';
    address enzymeBridgeAddress = _addressesProvider.getAddress(contractId);
    console.log('enzymeBridgeAddress:%s', enzymeBridgeAddress);

    _commonFundOwner = commonFundOwner;
    _lendingPool = provider.getLendingPool();
  }

  function isFundExistForUser(address _fundOwner) public override returns (bool) {
    return _comptrollers[_fundOwner] != address(0);
  }

  function isCommonFundExist(address _asset) public override returns (bool) {
    return _commonVaults[_asset] != address(0);
  }

  function getCommonVault(address _asset) public override returns (address) {
    return _commonVaults[_asset];
  }

  function getCommonComptroller(address _asset) public override returns (address) {
    return _commonComptrollers[_asset];
  }

  function deposit(
    address owner,
    address asset,
    uint256 amount
  ) external override returns (address, address) {
    address targetVault = address(0);
    address targetComptroller = address(0);
    bool isExists = isFundExistForUser(owner);
    console.log('bridge deposit isExins');
    console.logBool(isExists);

    //User has private fund that includes user collateral and borrowed token
    if (isExists) {
      targetComptroller = _comptrollers[owner];
      targetVault = _vaults[owner];
    } else {
      //User doesn't have private fund. As result, we deposit the collateral into common  fund for token
      bool commonFundExists = isCommonFundExist(asset);
      console.log('bridge deposit isCommonFundExist');
      console.logBool(commonFundExists);
      if (!commonFundExists) //common fund does not exist and crate new one
      {
        console.log('bridge deposit isCommonFundExist before createNewFund');
        (address comptrollerProxy, address vaultProxy) = createNewFund(asset);
        console.log('bridge deposit isCommonFundExist after createNewFund');
        ILendingPool(_lendingPool).makeEnzymePool(asset, vaultProxy);
        _commonComptrollers[asset] = comptrollerProxy;
        _commonVaults[asset] = vaultProxy;
      }
      targetComptroller = _commonComptrollers[asset];
      targetVault = _commonVaults[asset];
    }
    return (targetVault, targetComptroller);
  }

  function borrow(
    address asset,
    uint256 amount,
    uint256 interestRateMode,
    address user,
    uint256 reservesCount
  ) external override returns (address, address) {
    address comptrollerProxy = address(0);
    address vaultProxy = address(0);

    console.log('Bridge borrow called');
    bool isExists = isFundExistForUser(user);
    //create private fund for user so that we transfer his collateral from common fund to this private one
    //User may have deposited so many tokens. As result, for each token, its atoken can give user deposit amount
    //we will transfer atoken amount to this fund
    if (!isExists) {
      console.log("Borrow: User vault doesn't exist");
      (comptrollerProxy, vaultProxy) = createNewFund(asset);
      console.log('Borrow: get created vault:%s', vaultProxy);
      console.log('Borrow: get created comptroller:%s', comptrollerProxy);

      ILendingPool(_lendingPool).makeEnzymePool(asset, vaultProxy);
      console.log('Borrow: make enzyme pool');

      _vaults[user] = vaultProxy;
      _comptrollers[user] = comptrollerProxy;
      console.log('Before moving funds from common funds');
      //move user tokens in common pool funds to newly created private one
      moveUserTokensInCommonFundToPrivate(user, reservesCount, vaultProxy);
      console.log('Borrow: after moving vault valu');
    } else {
      console.log('User vault does exist');
      vaultProxy = _vaults[user];
      comptrollerProxy = _comptrollers[user];
    }
    address commonFund = _commonVaults[asset];
    console.log('Before moving token to private fund');

    //debug
    console.log('Private fund has for asset:%s', asset);
    console.log('Private fund has vault asset:%s', vaultProxy);
    uint256 compoundedLiquidityBalance = IERC20(asset).balanceOf(vaultProxy);
    console.log('Private fund has %d  ', compoundedLiquidityBalance);
    //debug
    return (vaultProxy, comptrollerProxy);
  }

  function moveUserTokensInCommonFundToPrivate(
    address user,
    uint256 reservesCount,
    address privateVaultAddress
  ) internal {
    if (ILendingPool(_lendingPool).isUserEmptyConfig(user)) {
      console.log('User config empty');
      return;
    }
    for (uint256 i = 0; i < reservesCount; i++) {
      (bool isCollOrBorrow, bool isColl) = ILendingPool(_lendingPool).getUserConfig(user, i);

      if (!isCollOrBorrow) {
        console.log('isUsingAsCollateralOrBorrowing wrong');
        continue;
      }
      //aToken address not changed. We have added vault address for reserve. Refer to makeEnzymePool.
      (
        address aTokenAddress,
        address vaultAddress,
        uint256 liquidationThreshold,
        uint256 decimals
      ) = ILendingPool(_lendingPool).getReserveDataForUser(user, i);
      address underlyingAssetAddress = IAToken(aTokenAddress).UNDERLYING_ASSET_ADDRESS();
      //debug
      console.log('liquidationThreshold: %d', liquidationThreshold);
      console.logBool(isColl);
      //debug
      if (liquidationThreshold != 0 && isColl) {
        uint256 compoundedLiquidityBalance = IERC20(aTokenAddress).balanceOf(user);
        console.log('For token address  %s ', aTokenAddress);
        console.log('For vault address  %s ', vaultAddress);
        console.log('We have %d balance', compoundedLiquidityBalance);
        if (compoundedLiquidityBalance > 0) {
          console.log('Token being transferred from %s', vaultAddress);
          console.log('Token  %s being transferred from ', underlyingAssetAddress);

          //debug
          compoundedLiquidityBalance = IERC20(underlyingAssetAddress).balanceOf(vaultAddress);
          console.log('User has before %d  ', compoundedLiquidityBalance);
          //debug

          //First add it to track asset of vault
          IVault(privateVaultAddress).addTrackedAsset(underlyingAssetAddress);
          IVault(vaultAddress).transferUnderlyingTo(
            underlyingAssetAddress,
            privateVaultAddress,
            compoundedLiquidityBalance
          );
          console.log('Token transferred to %s', privateVaultAddress);

          //debug
          compoundedLiquidityBalance = IERC20(underlyingAssetAddress).balanceOf(vaultAddress);
          console.log('User had %d left ', compoundedLiquidityBalance);
          compoundedLiquidityBalance = IERC20(underlyingAssetAddress).balanceOf(
            privateVaultAddress
          );
          console.log('New User has now  %d ', compoundedLiquidityBalance);
          //debug
        }
      }
    }
  }

  function createNewFund(address _denominationAsset) public override returns (address, address) {
    console.log('createNewFund');
    string memory _fundName = 'TEST_STATIC_FUND';
    bytes memory feesData = getFeesManagerConfigArgsData();
    bytes memory policyData = new bytes(1);
    policyData[0] = 0x0;
    (address comptrollerProxy, address vaultProxy) =
      IFundDeployer(_fundDeployer).createNewFund(
        _commonFundOwner,
        _fundName,
        _denominationAsset,
        10000,
        feesData,
        policyData
      );
    return (comptrollerProxy, vaultProxy);
  }

  function encode(uint256 a, string memory b) internal returns (string memory) {
    string memory tmp = string(abi.encode(a, b));
    console.log('input:a: %d', a);
    console.log('input:b: %s', b);
    console.log('output:a: %s', tmp);
    return tmp;
  }

  function encodeManFee(uint256 rate, address contractAddress) internal returns (bytes memory) {
    bytes memory tmp = abi.encode(rate, contractAddress);
    console.log('input:a: %d', rate);
    console.log('input:b: %s', contractAddress);
    console.logBytes(tmp);
    return tmp;
  }

  function encodePerfFee(
    uint16 rate,
    uint64 defaultPeriod,
    address contractAddress
  ) internal returns (bytes memory) {
    bytes memory tmp = abi.encode(rate, defaultPeriod, contractAddress);
    console.log('input:a: %d', rate);
    console.log('input:c: %d', defaultPeriod);
    console.log('input:b: %s', contractAddress);
    console.logBytes(tmp);
    return tmp;
  }

  function getFeesManagerConfigArgsData() internal returns (bytes memory) {
    bytes memory manFeeData = encodeManFee(manFee, _manFeeAddress);
    bytes memory entranceFeeData = encodeManFee(entranceFee, _entranceFeeAddress);
    bytes memory perfFeeData = encodePerfFee(perfFee, defaultPerfFeePeriod, _perfFeeAddress);

    address[3] memory feesAddresses = [_manFeeAddress, _entranceFeeAddress, _perfFeeAddress];
    bytes[3] memory feesDatas = [manFeeData, entranceFeeData, perfFeeData];
    bytes memory encoded = abi.encode(feesAddresses, feesDatas);
    return encoded;
  }

  function decodeManFee(bytes memory a) internal pure returns (uint256, address) {
    return abi.decode(a, (uint256, address));
  }

  function decodePerfFee(bytes memory a)
    internal
    pure
    returns (
      uint16,
      uint64,
      address
    )
  {
    return abi.decode(a, (uint16, uint64, address));
  }

  function decodeFeeManagerArgs(bytes memory a)
    internal
    pure
    returns (address[3] memory, bytes[3] memory)
  {
    return abi.decode(a, (address[3], bytes[3]));
  }

  function decode(string memory a) internal pure returns (uint256, string memory) {
    return abi.decode(bytes(a), (uint256, string));
  }

  function test(uint256 a, string calldata b) external returns (uint256, string memory) {
    string memory encoded = encode(a, b);
    (uint256 num, string memory name) = decode(encoded);
    console.log('decoded:a: %d', num);
    console.log('decoded:b: %s', name);
    return decode(encoded);
  }

  function test2() external {
    bytes memory myBytes = encodeManFee(manFee, zeroAddress);
    (uint256 rate2, address contractAddress2) = decodeManFee(myBytes);
    console.log('decoded:a: %d', rate2);
    console.log('decoded:b: %s', contractAddress2);
  }

  function test3() external {
    bytes memory myBytes = encodePerfFee(perfFee, defaultPerfFeePeriod, zeroAddress);
    (uint16 rate, uint64 period, address contractAddress) = decodePerfFee(myBytes);
    console.log('decoded:a: %d', rate);
    console.log('decoded:a: %d', period);
    console.log('decoded:b: %s', contractAddress);
  }

  function test4() external {
    bytes memory myBytes = encodeManFee(entranceFee, zeroAddress);
    (uint256 rate2, address contractAddress2) = decodeManFee(myBytes);
    console.log('decoded:a: %d', rate2);
    console.log('decoded:b: %s', contractAddress2);
  }

  function test5() external {
    bytes memory myBytes = getFeesManagerConfigArgsData();
    console.logBytes(myBytes);
    (address[3] memory feesAddresses, bytes[3] memory feesDatas) = decodeFeeManagerArgs(myBytes);
    console.log('dddddd');
    for (uint256 i = 0; i < feesAddresses.length; i++) {
      console.log('address:%s', feesAddresses[i]);
      if (i == 0) {
        (uint256 rate1, address contractAddress1) = decodeManFee(feesDatas[i]);
        console.log('rate : %d', rate1);
        console.log('address : %d', contractAddress1);
      } else if (i == 1) {
        (uint256 rate2, address contractAddress2) = decodeManFee(feesDatas[i]);
        console.log('rate : %d', rate2);
        console.log('address : %d', contractAddress2);
      } else {
        (uint16 rate3, uint64 period, address contractAddress3) = decodePerfFee(feesDatas[i]);
        console.log('rate : %d', rate3);
        console.log('address : %d', contractAddress3);
        console.log('period: %d', period);
      }
    }
    setAddress(bytes32('EROLR'));
  }

  function setAddress(bytes32 id) internal {
    console.log('setAddress');
    console.log(string(abi.encodePacked(id)));
  }
}
