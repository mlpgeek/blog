//user model
exports.test = function(req, res, next){
};

exports.render = function(req, res){
	res.render('test/test', {
		test1: req.body.fuck,
		test2: "fuck2"	
	});	
};

