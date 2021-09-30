// routes for users
import { Router } from 'express';
import middlewares from '../middlewares';
import * as controller from '../controllers/user.controller';

const verifyOwner = middlewares.auth.verifyOwner;
const verifyToken = middlewares.verifyToken;
const router = Router();

// get user by id
router.get('/:id', [verifyToken], controller.getUser);

// update user by id
router.put('/:id', [verifyToken, verifyOwner], controller.updateUser);

// get all posts by user id
router.get('/:id/posts', [verifyToken], controller.getPostsByUser);

export default router;
