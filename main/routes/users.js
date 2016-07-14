var express = require('express');
var router = express.Router();
var controller = require('../controllers/user_controller');

/* GET users listing. */
router.get('/userlists', controller.userlist);

router.get('/signup', function(req, res, next) {
	res.render('users/signup',{ title: 'Sign up'});
});
router.post('/signup', controller.signup);

router.get('/:email', function(req, res, next) {
    res.render('users/detail', { output: req.params.id });
});

router.post('/submit', function(req, res, next) {
    var email = req.body.email;
    res.redirect('/users/' + email);
});

module.exports = router;
