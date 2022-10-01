const { DataTypes } = require('sequelize');
const { db } = require('../databaseConnection');
const TickerList = require('./TickerList');

const EconomicData = db.define('EconomicData', {
  date:{ type: DataTypes.DATE },
  value:{ type: DataTypes.DOUBLE },
});

EconomicData.belongsTo(TickerList);

module.exports = EconomicData;