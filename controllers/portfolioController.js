const Portfolio = require('../models/Portfolio')


const portfolioGet = async (req,res,next) => {
  try {
    const data = await Portfolio.findOne({portfolioName: req.params.portfolioName})
        
    res.json(data);
  } catch (error) {
    console.log(error)
  }
}

module.exports = { portfolioGet };