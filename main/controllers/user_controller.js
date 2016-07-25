//user model
var User = require('mongoose').model('User');
var bcrypt = require('bcryptjs');

exports.register = function(req, res, next){
    if(req.method === 'GET'){
        req.body.templateData = {
            stylesheet : '/user/register.css',
            template : 'register',
            csrf : req.csrfToken()
        };
        next();
    }else if(req.method === 'POST'){
        //Validation
        req.checkBody('name', 'name is required').notEmpty();
        req.checkBody('username', 'username is required').notEmpty();
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
                name: req.body.name,
                username: req.body.username,
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
        template : 'signin',
        csrf: req.csrfToken()
    };

    if(req.method === 'POST'){
        req.checkBody('email', 'email is required').notEmpty();
        req.checkBody('password', 'passowrd is required').notEmpty();

        var errors = req.validationErrors();
        if(errors){
            req.flash('error_msg', 'fill the forms'); 
            res.redirect('/users/signin');
        }
    }
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

exports.remove = function(req, res, next){
    console.log('abc');
    User.remove({_id: req.user._id}, (err) => {
        if(err){
            req.flash('error_msg', 'Error occured!');
            res.redirect('/users/profile');
        }else{
            req.flash('Your info was deleted from site');
            res.redirect('/');    
        }
    });    
}

exports.render = function(req, res){
    var data = req.body.templateData;
	res.render('users/' + data.template, data); 
};
