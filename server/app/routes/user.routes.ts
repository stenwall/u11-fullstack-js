// routes for users
import { Router } from 'express';
import * as controller from '../controllers/user.controller';
import middlewares from '../middlewares';
import userPostRouter from './user-posts.routes';

const verifyOwner = middlewares.auth.verifyOwner;
const verifyToken = middlewares.verifyToken;
const router = Router();

// get user by id
router.get('/:userId', [verifyToken], controller.getUser);

// update user by id
router.put('/:userId', [verifyToken, verifyOwner], controller.updateUser);

router.use('/:userId/posts', userPostRouter);

export default router;
