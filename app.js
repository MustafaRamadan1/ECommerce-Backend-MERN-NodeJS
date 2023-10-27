import express from 'express'

import morgan from 'morgan'

import globalErrorHandler from './utils/globalErrorHandler';


import userRoutes from './routes/userRoutes';

const app = express();

app.use(morgan('dev'));

app.use(express.json());

app.use('/static', express.static('public'));

app.use('/api/v1/users', userRoutes);

app.all('*', globalErrorHandler);








export default app;

