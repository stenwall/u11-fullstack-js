// routes for comments
import { Router } from 'express';
import * as controller from '../controllers/comment.controller';
import middlewares from '../middlewares';

const verifyToken = middlewares.verifyToken;
const router = Router({ mergeParams: true });

// create new comment
router.post('/', [verifyToken], controller.createComment);

// get post with comments
router.get('/', [verifyToken], controller.getPostWithComments);

// update comment by id
router.put('/:id', [verifyToken], controller.updateComment);

// delete comment by id
router.delete('/:id', [verifyToken], controller.deleteComment);

export default router;
