const Price = require('../models/Price')

const symbolController = async (req,res,next) => {
  const ticker = req.params.ticker.toUpperCase();
  let from = req.query.from;
  let to = req.query.to;

  if(!from) {
    from = '1900-01-01'
  }

  if (!to) {
    to = new Date();
  }
  
  try {
    const data = await Price.find({ ticker, date:{ $gte: from, $lte: to }}, '-__v -_id -tickerId')
        
    res.json(data);
  } catch (error) {
    console.log(error)
  }
}

module.exports = symbolController;
