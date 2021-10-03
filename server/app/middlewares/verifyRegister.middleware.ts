import { Request, Response, NextFunction } from 'express';
import models from '../models';

const ROLES = models.ROLES;
const User = models.User;

const checkDuplicates = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // username
  User.findOne({
    username: req.body.username
  }).exec((err: any, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (user) {
      return res.status(400).send({ message: 'Failed: username is already in use.' });
    }

    // email
    User.findOne({
      email: req.body.email
    }).exec((err, user) => {
      if (err) {
        return res.status(500).send({ message: err });
      }

      if (user) {
        return res.status(400).send({ message: 'Failed: email is already in use.' });
      }

      return next();
    });
  });
};

const checkRoleExist = (req: Request, res: Response, next: NextFunction) => {
  if (req.body.role) {
    if (!ROLES.includes(req.body.role)) {
      return res.status(400).send({
        message: `Failed: role ${req.body.role} does not exist.`
      });
    }
  }
  return next();
};

const verifyRegister = {
  checkDuplicates,
  checkRoleExist
};

export default verifyRegister;
