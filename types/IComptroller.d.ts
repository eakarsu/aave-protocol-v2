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

interface IComptrollerInterface extends ethers.utils.Interface {
  functions: {
    "activate(bool)": FunctionFragment;
    "calcGav(bool)": FunctionFragment;
    "calcGrossShareValue(bool)": FunctionFragment;
    "callOnExtension(address,uint256,bytes)": FunctionFragment;
    "destructActivated(uint256,uint256)": FunctionFragment;
    "destructUnactivated()": FunctionFragment;
    "getDenominationAsset()": FunctionFragment;
    "getExternalPositionManager()": FunctionFragment;
    "getFeeManager()": FunctionFragment;
    "getFundDeployer()": FunctionFragment;
    "getGasRelayPaymaster()": FunctionFragment;
    "getIntegrationManager()": FunctionFragment;
    "getPolicyManager()": FunctionFragment;
    "getVaultProxy()": FunctionFragment;
    "init(address,uint256)": FunctionFragment;
    "permissionedVaultAction(uint8,bytes)": FunctionFragment;
    "preTransferSharesHook(address,address,uint256)": FunctionFragment;
    "preTransferSharesHookFreelyTransferable(address)": FunctionFragment;
    "setGasRelayPaymaster(address)": FunctionFragment;
    "setVaultProxy(address)": FunctionFragment;
  };

  encodeFunctionData(functionFragment: "activate", values: [boolean]): string;
  encodeFunctionData(functionFragment: "calcGav", values: [boolean]): string;
  encodeFunctionData(
    functionFragment: "calcGrossShareValue",
    values: [boolean]
  ): string;
  encodeFunctionData(
    functionFragment: "callOnExtension",
    values: [string, BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "destructActivated",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "destructUnactivated",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getDenominationAsset",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getExternalPositionManager",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getFeeManager",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getFundDeployer",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getGasRelayPaymaster",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getIntegrationManager",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getPolicyManager",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getVaultProxy",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "init",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "permissionedVaultAction",
    values: [BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "preTransferSharesHook",
    values: [string, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "preTransferSharesHookFreelyTransferable",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "setGasRelayPaymaster",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "setVaultProxy",
    values: [string]
  ): string;

  decodeFunctionResult(functionFragment: "activate", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "calcGav", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "calcGrossShareValue",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "callOnExtension",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "destructActivated",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "destructUnactivated",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getDenominationAsset",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getExternalPositionManager",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getFeeManager",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getFundDeployer",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getGasRelayPaymaster",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getIntegrationManager",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getPolicyManager",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getVaultProxy",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "init", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "permissionedVaultAction",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "preTransferSharesHook",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "preTransferSharesHookFreelyTransferable",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setGasRelayPaymaster",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setVaultProxy",
    data: BytesLike
  ): Result;

  events: {};
}

export class IComptroller extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  on(event: EventFilter | string, listener: Listener): this;
  once(event: EventFilter | string, listener: Listener): this;
  addListener(eventName: EventFilter | string, listener: Listener): this;
  removeAllListeners(eventName: EventFilter | string): this;
  removeListener(eventName: any, listener: Listener): this;

  interface: IComptrollerInterface;

  functions: {
    activate(
      arg0: boolean,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "activate(bool)"(
      arg0: boolean,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    calcGav(arg0: boolean, overrides?: Overrides): Promise<ContractTransaction>;

    "calcGav(bool)"(
      arg0: boolean,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    calcGrossShareValue(
      arg0: boolean,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "calcGrossShareValue(bool)"(
      arg0: boolean,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    callOnExtension(
      arg0: string,
      arg1: BigNumberish,
      arg2: BytesLike,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "callOnExtension(address,uint256,bytes)"(
      arg0: string,
      arg1: BigNumberish,
      arg2: BytesLike,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    destructActivated(
      arg0: BigNumberish,
      arg1: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "destructActivated(uint256,uint256)"(
      arg0: BigNumberish,
      arg1: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    destructUnactivated(overrides?: Overrides): Promise<ContractTransaction>;

    "destructUnactivated()"(
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    getDenominationAsset(overrides?: CallOverrides): Promise<{
      0: string;
    }>;

    "getDenominationAsset()"(overrides?: CallOverrides): Promise<{
      0: string;
    }>;

    getExternalPositionManager(overrides?: CallOverrides): Promise<{
      0: string;
    }>;

    "getExternalPositionManager()"(overrides?: CallOverrides): Promise<{
      0: string;
    }>;

    getFeeManager(overrides?: CallOverrides): Promise<{
      0: string;
    }>;

    "getFeeManager()"(overrides?: CallOverrides): Promise<{
      0: string;
    }>;

    getFundDeployer(overrides?: CallOverrides): Promise<{
      0: string;
    }>;

    "getFundDeployer()"(overrides?: CallOverrides): Promise<{
      0: string;
    }>;

    getGasRelayPaymaster(overrides?: CallOverrides): Promise<{
      0: string;
    }>;

    "getGasRelayPaymaster()"(overrides?: CallOverrides): Promise<{
      0: string;
    }>;

    getIntegrationManager(overrides?: CallOverrides): Promise<{
      0: string;
    }>;

    "getIntegrationManager()"(overrides?: CallOverrides): Promise<{
      0: string;
    }>;

    getPolicyManager(overrides?: CallOverrides): Promise<{
      0: string;
    }>;

    "getPolicyManager()"(overrides?: CallOverrides): Promise<{
      0: string;
    }>;

    getVaultProxy(overrides?: CallOverrides): Promise<{
      0: string;
    }>;

    "getVaultProxy()"(overrides?: CallOverrides): Promise<{
      0: string;
    }>;

    init(
      arg0: string,
      arg1: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "init(address,uint256)"(
      arg0: string,
      arg1: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    permissionedVaultAction(
      arg0: BigNumberish,
      arg1: BytesLike,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "permissionedVaultAction(uint8,bytes)"(
      arg0: BigNumberish,
      arg1: BytesLike,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    preTransferSharesHook(
      arg0: string,
      arg1: string,
      arg2: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "preTransferSharesHook(address,address,uint256)"(
      arg0: string,
      arg1: string,
      arg2: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    preTransferSharesHookFreelyTransferable(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<{
      0: void;
    }>;

    "preTransferSharesHookFreelyTransferable(address)"(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<{
      0: void;
    }>;

    setGasRelayPaymaster(
      arg0: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "setGasRelayPaymaster(address)"(
      arg0: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    setVaultProxy(
      arg0: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "setVaultProxy(address)"(
      arg0: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;
  };

  activate(arg0: boolean, overrides?: Overrides): Promise<ContractTransaction>;

  "activate(bool)"(
    arg0: boolean,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  calcGav(arg0: boolean, overrides?: Overrides): Promise<ContractTransaction>;

  "calcGav(bool)"(
    arg0: boolean,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  calcGrossShareValue(
    arg0: boolean,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "calcGrossShareValue(bool)"(
    arg0: boolean,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  callOnExtension(
    arg0: string,
    arg1: BigNumberish,
    arg2: BytesLike,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "callOnExtension(address,uint256,bytes)"(
    arg0: string,
    arg1: BigNumberish,
    arg2: BytesLike,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  destructActivated(
    arg0: BigNumberish,
    arg1: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "destructActivated(uint256,uint256)"(
    arg0: BigNumberish,
    arg1: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  destructUnactivated(overrides?: Overrides): Promise<ContractTransaction>;

  "destructUnactivated()"(overrides?: Overrides): Promise<ContractTransaction>;

  getDenominationAsset(overrides?: CallOverrides): Promise<string>;

  "getDenominationAsset()"(overrides?: CallOverrides): Promise<string>;

  getExternalPositionManager(overrides?: CallOverrides): Promise<string>;

  "getExternalPositionManager()"(overrides?: CallOverrides): Promise<string>;

  getFeeManager(overrides?: CallOverrides): Promise<string>;

  "getFeeManager()"(overrides?: CallOverrides): Promise<string>;

  getFundDeployer(overrides?: CallOverrides): Promise<string>;

  "getFundDeployer()"(overrides?: CallOverrides): Promise<string>;

  getGasRelayPaymaster(overrides?: CallOverrides): Promise<string>;

  "getGasRelayPaymaster()"(overrides?: CallOverrides): Promise<string>;

  getIntegrationManager(overrides?: CallOverrides): Promise<string>;

  "getIntegrationManager()"(overrides?: CallOverrides): Promise<string>;

  getPolicyManager(overrides?: CallOverrides): Promise<string>;

  "getPolicyManager()"(overrides?: CallOverrides): Promise<string>;

  getVaultProxy(overrides?: CallOverrides): Promise<string>;

  "getVaultProxy()"(overrides?: CallOverrides): Promise<string>;

  init(
    arg0: string,
    arg1: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "init(address,uint256)"(
    arg0: string,
    arg1: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  permissionedVaultAction(
    arg0: BigNumberish,
    arg1: BytesLike,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "permissionedVaultAction(uint8,bytes)"(
    arg0: BigNumberish,
    arg1: BytesLike,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  preTransferSharesHook(
    arg0: string,
    arg1: string,
    arg2: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "preTransferSharesHook(address,address,uint256)"(
    arg0: string,
    arg1: string,
    arg2: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  preTransferSharesHookFreelyTransferable(
    arg0: string,
    overrides?: CallOverrides
  ): Promise<void>;

  "preTransferSharesHookFreelyTransferable(address)"(
    arg0: string,
    overrides?: CallOverrides
  ): Promise<void>;

  setGasRelayPaymaster(
    arg0: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "setGasRelayPaymaster(address)"(
    arg0: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  setVaultProxy(
    arg0: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "setVaultProxy(address)"(
    arg0: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  callStatic: {
    activate(arg0: boolean, overrides?: CallOverrides): Promise<void>;

    "activate(bool)"(arg0: boolean, overrides?: CallOverrides): Promise<void>;

    calcGav(arg0: boolean, overrides?: CallOverrides): Promise<BigNumber>;

    "calcGav(bool)"(
      arg0: boolean,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    calcGrossShareValue(
      arg0: boolean,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "calcGrossShareValue(bool)"(
      arg0: boolean,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    callOnExtension(
      arg0: string,
      arg1: BigNumberish,
      arg2: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    "callOnExtension(address,uint256,bytes)"(
      arg0: string,
      arg1: BigNumberish,
      arg2: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    destructActivated(
      arg0: BigNumberish,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    "destructActivated(uint256,uint256)"(
      arg0: BigNumberish,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    destructUnactivated(overrides?: CallOverrides): Promise<void>;

    "destructUnactivated()"(overrides?: CallOverrides): Promise<void>;

    getDenominationAsset(overrides?: CallOverrides): Promise<string>;

    "getDenominationAsset()"(overrides?: CallOverrides): Promise<string>;

    getExternalPositionManager(overrides?: CallOverrides): Promise<string>;

    "getExternalPositionManager()"(overrides?: CallOverrides): Promise<string>;

    getFeeManager(overrides?: CallOverrides): Promise<string>;

    "getFeeManager()"(overrides?: CallOverrides): Promise<string>;

    getFundDeployer(overrides?: CallOverrides): Promise<string>;

    "getFundDeployer()"(overrides?: CallOverrides): Promise<string>;

    getGasRelayPaymaster(overrides?: CallOverrides): Promise<string>;

    "getGasRelayPaymaster()"(overrides?: CallOverrides): Promise<string>;

    getIntegrationManager(overrides?: CallOverrides): Promise<string>;

    "getIntegrationManager()"(overrides?: CallOverrides): Promise<string>;

    getPolicyManager(overrides?: CallOverrides): Promise<string>;

    "getPolicyManager()"(overrides?: CallOverrides): Promise<string>;

    getVaultProxy(overrides?: CallOverrides): Promise<string>;

    "getVaultProxy()"(overrides?: CallOverrides): Promise<string>;

    init(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    "init(address,uint256)"(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    permissionedVaultAction(
      arg0: BigNumberish,
      arg1: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    "permissionedVaultAction(uint8,bytes)"(
      arg0: BigNumberish,
      arg1: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    preTransferSharesHook(
      arg0: string,
      arg1: string,
      arg2: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    "preTransferSharesHook(address,address,uint256)"(
      arg0: string,
      arg1: string,
      arg2: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    preTransferSharesHookFreelyTransferable(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<void>;

    "preTransferSharesHookFreelyTransferable(address)"(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<void>;

    setGasRelayPaymaster(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<void>;

    "setGasRelayPaymaster(address)"(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<void>;

    setVaultProxy(arg0: string, overrides?: CallOverrides): Promise<void>;

    "setVaultProxy(address)"(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {};

  estimateGas: {
    activate(arg0: boolean, overrides?: Overrides): Promise<BigNumber>;

    "activate(bool)"(arg0: boolean, overrides?: Overrides): Promise<BigNumber>;

    calcGav(arg0: boolean, overrides?: Overrides): Promise<BigNumber>;

    "calcGav(bool)"(arg0: boolean, overrides?: Overrides): Promise<BigNumber>;

    calcGrossShareValue(
      arg0: boolean,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "calcGrossShareValue(bool)"(
      arg0: boolean,
      overrides?: Overrides
    ): Promise<BigNumber>;

    callOnExtension(
      arg0: string,
      arg1: BigNumberish,
      arg2: BytesLike,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "callOnExtension(address,uint256,bytes)"(
      arg0: string,
      arg1: BigNumberish,
      arg2: BytesLike,
      overrides?: Overrides
    ): Promise<BigNumber>;

    destructActivated(
      arg0: BigNumberish,
      arg1: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "destructActivated(uint256,uint256)"(
      arg0: BigNumberish,
      arg1: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;

    destructUnactivated(overrides?: Overrides): Promise<BigNumber>;

    "destructUnactivated()"(overrides?: Overrides): Promise<BigNumber>;

    getDenominationAsset(overrides?: CallOverrides): Promise<BigNumber>;

    "getDenominationAsset()"(overrides?: CallOverrides): Promise<BigNumber>;

    getExternalPositionManager(overrides?: CallOverrides): Promise<BigNumber>;

    "getExternalPositionManager()"(
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getFeeManager(overrides?: CallOverrides): Promise<BigNumber>;

    "getFeeManager()"(overrides?: CallOverrides): Promise<BigNumber>;

    getFundDeployer(overrides?: CallOverrides): Promise<BigNumber>;

    "getFundDeployer()"(overrides?: CallOverrides): Promise<BigNumber>;

    getGasRelayPaymaster(overrides?: CallOverrides): Promise<BigNumber>;

    "getGasRelayPaymaster()"(overrides?: CallOverrides): Promise<BigNumber>;

    getIntegrationManager(overrides?: CallOverrides): Promise<BigNumber>;

    "getIntegrationManager()"(overrides?: CallOverrides): Promise<BigNumber>;

    getPolicyManager(overrides?: CallOverrides): Promise<BigNumber>;

    "getPolicyManager()"(overrides?: CallOverrides): Promise<BigNumber>;

    getVaultProxy(overrides?: CallOverrides): Promise<BigNumber>;

    "getVaultProxy()"(overrides?: CallOverrides): Promise<BigNumber>;

    init(
      arg0: string,
      arg1: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "init(address,uint256)"(
      arg0: string,
      arg1: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;

    permissionedVaultAction(
      arg0: BigNumberish,
      arg1: BytesLike,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "permissionedVaultAction(uint8,bytes)"(
      arg0: BigNumberish,
      arg1: BytesLike,
      overrides?: Overrides
    ): Promise<BigNumber>;

    preTransferSharesHook(
      arg0: string,
      arg1: string,
      arg2: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "preTransferSharesHook(address,address,uint256)"(
      arg0: string,
      arg1: string,
      arg2: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;

    preTransferSharesHookFreelyTransferable(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "preTransferSharesHookFreelyTransferable(address)"(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    setGasRelayPaymaster(
      arg0: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "setGasRelayPaymaster(address)"(
      arg0: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    setVaultProxy(arg0: string, overrides?: Overrides): Promise<BigNumber>;

    "setVaultProxy(address)"(
      arg0: string,
      overrides?: Overrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    activate(
      arg0: boolean,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "activate(bool)"(
      arg0: boolean,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    calcGav(
      arg0: boolean,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "calcGav(bool)"(
      arg0: boolean,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    calcGrossShareValue(
      arg0: boolean,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "calcGrossShareValue(bool)"(
      arg0: boolean,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    callOnExtension(
      arg0: string,
      arg1: BigNumberish,
      arg2: BytesLike,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "callOnExtension(address,uint256,bytes)"(
      arg0: string,
      arg1: BigNumberish,
      arg2: BytesLike,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    destructActivated(
      arg0: BigNumberish,
      arg1: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "destructActivated(uint256,uint256)"(
      arg0: BigNumberish,
      arg1: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    destructUnactivated(overrides?: Overrides): Promise<PopulatedTransaction>;

    "destructUnactivated()"(
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    getDenominationAsset(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "getDenominationAsset()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getExternalPositionManager(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "getExternalPositionManager()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getFeeManager(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "getFeeManager()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getFundDeployer(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "getFundDeployer()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getGasRelayPaymaster(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "getGasRelayPaymaster()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getIntegrationManager(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "getIntegrationManager()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getPolicyManager(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "getPolicyManager()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getVaultProxy(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "getVaultProxy()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    init(
      arg0: string,
      arg1: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "init(address,uint256)"(
      arg0: string,
      arg1: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    permissionedVaultAction(
      arg0: BigNumberish,
      arg1: BytesLike,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "permissionedVaultAction(uint8,bytes)"(
      arg0: BigNumberish,
      arg1: BytesLike,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    preTransferSharesHook(
      arg0: string,
      arg1: string,
      arg2: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "preTransferSharesHook(address,address,uint256)"(
      arg0: string,
      arg1: string,
      arg2: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    preTransferSharesHookFreelyTransferable(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "preTransferSharesHookFreelyTransferable(address)"(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    setGasRelayPaymaster(
      arg0: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "setGasRelayPaymaster(address)"(
      arg0: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    setVaultProxy(
      arg0: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "setVaultProxy(address)"(
      arg0: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;
  };
}
