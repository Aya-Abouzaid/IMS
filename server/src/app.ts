import express, { Request, Response } from 'express';
import Env, { connectToMongoDB } from '../config';
import path from 'path';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import { rateLimit } from 'express-rate-limit';
import helmet from 'helmet';

import indexRouter from './routes';
import errorMiddleware, { HttpError } from './middleware/error.middleware';

const { API_VERSION, CORS } = Env;

const app = express();
app.use(cors({ origin: '*' }));

app.use(morgan('dev'));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'handlebars');

app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

connectToMongoDB();

app.get('/', (req, res) => res.sendStatus(200));

app.use(API_VERSION, indexRouter);

app.use(errorMiddleware);

// catch 404 and forward to error handler
app.use((req: Request, res: Response) => {
  console.error('404 Page Not Found');
  return res.status(404).send({
    message: 'Page not found',
  });
});

export default app;