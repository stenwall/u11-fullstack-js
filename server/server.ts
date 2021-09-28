// import dotenv from 'dotenv';
// import dotenv from 'dotenv/config';
require('dotenv').config();
import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import config from './config';
import { dbModel } from './app/models';
import routes from './app/routes';

const app = express();
const router = express.Router();

// dotenv.config();

const port: number = config.PORT as unknown as number;
const mongoURI: string = config.DB_URI as string;
const House = dbModel.House;

mongoose.Promise = global.Promise;

const corsOptions: object = {
  origin: config.CLIENT_URL as string
};

const mongooseOptions: object = {
  dbName: process.env.DB_NAME as string,
  user: process.env.DB_USER as string,
  pass: process.env.DB_PASS as string,
  useNewUrlParser: true,
  useUnifiedTopology: true
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(mongoURI, mongooseOptions)
  .then(() => {
    console.log('Connected to the database.');
    initial();
  })
  .catch(err => {
    console.log('Cannot connect to the database.', err);
    process.exit();
  });

const initial = () => {
  House.estimatedDocumentCount((err: any, count: number) => {
    if (!err && count === 0) {
      new House({
        name: 'Höstvetet 1',
        desc: 'Grupp för alla som bor i glashuset i Ormkärr',
        address: 'Gällerstagränd',
        streetnumber: 11,
        zipcode: 12476,
        city: 'Bandhagen',
      })
      .save((err: any) => {
        if (err) {
          console.log('error', err);
        }

        console.log('added `Höstvetet 1` to house collection');
      });
    }
  });
}

app.listen(port, () => {
  console.log(`Server is running on port: ${port}.`);
  routes.auth(app, router);
  routes.user(app, router);
  routes.post(app, router);
});
