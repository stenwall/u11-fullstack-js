// routes for authentication
import { Request, Response, NextFunction, Router, Application } from 'express';
import middlewares from '../middlewares';
import * as controller from '../controllers/auth.controller';

const authRoutes = (app: Application, router: Router) => {
  app.use((req: Request, res: Response, next: NextFunction) => {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    );
    next();
  });

  // register new user
  router.post(
    '/register',
    [
      middlewares.verifyRegister.checkDuplicates,
      middlewares.verifyRegister.checkRoleExist
    ],
    controller.register
  );

  // login user
  router.post('/login', controller.login);

  app.use('/api/auth', router);
};

export default authRoutes;
