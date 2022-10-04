const yahooFinance = require('yahoo-finance2').default;
const Ticker = require('../models/Ticker.js');
const Earnings = require('../models/Earnings.js')
const {  percentProgressDisplay,  missingTickersToJson } = require('./utilities.js');

// TODO: potential refactor as this code is fairly similar to populateFromYahoo.js

const missingTickers = [];

const getEarningsHistory = async (ticker) => { 
  try {
    const results = await yahooFinance.quoteSummary(ticker, {modules: [ "earningsHistory" ] });

    return results.earningsHistory.history;
  } catch (err) {
    console.log(err.message);
    missingTickers.push(ticker);
  }
}

const addEarningsDataToDb = async (ticker, tickerId) => { 
  try {
    const data = await getEarningsHistory(ticker);

    if (data) {
      for (quarter of data) {
        const doc = new Price({
          tickerId: tickerId,
          ticker,
          date: quarter.quarter,
          epsActual: quarter.epsActual,
          epsEstimate: quarter.epsEstimate
        });
  
        await doc.save();
      }
    }
  } catch (error) {
    console.log(error)
  }
}

const populateEarningsData = async () => { 
  let counter = 0;
  const tickerArray = await Ticker.find({ type:'stock' });

  for (const tickerData of tickerArray) {
    try {
      await addEarningsDataToDb(tickerData.ticker, tickerData.id);
      counter++;
      percentProgressDisplay(( counter / tickerArray.length ) * 100);
    } catch (err) {
      console.log(err.message)
    }
  }

  missingTickersToJson(missingTickers, './jsonAndCsv/missingStocksEarnings.json');
}

module.exports = populateEarningsData;
