const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Ticker = new Schema({
  ticker: { type: String, required: true },
  type: { type: String, required: true },
  dataSource: { type: String, required: true },
  earnings: [{ type: Schema.Types.ObjectId, ref: 'Earnings', required: false }],
  price: [{ type: Schema.Types.ObjectId, ref: 'Price', required: false }],
  economic: [{ type: Schema.Types.ObjectId, ref: 'Economic', required: false }]
});

module.exports = mongoose.model('Ticker', Ticker);
