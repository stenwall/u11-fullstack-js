// controller for house
import { Request, Response } from 'express';
import models from '../models';

const House = models.House;

// get house by id
export const getHouse = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const house = await House.findById(id);
    if (!house) {
      return res.status(404).send({ message: `House with id: ${id} not found.` });
    } else {
      return res.status(200).send(house);
    }
  } catch (err: any) {
    return res.status(500).send({
      message: `Error retrieving house with id: ${id}.`,
      error: err.message
    });
  }
};

// get house populated with members
export const getHouseMembers = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const house = await House.findById(id).populate('members', '-__v');
    if (!house) {
      return res.status(404).send({ message: `House with id: ${id} not found.` });
    } else {
      return res.status(200).send(house);
    }
  } catch (err: any) {
    return res.status(500).send({
      message: `Error retrieving house with id: ${id}.`,
      error: err.message
    });
  }
};
