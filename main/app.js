var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser');
var flash = require('connect-flash');
var expressValidator = require('express-validator');
var expressSession = require('express-session');
var config = require('./config/config');
var mongoose = require('./config/mongoose');
var db = mongoose();
var passportConfig = require('./config/passport');
var passport = passportConfig();

//routes
var index = require('./routes/index');
var users = require('./routes/users');
var post = require('./routes/post');
var test = require('./routes/test');


//init app
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//logger
app.use(logger('dev'));

//parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//public directory
app.use('/static', express.static(path.join(__dirname, 'static')));

//express session 
//must be restored befor passport.session()
app.use(expressSession({
	secret: config.sessionSecret, 
	saveUninitialized: true, 
	resave:true 
}));

//passport 
app.use(passport.initialize());
app.use(passport.session());

//express validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.'),
          root    = namespace.shift(),
          formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

//connect-flash
app.use(flash());

//global variables
app.use(function(req, res, next){
	res.locals.success_msg = req.flash('success_msg');
	res.locals.error_msg = req.flash('error_msg');
	res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
	next();	
});


//routes
app.use('/', index);
app.use('/users', users);
app.use('/post', post);
app.use('/test', test);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
