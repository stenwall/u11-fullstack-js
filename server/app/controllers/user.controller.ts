// controller for users
import { Request, Response } from 'express';
import models from '../models';

const User = models.User;
const Post = models.Post;

// get user by id
export const getUser = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).send({ message: `User with id: ${id} not found.` });
    } else {
      return res.status(200).send(user);
    }
  } catch (err: any) {
    return res.status(500).send({
      message: `Error retrieving user with id: ${id}.`,
      error: err.message
    });
  }
};

// update user by id
export const updateUser = async (req: Request, res: Response) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Data to update cannot be empty.'
    });
  }

  const id = req.params.id;

  try {
    const user = await User.findByIdAndUpdate(id, req.body, {
      useFindAndModify: false
    });
    if (!user) {
      return res.status(404).send({
        message: `Cannot update user with id: ${id}, maybe it was not found.`
      });
    }
    if (user && id !== req.userId) {
      return res.status(404).send({
        message: `You are not user with id: ${id} and cannot edit.`
      });
    } else {
      return res.status(200).send({
        message: 'User updated successfully.',
        user
      });
    }
  } catch (err: any) {
    return res.status(500).send({
      message: `Error updating user with id: ${id} from database.`,
      error: err.message
    });
  }
};

// get all posts by user id
export const getPostsByUser = async (req: Request, res: Response) => {
  try {
    const posts = await Post.find({ user_id: req.userId }).exec();
    return res.status(201).send({
      posts
    });
  } catch (err: any) {
    return res.status(500).send({
      message: 'Error retrieving posts from database.',
      error: err.message
    });
  }
};


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

