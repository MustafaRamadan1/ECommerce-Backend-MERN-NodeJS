import express from "express";

import cors from 'cors';

import morgan from "morgan";

import globalErrorHandler from "./utils/globalErrorHandler";

import appRoutes from "./routes/index";

import rateLimiter from './utils/rate-limiter';

const app = express();

app.use(rateLimiter(100, (60 * 60 * 1000)));

app.use(morgan("dev"));

app.use(cors());

app.use(express.json());

app.use("/static", express.static("public"));

app.use(appRoutes);

app.all("*", globalErrorHandler);

export default app;
