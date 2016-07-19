var express = require('express');
var router = express.Router();
var passport = require('passport');
var controller = require('../controllers/user_controller');
var isauthenticate = require('../auth/authenticate.js');

//register
router.get('/register', controller.register, controller.render);
router.post('/register', controller.register, controller.render);

//signin
router.get('/signin', controller.signin, controller.render);
router.post('/signin', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/users/signin', failureFlash: true }), function(req,res){
    res.redirect('/');
});

//signout
router.get('/signout', controller.signout);

//user profile 
router.get('/profile', isauthenticate.isAuthenticated, controller.profile, controller.render);

//user list
router.get('/userlist', controller.userlist);


module.exports = router;
