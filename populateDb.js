const yahooFinance = require('yahoo-finance2').default;
const {priceDb, query} = require("./database.js");

// Yahoo finance tickers
const getTickerPriceHistory = async (ticker) => {
  const results = await yahooFinance.historical(ticker, { period1: '1900-01-01' });
  const tickerPriceObj = { ticker, results };
  return tickerPriceObj;
}

const addPriceDataToDb = (tickerPriceObj) => {
  const name = tickerPriceObj.ticker;
  const values = tickerPriceObj.results;

  priceDb.serialize( async () => {
    await query(priceDb, `CREATE TABLE IF NOT EXISTS ${name} (date text UNIQUE, open real, high real, low real, close real, adjClose real, volume integer)`, 'run');

    for (const value of values) {
      await query(priceDb, `INSERT OR IGNORE INTO ${name} VALUES("${value.date}", ${value.open}, ${value.high}, ${value.low}, ${value.close}, ${value.adjClose}, ${value.volume})`, 'run')
    }
  });
}

// economic data