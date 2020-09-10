// SPDX-License-Identifier: ISC
pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

import "@studydefi/money-legos/dydx/contracts/DydxFlashloanBase.sol";
import "@studydefi/money-legos/dydx/contracts/ICallee.sol";
import "@studydefi/money-legos/curvefi/contracts/ICurveFiCurve.sol";
import {KyberNetworkProxy as IKyberNetworkProxy} from "@studydefi/money-legos/kyber/contracts/KyberNetworkProxy.sol";

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./IUniswapV2Router02.sol";
import "./IWeth.sol";

contract Flashloan is ICallee, DydxFlashloanBase {
  enum Direction {KyberToUniswap, UniswapToKyber}

  struct ArbInfo {
    address from;
    address to;
    uint256 amount;
    uint256 repayAmount;
  }

  event NewArbitrage(uint256 indexed profit, uint256 indexed date);

  // events for debugging
  // event GetMinOuts(uint256 indexed minOut1, uint256 indexed minOut2);

  ICurveFiCurve curvefi;
  IKyberNetworkProxy kyber;
  IUniswapV2Router02 uniswap;
  IWeth weth;
  address beneficiary;
  address constant KYBER_ETH_ADDRESS = 0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE;

  constructor(
    address kyberAddress,
    address curvefiAddress,
    address uniswapAddress,
    address wethAddress,
    address beneficiaryAddress
  ) public {
    kyber = IKyberNetworkProxy(kyberAddress);
    curvefi = ICurveFiCurve(curvefiAddress);
    uniswap = IUniswapV2Router02(uniswapAddress);
    weth = IWeth(wethAddress);
    beneficiary = beneficiaryAddress;
  }

  // This is the function that will be called postLoan
  // i.e. Encode the logic to handle your flashloaned funds here
  function callFunction(
    address sender,
    Account.Info memory account,
    bytes memory data
  ) public {
    ArbInfo memory arbInfo = abi.decode(data, (ArbInfo));

    // fromToken to ETH
    IERC20 fromToken = IERC20(arbInfo.from);
    uint256 fromBalance = fromToken.balanceOf(address(this));
    uint256 deadline = now + 300;

    require(fromToken.approve(address(uniswap), fromBalance), "Could not approve reserve asset sell!");
    address[] memory path = new address[](2);
    path[0] = address(fromToken);
    path[1] = address(weth);
    uint256[] memory minOuts = uniswap.getAmountsOut(fromBalance, path);
    uniswap.swapExactTokensForETH(fromBalance, minOuts[1], path, address(this), deadline);

    // ETH to toToken
    // Sell ETH to Uniswap
    IERC20 toToken = IERC20(arbInfo.to);
    address[] memory path2 = new address[](2);
    path2[0] = address(weth);
    path2[1] = address(toToken);

    // https://uniswap.org/docs/v2/smart-contracts/library#getamountsout
    // Given an input asset amount and an array of token addresses, calculates all subsequent maximum output token amounts
    uint256[] memory minOuts2 = uniswap.getAmountsOut(address(this).balance, path2);

    // https://uniswap.org/docs/v2/smart-contracts/router02/
    // Swaps an exact amount of ETH for as many output tokens as possible, along the route determined by the path.
    // The first element of path must be WETH, the last is the output token
    uniswap.swapExactETHForTokens.value(address(this).balance)(minOuts2[1], path2, address(this), deadline);

    uint256 toBalance = toToken.balanceOf(address(this));
    require(toToken.approve(address(kyber), toBalance), "Could not approve reserve asset sell!");
    curvefi.exchange_underlying(1, 0, toBalance, 0); // 2: USDT, 1: USDC, 0: DAI

    uint256 finalFromTokenBalance = fromToken.balanceOf(address(this));
    require(finalFromTokenBalance > arbInfo.repayAmount, "Not enough funds to repay dydx loan!");

    uint256 profit = finalFromTokenBalance - arbInfo.repayAmount;
    require(fromToken.transfer(beneficiary, profit), "Could not transfer back the profit!");

    emit NewArbitrage(profit, now);
  }

  function initateFlashLoan(
    address _solo,
    address _tokenFrom,
    address _tokenTo,
    uint256 _amount,
    Direction _direction
  ) external {
    // Get marketId from token address
    uint256 marketId = _getMarketIdFromTokenAddress(_solo, _tokenFrom);

    // Calculate repay amount (_amount + (2 wei))
    // Approve transfer from
    uint256 repayAmount = _getRepaymentAmountInternal(_amount);
    IERC20(_tokenFrom).approve(_solo, repayAmount);

    // 1. Withdraw $
    // 2. Call callFunction(...)
    // 3. Deposit back $
    Actions.ActionArgs[] memory operations = new Actions.ActionArgs[](3);

    operations[0] = _getWithdrawAction(marketId, _amount);
    operations[1] = _getCallAction(
      // Encode MyCustomData for callFunction
      
      abi.encode(ArbInfo({from: _tokenFrom, to: _tokenTo, amount: _amount, repayAmount: repayAmount}))
    );
    operations[2] = _getDepositAction(marketId, repayAmount);

    Account.Info[] memory accountInfos = new Account.Info[](1);
    accountInfos[0] = _getAccountInfo();

    ISoloMargin(_solo).operate(accountInfos, operations);
  }

  // Add payable function to be able to receive ETH from Uniswap / Kyber
  function() external payable {}
}
