import { Schema, Types, model, Document } from 'mongoose';
import { RoleDocument } from './role.model';
import { HouseDocument } from './house.model';
import { PostDocument } from './post.model';

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
  house: HouseDocument['id'];
  posts: Types.Array<PostDocument['id']>;
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
      enum: ['user', 'admin', 'super-admin']
    },
    house: {
      type: Schema.Types.ObjectId,
      ref: 'House'
    },
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Post'
      }
    ]
  },
  {
    timestamps: true
  }
).method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

// Virtuals
// UserSchema.virtual("fullName").get(function() {
//   return this.firstName + this.lastName
// })

// Methods
// UserSchema.methods.getGender = function() {
//   return this.gender > 0 "Male" : "Female"
// }

// Static methods
// UserSchema.statics.findWithCompany = function(id) {
//   return this.findById(id).populate("company").exec()
// }

// Document middlewares
// UserSchema.pre("save", function(next) {
//   if (this.isModified("password")) {
//     this.password = hashPassword(this.password)
//   }
// });

// Query middlewares
// UserSchema.post("findOneAndUpdate", async function(doc) {
//   await updateCompanyReference(doc);
// });

//   .method('toJSON', function () {
//     const { __v, _id, ...object } = this.toObject();
//     object.id = _id;
//     return object;
//   })
// );

const User = model<UserDocument>('User', UserSchema);

export default User;
