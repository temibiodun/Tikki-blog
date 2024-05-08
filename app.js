require('dotenv').config();

const express = require('express');
const expressLayout = require('express-ejs-layouts');
const methodOverride = require('method-override');
const jwt = require('jsonwebtoken');

const cookieParser = require('cookie-parser');
const session = require('express-session');

const MongoStore = require('connect-mongo');
const winston = require('winston');

const connectDB = require('./server/config/db');

const { isActiveRoute } = require('./server/helpers/routeHelpers');


const app = express();

const PORT = 3790 || process.env.PORT;

// connect to db
connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride('_method'));

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI
    }),
// cookie: { maxAge: new Date ( Date.now() + (3600000) ) } 

}));

app.use(express.static('public'));

app.use(expressLayout);
app.set('layout','./layouts/main');
app.set('view engine', 'ejs');


app.locals.isActiveRoute = isActiveRoute; 




app.use('/', require('./server/routes/main'));
app.use('/', require('./server/routes/admin'));


//   // Increment the read_count by 1
//   blog.read_count = parseInt(blog.read_count) + 1;
//   await blog.save();
// Error Handling
app.use((req, res, next) => {
    logger.info(`${req.method} ${req.originalUrl} ${req.ip}`);
    next();
  });


  app.use((err, req, res, next) => {
    logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    // Handle errors and send a response
    res.status(err.status || 500).send(err.message || 'Internal Server Error');
  });

 

app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
}
);


