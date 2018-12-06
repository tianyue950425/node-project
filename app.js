var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
//-------------自定义路由-------------

var register = require('./routes/register');
var login = require('./routes/login');
var article = require('./routes/article');
var detail = require('./routes/detail');
//----------------连接数据库---------
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/project');

//----------------express session------------------------------

var session = require('express-session');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(session({
	name:'tyueNodeSessID',
	secret:'ayaya',
	cookie:{maxAge:1000 * 3600},
	resave:true,
	saveUninitialized:true
}))

app.use('/', indexRouter);
app.use('/users', usersRouter);
//------------自定义路由-----------
app.use('/register', register);
app.use('/login', login);
app.use('/article', article);
app.use('/detail',detail);
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
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
