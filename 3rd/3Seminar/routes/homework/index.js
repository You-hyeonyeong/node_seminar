var express = require('express');
var router = express.Router();

router.use('/3hw', require('./3hw'))

module.exports = router;
