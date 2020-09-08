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
    IERC20 public srctoken;
    IERC20 public desttoken;
    
    address beneficiary;
    address constant KYBER_ETH_ADDRESS = 0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE;
    address constant BAT_ADDRESS = 0x0D8775F648430679A709E98d2b0Cb6250d2887EF;
    address constant KNC_ADDRESS = 0xdd974D5C2e2928deA5F71b9825b8b646686BD200;
    address constant LEND_ADDRESS = 0x80fB784B7eD66730e8b1DBd9820aFD29931aab03;
    address constant LINK_ADDRESS = 0x514910771AF9Ca656af840dff83E8264EcF986CA;
    address constant MKR_ADDRESS = 0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2;
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
        
       
        if (arbInfo.tokenone == Tokenone.USDC) {
          srctoken = IERC20(USDC_ADDRESS);
          } if (arbInfo.tokenone == Tokenone.DAI) {
          srctoken = IERC20(DAI_ADDRESS); 
          } if (arbInfo.tokenone == Tokenone.WETH) {
          srctoken = IERC20(WETH_ADDRESS);
        }
         

        if (arbInfo.tokentwo == Tokentwo.BAT) {
          desttoken = IERC20(BAT_ADDRESS);
          } if (arbInfo.tokentwo == Tokentwo.KNC) {
          desttoken = IERC20(KNC_ADDRESS); 
          } if (arbInfo.tokentwo == Tokentwo.LEND) {
          desttoken = IERC20(LEND_ADDRESS);
          } if (arbInfo.tokentwo == Tokentwo.LINK) {
          desttoken = IERC20(LINK_ADDRESS); 
          } if (arbInfo.tokentwo == Tokentwo.MKR) {
          desttoken = IERC20(MKR_ADDRESS);
          } if (arbInfo.tokentwo == Tokentwo.SUSD) { 
            desttoken == IERC20(SUSD_ADDRESS);
            }  

        uint256 srcqty = srctoken.balanceOf(address(this));
        uint256 destqty = desttoken.balanceOf(address(this));


        if(arbInfo.direction == Direction.KyberToUniswap) {
          //Buy ETH on Kyber
          srctoken.approve(address(kyber), srcqty); 
          (uint expectedRate, ) = kyber.getExpectedRate(
            srctoken, 
            IERC20(KYBER_ETH_ADDRESS), 
            srcqty
          );
          
          kyber.swapTokenToEther(srctoken, (address(this).balance), expectedRate); //switched to swaptoken

          //Sell ETH on Uniswap
          address[] memory path = new address[](2);
          path[0] = address(weth);
          path[1] = address(srctoken);
          uint[] memory minOuts = uniswap.getAmountsOut(address(this).balance - 2, path); 
          uniswap.swapExactETHForTokens.value(address(this).balance - 2)(
            minOuts[1], 
            path, 
            address(this), 
            now
          );
        } if(arbInfo.direction == Direction.UniswapToKyber) {
          //Buy ETH on Uniswap
          srctoken.approve(address(uniswap), srcqty); 
          address[] memory path = new address[](2);
          path[0] = address(srctoken);
          path[1] = address(weth);
          uint[] memory minOuts = uniswap.getAmountsOut(srcqty, path); 
          uniswap.swapExactTokensForETH(
            srcqty, 
            minOuts[1], 
            path, 
            address(this), 
            now
          );

          //Sell ETH on Kyber
          (uint expectedRate, ) = kyber.getExpectedRate(
            IERC20(KYBER_ETH_ADDRESS), 
            srctoken, 
            address(this).balance
          );
          kyber.swapEtherToToken.value(address(this).balance)(
            srctoken, 
            expectedRate
          );
        } 
        
        if(arbInfo.direction == Direction.KyberTokenUniswap){
              //Buy TOKEN on Kyber
          srctoken.approve(address(kyber), srcqty); 
          (uint expectedRate, ) = kyber.getExpectedRate(
            srctoken, 
            desttoken, 
            srcqty
          );
          
          uint destAmount = kyber.swapTokenToToken(srctoken, srcqty, desttoken, expectedRate); //switched to swaptoken

          //Sell TOKEN on Uniswap
          desttoken.approve(address(uniswap), destAmount);  // srctoken approve needed for 2nd srctoken on srctoken to srctoken exchange
          address[] memory path = new address[](2);
          path[0] = address(desttoken);
          path[1] = address(srctoken);
          uint[] memory minOuts = uniswap.getAmountsOut(destAmount, path); 
          uniswap.swapExactTokensForTokens(
            destAmount,
            minOuts[1], 
            path, 
            address(this), 
            now
          );

        }  if(arbInfo.direction == Direction.UniswapTokenKyber) {

          srctoken.approve(address(uniswap), srcqty); 
          address[] memory path = new address[](2);
          path[0] = address(srctoken);
          path[1] = address(desttoken);
          uint[] memory minOuts = uniswap.getAmountsOut(srcqty, path); 
           uint[] memory Amounts = uniswap.swapExactTokensForTokens(
            srcqty, 
            minOuts[1], 
            path, 
            address(this), 
            now
          );

          //Sell Token on Kyber
          desttoken.approve(address(kyber), Amounts[0]);
          (uint expectedRate, ) = kyber.getExpectedRate(
            desttoken, 
            srctoken, 
            Amounts[0]
          );
          kyber.swapTokenToToken(
            desttoken, 
            Amounts[0],
            srctoken,
            expectedRate
          );




        } else { 
          revert(); // this needs better solution 
        }


        uint profit = address(srctoken).balance - arbInfo.repayAmount; 
        srctoken.transfer(beneficiary, profit);
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

        // Get marketId from srctoken address
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
