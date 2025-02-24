var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require ("dotenv").config();
const {connectToMongodb} = require ("./config/db.js")

const http = require('http');


var usersRouter = require('./routes/usersRouter.js');
var osRouter = require('./routes/osRouter.js');
var carRouter = require('./routes/carRouter.js');
var GeminiRouter = require('./routes/GeminiRouter.js');


var app = express();//instance avec l'express


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/users', usersRouter);
app.use('/os', osRouter);
app.use('/car', carRouter);
app.use('/Gemini',GeminiRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 5000);
  res.render('error');
});

const server = http.createServer(app);
server.listen(process.env.port,() =>{
  connectToMongodb()
  console.log('app is running on port 5000')
});