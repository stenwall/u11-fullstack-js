// routes for authentication
import express, { Request, Response, NextFunction } from 'express';
import middlewares from '../middlewares';
import * as authController from '../controllers/auth.controller';

const authRoutes = (app: express.Router) => {
  app.use((req: Request, res: Response, next: NextFunction) => {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    );
    next();
  });

  app.post(
    '/api/auth/register',
    [
      middlewares.verifyRegister.checkDuplicates,
      middlewares.verifyRegister.checkRoleExist
    ],
    authController.register
  );

  app.post('/api/auth/signin', authController.login);
};

export default authRoutes;
