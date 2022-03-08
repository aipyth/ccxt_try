const ccxt = require('ccxt');

const API_KEY = process.env['API_KEY'];
const SECRET_KEY = process.env['SECRET_KEY'];

const pipe = (...funcs) => (init) => funcs.reduce((value, func) => func(value), init);

const balance = async (exchange) => {
    const resp = await exchange.fetchBalance();
    return pipe(
        Object.entries,
        (keys) => keys.filter(([_, value]) => value?.total > 0),
        Object.fromEntries,
    )(resp);
}

(async () => {
    const binance = new ccxt.binance({
        apiKey: API_KEY,
        secret: SECRET_KEY,
    });
    await binance.loadMarkets();

    console.log(`balance `, await balance(binance))
})()
