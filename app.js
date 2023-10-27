const express = require('express');

const morgan = require('morgan');

const AppError = require('./utils/appError');

const globalErrorHandler = require('./utils/globalErrorHandler');

const userRoutes = require('./routes/userRoutes');
const app = express();

app.use(morgan('dev'));

app.use(express.json());

app.use('/static', express.static('public'));

app.use('/api/v1/users', userRoutes);

app.all('*', globalErrorHandler);

module.exports = app;