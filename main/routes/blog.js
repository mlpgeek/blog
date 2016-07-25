var express = require('express');
var router = express.Router();
var controller = require('../controllers/blog_controller');
var isauthenticate = require('../auth/authenticate')

//blog list
router.get('/', isauthenticate.isAuthenticated, controller.list, controller.render);

//create
router.get('/create', isauthenticate.isAuthenticated, controller.create, controller.render);
router.post('/create', isauthenticate.isAuthenticated, controller.create, controller.render);

//detail
router.get('/:name', controller.detail, controller.render);
router.post('/:name', isauthenticate.isAuthenticated, controller.detail, controller.render);

module.exports = router;
