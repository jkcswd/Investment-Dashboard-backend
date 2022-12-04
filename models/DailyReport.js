const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const DailyReportSchema = new Schema({
  date: { type: Date, required: true },
  marketPercentageMove: { type: Number, required: true },
  largestGainer: { ticker: {type: String, required: true }, percentage: {type: Number, required: true}},
  largestLooser: { ticker: {type: String, required: true }, percentage: {type: Number, required: true}}
});

module.exports = mongoose.model('DailyReport', DailyReportSchema);