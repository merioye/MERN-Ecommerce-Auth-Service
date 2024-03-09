import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { join } from 'path';
import { CONFIG } from '../constants';
import { dataSourceOptions } from './options';

config({ path: join(__dirname, `../../.env.${process.env[CONFIG.NODE_ENV]}`) });

export const dataSource = new DataSource({
  ...dataSourceOptions,
  url: process.env[CONFIG.DB_URI],
  database: process.env[CONFIG.DB_NAME],
});
