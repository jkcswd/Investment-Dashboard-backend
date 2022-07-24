// Purpose: 
//  (on every query request) 
//  To check if current data in DB is up to date with current date
//    If not then update data before sending response to client

const {db, query} = require("./database.js");

const databaseDate = () => {
  db.serialize( async () =>{
    try {
      const date = await query('SELECT * FROM utility_data');

      return date;
    } catch (err) {
      console.log(err.message)
      return;
    }
  })
}

const extractDateString = (date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${year}-${month}-${day}`;
}

const dataDownload = async () => {
  const dateNow = new Date(Date.now());
  const databaseDate = await databaseDate();
  const dateString = extractDateString(dateNow);

  console.log(databaseDate)
  console.log(dateString)
}




dataDownload();

module.export = dataDownload
