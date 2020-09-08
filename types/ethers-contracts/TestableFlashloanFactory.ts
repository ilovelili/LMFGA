/* Generated by ts-generator ver. 0.0.8 */
/* tslint:disable */

import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { Contract, ContractFactory, Overrides } from "@ethersproject/contracts";

import { TestableFlashloan } from "./TestableFlashloan";

export class TestableFlashloanFactory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    kyberAddress: string,
    uniswapAddress: string,
    wethAddress: string,
    daiFaucetAddress: string,
    beneficiaryAddress: string,
    overrides?: Overrides
  ): Promise<TestableFlashloan> {
    return super.deploy(
      kyberAddress,
      uniswapAddress,
      wethAddress,
      daiFaucetAddress,
      beneficiaryAddress,
      overrides || {}
    ) as Promise<TestableFlashloan>;
  }
  getDeployTransaction(
    kyberAddress: string,
    uniswapAddress: string,
    wethAddress: string,
    daiFaucetAddress: string,
    beneficiaryAddress: string,
    overrides?: Overrides
  ): TransactionRequest {
    return super.getDeployTransaction(
      kyberAddress,
      uniswapAddress,
      wethAddress,
      daiFaucetAddress,
      beneficiaryAddress,
      overrides || {}
    );
  }
  attach(address: string): TestableFlashloan {
    return super.attach(address) as TestableFlashloan;
  }
  connect(signer: Signer): TestableFlashloanFactory {
    return super.connect(signer) as TestableFlashloanFactory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): TestableFlashloan {
    return new Contract(address, _abi, signerOrProvider) as TestableFlashloan;
  }
}

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "kyberAddress",
        type: "address"
      },
      {
        internalType: "address",
        name: "uniswapAddress",
        type: "address"
      },
      {
        internalType: "address",
        name: "wethAddress",
        type: "address"
      },
      {
        internalType: "address",
        name: "daiFaucetAddress",
        type: "address"
      },
      {
        internalType: "address",
        name: "beneficiaryAddress",
        type: "address"
      }
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "balance",
        type: "uint256"
      }
    ],
    name: "GetBalanceDest",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "balance",
        type: "uint256"
      }
    ],
    name: "GetBalanceSrc",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "enum TestableFlashloan.Direction",
        name: "direction",
        type: "uint8"
      }
    ],
    name: "GetDirection",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "balance",
        type: "uint256"
      }
    ],
    name: "GetFinalBalance",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "expectedRate",
        type: "uint256"
      }
    ],
    name: "GetKyberExpectedRate",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "int256",
        name: "profit",
        type: "int256"
      }
    ],
    name: "GetProfit",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256[]",
        name: "minOuts",
        type: "uint256[]"
      }
    ],
    name: "GetUniswapMinOuts",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "enum TestableFlashloan.Direction",
        name: "direction",
        type: "uint8"
      },
      {
        indexed: true,
        internalType: "address",
        name: "token1",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "token2",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "profit",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "date",
        type: "uint256"
      }
    ],
    name: "NewArbitrage",
    type: "event"
  },
  {
    payable: true,
    stateMutability: "payable",
    type: "fallback"
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address"
      },
      {
        components: [
          {
            internalType: "address",
            name: "owner",
            type: "address"
          },
          {
            internalType: "uint256",
            name: "number",
            type: "uint256"
          }
        ],
        internalType: "struct Account.Info",
        name: "account",
        type: "tuple"
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes"
      }
    ],
    name: "callFunction",
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
        name: "_solo",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256"
      },
      {
        internalType: "address",
        name: "_token1",
        type: "address"
      },
      {
        internalType: "address",
        name: "_token2",
        type: "address"
      },
      {
        internalType: "enum TestableFlashloan.Direction",
        name: "_direction",
        type: "uint8"
      }
    ],
    name: "initateFlashLoan",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  }
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b5060405162003ca038038062003ca083398181016040526200003791908101906200019d565b846000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555083600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555082600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555081600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600460006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050505050506200026d565b600081519050620001978162000253565b92915050565b600080600080600060a08688031215620001b657600080fd5b6000620001c68882890162000186565b9550506020620001d98882890162000186565b9450506040620001ec8882890162000186565b9350506060620001ff8882890162000186565b9250506080620002128882890162000186565b9150509295509295909350565b60006200022c8262000233565b9050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6200025e816200021f565b81146200026a57600080fd5b50565b613a23806200027d6000396000f3fe6080604052600436106100295760003560e01c80638b4187131461002b578063922c8d8114610054575b005b34801561003757600080fd5b50610052600480360361004d91908101906128f9565b61007d565b005b34801561006057600080fd5b5061007b60048036036100769190810190612960565b611dba565b005b6100856124cf565b818060200190516100999190810190612a41565b905060008160200151905060008260400151905060008273ffffffffffffffffffffffffffffffffffffffff166370a08231306040518263ffffffff1660e01b81526004016100e8919061326e565b60206040518083038186803b15801561010057600080fd5b505afa158015610114573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052506101389190810190612a6a565b9050600061012c42019050817f24e6d40733055aa45fa42bfd1cc4d59d4d8ffec5f8f83bfbb39cae68f8a3497f60405160405180910390a28460000151600381111561018057fe5b7f547d8c1ea7bb950f9326c1f5af34dfed084b832510f8e8ce929e13f4ba0770e360405160405180910390a2600060038111156101b957fe5b856000015160038111156101c957fe5b14806101ef5750600160038111156101dd57fe5b856000015160038111156101ed57fe5b145b8061021457506002600381111561020257fe5b8560000151600381111561021257fe5b145b80610238575060038081111561022657fe5b8560000151600381111561023657fe5b145b610277576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161026e90613427565b60405180910390fd5b6000600381111561028457fe5b8560000151600381111561029457fe5b14156107d1578373ffffffffffffffffffffffffffffffffffffffff1663095ea7b36000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff16846040518363ffffffff1660e01b81526004016102f6929190613289565b602060405180830381600087803b15801561031057600080fd5b505af1158015610324573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052506103489190810190612a18565b610387576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161037e906134a7565b60405180910390fd5b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663809a9e558673eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee866040518463ffffffff1660e01b81526004016103fb9392919061330b565b604080518083038186803b15801561041257600080fd5b505afa158015610426573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525061044a9190810190612a93565b509050807fb72f141705c40babe8f2e3826e109229e9c0b375637456a9b5081d7b49054e8860405160405180910390a26000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16633bba21dc8685846040518463ffffffff1660e01b81526004016104d8939291906133b0565b602060405180830381600087803b1580156104f257600080fd5b505af1158015610506573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525061052a9190810190612a6a565b506060600260405190808252806020026020018201604052801561055d5781602001602082028038833980820191505090505b509050600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff168160008151811061059057fe5b602002602001019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff168152505085816001815181106105d857fe5b602002602001019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff16815250506060600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663d06ca61f47846040518363ffffffff1660e01b815260040161067192919061353d565b60006040518083038186803b15801561068957600080fd5b505afa15801561069d573d6000803e3d6000fd5b505050506040513d6000823e3d601f19601f820116820180604052506106c691908101906129d7565b90507fad7f32c6f267a2d2e6cdf9e716d460dd691564d62fcb700b0f91559171ea27cd816040516106f791906132e9565b60405180910390a1600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16637ff36ab5478360018151811061074b57fe5b60200260200101518530896040518663ffffffff1660e01b8152600401610775949392919061356d565b6000604051808303818588803b15801561078e57600080fd5b505af11580156107a2573d6000803e3d6000fd5b50505050506040513d6000823e3d601f19601f820116820180604052506107cc91908101906129d7565b505050505b600160038111156107de57fe5b856000015160038111156107ee57fe5b1415610d2c578373ffffffffffffffffffffffffffffffffffffffff1663095ea7b3600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16846040518363ffffffff1660e01b8152600401610851929190613289565b602060405180830381600087803b15801561086b57600080fd5b505af115801561087f573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052506108a39190810190612a18565b6108e2576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016108d990613447565b60405180910390fd5b606060026040519080825280602002602001820160405280156109145781602001602082028038833980820191505090505b509050848160008151811061092557fe5b602002602001019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff1681525050600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff168160018151811061098f57fe5b602002602001019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff16815250506060600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663d06ca61f85846040518363ffffffff1660e01b8152600401610a2892919061353d565b60006040518083038186803b158015610a4057600080fd5b505afa158015610a54573d6000803e3d6000fd5b505050506040513d6000823e3d601f19601f82011682018060405250610a7d91908101906129d7565b90507fad7f32c6f267a2d2e6cdf9e716d460dd691564d62fcb700b0f91559171ea27cd81604051610aae91906132e9565b60405180910390a1600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166318cbafe58583600181518110610b0257fe5b60200260200101518530886040518663ffffffff1660e01b8152600401610b2d9594939291906135e2565b600060405180830381600087803b158015610b4757600080fd5b505af1158015610b5b573d6000803e3d6000fd5b505050506040513d6000823e3d601f19601f82011682018060405250610b8491908101906129d7565b5060008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663809a9e5573eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee89476040518463ffffffff1660e01b8152600401610bf99392919061330b565b604080518083038186803b158015610c1057600080fd5b505afa158015610c24573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250610c489190810190612a93565b509050807fb72f141705c40babe8f2e3826e109229e9c0b375637456a9b5081d7b49054e8860405160405180910390a26000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16637a2a04564789846040518463ffffffff1660e01b8152600401610cd5929190613342565b6020604051808303818588803b158015610cee57600080fd5b505af1158015610d02573d6000803e3d6000fd5b50505050506040513d601f19601f82011682018060405250610d279190810190612a6a565b505050505b60026003811115610d3957fe5b85600001516003811115610d4957fe5b1415611372578373ffffffffffffffffffffffffffffffffffffffff1663095ea7b36000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff16846040518363ffffffff1660e01b8152600401610dab929190613289565b602060405180830381600087803b158015610dc557600080fd5b505af1158015610dd9573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250610dfd9190810190612a18565b610e3c576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610e33906134e7565b60405180910390fd5b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663809a9e558686866040518463ffffffff1660e01b8152600401610e9c9392919061330b565b604080518083038186803b158015610eb357600080fd5b505afa158015610ec7573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250610eeb9190810190612a93565b509050807fb72f141705c40babe8f2e3826e109229e9c0b375637456a9b5081d7b49054e8860405160405180910390a260008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16637409e2eb878688866040518563ffffffff1660e01b8152600401610f7d949392919061336b565b602060405180830381600087803b158015610f9757600080fd5b505af1158015610fab573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250610fcf9190810190612a6a565b9050807f015d9c7e73d9302b00c6428709d16bfc64d864dc4e2312c555c4d43cc4c87fe060405160405180910390a28473ffffffffffffffffffffffffffffffffffffffff1663095ea7b3600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16836040518363ffffffff1660e01b815260040161105b929190613289565b602060405180830381600087803b15801561107557600080fd5b505af1158015611089573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052506110ad9190810190612a18565b6110ec576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016110e390613467565b60405180910390fd5b6060600260405190808252806020026020018201604052801561111e5781602001602082028038833980820191505090505b509050858160008151811061112f57fe5b602002602001019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff1681525050868160018151811061117757fe5b602002602001019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff16815250506060600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663d06ca61f84846040518363ffffffff1660e01b815260040161121092919061353d565b60006040518083038186803b15801561122857600080fd5b505afa15801561123c573d6000803e3d6000fd5b505050506040513d6000823e3d601f19601f8201168201806040525061126591908101906129d7565b90507fad7f32c6f267a2d2e6cdf9e716d460dd691564d62fcb700b0f91559171ea27cd8160405161129691906132e9565b60405180910390a1600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166338ed173984836001815181106112ea57fe5b602002602001015185308a6040518663ffffffff1660e01b81526004016113159594939291906135e2565b600060405180830381600087803b15801561132f57600080fd5b505af1158015611343573d6000803e3d6000fd5b505050506040513d6000823e3d601f19601f8201168201806040525061136c91908101906129d7565b50505050505b60038081111561137e57fe5b8560000151600381111561138e57fe5b14156119d1578373ffffffffffffffffffffffffffffffffffffffff1663095ea7b3600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16846040518363ffffffff1660e01b81526004016113f1929190613289565b602060405180830381600087803b15801561140b57600080fd5b505af115801561141f573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052506114439190810190612a18565b611482576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161147990613407565b60405180910390fd5b606060026040519080825280602002602001820160405280156114b45781602001602082028038833980820191505090505b50905084816000815181106114c557fe5b602002602001019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff1681525050838160018151811061150d57fe5b602002602001019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff16815250506060600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663d06ca61f85846040518363ffffffff1660e01b81526004016115a692919061353d565b60006040518083038186803b1580156115be57600080fd5b505afa1580156115d2573d6000803e3d6000fd5b505050506040513d6000823e3d601f19601f820116820180604052506115fb91908101906129d7565b90507fad7f32c6f267a2d2e6cdf9e716d460dd691564d62fcb700b0f91559171ea27cd8160405161162c91906132e9565b60405180910390a16060600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166338ed1739868460018151811061168257fe5b60200260200101518630896040518663ffffffff1660e01b81526004016116ad9594939291906135e2565b600060405180830381600087803b1580156116c757600080fd5b505af11580156116db573d6000803e3d6000fd5b505050506040513d6000823e3d601f19601f8201168201806040525061170491908101906129d7565b905060008160008151811061171557fe5b60200260200101519050807f015d9c7e73d9302b00c6428709d16bfc64d864dc4e2312c555c4d43cc4c87fe060405160405180910390a28673ffffffffffffffffffffffffffffffffffffffff1663095ea7b36000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff16836040518363ffffffff1660e01b81526004016117a8929190613289565b602060405180830381600087803b1580156117c257600080fd5b505af11580156117d6573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052506117fa9190810190612a18565b611839576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611830906134c7565b60405180910390fd5b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663809a9e55898b856040518463ffffffff1660e01b81526004016118999392919061330b565b604080518083038186803b1580156118b057600080fd5b505afa1580156118c4573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052506118e89190810190612a93565b509050807fb72f141705c40babe8f2e3826e109229e9c0b375637456a9b5081d7b49054e8860405160405180910390a26000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16637409e2eb89848c856040518563ffffffff1660e01b8152600401611978949392919061336b565b602060405180830381600087803b15801561199257600080fd5b505af11580156119a6573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052506119ca9190810190612a6a565b5050505050505b60008473ffffffffffffffffffffffffffffffffffffffff166370a08231306040518263ffffffff1660e01b8152600401611a0c919061326e565b60206040518083038186803b158015611a2457600080fd5b505afa158015611a38573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250611a5c9190810190612a6a565b9050600086606001518673ffffffffffffffffffffffffffffffffffffffff166370a08231306040518263ffffffff1660e01b8152600401611a9e919061326e565b60206040518083038186803b158015611ab657600080fd5b505afa158015611aca573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250611aee9190810190612a6a565b039050817f67582069435f8f8f3905d9e72e86eeec54199779a70fc275d67712c5c06b82ad60405160405180910390a2807fb54e9a70a8a88cc17c01bb5dd656115b4b6887e14664f288b580e18bb4e1780560405160405180910390a28660600151821015611beb57600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16638cd6b340838960600151036040518263ffffffff1660e01b8152600401611bb89190613522565b600060405180830381600087803b158015611bd257600080fd5b505af1158015611be6573d6000803e3d6000fd5b505050505b600087606001518773ffffffffffffffffffffffffffffffffffffffff166370a08231306040518263ffffffff1660e01b8152600401611c2b919061326e565b60206040518083038186803b158015611c4357600080fd5b505afa158015611c57573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250611c7b9190810190612a6a565b0390508673ffffffffffffffffffffffffffffffffffffffff1663a9059cbb600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16836040518363ffffffff1660e01b8152600401611cdb929190613289565b602060405180830381600087803b158015611cf557600080fd5b505af1158015611d09573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250611d2d9190810190612a18565b50876040015173ffffffffffffffffffffffffffffffffffffffff16886020015173ffffffffffffffffffffffffffffffffffffffff1689600001516003811115611d7457fe5b7f11e944aca3539ba70760461542172892c68b0d8afb8f8eaf5aa7371d240ab5f28442604051611da59291906135b9565b60405180910390a45050505050505050505050565b6000611dc68685612056565b90506000611dd386612208565b90508473ffffffffffffffffffffffffffffffffffffffff1663095ea7b388836040518363ffffffff1660e01b8152600401611e10929190613289565b602060405180830381600087803b158015611e2a57600080fd5b505af1158015611e3e573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250611e629190810190612a18565b5060606003604051908082528060200260200182016040528015611ea057816020015b611e8d61252e565b815260200190600190039081611e855790505b509050611ead8388612225565b81600081518110611eba57fe5b6020026020010181905250611f446040518060800160405280866003811115611edf57fe5b81526020018873ffffffffffffffffffffffffffffffffffffffff1681526020018773ffffffffffffffffffffffffffffffffffffffff16815260200184815250604051602001611f309190613507565b6040516020818303038152906040526122de565b81600181518110611f5157fe5b6020026020010181905250611f668383612388565b81600281518110611f7357fe5b602002602001018190525060606001604051908082528060200260200182016040528015611fbb57816020015b611fa861259a565b815260200190600190039081611fa05790505b509050611fc6612441565b81600081518110611fd357fe5b60200260200101819052508873ffffffffffffffffffffffffffffffffffffffff1663a67a6a4582846040518363ffffffff1660e01b81526004016120199291906132b2565b600060405180830381600087803b15801561203357600080fd5b505af1158015612047573d6000803e3d6000fd5b50505050505050505050505050565b60008083905060008173ffffffffffffffffffffffffffffffffffffffff1663295c39a56040518163ffffffff1660e01b815260040160206040518083038186803b1580156120a457600080fd5b505afa1580156120b8573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052506120dc9190810190612a6a565b9050600080600090505b828110156121c6578373ffffffffffffffffffffffffffffffffffffffff1663062bd3e9826040518263ffffffff1660e01b81526004016121279190613522565b60206040518083038186803b15801561213f57600080fd5b505afa158015612153573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525061217791908101906128d0565b91508573ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614156121b95780945050505050612202565b80806001019150506120e6565b506040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016121f990613487565b60405180910390fd5b92915050565b600061221e60028361247a90919063ffffffff16565b9050919050565b61222d6125ca565b6040518061010001604052806001600881111561224657fe5b81526020016000815260200160405180608001604052806000151581526020016000600181111561227357fe5b81526020016000600181111561228557fe5b8152602001858152508152602001848152602001600081526020013073ffffffffffffffffffffffffffffffffffffffff1681526020016000815260200160405180602001604052806000815250815250905092915050565b6122e66125ca565b6040518061010001604052806008808111156122fe57fe5b81526020016000815260200160405180608001604052806000151581526020016000600181111561232b57fe5b81526020016000600181111561233d57fe5b81526020016000815250815260200160008152602001600081526020013073ffffffffffffffffffffffffffffffffffffffff16815260200160008152602001838152509050919050565b6123906125ca565b604051806101000160405280600060088111156123a957fe5b8152602001600081526020016040518060800160405280600115158152602001600060018111156123d657fe5b8152602001600060018111156123e857fe5b8152602001858152508152602001848152602001600081526020013073ffffffffffffffffffffffffffffffffffffffff1681526020016000815260200160405180602001604052806000815250815250905092915050565b612449612636565b60405180604001604052803073ffffffffffffffffffffffffffffffffffffffff1681526020016001815250905090565b6000808284019050838110156124c5576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016124bc906133e7565b60405180910390fd5b8091505092915050565b6040518060800160405280600060038111156124e757fe5b8152602001600073ffffffffffffffffffffffffffffffffffffffff168152602001600073ffffffffffffffffffffffffffffffffffffffff168152602001600081525090565b6040518061010001604052806000600881111561254757fe5b81526020016000815260200161255b612666565b81526020016000815260200160008152602001600073ffffffffffffffffffffffffffffffffffffffff16815260200160008152602001606081525090565b6040518060400160405280600073ffffffffffffffffffffffffffffffffffffffff168152602001600081525090565b604051806101000160405280600060088111156125e357fe5b8152602001600081526020016125f7612666565b81526020016000815260200160008152602001600073ffffffffffffffffffffffffffffffffffffffff16815260200160008152602001606081525090565b6040518060400160405280600073ffffffffffffffffffffffffffffffffffffffff168152602001600081525090565b60405180608001604052806000151581526020016000600181111561268757fe5b81526020016000600181111561269957fe5b8152602001600081525090565b6000813590506126b58161398b565b92915050565b6000815190506126ca8161398b565b92915050565b600082601f8301126126e157600080fd5b81516126f46126ef82613669565b61363c565b9150818183526020840193506020810190508385602084028201111561271957600080fd5b60005b83811015612749578161272f88826128bb565b84526020840193506020830192505060018101905061271c565b5050505092915050565b600081519050612762816139a2565b92915050565b600082601f83011261277957600080fd5b813561278c61278782613691565b61363c565b915080825260208301602083018583830111156127a857600080fd5b6127b3838284613904565b50505092915050565b6000813590506127cb816139b9565b92915050565b6000815190506127e0816139b9565b92915050565b6000608082840312156127f857600080fd5b612802608061363c565b90506000612812848285016127d1565b6000830152506020612826848285016126bb565b602083015250604061283a848285016126bb565b604083015250606061284e848285016128bb565b60608301525092915050565b60006040828403121561286c57600080fd5b612876604061363c565b90506000612886848285016126a6565b600083015250602061289a848285016128a6565b60208301525092915050565b6000813590506128b5816139c9565b92915050565b6000815190506128ca816139c9565b92915050565b6000602082840312156128e257600080fd5b60006128f0848285016126bb565b91505092915050565b60008060006080848603121561290e57600080fd5b600061291c868287016126a6565b935050602061292d8682870161285a565b925050606084013567ffffffffffffffff81111561294a57600080fd5b61295686828701612768565b9150509250925092565b600080600080600060a0868803121561297857600080fd5b6000612986888289016126a6565b9550506020612997888289016128a6565b94505060406129a8888289016126a6565b93505060606129b9888289016126a6565b92505060806129ca888289016127bc565b9150509295509295909350565b6000602082840312156129e957600080fd5b600082015167ffffffffffffffff811115612a0357600080fd5b612a0f848285016126d0565b91505092915050565b600060208284031215612a2a57600080fd5b6000612a3884828501612753565b91505092915050565b600060808284031215612a5357600080fd5b6000612a61848285016127e6565b91505092915050565b600060208284031215612a7c57600080fd5b6000612a8a848285016128bb565b91505092915050565b60008060408385031215612aa657600080fd5b6000612ab4858286016128bb565b9250506020612ac5858286016128bb565b9150509250929050565b6000612adb8383612b3a565b60208301905092915050565b6000612af383836130c4565b905092915050565b6000612b078383613221565b60408301905092915050565b6000612b1f8383613250565b60208301905092915050565b612b3481613862565b82525050565b612b43816137ce565b82525050565b612b52816137ce565b82525050565b6000612b63826136fd565b612b6d8185613768565b9350612b78836136bd565b8060005b83811015612ba9578151612b908882612acf565b9750612b9b83613734565b925050600181019050612b7c565b5085935050505092915050565b6000612bc182613708565b612bcb8185613779565b935083602082028501612bdd856136cd565b8060005b85811015612c195784840389528151612bfa8582612ae7565b9450612c0583613741565b925060208a01995050600181019050612be1565b50829750879550505050505092915050565b6000612c3682613713565b612c40818561378a565b9350612c4b836136dd565b8060005b83811015612c7c578151612c638882612afb565b9750612c6e8361374e565b925050600181019050612c4f565b5085935050505092915050565b6000612c948261371e565b612c9e818561379b565b9350612ca9836136ed565b8060005b83811015612cda578151612cc18882612b13565b9750612ccc8361375b565b925050600181019050612cad565b5085935050505092915050565b612cf0816137e0565b82525050565b6000612d0182613729565b612d0b81856137ac565b9350612d1b818560208601613913565b612d2481613946565b840191505092915050565b612d3881613874565b82525050565b612d4781613898565b82525050565b612d56816138aa565b82525050565b612d65816138bc565b82525050565b612d74816138ce565b82525050565b6000612d87601b836137bd565b91507f536166654d6174683a206164646974696f6e206f766572666c6f7700000000006000830152602082019050919050565b6000612dc76039836137bd565b91507f436f756c64206e6f7420617070726f7665212028556e6973776170546f6b656e60008301527f4b796265722042757920455448206f6e20556e697377617029000000000000006020830152604082019050919050565b6000612e2d6011836137bd565b91507f556e6b6e6f776e20646972656374696f6e0000000000000000000000000000006000830152602082019050919050565b6000612e6d6036836137bd565b91507f436f756c64206e6f7420617070726f7665212028556e6973776170546f4b796260008301527f65722042757920455448206f6e20556e697377617029000000000000000000006020830152604082019050919050565b6000612ed3603d836137bd565b91507f436f756c64206e6f7420617070726f76652120284b79626572546f6b656e556e60008301527f69737761702053656c6c20544f4b454e32206f6e20556e6973776170290000006020830152604082019050919050565b6000612f396024836137bd565b91507f4e6f206d61726b6574496420666f756e6420666f722070726f7669646564207460008301527f6f6b656e000000000000000000000000000000000000000000000000000000006020830152604082019050919050565b6000612f9f6034836137bd565b91507f436f756c64206e6f7420617070726f76652120284b79626572546f556e69737760008301527f61702042757920455448206f6e204b79626572290000000000000000000000006020830152604082019050919050565b6000613005603a836137bd565b91507f436f756c64206e6f7420617070726f7665212028556e6973776170546f6b656e60008301527f4b796265722053656c6c20546f6b656e206f6e204b79626572290000000000006020830152604082019050919050565b600061306b603a836137bd565b91507f436f756c64206e6f7420617070726f76652120284b79626572546f6b656e556e60008301527f69737761702042757920544f4b454e32206f6e204b79626572290000000000006020830152604082019050919050565b6000610160830160008301516130dd6000860182612d3e565b5060208301516130f06020860182613250565b50604083015161310360408601826131cc565b50606083015161311660c0860182613250565b50608083015161312960e0860182613250565b5060a083015161313d610100860182612b3a565b5060c0830151613151610120860182613250565b5060e083015184820361014086015261316a8282612cf6565b9150508091505092915050565b60808201600082015161318d6000850182612d6b565b5060208201516131a06020850182612b3a565b5060408201516131b36040850182612b3a565b5060608201516131c66060850182613250565b50505050565b6080820160008201516131e26000850182612ce7565b5060208201516131f56020850182612d4d565b5060408201516132086040850182612d5c565b50606082015161321b6060850182613250565b50505050565b6040820160008201516132376000850182612b3a565b50602082015161324a6020850182613250565b50505050565b61325981613858565b82525050565b61326881613858565b82525050565b60006020820190506132836000830184612b2b565b92915050565b600060408201905061329e6000830185612b49565b6132ab602083018461325f565b9392505050565b600060408201905081810360008301526132cc8185612c2b565b905081810360208301526132e08184612bb6565b90509392505050565b600060208201905081810360008301526133038184612c89565b905092915050565b60006060820190506133206000830186612d2f565b61332d6020830185612d2f565b61333a604083018461325f565b949350505050565b60006040820190506133576000830185612d2f565b613364602083018461325f565b9392505050565b60006080820190506133806000830187612d2f565b61338d602083018661325f565b61339a6040830185612d2f565b6133a7606083018461325f565b95945050505050565b60006060820190506133c56000830186612d2f565b6133d2602083018561325f565b6133df604083018461325f565b949350505050565b6000602082019050818103600083015261340081612d7a565b9050919050565b6000602082019050818103600083015261342081612dba565b9050919050565b6000602082019050818103600083015261344081612e20565b9050919050565b6000602082019050818103600083015261346081612e60565b9050919050565b6000602082019050818103600083015261348081612ec6565b9050919050565b600060208201905081810360008301526134a081612f2c565b9050919050565b600060208201905081810360008301526134c081612f92565b9050919050565b600060208201905081810360008301526134e081612ff8565b9050919050565b600060208201905081810360008301526135008161305e565b9050919050565b600060808201905061351c6000830184613177565b92915050565b6000602082019050613537600083018461325f565b92915050565b6000604082019050613552600083018561325f565b81810360208301526135648184612b58565b90509392505050565b6000608082019050613582600083018761325f565b81810360208301526135948186612b58565b90506135a36040830185612b2b565b6135b0606083018461325f565b95945050505050565b60006040820190506135ce600083018561325f565b6135db602083018461325f565b9392505050565b600060a0820190506135f7600083018861325f565b613604602083018761325f565b81810360408301526136168186612b58565b90506136256060830185612b2b565b613632608083018461325f565b9695505050505050565b6000604051905081810181811067ffffffffffffffff8211171561365f57600080fd5b8060405250919050565b600067ffffffffffffffff82111561368057600080fd5b602082029050602081019050919050565b600067ffffffffffffffff8211156136a857600080fd5b601f19601f8301169050602081019050919050565b6000819050602082019050919050565b6000819050602082019050919050565b6000819050602082019050919050565b6000819050602082019050919050565b600081519050919050565b600081519050919050565b600081519050919050565b600081519050919050565b600081519050919050565b6000602082019050919050565b6000602082019050919050565b6000602082019050919050565b6000602082019050919050565b600082825260208201905092915050565b600082825260208201905092915050565b600082825260208201905092915050565b600082825260208201905092915050565b600082825260208201905092915050565b600082825260208201905092915050565b60006137d982613838565b9050919050565b60008115159050919050565b60008190506137fa82613957565b919050565b600081905061380d82613964565b919050565b600081905061382082613971565b919050565b60008190506138338261397e565b919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b600061386d826138e0565b9050919050565b600061387f82613886565b9050919050565b600061389182613838565b9050919050565b60006138a3826137ec565b9050919050565b60006138b5826137ff565b9050919050565b60006138c782613812565b9050919050565b60006138d982613825565b9050919050565b60006138eb826138f2565b9050919050565b60006138fd82613838565b9050919050565b82818337600083830152505050565b60005b83811015613931578082015181840152602081019050613916565b83811115613940576000848401525b50505050565b6000601f19601f8301169050919050565b6009811061396157fe5b50565b6002811061396e57fe5b50565b6002811061397b57fe5b50565b6004811061398857fe5b50565b613994816137ce565b811461399f57600080fd5b50565b6139ab816137e0565b81146139b657600080fd5b50565b600481106139c657600080fd5b50565b6139d281613858565b81146139dd57600080fd5b5056fea365627a7a72315820731a6bddd54dfcdde8e4b1284387afe29e767b08a3c28bd3519f58226c350ca06c6578706572696d656e74616cf564736f6c63430005100040";
