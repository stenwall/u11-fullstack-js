// controller for posts
import { Request, Response } from 'express';
import models from '../models';

const Post = models.Post;
const House = models.House;
const User = models.User;

// create and save new post
export const createPost = async (req: any, res: Response) => {
  if (!req.body) {
    return res.status(400).send({ message: 'Cannot be empty.' });
  }
  const user = await User.findById(req.userId);
  const post = new Post({
    body: req.body.body,
    user: user?._id,
    house_id: user?.house_id
  });
  try {
    const savedPost = await post.save();
    return res.status(201).send({
      message: 'Post created successfully.',
      post: savedPost
    });
  } catch (err: any) {
    return res.status(500).send({
      message: 'Error saving post to database.',
      error: err.message
    });
  }
};

// get all posts with users
export const getPostsWithUsers = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.userId);
    const posts = await Post.find({ house_id: user?.house_id }).populate({ path: 'user', select: 'firstname + lastname', }).sort({ createdAt: -1 });
    if (!posts) {
      return res.status(404).send({ message: 'No posts in this house yet.' });
    } else {
      return res.status(200).send(posts);
    }
  } catch (err: any) {
    return res.status(500).send({
      message: 'Error retrieving posts from database.',
      error: err.message
    });
  }
}

// get post by id
export const getPost = async (req: Request, res: Response) => {
  const id = req.params.postId;
  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).send({
        message: `Post with id: ${id} not found.`
      });
    } else {
      return res.status(200).send(post);
    }
  } catch (err: any) {
    return res.status(500).send({
      message: `Error retrieving post with id: ${id}.`,
      error: err.message
    });
  }
};

// update post by id
export const updatePost = async (req: Request, res: Response) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Data to update cannot be empty.'
    });
  }
  const id = req.params.postId;
  try {
    const post = await Post.findByIdAndUpdate(id, req.body, {
      useFindAndModify: false
    });
    if (!post) {
      return res.status(404).send({
        message: `Cannot update post with id: ${id}, maybe it was not found.`
      });
    }
    return res.status(200).send({
      message: 'Post updated successfully.',
      post
    });
  } catch (err: any) {
    return res.status(500).send({
      message: `Error updating post with id: ${id}.`,
      error: err.message
    });
  }
};

// delete post by id
export const deletePost = async (req: Request, res: Response) => {
  const id = req.params.postId;
  try {
    const post = await Post.findByIdAndRemove(id);
    if (!post) {
      return res.status(404).send({
        message: `Cannot delete post with id: ${id}, maybe it was not found.`
      });
    }
    if (post && post !== req.userId) {
      return res.status(404).send({
        message: `Post with id: ${id} do not belong to you and cannot be deleted.`
      });
    } else {
      return res.status(200).send({
        message: 'Post deleted successfully.'
      });
    }
  } catch (err: any) {
    return res.status(500).send({
      message: `Error deleting post with id: ${id}.`,
      error: err.message
    });
  }
};
