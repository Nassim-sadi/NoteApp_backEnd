const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const path = require('path');
const connectDb = require('./config/db');
const { engine } = require('express-handlebars');
const passport = require('passport');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const app = express();
// Body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//load config
dotenv.config({ path: './config/config.env' });
//passport config
require('./config/passport')(passport);
//connect to Database
connectDb();
//View Engine
app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.set('views', './views');

//logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
//session
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      ttl: 14 * 24 * 60 * 60, // = 14 days. Default
    }),
  })
);
//session
app.use(passport.initialize());
app.use(passport.session());
//Routes
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));
app.use('/notes', require('./routes/notes'));
//static folder
app.use(express.static(path.join(__dirname + '/public')));

const port = process.env.PORT || 3000;

//start server
app.listen(
  port,
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${port}`
  )
);
