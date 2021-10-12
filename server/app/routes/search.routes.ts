// routes for search
import { Router } from 'express';
import * as controller from '../controllers/search.controller';
import middlewares from '../middlewares';

const verifyToken = middlewares.verifyToken;
const router = Router();

// search in posts
router.get('/:query', [verifyToken], controller.searchPosts);

export default router;
