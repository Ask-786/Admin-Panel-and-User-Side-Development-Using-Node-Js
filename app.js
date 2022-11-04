const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const db = require('./config/connection')
var sessions = require('express-session')


db.connect((err)=>{
  if(err) console.log("Connection Error"+err);
  else console.log("Database Connected");
})

const app = express();

const loginRouter = require('./routes/login');
const loginAdminRouter = require('./routes/login_admin');
const homeAdminRouter = require('./routes/home_admin');
const homeRouter = require('./routes/home');
const signUpRouter = require('./routes/sign_up');

app.use(sessions({
  secret: "thisismysecretcodewith9656745192",
  saveUninitialized:true,
  cookie: { maxAge: 1000*60*60*24 },
  resave: true
}));

app.use((req, res, next) => {
  res.set(
    "Cache-control",
    "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
  );
  next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', loginRouter);
app.use('/admin', homeAdminRouter);
app.use('/adlogin', loginAdminRouter);
app.use('/home', homeRouter);
app.use('/signup', signUpRouter);

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
