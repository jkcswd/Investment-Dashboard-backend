const TickerList = require("../models/TickerList");
const { csvToArray } = require("./utilities");

const updateTickerList = async (csvPath, type, dataSource) => {
  const tickerArray = csvToArray(csvPath);

  try {
    await TickerList.sync();
  } catch (err) {
    console.log(err);
  }

  for (ticker of tickerArray) {
    try {
      await TickerList.create({
        ticker,
        type ,
        dataSource
      },{ logging: false });
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
