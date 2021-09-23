import dotenv from 'dotenv/config';
import express from 'express';
import cors from 'cors';
import config from './config';
import db from './app/models';

const app = express();

dotenv.config();

const port = parseInt(config.PORT as string, 10);

const corsOptions = {
  origin: config.CLIENT_URL as string
};
const mongooseOptions = {
  dbName: db.dbName,
  user: db.user,
  pass: db.pass,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db.mongoose
  .connect(db.uri, mongooseOptions)
  .then(() => {
    console.log('Connected to the database!');
  })
  .catch(err => {
    console.log('Cannot connect to the database!', err);
    process.exit();
  });

app.listen(port, () => {
  console.log(`Server is running on port: ${port}.`);
});
