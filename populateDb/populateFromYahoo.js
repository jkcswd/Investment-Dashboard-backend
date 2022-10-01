const yahooFinance = require('yahoo-finance2').default;
const {percentProgressDisplay, missingTickersToJson } = require('./utilities.js')
const { PriceData, TickerList}  = require('../models/associations');

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

const addPriceDataToDb = async (ticker, fKey) => { 
  try {
    const tickerPriceObj = await getTickerPriceHistory(ticker);

    
    await PriceData.sync();

    for (result of tickerPriceObj.results) {
      if (tickerPriceObj) {
        await PriceData.create({
          date: result.date,
          open: result.open,
          high: result.high,
          low: result.low,
          close: result.close,
          volume: result.volume,
          TickerListId: fKey
        }, { logging: false })
      }
    }
  } catch (err) {
    console.log(err.message);
  }
}

/*

const populateFromYahooData = async (stocksOrOther) => { //String input to differentiate data that function should populate.
  // Will not need CSV Route and function
  const jsonRoute = (stocksOrOther == 'stocks') ? './jsonAndCsv/missingStocks.json' : './jsonAndCsv/missingAssets.json';
  const tickerArray = selectALL   // Different file paths needed for stocks or other assets.
  let counter = 0;

  missingTickers.length = 0; // clear the array in case it is holding data already from previous function call during the runtime of program.

  for (const ticker of tickerArray) { // This is probably correct
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
*/


// module.exports = populateFromYahooData;


addPriceDataToDb('AAPL', 1)