const dotenv = require("dotenv");
dotenv.config();
const chalk = require('chalk');
const Web3 = require('web3');
//const Ethers = require('ethers');
//const { ChainId, Token, WETH, TokenAmount, Pair, Trade } = require('@uniswap/sdk');
const {ChainId, Token, WETH, TokenAmount, Fetcher, Route, Trade, TradeType } = require('@uniswap/sdk');



const abis = require('./abis');
const { mainnet: addresses } = require('./addresses');
const Flashloan = require('./build/contracts/Flashloan.json');
var waitSomeBlocks= 0;
var doneWaiting = true;
const DAI = new Token(ChainId.MAINNET, '0x6B175474E89094C44Da98b954EedeAC495271d0F', 18)
const web3 = new Web3(
  new Web3.providers.WebsocketProvider(process.env.INFURA_URL)
);
const { address: admin } = web3.eth.accounts.wallet.add(process.env.PRIVATE_KEY);

const kyber = new web3.eth.Contract(
  abis.kyber.kyberNetworkProxy,
  addresses.kyber.kyberNetworkProxy
);




const AMOUNT_ETH = 10;
console.log(`AMOUNT OF ETH: +${AMOUNT_ETH}`);
const RECENT_ETH_PRICE = 400;
const AMOUNT_ETH_WEI = web3.utils.toWei(AMOUNT_ETH.toString());
const AMOUNT_DAI_WEI = web3.utils.toWei((AMOUNT_ETH * RECENT_ETH_PRICE).toString());
const DIRECTION = {
  KYBER_TO_UNISWAP: 0,
  UNISWAP_TO_KYBER: 1
};

const init = async () => {
  const networkId = await web3.eth.net.getId();
  const flashloan = new web3.eth.Contract(
    Flashloan.abi,
    Flashloan.networks[networkId].address
  );

  

  web3.eth.subscribe('newBlockHeaders')
    .on('data', async block => {
      console.log(`New block received. Block # ${block.number}`);
      

      const kyberResults = await Promise.all([
          kyber
            .methods
            .getExpectedRate(
              addresses.tokens.dai, 
              '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', 
              AMOUNT_DAI_WEI
            ) 
            .call(),
          kyber
            .methods
            .getExpectedRate(
              '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', 
              addresses.tokens.dai, 
              AMOUNT_ETH_WEI
            ) 
            .call()
      ]);
      const kyberRates = {
        buy: parseFloat(1 / (kyberResults[0].expectedRate / (10 ** 18))),
        sell: parseFloat(kyberResults[1].expectedRate / (10 ** 18))
      };
      console.log('Kyber ETH/DAI');
      console.log(kyberRates);

      //const [dai, weth] = await Promise.all(
      //  [addresses.tokens.dai, addresses.tokens.weth].map(tokenAddress => (
      //    Token.fetchData(
      //      ChainId.MAINNET,
      //      tokenAddress,
      //    )
      //)));
      const daiweth = await Fetcher.fetchPairData(DAI,WETH[DAI.chainId]);
      const sellRoute = new Route([daiweth], WETH[DAI.chainId]);
      const buyRoute = new Route([daiweth],DAI);
     
      const uniswapResults = await Promise.all([
        new Trade(buyRoute, new TokenAmount(DAI, AMOUNT_DAI_WEI), TradeType.EXACT_INPUT),
        new Trade(sellRoute, new TokenAmount(WETH[DAI.chainId], AMOUNT_ETH_WEI), TradeType.EXACT_INPUT)
      ]);
      //const uniswapRates = {
      //  buy: parseFloat( AMOUNT_DAI_WEI / (uniswapResults[0][0].toExact() * 10 ** 18)),
      //  sell: parseFloat(uniswapResults[1][0].toExact() / AMOUNT_ETH),
      //};
      //console.log('Uniswap Execution Price');
      //console.log(trade.executionPrice.toSignificant(6));
      console.log('Uniswap ETH/DAI');
      console.log(uniswapRates);
      //console.log('Before Gas Calc');
      
      const [tx1, tx2] = Object.keys(DIRECTION).map(direction => flashloan.methods.initiateFlashloan(
        addresses.dydx.solo, 
        addresses.tokens.dai, 
        AMOUNT_DAI_WEI,
        DIRECTION[direction]
      ));
      //const tempGas = await web3.eth.getBlock("latest");
      //const gasPrice = tempGas.gasLimit;
      const tempGas = await web3.eth.getGasPrice();//.then(console.log);
      const tempIntGas = (parseInt(tempGas) + 10000000000);
      gasPrice = tempIntGas.toString();
      
      const gasCost1=1000000;//await web3.eth.estimateGas({from: admin});
      const gasCost2=1000000;//await web3.eth.estimateGas({from: admin});
      //console.log(`WEB3 Gas Limit + 10 GWEI ${gasPrice}`);
      //console.log(`WEB3 Gas Price ${crapGasPrice}`);
      //const [gasPrice, gasCost1, gasCost2] = await Promise.all([
      //  web3.eth.getGasPrice(),
      //  tx1.estimateGas({from: admin}),
      //  tx2.estimateGas({from: admin})
      //]);
      
      const txCost1 = parseInt(gasCost1) * parseInt(gasPrice);
      const txCost2 = parseInt(gasCost2) * parseInt(gasPrice);
      const currentEthPrice = (uniswapRates.buy + uniswapRates.sell) / 2; 
      const profit1 = (parseInt(AMOUNT_ETH_WEI) / 10 ** 18) * (uniswapRates.sell - kyberRates.buy) - (txCost1 / 10 ** 18) * currentEthPrice;
      const profit2 = (parseInt(AMOUNT_ETH_WEI) / 10 ** 18) * (kyberRates.sell - uniswapRates.buy) - (txCost2 / 10 ** 18) * currentEthPrice;
      //console.log(`AMOUNT_ETH BOUGHT +${AMOUNT_ETH_WEI/10**18}`);
      //console.log(`uniswapRates.sell +${uniswapRates.sell}`);
      //console.log(`txCost1 in dai ${txCost1}`);
      console.log(`Profit1 in dai ${profit1}`);
      console.log(`Profit2 in dai ${profit2}`);
      

      if(profit1 > 2 && doneWaiting == true) {
        console.log(chalk.green('Arb opportunity found!'));
        console.log(`Buy ETH on Kyber at ${kyberRates.buy} dai`);
        console.log(`Sell ETH on Uniswap at ${uniswapRates.sell} dai`);
        console.log(`Expected profit: ${profit1} dai`);
        const data = tx1.encodeABI();
        
        const txData = {
          from: admin,
          to: flashloan.options.address,
          data,
          gas: gasCost1,
          gasPrice
        };
        if(waitSomeBlocks== 0) {
          // const receipt = await web3.eth.sendTransaction(txData);
          // console.log(`Transaction hash: ${receipt.transactionHash}`);
          waitSomeBlocks=10;
          doneWaiting = false;
        } 
      }
      else if(waitSomeBlocks <= 0) {
          waitSomeBlocks= 0;
          doneWaiting = true;
        }
      
        
        
      else if(profit2 > 2 && doneWaiting == true) {
        console.log(chalk.green('Arb opportunity found!'));
        console.log(`Buy ETH from Uniswap at ${uniswapRates.buy} dai`);
        console.log(`Sell ETH from Kyber at ${kyberRates.sell} dai`);
        console.log(`Expected profit: ${profit2} dai`);
        const data = tx2.encodeABI();
        const txData = {
          from: admin,
          to: flashloan.options.address,
          data,
          gas: gasCost2,
          gasPrice
        };
        if(waitSomeBlocks== 0) {
          // const receipt = await web3.eth.sendTransaction(txData);
          // console.log(`Transaction hash: ${receipt.transactionHash}`);
          waitSomeBlocks=10;
          doneWaiting = false;
        }
      }
      else {
        console.log(`In a trade waiting ${waitSomeBlocks} Blocks`);
        waitSomeBlocks=waitSomeBlocks-1;  
        //doneWaiting = false;
    }
    })
    .on('error', error => {
      console.log(error);
    });
}
init();