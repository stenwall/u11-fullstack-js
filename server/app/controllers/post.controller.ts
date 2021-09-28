// controller for posts
import { Request, Response } from 'express';
import { dbModel, PostDocument } from '../models';

const Post = dbModel.Post;

// create and save a new post
export const createPost = async (req: any, res: Response) => {
  if (!req.body) {
    res.status(400).send({ message: 'Cannot be empty.' });
    return;
  }

  const post = new Post({
    body: req.body.body,
    user_id: req.userId
  })
  

  try {
    const savedPost = await post.save();
    return res.status(201).send({
      message: 'Post created successfully.',
      post: savedPost
    });
  } catch (err: any) {
    return res.status(400).send({
      message: 'Error saving post to database.',
      error: err.message
    });
  }
};

// find post by id
export const findOnePost = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).send({ message: `Post with id ${id} not found.` });
    } else {
      return res.status(200).send(post);
    }
  } catch (err: any) {
    return res.status(500).send({
      message: `Error retrieving post with id ${id}.`,
      error: err.message
    });
  }
};

// get post populated with comments
export const getPostWithComments = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const post = await Post.findById(id).populate('comments', '-__v');
    if (!post) {
      return res.status(404).send({ message: `Post with id ${id} not found.` });
    } else {
      return res.status(200).send(post);
    }
  } catch (err: any) {
    return res.status(500).send({
      message: `Error retrieving post with id ${id}.`,
      error: err.message
    });
  }
}

// find all posts by author
export const findPostsByUserId = async (req: Request, res: Response) => {
  try {
    const posts = await Post.find({ user_id: req.userId }).exec();
    return res.status(201).send({
      posts
    });
  } catch (err: any) {
    return res.status(400).send({
      message: 'Error saving post to database.',
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

  const id = req.params.id;

  try {
    const post = await Post.findByIdAndUpdate(id, req.body, {
      useFindAndModify: false
    });
    if (!post) {
      return res.status(404).send({
        message: `Cannot update post with id ${id}, maybe it was not found.`
      });
    } else {
      return res.status(200).send({
        message: 'Post updated successfully.',
        post
      });
    }
  } catch (err: any) {
    return res.status(500).send({
      message: `Error updating post with id ${id}.`,
      error: err.message
    });
  }
};

// remove post by id
export const deletePost = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const post = await Post.findByIdAndRemove(id);
    if (!post) {
      return res.status(404).send({
        message: `Cannot delete post with id ${id}, maybe it was not found.`
      });
    } else {
      return res.status(200).send({
        message: 'Post deleted successfully.'
      });
    }
  } catch (err: any) {
    return res.status(500).send({
      message: `Error deleting post with id ${id}.`,
      error: err.message
    });
  }
};
