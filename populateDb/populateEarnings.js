const yahooFinance = require('yahoo-finance2').default;
const EarningsData = require('../models/associations.js');
const {  percentProgressDisplay,  missingTickersToJson } = require('./utilities.js');

// TODO: potential refactor as this code is fairly similar to populateFromYahoo.js

const missingTickers = [];

const getEarningsHistory = async (ticker) => { 
  try {
    const results = await yahooFinance.quoteSummary(ticker, {modules: [ "earningsHistory" ] });
    const tickerPriceObj = { name: ticker, results: results.earningsHistory.history };

    console.log(tickerPriceObj)
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
        for (result of tickerPriceObj.results) {
          await EarningsData.findOrCreate({
            where: { date: result.date, TickerListId: fKey },
            defaults: {
              date: result.quarter,
              epsActual: result.epsActual,
              epsEstimate: result.epsEstimate
            },
            logging: false 
          });
        }
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

getEarningsHistory('AAPL')

module.exports = populateEarningsData;
