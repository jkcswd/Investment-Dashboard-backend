require('dotenv').config();
const fetch = require('node-fetch');
const { economicDb } = require('../database');

const missingSymbols = [];

const fetchFredData = async (symbol) => {
  try{
    const response = await fetch(`https://api.stlouisfed.org/fred/series?series_id=${symbol}&api_key=${process.env.API_KEY}&file_type=json`)
    const data = await response.json()

    return data;
  }catch (err) {
    console.log(err.message)
    missingTickers.push(symbol);
  }
}

const addDataToDb = async (symbol) => { 
    try {
      const data = await fetchFredData(symbol);

      if (data) {
        const name = symbol;
        const values = data 

        await query(economicDb, `CREATE TABLE IF NOT EXISTS ${name} (date text UNIQUE, value real)`, 'run');

        for (const value of values) {
          await query(economicDb, `INSERT OR IGNORE INTO ${name} VALUES("${extractDateString(value.date)}", ${value.value}`, 'run');
        }
      }
    } catch (err) {
      console.log(err.message);
    }
}


const populateEconomicData = async () => { 
  const csvRoute = ''
  const jsonRoute = ''
  const symbolArray = csvToArray(csvRoute);  
  let counter = 0;

  missingTickers.length = 0; // clear the array in case it is holding data already from previous function call during the runtime of program.

  for (const ticker of tickerArray) {
    try {
      await addPriceDataToDb(symbol);
      counter++;
      percentProgressDisplay(( counter / symbolArray.length ) * 100);
    } catch (err) {
      console.log(err.message)
    }
  }

  missingTickersToJson(missingTickers, jsonRoute);
}

module.exports = populateEconomicData;