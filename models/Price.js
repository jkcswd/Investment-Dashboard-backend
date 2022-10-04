const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PriceSchema = new Schema({
  ticker: { type: Schema.Types.ObjectId, ref: 'Ticker' },
  date: { type: Date, required: false },
  open: { type: Number, required: false },
  high: { type: Number, required: false },
  low: { type: Number, required: false },
  close: { type: Number, required: false },
  adjClose: { type: Number, required: false },
  volume: { type: Number, required: false }
});

module.exports = mongoose.model('Price', PriceSchema);
