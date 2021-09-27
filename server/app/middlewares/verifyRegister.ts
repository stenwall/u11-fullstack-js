import { Request, Response, NextFunction } from 'express';
import { dbModel } from '../models';

const ROLES = dbModel.ROLES;
const User = dbModel.User;

const checkDuplicateUsernameOrEmail = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Username
  User.findOne({
    username: req.body.username
  }).exec((err: any, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (user) {
      return res.status(400).send({ message: 'Failed! Username is already in use!' });
    }

    // Email
    User.findOne({
      email: req.body.email
    }).exec((err, user) => {
      if (err) {
        return res.status(500).send({ message: err });
      }

      if (user) {
        return res.status(400).send({ message: 'Failed! Email is already in use!' });
      }

      return next();
    });
  });
};

const checkRoleExist = (req: Request, res: Response, next: NextFunction) => {
  if (req.body.role) {
    ROLES.forEach(el => {
      if (req.body.role != el) {
        res.status(400).send({
          message: `Failed! Role ${req.body.role} does not exist!`
        });
      }
    });
  }

  return next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  checkRoleExist
};

export default verifySignUp;
