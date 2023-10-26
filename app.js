const express = require('express');

const morgan = require('morgan');

const AppError = require('./utils/appError');

const globalErrorHandler = require('./controllers/errorController');

const app = express();

app.use(morgan('dev'));

app.use(express.json());

app.use('/static', express.static('public'));




app.all('*', globalErrorHandler);

module.exports = app;