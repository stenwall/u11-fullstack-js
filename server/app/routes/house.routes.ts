// routes for house
import { Router } from 'express';
import * as controller from '../controllers/house.controller';
import middlewares from '../middlewares';

const verifyMember = middlewares.auth.verifyMember;
const verifyToken = middlewares.verifyToken;
const router = Router();

// get house by id
router.get('/:id', [verifyToken, verifyMember], controller.getHouse);

export default router;