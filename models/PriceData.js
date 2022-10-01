const { DataTypes } = require('sequelize');
const  db  = require('../databaseConnection');

const PriceData = db.define('PriceData', {
  date: { type: DataTypes.DATE },
  open:{ type: DataTypes.DOUBLE },
  high:{ type: DataTypes.DOUBLE },
  low:{ type: DataTypes.DOUBLE },
  close:{ type: DataTypes.DOUBLE },
  volume:{ type: DataTypes.BIGINT }
});

module.exports = PriceData;