import './config/dotenv.config';
import config from './config';
import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import models from './app/models';
import routes from './app/routes';
import cookieParser from 'cookie-parser';

const app = express();
const House = models.House;

mongoose.Promise = global.Promise;

const corsOptions: object = {
  origin: config.CLIENT_URL,
  withCredentials: true
};

const options: object = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

mongoose
  .connect(config.DB_URI, options)
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
        name: 'Höstvetet',
        desc: 'Grupp för alla som bor i glashuset i Ormkärr',
        address: 'Gällerstagränd',
        streetnumber: 11,
        zipcode: 12476,
        city: 'Bandhagen'
      })
      .save((err: any) => {
        if (err) {
          console.log('error', err);
        }

        console.log('added `Höstvetet` to house collection');
      });
    }
  });
};

app.set('view engine', 'pug');

app.get('/', (req: express.Request, res: express.Response) => {
  res.render('index')
})

app.listen(config.PORT, () => {
  console.log(`Server is running on port: ${config.PORT}.`);
  routes(app);
});
