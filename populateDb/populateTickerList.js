const Ticker = require("../models/Ticker");
const { csvToArray } = require("./utilities");

const updateTickerList = async (csvPath, type, dataSource) => {
  const tickerArray = csvToArray(csvPath);
  for (ticker of tickerArray) {
    try {
      const doc = new Ticker({
        ticker,
        type ,
        dataSource
      });

      await doc.save();
    } catch (err) {
      console.log(err)
    }
  }
}


const updateTickerListAll = async () => {
  await updateTickerList('./jsonAndCsv/wilshire5000Stocks.csv' , 'stock', 'yahoo');
  await updateTickerList('./jsonAndCsv/otherAssets.csv', 'other', 'yahoo');
  await updateTickerList('./jsonAndCsv/economic.csv', 'economic', 'fred');
}

module.exports = updateTickerListAll;
