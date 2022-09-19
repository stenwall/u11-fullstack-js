import authRoutes from './auth.routes';
import userRoutes from './user.routes';
import postRoutes from './post.routes';
import houseRoutes from './house.routes';
import adminRoutes from './admin.routes';
import searchRoutes from './search.routes';
import { Application, Request, Response, NextFunction } from 'express';

const routes = (app: Application) => {
  app.use((req: Request, res: Response, next: NextFunction) => {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    );
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
  });

  app.use('/api/auth', authRoutes);
  app.use('/api/users', userRoutes);
  app.use('/api/posts', postRoutes);
  app.use('/api/house', houseRoutes);
  app.use('/api/admin/', adminRoutes);
  app.use('/api/search/', searchRoutes);
}

export default routes;