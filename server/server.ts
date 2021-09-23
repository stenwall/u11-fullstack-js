import dotenv from 'dotenv/config';
import express from 'express';
import cors from 'cors';
import config from './config';
import db from './app/models';

const app = express();

dotenv.config();

const port = parseInt(config.PORT as string, 10);
const mongoURI = config.DB_URI as string;
const Role = db.role;

const corsOptions = {
  origin: config.CLIENT_URL as string
};
const mongooseOptions = {
  dbName: process.env.DB_NAME as string,
  user: process.env.DB_USER as string,
  pass: process.env.DB_PASS as string,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db.mongoose
  .connect(mongoURI, mongooseOptions)
  .then(() => {
    console.log('Connected to the database.');
    initial();
  })
  .catch(err => {
    console.log('Cannot connect to the database.', err);
    process.exit();
  });

function initial() {
  Role.estimatedDocumentCount((err: any, count: number) => {
    if (!err && count === 0) {
      new Role({
        name: 'user'
      })
      .save(err => {
        if (err) {
          console.log('error', err);
        }

        console.log('added `user` to roles collection');
      });

      new Role({
        name: 'admin'
      })
      .save(err => {
        if (err) {
          console.log('error', err);
        }

        console.log('added `admin` to roles collection');
      });
    }
  });
}

app.listen(port, () => {
  console.log(`Server is running on port: ${port}.`);
});
