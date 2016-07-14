//user model
var User = require('mongoose').model('User');
exports.signup = function( req, res){
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




//exports.signup = function(req, res, next){
//	res.render('users/signup', {
//		title: "Sign up"	
//	});
//};
