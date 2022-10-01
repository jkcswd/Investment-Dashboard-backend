const { DataTypes } = require('sequelize');
const db  = require('../databaseConnection');
const TickerList = require('./TickerList');

const EarningsData = db.define('EarningsData', {
  date:{ type: DataTypes.DATE },
  epsActual:{ type: DataTypes.DOUBLE },
  epsEstimate:{ type: DataTypes.DOUBLE },
});

EarningsData.belongsTo(TickerList);

module.exports = EarningsData;