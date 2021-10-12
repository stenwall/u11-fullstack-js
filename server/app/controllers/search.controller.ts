// controller for search
import { Request, Response } from 'express';
import models from '../models';

const Post = models.Post;

// search posts by text and user
export const searchPosts = async (req: Request, res: Response) => {
  const query = req.params.query;
  try {
    const posts = await Post.find({
      $text: {
        $search: query
      }
    })
      .populate({ path: 'user', select: 'firstname + lastname' })
      .sort({ createdAt: -1 });
    if (!posts || posts.length === 0) {
      return res.status(404).send({
        message: 'No posts matched your search'
      });
    }
    return res.status(200).send(posts);
  } catch (err: any) {
    return res.status(500).send({
      message: 'Error when trying to search database.',
      error: err.message
    });
  }
};
