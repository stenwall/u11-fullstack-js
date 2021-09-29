// controller for authentication
import { Request, Response } from 'express';
import * as JWT from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import config from '../../config/auth.config';
import models from '../models';

const User = models.User;

// create and save a new user
export const register = async (req: Request, res: Response) => {
  // validate request
  if (!req.body) {
    return res.status(400).send({ message: 'Cannot be empty.' });
  }

  const user = new User({
    username: req.body.username,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    desc: req.body.body,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    status: req.body.status ? req.body.status : true,
    role: req.body.role ? req.body.role : 'user',
    house_id: req.body.house
  });

  try {
    const savedUser = await user.save();
    return res.status(201).send({
      message: 'User successfully registered.',
      user: {
        username: savedUser.username,
        firstname: savedUser.firstname,
        lastname: savedUser.lastname,
        role: savedUser.role,
        house_id: savedUser.house_id,
        id: savedUser._id
      }
    });
  } catch (err: any) {
    return res.status(400).send({
      message: 'Error saving user to database.',
      error: err.message
    });
  }
};

export const login = async (req: Request, res: Response) => {
  User.findOne({
    email: req.body.email
  }).exec((err: any, user: any) => {
    if (err) {
      return res.status(500).send({
        message: 'Could not find a user.',
        error: err
      });
    }

    if (!user) {
      return res.status(404).send({ message: 'User Not found.' });
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: 'Invalid Password!'
      });
    }

    const token = JWT.sign({ id: user.id }, config.secret, {
      expiresIn: 86400 // 24 hours
    });

    return res.status(200).send({
      user: {
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname,
        role: user.role,
        house: user.house,
        id: user._id
      },
      accessToken: token
    });
  });
};

// const User = models.User;

// // create and save a new user
// export const create = async (req: Request, res: Response) => {
//   // validate request
//   if (!req.body) {
//     res.status(400).send({ message: 'Cannot be empty.' });
//     return;
//   }

//   const user = new User({
//     username: req.body.username,
//     firstname: req.body.firstname,
//     lastname: req.body.lastname,
//     desc: req.body.body,
//     email: req.body.email,
//     password: req.body.password,
//     status: req.body.status ? req.body.status : true,
//     role: req.body.status ? req.body.status : 'user',
//     house: req.body.house
//   });

//   try {
//     const savedUser = await user.save();
//     res.send(savedUser);
//     res.status(201).send({
//       message: 'User created successfully.'
//     })
//   } catch (err: any) {
//     res.status(400).send({
//       message: err.message || 'Error saving user to database.'
//     });
//   }

//   // user
//   //   .save()
//   //   .then((data: any) => {
//   //     console.log(data);
//   //     res.send(data);
//   //     res.status(201).send({
//   //       message: 'User created successfully.'
//   //     });
//   //     return;
//   //   })
//   //   .catch((err: any) => {
//   //     res.status(500).send({
//   //       message: err.message || 'Error saving user to database.'
//   //     });
//   //   });
// };

// // retrieve all users
// // exports.findAll = (req: Request, res: Response) => {
// //   const title = req.query.title;
// //   const condition = title
// //     ? { title: { $regex: new RegExp(title), $options: 'i' } }
// //     : {};

// //   User.find(condition)
// //     .then(data => {
// //       res.send(data);
// //     })
// //     .catch(err => {
// //       res.status(500).send({
// //         message: err.message || 'Some error occurred while retrieving users.'
// //       });
// //     });
// // };

// // find user by id
// exports.findOne = (req: Request, res: Response) => {
//   const id = req.params.id;

//   User.findById(id)
//     .then(data => {
//       if (!data) {
//         res.status(404).send({ message: `User with id ${id} not found` });
//       } else {
//         res.status(200).send(data);
//       }
//     })
//     .catch(err => {
//       res.status(500).send({
//         message: err.message || `Error retrieving user with id ${id}.`
//       });
//     });
// };

// // update user by id
// exports.update = (req: Request, res: Response) => {
//   if (!req.body) {
//     return res.status(400).send({
//       message: 'Data to update cannot be empty.'
//     });
//   }

//   const id = req.params.id;

//   User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
//     .then(data => {
//       if (!data) {
//         res.status(404).send({
//           message: `Cannot update user with id ${id}, maybe it was not found.`
//         });
//       } else {
//         res.status(200).send({
//           message: 'user updated successfully.',
//           data
//         });
//       }
//     })
//     .catch(err => {
//       res.status(500).send({
//         message: `Error updating with id ${id}.`
//       });
//     });
// };

// // delete user by id
// exports.delete = (req: Request, res: Response) => {
//   const id = req.params.id;

//   User.findByIdAndRemove(id)
//     .then(data => {
//       if (!data) {
//         res.status(404).send({
//           message: `Cannot delete user with id ${id}, maybe it was not found.`
//         });
//       } else {
//         res.send({
//           message: 'user was deleted successfully.'
//         });
//       }
//     })
//     .catch(err => {
//       res.status(500).send({
//         message: `Error deleting user with id ${id}`
//       });
//     });
// };
