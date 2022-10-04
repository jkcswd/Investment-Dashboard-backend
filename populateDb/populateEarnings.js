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
  const tickerArray = await TickerList.findAll({
    attributes: ['ticker', 'id'],
    where: { dataSource: 'yahoo', type: 'stock' }
  });

  await EarningsData.sync();

  for (const tickerData of tickerArray) {
    try {
      await addEarningsDataToDb(tickerData.dataValues.ticker, tickerData.dataValues.id);
      counter++;
      percentProgressDisplay(( counter / tickerArray.length ) * 100);
    } catch (err) {
      console.log(err.message)
    }
  }

  missingTickersToJson(missingTickers, './jsonAndCsv/missingStocksEarnings.json');
}

module.exports = populateEarningsData;

/*
[
  {
    maxAge: 1,
    epsActual: 1.24,
    epsEstimate: 1.24,
    epsDifference: 0,
    surprisePercent: 0,
    quarter: 2021-09-30T00:00:00.000Z,
    period: '-4q'
  },

  */ 
