mport { legos } from "@studydefi/money-legos";
const { curvefi, erc20 } = legos;

// Addresses can be found here
//  https://www.curve.fi/contracts

// Curve finance cDai and cUSDC contract
const curveFicDU = new ethers.Contract(
  curvefi.cDai_cUsdc.curve.address,
  curvefi.curveAbi,
  wallet
);
 
//Pricing  



const main = async () => {
  // Amount of DAI to Swap
  const daiAmount = 10;
  const daiAmountWei = ethers.utils.parseUnits(
    daiAmount.toString(),
    erc20.dai.decimals
  );

  // How much USDC we'll get for cDAI we supplied
  const usdcRecvWei = await curveFicDU.get_dy_underlying(
    curvefi.cDai_cUsdc.indexes.dai,
    curvefi.cDai_cUsdc.indexes.usdc,
    daiAmountWei
  );
};