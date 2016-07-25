exports.main = function(req, res){
	res.render('home', {
		title: 'Express',
		description: 'This is main page',
		stylesheet: 'main/style.css',
	});
};

