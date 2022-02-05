pragma solidity 0.6.12;
pragma experimental ABIEncoderV2;

interface IEnzymeLendingPoolManager {
  function makeEnzymePool(address fromAsset, address toAsset) external;
}
