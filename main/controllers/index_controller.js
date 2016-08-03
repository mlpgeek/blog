var Blog = require('mongoose').model('Blog');

exports.main = function(req, res){
    let templateData = {
		title: 'Express',
		description: 'This is main page',
		stylesheet: 'main/style.css',
	} 

    Blog.find({}, 'name createdBy createdAt')
        .sort({createdBy: -1})
        .populate('createdBy', 'username email _id')
        .exec((err, blogs) => {
            if(err) return next(err);
            return blogs;
        }).then((blogs)=>{
            templateData.blogs = blogs;
	        res.render('home', templateData );
        });
};

