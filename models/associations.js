const PriceData = require('./PriceData');
const EconomicData = require('./EconomicData');
const EarningsData = require('./EarningsData');
const TickerList = require('./TickerList')

TickerList.hasMany(PriceData);
TickerList.hasMany(EarningsData);
TickerList.hasMany(EconomicData);
EarningsData.belongsTo(TickerList);
EconomicData.belongsTo(TickerList);
PriceData.belongsTo(TickerList);


module.exports = { PriceData, EarningsData, EconomicData, TickerList }