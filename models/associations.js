const PriceData = require('./PriceData');
const EconomicData = require('./EconomicData');
const EarningsData = require('./EarningsData');
const TickerList = require('./TickerList')

// The following models do not have relationships but are routed through this file for consistency of access.
const User = require('./User');

TickerList.hasMany(PriceData);
TickerList.hasMany(EarningsData);
TickerList.hasMany(EconomicData);
EarningsData.belongsTo(TickerList);
EconomicData.belongsTo(TickerList);
PriceData.belongsTo(TickerList);


module.exports = { PriceData, EarningsData, EconomicData, TickerList, User }