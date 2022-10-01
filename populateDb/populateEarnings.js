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

const addEarningsDataToDb = async (ticker, fKey) => { 
    try {
      const tickerPriceObj = await getEarningsHistory(ticker);

      if (tickerPriceObj) {
        


      }
    } catch (err) {
      console.log(err.message);
    }
}

const populateEarningsData = async () => { 
  let counter = 0;

  // TODO create array selecting dataSource:yahoo data from tickerlist

  for (const ticker of tickerArray) {
    try {
      await addEarningsDataToDb(ticker, fKey);
      counter++;
      percentProgressDisplay(( counter / tickerArray.length ) * 100);
    } catch (err) {
      console.log(err.message)
    }
  }

  missingTickersToJson(missingTickers, './jsonAndCsv/missingStocksEarnings.json');
}

module.exports = populateEarningsData;
