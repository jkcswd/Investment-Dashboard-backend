var sqlite3 = require('sqlite3').verbose()

const createDb = (dbName) => {
  const db = new sqlite3.Database(dbName, (err) => {
    if (err) {
      console.error(err.message)
      throw err
    }else{
      console.log(`Connected to the ${dbName} SQLite database.`)
    }
  });

  return db;
}

const query = (db, command, driverMethod = 'all') => {
  //Promise wrapper function for queries as callbacks are messy and can then use async/await in db.serialize.
  return new Promise((resolve, reject) => {
    db[driverMethod](command, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

const utilDb = createDb('util_data.db');
const priceDb = createDb('price_data.db');
const earningsDb = createDb('earnings_data.db');
const economicDb = createDb('economic_data.db');


module.exports = { utilDb, priceDb, earningsDb , economicDb, query };