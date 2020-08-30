const sor = require('@balancer-labs/sor');
const BigNumber = require('bignumber.js');
const ethers = require('ethers');
const Web3 = require('web3');
const { concat } = require('ethers/lib/utils');


const MAX_UINT = ethers.constants.MaxUint256;

const providerUrl = 'https://mainnet.infura.io/v3/                        ' // can use infura, etc.
const provider = new ethers.providers.JsonRpcProvider(providerUrl);

const amount_eth = "100";  //  <--  we have these already 
const ethPrice = "395";  // <--
const amount_eth_wei = ethers.utils.parseEther(amount_eth.toString()).toString();
const amount_dai_wei = ethers.utils.parseEther((amount_eth * ethPrice).toString()).toString();

// MAINNET
const multi = '0xeefBa1e63905eF1D7ACbA5a8513c70307C1cE441'
const tokenIn = '0x6B175474E89094C44Da98b954EedeAC495271d0F' // dai
const tokenOut = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2' // weth


async function pricebuysell () {
    const data = await sor.getPoolsWithTokens(tokenIn, tokenOut);

    const poolData = await sor.parsePoolDataOnChain(data.pools, tokenIn, tokenOut, multi, provider);

            const sorSwaps = sor.smartOrderRouter(
            poolData,                               // addresses of token
            'swapExactIn',                          // can be swapExactAmountOut as well 
            new BigNumber(amount_dai_wei),  // amount of token Input
            new BigNumber('5'),                    // max balancers  ** this will be Important For prices**
            0                         
        );

    const swaps = sor.formatSwapsExactAmountIn(sorSwaps, MAX_UINT, 0)   //sorts the swaps 

    
    const totalOutput = new BigNumber(sor.calcTotalOutput(swaps, poolData))
    
    
        // sell rates
    const data1 = await sor.getPoolsWithTokens(tokenOut, tokenIn);

    const poolData1 = await sor.parsePoolDataOnChain(data1.pools, tokenOut, tokenIn, multi, provider);
        
    const sorSwaps1 = sor.smartOrderRouter(
        poolData1,
        'swapExactIn',                //this should be swapExactOut to be more percise of real outputs 
        new BigNumber(amount_eth_wei),
        new BigNumber('5'),
        0
    );

    const swaps1 = sor.formatSwapsExactAmountIn(sorSwaps1, MAX_UINT, 0)

    const totalOutput1 = new BigNumber(sor.calcTotalOutput(swaps1, poolData1))
    
    var slip = new Array();                            //this is going back thru the sorted swaps 
    for (var x=0; x < poolData.length; x++) {         //and checking against the pooldata's info which has the    
        for ( var y = 0;y < swaps.length; y++) {      // slippage amount for each pool and stores them in slip variable 
            if (poolData[x].id == swaps[y].pool ) {  // and then further down i do the rest of avg calc for this
                slip += poolData[x].slippage.c[0];    // there is probably a way better way of doing this 
            }

        }
    }
    
    var slippage = slip / slip.length;  
     //  console.log("slippage:" + (slippage / 1000000000000));   // need to figure out a better solution for decimal placement
    
    var slip1 = new Array();                            //this is going back thru the sorted swaps 
    for (var x=0; x < poolData1.length; x++) {         //and checking against the pooldata's info which has the    
        for ( var y = 0;y < swaps1.length; y++) {      // slippage amount for each pool and stores them in slip variable 
            if (poolData1[x].id == swaps1[y].pool ) {  // and then further down i do the rest of avg calc for this
                slip1 += poolData1[x].slippage.c[0];    // there is probably a way better way of doing this 
            }

        }
    }
    
    var slippage1 = slip1 / slip1.length;  
    const price1 = (totalOutput1.c[0].toString()); 
    const price = (totalOutput.c[0].toString());    
    
    const balancerRates = {
      buy: (parseFloat(amount_dai_wei / (price * 10 ** 18)* 10000)),     // decimal placements are different from uniswap
       sell: parseFloat( price1 / 1000000),  
       BuySlippage: slippage,
       SellSlippage: slippage1                         
    };

    console.log(balancerRates);
   pricebuysell();


}
pricebuysell();
