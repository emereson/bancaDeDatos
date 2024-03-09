import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import hpp from 'hpp';

import rateLimit from 'express-rate-limit';
import xss from 'xss-clean';
import { AppError } from './utils/AppError.js';

import { usersRouter } from './routes/user.routes.js';
// client import
import { clientRouter } from './routes/client.routes.js';
// import { buyPlanRouter } from './routes/buyPlan.routes.js';
import { planRouter } from './routes/plan.routes.js';
import { consultationRouter } from './routes/mtc.routes.js';
import { globalErrorHandler } from './controllers/error.controller.js';

const app = express();

app.set('trust proxy', 1);
const limiter = rateLimit({
  max: 10000,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in one hour.',
});

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(cors());
app.use(xss());
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

app.use(hpp());

app.use('/api/v1', limiter);
app.use('/api/v1/user', usersRouter);
// client rotues
app.use('/api/v1/client', clientRouter);
// app.use('/api/v1/buyPlan', buyPlanRouter);
app.use('/api/v1/plan', planRouter);
app.use('/api/v1/mtc', consultationRouter);

app.all('*', (req, res, next) => {
  return next(new AppError(`Can't find ${req.originalUrl} on this server! 💀`, 404));
});
app.use(globalErrorHandler);

export { app };
