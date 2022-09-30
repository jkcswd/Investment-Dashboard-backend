const { DataTypes } = require('sequelize');
const { db } = require('../databaseConnection');

const EconomicData = db.define('EconomicData', {
  date:{ type: DataTypes.DATE },
  value:{ type: DataTypes.DOUBLE },
})

module.exports = EconomicData;