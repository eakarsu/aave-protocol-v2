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

interface IDelegationTokenInterface extends ethers.utils.Interface {
  functions: {
    "delegate(address)": FunctionFragment;
  };

  encodeFunctionData(functionFragment: "delegate", values: [string]): string;

  decodeFunctionResult(functionFragment: "delegate", data: BytesLike): Result;

  events: {};
}

export class IDelegationToken extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  on(event: EventFilter | string, listener: Listener): this;
  once(event: EventFilter | string, listener: Listener): this;
  addListener(eventName: EventFilter | string, listener: Listener): this;
  removeAllListeners(eventName: EventFilter | string): this;
  removeListener(eventName: any, listener: Listener): this;

  interface: IDelegationTokenInterface;

  functions: {
    delegate(
      delegatee: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "delegate(address)"(
      delegatee: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;
  };

  delegate(
    delegatee: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "delegate(address)"(
    delegatee: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  callStatic: {
    delegate(delegatee: string, overrides?: CallOverrides): Promise<void>;

    "delegate(address)"(
      delegatee: string,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {};

  estimateGas: {
    delegate(delegatee: string, overrides?: Overrides): Promise<BigNumber>;

    "delegate(address)"(
      delegatee: string,
      overrides?: Overrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    delegate(
      delegatee: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "delegate(address)"(
      delegatee: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;
  };
}