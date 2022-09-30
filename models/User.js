const { DataTypes } = require('sequelize');
const { db } = require('../databaseConnection');

const User = db.define('User', {
  username:{ type: DataTypes.STRING },
  email:{ type: DataTypes.STRING }
})

module.exports = User;