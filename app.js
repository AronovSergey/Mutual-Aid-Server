var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var CORSMiddleware =  require('./lib/middlewares/CORSMiddleware'); 

var postsApi = require('./routes/posts');
var indexRouter = require('./routes/index');

var app = express();

app.use(logger('dev'));
app.use('/api', CORSMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/v1.0/posts', postsApi);


module.exports = app;
