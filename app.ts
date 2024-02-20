import express, { NextFunction, Request, Response } from 'express';
import logger from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/auth';
import { RequestError } from './utils/requestError';

dotenv.config();

const app = express();

const formatLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatLogger));
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

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
