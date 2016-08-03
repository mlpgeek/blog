//user model
var Blog = require('mongoose').model('Blog');

exports.list = function(req, res, next){
    let templateData = {
        template: 'list',
        stylesheet: null
    }
    let fields = 'name description createdBy createdAt';
    
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

        blog.save((err, newBlog) =>{
            if(err){
                req.flash('error_msg', err.code);
                res.send(err);
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
        isOwned: false,
        csrf: req.csrfToken()
    }

    let blogName = req.params.blogname,
        userId = req.params.userId;
    
    Blog.findOne({name: blogName, createdBy: userId})
        .select('-categories._id -categories.posts')
        .populate('createdBy', 'username email')
        .exec((err, blog) =>{
            if(err){
                req.flash('error_msg', err.code); 
                res.redirect('/');
            } else {
                if(!blog){ 
                    res.status(404).render('error', {message: 'Not Found', error: '404' });
                }else{
                    if(req.user) {
                        templateData.isOwned = blog.createdBy.equals(req.user._id);  
                    }
                    templateData.blog = blog;
                    templateData.userId = userId;
                    req.body.templateData = templateData;
                    next();
                };
            }
    });
};


exports.modify= function(req, res, next){
    let templateData = {
        template : 'modify',
        stylesheet : null 
    }
    let blogName = req.params.blogname, 
        userId = req.params.userId,
        fields = 'name description createdBy';

    Blog.findOne({name: blogName, createdBy: userId}, fields, (err, blog)=>{
        if(err || !blog.createdBy.equals(req.user._id)) return next(err);

        if(req.method === 'GET'){
            templateData.csrf = req.csrfToken(); 
            templateData.userId = userId;
            templateData.blog = blog; 
            req.body.templateData = templateData;
            next();
        } else if(req.method === 'POST'){
            blog.name = req.body.name;
            blog.description = req.body.description;

            blog.save((err, updatedBlog) => {
                if(err){
                    req.flash('error_msg', 'Error occurred'); 
                    res.redirect('/blog/'+ blog.createdBy + '/' + blog.name + '/modify');
                } else {
                    req.flash('success_msg', 'You modified ' + updatedBlog.name + ' successfully!'); 
                    res.redirect('/blog/' + updatedBlog.createdBy + '/' + updatedBlog.name);
                }
            });
        }
    }); 
};

exports.remove = function(req, res){
    let blogName = req.params.blogname,
        userId = req.params.userId; 
    Blog.findOne({ name: blogName, createdBy: userId})
        .populate('createdBy')
        .exec((err, blog) => {
            if(err || !blog.createdBy.equals(req.user._id)) return next(err); 
            blog.remove((err) => {
                if(err) next(err); 
                res.redirect('/blog');
            });
        });
};

exports.createCategory = function(req, res){
    Blog.findOne({createdBy: req.user._id, name: req.params.blogname}, 'name categories')
        .exec((err, blog) =>{
            if(err) next(err);
            blog.categories.push({title: req.body.category});  
            blog.save((err)=>{
                res.redirect('/blog/' + req.user._id + '/' + blog.name);
            });
        });
}
exports.removeCategory = function(req, res){
    Blog.find({createdBy: req.user._id, name: req.params.blogname})
        .select('name categories')
        .exec((err, blog) =>{
            if(err) next(err);
            for(let i=0; i<blog.categories.length; i++){
                if(blog.categories[i].title === req.params.category && blog.categories[i].posts.length != 0){
                    blog.categories.splice(i,1); 
                    req.flash('success_msg', 'Cateogry was removed successfully');
                    res.redirect('/blog/' + req.user._id + '/' + blog.name);
                    blog.save((err) => {
                        return next(err); 
                    });
                    break;
                }
            }
            
        });

}

exports.render = function(req, res){
    var data = req.body.templateData;
	res.render('blogs/' + data.template, data); 
};
