const populatePriceData = require('./populateFromYahoo.js');
const checkForPopulate = require('./cli.js');

const main = async () => {
  const checkForStockPricePopulate = await checkForPopulate('stock price');
  if (checkForStockPricePopulate == 'y') { populatePriceData('stock'); }

  const checkForOtherPricePopulate = await checkForPopulate('other asset price');
  if (checkForOtherPricePopulate == 'y') { populatePriceData('other'); }

  const checkForEarningsDataPopulate = await checkForPopulate('stock earnings');
  if (checkForOtherPricePopulate == 'y') { populateEarnings(); }

  const checkForEconomicDataPopulate = await checkForPopulate('economic');
  if (checkForOtherPricePopulate == 'y') { populateEconomicData(); }
}

setTimeout(() => { //allow to connect to DBs before sending prompts
  main();
}, 1)


