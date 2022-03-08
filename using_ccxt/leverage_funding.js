const ccxt = require('ccxt');

(async () => {
    const binance = new ccxt.binance({
        apiKey: '',
        secret: '',
    });
    await binance.loadMarkets();

    console.log(binance['limits'])      // why all is undefined??

    // the code below throws
    // NotSupported (this.id + ' fetchLeverageTiers() supports linear and inverse contracts only');
    // const symbol = 'BNB/USDT'
    // const marketLeverageTiers = await binance.fetchLeverageTiers(symbol)
    // console.log(marketLeverageTiers)

    // throws:
    // NotSupported: binance fetchFundingRates() supports linear and inverse contracts only
    // console.log(await binance.fetchFundingRates())
})()
