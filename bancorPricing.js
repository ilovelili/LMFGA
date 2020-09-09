const BancorSDK = require('bancor-sdk').SDK;    // BRAND NEW SDK AND DOCS  https://docs.bancor.network/sdk/sdk-api-reference

const settings = {
    // optional, mandatory when interacting with the ethereum mainnet
    ethereumNodeEndpoint: 'https://mainnet.infura.io/v3/a3a347df9b124f2ba24894f8fcf16950',
    // optional, mandatory when interacting with the EOS mainnet
    eosNodeEndpoint: '<eos node endpoint>'
};
const main = async () => {
let bancorSDK = await BancorSDK.create(settings);
// get the path/rate between DAI and ENJ
const sourceToken = {
    blockchainType: 'ethereum',
    blockchainId: '0x6B175474E89094C44Da98b954EedeAC495271d0F'
};
const targetToken = {
    blockchainType: 'ethereum',
    blockchainId: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'
};
const res = await bancorSDK.pricing.getPathAndRate(sourceToken, targetToken, "1.0");
const res2 = await bancorSDK.pricing.getPathAndRate(targetToken,sourceToken , "1.0");
console.log('eth/weth')
console.log(res.rate);
console.log(res2.rate);
}
main();