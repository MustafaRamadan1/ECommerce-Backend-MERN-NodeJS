const express = require('express');

const morgan = require('morgan');

const AppError = require('./utils/appError');

const app = express();

app.use(morgan('dev'));

app.use(express.json());

app.use('/static', express.static('public'));


module.exports = app;