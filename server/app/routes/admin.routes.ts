// routes for admins
import { Router } from 'express';
import * as controller from '../controllers/admin.controller';
import middlewares from '../middlewares';

const verifyToken = middlewares.verifyToken;
const verifyAdmin = middlewares.auth.verifyAdmin
const router = Router();

// block user by id
router.put('/users/:userId/block', [verifyToken, verifyAdmin], controller.blockUser);

// unblock user by id
router.put('/users/:userId/unblock', [verifyToken, verifyAdmin], controller.unblockUser);

// update house info by id
router.put('/house/:houseId', [verifyToken, verifyAdmin], controller.updateHouse);

// delete post by id
router.delete('/posts/:postId', [verifyToken, verifyAdmin], controller.deletePost);

// delete comment by id
router.delete('/posts/:postId/comments/:commentId', [verifyToken, verifyAdmin], controller.deleteComment);

export default router;