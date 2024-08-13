import express, { Request, Response } from 'express';
import path from 'path';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import { rateLimit } from 'express-rate-limit';
import helmet from 'helmet';

import indexRouter from './routes';
import Env, { connectToMongoDB } from '../config';
import errorMiddleware, { HttpError } from './middleware/error.middleware';

const { API_VERSION, CORS } = Env;

const app = express();
app.use(cors({ origin: '*' }));

// app.use(cors({
//   origin: CORS,
// }));

app.use(morgan('dev'));
// app.use(helmet());


// app.use(rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
//   standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
//   legacyHeaders: false, // Disable the `X-RateLimit-*` headers
//   // message: 'Too many requests from this IP, Please try again after 15 minute',
//   handler: function(req, res) {
//     throw new HttpError('Too many requests from this IP, please try again after 15 minutes', 429)
//   }
// }));


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