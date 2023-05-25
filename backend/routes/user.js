const express = require('express');
const router = express.Router();
const multer = require('../src/middleware/multer-config')

const userCtrl = require('../controller/user');

router.post('/signup',multer,userCtrl.signup)
router.post('/login',userCtrl.login);


module.exports = router;