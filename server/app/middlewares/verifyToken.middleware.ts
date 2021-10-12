import { Request, Response, NextFunction } from 'express';
import * as JWT from 'jsonwebtoken';
import config from '../../config';

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.status(403).send({ message: 'No token provided.' });
  }
  JWT.verify(token, config.PRIVATE_KEY, (err: any, decoded: any) => {
    if (err) {
      return res.status(401).send({
        message: 'Unauthorized: not authenticated.'
      });
    }
    req.userId = decoded.id;
    req.userRole = decoded.role
    return next();
  });
};

export default verifyToken;
