const yahooFinance = require('yahoo-finance2').default;
const {priceDb, query} = require('../database.js');
const { extractDateString, percentProgressDisplay, csvToArray, missingTickersToJson } = require('./utilities.js')

const missingTickers = [];

const getTickerPriceHistory = async (ticker) => { 
  try {
    const results = await yahooFinance.historical(ticker, { period1: '1900-01-01' });
    const tickerPriceObj = { name: ticker, results };

    return tickerPriceObj;
  } catch (err) {
    console.log(err.message);
    missingTickers.push(ticker);
  }
}

const addPriceDataToDb = async (ticker, stocksOrOther) => { // Other assets with special characters cause syntax errors in DB so need to be wrapped in "".
    try {
      const tickerPriceObj = await getTickerPriceHistory(ticker);

      if (tickerPriceObj) {
        const name = (stocksOrOther == 'stocks') ? tickerPriceObj.name : `"${tickerPriceObj.name}"`;
        const values = tickerPriceObj.results;  

        await query(priceDb, `CREATE TABLE IF NOT EXISTS ${name} (date text UNIQUE, open real, high real, low real, close real, adjClose real, volume integer)`, 'run');

        for (const value of values) {
          await query(priceDb, `INSERT OR IGNORE INTO ${name} VALUES("${extractDateString(value.date)}", ${value.open}, ${value.high}, ${value.low}, ${value.close}, ${value.adjClose}, ${value.volume})`, 'run');
        }
      }
    } catch (err) {
      console.log(err.message);
    }
}

const populatePriceData = async (stocksOrOther) => { // Different file paths needed for stocks or other assets.
  const csvRoute = (stocksOrOther == 'stocks') ? './jsonAndCsv/wilshire5000Stocks.csv' : './jsonAndCsv/otherAssets.csv';
  const jsonRoute = (stocksOrOther == 'stocks') ? './jsonAndCsv/missingStocks.json' : './jsonAndCsv/missingAssets.json';
  const tickerArray = csvToArray(csvRoute);
  let counter = 0;

  missingTickers.length = 0; // clear the array in case it is holding data already from previous function call during the runtime of program.

  for (const ticker of tickerArray) {
    try {
      await addPriceDataToDb(ticker, stocksOrOther);
      counter++;
      percentProgressDisplay(( counter / tickerArray.length ) * 100);
    } catch (err) {
      console.log(err.message)
    }
  }

  missingTickersToJson(missingTickers, jsonRoute);
}

module.exports = populatePriceData;