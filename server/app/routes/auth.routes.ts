// routes for authentication
import { Router } from 'express';
import * as controller from '../controllers/auth.controller';
import middlewares from '../middlewares';

const verifyRegister = middlewares.verifyRegister;
const verifyToken = middlewares.verifyToken;
const router = Router();

// register new user
router.post(
  '/register',
  [verifyRegister.checkDuplicates, verifyRegister.checkRoleExist],
  controller.register
);

// login user
router.post('/login', controller.login);

// logout user
router.post('/logout', [verifyToken], controller.logout);

// get logged in user
router.get('/user', [verifyToken], controller.getCurrentUser);

export default router;
