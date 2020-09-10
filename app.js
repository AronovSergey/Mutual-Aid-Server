var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv/config');

var MulterMiddleware = require('./middlewares/MulterMiddleware');
var CORSMiddleware =  require('./middlewares/CORSMiddleware'); 
var ImageMiddleware = require('./middlewares/ImageMiddleware');

//Import Routes
var postsRouter = require('./routes/posts');
var indexRouter = require('./routes/index');
var imagesRouter = require('./routes/images');
var authRouter = require('./routes/auth');

// setting up the connection to MongoDB server  
const DB_NAME = 'test_DB'
const MONGODB_URL = `mongodb+srv://${process.env.DB_CONNECTION}@mutual-aid.n2n9z.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;
const mongoose = require('mongoose');
mongoose.connect(MONGODB_URL , {
        useUnifiedTopology: true,
        useCreateIndex: true,
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
app.use('/api', CORSMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/v1.0/images', MulterMiddleware.single('image'), ImageMiddleware);

// setting the routes midllewares
app.use('/', indexRouter);
app.use('/api/v1.0/posts', postsRouter);
app.use('/api/v1.0/images', imagesRouter);
app.use('/api/v1.0/user', authRouter);

module.exports = app;
