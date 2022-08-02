const populatePriceData = require('./populateStocks.js')
const checkForPopulate = require('./cli.js')
// TODO: earnings data
// TODO: economic data
// TODO: other asset data

const main = async () => {
  const checkForStockPricePopulate = await checkForPopulate('stock price');
  if (checkForStockPricePopulate == 'y') { populatePriceData(); }
}

setTimeout(() => { //allow to connect to DBs before sending prompts
  main();
}, 1)


