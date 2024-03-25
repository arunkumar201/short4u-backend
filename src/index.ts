import express, { Request, Response } from 'express';

import { ConnectOptions } from 'mongoose';
import Database from './config/database';
import { ErrorHandler } from './middleware/errors/defaultError.middleware';
import { PORT } from './constants/index';
import bodyParser from 'body-parser';
import { config } from '../src/config/env.config';
import cors from 'cors';
import helmet from 'helmet';
import { limiter } from './middleware/limiter/rateLimiter.middleware';
import { logger } from './logger';
import morgan from 'morgan';
import passport from 'passport';
import passportAuth from '../src/config/passport.config';
import { redisInstance } from './cache/redis';
import userRoutes from './routes/v1/user.route';

const redis = redisInstance.getClient();
(async () => await redis.set('hello', 'hello'))();

const app = express();

//Helmet is a middleware for adding some security-related HTTP headers to your express server.
app.use(helmet());
//morgan is a HTTP request logger middleware
app.use(morgan('combined'));

/*
It can help to provide an extra layer of ob security to reduce server fingerprinting.
Though not a security issue itself,a method to improve the overall posture of a web server
 is to take measures to reduce the ability to fingerprint the software being used on the server. 
Server software can be fingerprinted by kwirks in how they respond to specific requests.
*/
// By default, Express.js sends the X-Powered-By response header banner.
//  This can be disabled using the app.disable() method:
app.disable('x-powered-by');

app.use(limiter);
app.use(passport.initialize());
passportAuth.initialize();

//Database Instance
const db = new Database(config.DATABASE_URI!, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: config.DB_NAME,
} as ConnectOptions);

//Connect with DATABASE
db.connect().catch((err: unknown) =>
  // eslint-disable-next-line no-undef
  console.error('Error connecting to database:', err),
);

//getting server status
app.get('/server-status', (req: Request, res: Response) => {
  logger.info('Server is up running!');
  res.status(200).json({
    message: 'Server is up running! ',
  });
});
app.get('/', (req: Request, res: Response) => {
  logger.info('Server is up running!');
  res.status(200).json({
    message: 'Server is up running! ',
  });
});

//middlewares
app.use(
  cors({
    credentials: true,
    origin: '*', //http://localhost:3000
  }),
);

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

//Routes
app.use('/v1/users', userRoutes);

//error handling middleware function as the last middleware function
app.use(ErrorHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-undef
  console.log(`express server is running on port ${PORT}`);
});
