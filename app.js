var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session'); //  Add session
require('dotenv').config();
const { connectToMongodb } = require('./config/db.js');
const http = require('http');

// Routers
var usersRouter = require('./routes/usersRouter.js');
var osRouter = require('./routes/osRouter.js');
var carRouter = require('./routes/carRouter.js');
var GeminiRouter = require('./routes/GeminiRouter.js');

var app = express(); // Instance with express

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Add session middleware BEFORE the routes
app.use(
    session({
        secret: 'your_secret_key', // Change this secret for production
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false, httpOnly: true },
    })
);

// Routes
app.use('/users', usersRouter);
app.use('/os', osRouter);
app.use('/car', carRouter);
app.use('/Gemini', GeminiRouter);

// 404 handler
app.use(function (req, res, next) {
    next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.json({ message: err.message, error: err.stack });
});

// Server setup
const server = http.createServer(app);
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    connectToMongodb();
    console.log("app is running on port 5000");
});
