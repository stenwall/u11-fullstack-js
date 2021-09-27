// routes for authorization
import express, { Request, Response, NextFunction } from 'express';
import middlewares from '../middlewares';
import * as controller from '../controllers/user.controller';

const authJWT = middlewares.authJWT;

const userRoutes = (app: express.Router) => {
  app.use((req: Request, res: Response, next: NextFunction) => {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    );
    next();
  });

  app.get('/api/test/all', controller.publicAccess);

  app.get('/api/test/user', [authJWT.verifyToken], controller.userAccess);

  app.get(
    '/api/test/admin',
    [authJWT.verifyToken, authJWT.isAdmin],
    controller.adminAccess
  );

  app.get(
    '/api/test/super-admin',
    [authJWT.verifyToken, authJWT.isSuperAdmin],
    controller.superAdminAccess
  );
};

export default userRoutes;
