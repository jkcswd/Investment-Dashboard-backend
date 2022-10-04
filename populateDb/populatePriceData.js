const yahooFinance = require('yahoo-finance2').default;
const Price = require('../models/Price.js');
const Ticker = require('../models/Ticker.js');
const {percentProgressDisplay, missingTickersToJson } = require('./utilities.js');

const missingTickers = [];

const getTickerPriceHistory = async (ticker) => {
  try {
    const data = await yahooFinance.historical(ticker, { period1: '1900-01-01' });

    return data;
  } catch (err) {
    console.log(err.message);
    missingTickers.push(ticker);
  }
}

const addPriceDataToDb = async (ticker, tickerId) => { 
  try {
    const data = await getTickerPriceHistory(ticker);
    if (data) {
      for (day of data) {
        try {
          const checkIfExists = await Price.findOne({ticker, date:day.date});

          if (!checkIfExists) {
            const doc = new Price({
              tickerId: tickerId,
              ticker,
              date: day.date,
              open: day.open,
              high: day.high,
              low: day.low,
              close: day.close,
              adjClose: day.adjClose,
              volume: day.volume
            });

            await doc.save();
          }
        } catch (err) {
          console.log(err);
        }
        }
    }
  } catch (err) {
    console.log(err.message);
  }
}

const populatePriceData = async () => {
  let counter = 0;
  const tickerArray = await Ticker.find({ dataSource:'yahoo' });

  for (const tickerData of tickerArray) { 
    try {
      await addPriceDataToDb(tickerData.ticker, tickerData.id);
      counter++;
      percentProgressDisplay(( counter / tickerArray.length ) * 100);
    } catch (err) {
      console.log(err.message)
    }
  }

  missingTickersToJson(missingTickers, './jsonAndCsv/missingTickers.json');
}

module.exports = populatePriceData;
