const yahooFinance = require('yahoo-finance2').default;
const {priceDb, query} = require("./database.js");
const csv = require('fast-csv');

// Yahoo finance  price data
//
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

const tickerArray =  ['TSLA', 'AAPL', 'GOOG', 'MMM', 'DAR', 'C', 'V' ]; // Get list of stocks to use: wilshire 5000

populatePriceDataDb = async (tickerArray) => {
  try {
    let counter = 0;

    for (const ticker of tickerArray) {
      const data = await getTickerPriceHistory(ticker);

      await addPriceDataToDb(data);
      counter = counter++;
      console.log(`${( counter / tickerArray.length ) * 100}% of database populated.`);
    }
    console.log('Stock Price Historical data population completed.');
  } catch (err){
    console.log(err.message);
  }
}


// economic data


(function main(){
  populatePriceDataDb(tickerArray);
})();


// Procedural programing as it is a short standalone script to be run once when setting up the server.