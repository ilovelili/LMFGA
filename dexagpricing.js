
//  Instead of using another api call like these 
//  https://api-v2.dex.ag/price?from=ETH&to=DAI&fromAmount=1&dex=ag  
//  https://docs.dex.ag/api
//
//  Hopefully use Sdk 
//  npm install dexag-sdk

import DEXAG from 'dexag-sdk';
const sdk = DEXAG.fromProvider(window.ethereum);

// receive status messages as the client executes the trade
sdk.registerStatusHandler((status, data)=>{
  console.log(status, data)
});

// get trade
const tx = await sdk.getTrade({to: 'DAI', from: 'ETH', toAmount: 1, dex: 'ag'});

// checkout
const valid = await sdk.validate(tx);
if (valid) {
  // transaction data is valid, make a trade
  sdk.trade(tx);
}