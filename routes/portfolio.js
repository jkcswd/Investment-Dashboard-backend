const express = require('express');
const router = express.Router();
const portfolioController = require('../controllers/portfolioController');

router.get("/:portfolioName", portfolioController.portfolioGet );
router.patch("/:id", portfolioController.portfolioPatch );
router.delete("/:id", portfolioController.portfolioDelete );
router.post("/new", portfolioController.portfolioPost);

module.exports = router;