import User, { UserDocument } from './user.model';
import House, { HouseDocument } from './house.model';
import Post, { PostDocument } from './post.model';
import Comment, { CommentDocument } from './comment.model';

export const dbModel = {
  User,
  House,
  Post,
  Comment,
  ROLES: ['user', 'admin', 'super-admin']
};

export { UserDocument, HouseDocument, PostDocument, CommentDocument};
