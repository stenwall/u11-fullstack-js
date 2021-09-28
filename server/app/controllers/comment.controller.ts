// controller for comments
import { Request, Response } from 'express';
import { dbModel } from '../models';

const Comment = dbModel.Comment;
const Post = dbModel.Post;

// create and save a new comment
export const createComment = async (req: Request, res: Response) => {
  if (!req.body) {
    res.status(400).send({ message: 'Cannot be empty.' });
    return;
  }

  try {
    const comment = await Comment.create(req.body);
    await Post.findByIdAndUpdate(
      req.userId,
      { $push: { comments: comment?._id } },
      { new: true, useFindAndModify: false }
    );
    return res.status(201).send({
      message: 'Comment created successfully.',
      comment,
    });
  } catch (err: any) {
    return res.status(400).send({
      message: 'Error saving comment to database.',
      error: err.message
    });
  }
};

// find comments by post id
export const findCommentsByPost = async (req: Request, res: Response) => {
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

// update comment by id
export const updateComment = async (req: Request, res: Response) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Data to update cannot be empty.'
    });
  }

  const id = req.params.id;

  try {
    const comment = await Comment.findByIdAndUpdate(id, req.body, {
      useFindAndModify: false
    });
    if (!comment) {
      return res.status(404).send({
        message: `Cannot update comment with id ${id}, maybe it was not found.`
      });
    } else {
      return res.status(200).send({
        message: 'Post updated successfully.',
        comment
      });
    }
  } catch (err: any) {
    return res.status(500).send({
      message: `Error updating comment with id ${id}.`,
      error: err.message
    });
  }
};

// remove comment by id
export const deleteComment = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const comment = await Comment.findByIdAndRemove(id);
    if (!comment) {
      return res.status(404).send({
        message: `Cannot delete comment with id ${id}, maybe it was not found.`
      });
    } else {
      return res.status(200).send({
        message: 'Comment deleted successfully.'
      });
    }
  } catch (err: any) {
    return res.status(500).send({
      message: `Error deleting comment with id ${id}.`,
      error: err.message
    });
  }
};
