import { Schema, Document, model, Types } from 'mongoose';
import { UserDocument } from './';

export interface HouseDocument extends Document {
  name: string;
  desc?: string;
  admins: Types.Array<UserDocument['_id']>;
  members: Types.Array<UserDocument['_id']>;
  address: string;
  streetnumber: number;
  zipcode: number;
  city: string;
  createdAt: Date;
  updatedAt: Date;
}

const HouseSchema = new Schema<HouseDocument>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3
    },
    desc: { type: String },
    admins: [{
      type: Schema.Types.ObjectId, ref: 'User'
    }],
    members: [{
      type: Schema.Types.ObjectId, ref: 'User'
    }],
    address: {
      type: String,
      required: true,
      trim: true
    },
    streetnumber: {
      type: Number,
      required: true,
      trim: true
    },
    zipcode: {
      type: Number,
      required: true,
      trim: true,
      length: 6
    },
    city: {
      type: String,
      required: true,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

// virtuals
HouseSchema.virtual('posts', {
  ref: 'Post',
  foreignField: 'house_id',
  localField: '_id'
});

const House = model<HouseDocument>('House', HouseSchema);

export default House;
