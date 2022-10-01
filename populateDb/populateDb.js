const populatePriceData = require('./populatePriceData.js');
const populateTickerListAll = require('./populateTickerList');
const populateEarningsData = require('./populateEarnings')
//const populateEconomicData = require('./populateEconomicData')
const checkForPopulate = require('./cli.js');

const main = async () => {
  const checkForTickerListPopulate = await checkForPopulate('ticker list')
  const checkForPricePopulate = await checkForPopulate('stock and other asset price data');
  const checkForEarningsDataPopulate = await checkForPopulate('stock earnings');
  //const checkForEconomicDataPopulate = await checkForPopulate('economic');

  if (checkForTickerListPopulate == 'y') { await populateTickerListAll(); }
  if (checkForPricePopulate == 'y') { await populatePriceData(); }
  if (checkForEarningsDataPopulate== 'y') { await populateEarningsData(); }
  //if (checkForEconomicDataPopulate == 'y') { await populateEconomicData(); }
}

main();
