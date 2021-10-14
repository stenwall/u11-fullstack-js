import User from './user.type';

export default interface House {
  _id?: any | null;
  name: string;
  desc?: string;
  admins: Array<User['_id']>;
  members: Array<User['_id']>;
  address: string;
  streetnumber: number;
  zipcode: number;
  city: string;
  createdAt: Date;
  updatedAt: Date;
}