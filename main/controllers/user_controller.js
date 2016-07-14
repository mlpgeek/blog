//user model
var User = require('mongoose').model('User');
exports.signup = function(req, res, next){
	var user = new User(req.body);

	user.save(function(err){
		if(err){
			console.log("abc");
			return err;
		}else{
			res.json(user);	
		} 
	});
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


