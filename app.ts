import express, { NextFunction, Request, Response } from 'express';
import logger from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json';

import authRouter from './routes/auth';
import productsRouter from './routes/products';
import usersRouter from './routes/users';
import { RequestError } from './utils/requestError';
import passport from 'passport';
import session from 'express-session';

dotenv.config();

const app = express();

const formatLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatLogger));
app.use(cors());
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'default-secret',
    resave: false,
    saveUninitialized: false,
  }),
);
app.use(passport.initialize());
app.use(passport.session());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api/auth', authRouter);
app.use('/api/products', productsRouter);
app.use('/api/users', usersRouter);

app.use((req: Request, res: Response) => {
  const error = new Error('Not Found');
  res.status(404).json({ message: error.message });
});

app.use(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (error: RequestError, req: Request, res: Response, next: NextFunction) => {
    res.status(error.status || 500).json({
      message: error.message || 'Server error',
    });
  },
);

export default app;
