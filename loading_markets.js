const ccxt = require('ccxt');

(async () => {
    const binance = new ccxt.binance();
    console.log('currencies before load', binance.currencies)
    console.log('loading markets...');
    binance.loadMarkets().then(() => {
        console.log('binance.currencies properties number', Object.keys(binance.currencies).length);
        console.log('binance.markets properties number', Object.keys(binance.markets).length);

        console.log('BTC currency', binance.currencies.BTC);
    });
})();
