var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var CORSMiddleware =  require('./lib/middlewares/CORSMiddleware'); 

var postsRoute = require('./routes/posts');
var indexRouter = require('./routes/index');

// setting up the connection to MongoDB server  
require('dotenv/config');
const DB_NAME = 'test_DB'
const MONGODB_URL = `mongodb+srv://${process.env.DB_CONNECTION}@mutual-aid.n2n9z.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

const mongoose = require('mongoose');
mongoose.connect(MONGODB_URL , {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })
    .then(() => console.log('DB Connected!'))
    .catch(err => {
        console.log(`DB Connection Error: ${err.message}`);
});


// return instance of the app
var app = express();


// setting up the middlewares  
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', CORSMiddleware);

// setting the routes
app.use('/', indexRouter);
app.use('/api/v1.0/posts', postsRoute);


module.exports = app;
