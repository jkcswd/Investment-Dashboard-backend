const populateFromYahooData = require('./populateFromYahoo.js');
const populateTickerListAll = require('./populateTickerList');
const populateEarningsData = require('./populateEarnings')
const populateEconomicData = require('./populateEconomicData')
const checkForPopulate = require('./cli.js');

const main = async () => {
  const checkForTickerListPopulate = await checkForPopulate('ticker list')
  const checkForStockPricePopulate = await checkForPopulate('stock price');
  const checkForOtherPricePopulate = await checkForPopulate('other asset price');
  const checkForEarningsDataPopulate = await checkForPopulate('stock earnings');
  const checkForEconomicDataPopulate = await checkForPopulate('economic');

  if (checkForTickerListPopulate == 'y') { await populateTickerListAll('stocks'); }
  if (checkForStockPricePopulate == 'y') { await populateFromYahooData('stocks'); }
  if (checkForOtherPricePopulate == 'y') { await populateFromYahooData('other'); }
  if (checkForEarningsDataPopulate== 'y') { populateEarningsData(); }
  if (checkForEconomicDataPopulate == 'y') { populateEconomicData(); }
}

main();
