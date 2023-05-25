const express = require('express');
const router = express.Router();

const gigCtrl = require('../controller/gig');

router.get('',gigCtrl.getGigs)

module.exports = router;