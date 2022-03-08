const ccxt = require('ccxt');

(async () => {
    const binance = new ccxt.binance();
    if (!binance.has['fetchOHLCV']) {
        throw new Error('binance does not support ohlcv')
    }

    console.log('fetchOHLCV:', binance.has['fetchOHLCV'])

    const symbol = 'GLMR/USDT'
    const timeframe = '5m'
    const since = binance.milliseconds() - 1000 * 60 * 60
    const candlesticks = await binance.fetchOHLCV(symbol, timeframe, since)
    console.log(`candlesticks with ${timeframe}`, candlesticks)

    // const markSticks = await binance.fetchMarkOHLCV(symbol, timeframe, since)
    // console.log(markSticks)
    
    // console.log(await binance.fetchOHLCV(symbol, timeframe, since, undefined, {
    //     'price': 'mark',
    // }))
    
    // console.log(binance.api, binance.urls)
    const url = binance.urls.api.public + `/klines?symbol=${symbol.replace('/', '')}&interval=${timeframe}&limit=${5}`
    console.log(await binance.fetch(url, 'GET', body={
        symbol: symbol,
        interval: timeframe,
        limit: 10,
    })) 
})()
