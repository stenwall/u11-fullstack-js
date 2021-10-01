import { Request, Response, NextFunction } from 'express';
import models from '../models';

const User = models.User;
const Post = models.Post;

const verifyAdmin = (req: Request, res: Response, next: NextFunction) => {
  User.findById(req.userId).exec((err: any, user: any) => {
    if (err) {
      res.status(500).send({
        message: 'Could not find a user.',
        error: err
      });
    }
    if (user.role !== 'admin') {
      res.status(403).send({
        message: 'Unauthorized: this action require you to be an admin.'
      });
    }
    next();
  });
};

const verifySuperAdmin = (req: Request, res: Response, next: NextFunction) => {
  User.findById(req.userId).exec((err: any, user: any) => {
    if (err) {
      res.status(500).send({
        message: 'Could not find a user.',
        error: err
      });
    }

    if (user.role !== 'super-admin') {
      res.status(403).send({
        message: 'Unauthorized: this action require you to be a super-admin.'
      });
    }
    next();
  });
};


const verifyOwner = (req: Request, res: Response, next: NextFunction) => {
  User.findById(req.params.id).exec((err: any, user: any) => {
    if (err) {
      res.status(500).send({
        message: 'Could not find a user.',
        error: err
      });
    }
    if (user._id !== req.userId) {
      res.status(403).send({
        message: 'Unauthorized.'
      });
    }
  });
};

const auth = {
  verifyAdmin,
  verifySuperAdmin,
  verifyOwner
};

export default auth;

// source to declaration merging Express' types
// ------------------------------------------------------------------
// https://dev.to/kwabenberko/extend-express-s-request-object-with-typescript-declaration-merging-1nn5


