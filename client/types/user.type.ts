import House from './house.type';

export default interface User {
  _id?: any | null;
  username: string;
  firstname: string;
  lastname: string;
  desc?: string;
  email: string;
  password: string;
  status: boolean;
  role: string;
  house_id: House['_id'];
  createdAt: Date;
  updatedAt: Date;
}