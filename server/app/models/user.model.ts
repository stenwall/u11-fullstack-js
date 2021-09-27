import { Schema, Types, model, Document } from 'mongoose';
import { RoleDocument } from './role.model';
import { HouseDocument } from './house.model';

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
  role: RoleDocument['name'];
  house: HouseDocument['id'];
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
      ref: 'Role',
      enum: ['user', 'admin', 'super-admin',]
    },
    house: {
      type: Schema.Types.ObjectId,
      ref: 'House'
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


// UserSchema.pre<UserDocument>("save", function(next) {
//   if (this.isModified("password")) {
//     this.password = hashPassword(this.password)
//   }
// });

// const UserModel = mongoose.model<User>('User', schema);

// const User = mongoose.model(
//   'User',
//   new mongoose.Schema({
//     username: String,
//     firstname: String,
//     lastname: String,
//     body: String,
//     email: String,
//     password: String,
//     status: Boolean,
//     roles: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Role'
//       }
//     ]
//   }).method('toJSON', function () {
//     const { __v, _id, ...object } = this.toObject();
//     object.id = _id;
//     return object;
//   })
// );

const User = model<UserDocument>('User', UserSchema);

export default User;
