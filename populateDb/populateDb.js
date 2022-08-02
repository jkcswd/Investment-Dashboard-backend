const populatePriceData = require('./populateStocks.js');
const checkForPopulate = require('./cli.js');

const main = async () => {
  const checkForStockPricePopulate = await checkForPopulate('stock price');
  if (checkForStockPricePopulate == 'y') { populatePriceData(); }
}

setTimeout(() => { //allow to connect to DBs before sending prompts
  main();
}, 1)


