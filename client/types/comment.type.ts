import User from "./user.type";

export default interface Comment {
  _id?: any | null;
  body: string;
  user_id: User['_id'];
}