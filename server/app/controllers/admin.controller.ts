// controller for admins
import { Request, Response } from 'express';
import models from '../models';

const User = models.User;
const Post = models.Post;
const House = models.House;
const Comment = models.Comment;

// block users
export const blockUser = async (req: Request, res: Response) => {
  const id = req.params.userId;
  try {
    const user = await User.findByIdAndUpdate(
      id,
      { status: false },
      {
        useFindAndModify: false
      }
    );
    if (!user) {
      return res.status(404).send({
        message: `Cannot block user with id: ${id}, maybe it was not found.`
      });
    }
    if (!user.status) {
      return res.status(404).send({
        message: 'User is already blocked.'
      });
    } else {
      return res.status(200).send({
        message: 'User blocked successfully.'
      });
    }
  } catch (err: any) {
    return res.status(500).send({
      message: `Error blocking user with id: ${id} from database.`,
      error: err.message
    });
  }
};

// unblock users
export const unblockUser = async (req: Request, res: Response) => {
  const id = req.params.userId;
  try {
    const user = await User.findByIdAndUpdate(
      id,
      { status: true },
      {
        useFindAndModify: false
      }
    );
    if (!user) {
      return res.status(404).send({
        message: `Cannot unblock user with id: ${id}, maybe it was not found.`
      });
    }
    if (!user.status) {
      return res.status(404).send({
        message: 'User is already unblocked.'
      });
    } else {
      return res.status(200).send({
        message: 'User unblocked successfully.'
      });
    }
  } catch (err: any) {
    return res.status(500).send({
      message: `Error blocking user with id: ${id} from database.`,
      error: err.message
    });
  }
};

// update house info
export const updateHouse = async (req: Request, res: Response) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Data to update cannot be empty.'
    });
  }
  const id = req.params.houseId;
  try {
    const house = await House.findByIdAndUpdate(id, req.body, {
      useFindAndModify: false
    });
    if (!house) {
      return res.status(404).send({
        message: `Cannot update house with id: ${id}, maybe it was not found.`
      });
    }
    return res.status(200).send({
      message: 'House updated successfully.'
    });
  } catch (err: any) {
    return res.status(500).send({
      message: `Error updating house with id: ${id} from database.`,
      error: err.message
    });
  }
};

// delete posts
export const deletePost = async (req: Request, res: Response) => {
  const id = req.params.postId;
  try {
    const post = await Post.findByIdAndRemove(id);
    if (!post) {
      return res.status(404).send({
        message: `Cannot delete post with id: ${id}, maybe it was not found.`
      });
    }
    return res.status(200).send({
      message: 'Post deleted successfully.'
    });
  } catch (err: any) {
    return res.status(500).send({
      message: `Error deleting post with id: ${id}.`,
      error: err.message
    });
  }
};

// delete comments
export const deleteComment = async (req: Request, res: Response) => {
  const id = req.params.commentId;
  try {
    const comment = await Comment.findByIdAndRemove(id);
    if (!comment) {
      return res.status(404).send({
        message: `Cannot delete comment with id: ${id}, maybe it was not found.`
      });
    }
    return res.status(200).send({
      message: 'Comment deleted successfully.'
    });
  } catch (err: any) {
    return res.status(500).send({
      message: `Error deleting comment with id: ${id}.`,
      error: err.message
    });
  }
};
