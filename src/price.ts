import isNode from "detect-node";
import nodeFetch from "node-fetch";
import {Util} from "./util";
import {ChainId, Token, Route, Fetcher, WETH, Trade, TokenAmount, TradeType} from "@uniswap/sdk";
import {ethers} from "ethers";
import {KyberNetworkProxyFactory} from "../types/ethers-contracts/KyberNetworkProxyFactory";
import addresses from "../addresses";

const daiAddress = Util.Address.daiAddress;
const ethAddress = Util.Address.ethAddress;

export class Price {
  constructor(public buy: number, public sell: number) {}

  // fetch uniswap buy / sell rate
  static FetchUniswapRates = async (token: Token, amount_eth_wei: string, amount_stabletoken_wei: string): Promise<Price> => {
    const daiWeth = await Fetcher.fetchPairData(token, WETH[token.chainId]);

    // weth to dai
    const wethToStableRoute = new Route([daiWeth], WETH[token.chainId]);
    // dai to weth
    const stableToWethRoute = new Route([daiWeth], token);
    const uniswapResults = await Promise.all([
      new Trade(stableToWethRoute, new TokenAmount(token, amount_stabletoken_wei), TradeType.EXACT_INPUT),
      new Trade(wethToStableRoute, new TokenAmount(WETH[token.chainId], amount_eth_wei), TradeType.EXACT_INPUT),
    ]);

    return {
      // todo: uniswapResults[0].executionPrice or uniswapResults[0].nextMidPrice?
      // https://uniswap.org/docs/v2/advanced-topics/pricing/
      // https://uniswap.org/docs/v2/javascript-SDK/pricing/
      buy: parseFloat(uniswapResults[0].executionPrice.invert().toSignificant(6)),
      sell: parseFloat(uniswapResults[1].executionPrice.toSignificant(6)),
    };
  };

  // fetch kyber buy / sell rate
  static FetchKyberRates1 = async (fromContract: string, toContract: string, amount: number): Promise<Price> => {
    const [buy, sell] = await Promise.all([
      Price.fetchKyberPriceByAction(fromContract, toContract, Action.Buy, amount),
      Price.fetchKyberPriceByAction(fromContract, toContract, Action.Sell, amount),
    ]);
    return new Price(buy, sell);
  };

  static FetchKyberRates2 = async (fromContract: string, toContract: string, amount: number): Promise<Price> => {
    const [buy, sell] = await Promise.all([
      Price.fetchKyberPriceByAction(fromContract, toContract, Action.Buy, amount, 8),
      Price.fetchKyberPriceByAction(fromContract, toContract, Action.Sell, amount, 8),
    ]);
    return new Price(buy, sell);
  };

  static FetchKyberRates3 = async (
    provider: ethers.providers.Provider,
    fromContract: string, toContract: string, fromAmountInWei: string, toAmountInWei: string,
  ): Promise<Price> => {
    const kyber = KyberNetworkProxyFactory.connect(addresses.kyber.kyberNetworkProxy, provider);

    const kyberResults = await Promise.all([
      kyber.getExpectedRate(fromContract, toContract, fromAmountInWei),
      kyber.getExpectedRate(toContract, fromContract, toAmountInWei),
    ]);

    return new Price(
      1 / parseFloat(ethers.utils.formatEther(kyberResults[0].expectedRate)),
      parseFloat(ethers.utils.formatEther(kyberResults[1].expectedRate))
    );
  };

  // private function to fetch kyber buy / sell rate
  static fetchKyberPriceByAction = async (fromContract: string, toContract: string, type: Action, amount: number, platformFee = 0): Promise<number> => {
    const fetch = isNode ? nodeFetch : window.fetch;
    const endpoint = `https://api.kyber.network/quote_amount?base=${fromContract}&quote=${toContract}&base_amount=${amount}&type=${type}&platformFee=${platformFee}`;
    const response = await fetch(endpoint);
    const result = await response.json();
    return result.data / amount;
  };

  static getEtherPrice = async (provider: ethers.providers.Provider) => {
    const kyber = KyberNetworkProxyFactory.connect(addresses.kyber.kyberNetworkProxy, provider);
    const expectedRate = (await kyber.getExpectedRate(ethAddress, daiAddress, 1)).expectedRate;
    return parseFloat(ethers.utils.formatEther(expectedRate));
  };
}

export enum Action {
  Sell = "sell",
  Buy = "buy",
}
