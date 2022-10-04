const { DataTypes } = require('sequelize');
const  db  = require('../databaseConnection');

const EconomicData = db.define('EconomicData', {
  tickerId: { type: Schema.Types.ObjectId, ref: 'Ticker' },
  ticker: { type: String, required: false },
  date:{ type: DataTypes.DATE },
  value:{ type: DataTypes.DOUBLE },
});

module.exports = EconomicData;