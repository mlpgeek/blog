//user model
var Blog = require('mongoose').model('Blog');

exports.list = function(req, res, next){
    let templateData = {
        template: 'list',
        stylesheet: null
    }
    let fields = 'name description createdAt';
    
    Blog.find({createdBy: req.user._id}, fields, function(err, blogs){
        if(err){
            return next(err);
        }
        templateData.blogs = blogs;
        req.body.templateData = templateData;
        //Because of Async, you need to call next() in the block. 
        next()
    });	
    
};

exports.create = function(req, res, next){
    if(req.method === 'GET'){
        req.body.templateData = {
            template: 'create',
            stylesheet: null,
            csrf: req.csrfToken()
        } 
        next();
    } else if(req.method === 'POST'){
        let blog = new Blog();
        blog.name = req.body.name;
        blog.description = req.body.description;
        blog.modifiedAt= Date();
        blog.createdBy = req.user._id;

        blog.save((err, blog) =>{
            if(err){
                req.flash('error_msg', err.code);
                res.redirect('/blog/create');
            } else{
                req.flash('success_msg', "Your blog was created successfully");
                res.redirect('/blog');
            }
        });
    }
};

exports.detail = function(req, res, next){
    let templateData = {
        template: 'detail',
        stylesheet: null,
        isOwned: false
    }

    let blogName = req.params.name;
    console.log(blogName);
    Blog.findOne({name: blogName}, (err, blog) =>{
        if(err){
            req.flash('error_msg', err.code); 
            res.redirect('/blog');
        } else {
            if(req.user) {
                templateData.isOwned = (req.user._id === blog.createdBy) ? true : false;  
            }
            templateData.blog = blog;
            console.log(blog);
            req.body.templateData = templateData;
            next();
        }
    });
};


exports.update = function(req, res, next){
		
};

exports.remove = function(req, res){
	
};


exports.render = function(req, res){
    var data = req.body.templateData;
	res.render('blogs/' + data.template, data); 
};
