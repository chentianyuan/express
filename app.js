var express = require('express');

//给所有的对象都添加一个postModel，该方法是mongoose导出的方法用于各个路由配置文件中操作数据库
global.post = require('./data/mongoose');

var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//路由配置好之后在入口文件导入并用app.use()语法引用
var index = require('./routes/index');
var update = require('./routes/update');

var app = express();

// view engine setup
//模板引擎设置，能不能不设置模板引擎直接将其导出至vue的index呢
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require("ejs").__express);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/update', update);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
