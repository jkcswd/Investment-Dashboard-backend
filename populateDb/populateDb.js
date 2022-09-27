const populatePriceData = require('./populateFromYahoo.js');
const checkForPopulate = require('./cli.js');

const main = async () => {
  const checkForStockPricePopulate = await checkForPopulate('stock price');
  const checkForOtherPricePopulate = await checkForPopulate('other asset price');
  //const checkForEarningsDataPopulate = await checkForPopulate('stock earnings');
  //const checkForEconomicDataPopulate = await checkForPopulate('economic');

  if (checkForStockPricePopulate == 'y') { await populatePriceData('stocks'); }
  if (checkForOtherPricePopulate == 'y') { await populatePriceData('other'); }
  //if (checkForOtherPricePopulate == 'y') { populateEarnings(); }
  //if (checkForOtherPricePopulate == 'y') { populateEconomicData(); }
}

setTimeout(() => { //allow to connect to DBs before sending prompts
  main();
}, 1)


