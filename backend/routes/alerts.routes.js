const express = require('express');
const router = express.Router();
const alert = require('../controllers/alerts.controller.js');

router.post('/newLowAlert', alert.newLowPriceAlert);

router.post('/newHighAlert', alert.newHighPriceAlert);

module.exports = router;
