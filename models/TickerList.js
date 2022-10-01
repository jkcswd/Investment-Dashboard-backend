const { DataTypes } = require('sequelize');
const  db  = require('../databaseConnection');

const TickerList = db.define('TickerList', {
  ticker:{ type: DataTypes.STRING },
  type:{ type: DataTypes.STRING },
  dataSource:{ type: DataTypes.STRING }
});


module.exports = TickerList;