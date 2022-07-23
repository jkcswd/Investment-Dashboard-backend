const yahooFinance = require('yahoo-finance2').default;
const {priceDb, query} = require('./database.js');
const fs = require('fs');

const percentProgressDisplay = (percent) => {
  process.stdout.clearLine();
  process.stdout.cursorTo(0);
  process.stdout.write(percent + '%');
}

const getTickerPriceHistory = async (ticker) => {
  const results = await yahooFinance.historical(ticker, { period1: '1900-01-01' });
  const tickerPriceObj = { ticker, results };
  return tickerPriceObj;
}

const addPriceDataToDb = (tickerPriceObj) => {
  const name = tickerPriceObj.ticker;
  const values = tickerPriceObj.results;

  priceDb.serialize( async () => {
    await query(priceDb, `CREATE TABLE IF NOT EXISTS ${name} (date text UNIQUE, open real, high real, low real, close real, adjClose real, volume integer)`, 'run');

    for (const value of values) {
      await query(priceDb, `INSERT OR IGNORE INTO ${name} VALUES("${value.date}", ${value.open}, ${value.high}, ${value.low}, ${value.close}, ${value.adjClose}, ${value.volume})`, 'run')
    }
  });
}

const missingTickersToJson = (missingTickers) => {
  const jsonData = JSON.stringify(missingTickers);
  fs.writeFileSync('missingStocks.json', jsonData);
}

const populatePriceDataDb = async (tickerArray) => {
  let counter = 0;
  const missingTickers = {};

  for (const ticker of tickerArray) {
    try {
      const data = await getTickerPriceHistory(ticker);

      await addPriceDataToDb(data);
      counter++;
      percentProgressDisplay(( counter / tickerArray.length ) * 100);
    } catch (err) {
      console.log(err.message)
      
    }
  }
  console.log(' of stock price historical data population completed.');
  missingTickersToJson(missingTickers);
}
// TODO: other assets data
// TODO: earnings data
// TODO: economic data

const csvToArray = () => {
  const csv = fs.readFileSync('wilshire_5000_stocks.csv', 'utf8');
  const tickerArray = csv.split("\n");

  return tickerArray 
}

(function main(){
  const tickerArray = csvToArray();

  populatePriceDataDb(tickerArray);

  return;
})();
// Procedural programing as it is a short standalone script to be run once when setting up the server.
