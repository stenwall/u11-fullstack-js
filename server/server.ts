import './config/dotenv.config';
import config from './config';
import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import models from './app/models';
import routes from './app/routes';
import cookieParser from 'cookie-parser';
import AdminBro, { AdminBroOptions } from 'admin-bro';
import AdminBroMongoose from '@admin-bro/mongoose';
import AdminBroExpress from '@admin-bro/express';
import * as bcrypt from 'bcryptjs';

const app = express();
const House = models.House;
const User = models.User;
const Post = models.Post;
const Comment = models.Comment;

mongoose.Promise = global.Promise;

AdminBro.registerAdapter(AdminBroMongoose);

const corsOptions: object = {
  origin: config.CLIENT_URL,
  credentials: true
};

const options: object = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

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

const superAdmin = new AdminBro({
  resources: [User, House, Post, Comment],
  rootPath: '/admin'
});

const adminRouter = AdminBroExpress.buildAuthenticatedRouter(superAdmin, {
  authenticate: async (email, password) => {
    const user = await User.findOne({ email });
    if (user) {
      const matched = await bcrypt.compare(password, user.password);
      if (matched) {
        return user;
      }
    }
    return false;
  },
  cookiePassword: config.SUPER_COOKIE_PWD
});

app.use(superAdmin.options.rootPath, adminRouter);
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

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
        console.log('added "Höstvetet" to house collection');
      });
    }
  });
};

app.set('view engine', 'pug');

app.get('/', (req: express.Request, res: express.Response) => {
  res.render('index');
});

app.listen(config.PORT, () => {
  console.log(`Server is running on port: ${config.PORT}.`);
  routes(app);
});
