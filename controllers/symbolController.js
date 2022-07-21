const {db, query} = require("../database");

const symbolController = (req,res,next) => {
  const tickerSymbol = req.params.ticker;

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