var passport = require('passport'),
    localStrategy = require('passport-local');
var User = require('mongoose').model('User');

module.exports = function(){
    passport.use(new localStrategy(
        {usernameField: 'email', passwordField: 'password'},
        function(email, password, done) {
            User.findOne({ email: email }, function (err, user) {
                if(err) throw err;
                if(!user) {return done(null, false, {message: 'Unknown User'});}

                user.comparePassword(password, function(err, isMatch){
                    if(err) {throw err;}  
                    if(isMatch){
                        return done(null, user); 
                    }else{
                        return done(null, false, {message: 'Invalid Password'});
                    }
                });
            });
        }
    ));

    passport.serializeUser(function(user, done) {
      done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
      User.findById(id, function(err, user) {
        done(err, user);
      });
    });

    return passport;
};
