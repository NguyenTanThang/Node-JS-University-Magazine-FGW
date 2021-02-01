const dotenv = require("dotenv");
dotenv.config();

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require("cors");
const {connectDB} = require("./config/db");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var messagesRouter = require('./routes/messages');
var messageRoomsRouter = require('./routes/messageRooms');
var termsRouter = require('./routes/terms');
var contributionsRouter = require('./routes/contributions');
var commentsRouter = require('./routes/comments');
var facultiesRouter = require('./routes/faculties');
var facultyAssignmentsRouter = require('./routes/facultyAssignments');
var userRolesRouter = require('./routes/userRoles');

var app = express();

connectDB();
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/terms', termsRouter);
app.use('/contributions', contributionsRouter);
app.use('/messages', messagesRouter);
app.use('/message-rooms', messageRoomsRouter);
app.use('/comments', commentsRouter);
app.use('/faculties', facultiesRouter);
app.use('/faculty-assignments', facultyAssignmentsRouter);
app.use('/user-roles', userRolesRouter);

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
  res.send(err || "error");
});

module.exports = app;
