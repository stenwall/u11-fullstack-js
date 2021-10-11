import House from './house.type';

export default interface User {
  id?: any | null;
  _id?: any | null;
  username: string;
  firstname: string;
  lastname: string;
  desc?: string;
  email: string;
  password: string;
  status: boolean;
  role: string;
  house: House['name'];
  house_id: House['_id'];
  createdAt: Date;
  updatedAt: Date;
}