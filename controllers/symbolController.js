const {priceDb, query} = require("../database");

const symbolController = async (req,res,next) => {
  const tickerSymbol = req.params.ticker;
  const from = req.query.from;
  const to = req.query.to;

  try {
    if (from || to) {
      if (!from) {
        const data = await query(priceDb,`SELECT * FROM ${tickerSymbol} WHERE date <= '${to}'`);

        res.json(data);
      } else if (!to) {
        const data = await query(priceDb,`SELECT * FROM ${tickerSymbol} WHERE date >='${from}'`);

        res.json(data);
      }else {
        const data = await query(priceDb,`SELECT * FROM ${tickerSymbol} WHERE date >='${from}' AND date <= '${to}'`);

        res.json(data);
      }
    }else {
      const data = await query(priceDb,`SELECT * FROM ${tickerSymbol}`);
    
      res.json(data);
    }
  } catch(err){
    res.status(400).json({"error":err.message});
  }
}

module.exports = symbolController;
