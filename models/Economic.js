const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const EconomicSchema = new Schema({
  tickerId: { type: Schema.Types.ObjectId, ref: 'Ticker' },
  ticker: { type: String, required: false },
  date: { type: Date, required: false },
  value: { type: Number, required: false },
});

EconomicSchema.index({ ticker: 1, date: 1}, { unique: true });
// Compound index with unique constraint to stop multiple writes of same data 
// and improve reads as will generally be filtered on these fields.

module.exports = mongoose.model('Price', PriceSchema);