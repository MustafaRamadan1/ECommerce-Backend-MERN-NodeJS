import express from 'express'

import morgan from 'morgan'

import globalErrorHandler from './utils/globalErrorHandler';


import appRoutes from './routes/index';

const app = express();

app.use(morgan('dev'));

app.use(express.json());

app.use('/static', express.static('public'));

app.use(appRoutes);
app.all('*', globalErrorHandler);








export default app;

