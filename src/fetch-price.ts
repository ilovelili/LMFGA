require("dotenv").config();
require("console.table");
import addresses from "../addresses";
import {Util} from "./util";
import {Price} from "./price";
import readline from "readline";
import chalk from "chalk";
import {ethers} from "ethers";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const infuraUri = Util.Env.infuraUri;
if (!infuraUri) {
  Util.Log.error("ℹ Must assign INFURA_URI");
  process.exit();
}

let amount_token1 = 1;
const provider = new ethers.providers.JsonRpcProvider(infuraUri);

const main = async () => {
  if (Util.Config.useTestnet) {
    Util.Log.info("Running on Kovan testnet. Not all the token pairs are supported");
  }

  rl.question(chalk.yellow("* Select input token (dai | usdc | weth | * for all)\n"), async function (token1) {
    Util.Log.success(`👀 token1 is ${token1 == "*" ? "ALL" : token1}`);

    rl.question(chalk.yellow("* Select output token (dai | usdc | weth | eth | bat | knc | link | mkr | uni * for all)\n"), async function (
      token2
    ) {
      Util.Log.success(`👀 token2 is ${token2 == "*" ? "ALL" : token2}`);

      rl.question(chalk.yellow(`* Select input token amount (default is 1)\n`), async function (amount) {
        if (Number(amount) > 0) amount_token1 = Number(amount);
        Util.Log.success(`👀 token1 amount is ${amount_token1}`);

        if (token2 == "*" && token1 == "*") {
          Util.Log.info("⚠ Fetching a whole price list takes 1 or 2 minutes\n");
        }

        Util.Log.success(`🚀 Loading ... \n`);

        const token1List = Object.keys(addresses.tokens.token1).filter((x) => token1 == x || token1 == "*");
        const token2List = Object.keys(addresses.tokens.token2).filter((x) => token2 == x || token2 == "*");

        const results: PriceResult[] = [];
        for (let token1 of token1List) {
          for (let token2 of token2List) {
            if (await Util.skipPair(token1, token2)) {
              Util.Log.info(`⚠ skip ${token1}/${token2}`);
              continue;
            }

            results.push(await fetchPrices(token1, token2));
          }
        }

        rl.question(chalk.yellow("* Would you like to generate the final report? (y|n)\n"), async function (yN) {
          rl.close();
          if (yN.toLowerCase() == "y" || yN.toLowerCase() == "yes") {
            Util.Log.success("********************Final Report********************");
            results.forEach((r) =>
              // prettier-ignore
              console.table([
                  {
                    "Token Pair": `${r.token1}/${r.token2}`,
                    "Input Token Amount": `${amount_token1} ${r.token1}`,
                    "Kyber -> Uniswap": `${amount_token1} ${r.token1} -> ${r.kyberSwap.toFixed(6)} ${r.token2} -> ${r.uniswapReturn.toFixed(6)} ${r.token1}`,
                    "Uniswap -> Kyber": `${amount_token1} ${r.token1} -> ${r.uniswapSwap.toFixed(6)} ${r.token2} -> ${r.kyberReturn.toFixed(6)} ${r.token1}`,
                    "Profit Found": resolveProfitFound(r.uniswapReturn, r.kyberReturn, amount_token1),
                  },
                ])
            );
          }

          Util.Log.success("Bye!");
          process.exit(0);
        });
      });
    });
  });
};

const fetchPrices = async (token1: string, token2: string): Promise<PriceResult> => {
  const token1Config = Util.Address.Token1.resolveToken(token1, amount_token1);
  const token2Config = Util.Address.Token2.resolveToken(token2);

  const [kyberSwap, uniswapSwap] = await Promise.all([
    Price.FetchKyberOutput(token1Config, token2Config, provider),
    Price.FetchUniswapOutput(token1Config, token2Config),
  ]);

  const [uniswapReturn, kyberReturn] = await Promise.all([
    ((amount_token2) => {
      token2Config.amount = amount_token2;
      return Price.FetchUniswapOutput(token2Config, token1Config);
    })(kyberSwap),

    ((amount_token2) => {
      token2Config.amount = amount_token2;
      return Price.FetchKyberOutput(token2Config, token1Config, provider);
    })(uniswapSwap),
  ]);

  console.table([
    {
      "Token Pair": `${token1}/${token2}`,
      "Input Token Amount": `${amount_token1} ${token1}`,
      "Kyber -> Uniswap": `${amount_token1} ${token1} -> ${kyberSwap.toFixed(6)} ${token2} -> ${uniswapReturn.toFixed(6)} ${token1}`,
      "Uniswap -> Kyber": `${amount_token1} ${token1} -> ${uniswapSwap.toFixed(6)} ${token2} -> ${kyberReturn.toFixed(6)} ${token1}`,
      "Profit Found": resolveProfitFound(uniswapReturn, kyberReturn, amount_token1),
    },
  ]);

  return new PriceResult(token1, token2, kyberSwap, uniswapReturn, uniswapSwap, kyberReturn);
};

const resolveProfitFound = (uniswapReturn: number, kyberReturn: number, amount: number) => {
  if (uniswapReturn > amount) return `Kyber -> Uniswap (${(uniswapReturn - amount).toFixed(6)})`;
  if (kyberReturn > amount) return `Uniswap -> Kyber (${(kyberReturn - amount).toFixed(6)})`;
  return "x";
};

class PriceResult {
  constructor(
    public token1: string,
    public token2: string,
    public kyberSwap: number,
    public uniswapReturn: number,
    public uniswapSwap: number,
    public kyberReturn: number
  ) {}
}

main();
