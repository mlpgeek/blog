//user model
exports.main = function(req, res, next){
    req.body.templateData = {
        template: 'test/main',
        name: 'hyun',
        title: 'MLP' 
    }
    next();
};

exports.render = function(req, res){
    var data = req.body.templateData;
	res.render(data.template, data);
};

