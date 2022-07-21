var sqlite3 = require('sqlite3').verbose()

const db = new sqlite3.Database('db.sqlite', (err) => {
  if (err) {
    console.error(err.message)
    throw err
  }else{
    console.log('Connected to the SQLite database.')
  }
});

const query = (command, method = 'all') => {
  //Promise wrapper function for queries as callbacks are messy.
  return new Promise((resolve, reject) => {
    db[method](command, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};


module.exports = { db, query };