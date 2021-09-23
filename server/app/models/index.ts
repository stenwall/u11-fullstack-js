import config from '../../config';
import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

const db = {
  mongoose: mongoose,
  uri: config.DB_URI as string,
  dbName: process.env.DB_NAME as string,
  user: process.env.DB_USER as string,
  pass: process.env.DB_PASS as string,
};

export default db;