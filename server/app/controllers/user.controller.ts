// controller for authorization
import { Request, Response } from 'express';

export const publicAccess = (req: Request, res: Response) => {
  res.status(200).send('Public content.');
};

export const userAccess = (req: Request, res: Response) => {
  res.status(200).send('User content.');
};

export const adminAccess = (req: Request, res: Response) => {
  res.status(200).send('Admin content.');
};

export const superAdminAccess = (req: Request, res: Response) => {
  res.status(200).send('Super-admin content.');
};

