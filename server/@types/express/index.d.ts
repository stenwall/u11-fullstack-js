import { UserDocument } from '../../app/models';

declare global {
  namespace Express {
    interface Request {
      userId: UserDocument['_id'];
      userRole: UserDocument['role'];
    }
  }
}

// declare module 'dotenv/config';
