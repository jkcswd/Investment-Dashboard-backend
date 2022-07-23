const yahooFinance = require('yahoo-finance2').default;
const {priceDb, query} = require('./database.js');
const fs = require('fs');
const readline = require('readline');

const missingTickers = [];

const percentProgressDisplay = (percent) => { 
  try {
    readline.clearLine(process.stdout, 0);
    readline.cursorTo(process.stdout, 0, null);
    process.stdout.write(percent + '% of stock price historical data population completed.');
  } catch (err) {
    console.log(err.message);
  }
}

const getTickerPriceHistory = async (ticker) => { 
  try {
    const results = await yahooFinance.historical(ticker, { period1: '1900-01-01' });
    const tickerPriceObj = { name: ticker, results };

    return tickerPriceObj;
  } catch (err) {
    console.log(err.message);
    missingTickers.push(ticker)
  }
}

const addPriceDataToDb = async (ticker) => { 
    try {
      const tickerPriceObj = await getTickerPriceHistory(ticker);

      if (tickerPriceObj) {
        const name = tickerPriceObj.name;
        const values = tickerPriceObj.results;  

        await query(priceDb, `CREATE TABLE IF NOT EXISTS ${name} (date text UNIQUE, open real, high real, low real, close real, adjClose real, volume integer)`, 'run');

        for (const value of values) {
          await query(priceDb, `INSERT OR IGNORE INTO ${name} VALUES("${value.date}", ${value.open}, ${value.high}, ${value.low}, ${value.close}, ${value.adjClose}, ${value.volume})`, 'run');
        }
      }
    } catch (err) {
      console.log(err.message);
    }
}

const missingTickersToJson = (missingTickers) => { 
  try {
    const jsonData = JSON.stringify(missingTickers);
    fs.writeFileSync('missingStocks.json', jsonData);
  } catch (err) {
    console.log(err.message);
  }
}

const csvToArray = () => {
  const csv = fs.readFileSync('wilshire_5000_stocks.csv', 'utf8');
  const tickerArray = csv.split("\n");

  return tickerArray 
}

const populatePriceDataDb = async () => {
  let counter = 0;
  const tickerArray = csvToArray();

  for (const ticker of tickerArray) {
    try {
      await addPriceDataToDb(ticker);
      counter++;
      percentProgressDisplay(( counter / tickerArray.length ) * 100);
    } catch (err) {
      console.log(err.message)
    }
  }

  missingTickersToJson(missingTickers);
}
// TODO: other assets data
// TODO: earnings data
// TODO: economic data

(function main (){
  populatePriceDataDb();
})();
// Procedural programing as it is a short standalone script to be run once when setting up the server.
