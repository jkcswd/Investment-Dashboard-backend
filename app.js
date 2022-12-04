const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const connectDb = require('./databaseConnection');
const scheduledTasks = require('./cronJobs/scheduledTasks');

// TODO:sort out unneeded error handling

const symbolRouter= require('./routes/symbol');
const dailyReportRouter= require('./routes/dailyReport');

// TODO:sort out error handling. Too many not needed try catch blocks, Yahoo finance API calls must be wrapped. Think about DB queries

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

connectDb();
scheduledTasks();

app.use('/symbol', symbolRouter)
app.use('/daily-report', dailyReportRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // send error message via JSON
  res.status(err.status || 500);
  res.json(`ERROR: ${err}` );
});

module.exports = app;
