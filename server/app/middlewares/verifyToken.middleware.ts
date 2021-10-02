import { Request, Response, NextFunction } from 'express';
import * as JWT from 'jsonwebtoken';
import config from '../../config';

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['x-access-token'] as string;

  if (!token) {
    res.status(403).send({ message: 'No token provided.' });
  }

  JWT.verify(token, config.PRIVATE_KEY, (err: any, decoded: any) => {
    if (err) {
      res.status(401).send({
        message: 'Unauthorized: not authenticated.'
      });
    }
    req.userId = decoded.id;
    next();
  });
};

export default verifyToken;
