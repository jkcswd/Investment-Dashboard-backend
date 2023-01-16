const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PortfolioSchema = new Schema({
  portfolioName: { type: String, required: false },
  dateOpened: { type: Date, required: false },
  initalCapital: { type: Number, required: false },
  currentCapital: { type: Number, required: false },
});

module.exports = mongoose.model('Portfolio', PortfolioSchema);