const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const EarningsData = db.define('EarningsData', {
  tickerId: { type: Schema.Types.ObjectId, ref: 'Ticker' },
  ticker: { type: String, required: false },
  date:{ type: DataTypes.DATE },
  epsActual:{ type: DataTypes.DOUBLE },
  epsEstimate:{ type: DataTypes.DOUBLE },
});

module.exports = EarningsData;