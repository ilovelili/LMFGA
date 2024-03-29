/* Generated by ts-generator ver. 0.0.8 */
/* tslint:disable */

import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { Contract, ContractFactory, Overrides } from "@ethersproject/contracts";

import { VaultManager } from "./VaultManager";

export class VaultManagerFactory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(overrides?: Overrides): Promise<VaultManager> {
    return super.deploy(overrides || {}) as Promise<VaultManager>;
  }
  getDeployTransaction(overrides?: Overrides): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): VaultManager {
    return super.attach(address) as VaultManager;
  }
  connect(signer: Signer): VaultManagerFactory {
    return super.connect(signer) as VaultManagerFactory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): VaultManager {
    return new Contract(address, _abi, signerOrProvider) as VaultManager;
  }
}

const _abi = [
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "manager",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "cdp",
        type: "uint256"
      },
      {
        internalType: "address",
        name: "usr",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "ok",
        type: "uint256"
      }
    ],
    name: "cdpAllow",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "apt",
        type: "address"
      },
      {
        internalType: "address",
        name: "urn",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "wad",
        type: "uint256"
      }
    ],
    name: "daiJoin_join",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "manager",
        type: "address"
      },
      {
        internalType: "address",
        name: "src",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "cdp",
        type: "uint256"
      }
    ],
    name: "enter",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "apt",
        type: "address"
      },
      {
        internalType: "address",
        name: "urn",
        type: "address"
      }
    ],
    name: "ethJoin_join",
    outputs: [],
    payable: true,
    stateMutability: "payable",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "manager",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "cdp",
        type: "uint256"
      },
      {
        internalType: "address",
        name: "dst",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "wad",
        type: "uint256"
      }
    ],
    name: "flux",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "manager",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "cdp",
        type: "uint256"
      },
      {
        internalType: "int256",
        name: "dink",
        type: "int256"
      },
      {
        internalType: "int256",
        name: "dart",
        type: "int256"
      }
    ],
    name: "frob",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "apt",
        type: "address"
      },
      {
        internalType: "address",
        name: "urn",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "wad",
        type: "uint256"
      },
      {
        internalType: "bool",
        name: "transferFrom",
        type: "bool"
      }
    ],
    name: "gemJoin_join",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "manager",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "cdp",
        type: "uint256"
      },
      {
        internalType: "address",
        name: "usr",
        type: "address"
      }
    ],
    name: "give",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "proxyRegistry",
        type: "address"
      },
      {
        internalType: "address",
        name: "manager",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "cdp",
        type: "uint256"
      },
      {
        internalType: "address",
        name: "dst",
        type: "address"
      }
    ],
    name: "giveToProxy",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "obj",
        type: "address"
      },
      {
        internalType: "address",
        name: "usr",
        type: "address"
      }
    ],
    name: "hope",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "manager",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "cdp",
        type: "uint256"
      },
      {
        internalType: "address",
        name: "dst",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "rad",
        type: "uint256"
      }
    ],
    name: "move",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "obj",
        type: "address"
      },
      {
        internalType: "address",
        name: "usr",
        type: "address"
      }
    ],
    name: "nope",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "manager",
        type: "address"
      },
      {
        internalType: "bytes32",
        name: "ilk",
        type: "bytes32"
      },
      {
        internalType: "address",
        name: "usr",
        type: "address"
      }
    ],
    name: "open",
    outputs: [
      {
        internalType: "uint256",
        name: "cdp",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "manager",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "cdp",
        type: "uint256"
      },
      {
        internalType: "address",
        name: "dst",
        type: "address"
      }
    ],
    name: "quit",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "manager",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "cdpSrc",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "cdpOrg",
        type: "uint256"
      }
    ],
    name: "shift",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "gem",
        type: "address"
      },
      {
        internalType: "address",
        name: "dst",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "wad",
        type: "uint256"
      }
    ],
    name: "transfer",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "manager",
        type: "address"
      },
      {
        internalType: "address",
        name: "usr",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "ok",
        type: "uint256"
      }
    ],
    name: "urnAllow",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "manager",
        type: "address"
      },
      {
        internalType: "address",
        name: "jug",
        type: "address"
      },
      {
        internalType: "address",
        name: "ethJoin",
        type: "address"
      },
      {
        internalType: "address",
        name: "daiJoin",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "wadD",
        type: "uint256"
      }
    ],
    name: "openVault",
    outputs: [],
    payable: true,
    stateMutability: "payable",
    type: "function"
  }
];

const _bytecode =
  "0x608060405234801561001057600080fd5b5061258c806100206000396000f3fe6080604052600436106101095760003560e01c80637df2eb2511610095578063b50a586911610064578063b50a586914610791578063ba727a9514610802578063beabacc814610887578063c56167c614610902578063eb0b9a851461097d57610109565b80637df2eb25146105c657806396e8d72c1461064d5780639f887fde146106bc578063a033df121461072d57610109565b80634592aca7116100dc5780634592aca714610341578063493c2049146103bc5780635f6ef447146104575780636aa3ee11146104d25780637bc3bd531461056157610109565b80631558b0481461010e5780631d10f231146101935780632253b9b81461020e57806325cf37d0146102bc575b600080fd5b34801561011a57600080fd5b506101916004803603608081101561013157600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291905050506109f8565b005b34801561019f57600080fd5b5061020c600480360360608110156101b657600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610aa5565b005b6102ba600480360360a081101561022457600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610b49565b005b3480156102c857600080fd5b5061033f600480360360808110156102df57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610f06565b005b34801561034d57600080fd5b506103ba6004803603606081101561036457600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610fb3565b005b3480156103c857600080fd5b50610455600480360360808110156103df57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050611057565b005b34801561046357600080fd5b506104d06004803603606081101561047a57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff1690602001909291908035906020019092919050505061134b565b005b3480156104de57600080fd5b5061054b600480360360608110156104f557600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506113ef565b6040518082815260200191505060405180910390f35b34801561056d57600080fd5b506105c46004803603606081101561058457600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190803590602001909291905050506114bc565b005b3480156105d257600080fd5b5061064b600480360360808110156105e957600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190803515159060200190929190505050611534565b005b34801561065957600080fd5b506106ba6004803603608081101561067057600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291908035906020019092919080359060200190929190505050611856565b005b3480156106c857600080fd5b5061072b600480360360408110156106df57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506118d7565b005b61078f6004803603604081101561074357600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050611972565b005b34801561079d57600080fd5b50610800600480360360408110156107b457600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050611c19565b005b34801561080e57600080fd5b506108856004803603608081101561082557600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050611cb4565b005b34801561089357600080fd5b50610900600480360360608110156108aa57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050611d61565b005b34801561090e57600080fd5b5061097b6004803603606081101561092557600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050611e05565b005b34801561098957600080fd5b506109f6600480360360608110156109a057600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff1690602001909291908035906020019092919050505061211f565b005b8373ffffffffffffffffffffffffffffffffffffffff16639bb8f8388484846040518463ffffffff1660e01b8152600401808481526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019350505050600060405180830381600087803b158015610a8757600080fd5b505af1158015610a9b573d6000803e3d6000fd5b5050505050505050565b8273ffffffffffffffffffffffffffffffffffffffff1663fcafcc6883836040518363ffffffff1660e01b8152600401808381526020018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200192505050600060405180830381600087803b158015610b2c57600080fd5b505af1158015610b40573d6000803e3d6000fd5b50505050505050565b60007f4554482d4100000000000000000000000000000000000000000000000000000090506000610b7b8783306113ef565b905060008773ffffffffffffffffffffffffffffffffffffffff16632726b073836040518263ffffffff1660e01b81526004018082815260200191505060206040518083038186803b158015610bd057600080fd5b505afa158015610be4573d6000803e3d6000fd5b505050506040513d6020811015610bfa57600080fd5b8101908080519060200190929190505050905060008873ffffffffffffffffffffffffffffffffffffffff166336569e776040518163ffffffff1660e01b815260040160206040518083038186803b158015610c5557600080fd5b505afa158015610c69573d6000803e3d6000fd5b505050506040513d6020811015610c7f57600080fd5b81019080805190602001909291905050509050610c9c8783611972565b610cbc8984610caa346121c3565b610cb7858d888b8d612244565b611856565b610cd0898430610ccb89612420565b610f06565b60008173ffffffffffffffffffffffffffffffffffffffff16634538c4eb30896040518363ffffffff1660e01b8152600401808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019250505060206040518083038186803b158015610d8357600080fd5b505afa158015610d97573d6000803e3d6000fd5b505050506040513d6020811015610dad57600080fd5b81019080805190602001909291905050501415610e5c578073ffffffffffffffffffffffffffffffffffffffff1663a3b22fc4876040518263ffffffff1660e01b8152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050600060405180830381600087803b158015610e4357600080fd5b505af1158015610e57573d6000803e3d6000fd5b505050505b8573ffffffffffffffffffffffffffffffffffffffff1663ef693bed33876040518363ffffffff1660e01b8152600401808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200182815260200192505050600060405180830381600087803b158015610ee357600080fd5b505af1158015610ef7573d6000803e3d6000fd5b50505050505050505050505050565b8373ffffffffffffffffffffffffffffffffffffffff1663f9f30db68484846040518463ffffffff1660e01b8152600401808481526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019350505050600060405180830381600087803b158015610f9557600080fd5b505af1158015610fa9573d6000803e3d6000fd5b5050505050505050565b8273ffffffffffffffffffffffffffffffffffffffff16631b0dbf7283836040518363ffffffff1660e01b8152600401808381526020018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200192505050600060405180830381600087803b15801561103a57600080fd5b505af115801561104e573d6000803e3d6000fd5b50505050505050565b60008473ffffffffffffffffffffffffffffffffffffffff1663c4552791836040518263ffffffff1660e01b8152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060206040518083038186803b1580156110d657600080fd5b505afa1580156110ea573d6000803e3d6000fd5b505050506040513d602081101561110057600080fd5b81019080805190602001909291905050509050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614806111fa57508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16638da5cb5b6040518163ffffffff1660e01b815260040160206040518083038186803b1580156111a657600080fd5b505afa1580156111ba573d6000803e3d6000fd5b505050506040513d60208110156111d057600080fd5b810190808051906020019092919050505073ffffffffffffffffffffffffffffffffffffffff1614155b15611339576000823b90506000811461127b576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260118152602001807f4473742d69732d612d636f6e747261637400000000000000000000000000000081525060200191505060405180910390fd5b8573ffffffffffffffffffffffffffffffffffffffff1663f3701da2846040518263ffffffff1660e01b8152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b1580156112fa57600080fd5b505af115801561130e573d6000803e3d6000fd5b505050506040513d602081101561132457600080fd5b81019080805190602001909291905050509150505b611344848483610aa5565b5050505050565b8273ffffffffffffffffffffffffffffffffffffffff1663b68f400483836040518363ffffffff1660e01b8152600401808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200182815260200192505050600060405180830381600087803b1580156113d257600080fd5b505af11580156113e6573d6000803e3d6000fd5b50505050505050565b60008373ffffffffffffffffffffffffffffffffffffffff16636090dec584846040518363ffffffff1660e01b8152600401808381526020018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200192505050602060405180830381600087803b15801561147857600080fd5b505af115801561148c573d6000803e3d6000fd5b505050506040513d60208110156114a257600080fd5b810190808051906020019092919050505090509392505050565b8273ffffffffffffffffffffffffffffffffffffffff1663e50322a283836040518363ffffffff1660e01b81526004018083815260200182815260200192505050600060405180830381600087803b15801561151757600080fd5b505af115801561152b573d6000803e3d6000fd5b50505050505050565b80156117b1578373ffffffffffffffffffffffffffffffffffffffff16637bd2bea76040518163ffffffff1660e01b8152600401602060405180830381600087803b15801561158257600080fd5b505af1158015611596573d6000803e3d6000fd5b505050506040513d60208110156115ac57600080fd5b810190808051906020019092919050505073ffffffffffffffffffffffffffffffffffffffff166323b872dd3330856040518463ffffffff1660e01b8152600401808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019350505050600060405180830381600087803b15801561167757600080fd5b505af115801561168b573d6000803e3d6000fd5b505050508373ffffffffffffffffffffffffffffffffffffffff16637bd2bea76040518163ffffffff1660e01b8152600401602060405180830381600087803b1580156116d757600080fd5b505af11580156116eb573d6000803e3d6000fd5b505050506040513d602081101561170157600080fd5b810190808051906020019092919050505073ffffffffffffffffffffffffffffffffffffffff1663095ea7b385846040518363ffffffff1660e01b8152600401808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200182815260200192505050600060405180830381600087803b15801561179857600080fd5b505af11580156117ac573d6000803e3d6000fd5b505050505b8373ffffffffffffffffffffffffffffffffffffffff16633b4da69f84846040518363ffffffff1660e01b8152600401808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200182815260200192505050600060405180830381600087803b15801561183857600080fd5b505af115801561184c573d6000803e3d6000fd5b5050505050505050565b8373ffffffffffffffffffffffffffffffffffffffff166345e6bdcd8484846040518463ffffffff1660e01b8152600401808481526020018381526020018281526020019350505050600060405180830381600087803b1580156118b957600080fd5b505af11580156118cd573d6000803e3d6000fd5b5050505050505050565b8173ffffffffffffffffffffffffffffffffffffffff1663dc4d20fa826040518263ffffffff1660e01b8152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050600060405180830381600087803b15801561195657600080fd5b505af115801561196a573d6000803e3d6000fd5b505050505050565b8173ffffffffffffffffffffffffffffffffffffffff16637bd2bea76040518163ffffffff1660e01b8152600401602060405180830381600087803b1580156119ba57600080fd5b505af11580156119ce573d6000803e3d6000fd5b505050506040513d60208110156119e457600080fd5b810190808051906020019092919050505073ffffffffffffffffffffffffffffffffffffffff1663d0e30db0346040518263ffffffff1660e01b81526004016000604051808303818588803b158015611a3c57600080fd5b505af1158015611a50573d6000803e3d6000fd5b50505050508173ffffffffffffffffffffffffffffffffffffffff16637bd2bea76040518163ffffffff1660e01b8152600401602060405180830381600087803b158015611a9d57600080fd5b505af1158015611ab1573d6000803e3d6000fd5b505050506040513d6020811015611ac757600080fd5b810190808051906020019092919050505073ffffffffffffffffffffffffffffffffffffffff1663095ea7b383346040518363ffffffff1660e01b8152600401808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200182815260200192505050600060405180830381600087803b158015611b5e57600080fd5b505af1158015611b72573d6000803e3d6000fd5b505050508173ffffffffffffffffffffffffffffffffffffffff16633b4da69f82346040518363ffffffff1660e01b8152600401808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200182815260200192505050600060405180830381600087803b158015611bfd57600080fd5b505af1158015611c11573d6000803e3d6000fd5b505050505050565b8173ffffffffffffffffffffffffffffffffffffffff1663a3b22fc4826040518263ffffffff1660e01b8152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050600060405180830381600087803b158015611c9857600080fd5b505af1158015611cac573d6000803e3d6000fd5b505050505050565b8373ffffffffffffffffffffffffffffffffffffffff16630b63fb628484846040518463ffffffff1660e01b8152600401808481526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019350505050600060405180830381600087803b158015611d4357600080fd5b505af1158015611d57573d6000803e3d6000fd5b5050505050505050565b8273ffffffffffffffffffffffffffffffffffffffff1663a9059cbb83836040518363ffffffff1660e01b8152600401808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200182815260200192505050600060405180830381600087803b158015611de857600080fd5b505af1158015611dfc573d6000803e3d6000fd5b50505050505050565b8273ffffffffffffffffffffffffffffffffffffffff1663f4b9fa756040518163ffffffff1660e01b8152600401602060405180830381600087803b158015611e4d57600080fd5b505af1158015611e61573d6000803e3d6000fd5b505050506040513d6020811015611e7757600080fd5b810190808051906020019092919050505073ffffffffffffffffffffffffffffffffffffffff166323b872dd3330846040518463ffffffff1660e01b8152600401808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019350505050600060405180830381600087803b158015611f4257600080fd5b505af1158015611f56573d6000803e3d6000fd5b505050508273ffffffffffffffffffffffffffffffffffffffff1663f4b9fa756040518163ffffffff1660e01b8152600401602060405180830381600087803b158015611fa257600080fd5b505af1158015611fb6573d6000803e3d6000fd5b505050506040513d6020811015611fcc57600080fd5b810190808051906020019092919050505073ffffffffffffffffffffffffffffffffffffffff1663095ea7b384836040518363ffffffff1660e01b8152600401808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200182815260200192505050600060405180830381600087803b15801561206357600080fd5b505af1158015612077573d6000803e3d6000fd5b505050508273ffffffffffffffffffffffffffffffffffffffff16633b4da69f83836040518363ffffffff1660e01b8152600401808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200182815260200192505050600060405180830381600087803b15801561210257600080fd5b505af1158015612116573d6000803e3d6000fd5b50505050505050565b8273ffffffffffffffffffffffffffffffffffffffff16637e348b7d83836040518363ffffffff1660e01b8152600401808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200182815260200192505050600060405180830381600087803b1580156121a657600080fd5b505af11580156121ba573d6000803e3d6000fd5b50505050505050565b6000819050600081121561223f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252600c8152602001807f696e742d6f766572666c6f77000000000000000000000000000000000000000081525060200191505060405180910390fd5b919050565b6000808573ffffffffffffffffffffffffffffffffffffffff166344e2a5a8856040518263ffffffff1660e01b815260040180828152602001915050602060405180830381600087803b15801561229a57600080fd5b505af11580156122ae573d6000803e3d6000fd5b505050506040513d60208110156122c457600080fd5b8101908080519060200190929190505050905060008773ffffffffffffffffffffffffffffffffffffffff16636c25b346876040518263ffffffff1660e01b8152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060206040518083038186803b15801561235657600080fd5b505afa15801561236a573d6000803e3d6000fd5b505050506040513d602081101561238057600080fd5b810190808051906020019092919050505090506123a9846b033b2e3c9fd0803ce800000061243f565b811015612415576123e0826123d36123cd876b033b2e3c9fd0803ce800000061243f565b846124d4565b816123da57fe5b046121c3565b92506123f8846b033b2e3c9fd0803ce800000061243f565b612402848461243f565b1061240d5782612412565b600183015b92505b505095945050505050565b6000612438826b033b2e3c9fd0803ce800000061243f565b9050919050565b60008082148061245c575082828385029250828161245957fe5b04145b6124ce576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252600c8152602001807f6d756c2d6f766572666c6f77000000000000000000000000000000000000000081525060200191505060405180910390fd5b92915050565b6000828284039150811115612551576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252600c8152602001807f7375622d6f766572666c6f77000000000000000000000000000000000000000081525060200191505060405180910390fd5b9291505056fea265627a7a723158209a15a63f21e35a3c5b81f67b335a935c79dbe86fc15f5415774bdc8cdce7e98f64736f6c63430005100032";
