const yahooFinance = require('yahoo-finance2').default;
const {priceDb, query} = require("./database.js");

// Yahoo finance tickers
const getTickerHistory = async (ticker) => {
  const results = await yahooFinance.historical(ticker, { period1: '1900-01-01' });
  const tickerObj = { ticker, results };
  return tickerObj;
}

const addDataToDb = (tickerObj) => {
  const name = tickerObj.ticker;
  const values = tickerObj.results;

  priceDb.serialize( async () => {
    await query(`CREATE TABLE IF NOT EXISTS ${name} (date text, open real, high real, low real, close real, adjClose real, volume integer)`, 'run');

    values.forEach(element => {
      await query(`INSERT INTO ${name} VALUES("${element.date}", ${element.open}, ${element.high}, ${element.low}, ${element.close}, ${element.adjClose}, ${element.volume})`, 'run')
    }); 
  })
}

// economic data