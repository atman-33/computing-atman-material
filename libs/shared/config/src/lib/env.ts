import * as dotenv from 'dotenv';

dotenv.config({ path: './libs/shared/config/src/lib/.env' });

export const env = {
  PORT: process.env['PORT'],
};