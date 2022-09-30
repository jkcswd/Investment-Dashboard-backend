const { DataTypes } = require('sequelize');
const { db } = require('../databaseConnection');

const PriceData = db.define('PriceData', {
  open:{ type: DataTypes.DOUBLE },
  high:{ type: DataTypes.DOUBLE },
  low:{ type: DataTypes.DOUBLE },
  close:{ type: DataTypes.DOUBLE },
  volume:{ type: DataTypes.BIGINT }
})

module.exports = PriceData;