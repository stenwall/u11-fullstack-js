// controller for authentication
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import config from '../../config';
import models from '../models';

const User = models.User;
const House = models.House;

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
    role: req.body.role ? req.body.role : 'user'
  });
  try {
    // temporarily save all users to the only available house, created on init
    const house = await House.findOne({
      name: 'Höstvetet'
    });
    if (!house) {
      return res.status(404).send({
        message: `No house to save user to found.`
      });
    } else {
      user.house_id = house._id;
      const savedUser = await user.save();
      await House.findByIdAndUpdate(
        savedUser.house_id,
        { $push: { members: savedUser._id } },
        { new: true, useFindAndModify: false }
      );
      if (user.role === 'admin') {
        await House.findByIdAndUpdate(
          savedUser.house_id,
          { $push: { admins: savedUser._id } },
          { new: true, useFindAndModify: false }
        );
      }
      return res.status(201).send({
        message: 'User successfully registered.',
        user: {
          id: savedUser._id,
          username: savedUser.username,
          firstname: savedUser.firstname,
          lastname: savedUser.lastname,
          email: savedUser.email,
          role: savedUser.role,
          house: house.name
        }
      });
    }
  } catch (err: any) {
    return res.status(500).send({
      message: 'Error saving user to database.',
      error: err.message
    });
  }
};

// login user
export const login = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({
      email: req.body.email
    });
    if (!user) {
      return res.status(404).send({
        message: `User with email: ${req.body.email} not found.`
      });
    } else {
      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: 'Invalid password.'
        });
      } else {
        const token = jwt.sign(
          {
            id: user.id,
            role: user.role
          },
          config.PRIVATE_KEY,
          {
            expiresIn: 86400
          }
        );
        return res
          .cookie('access_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production'
          })
          .status(200)
          .send({ message: 'Successfully logged in.' });
      }
    }
  } catch (err: any) {
    return res.status(500).send({
      message: 'Error retrieving user from database.',
      error: err.message
    });
  }
};

// logout user
export const logout = async (req: Request, res: Response) => {
  return res
    .clearCookie('access_token')
    .status(200)
    .send({ message: 'Successfully logged out' });
};

// get logged in user
export const getCurrentUser = async (req: Request, res: Response) => {
  const id = req.userId;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).send({ message: 'No user is logged in' });
    } else {
      const house = await House.findById(user.house_id);
      return res.status(200).send({
        id: user._id,
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        role: user.role,
        house: house?.name,
        house_id: house?._id,
        createdAt: user.createdAt
      });
    }
  } catch (err: any) {
    return res.status(500).send({
      message: 'Error retrieving user from database.',
      error: err.message
    });
  }
};