import { Request, Response, NextFunction } from 'express';
import * as JWT from 'jsonwebtoken';
import config from '../../config/auth.config';
import { dbModel } from '../models';

const User = dbModel.User;

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['x-access-token'] as string;

  if (!token) {
    return res.status(403).send({ message: 'No token provided!' });
  }

  JWT.verify(token, config.secret, (err: any, decoded: any) => {
    if (err) {
      return res.status(401).send({ message: 'Unauthorized!' });
    }
    req.userId = decoded.id;
    return next();
  });
};

const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  User.findById(req.body._id).exec((err: any, user: any) => {
    if (err) {
      return res.status(500).send({
        message: 'Could not find a user.',
        error: err
      });
    }

    if (user.role !== 'admin') {
      return res.status(403).send({ message: 'Require Admin Role!' });
    }

    return next();
  });
};

const isSuperAdmin = (req: Request, res: Response, next: NextFunction) => {
  User.findById(req.body._id).exec((err: any, user: any) => {
    if (err) {
      return res.status(500).send({
        message: 'Could not find a user.',
        error: err
      });
    }

    if (user.role !== 'super-admin') {
      return res.status(403).send({ message: 'Require Super-Admin Role!' });
    }

    return next();
  });
};

const authJWT = {
  verifyToken,
  isAdmin,
  isSuperAdmin
};

export default authJWT;

// source to declaration merging Express' types
// ------------------------------------------------------------------
// https://dev.to/kwabenberko/extend-express-s-request-object-with-typescript-declaration-merging-1nn5