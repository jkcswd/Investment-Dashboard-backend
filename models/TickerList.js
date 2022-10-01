const { DataTypes } = require('sequelize');
const  db  = require('../databaseConnection');
const PriceData = require('./PriceData');
const EconomicData = require('./EconomicData');
const EarningsData = require('./EarningsData');

const TickerList = db.define('TickerList', {
  ticker:{ type: DataTypes.STRING },
  type:{ type: DataTypes.STRING },
  dataSource:{ type: DataTypes.STRING }
});

TickerList.hasMany(PriceData);
TickerList.hasMany(EarningsData);
TickerList.hasMany(EconomicData);
EarningsData.belongsTo(TickerList);
EconomicData.belongsTo(TickerList);
PriceData.belongsTo(TickerList);

module.exports = TickerList;