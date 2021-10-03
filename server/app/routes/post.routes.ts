// routes for posts and comments
import { Router } from 'express';
import * as controller from '../controllers/post.controller';
import middlewares from '../middlewares';
import commentRouter from './comment.routes';

const verifyToken = middlewares.verifyToken;
const router = Router();

// create new post
router.post('/', [verifyToken], controller.createPost);

// get post by id
router.get('/:postId', [verifyToken], controller.getPost);

// update post by id
router.put('/:postId', [verifyToken], controller.updatePost);

// delete post by id
router.delete('/:postId', [verifyToken], controller.deletePost);

router.use('/:postId/comments', commentRouter);

export default router;
