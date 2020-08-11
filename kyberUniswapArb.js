const http = require('http');


const fetch = require('node-fetch');


const chalk = require('chalk');

const dotenv = require("dotenv");
dotenv.config();

const { ChainId, Token, WETH, TokenAmount, Fetcher, Route, Trade, TradeType } = require('@uniswap/sdk');

const Web3 = require('web3');

const DAI = new Token(ChainId.MAINNET, '0x6B175474E89094C44Da98b954EedeAC495271d0F', 18)

var amount = require('@extra-array/linspace');

const ndiv = 2;
const minETH = 1;
const maxETH = 100;
const minDAI = 1;
const maxDAI = 50000;

const web3 = new Web3(
    new Web3.providers.WebsocketProvider(process.env.INFURA_URL)
);

//const ethers = new Ethers.providers.JsonRpcProvider()

setInterval(function () {
    async function start() {
        const daiweth = await Fetcher.fetchPairData(DAI, WETH[DAI.chainId])




        var sellAmount = amount(minETH, maxETH, ndiv);
        var sellAmountWei = new Array();
        sellAmount.forEach(element => {
            sellAmountWei.push(web3.utils.toWei(element.toString()));
        });

        var buyAmount = amount(minDAI, maxDAI, ndiv);
        var buyAmountWei = new Array();
        buyAmount.forEach(element => {
            buyAmountWei.push(web3.utils.toWei(element.toString()));
        });
 
        console.log(chalk.magenta('Them Amounts:', sellAmount));
        console.log("/n");

        const sellRoute = new Route([daiweth], WETH[DAI.chainId])

        const buyRoute = new Route([daiweth], DAI)

        sellAmountWei.forEach(amount => {
            const sellTrade = new Trade(sellRoute, new TokenAmount(WETH[DAI.chainId], amount), TradeType.EXACT_INPUT);
            console.log(chalk.blue('Sell ' + web3.utils.fromWei(amount.toString()) + ' ETH for DAI'))
            console.log(chalk.bold.bgBlue('Uniswap Sell:', sellTrade.executionPrice.toSignificant(6)))

            // console.log('Mid Price', sellTrade.nextMidPrice.toSignificant(6))    

        })
  
        buyAmountWei.forEach(amount => {
            const buyTrade = new Trade(buyRoute, new TokenAmount(DAI, amount), TradeType.EXACT_INPUT);
            console.log(chalk.red('Buy ' + web3.utils.fromWei(amount.toString()) + ' DAI'))
            console.log(chalk.bold.bgRed('Uniswap Buy:', buyTrade.executionPrice.invert().toSignificant(6)))
 
        })


        async function getKyberPrice(baseToken, quoteToken, amount, buySell, platformFee) {
            buySell = buySell.toLowerCase();
            let kyberPriceRequest = await fetch('https://api.kyber.network/quote_amount?' + 'base=' + baseToken + '&' + 'quote=' + quoteToken + '&' + 'base_amount=' + amount + '&' + 'type=' + buySell + '&' + 'platformFee=' + platformFee);
            let price = await kyberPriceRequest.json();
            return price.data;
        }
        let kyberBuy = await getKyberPrice("0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", "0x6b175474e89094c44da98b954eedeac495271d0f", 10, "buy", 8)
        let kyberSell = await getKyberPrice("0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", "0x6b175474e89094c44da98b954eedeac495271d0f", 10, "sell", 8)
        console.log(chalk.red('Kyber: buy dai with 1 eth'))
        console.log(chalk.bold.bgRed(kyberBuy))
        console.log(chalk.green('Kyber: 1 eth to dai'))
        console.log(chalk.bold.bgGreen(kyberSell))

    }

    start();

}, 15 * 1000); //15*1000 millisec