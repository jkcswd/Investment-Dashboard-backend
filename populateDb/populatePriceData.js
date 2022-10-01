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
    if (tickerPriceObj) {
      for (result of tickerPriceObj.results) {
          await PriceData.findOrCreate({
            where: { date: result.date, TickerListId: fKey },
            defaults: {
              date: result.date,
              open: result.open,
              high: result.high,
              low: result.low,
              close: result.close,
              volume: result.volume,
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

const populatePriceData = async () => {
  let counter = 0;
  const tickerArray = await TickerList.findAll({
    attributes: ['ticker', 'id'],
    where: { dataSource: 'yahoo' }
  });

  await PriceData.sync();

  for (const tickerData of tickerArray) { 
    try {
      await addPriceDataToDb(tickerData.dataValues.ticker, tickerData.dataValues.id);
      counter++;
      percentProgressDisplay(( counter / tickerArray.length ) * 100);
    } catch (err) {
      console.log(err.message)
    }
  }

  missingTickersToJson(missingTickers, './jsonAndCsv/missingTickers.json');
}

module.exports = populatePriceData;
