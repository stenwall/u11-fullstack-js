// routes for posts and comments
import { Router } from 'express';
import * as controller from '../controllers/post.controller';
import middlewares from '../middlewares';
import commentRouter from './comment.routes';

const verifyOwner = middlewares.auth.verifyOwner;
const verifyToken = middlewares.verifyToken;
const router = Router();

// create new post
router.post('/', [verifyToken], controller.createPost);

// get post by id
router.get('/:postId', [verifyToken], controller.getPost);

// update post by id
router.put('/:postId', [verifyToken, verifyOwner], controller.updatePost);

// delete post by id
router.delete('/:postId', [verifyToken, verifyOwner], controller.deletePost);

router.use('/:postId/comments', commentRouter);

export default router;
