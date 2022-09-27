require('dotenv').config();
const fetch = require('node-fetch');
const { economicDb, query } = require('../database');
const { extractDateString, percentProgressDisplay, csvToArray, missingTickersToJson } = require('./utilities.js')

// TODO: potential refactor as this code is fairly similar to populateFromYahoo.js

const missingSymbols = [];

const fetchFredData = async (symbol) => {
  try{
    const response = await fetch(`https://api.stlouisfed.org/fred/series?series_id=${symbol}&api_key=${process.env.API_KEY}&file_type=json`); //fix to return actual dataset
    const data = await response.json()

    return data;
  }catch (err) {
    console.log(err.message)
    missingSymbols.push(symbol);
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
  const csvRoute = './jsonAndCsv/economic.csv'
  const jsonRoute = './jsonAndCsv/missingEconomic.json'
  const symbolArray = csvToArray(csvRoute);  
  let counter = 0;

  missingSymbols.length = 0; // clear the array in case it is holding data already from previous function call during the runtime of program.

  for (const symbol of symbolArray) {
    try {
      await addDataToDb(symbol);
      counter++;
      percentProgressDisplay(( counter / symbolArray.length ) * 100);
    } catch (err) {
      console.log(err.message)
    }
  }

  missingTickersToJson(missingSymbols, jsonRoute);
}

module.exports = populateEconomicData;