const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PriceSchema = new Schema({
  tickerId: { type: Schema.Types.ObjectId, ref: 'Ticker' },
  ticker: { type: String, required: false },
  date: { type: Date, required: false },
  open: { type: Number, required: false },
  high: { type: Number, required: false },
  low: { type: Number, required: false },
  close: { type: Number, required: false },
  adjClose: { type: Number, required: false },
  volume: { type: Number, required: false }
});

PriceSchema.index({ ticker: 1, date: 1}, { unique: true });

module.exports = mongoose.model('Price', PriceSchema);
