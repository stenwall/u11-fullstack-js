import mongoose, { Schema, model, Document } from 'mongoose';

export interface RoleDocument extends Document {
  name: string;
}

const RoleSchema = new Schema<RoleDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
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

const Role = model<RoleDocument>('Role', RoleSchema);

export default Role;