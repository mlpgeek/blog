var express = require('express');
var app = express();
var route = require('./route');
var path = require('path');

app.use('view engine', 'ejs');

