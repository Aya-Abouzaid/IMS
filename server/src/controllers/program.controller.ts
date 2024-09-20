import ProgramData from '../persistance/program.persistence';
import { Request, Response, NextFunction } from 'express';

const programData = new ProgramData();

// Create a Program
export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const createdProgram = await programData.create(req.body);
    res.status(201).json(createdProgram);
  } catch (error) {
    next(error);
  }
};

// Get all Programs
export const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const programs = await programData.getAll();
    res.status(200).json(programs);
  } catch (error) {
    next(error);
  }
};

// Get a Program by ID
export const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const program = await programData.getById(req.params.id);
    res.status(200).json(program);
  } catch (error) {
    next(error);
  }
};

// Update a Program by ID
export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updatedProgram = await programData.updateById(req.params.id, req.body);
    res.status(200).json(updatedProgram);
  } catch (error) {
    next(error);
  }
};

// Delete a Program by ID
export const deleteProgram = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await programData.deleteById(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};


export default {
    create,
    getAll,
    getById,
    update,
    deleteProgram
  };
  