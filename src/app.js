import express from "express";

import cors from 'cors';

import morgan from "morgan";

import globalErrorHandler from "./utils/globalErrorHandler";

import appRoutes from "./routes/index";
import AppError from "./utils/appError";

const app = express();

app.use(morgan("dev"));

app.use(cors());

app.use(express.json());

app.use("/static", express.static("public"));

app.use(appRoutes);

app.all("*", (req, res ,next)=>{

    return next(new AppError('Page not Found', 404));
});


app.use(globalErrorHandler);

export default app;
