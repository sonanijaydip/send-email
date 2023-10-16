var express = require('express');
var router = express.Router();

var user = require('../controller/usercontroller')

/* GET home page. */

router.post('/insert', user.register)
router.post('/check_otp', user.check_otp)

module.exports = router;
