const Price = require("../models/Price")

const calculateOverallMarketPercentage = async () => {
  try {
    const data = await Price.find({ticker: 'AAPL'}, 'price').sort({ date: -1 }).limit(2);
  
    console.log(data)
    return data;
  } catch (error) {
    console.log(error)
  }

}


const createDailyReport = async () => {
  //Collect last two days of S&P data and calculate percentage gain store in variable
  await calculateOverallMarketPercentage();
  //query db for last two days of each stock price and calculate percentage move
    // from this array of tickets and percentages find the min and max and store in variables


  //store this data in a new Daily report
}

createDailyReport();