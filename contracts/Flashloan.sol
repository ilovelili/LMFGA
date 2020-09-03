////still gotta add gastoken to this
/// finish curve intergration


pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

import "@studydefi/money-legos/curvefi/contracts/ICurveFiCurve.sol";
import "@studydefi/money-legos/dydx/contracts/DydxFlashloanBase.sol";
import "@studydefi/money-legos/dydx/contracts/ICallee.sol";
import { KyberNetworkProxy as IKyberNetworkProxy } from '@studydefi/money-legos/kyber/contracts/KyberNetworkProxy.sol';

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import './IUniswapV2Router02.sol';
import './IWeth.sol';

contract Flashloan is ICallee, DydxFlashloanBase {
    enum Direction { KyberToUniswap, UniswapToKyber, KyberTokenUniswap, UniswapTokenKyber } 
    enum Tokentwo { BAT, KNC, LEND, LINK, MKR, SUSD }
    struct ArbInfo {
        Direction direction;
        Tokentwo tokentwo;
        uint repayAmount;
    }

    event NewArbitrage (
      Direction direction,
      uint profit,
      uint date
    );

    IKyberNetworkProxy kyber;
    IUniswapV2Router02 uniswap;
    IWeth weth;
    IERC20 token;
    address beneficiary;
    address constant KYBER_ETH_ADDRESS = 0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE;
    address constant BAT_ADDRESS = 0x0D8775F648430679A709E98d2b0Cb6250d2887EF;
    address constant KNC_ADDRESS = 0xdd974D5C2e2928deA5F71b9825b8b646686BD200;
    address constant LEND_ADDRESS = 0x80fB784B7eD66730e8b1DBd9820aFD29931aab03;
    address constant LINK_ADDRESS = 0x514910771AF9Ca656af840dff83E8264EcF986CA;
    address constant MKR_ADDRESS = 0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2;
    address constant SUSD_ADDRESS = 0x57Ab1ec28D129707052df4dF418D58a2D46d5f51;
    

    constructor(
        address kyberAddress,
        address uniswapAddress,
        address wethAddress,
        address tokenAddress,
        address beneficiaryAddress
    ) public {
      kyber = IKyberNetworkProxy(kyberAddress);
      uniswap = IUniswapV2Router02(uniswapAddress);
      weth = IWeth(wethAddress);
      token = IERC20(tokenAddress);  //usdc or dai or possibly weth   needs change to work
      beneficiary = beneficiaryAddress;
    }

   
    function callFunction(
        address sender,
        Account.Info memory account,
        bytes memory data
    ) public {
        ArbInfo memory arbInfo = abi.decode(data, (ArbInfo));
        uint256 balanceToken = token.balanceOf(address(this));
       
        require(
            balanceToken >= arbInfo.repayAmount,
            "Not enough funds to repay dydx loan!"
        );
        IERC20 token2;     // will it remember ?? on next run 

        if (arbInfo.tokentwo == Tokentwo.BAT) {
          token2 = IERC20(BAT_ADDRESS);
          } if (arbInfo.tokentwo == Tokentwo.KNC) {
          token2 = IERC20(KNC_ADDRESS); 
          } if (arbInfo.tokentwo == Tokentwo.LEND) {
          token2 = IERC20(LEND_ADDRESS);
          } if (arbInfo.tokentwo == Tokentwo.LINK) {
          token2 = IERC20(LINK_ADDRESS); 
          } if (arbInfo.tokentwo == Tokentwo.MKR) {
          token2 = IERC20(MKR_ADDRESS);
          } else token2 = IERC20(SUSD_ADDRESS);
          
        
        uint256 balanceToken2 = token2.balanceOf(address(this));


        if(arbInfo.direction == Direction.KyberToUniswap) {
          //Buy ETH on Kyber
          token.approve(address(kyber), balanceToken); 
          (uint expectedRate, ) = kyber.getExpectedRate(
            token, 
            IERC20(KYBER_ETH_ADDRESS), 
            balanceToken
          );
          
          kyber.swapTokenToEther(token, balanceToken, expectedRate); //switched to swaptoken

          //Sell ETH on Uniswap
          address[] memory path = new address[](2);
          path[0] = address(weth);
          path[1] = address(token);
          uint[] memory minOuts = uniswap.getAmountsOut(address(this).balance - 2, path); 
          uniswap.swapExactETHForTokens.value(address(this).balance - 2)(
            minOuts[1], 
            path, 
            address(this), 
            now
          );
        } if(arbInfo.direction == Direction.UniswapToKyber) {
          //Buy ETH on Uniswap
          token.approve(address(uniswap), balanceToken); 
          address[] memory path = new address[](2);
          path[0] = address(token);
          path[1] = address(weth);
          uint[] memory minOuts = uniswap.getAmountsOut(balanceToken, path); 
          uniswap.swapExactTokensForETH(
            balanceToken, 
            minOuts[1], 
            path, 
            address(this), 
            now
          );

          //Sell ETH on Kyber
          (uint expectedRate, ) = kyber.getExpectedRate(
            IERC20(KYBER_ETH_ADDRESS), 
            token, 
            address(this).balance
          );
          kyber.swapEtherToToken.value(address(this).balance)(
            token, 
            expectedRate
          );
        } 
        
        if(arbInfo.direction == Direction.KyberTokenUniswap){
              //Buy TOKEN on Kyber
          token.approve(address(kyber), balanceToken); 
          (uint expectedRate, ) = kyber.getExpectedRate(
            token, 
            token2, 
            balanceToken
          );
          
          kyber.swapTokenToToken(token, balanceToken, token2, expectedRate); //switched to swaptoken

          //Sell TOKEN on Uniswap
          token2.approve(address(uniswap), balanceToken2);  // token approve needed for 2nd token on token to token exchange
          address[] memory path = new address[](2);
          path[0] = address(token2);
          path[1] = address(token);
          uint[] memory minOuts = uniswap.getAmountsOut(balanceToken2, path); 
          uniswap.swapExactTokensForTokens(
            balanceToken2,
            minOuts[1], 
            path, 
            address(this), 
            now
          );

        }  if(arbInfo.direction == Direction.UniswapTokenKyber) {

          token.approve(address(uniswap), balanceToken); 
          address[] memory path = new address[](2);
          path[0] = address(token);
          path[1] = address(token2);
          uint[] memory minOuts = uniswap.getAmountsOut(balanceToken, path); 
          uniswap.swapExactTokensForTokens(
            balanceToken, 
            minOuts[1], 
            path, 
            address(this), 
            now
          );

          //Sell Token on Kyber
          token2.approve(address(kyber), balanceToken2);
          (uint expectedRate, ) = kyber.getExpectedRate(
            token2, 
            token, 
            balanceToken2
          );
          kyber.swapTokenToToken(
            token2, 
            balanceToken2,
            token,
            expectedRate
          );




        } else { 
          return; // this needs better solution 
        }


        uint profit = token.balanceOf(address(this)) - arbInfo.repayAmount; 
        token.transfer(beneficiary, profit);
        emit NewArbitrage(arbInfo.direction, profit, now);
    }

    function initiateFlashloan(
      address _solo, 
      address _token,         // injecting the proper address to flashloan (dai,usdc,weth)   no need for another enum
      uint256 _amount,
      Tokentwo _tokentwo,      //from enum for coins   BAT, KNC, LEND, LINK, MKR, SUSD
      Direction _direction)    // added new directions  KyberTokenUniswap and UniswapTokenKyber
        external
    {
        ISoloMargin solo = ISoloMargin(_solo);

        // Get marketId from token address
        uint256 marketId = _getMarketIdFromTokenAddress(_solo, _token);

        // Calculate repay amount (_amount + (2 wei))
        // Approve transfer from
        uint256 repayAmount = _getRepaymentAmountInternal(_amount);
        IERC20(_token).approve(_solo, repayAmount);

        // 1. Withdraw $
        // 2. Call callFunction(...)
        // 3. Deposit back $
        Actions.ActionArgs[] memory operations = new Actions.ActionArgs[](3);

        operations[0] = _getWithdrawAction(marketId, _amount);
        operations[1] = _getCallAction(
            // Encode MyCustomData for callFunction
            abi.encode(ArbInfo({direction: _direction, tokentwo: _tokentwo, repayAmount: repayAmount}))
        );
        operations[2] = _getDepositAction(marketId, repayAmount);

        Account.Info[] memory accountInfos = new Account.Info[](1);
        accountInfos[0] = _getAccountInfo();

        solo.operate(accountInfos, operations);
    }
  function() external payable {
  }
}
