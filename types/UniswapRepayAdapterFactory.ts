/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { Contract, ContractFactory, Overrides } from "@ethersproject/contracts";

import type { UniswapRepayAdapter } from "./UniswapRepayAdapter";

export class UniswapRepayAdapterFactory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    addressesProvider: string,
    uniswapRouter: string,
    wethAddress: string,
    overrides?: Overrides
  ): Promise<UniswapRepayAdapter> {
    return super.deploy(
      addressesProvider,
      uniswapRouter,
      wethAddress,
      overrides || {}
    ) as Promise<UniswapRepayAdapter>;
  }
  getDeployTransaction(
    addressesProvider: string,
    uniswapRouter: string,
    wethAddress: string,
    overrides?: Overrides
  ): TransactionRequest {
    return super.getDeployTransaction(
      addressesProvider,
      uniswapRouter,
      wethAddress,
      overrides || {}
    );
  }
  attach(address: string): UniswapRepayAdapter {
    return super.attach(address) as UniswapRepayAdapter;
  }
  connect(signer: Signer): UniswapRepayAdapterFactory {
    return super.connect(signer) as UniswapRepayAdapterFactory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): UniswapRepayAdapter {
    return new Contract(address, _abi, signerOrProvider) as UniswapRepayAdapter;
  }
}

const _abi = [
  {
    inputs: [
      {
        internalType: "contract ILendingPoolAddressesProvider",
        name: "addressesProvider",
        type: "address",
      },
      {
        internalType: "contract IUniswapV2Router02",
        name: "uniswapRouter",
        type: "address",
      },
      {
        internalType: "address",
        name: "wethAddress",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "fromAsset",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "toAsset",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "fromAmount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "receivedAmount",
        type: "uint256",
      },
    ],
    name: "Swapped",
    type: "event",
  },
  {
    inputs: [],
    name: "ADDRESSES_PROVIDER",
    outputs: [
      {
        internalType: "contract ILendingPoolAddressesProvider",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "FLASHLOAN_PREMIUM_TOTAL",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "LENDING_POOL",
    outputs: [
      {
        internalType: "contract ILendingPool",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "MAX_SLIPPAGE_PERCENT",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "ORACLE",
    outputs: [
      {
        internalType: "contract IPriceOracleGetter",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "UNISWAP_ROUTER",
    outputs: [
      {
        internalType: "contract IUniswapV2Router02",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "USD_ADDRESS",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "WETH_ADDRESS",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "assets",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "amounts",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "premiums",
        type: "uint256[]",
      },
      {
        internalType: "address",
        name: "initiator",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "params",
        type: "bytes",
      },
    ],
    name: "executeOperation",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amountOut",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "reserveIn",
        type: "address",
      },
      {
        internalType: "address",
        name: "reserveOut",
        type: "address",
      },
    ],
    name: "getAmountsIn",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amountIn",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "reserveIn",
        type: "address",
      },
      {
        internalType: "address",
        name: "reserveOut",
        type: "address",
      },
    ],
    name: "getAmountsOut",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IERC20",
        name: "token",
        type: "address",
      },
    ],
    name: "rescueTokens",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "collateralAsset",
        type: "address",
      },
      {
        internalType: "address",
        name: "debtAsset",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "collateralAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "debtRepayAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "debtRateMode",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "deadline",
            type: "uint256",
          },
          {
            internalType: "uint8",
            name: "v",
            type: "uint8",
          },
          {
            internalType: "bytes32",
            name: "r",
            type: "bytes32",
          },
          {
            internalType: "bytes32",
            name: "s",
            type: "bytes32",
          },
        ],
        internalType: "struct IBaseUniswapAdapter.PermitSignature",
        name: "permitSignature",
        type: "tuple",
      },
      {
        internalType: "bool",
        name: "useEthPath",
        type: "bool",
      },
    ],
    name: "swapAndRepay",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x6101206040523480156200001257600080fd5b5060405162003680380380620036808339810160408190526200003591620001fd565b82828282806001600160a01b03166080816001600160a01b031660601b81525050806001600160a01b0316630261bf8b6040518163ffffffff1660e01b815260040160206040518083038186803b1580156200009057600080fd5b505afa158015620000a5573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190620000cb9190620001d7565b60601b6001600160601b03191660a052506000620000e8620001d3565b600080546001600160a01b0319166001600160a01b0383169081178255604051929350917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908290a350826001600160a01b031663fca513a86040518163ffffffff1660e01b815260040160206040518083038186803b1580156200016c57600080fd5b505afa15801562000181573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190620001a79190620001d7565b6001600160601b0319606091821b811660e05292811b8316610100521b1660c052506200026992505050565b3390565b600060208284031215620001e9578081fd5b8151620001f68162000250565b9392505050565b60008060006060848603121562000212578182fd5b83516200021f8162000250565b6020850151909350620002328162000250565b6040850151909250620002458162000250565b809150509250925092565b6001600160a01b03811681146200026657600080fd5b50565b60805160601c60a05160601c60c05160601c60e05160601c6101005160601c61333c620003446000398061060152806110d452806111c852806118475280611b3d5280611b725280611d06528061222352806123145250806103a2528061248e52508061034f5280610fae5280610feb528061105552806117345280611bf052806120fd528061213a52806121a452508061045f528061057c5280610817528061084c52806108885280610aa75280610adc5280610b9a5280610db05280610ddb52806115d25280611a03525080610373525061333c6000f3fe608060405234801561001057600080fd5b50600436106100ff5760003560e01c8063920f5c8411610097578063cdf58cd611610066578063cdf58cd6146101c8578063d8264920146101db578063e6813563146101e3578063f2fde38b146101f6576100ff565b8063920f5c84146101745780639d1211bf14610194578063b4dcfc771461019c578063baf7fa99146101a4576100ff565b806332e4b286116100d357806332e4b2861461015457806338013f021461015c578063715018a6146101645780638da5cb5b1461016c576100ff565b8062ae3bf814610104578063040141e5146101195780630542975c14610137578063074b2e431461013f575b600080fd5b6101176101123660046128b2565b610209565b005b61012161034d565b60405161012e9190612dc5565b60405180910390f35b610121610371565b610147610395565b60405161012e91906131ca565b61014761039a565b6101216103a0565b6101176103c4565b610121610443565b6101876101823660046129dc565b610452565b60405161012e9190612ee8565b610121610562565b61012161057a565b6101b76101b2366004612d09565b61059e565b60405161012e959493929190613228565b6101b76101d6366004612d09565b6105e4565b6101216105ff565b6101176101f1366004612957565b610623565b6101176102043660046128b2565b610924565b6102116109da565b6000546001600160a01b039081169116146102475760405162461bcd60e51b815260040161023e90613093565b60405180910390fd5b806001600160a01b031663a9059cbb61025e610443565b6040516370a0823160e01b81526001600160a01b038516906370a082319061028a903090600401612dc5565b60206040518083038186803b1580156102a257600080fd5b505afa1580156102b6573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102da9190612cf1565b6040518363ffffffff1660e01b81526004016102f7929190612e81565b602060405180830381600087803b15801561031157600080fd5b505af1158015610325573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103499190612b6e565b5050565b7f000000000000000000000000000000000000000000000000000000000000000081565b7f000000000000000000000000000000000000000000000000000000000000000081565b600981565b610bb881565b7f000000000000000000000000000000000000000000000000000000000000000081565b6103cc6109da565b6000546001600160a01b039081169116146103f95760405162461bcd60e51b815260040161023e90613093565b600080546040516001600160a01b03909116907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908390a3600080546001600160a01b0319169055565b6000546001600160a01b031690565b6000336001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000161461049c5760405162461bcd60e51b815260040161023e90612f26565b6104a46126d8565b6104e384848080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152506109de92505050565b905061055181600001518c8c60008181106104fa57fe5b905060200201602081019061050f91906128b2565b8b8b600081811061051c57fe5b90506020020135846020015185604001518a8d8d600081811061053b57fe5b9050602002013588606001518960800151610a85565b5060019a9950505050505050505050565b7310f7fc1f91ba351f9c629c5947ad69bd03c05b9681565b7f000000000000000000000000000000000000000000000000000000000000000081565b60008060008060606105ae612716565b6105b988888b610e22565b8051602082015160408301516060840151608090940151929d919c509a509198509650945050505050565b60008060008060606105f4612716565b6105b988888b6113d9565b7f000000000000000000000000000000000000000000000000000000000000000081565b61062b612745565b610634886115b3565b905061063e612745565b610647886115b3565b90506000600186600281111561065957fe5b600281111561066457fe5b146106745781610120015161067b565b8161010001515b90506000816001600160a01b03166370a08231336040518263ffffffff1660e01b81526004016106ab9190612dc5565b60206040518083038186803b1580156106c357600080fd5b505afa1580156106d7573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106fb9190612cf1565b905060008189111561070d578161070f565b885b90508a6001600160a01b03168c6001600160a01b0316146107ec57898982101561074a576107478a610741838561165e565b90611698565b90505b60606107588e8e858b6116da565b9050818160008151811061076857fe5b6020026020010151111561078e5760405162461bcd60e51b815260040161023e906130c8565b6107c38e8860e0015133846000815181106107a557fe5b60200260200101518d8036038101906107be9190612b8a565b6118dc565b6107e48e8e836000815181106107d557fe5b6020026020010151868c611a96565b505050610808565b6108088c8660e0015133848b8036038101906107be9190612b8a565b61083d6001600160a01b038c167f00000000000000000000000000000000000000000000000000000000000000006000611e2a565b6108716001600160a01b038c167f000000000000000000000000000000000000000000000000000000000000000083611e2a565b60405163573ade8160e01b81526001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000169063573ade81906108c3908e9085908d903390600401612ebd565b602060405180830381600087803b1580156108dd57600080fd5b505af11580156108f1573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109159190612cf1565b50505050505050505050505050565b61092c6109da565b6000546001600160a01b039081169116146109595760405162461bcd60e51b815260040161023e90613093565b6001600160a01b03811661097f5760405162461bcd60e51b815260040161023e90612f5d565b600080546040516001600160a01b03808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a3600080546001600160a01b0319166001600160a01b0392909216919091179055565b3390565b6109e66126d8565b60008060008060008060008060008a806020019051810190610a0891906128ce565b9850985098509850985098509850985098506040518060a001604052808a6001600160a01b031681526020018981526020018881526020016040518060a001604052808981526020018881526020018760ff1681526020018681526020018581525081526020018215158152509950505050505050505050919050565b610a8d612745565b610a968a6115b3565b9050610acd6001600160a01b038a167f00000000000000000000000000000000000000000000000000000000000000006000611e2a565b610b016001600160a01b038a167f00000000000000000000000000000000000000000000000000000000000000008a611e2a565b6040516370a0823160e01b81526000906001600160a01b038b16906370a0823190610b30903090600401612dc5565b60206040518083038186803b158015610b4857600080fd5b505afa158015610b5c573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b809190612cf1565b60405163573ade8160e01b81529091506001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000169063573ade8190610bd5908d908d908c908c90600401612ebd565b602060405180830381600087803b158015610bef57600080fd5b505af1158015610c03573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c279190612cf1565b506040516370a0823160e01b8152610caf906001600160a01b038c16906370a0823190610c58903090600401612dc5565b60206040518083038186803b158015610c7057600080fd5b505afa158015610c84573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ca89190612cf1565b8290611f29565b9050896001600160a01b03168b6001600160a01b031614610d85578789821015610ce457610ce18a610741838561165e565b90505b6000610cf08388611f6b565b90506060610d008e8e84896116da565b90508281600081518110610d1057fe5b60200260200101511115610d365760405162461bcd60e51b815260040161023e906130c8565b610d5b8e8660e001518b84600081518110610d4d57fe5b60200260200101518b6118dc565b610d7c8e8e83600081518110610d6d57fe5b6020026020010151858a611a96565b50505050610da1565b60e0820151610da1908c9088610d9b858a611f6b565b886118dc565b610dd66001600160a01b038b167f00000000000000000000000000000000000000000000000000000000000000006000611e2a565b610e157f0000000000000000000000000000000000000000000000000000000000000000610e048b88611f6b565b6001600160a01b038d169190611e2a565b5050505050505050505050565b610e2a612716565b6000610e47610e4061271061074186600961165e565b8490611f29565b9050836001600160a01b0316856001600160a01b03161415610f13576000610e6e86611f90565b60408051600180825281830190925291925060609190602080830190803683370190505090508681600081518110610ea257fe5b6001600160a01b039092166020928302919091018201526040805160a08101909152848152908101610ee08761074187670de0b6b3a764000061165e565b8152602001610ef089888661200c565b8152602001610f0089868661200c565b81526020018281525093505050506113d2565b60408051600280825260608083018452926020830190803683370190505090508581600081518110610f4157fe5b60200260200101906001600160a01b031690816001600160a01b0316815250508481600181518110610f6f57fe5b6001600160a01b0392909216602092830291909101820152604080516003808252608082019092526060928392839291820183803683370190505090507f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316896001600160a01b03161415801561102057507f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316886001600160a01b031614155b1561118c57888160008151811061103357fe5b60200260200101906001600160a01b031690816001600160a01b0316815250507f00000000000000000000000000000000000000000000000000000000000000008160018151811061108157fe5b60200260200101906001600160a01b031690816001600160a01b03168152505087816002815181106110af57fe5b6001600160a01b03928316602091820292909201015260405163d06ca61f60e01b81527f00000000000000000000000000000000000000000000000000000000000000009091169063d06ca61f9061110d90889085906004016131d3565b60006040518083038186803b15801561112557600080fd5b505afa92505050801561115a57506040513d6000823e601f3d908101601f191682016040526111579190810190612ad9565b60015b61118457604080516003808252608082019092529060208201606080368337019050509150611187565b91505b6111ae565b6040805160038082526080820190925290602082016060803683370190505091505b60405163d06ca61f60e01b81526000906001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000169063d06ca61f906111ff90899089906004016131d3565b60006040518083038186803b15801561121757600080fd5b505afa92505050801561124c57506040513d6000823e601f3d908101601f191682016040526112499190810190612ad9565b60015b61128c5760408051600280825260608201835290916020830190803683370190505093508260028151811061127d57fe5b602002602001015190506112f2565b8094508460018151811061129c57fe5b6020026020010151846002815181106112b157fe5b6020026020010151116112d857846001815181106112cb57fe5b60200260200101516112ee565b836002815181106112e557fe5b60200260200101515b9150505b60006112fd8b611f90565b9050600061130a8b611f90565b9050600061133f61131f85600a86900a61165e565b610741600a85900a6113398d670de0b6b3a764000061165e565b9061165e565b90506040518060a001604052808581526020018281526020016113638f8e8761200c565b81526020016113738e878661200c565b815260200185156113a6578860018151811061138b57fe5b6020026020010151861461139f57866113a1565b895b6113c4565b60408051600280825260608201835290916020830190803683375050505b905299505050505050505050505b9392505050565b6113e1612716565b826001600160a01b0316846001600160a01b031614156114b757600061141861141161271061074186600961165e565b8490611f6b565b9050600061142586611f90565b6040805160018082528183019092529192506060919060208083019080368337019050509050868160008151811061145957fe5b6001600160a01b039092166020928302919091018201526040805160a081019091528481529081016114978561074189670de0b6b3a764000061165e565b81526020016114a789868661200c565b8152602001610f0089888661200c565b6060806114c586868661205b565b91509150600061151f6114fc6127106107416009876000815181106114e657fe5b602002602001015161165e90919063ffffffff16565b8460008151811061150957fe5b6020026020010151611f6b90919063ffffffff16565b9050600061152c88611f90565b9050600061153988611f90565b9050600061156861154e85600a85900a61165e565b610741600a86900a6113398c670de0b6b3a764000061165e565b90506040518060a0016040528085815260200182815260200161158c8c878761200c565b815260200161159c8b8b8661200c565b815260200195909552509298975050505050505050565b6115bb612745565b6040516335ea6a7560e01b81526001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016906335ea6a7590611607908590600401612dc5565b6101a06040518083038186803b15801561162057600080fd5b505afa158015611634573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906116589190612be3565b92915050565b60008261166d57506000611658565b8282028284828161167a57fe5b04146113d25760405162461bcd60e51b815260040161023e90613052565b60006113d283836040518060400160405280601a81526020017f536166654d6174683a206469766973696f6e206279207a65726f000000000000815250612418565b60608082156117b357604080516003808252608082019092529060208201606080368337019050509050858160008151811061171257fe5b60200260200101906001600160a01b031690816001600160a01b0316815250507f00000000000000000000000000000000000000000000000000000000000000008160018151811061176057fe5b60200260200101906001600160a01b031690816001600160a01b031681525050848160028151811061178e57fe5b60200260200101906001600160a01b031690816001600160a01b031681525050611830565b604080516002808252606082018352909160208301908036833701905050905085816000815181106117e157fe5b60200260200101906001600160a01b031690816001600160a01b031681525050848160018151811061180f57fe5b60200260200101906001600160a01b031690816001600160a01b0316815250505b6040516307c0329d60e21b81526001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001690631f00ca749061187e90879085906004016131d3565b60006040518083038186803b15801561189657600080fd5b505afa1580156118aa573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526118d29190810190612ad9565b9695505050505050565b6118e58161244f565b1561196957836001600160a01b031663d505accf8430846000015185602001518660400151876060015188608001516040518863ffffffff1660e01b81526004016119369796959493929190612e40565b600060405180830381600087803b15801561195057600080fd5b505af1158015611964573d6000803e3d6000fd5b505050505b6040516323b872dd60e01b81526001600160a01b038516906323b872dd9061199990869030908790600401612df3565b602060405180830381600087803b1580156119b357600080fd5b505af11580156119c7573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906119eb9190612b6e565b50604051631a4ca37b60e21b81526001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016906369328dec90611a3c90889086903090600401612e9a565b602060405180830381600087803b158015611a5657600080fd5b505af1158015611a6a573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611a8e9190612cf1565b505050505050565b600080611aa287611f90565b90506000611aaf87611f90565b90506000611abc89612474565b90506000611ac989612474565b90506000611b0d611ade612710610bb8611f6b565b611b07611aef86600a89900a61165e565b610741611b0087600a8c900a61165e565b8d9061165e565b90612513565b9050808910611b2e5760405162461bcd60e51b815260040161023e9061300f565b611b636001600160a01b038c167f00000000000000000000000000000000000000000000000000000000000000006000611e2a565b611b976001600160a01b038c167f00000000000000000000000000000000000000000000000000000000000000008b611e2a565b60608715611c6f576040805160038082526080820190925290602082016060803683370190505090508b81600081518110611bce57fe5b60200260200101906001600160a01b031690816001600160a01b0316815250507f000000000000000000000000000000000000000000000000000000000000000081600181518110611c1c57fe5b60200260200101906001600160a01b031690816001600160a01b0316815250508a81600281518110611c4a57fe5b60200260200101906001600160a01b031690816001600160a01b031681525050611cec565b60408051600280825260608201835290916020830190803683370190505090508b81600081518110611c9d57fe5b60200260200101906001600160a01b031690816001600160a01b0316815250508a81600181518110611ccb57fe5b60200260200101906001600160a01b031690816001600160a01b0316815250505b604051634401edf760e11b81526060906001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001690638803dbee90611d43908d908f908790309042906004016131ec565b600060405180830381600087803b158015611d5d57600080fd5b505af1158015611d71573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f19168201604052611d999190810190612ad9565b90507fa078c4190abe07940190effc1846be0ccf03ad6007bc9e93f9697d0b460befbb8d8d83600081518110611dcb57fe5b602002602001015184600186510381518110611de357fe5b6020026020010151604051611dfb9493929190612e17565b60405180910390a180600081518110611e1057fe5b602002602001015197505050505050505095945050505050565b801580611eb25750604051636eb1769f60e11b81526001600160a01b0384169063dd62ed3e90611e609030908690600401612dd9565b60206040518083038186803b158015611e7857600080fd5b505afa158015611e8c573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611eb09190612cf1565b155b611ece5760405162461bcd60e51b815260040161023e9061313d565b611f248363095ea7b360e01b8484604051602401611eed929190612e81565b60408051601f198184030181529190526020810180516001600160e01b03166001600160e01b031990931692909217909152612585565b505050565b60006113d283836040518060400160405280601e81526020017f536166654d6174683a207375627472616374696f6e206f766572666c6f770000815250612670565b6000828201838110156113d25760405162461bcd60e51b815260040161023e90612fa3565b6000816001600160a01b031663313ce5676040518163ffffffff1660e01b815260040160206040518083038186803b158015611fcb57600080fd5b505afa158015611fdf573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906120039190612d4a565b60ff1692915050565b60008061202c7310f7fc1f91ba351f9c629c5947ad69bd03c05b96612474565b9050600061203986612474565b90506118d2670de0b6b3a764000061074184611339600a89900a838b8861165e565b604080516002808252606082810190935282918291816020016020820280368337019050509050858160008151811061209057fe5b60200260200101906001600160a01b031690816001600160a01b03168152505084816001815181106120be57fe5b6001600160a01b0392909216602092830291909101820152604080516003808252608082019092526060928392839291820183803683370190505090507f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316896001600160a01b03161415801561216f57507f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316886001600160a01b031614155b156122db57888160008151811061218257fe5b60200260200101906001600160a01b031690816001600160a01b0316815250507f0000000000000000000000000000000000000000000000000000000000000000816001815181106121d057fe5b60200260200101906001600160a01b031690816001600160a01b03168152505087816002815181106121fe57fe5b6001600160a01b0392831660209182029290920101526040516307c0329d60e21b81527f000000000000000000000000000000000000000000000000000000000000000090911690631f00ca749061225c908a9085906004016131d3565b60006040518083038186803b15801561227457600080fd5b505afa9250505080156122a957506040513d6000823e601f3d908101601f191682016040526122a69190810190612ad9565b60015b6122d3576040805160038082526080820190925290602082016060803683370190505091506122d6565b91505b6122fd565b6040805160038082526080820190925290602082016060803683370190505091505b6040516307c0329d60e21b81526001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001690631f00ca749061234b908a9088906004016131d3565b60006040518083038186803b15801561236357600080fd5b505afa92505050801561239857506040513d6000823e601f3d908101601f191682016040526123959190810190612ad9565b60015b6123a9579094509250612410915050565b809350836000815181106123b957fe5b6020026020010151836000815181106123ce57fe5b60200260200101511080156123f85750826000815181106123eb57fe5b6020026020010151600014155b612403578385612406565b82825b9650965050505050505b935093915050565b600081836124395760405162461bcd60e51b815260040161023e9190612ef3565b50600083858161244557fe5b0495945050505050565b6000816040015160ff16826020015114801561246d57506020820151155b1592915050565b60405163b3596f0760e01b81526000906001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000169063b3596f07906124c3908590600401612dc5565b60206040518083038186803b1580156124db57600080fd5b505afa1580156124ef573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906116589190612cf1565b6000821580612520575081155b1561252d57506000611658565b81611388198161253957fe5b0483111560405180604001604052806002815260200161068760f31b815250906125765760405162461bcd60e51b815260040161023e9190612ef3565b50506127109102611388010490565b612597826001600160a01b031661269c565b6125b35760405162461bcd60e51b815260040161023e90613193565b60006060836001600160a01b0316836040516125cf9190612da9565b6000604051808303816000865af19150503d806000811461260c576040519150601f19603f3d011682016040523d82523d6000602084013e612611565b606091505b5091509150816126335760405162461bcd60e51b815260040161023e90612fda565b80511561266a578080602001905181019061264e9190612b6e565b61266a5760405162461bcd60e51b815260040161023e906130f3565b50505050565b600081848411156126945760405162461bcd60e51b815260040161023e9190612ef3565b505050900390565b6000813f7fc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a4708181148015906126d057508115155b949350505050565b6040518060a0016040528060006001600160a01b0316815260200160008152602001600081526020016127096127b8565b8152600060209091015290565b6040518060a0016040528060008152602001600081526020016000815260200160008152602001606081525090565b604051806101a001604052806127596127e6565b815260006020820181905260408201819052606082018190526080820181905260a0820181905260c0820181905260e0820181905261010082018190526101208201819052610140820181905261016082018190526101809091015290565b6040805160a08101825260008082526020820181905291810182905260608101829052608081019190915290565b6040518060200160405280600081525090565b8051611658816132d1565b60008083601f840112612815578182fd5b50813567ffffffffffffffff81111561282c578182fd5b602083019150836020808302850101111561284657600080fd5b9250929050565b60006020828403121561285e578081fd5b612868602061325e565b9151825250919050565b80516fffffffffffffffffffffffffffffffff8116811461165857600080fd5b805164ffffffffff8116811461165857600080fd5b8051611658816132f7565b6000602082840312156128c3578081fd5b81356113d2816132d1565b60008060008060008060008060006101208a8c0312156128ec578485fd5b89516128f7816132d1565b8099505060208a0151975060408a0151965060608a0151955060808a0151945060a08a0151612925816132f7565b8094505060c08a0151925060e08a015191506101008a0151612946816132e9565b809150509295985092959850929598565b6000806000806000806000878903610160811215612973578182fd5b883561297e816132d1565b9750602089013561298e816132d1565b965060408901359550606089013594506080890135935060a0609f19820112156129b6578182fd5b5060a0880191506101408801356129cc816132e9565b8091505092959891949750929550565b600080600080600080600080600060a08a8c0312156129f9578283fd5b893567ffffffffffffffff80821115612a10578485fd5b612a1c8d838e01612804565b909b50995060208c0135915080821115612a34578485fd5b612a408d838e01612804565b909950975060408c0135915080821115612a58578485fd5b612a648d838e01612804565b909750955060608c01359150612a79826132d1565b90935060808b01359080821115612a8e578384fd5b818c0191508c601f830112612aa1578384fd5b813581811115612aaf578485fd5b8d6020828501011115612ac0578485fd5b6020830194508093505050509295985092959850929598565b60006020808385031215612aeb578182fd5b825167ffffffffffffffff811115612b01578283fd5b8301601f81018513612b11578283fd5b8051612b24612b1f82613285565b61325e565b8181528381019083850185840285018601891015612b40578687fd5b8694505b83851015612b62578051835260019490940193918501918501612b44565b50979650505050505050565b600060208284031215612b7f578081fd5b81516113d2816132e9565b600060a08284031215612b9b578081fd5b612ba560a061325e565b82358152602083013560208201526040830135612bc1816132f7565b6040820152606083810135908201526080928301359281019290925250919050565b60006101a0808385031215612bf6578182fd5b612bff8161325e565b9050612c0b848461284d565b8152612c1a8460208501612872565b6020820152612c2c8460408501612872565b6040820152612c3e8460608501612872565b6060820152612c508460808501612872565b6080820152612c628460a08501612872565b60a0820152612c748460c08501612892565b60c0820152612c868460e085016127f9565b60e0820152610100612c9a858286016127f9565b90820152610120612cad858583016127f9565b90820152610140612cc0858583016127f9565b90820152610160612cd3858583016128a7565b90820152610180612ce6858583016127f9565b908201529392505050565b600060208284031215612d02578081fd5b5051919050565b600080600060608486031215612d1d578081fd5b833592506020840135612d2f816132d1565b91506040840135612d3f816132d1565b809150509250925092565b600060208284031215612d5b578081fd5b81516113d2816132f7565b6000815180845260208085019450808401835b83811015612d9e5781516001600160a01b031687529582019590820190600101612d79565b509495945050505050565b60008251612dbb8184602087016132a5565b9190910192915050565b6001600160a01b0391909116815260200190565b6001600160a01b0392831681529116602082015260400190565b6001600160a01b039384168152919092166020820152604081019190915260600190565b6001600160a01b0394851681529290931660208301526040820152606081019190915260800190565b6001600160a01b0397881681529590961660208601526040850193909352606084019190915260ff16608083015260a082015260c081019190915260e00190565b6001600160a01b03929092168252602082015260400190565b6001600160a01b0393841681526020810192909252909116604082015260600190565b6001600160a01b03948516815260208101939093526040830191909152909116606082015260800190565b901515815260200190565b6000602082528251806020840152612f128160408501602087016132a5565b601f01601f19169190910160400192915050565b6020808252601b908201527f43414c4c45525f4d5553545f42455f4c454e44494e475f504f4f4c0000000000604082015260600190565b60208082526026908201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160408201526564647265737360d01b606082015260800190565b6020808252601b908201527f536166654d6174683a206164646974696f6e206f766572666c6f770000000000604082015260600190565b6020808252818101527f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c6564604082015260600190565b60208082526023908201527f6d6178416d6f756e74546f5377617020657863656564206d617820736c69707060408201526261676560e81b606082015260800190565b60208082526021908201527f536166654d6174683a206d756c7469706c69636174696f6e206f766572666c6f6040820152607760f81b606082015260800190565b6020808252818101527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604082015260600190565b6020808252601190820152700e6d8d2e0e0c2ceca40e8dede40d0d2ced607b1b604082015260600190565b6020808252602a908201527f5361666545524332303a204552433230206f7065726174696f6e20646964206e6040820152691bdd081cdd58d8d9595960b21b606082015260800190565b60208082526036908201527f5361666545524332303a20617070726f76652066726f6d206e6f6e2d7a65726f60408201527520746f206e6f6e2d7a65726f20616c6c6f77616e636560501b606082015260800190565b6020808252601f908201527f5361666545524332303a2063616c6c20746f206e6f6e2d636f6e747261637400604082015260600190565b90815260200190565b6000838252604060208301526126d06040830184612d66565b600086825285602083015260a0604083015261320b60a0830186612d66565b6001600160a01b0394909416606083015250608001529392505050565b600086825285602083015284604083015283606083015260a0608083015261325360a0830184612d66565b979650505050505050565b60405181810167ffffffffffffffff8111828210171561327d57600080fd5b604052919050565b600067ffffffffffffffff82111561329b578081fd5b5060209081020190565b60005b838110156132c05781810151838201526020016132a8565b8381111561266a5750506000910152565b6001600160a01b03811681146132e657600080fd5b50565b80151581146132e657600080fd5b60ff811681146132e657600080fdfea264697066735822122087dba3a457d61005cabffb739b19e6d7b4aa3fb2c79df9634ceeac37dd9366a164736f6c634300060c0033";