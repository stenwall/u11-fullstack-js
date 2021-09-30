import { Request, Response, NextFunction } from 'express';
import models from '../models';

const User = models.User;

const verifyAdmin = (req: Request, res: Response, next: NextFunction) => {
  User.findById(req.userId).exec((err: any, user: any) => {
    if (err) {
      return res.status(500).send({
        message: 'Could not find a user.',
        error: err
      });
    }

    if (user.role !== 'admin') {
      return res.status(403).send({ message: 'Unauthorized: this action require you to be an admin.' });
    }

    return next();
  });
};

const verifySuperAdmin = (req: Request, res: Response, next: NextFunction) => {
  User.findById(req.userId).exec((err: any, user: any) => {
    if (err) {
      return res.status(500).send({
        message: 'Could not find a user.',
        error: err
      });
    }

    if (user.role !== 'super-admin') {
      return res.status(403).send({ message: 'Unauthorized: this action require you to be a super-admin.' });
    }

    return next();
  });
};

const verifyMember = (req: Request, res: Response, next: NextFunction) => {

}

const verifyOwner = (req: Request, res: Response, next: NextFunction) => {
  User.findById(req.params.id).exec((err: any, user: any) => {
    if (err) {
      return res.status(500).send({
        message: 'Could not find a user.',
        error: err
      });
    }

    if (req.params.id !== req.userId) {
      return res.status(403).send({ message: `Unauthorized: this action require you to be user: ${user.firstname} ${user.lastname}.` });
    }

    return next();
  });
}

const auth = {
  verifyAdmin,
  verifySuperAdmin,
  verifyOwner,
  verifyMember
};

export default auth;

// source to declaration merging Express' types
// ------------------------------------------------------------------
// https://dev.to/kwabenberko/extend-express-s-request-object-with-typescript-declaration-merging-1nn5


// // a middleware sub-stack that handles GET requests to the /user/:id path
// router.get('/user/:id', function (req, res, next) {
//   // if the user ID is 0, skip to the next router
//   if (req.params.id === '0') next('route')
//   // otherwise pass control to the next middleware function in this stack
//   else next()
// }, function (req, res, next) {
//   // render a regular page
//   res.render('regular')
// })

// // handler for the /user/:id path, which renders a special page
// router.get('/user/:id', function (req, res, next) {
//   console.log(req.params.id)
//   res.render('special')
// })