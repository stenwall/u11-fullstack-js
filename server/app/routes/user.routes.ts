// routes for authorization
import { Request, Response, NextFunction, Router, Application } from 'express';
import middlewares from '../middlewares';
import * as controller from '../controllers/user.controller';

const authJWT = middlewares.authJWT;

const userRoutes = (app: Application, router: Router) => {
  app.use((req: Request, res: Response, next: NextFunction) => {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    );
    next();
  });

  // get public content
  router.get('/api/test/all', controller.publicAccess);

  // get user content
  router.get('/api/test/user', [authJWT.verifyToken], controller.userAccess);

  // get admin content
  router.get(
    '/api/test/admin',
    [authJWT.verifyToken, authJWT.isAdmin],
    controller.adminAccess
  );

  // get super-admin content
  router.get(
    '/super-admin',
    [authJWT.verifyToken, authJWT.isSuperAdmin],
    controller.superAdminAccess
  );

  // app.use('/api/test', router);
};

export default userRoutes;
