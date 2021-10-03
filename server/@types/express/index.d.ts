import { UserDocument } from '../../app/models';

declare global {
  namespace Express {
    interface Request {
      userId: UserDocument['_id'];
    }
  }
}

// declare module 'dotenv/config';
