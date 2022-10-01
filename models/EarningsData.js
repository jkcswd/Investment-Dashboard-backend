const { DataTypes } = require('sequelize');
const db  = require('../databaseConnection');

const EarningsData = db.define('EarningsData', {
  date:{ type: DataTypes.DATE },
  epsActual:{ type: DataTypes.DOUBLE },
  epsEstimate:{ type: DataTypes.DOUBLE },
});

module.exports = EarningsData;