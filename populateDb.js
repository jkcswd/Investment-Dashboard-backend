const yahooFinance = require('yahoo-finance2').default;
const {priceDb, query} = require('./database.js');
const fs = require('fs');
const readline = require('readline');

const missingTickers = [];

const percentProgressDisplay = (percent) => { //works
  try {
    readline.clearLine(process.stdout, 0);
    readline.cursorTo(process.stdout, 0, null);
    process.stdout.write(percent + '%');
  } catch (err) {
    console.log(err.message);
  }
}

const getTickerPriceHistory = async (ticker) => { //works
  try {
    const results = await yahooFinance.historical(ticker, { period1: '1900-01-01' });
    const tickerPriceObj = { name: ticker, results };

    return tickerPriceObj;
  } catch (err) {
    console.log(err.message);
    missingTickers.push(ticker)
  }
}

const addPriceDataToDb = async (tickerPriceObj) => { //does not block when called in async function with await
  const name = tickerPriceObj.name;
  const values = tickerPriceObj.results;

  await priceDb.serialize( async () => {
    try {
      await query(priceDb, `CREATE TABLE IF NOT EXISTS ${name} (date text UNIQUE, open real, high real, low real, close real, adjClose real, volume integer)`, 'run');

      for (const value of values) {
        await query(priceDb, `INSERT OR IGNORE INTO ${name} VALUES("${value.date}", ${value.open}, ${value.high}, ${value.low}, ${value.close}, ${value.adjClose}, ${value.volume})`, 'run')
      }
    } catch (err) {
      console.log(err.message);
    }
  });
}

const missingTickersToJson = (missingTickers) => { //works
  try {
    const jsonData = JSON.stringify(missingTickers);
    fs.writeFileSync('missingStocks.json', jsonData);
  } catch (err) {
    console.log(err.message);
  }
}

const populatePriceDataDb = async (tickerArray) => { //probably works
  let counter = 0;

  for (const ticker of tickerArray) {
    try {
      const data = await getTickerPriceHistory(ticker);

      if (data) { await addPriceDataToDb(data) };
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

const csvToArray = () => { //works fine
  const csv = fs.readFileSync('wilshire_5000_stocks.csv', 'utf8');
  const tickerArray = csv.split("\n");

  return tickerArray 
}

(function main (){ //works
  const tickerArray = csvToArray();

  populatePriceDataDb(tickerArray);
})();
// Procedural programing as it is a short standalone script to be run once when setting up the server.
