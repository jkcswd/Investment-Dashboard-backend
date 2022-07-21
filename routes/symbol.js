const express = require('express');
const router = express.Router();
const symbolController = require('../controllers/symbolController');

router.get("/:ticker", symbolController);

module.exports = router;