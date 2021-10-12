import { Schema, Types, model, Document } from 'mongoose';
import { HouseDocument } from './';

export interface UserDocument extends Document {
  username: string;
  firstname: string;
  lastname: string;
  desc?: string;
  email: string;
  password: string;
  status: boolean;
  friends?: Types.Array<string>;
  groups?: Types.Array<string>;
  role: string;
  house_id: HouseDocument['_id'];
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<UserDocument>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3
    },
    firstname: {
      type: String,
      required: true,
      trim: true
    },
    lastname: {
      type: String,
      required: true,
      trim: true
    },
    desc: String,
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    password: { type: String, required: true },
    status: {
      type: Boolean,
      required: true,
      default: true
    },
    friends: { type: [String] },
    groups: { type: [String] },
    role: {
      type: String,
      enum: ['user', 'admin', 'super-admin'],
      default: 'user'
    },
    house_id: {
      type: Schema.Types.ObjectId,
      ref: 'House'
    }
  },
  {
    timestamps: true
  }
);

// virtuals
UserSchema.virtual('posts', {
  ref: 'Post',
  foreignField: 'user_id',
  localField: '_id'
});

UserSchema.virtual('comments', {
  ref: 'Comment',
  foreignField: 'user_id',
  localField: '_id'
});

const User = model<UserDocument>('User', UserSchema);

export default User;
