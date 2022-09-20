var express = require('express');
var router = express.Router();

var mapsRouter = require('./routes/maps');
var usersRouter = require('./routes/users');

router.use('/maps', mapsRouter);
router.use('/users', usersRouter);

module.exports = router