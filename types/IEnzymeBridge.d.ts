/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
} from "ethers";
import {
  Contract,
  ContractTransaction,
  Overrides,
  CallOverrides,
} from "@ethersproject/contracts";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";

interface IEnzymeBridgeInterface extends ethers.utils.Interface {
  functions: {
    "borrow(address,uint256,uint256,address,uint256)": FunctionFragment;
    "createNewFund(address)": FunctionFragment;
    "deposit(address,address,uint256)": FunctionFragment;
    "getCommonComptroller(address)": FunctionFragment;
    "getCommonVault(address)": FunctionFragment;
    "getMyComptroller(address)": FunctionFragment;
    "getMyVault(address)": FunctionFragment;
    "getUserComptroller(address,address)": FunctionFragment;
    "getUserVault(address,address)": FunctionFragment;
    "initialize(address,address)": FunctionFragment;
    "isCommonFundExist(address)": FunctionFragment;
    "isFundExistForUser(address)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "borrow",
    values: [string, BigNumberish, BigNumberish, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "createNewFund",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "deposit",
    values: [string, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getCommonComptroller",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "getCommonVault",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "getMyComptroller",
    values: [string]
  ): string;
  encodeFunctionData(functionFragment: "getMyVault", values: [string]): string;
  encodeFunctionData(
    functionFragment: "getUserComptroller",
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "getUserVault",
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "initialize",
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "isCommonFundExist",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "isFundExistForUser",
    values: [string]
  ): string;

  decodeFunctionResult(functionFragment: "borrow", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "createNewFund",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "deposit", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getCommonComptroller",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getCommonVault",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getMyComptroller",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getMyVault", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getUserComptroller",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getUserVault",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "isCommonFundExist",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isFundExistForUser",
    data: BytesLike
  ): Result;

  events: {};
}

export class IEnzymeBridge extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  on(event: EventFilter | string, listener: Listener): this;
  once(event: EventFilter | string, listener: Listener): this;
  addListener(eventName: EventFilter | string, listener: Listener): this;
  removeAllListeners(eventName: EventFilter | string): this;
  removeListener(eventName: any, listener: Listener): this;

  interface: IEnzymeBridgeInterface;

  functions: {
    borrow(
      asset: string,
      amount: BigNumberish,
      interestRateMode: BigNumberish,
      user: string,
      reservesCount: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "borrow(address,uint256,uint256,address,uint256)"(
      asset: string,
      amount: BigNumberish,
      interestRateMode: BigNumberish,
      user: string,
      reservesCount: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    createNewFund(
      _denominationAsset: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "createNewFund(address)"(
      _denominationAsset: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    deposit(
      owner: string,
      asset: string,
      amount: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "deposit(address,address,uint256)"(
      owner: string,
      asset: string,
      amount: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    getCommonComptroller(
      _asset: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "getCommonComptroller(address)"(
      _asset: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    getCommonVault(
      _asset: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "getCommonVault(address)"(
      _asset: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    getMyComptroller(
      _user: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "getMyComptroller(address)"(
      _user: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    getMyVault(
      _user: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "getMyVault(address)"(
      _user: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    getUserComptroller(
      _user: string,
      _asset: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "getUserComptroller(address,address)"(
      _user: string,
      _asset: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    getUserVault(
      _user: string,
      _asset: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "getUserVault(address,address)"(
      _user: string,
      _asset: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    initialize(
      provider: string,
      commonFundOwner: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "initialize(address,address)"(
      provider: string,
      commonFundOwner: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    isCommonFundExist(
      _asset: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "isCommonFundExist(address)"(
      _asset: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    isFundExistForUser(
      _fundOwner: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "isFundExistForUser(address)"(
      _fundOwner: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;
  };

  borrow(
    asset: string,
    amount: BigNumberish,
    interestRateMode: BigNumberish,
    user: string,
    reservesCount: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "borrow(address,uint256,uint256,address,uint256)"(
    asset: string,
    amount: BigNumberish,
    interestRateMode: BigNumberish,
    user: string,
    reservesCount: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  createNewFund(
    _denominationAsset: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "createNewFund(address)"(
    _denominationAsset: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  deposit(
    owner: string,
    asset: string,
    amount: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "deposit(address,address,uint256)"(
    owner: string,
    asset: string,
    amount: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  getCommonComptroller(
    _asset: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "getCommonComptroller(address)"(
    _asset: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  getCommonVault(
    _asset: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "getCommonVault(address)"(
    _asset: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  getMyComptroller(
    _user: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "getMyComptroller(address)"(
    _user: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  getMyVault(
    _user: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "getMyVault(address)"(
    _user: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  getUserComptroller(
    _user: string,
    _asset: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "getUserComptroller(address,address)"(
    _user: string,
    _asset: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  getUserVault(
    _user: string,
    _asset: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "getUserVault(address,address)"(
    _user: string,
    _asset: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  initialize(
    provider: string,
    commonFundOwner: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "initialize(address,address)"(
    provider: string,
    commonFundOwner: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  isCommonFundExist(
    _asset: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "isCommonFundExist(address)"(
    _asset: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  isFundExistForUser(
    _fundOwner: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "isFundExistForUser(address)"(
    _fundOwner: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  callStatic: {
    borrow(
      asset: string,
      amount: BigNumberish,
      interestRateMode: BigNumberish,
      user: string,
      reservesCount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<{
      0: string;
      1: string;
    }>;

    "borrow(address,uint256,uint256,address,uint256)"(
      asset: string,
      amount: BigNumberish,
      interestRateMode: BigNumberish,
      user: string,
      reservesCount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<{
      0: string;
      1: string;
    }>;

    createNewFund(
      _denominationAsset: string,
      overrides?: CallOverrides
    ): Promise<{
      0: string;
      1: string;
    }>;

    "createNewFund(address)"(
      _denominationAsset: string,
      overrides?: CallOverrides
    ): Promise<{
      0: string;
      1: string;
    }>;

    deposit(
      owner: string,
      asset: string,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<{
      0: string;
      1: string;
    }>;

    "deposit(address,address,uint256)"(
      owner: string,
      asset: string,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<{
      0: string;
      1: string;
    }>;

    getCommonComptroller(
      _asset: string,
      overrides?: CallOverrides
    ): Promise<string>;

    "getCommonComptroller(address)"(
      _asset: string,
      overrides?: CallOverrides
    ): Promise<string>;

    getCommonVault(_asset: string, overrides?: CallOverrides): Promise<string>;

    "getCommonVault(address)"(
      _asset: string,
      overrides?: CallOverrides
    ): Promise<string>;

    getMyComptroller(_user: string, overrides?: CallOverrides): Promise<string>;

    "getMyComptroller(address)"(
      _user: string,
      overrides?: CallOverrides
    ): Promise<string>;

    getMyVault(_user: string, overrides?: CallOverrides): Promise<string>;

    "getMyVault(address)"(
      _user: string,
      overrides?: CallOverrides
    ): Promise<string>;

    getUserComptroller(
      _user: string,
      _asset: string,
      overrides?: CallOverrides
    ): Promise<string>;

    "getUserComptroller(address,address)"(
      _user: string,
      _asset: string,
      overrides?: CallOverrides
    ): Promise<string>;

    getUserVault(
      _user: string,
      _asset: string,
      overrides?: CallOverrides
    ): Promise<string>;

    "getUserVault(address,address)"(
      _user: string,
      _asset: string,
      overrides?: CallOverrides
    ): Promise<string>;

    initialize(
      provider: string,
      commonFundOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;

    "initialize(address,address)"(
      provider: string,
      commonFundOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;

    isCommonFundExist(
      _asset: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    "isCommonFundExist(address)"(
      _asset: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    isFundExistForUser(
      _fundOwner: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    "isFundExistForUser(address)"(
      _fundOwner: string,
      overrides?: CallOverrides
    ): Promise<boolean>;
  };

  filters: {};

  estimateGas: {
    borrow(
      asset: string,
      amount: BigNumberish,
      interestRateMode: BigNumberish,
      user: string,
      reservesCount: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "borrow(address,uint256,uint256,address,uint256)"(
      asset: string,
      amount: BigNumberish,
      interestRateMode: BigNumberish,
      user: string,
      reservesCount: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;

    createNewFund(
      _denominationAsset: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "createNewFund(address)"(
      _denominationAsset: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    deposit(
      owner: string,
      asset: string,
      amount: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "deposit(address,address,uint256)"(
      owner: string,
      asset: string,
      amount: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;

    getCommonComptroller(
      _asset: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "getCommonComptroller(address)"(
      _asset: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    getCommonVault(_asset: string, overrides?: Overrides): Promise<BigNumber>;

    "getCommonVault(address)"(
      _asset: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    getMyComptroller(_user: string, overrides?: Overrides): Promise<BigNumber>;

    "getMyComptroller(address)"(
      _user: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    getMyVault(_user: string, overrides?: Overrides): Promise<BigNumber>;

    "getMyVault(address)"(
      _user: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    getUserComptroller(
      _user: string,
      _asset: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "getUserComptroller(address,address)"(
      _user: string,
      _asset: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    getUserVault(
      _user: string,
      _asset: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "getUserVault(address,address)"(
      _user: string,
      _asset: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    initialize(
      provider: string,
      commonFundOwner: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "initialize(address,address)"(
      provider: string,
      commonFundOwner: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    isCommonFundExist(
      _asset: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "isCommonFundExist(address)"(
      _asset: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    isFundExistForUser(
      _fundOwner: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "isFundExistForUser(address)"(
      _fundOwner: string,
      overrides?: Overrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    borrow(
      asset: string,
      amount: BigNumberish,
      interestRateMode: BigNumberish,
      user: string,
      reservesCount: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "borrow(address,uint256,uint256,address,uint256)"(
      asset: string,
      amount: BigNumberish,
      interestRateMode: BigNumberish,
      user: string,
      reservesCount: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    createNewFund(
      _denominationAsset: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "createNewFund(address)"(
      _denominationAsset: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    deposit(
      owner: string,
      asset: string,
      amount: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "deposit(address,address,uint256)"(
      owner: string,
      asset: string,
      amount: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    getCommonComptroller(
      _asset: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "getCommonComptroller(address)"(
      _asset: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    getCommonVault(
      _asset: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "getCommonVault(address)"(
      _asset: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    getMyComptroller(
      _user: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "getMyComptroller(address)"(
      _user: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    getMyVault(
      _user: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "getMyVault(address)"(
      _user: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    getUserComptroller(
      _user: string,
      _asset: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "getUserComptroller(address,address)"(
      _user: string,
      _asset: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    getUserVault(
      _user: string,
      _asset: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "getUserVault(address,address)"(
      _user: string,
      _asset: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    initialize(
      provider: string,
      commonFundOwner: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "initialize(address,address)"(
      provider: string,
      commonFundOwner: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    isCommonFundExist(
      _asset: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "isCommonFundExist(address)"(
      _asset: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    isFundExistForUser(
      _fundOwner: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "isFundExistForUser(address)"(
      _fundOwner: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;
  };
}
