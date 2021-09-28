import { Schema, model, Document } from 'mongoose';
import { UserDocument } from './';

export interface CommentDocument extends Document {
  body: string;
  user_id: UserDocument['_id'];
}

const CommentSchema = new Schema<CommentDocument>(
  {
    body: {
      type: String,
      required: true
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    timestamps: true
  }
);

const Comment = model<CommentDocument>('Comment', CommentSchema);

export default Comment;
