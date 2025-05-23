var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session'); //  Add session
require('dotenv').config();
const cors = require("cors");
const { connectToMongodb } = require('./config/db.js');
const http = require('http');


// Routers
var usersRouter = require('./routes/usersRouter.js');
var osRouter = require('./routes/osRouter.js');
var carRouter = require('./routes/carRouter.js');
var GeminiRouter = require('./routes/GeminiRouter.js');
var CommentRouter = require('./routes/CommentRouter.js');
var paymentRouter = require('./routes/paymentRouter.js');
var messagesRouter=require('./routes/messagesRouter.js')

var app = express(); // Instance with express

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())
  
// Add session middleware BEFORE the routes
app.use(session({   //cobfig session
    secret: "net secret pfe",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: {secure: false},
      maxAge: 24*60*60,
    },  
  }))

// Routes
app.use('/users', usersRouter);
app.use('/os', osRouter);
app.use('/car', carRouter);
app.use('/payment', paymentRouter);
app.use('/Comments', CommentRouter);


app.use('/messages', messagesRouter);


app.use('/uploads', express.static('uploads'));

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
app.use(cors({
  origin: "http://localhost:3000",
  methods: "GET,POST,PUT,DELETE",
  credentials: true
}));
