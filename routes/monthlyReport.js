const express = require('express');
const router = express.Router();
const monthlyReportController = require('../controllers/monthlyReportController');

router.get("/monthly-report", monthlyReportController);

module.exports = router;