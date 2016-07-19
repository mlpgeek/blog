var express = require('express');
var router = express.Router();
var controller = require('../controllers/test_controller.js');


router.get('/', controller.test, controller.render);

//router.get('/', controller.list, controller.render);


module.exports = router;
