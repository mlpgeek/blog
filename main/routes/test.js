var express = require('express');
var router = express.Router();
var controller = require('../controllers/test_controller.js');


router.get('/', controller.main, controller.render);

module.exports = router;
