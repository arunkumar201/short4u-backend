/* eslint-disable no-undef */
import * as process from 'process';

import dotenv from 'dotenv';

dotenv.config({});

class Config {
  public DATABASE_URI: string | undefined;
  public readonly PORT: string | undefined;
  public readonly SECRET: string;
  public readonly REDIS_HOST: string | undefined;
  public readonly REDIS_PORT: string | undefined;
  public readonly REDIS_PASSWORD: string | undefined;
  public readonly REDIS_USERNAME: string | undefined;
  public readonly ADMIN_EMAIL: string | undefined;
  public readonly DB_NAME: string | undefined;
  public readonly ADMIN_SECRET: string;
  public readonly NODE_ENV: string;
  private readonly DEFAULT_DATABASE_URI = 'mongodb://127.0.0.1:27017';

  constructor() {
    this.DATABASE_URI = process.env.DATABASE_URI || this.DEFAULT_DATABASE_URI;
    this.PORT = process.env.PORT || '5000';
    this.NODE_ENV = process.env.NODE_ENV || 'development';
    this.REDIS_HOST = process.env.REDIS_HOST || '127.0.0.1';
    this.REDIS_PASSWORD = process.env.REDIS_PASSWORD || '123';
    this.REDIS_PORT = process.env.REDIS_PORT || '6379';
    this.REDIS_USERNAME = process.env.REDIS_USERNAME || 'default';
    this.ADMIN_EMAIL = process.env.ADMIN_EMAIL;
    this.SECRET = process.env.SECRET ?? '111102';
    this.DB_NAME = process.env.DB_NAME || 'test-short_url';
    this.ADMIN_SECRET = process.env.ADMIN_SECRET || 'admin143';
  }

  public async validateConfig() {
    for (const [key, value] of Object.entries(this)) {
      if (value === undefined) {
        console.log(`Invalid Configuration : ${key} is Missing.`);
        process.exit();
      }
    }
  }
}
const config = new Config();
(() => config.validateConfig())();

export { config };
