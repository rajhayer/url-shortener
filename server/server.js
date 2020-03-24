var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var redirectRouter = require('./routes/redirect');
var shortenRouter = require('./routes/shorts');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/shorts', shortenRouter);
app.use('/', redirectRouter);

module.exports = app;
