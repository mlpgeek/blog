//user model
var Post = require('mongoose').model('Post');

exports.create = function(req, res){
	var post = new Post();
	
	post.postNum = 0;
	post.title = req.body.title;
	post.content = req.body.content;

	post.save();
};

exports.list = function(req, res, next){
	Post.find(function(err, posts){
		if(err){
			return next(err);	
		} else {
			req.posts = posts;
			next();
		}
	});	
};

exports.update = function(res, req, next){
		
};

exports.remove = function(res, req){
	
};

exports.detail = function(res, req){
	
};

exports.render = function(res, req){
			
};
