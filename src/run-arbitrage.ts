import fs from "fs";
import chalk from "chalk";

import {ethers} from "ethers";

import {FlashloanFactory} from "../types/ethers-contracts/FlashloanFactory";
import FlashloanContract from "../build/contracts/Flashloan.json";

import {Flashloan} from "../types/ethers-contracts/Flashloan";
import {MongoClient} from "mongodb";
import {Util} from "./util";
import {Price} from "./price";
import config from "../config.json";
import {ChainId, Token, Route, Fetcher, WETH, Trade, TokenAmount, TradeType} from "@uniswap/sdk";

// read infura uri and private key from .env
const infuraUri = Util.Env.infuraUri;
if (!infuraUri) {
  console.log(chalk.red("Must assign INFURA_URI"));
  process.exit();
}

const privKey = Util.Env.privKey;
if (!privKey) {
  console.log(chalk.red("Must assign PRIVATE_KEY"));
  process.exit();
}

// init provider and wallet
// https://docs.ethers.io/v5/api/providers/other/#WebSocketProvider
const provider = new ethers.providers.WebSocketProvider(infuraUri);
const wallet = new ethers.Wallet(privKey, provider);

const amount_eth = Util.Config.amount_eth;
const network = Util.Config.network;
const txcost_gas_limit = Util.Config.txcost_gas_limit;
const txcost_gas_price_buff_in_wei = Util.Config.txcost_gas_price_buff_in_wei;
const kyber_service_fee = Util.Config.kyber_service_fee;
const uniswap_service_fee = Util.Config.uniswap_service_fee;
const profit_threshold = Util.Config.profit_threshold;

interface StableToken {
  symbol: string;
  address: string;
  decimals: number;
}

const stableTokens: StableToken[] = [
  {
    "symbol": "DAI",
    "address": Util.Address.daiAddress,
    "decimals": Util.Decimals.daiDecimals,
  },
  // {
  //   "symbol": "USDT",
  //   "address": Util.Address.usdtAddress,
  //   "decimals": Util.Decimals.usdtDecimals,
  // },
  {
    "symbol": "USDC",
    "address": Util.Address.usdcAddress,
    "decimals": Util.Decimals.usdcDecimals,
  }
]
const daiAddress = Util.Address.daiAddress;
const soloMarginAddress = Util.Address.soloMarginAddress;

// define how many blocks to wait after an arb is identified and a trade is made
const wait_blocks = Util.Config.wait_blocks;
let wait_blocks_arr: Array<number> = [];

let progressing = false;
const main = async () => {
  const networkId = network.network_id;
  console.log(`Network ID is ${networkId}`);

  // https://docs.ethers.io/v5/api/providers/provider/
  // provider.on("block", async (block) => {
  //   console.log(`New block received. Block number: ${block}`);

    const ethPrice = await Price.getEtherPrice(provider);
    console.log(chalk.magenta(`eth price is ${ethPrice}`));

    const amount_usd = amount_eth * ethPrice;

    const swapRates: {[key: string]: Price} = {};

    const amount_eth_wei = ethers.utils.parseEther(amount_eth.toString());
    
    for (let stableToken of stableTokens) {
      console.log(chalk.blue(`=====   ETH/${stableToken.symbol}   =====`));

      const amount_stabletoken_wei = ethers.utils.parseUnits(amount_usd.toString(), stableToken.decimals)

      const token = new Token(ChainId.MAINNET, stableToken.address, stableToken.decimals);
      const uniswapRates = await Price.FetchUniswapRates(token, amount_eth_wei.toString(), amount_stabletoken_wei.toString());
      swapRates[stableToken.symbol] = uniswapRates
      console.log(chalk.blue(`Uniswap ETH/${stableToken.symbol}`));
      console.log(uniswapRates);

      // const kyberRates = await Price.FetchKyberRates1(stableToken.address, Util.Address.daiAddress, amount_usd);
      // console.log(chalk.green(`Kyber ${stableToken.symbol}/DAI - Platform fee 0`));
      // console.log(kyberRates)
    }

    let possibleSwap: {from: string, to: string, unitGross: number, buy: number, sell: number}[] = []

    let swapExists = false;
    for (let key0 in swapRates) {
      for (let key1 in swapRates) {
        if (key0 === key1) {
          continue;
        }
        if (swapRates[key0].buy < swapRates[key1].sell) {
          possibleSwap.push({
            from: key0,
            to: key1,
            buy: swapRates[key0].buy,
            sell: swapRates[key1].sell,
            unitGross: swapRates[key1].sell - swapRates[key0].buy
          })
          swapExists = true;
        }
      }
    }

    if (swapExists) {
      possibleSwap = possibleSwap.sort((a, b) => {return b.unitGross - a.unitGross})
      for (let swap of possibleSwap) {
        console.log(`${swap.from} --> ${swap.to} for unit gross ${swap.unitGross}`)

        progressing = true
          // fetch kyber buy / sell rates
        const fromToken = getStableTokenBySymbol(swap.from);
        const toToken = getStableTokenBySymbol(swap.to);
        
        const fromTokenAmount = amount_usd / swap.buy * (1- uniswap_service_fee);

        console.log(`===== Buy ${fromTokenAmount} ETH`)
        const toTokenAmount = fromTokenAmount * swap.sell * (1- uniswap_service_fee);

        console.log(`===== Sell ${toTokenAmount} ${toToken.symbol}`)

        const kyberRates = await Price.FetchKyberRates1(toToken.address, fromToken.address, toTokenAmount);
        console.log(chalk.green(`Kyber ${swap.to}/${swap.from} - Platform fee 0`));
        console.log(kyberRates);

        const finalAmount = toTokenAmount * kyberRates.buy * (1 - kyber_service_fee);

        console.log(`${amount_usd} ${swap.from} -> ${fromTokenAmount} ETH -> ${toTokenAmount} ${swap.to} -> ${finalAmount} ${swap.from}`)

        const gross = finalAmount - amount_usd;
        
        const flashloan = FlashloanFactory.connect(FlashloanContract.networks[networkId].address, wallet);
        const avgGasPrice = await provider.getGasPrice();

        let [gasPrice, gasLimit] = await Promise.all([
          // avg gas price + 10Gwei set in config.json
          avgGasPrice.add(txcost_gas_price_buff_in_wei),
          // set gaslimit to 1200000 based on this tx
          // https://bloxy.info/tx/0xaa45cb18083e42eb77fd011e8ef6e93750fca6ebdddb803859db2c99c10818dc
          txcost_gas_limit,
        ]);

        // gasPrice = ethers.BigNumber.from("150000000000");
        console.log(`gas price is ${ethers.utils.formatUnits(gasPrice, "gwei")} GWei`);

        const txCost = gasPrice.mul(gasLimit);
        console.log(`txCost is ${ethers.utils.formatEther(txCost)} ETH (${parseFloat(ethers.utils.formatEther(txCost)) * ethPrice} USD)`);

        // const gross = amount_eth * swap.unitGross;
        console.log(`gross is ${gross} USD`);

        // const kyberServiceFee = toTokenAmount * kyber_service_fee;
        // const uniswapServiceFee = amount_usd * uniswap_service_fee;
        // console.log(`kyber service fee is ${kyberServiceFee} USD`);
        // console.log(`uniswap service fee is ${uniswapServiceFee} USD`);

        const cost = parseFloat(ethers.utils.formatEther(txCost)) * ethPrice;
        console.log(`cost is ${cost} USD`);

        const profit = gross - cost;
        console.log(`profit is ${profit} USD`);

        if (profit > profit_threshold) {
          // if (!wait_blocks_arr.length) {
          //   // wait 10 blocks (start from next block)
          //   wait_blocks_arr = Array.from(Array(wait_blocks), (_, i) => i + block + 1);
          // }

          const balance = await provider.getBalance(wallet.address);
          console.log(`wallet balance is ${ethers.utils.formatEther(balance)} ETH`);

          // check wallet balance. Skip if not enough balance
          // const insufficientBalance = balance.lte(txCost); // balance less than txCost
          // if (insufficientBalance) {
          //   console.log(`Insufficient balance. Skip`);
          //   return;
          // }

          console.log(chalk.green("Arbitrage opportunity found!"));
          console.log(chalk.green(`Direction: ${swap.from} --> ETH --> ${swap.to}`));
          console.log(`Expected profit: ${profit} ${swap.from}`);

          // const record = `Time: ${new Date().toISOString()}, Block: ${block}, Direction: ${swap.from} --> ETH --> ${swap.to}, profit: ${profit}\n`;

          // save arbs to local file
          // fs.appendFile("arbs.log", record, (err) => {
          //   if (err) console.log(err);
          // });

          const options = {
            gasPrice: gasPrice,
            gasLimit: gasLimit,
          };

          try {
            const tx = await flashloan.initateFlashLoan(soloMarginAddress, fromToken.address, toToken.address, ethers.utils.parseUnits(amount_usd.toString(), fromToken.decimals), Direction.KYBER_TO_UNISWAP, options);
            const recipt = await tx.wait();
            const txHash = recipt.transactionHash;
            console.log(`Transaction hash: ${txHash}`);

            // saveTransactionHash(txHash);
            // saveFlashloanEventLog(flashloan, block);
          } catch (e) {
            console.log(`tx error!`);
            console.log(e);
          }
        } else {
          console.log("No profit")
        }

        progressing = false
        break;
      }
    } else {
      console.log("Cannot trade");
    }
};

const getStableTokenBySymbol = (symbol: string): StableToken => {
  return stableTokens.find(item => item.symbol === symbol)!
}

export enum Direction {
  KYBER_TO_UNISWAP = 0,
  UNISWAP_TO_KYBER = 1,
}

const saveBlockInfo = async (block: number, kyberPrice1: Price, kyberPrice2: Price, kyberPrice3: Price, uniwapPrice: Price) => {
  const blockInfo = {
    block,
    kyberBuyFee0: kyberPrice1.buy,
    kyberSellFee0: kyberPrice1.sell,
    kyberBuyFee8: kyberPrice2.buy,
    kyberSellFee8: kyberPrice2.sell,
    kyberBuyExpectedRate: kyberPrice3.buy,
    kyberSellExpectedRate: kyberPrice3.sell,
    uniswapBuy: uniwapPrice.buy,
    uniswapSell: uniwapPrice.sell,
  };

  if (config.save_to_mongodb) {
    saveToMongoDB(blockInfo, "blockInfo");
  } else {
    // else save to local file
    fs.appendFile("blockInfo.log", JSON.stringify(blockInfo) + "\n", (err) => {
      if (err) console.log(err);
    });
  }
};

const saveTransactionHash = async (txHash: string) => {
  if (config.save_to_mongodb) {
    saveToMongoDB({tx: txHash}, "txHash");
  }

  // else save to local file
  fs.appendFile("transactionHash.log", txHash + "\n", (err) => {
    if (err) console.log(err);
  });
};

// save event log to mongodb or local file
const saveFlashloanEventLog = async (flashloan: Flashloan, block: number) => {
  const newArbitrageEvent = flashloan.interface.getEvent("NewArbitrage");
  const logs = await flashloan.provider.getLogs({
    fromBlock: block,
    toBlock: "latest",
    address: flashloan.address,
    topics: [flashloan.interface.getEventTopic(newArbitrageEvent)],
  });

  logs.forEach((log) => {
    const logData = flashloan.interface.parseLog(log);
    const record = logData.args.toString();
    if (config.save_to_mongodb) {
      saveToMongoDB({log: record}, "profits");
    }

    // else save to local file
    fs.appendFile("transaction.log", record, (err) => {
      if (err) console.log(err);
    });
  });
};

// save data to mongodb atlas
const saveToMongoDB = async (record: Object, collection: string) => {
  // console.log("Connected to Database");
  const db = (await mongoClient.getInstance()).db("flashloan");
  const profits = db.collection(collection);
  await profits.insertOne(record).catch((err: Error) => console.error(err));
  // console.log(result);
};

const mongoClient = (() => {
  let instance: MongoClient;
  const createInstance = async () => {
    console.log("Connecting to Database");
    const connectString = `mongodb+srv://flashloan:${Util.Env.mongodb_pwd}@cluster0-eosoe.mongodb.net/flashloan?retryWrites=true&w=majority`;
    return await MongoClient.connect(connectString, {
      useUnifiedTopology: true,
    });
  };

  return {
    getInstance: async () => {
      if (!instance) {
        instance = await createInstance();
      }
      return instance;
    },
  };
})();

const mainTimer = () => {
  setInterval(() => {
    if (progressing == false) {
      main()
    }
  }, 20000)
}
// main logic
mainTimer();
