var express = require('express');
var router = express.Router();
var controller = require('../controllers/post_controller.js');


router.post('/posts', controller.create, controller.render);

router.get('/posts', controller.list, controller.render);

router.get('/:number', controller.detail, controller.render);

router.put('/:number', controller.update, controller.render);

module.exports = router;
