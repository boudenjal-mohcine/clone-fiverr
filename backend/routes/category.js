const express = require('express');
const router = express.Router();

const categoryCtrl = require('../controller/category');

router.get('',categoryCtrl.getCategories)

module.exports = router;