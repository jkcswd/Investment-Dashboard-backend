const yahooFinance = require('yahoo-finance2').default;
const {priceDb, query} = require("./database.js");

// Yahoo finance tickers
const getTickerHistory = async (ticker) => {
  const results = await yahooFinance.historical(ticker, { period1: '1900-01-01' });

  return results;
}

const addDataToDb = (ticker) => {
  priceDb.serialize( async () => {
    await query(`CREATE TABLE IF NOT EXISTS ${ticker} (date text, open real, high real, low real, close real, adjClose real, volume integer)`, 'run')
    await query(`INSERT INTO ${ticker} VALUES(.......)`, 'run')
  })
}

// economic data