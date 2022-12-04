const DailyReport = require('../models/DailyReport')

const dailyReportController = async (req,res,next) => {
  try {
    const data = await DailyReport.find().sort({ date: -1 }).limit(1)
        
    res.json(data);
  } catch (error) {
    console.log(error)
  }
}

module.exports = dailyReportController;