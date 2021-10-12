// routes for user posts
import { Router } from 'express';
import * as controller from '../controllers/user.controller';
import middlewares from '../middlewares';

const verifyToken = middlewares.verifyToken;
const router = Router({ mergeParams: true });

// get all posts by user id
router.get('/', [verifyToken], controller.getPostsByUser);

export default router;