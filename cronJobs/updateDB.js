const yahooFinance = require('yahoo-finance2').default;
const Price = require('../models/Price.js');
const Ticker = require('../models/Ticker.js'); 
const mongoose = require('mongoose')
const connectDb = require('../databaseConnection.js');

// TODO: similarities to populate DB can refactor out

const getTickerPriceHistory = async (ticker, date) => {
  const dateString = date.toISOString().substring(0, 10);

  try {
    const data = await yahooFinance.historical(ticker, { period1: dateString });

    return data;
  } catch (err) {
    console.log(err.message);
  }
}

const getPriceData = async (ticker) => {  
  try {
    const lastDate = await Price.findOne({ticker}, 'date').sort({ date: -1 }).limit(1);
    const data = await getTickerPriceHistory(ticker, lastDate.date);
    
    return data;
  } catch (error) {
    console.log(error)
  }
}

const addPriceDataToDb = async (ticker, tickerId) => { 
  try {
    const data = await getPriceData(ticker);
    if (data) {
      for (day of data) {
        try {
            const doc = new Price({
              tickerId,
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
        } catch (err) {
          console.log(err);
        }
        }
    }
  } catch (err) {
    console.log(err.message);
  }
}

const updateDb = async () => {
  connectDb();
  try {
    const tickerArray = await Price.distinct('ticker'); // ['A', 'AA' .....]
  } catch (error) {
    console.log(error)
  }

  for (const tickerData of tickerArray) { 
    try {
      const tickerId = await Ticker.findOne({ticker:tickerData},'id');

      await addPriceDataToDb(tickerData, tickerId);
    } catch (err) {
      console.log(err.message);
    }
  } 

  mongoose.connection.close();
}

//testing
updateDb();

