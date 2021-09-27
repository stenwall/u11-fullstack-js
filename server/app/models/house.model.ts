import { Schema, Document, model, Types } from 'mongoose';
import User from './user.model';

export interface HouseDocument extends Document {
  name: string;
  desc: string;
  members?: Types.Array<string>;
  address: string;
  streetnumber: number;
  zipcode: number;
  city: string;
}

const schema = new Schema<HouseDocument>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3
    },
    desc: { type: String },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
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
).method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

const House = model<HouseDocument>('House', schema);

export default House;
