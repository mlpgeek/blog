//user model
var Blog =require('mongoose').model('Blog'),
    Post = require('mongoose').model('Post');

exports.list = function(req, res, next){
    let templateData = {
        template: 'list',
        stylesheet: null, 
    };

    Blog.findOne({name: req.params.blogname, createdBy: req.params.userId})
        .select('name categories createdBy')
        .populate('categories.posts')
        .exec((err, blog) => {
            if(err) res.send(err);     
            templateData.blogName = blog.name;
            return blog;
        }).then((blog) =>{
            let category = blog.categories.find((category) => {
                return category.title === req.params.category;  
            });
            return category;
        }).then((category)=>{
            templateData.category = category;
            req.body.templateData = templateData;
            next();
        });
};

exports.create = function(req, res, next){
    Blog.findOne({name: req.params.blogname, createdBy: req.params.userId})
        .select('name categories')
        .exec((err, blog) => {
            if(err) res.send(err); 

            if(req.method === 'GET'){
                req.body.templateData = {
                    template: 'create',
                    stylesheet: null,
                    csrf: req.csrfToken(),
                    userId: req.user._id,
                    blogName: blog.name,
                    categories: blog.categories
                }
                next();
            } else if(req.method === 'POST'){
                let post = new Post();      

                post.title = req.body.title;
                post.content = req.body.content;
                post.createdby = req.user._id;
                post.modifiedAt= Date();

                post.save((err) => {
                    if(err) res.send(err); 
                    let category = blog.categories.id(req.body.select).title; 
                    blog.categories.id(req.body.select).posts.push(post._id);
                    blog.save((err)=>{
                        if(err) res.send(err);
                        res.redirect('/blog/' + req.user._id + '/'+ blog.name + '/' + category);
                    });
                });
            }
        });
};

exports.detail = function(req, res){
};

exports.render = function(req, res){
    var data = req.body.templateData;
	res.render('posts/' + data.template, data); 
};

