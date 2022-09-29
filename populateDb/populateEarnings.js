const yahooFinance = require('yahoo-finance2').default;
const {earningsDb, query} = require('../database.js');
const { extractDateString, percentProgressDisplay, csvToArray, missingTickersToJson } = require('./utilities.js');

// TODO: potential refactor as this code is fairly similar to populateFromYahoo.js

const missingTickers = [];

const getEarningsHistory = async (ticker) => { 
  try {
    const results = await yahooFinance.quoteSummary(ticker, {modules: [ "earningsHistory" ] });
    const tickerPriceObj = { name: ticker, results: results.earningsHistory.history };

    return tickerPriceObj;
  } catch (err) {
    console.log(err.message);
    missingTickers.push(ticker);
  }
}

const addEarningsDataToDb = async (ticker) => { // Other assets with special characters cause syntax errors in DB so need to be wrapped in "".
    try {
      const tickerPriceObj = await getEarningsHistory(ticker);

      if (tickerPriceObj) {
        const name = ticker;
        const values = tickerPriceObj.results;  

        await query(earningsDb, `CREATE TABLE IF NOT EXISTS ${name} (date text UNIQUE, epsActual real, epsEstimate real)`, 'run');

        for (const value of values) {
          await query(earningsDb, `INSERT OR IGNORE INTO ${name} VALUES("${extractDateString(value.quarter)}", ${value.epsActual}, ${value.epsEstimate})`, 'run');
        }
      }
    } catch (err) {
      console.log(err.message);
    }
}

const populateEarningsData = async () => { 
  const csvRoute = './jsonAndCsv/wilshire5000Stocks.csv';
  const jsonRoute = './jsonAndCsv/missingStocks.json';
  const tickerArray = csvToArray(csvRoute);   
  let counter = 0;

  missingTickers.length = 0; // clear the array in case it is holding data already from previous function call during the runtime of program.

  for (const ticker of tickerArray) {
    try {
      await addEarningsDataToDb(ticker, stocksOrOther);
      counter++;
      percentProgressDisplay(( counter / tickerArray.length ) * 100);
    } catch (err) {
      console.log(err.message)
    }
  }

  missingTickersToJson(missingTickers, jsonRoute);
}

module.exports = populateEarningsData;
