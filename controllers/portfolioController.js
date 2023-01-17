const Portfolio = require('../models/Portfolio')

const portfolioGet = async (req,res,next) => {
  try {
    const data = await Portfolio.findOne({portfolioName: req.params.portfolioName})
        
    res.json(data);
  } catch (error) {
    console.log(error)
  }
}

const portfolioPost = async (req,res,next) => {
  try {
    try {
      const portfolio = new Portfolio({
        portfolioName: req.body.portfolioName,
        dateOpened: new Date(),
        initialCapital: req.body.capital,
        currentCapital: req.body.capital
      });
  
      await portfolio.save();

      res.json({"Data Uploaded": req.body.portfolioName})
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error)
  }
}


const portfolioPatch = async (req,res,next) => {
  try {
    Portfolio.findByIdAndUpdate(req.params.id, req.body);

    res.json({"message": `Updated Portfolio: ${req.params.id}`})
  } catch (error) {
    console.log(error)
  }
}


const portfolioDelete = async (req,res,next) => {
  try {
    Portfolio.findByIdAndDelete(req.params.id)
  } catch (error) {
    console.log(error)
  }
}

module.exports = { portfolioGet, portfolioPost, portfolioDelete, portfolioPatch };