import { Schema, model, Document, Types } from 'mongoose';
import { UserDocument, CommentDocument } from './';

export interface PostDocument extends Document {
  body: string;
  user_id: UserDocument['_id'];
  comments: Types.Array<CommentDocument['_id']>;
}

const PostSchema = new Schema<PostDocument>(
  {
    body: {
      type: String,
      required: true
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Comment'
      }
    ]
  },
  {
    timestamps: true
  }
);

const Post = model<PostDocument>('Post', PostSchema);

export default Post;
