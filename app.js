var express = require('express');
var path = require('path');
var mongoose = require('mongoose'); // Mongoose: Librería para conectar con MongoDB
var passport = require('passport'); // Passport: Middleware de Node que facilita la autenticación de usuarios
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var tasks = require('./routes/tasks');

mongoose.connect('mongodb://localhost/myDataBase');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
      //adding complements for express session manage
      app.use(express.logger('dev'));
      app.use(express.methodOverride());
      app.use(cookieParser());
      app.use(express.cookieParser()); // read cookies (needed for auth)
      app.use(express.bodyParser()); // get information from html forms
      app.use(express.session({ secret: 'SECRET' })); // session secret
      app.use(passport.initialize());
      app.use(passport.session()); // persistent login sessions
      app.use(flash()); // use connect-flash for flash messages stored in session


//app.use(logger('dev'));
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({extended: false}));
//app.use(cookieParser());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/tasks',tasks);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
