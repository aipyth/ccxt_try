const ccxt = require('ccxt');

(async () => {
    const binance = new ccxt.binance()

    if (!binance.has['fetchTrades']) {
        throw new Error('no fetchTrades on binance')
    }

    const symbol = 'GLMR/USDT'
    const since = binance.milliseconds() - 1000 * 60 * 5
    const limit = 3
    const trades = await binance.fetchTrades(symbol, since, limit)
    console.log(trades)


    console.log('and status', await binance.fetchStatus())
})()
