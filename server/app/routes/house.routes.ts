// routes for house
import { Router } from 'express';
import * as controller from '../controllers/house.controller';
import middlewares from '../middlewares';

const verifyToken = middlewares.verifyToken;
const router = Router();

// get house by id
router.get('/:id', [verifyToken], controller.getHouse);

// get house with members
router.get('/:id/members', [verifyToken], controller.getHouseMembers);

export default router;