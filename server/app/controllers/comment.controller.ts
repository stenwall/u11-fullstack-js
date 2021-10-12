// controller for comments
import { Request, Response } from 'express';
import models from '../models';

const Comment = models.Comment;
const Post = models.Post;

// create and save new comment
export const createComment = async (req: Request, res: Response) => {
  if (!req.body) {
    return res.status(400).send({ message: 'Cannot be empty.' });
  }
  const id = req.params.postId;
  const comment = new Comment({
    body: req.body.body,
    user_id: req.userId
  });
  try {
    const post = await Post.findByIdAndUpdate(
      id,
      { $push: { comments: comment._id } },
      { new: true, useFindAndModify: false }
    );
    if (!post) {
      return res.status(404).send({ message: `Post with id: ${id} not found.` });
    } else {
      const savedComment = await comment.save();
      return res.status(201).send({
        message: 'Comment created successfully.',
        comment: savedComment,
        post
      });
    }
  } catch (err: any) {
    return res.status(500).send({
      message: 'Error saving comment to database.',
      error: err.message
    });
  }
};

// get post populated with comments
export const getPostWithComments = async (req: Request, res: Response) => {
  const id = req.params.postId;
  try {
    const post = await Post.findById(id).populate({
      path: 'comments',
      select: 'firstname + lastname + createdAt'
    });
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
        message: `Cannot update comment with id: ${id}, maybe it was not found.`
      });
    }
    if (comment && comment.user_id !== req.userId) {
      return res.status(404).send({
        message: `Comment with id: ${id} does not belong to you and cannot be edited.`
      });
    } else {
      return res.status(200).send({
        message: 'Comment updated successfully.',
        comment
      });
    }
  } catch (err: any) {
    return res.status(500).send({
      message: `Error updating comment with id: ${id}.`,
      error: err.message
    });
  }
};

// delete comment by id
export const deleteComment = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const comment = await Comment.findByIdAndRemove(id);
    if (!comment) {
      return res.status(404).send({
        message: `Cannot delete comment with id: ${id}, maybe it was not found.`
      });
    }
    if (comment && comment.user_id !== req.userId) {
      return res.status(404).send({
        message: `Comment with id: ${id} does not belong to you and cannot be deleted.`
      });
    } else {
      return res.status(200).send({
        message: 'Comment deleted successfully.'
      });
    }
  } catch (err: any) {
    return res.status(500).send({
      message: `Error deleting comment with id: ${id}.`,
      error: err.message
    });
  }
};
