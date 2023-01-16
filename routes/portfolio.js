const express = require('express');
const router = express.Router();
const portfolioController = require('../controllers/portfolioController');

router.get("/portfolio/:portfolioName", portfolioController.portfolioGet );
router.post("/portfolio/new", portfolioController.portfolioPost);

module.exports = router;