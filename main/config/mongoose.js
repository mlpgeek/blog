var config = require('./config'),
    mongoose = require('mongoose'),
    fs = require('fs');

module.exports = function(){
    mongoose.Promise = require('bluebird');
	var db = mongoose.connect(config.db);

	//load all files in models dir
	fs.readdirSync(__dirname + '/../models').forEach(function(filename){
		if(filename.indexOf('.js')) require('../models/' + filename); 
	}); 
	
	return db;
};
