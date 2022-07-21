const yahooFinance = require('yahoo-finance2').default;
const {db, query} = require("./database.js");

// Yahoo finance tickers
const getTickerHistory = async (ticker) => {
  const results = await yahooFinance.historical(ticker, { period1: '1900-01-01' });

  return results;
}


// economic data