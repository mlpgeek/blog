//user model
var User = require('mongoose').model('User');
var bcrypt = require('bcryptjs');

exports.register = function(req, res, next){
    if(req.method === 'GET'){
        req.body.templateData = {
            stylesheet : '/user/register.css',
            template : 'register'
        };
        next();
    }else if(req.method === 'POST'){
        //Validation
        req.checkBody('firstname', 'Firstname is required').notEmpty();
        req.checkBody('lastname', 'Lastname is required').notEmpty();
        req.checkBody('email', 'Email is required').notEmpty();
        req.checkBody('email', 'Email is\' not valid').isEmail();
        req.checkBody('password', 'password is required').notEmpty();
        req.checkBody('password_confirmation', 'passwords don\'t match').equals(req.body.password);

        var errors = req.validationErrors();
        if(errors){
            req.flash('error', errors);
            res.redirect('/users/register');
        } else{
            var newUser = new User({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                password: req.body.password
            });
           
            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(newUser.password, salt, function(err, hash) {
                    newUser.password = hash;
                    newUser.save(function(err, user){
                        if(err){
                            switch (err.code){
                                case 11000:
                                case 11001:    
                                    req.flash('error_msg', 'Email is already registered'); 
                                    break;
                                default:
                                    req.flash('error_msg', 'Something went Wrong');    
                            }
                            res.redirect('/users/register');
                        }else{
                            console.log(user);
                            req.flash('success_msg', 'You are registered can now signin'); 
                            res.redirect('/users/signin');
                        }  
                    });
                });
            });
        }
    }
};

exports.signin = function(req, res, next){
    req.body.templateData = {
        stylesheet : '/user/signin.css',
        template : 'signin'
    };
	next();
};

exports.signout = function(req, res){
    req.logout();
    req.flash('success_msg', 'You are signed out');
    res.redirect('/users/signin');
};

exports.profile = function(req, res, next){
    req.body.templateData = {
        stylesheet: null,  
        template: 'profile'
    };
    next();
};

exports.render = function(req, res){
    var data = req.body.templateData;
	res.render('users/' + data.template, data); 
};

exports.userlist = function(req, res, next){
	User.find(function(err, users){
		if(err){
			return next(err);
		} else{
			res.json(users);	
		}
	});
};
