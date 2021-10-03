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
    res.status(400).send({ message: 'Cannot be empty.' });
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
  });
  try {
    // temporarily save all users to the only available house, created on init
    const house = await House.findOne({
      name: 'Höstvetet'
    })
    if (!house) {
      res.status(404).send({
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
      res.status(201).send({
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
    res.status(500).send({
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
            expiresIn: '30m'
          }
        );
        res.status(200).send({
          user: {
            id: user._id,
            username: user.username,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            role: user.role,
            house: user.house_id
          },
          accessToken: token
        });
      }
    }
  } catch (err: any) {
    res.status(500).send({
      message: 'Error retrieving user from database.',
      error: err.message
    });
  }
};

// logout user
export const logout = async (req: Request, res: Response) => {
  // const { token } = req.body;
  // refreshTokens = refreshTokens.filter(token => token !== token);
  res.send('Not able to logout yet...');
};
