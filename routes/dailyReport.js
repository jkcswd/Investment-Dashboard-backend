const express = require('express');
const router = express.Router();
const dailyReportController = require('../controllers/dailyReportController');

router.get("/daily-report", dailyReportController);

module.exports = router;