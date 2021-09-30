// controller for authentication
import { Request, Response } from 'express';
import * as JWT from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import config from '../../config/auth.config';
import models from '../models';

const User = models.User;

// create and save new user
export const register = async (req: Request, res: Response) => {
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

// login user
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
        message: 'Invalid password.'
      });
    }

    const token = JWT.sign({ id: user.id }, config.secret, {
      expiresIn: 86400 // 24 hours
    });

    return res.status(200).send({
      user,
      accessToken: token
    });
  });
};

// logout user
