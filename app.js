var express = require('express');
var path = require('path');
var mongoose = require('mongoose'); // Mongoose: Librería para conectar con MongoDB
var passport = require('passport'); // Passport: Middleware de Node que facilita la autenticación de usuarios
var favicon = require('serve-favicon');
var logger = require('morgan');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cookieParser = require("cookie-parser");
var methodOverride = require('method-override');

var routes = require('./routes/index');
var users = require('./routes/users');
var tasks = require('./routes/tasks');

mongoose.connect('mongodb://localhost:27017/myDataBase', function(err, res) {
    if(err) throw err;
    console.log('Conectado con éxito a la BD');
});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(favicon(__dirname + '/public/img/favicon.ico'));
//adding complements for express session manage
app.use(logger("combined"));
app.use(methodOverride());
app.use(cookieParser());
app.use(bodyParser.urlencoded({
  extended:true
}));
app.use(session({ secret: 'SECRET',
  saveUninitialized: true,
  resave: true
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
//ending complements
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
