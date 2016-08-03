module.exports.isAuthenticated = function(req, res, next){
    if(req.isAuthenticated()){ 
        return next();
    }else{
        req.flash('error_msg', 'You are not signed in');  
        res.redirect('/users/signin');
    }
};

module.exports.isOwned = function(req, res, next){
    if(req.user._id.equals(req.params.userId)){
        next(); 
    } else {
        req.flash('error_msg', 'You are not permitted to access this page'); 
        res.redirect('/');
    }
};
