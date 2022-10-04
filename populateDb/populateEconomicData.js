require('dotenv').config();
const fetch = require('node-fetch');
const { percentProgressDisplay, missingTickersToJson } = require('./utilities.js')

// TODO: potential refactor as this code is fairly similar to populateFromYahoo.js

const missingSymbols = [];

const fetchFredData = async (ticker) => {
  try{
    const response = await fetch(`https://api.stlouisfed.org/fred/series?series_id=${ticker}&api_key=${process.env.API_KEY}&file_type=json`); 
    //alter api call to get the actual dataset.
    const data = await response.json()
    
    return data;
  }catch (err) {
    console.log(err.message)
    missingSymbols.push(ticker);
  }
}

const addDataToDb = async (ticker, fKey) => { 
    try {
      const data = await fetchFredData(ticker);

      if (data) {





      }
    } catch (err) {
      console.log(err.message);
    }
}


const populateEconomicData = async () => { 
  let counter = 0;

  // TODO create array selecting dataSource:fred data from tickerlist

  for (const tickerData of tickerArray) {
    try {
      await addDataToDb(tickerData ,fKey);
      counter++;
      percentProgressDisplay(( counter / symbolArray.length ) * 100);
    } catch (err) {
      console.log(err.message)
    }
  }

  missingTickersToJson(missingSymbols, './jsonAndCsv/missingEconomic.json');
}

module.exports = populateEconomicData;
