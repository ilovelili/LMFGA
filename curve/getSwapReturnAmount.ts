const legosModule = require("@studydefi/money-legos");
const legos = legosModule.legos;
const curvefi = legos.curvefi;
const erc20 = legos.erc20;
const Web3 = require('web3');
const { ethers } = require("ethers");
const dotenv = require("dotenv");
dotenv.config();
//var amount = require('@extra-array/linspace');

const address = curvefi.cDai_cUsdc.curve.address;
const abi = curvefi.curveAbi;

//const min = 1;
//const max = 100;
//const ndiv = 10;
const web3 = new Web3(
    new Web3.providers.WebsocketProvider(process.env.INFURA_URL)
);
const provider = new ethers.providers.Web3Provider(web3.currentProvider);
const curveFicDU = new ethers.Contract(
    curvefi.cDai_cUsdc.curve.address,
    curvefi.curveAbi,
    provider    
);

const main = async () => {
    // Amount of DAI to Swap
    const daiAmount = 1000000;
    //const daiAmount = amount(min, max, ndiv);

    const daiAmountWei = await ethers.utils.parseUnits(
        daiAmount.toString(),
        erc20.dai.decimals
    );

    provider.on("block", async (block) => {
        console.log(`New block received. Block number: ${block}`);

        //console.log(daiAmountWei);
        const daiAmountDai = ethers.utils.formatUnits(daiAmountWei.toString(),"wei")/10**18;
        console.log(daiAmountDai);
    
        // Amount of USDC received for amount DAI swapped [ DAI-->USDC]
        const usdcRecvWei = await curveFicDU.get_dy_underlying(
            curvefi.cDai_cUsdc.indexes.dai,
            curvefi.cDai_cUsdc.indexes.usdc,
            daiAmountWei
        );
        var usdcRecvUsdc=ethers.utils.formatUnits(usdcRecvWei)*10**18/10**6; // multiply by 10**18 to convert to wei then divide by 10**6 because USDC has 6 decimals
        console.log(usdcRecvUsdc);
        
        // Amount of DAI receieved for amount USDC swapped [DAI-->USDC-->DAI]
        const daiRecvWei = await curveFicDU.get_dy_underlying(
            curvefi.cDai_cUsdc.indexes.usdc,
            curvefi.cDai_cUsdc.indexes.dai,
            usdcRecvWei
        );
        const daiRecvDai = ethers.utils.formatUnits(daiRecvWei)
        console.log(daiRecvDai);//
        
        if (daiRecvDai > daiAmountDai){
            var profit = daiRecvDai - daiAmountDai
            console.log('Arb Found: Profit = ' + profit)
        }
    });
};
main();



//console.log(address);
//console.log(abi);
//console.log(legos.uniswap.factory.abi);
//console.log(legos.uniswap.factory.address);
//console.log(legos.erc20.abi);
//console.log(legos.erc20.dai.address);