const yahooFinance = require('yahoo-finance2').default;
const { EarningsData, TickerList } = require('../models/associations.js');
const {  percentProgressDisplay,  missingTickersToJson } = require('./utilities.js');

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
        for (result of tickerPriceObj.results) {
          await EarningsData.findOrCreate({
            where: { date: result.quarter, TickerListId: fKey },
            defaults: {
              date: result.quarter,
              epsActual: result.epsActual,
              epsEstimate: result.epsEstimate,
              TickerListId: fKey
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
