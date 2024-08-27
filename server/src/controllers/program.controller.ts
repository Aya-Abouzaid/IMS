import { NextFunction, Request, Response } from 'express';
import ProgramModel from '../models/program.model';
import { HttpError } from '../middleware/error.middleware';
import { HttpStatus } from '../types';


class ProgramController {
  // Create a new program
  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newProgram = new ProgramModel({
        ...req.body,
        createdBy: req.user.id, // Assuming req.user is populated with the current user
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      await newProgram.save();
      return res.status(HttpStatus.OK).send({ message: 'Program created successfully' });
    } catch (e: any) {
      next(new HttpError(e.message || 'Failed to create program, please try again!', e.statusCode || 500));
    }
  };

  // Update a program
  update = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const updatedProgram = await ProgramModel.findByIdAndUpdate(
        id,
        { ...req.body, updatedAt: new Date() },
        { new: true }
      );
      if (!updatedProgram) {
        throw new HttpError('Program not found', HttpStatus.NOT_FOUND);
      }
      return res.status(HttpStatus.OK).send({ message: 'Program updated successfully' });
    } catch (e: any) {
      next(new HttpError(e.message || 'Failed to update program, please try again!', e.statusCode || 500));
    }
  };

  // Delete a program
  delete = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const deletedProgram = await ProgramModel.findByIdAndDelete(id);
      if (!deletedProgram) {
        throw new HttpError('Program not found', HttpStatus.NOT_FOUND);
      }
      return res.status(HttpStatus.OK).send({ message: 'Program deleted successfully' });
    } catch (e: any) {
      next(new HttpError(e.message || 'Failed to delete program, please try again!', e.statusCode || 500));
    }
  };

  // Get a program by ID
  getById = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const program = await ProgramModel.findById(id).populate('tasks');
      if (!program) {
        throw new HttpError('Program not found', HttpStatus.NOT_FOUND);
      }
      return res.status(HttpStatus.OK).send({ message: 'Program retrieved successfully', program });
    } catch (e: any) {
      next(new HttpError(e.message || 'Failed to retrieve program, please try again!', e.statusCode || 500));
    }
  };

  // Get all programs
  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const programs = await ProgramModel.find().populate('tasks');
      return res.status(HttpStatus.OK).send({ message: 'Programs retrieved successfully', programs });
    } catch (e: any) {
      next(new HttpError(e.message || 'Failed to retrieve programs, please try again!', e.statusCode || 500));
    }
  };
}

export default new ProgramController();
