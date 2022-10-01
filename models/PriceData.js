const { DataTypes } = require('sequelize');
const { db } = require('../databaseConnection');
const TickerList = require('./TickerList');

const PriceData = db.define('PriceData', {
  open:{ type: DataTypes.DOUBLE },
  high:{ type: DataTypes.DOUBLE },
  low:{ type: DataTypes.DOUBLE },
  close:{ type: DataTypes.DOUBLE },
  volume:{ type: DataTypes.BIGINT }
});

PriceData.belongsTo(TickerList);

module.exports = PriceData;