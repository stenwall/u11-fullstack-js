import mongoose from 'mongoose';
import Role from './role.model';
import User from './user.model';

mongoose.Promise = global.Promise;

const db = {
  mongoose: mongoose,
  user: User,
  role: Role,
  ROLES: ['user', 'admin']
};

export default db;
