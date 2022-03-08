const ccxt = require('ccxt');

(async () => {
    const binance = new ccxt.binance()

    if (!binance.has['fetchTicker']) {
        throw new Error('no fetchTicker on binance')
    }

    const symbol = 'BTC/USDT'
    const ticker = await binance.fetchTicker(symbol)

    console.log(`${symbol} ticker`, ticker)
})()
