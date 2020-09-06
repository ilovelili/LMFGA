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
    enum Tokenone { USDC, DAI, WETH }
    enum Tokentwo { BAT, KNC, LEND, LINK, MKR, SUSD }
    
    struct ArbInfo {
        Direction direction;
        Tokenone tokenone;
        Tokentwo tokentwo;
        uint repayAmount;
    }

    event NewArbitrage (
      Direction direction,
      Tokenone tokenone,
      Tokentwo tokentwo,
      uint profit,
      uint date
    );

    IKyberNetworkProxy kyber;
    IUniswapV2Router02 uniswap;
    IWeth weth;  // doesn't play nice yet   i think this is used 
    IERC20 public token;
    IERC20 public token2;
    address beneficiary;
    address constant KYBER_ETH_ADDRESS = 0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE;
    address constant BAT_ADDRESS = 0x0D8775F648430679A709E98d2b0Cb6250d2887EF;
    address constant KNC_ADDRESS = 0xdd974d5c2e2928dea5f71b9825b8b646686bd200;
    address constant LEND_ADDRESS = 0x80fB784B7eD66730e8b1DBd9820aFD29931aab03;
    address constant LINK_ADDRESS = 0x514910771AF9Ca656af840dff83E8264EcF986CA;
    address constant MKR_ADDRESS = 0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2;
    address constant SUSD_ADDRESS = 0x57Ab1ec28D129707052df4dF418D58a2D46d5f51;
    address constant DAI_ADDRESS = 0x6B175474E89094C44Da98b954EedeAC495271d0F;
    address constant USDC_ADDRESS = 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48;
    address constant WETH_ADDRESS = 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2;
    constructor(
        address kyberAddress,
        address uniswapAddress,
        address beneficiaryAddress
    ) public {
      kyber = IKyberNetworkProxy(kyberAddress);
      uniswap = IUniswapV2Router02(uniswapAddress);
      weth = IWeth(WETH_ADDRESS);
      beneficiary = beneficiaryAddress;
    }

   
    function callFunction(
        address sender,
        Account.Info memory account,
        bytes memory data
    ) public {
        ArbInfo memory arbInfo = abi.decode(data, (ArbInfo));
        uint256 balanceToken = token.balanceOf(address(this));
       
        if (arbInfo.tokenone == Tokenone.USDC) {
          token = IERC20(USDC_ADDRESS);
          } if (arbInfo.tokenone == Tokenone.DAI) {
          token = IERC20(DAI_ADDRESS); 
          } if (arbInfo.tokenone == Tokenone.WETH) {
          token = IERC20(WETH_ADDRESS);
        }
         

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
          } else { token2 = IERC20(SUSD_ADDRESS);
          }  
        
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
          revert(); // this needs better solution 
        }


        uint profit = token.balanceOf(address(this)) - arbInfo.repayAmount; 
        token.transfer(beneficiary, profit);
        emit NewArbitrage(arbInfo.direction, arbInfo.tokenone, arbInfo.tokentwo, profit, now);
    }

    function initiateFlashloan(
      address _solo, 
      address _token,         // this must match tokenone   enum for flashloan coins from dydx USDC, DAI, WETH
      uint256 _amount, 
      Tokenone _tokenone,
      Tokentwo _tokentwo,      //from enum for coins   BAT, KNC, LEND, LINK, MKR, SUSD   <<== SHOULD WE DO MORE ?
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
            abi.encode(ArbInfo({direction: _direction, tokenone: _tokenone, tokentwo: _tokentwo, repayAmount: repayAmount}))
        );
        operations[2] = _getDepositAction(marketId, repayAmount);

        Account.Info[] memory accountInfos = new Account.Info[](1);
        accountInfos[0] = _getAccountInfo();

        solo.operate(accountInfos, operations);
    }
  function() external payable {
  }
}
