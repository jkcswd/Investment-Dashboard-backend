const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const EarningsPerShareSchema = new Schema({
  tickerId: { type: Schema.Types.ObjectId, ref: 'Ticker' },
  ticker: { type: String, required: false },
  date: { type: Date, required: false },
  epsActual: { type: Number, required: false },
  epsEstimate:{ type: Number, required: false }
});

module.exports = mongoose.model('EarningsPerShare', EarningsPerShareSchema);