const Price = require("../models/Price")
const mongoose = require('mongoose')
const connectDb = require('../databaseConnection.js');

const calculateOverallMarketPercentage = async () => {
  try {
    const data = await Price.find({ticker: 'AAPL'}).sort({ date: -1 }).limit(2);
  
    console.log(data)
    return data;
  } catch (error) {
    console.log(error)
  }

}

/* [
  {
    _id: new ObjectId("63654004585915175677f708"),
    tickerId: new ObjectId("633c912488c4a9fa3e5a6f93"),
    ticker: 'AAPL',
    date: 2022-11-04T00:00:00.000Z,
    open: 142.089996,
    high: 142.660004,
    low: 134.550003,
    close: 135.610001,
    adjClose: 135.610001,
    volume: 79828455,
    __v: 0
  },
  {
    _id: new ObjectId("63654004585915175677f706"),
    tickerId: new ObjectId("633c912488c4a9fa3e5a6f93"),
    ticker: 'AAPL',
    date: 2022-11-03T00:00:00.000Z,
    open: 142.059998,
    high: 142.800003,
    low: 138.75,
    close: 138.880005,
    adjClose: 138.880005,
    volume: 97918500,
    __v: 0
  }
] */


const createDailyReport = async () => {
  connectDb();
  //Collect last two days of S&P data and calculate percentage gain store in variable
  await calculateOverallMarketPercentage();
  //query db for last two days of each stock price and calculate percentage move
    // from this array of tickets and percentages find the min and max and store in variables


  //store this data in a new Daily report

  mongoose.connection.close();
}

createDailyReport();