import { buildDevLogger } from './dev-logger';
import { buildProdLogger } from './prod-logger';
import dotenv from 'dotenv';
import winston from 'winston';
dotenv.config();

export let logger: winston.Logger;
// eslint-disable-next-line no-undef
if (process.env.NODE_ENV === 'development') {
  logger = buildDevLogger();
} else {
  logger = buildProdLogger();
}
