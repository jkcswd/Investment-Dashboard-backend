const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Ticker = new Schema({
  ticker: { type: String, required: true, unique: true},
  type: { type: String, required: true },
  dataSource: { type: String, required: true }
});

module.exports = mongoose.model('Ticker', Ticker);
