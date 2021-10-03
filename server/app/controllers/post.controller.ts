// controller for posts
import { Request, Response } from 'express';
import models from '../models';

const Post = models.Post;

// create and save new post
export const createPost = async (req: any, res: Response) => {
  if (!req.body) {
    res.status(400).send({ message: 'Cannot be empty.' });
  }
  const post = new Post({
    body: req.body.body,
    user_id: req.userId
  });
  try {
    const savedPost = await post.save();
    res.status(201).send({
      message: 'Post created successfully.',
      post: savedPost
    });
  } catch (err: any) {
    res.status(500).send({
      message: 'Error saving post to database.',
      error: err.message
    });
  }
};

// get post by id
export const getPost = async (req: Request, res: Response) => {
  const id = req.params.postId;
  try {
    const post = await Post.findById(id);
    if (!post) {
      res
        .status(404)
        .send({ message: `Post with id: ${id} not found.` });
    } else {
      res.status(200).send(post);
    }
  } catch (err: any) {
    res.status(500).send({
      message: `Error retrieving post with id: ${id}.`,
      error: err.message
    });
  }
};

// update post by id
export const updatePost = async (req: Request, res: Response) => {
  if (!req.body) {
    res.status(400).send({
      message: 'Data to update cannot be empty.'
    });
  }
  const id = req.params.postId;
  try {
    const post = await Post.findByIdAndUpdate(id, req.body, {
      useFindAndModify: false
    });
    if (!post) {
      res.status(404).send({
        message: `Cannot update post with id: ${id}, maybe it was not found.`
      });
    }
    res.status(200).send({
      message: 'Post updated successfully.',
      post
    });
  } catch (err: any) {
    res.status(500).send({
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
      res.status(404).send({
        message: `Cannot delete post with id: ${id}, maybe it was not found.`
      });
    }
    if (post && post.user_id !== req.userId) {
      res.status(404).send({
        message: `Post with id: ${id} do not belong to you and cannot be deleted.`
      });
    } else {
      res.status(200).send({
        message: 'Post deleted successfully.'
      });
    }
  } catch (err: any) {
    res.status(500).send({
      message: `Error deleting post with id: ${id}.`,
      error: err.message
    });
  }
};
