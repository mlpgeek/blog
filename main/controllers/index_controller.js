exports.main = function(req, res, next){
	//last visit time log
	if(req.session.lastVisit){
		console.log("last visit time for this client is : " + req.session.lastVisit);
	}
	
	//set last visit time
	var time = new Date();
	req.session.lastVisit = time.getFullYear()+"-"+(time.getMonth()+1)+"-"+time.getDate()+" .. "+time.getHours()+"-"+time.getMinutes()+"-"+time.getSeconds();

	res.render('home', {
		title: 'Express',
		description: 'This is main page'	
	});
};

