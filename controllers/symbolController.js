const {db, query} = require("../database");

const symbolController = (req,res,next) => {
  const tickerSymbol = req.params.ticker;

  // add filtering in req.query for date to/from data 

  db.serialize( async () => {
    try {
      const data = await query(`SELECT * FROM ${tickerSymbol}`)
      
      res.json(data);
    } catch(err){
      res.status(400).json({"error":err.message});
    }
  });
}

module.exports = symbolController;