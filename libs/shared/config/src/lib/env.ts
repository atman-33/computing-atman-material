import * as dotenv from 'dotenv';

dotenv.config({ path: './libs/shared/config/src/lib/.env' });

export const env = {
  PORT: process.env['PORT'],
  MONGODB_URI: process.env['MONGODB_URI'],
  JWT_EXPIRATION: process.env['JWT_EXPIRATION'],
  JWT_SECRET: process.env['JWT_SECRET'],
};