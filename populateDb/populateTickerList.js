const TickerList = require("../models/TickerList");
const { csvToArray } = require("./utilities");

const updateTickerList = async (csvPath, type, dataSource) => {
  const tickerArray = csvToArray(csvPath);

  for (ticker of tickerArray) {
    try {
      await TickerList.create({
        ticker,
        type ,
        dataSource
      });
    } catch (err) {
      console.log(err)
    }
  }
}


const updateTickerListAll = () => {
  updateTickerList('./jsonAndCsv/wilshire5000Stocks.csv' , 'stock', 'yahoo');
  updateTickerList('./jsonAndCsv/otherAssets.csv', 'other', 'yahoo');
  updateTickerList('./jsonAndCsv/economic.csv', 'economic', 'fred');
}

module.exports = updateTickerListAll;
