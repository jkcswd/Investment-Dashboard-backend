const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const EarningsPerShareSchema = new Schema({
  tickerId: { type: Schema.Types.ObjectId, ref: 'Ticker' },
  ticker: { type: String, required: false },
  date: { type: Date, required: false },
  epsActual: { type: Number, required: false },
  epsEstimate:{ type: Number, required: false }
});

EarningsPerShareSchema.index({ ticker: 1, date: 1}, { unique: true });
// Compound index with unique constraint to stop multiple writes of same data 
// and improve reads as will generally be filtered on these fields.

module.exports = mongoose.model('EarningsPerShare', EarningsPerShareSchema);