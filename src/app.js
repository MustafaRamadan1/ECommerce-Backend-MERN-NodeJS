import express from "express";
import cors from 'cors';
import morgan from "morgan";
import helmet from "helmet";
import mongoSanitize from 'express-mongo-sanitize';
import globalErrorHandler from "./utils/globalErrorHandler";
import appRoutes from "./routes/index";
import AppError from "./utils/appError";
import rateLimiter from './utils/rate-limiter';

const app = express();
app.set('view engine', 'pug');
app.set('views', `${__dirname}/views`);
app.use(helmet());
app.use(rateLimiter(100, (60 * 60 * 1000)));
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(mongoSanitize());
app.use("/static", express.static("public"));
app.use(appRoutes);



app.all("*", (req, res ,next)=>{

    return next(new AppError('Page not Found', 404));
});


app.use(globalErrorHandler);

export default app;
