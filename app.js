var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var helpers = require('./utils/handlebars-helpers.js');
var compression = require('compression');

var passport     = require('passport');
var flash        = require('connect-flash');
var session      = require('express-session');
var redisStore = require('connect-redis')(session);
var configAuth = require('./config/config.json')[process.env.NODE_ENV];

var app = express();

var models = require('./models');

// use Sequelize on boot up
models.sequelize.sync();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({
  partialsDir: 'views/partials',
  layoutsDir: 'views/layouts',
  defaultLayout: 'main',
  helpers: helpers
}));
app.set('view engine', 'handlebars');


app.use(compression());

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// pass passport for configuration
require('./config/passport')(passport);

// required for passport
app.use(session({
  secret: 'D8BF3D1B4ECDA135765CA3CEC3CC5',
  store: new redisStore({ host: configAuth.session.host, port: configAuth.session.port, db: configAuth.session.database}),
  resave: false, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
  cookie: {
    maxAge: 43200000 // 12 hours
  }
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for msgs stored in session

//routes
var admin = require('./routes/admin');
var about = require('./routes/about');
var contact = require('./routes/contact');
var blog = require('./routes/blog');
var resources = require('./routes/resources');
var index = require('./routes/index');

app.use('/admin', admin);
app.use('/about', about);
app.use('/contact', contact);
app.use('/blog', blog);
app.use('/external-resources', resources);
app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
