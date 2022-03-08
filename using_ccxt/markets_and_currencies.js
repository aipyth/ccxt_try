const ccxt = require('ccxt');

const one = async (exchange) => {
    const btcusd = exchange.market('BTC/USDT')
    console.log(btcusd);
    console.log(exchange.symbols)
    const orderBook = await exchange.fetchOrderBook('BTC/USDT', 5)
    console.log(orderBook)
}

const fetchLastSeconds = async (exchange, seconds) => {
    let allTrades = []
    if (exchange.has['fetchTrades']) {
        let since = exchange.milliseconds() - 1000 * seconds
        const symbol = 'BTC/USDT'
        const limit = 40
        while (since < exchange.milliseconds()) {
            // console.log(`allTrades ${allTrades.length}; since ${since}`)
            const trades = await exchange.fetchTrades(symbol, since, limit)
            if (trades.length) {
                since = trades[trades.length - 1]['timestamp'] + 1
                allTrades = allTrades.concat(trades)
            } else {
                break
            }
        }
    }
    return allTrades
}

const marketPrice = async (exchange, symbol) => {
    const orderbook = await exchange.fetchOrderBook(symbol)
    const bid = orderbook.bids.length ? orderbook.bids[0][0] : undefined
    const ask = orderbook.asks.length ? orderbook.asks[0][0] : undefined
    const spread = (bid && ask) ? ask - bid : undefined
    console.log(orderbook.symbol, 'market price', { bid, ask, spread })
}

(async () => {
    const binance = new ccxt.binance();
    await binance.loadMarkets()

    // one(binance)
    
    // const seconds = 5
    // const trades = await fetchLastSeconds(binance, seconds)
    // console.log(`number of trades in last ${seconds} seconds: ${trades.length}`)

    // const limit = 5
    // const orderBook = await binance.fetchOrderBook('BTC/USDT', limit)
    // console.log('orderbook:', orderBook)

    // const limit = 5
    // const symbol = 'BTC/USDT'
    // const orderBook = await binance.fetchL2OrderBook(symbol, limit)
    // console.log('orderbook:', orderBook)

    // const symbol = 'BTC/USDT'
    // marketPrice(binance, symbol)
    
    
})()
