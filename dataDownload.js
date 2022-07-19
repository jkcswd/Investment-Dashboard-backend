// Purpose: 
//  (on every query request) 
//  To check if current data in DB is up to date with current date
//    If not then update data before sending response to client

//TODO fix it
db = require("./database.js");



const dataDownload = () => {
  const dateNow = new Date(Date.now());
  const databaseDate = databaseDate();

  if (dateNow === databaseDate ) {

  }
  return databaseDate
}
function databaseDate() {
  var sql = "SELECT 'last update' FROM 'utility data'"
  var params = []
  
  db.all(sql, params, (err, rows) => {
      if (err) {
        res.status(400).json({"error":err.message});
        return;
      }
      return rows;
  });
}




module.export = dataDownload