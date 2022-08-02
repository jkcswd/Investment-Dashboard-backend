const populatePriceData = require('./populateStocks.js')
const checkForPopulate = require('./cli.mjs')
// TODO: earnings data
// TODO: economic data
// TODO: other asset data

(function main (){
  const checkForStockPricePopulate = checkForPopulate('stock price');
  if (checkForStockPricePopulate == 'y') { populatePriceData(); }
})();
